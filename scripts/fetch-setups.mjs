import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import { execSync } from 'child_process';
import { createInterface } from 'readline';
import { fileURLToPath } from 'url';
import path from 'path';

import { fetchSetupAttachments, downloadFile } from './lib/discord-fetch.mjs';
import { buildTrackIndex } from './lib/track-index.mjs';
import { detectType } from './lib/parse-filename.mjs';
import { writeMeta } from './lib/meta.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = path.resolve(__dirname, '..');

// --- .env loader ---
function loadEnv() {
  const envPath = path.join(PROJECT_ROOT, '.env');
  if (!existsSync(envPath)) return;
  for (const line of readFileSync(envPath, 'utf8').split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eqIdx = trimmed.indexOf('=');
    if (eqIdx === -1) continue;
    const key = trimmed.slice(0, eqIdx).trim();
    const val = trimmed.slice(eqIdx + 1).trim();
    if (key && !(key in process.env)) process.env[key] = val;
  }
}

loadEnv();

const REQUIRED = ['DISCORD_BOT_TOKEN', 'AUDI_CHANNEL_ID', 'NISSAN_CHANNEL_ID'];
const missing = REQUIRED.filter(k => !process.env[k]);
if (missing.length) {
  console.error(`Missing required env vars: ${missing.join(', ')}`);
  console.error('Copy .env.example to .env and fill in the values.');
  process.exit(1);
}

const { DISCORD_BOT_TOKEN, AUDI_CHANNEL_ID, NISSAN_CHANNEL_ID } = process.env;

// --- Args ---
const args = process.argv.slice(2);
const trackArg = args.find(a => !a.startsWith('--')) ?? null;
const daysFlag = args.find(a => a.startsWith('--days='));
const days = daysFlag ? parseInt(daysFlag.split('=')[1], 10) : 7;
const lookbackDays = trackArg ? 365 * 2 : days;
const afterDate = new Date(Date.now() - lookbackDays * 24 * 60 * 60 * 1000);

const CHANNELS = [
  { id: AUDI_CHANNEL_ID, car: 'audi90gto', name: '#audi-setups' },
  { id: NISSAN_CHANNEL_ID, car: 'nissangtpzxt', name: '#nissan-setups' },
];

// --- Prompt helper with tab completion over track folder names ---
function promptWithCompletion(question, completions) {
  const completer = line => {
    const hits = completions.filter(c => c.startsWith(line));
    return [hits.length ? hits : completions, line];
  };
  const rl = createInterface({ input: process.stdin, output: process.stdout, completer });
  return new Promise(resolve => rl.question(question, answer => { rl.close(); resolve(answer.trim()); }));
}

// --- Main ---
console.log('Building track index...');
const trackIndex = await buildTrackIndex();

// Resolve track arg upfront in track-specific mode
let targetTrack = null;
if (trackArg) {
  targetTrack = trackIndex.resolve(trackArg);
  if (!targetTrack) {
    console.error(`Could not resolve "${trackArg}" to a known track. Try a different spelling.`);
    process.exit(1);
  }
  console.log(`Track-specific mode: ${targetTrack.folderName} (${targetTrack.exportName}), lookback 2 years`);
} else {
  console.log(`Default mode: last ${days} day(s), both channels`);
}

let totalDownloaded = 0;

// Tracks the newest seen (authorId, folder, car, type) combo to deduplicate
// repeat uploads from the same person for the same track+type within the window.
// Discord returns newest-first, so the first occurrence is always the one to keep.
const seenByAuthor = new Set();

for (const channel of CHANNELS) {
  console.log(`\nFetching ${channel.name}...`);

  let attachments;
  try {
    attachments = await fetchSetupAttachments(channel.id, DISCORD_BOT_TOKEN, afterDate);
  } catch (err) {
    console.error(`  Error fetching ${channel.name}: ${err.message}`);
    continue;
  }

  for (const attachment of attachments) {
    // Stage 1: filename match — try each token individually, take first hit
    const filenameTokens = attachment.filename
      .replace(/\.[^.]+$/, '')        // strip extension
      .split(/[_\-. ]+/)
      .filter(t => t.length >= 4 && !/^\d+$/.test(t)); // skip short/pure-numeric tokens
    let resolved = null;
    for (const token of filenameTokens) {
      resolved = trackIndex.resolve(token);
      if (resolved) break;
    }

    // Stage 2: message text match
    if (!resolved && attachment.messageContent) {
      resolved = trackIndex.resolve(attachment.messageContent);
    }

    // Stage 3: interactive
    if (!resolved) {
      console.log(`\n  ? ${attachment.filename}`);
      if (attachment.messageContent) {
        console.log(`    Message: "${attachment.messageContent.slice(0, 120)}"`);
      }
      const answer = await promptWithCompletion('    Enter track folder name (or press enter to skip): ', trackIndex.folderNames);
      if (!answer) {
        console.log('    Skipped.');
        continue;
      }
      // Try to resolve the typed text; fall back to using it as a literal folder name
      resolved = trackIndex.resolve(answer) ?? { folderName: answer, exportName: null };
    }

    // In track-specific mode, only download files for the target track
    if (targetTrack && resolved.folderName !== targetTrack.folderName) continue;

    // Author dedup: skip older uploads from the same person for the same track+car+type
    const type = detectType(attachment.filename);
    const authorKey = `${attachment.authorId}|${resolved.folderName}|${channel.car}|${type}`;
    if (seenByAuthor.has(authorKey)) {
      console.log(`  ~ ${resolved.folderName}/${attachment.filename} (older upload by ${attachment.authorName}, skipped)`);
      continue;
    }
    seenByAuthor.add(authorKey);

    const destDir = path.join(PROJECT_ROOT, 'public', 'setups', channel.car, resolved.folderName);
    const destPath = path.join(destDir, attachment.filename);

    if (existsSync(destPath)) {
      console.log(`  = ${resolved.folderName}/${attachment.filename} (already exists)`);
      continue;
    }

    try {
      mkdirSync(destDir, { recursive: true });
      const buffer = await downloadFile(attachment.url);
      writeFileSync(destPath, buffer);
      writeMeta(destPath, {
        authorId: attachment.authorId,
        authorName: attachment.authorName,
        timestamp: attachment.timestamp,
        messageId: attachment.messageId,
      });
      console.log(`  ✓ ${resolved.folderName}/${attachment.filename}`);
      totalDownloaded++;
    } catch (err) {
      console.error(`  ✗ Failed to download ${attachment.filename}: ${err.message}`);
    }
  }
}

if (totalDownloaded === 0) {
  console.log('\nNo new files downloaded. Nothing to sync.');
  process.exit(0);
}

console.log(`\nDownloaded ${totalDownloaded} file(s). Running sync-setups...`);

const syncArg = targetTrack ? targetTrack.folderName : '';
execSync(
  `node ${JSON.stringify(path.join(__dirname, 'sync-setups.mjs'))} ${syncArg}`.trim(),
  { cwd: PROJECT_ROOT, stdio: 'inherit' }
);
