import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';
import path from 'path';

import { fetchSetupAttachments, downloadFile } from './lib/discord-fetch.mjs';
import { buildTrackIndex } from './lib/track-index.mjs';
import { buildSchedule, pickBySchedule } from './lib/schedule.mjs';
import { detectType } from './lib/parse-filename.mjs';
import { writeMeta } from './lib/meta.mjs';
import { prompt } from './lib/prompt.mjs';

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
const missing = REQUIRED.filter((k) => !process.env[k]);
if (missing.length) {
    console.error(`Missing required env vars: ${missing.join(', ')}`);
    console.error('Copy .env.example to .env and fill in the values.');
    process.exit(1);
}

const { DISCORD_BOT_TOKEN, AUDI_CHANNEL_ID, NISSAN_CHANNEL_ID } = process.env;

// --- Args ---
const args = process.argv.slice(2);

if (args.includes('--completions')) {
    const { buildTrackIndex } = await import('./lib/track-index.mjs');
    const index = await buildTrackIndex();
    console.log(index.folderNames.join('\n'));
    process.exit(0);
}

const trackArg = args.find((a) => !a.startsWith('--')) ?? null;
const daysFlag = args.find((a) => a.startsWith('--days='));
const days = daysFlag ? parseInt(daysFlag.split('=')[1], 10) : 7;
const lookbackDays = trackArg ? 365 * 2 : days;
const afterDate = new Date(Date.now() - lookbackDays * 24 * 60 * 60 * 1000);

// iRacing 2026 S2 changed Nissan physics on 2026-03-14; older setups don't pass tech or perform correctly.
const NISSAN_PHYSICS_CUTOFF = new Date('2026-03-10T00:00:00Z');

const CHANNELS = [
    { id: AUDI_CHANNEL_ID, car: 'audi90gto', name: '#audi-setups' },
    { id: NISSAN_CHANNEL_ID, car: 'nissangtpzxt', name: '#nissan-setups' },
];

// --- Main ---
console.log('Building track index...');
const trackIndex = await buildTrackIndex();
const schedule = buildSchedule();

// Resolve track arg upfront in track-specific mode
let targetTrack = null;
if (trackArg) {
    targetTrack = trackIndex.resolve(trackArg);
    if (!targetTrack) {
        console.error(
            `Could not resolve "${trackArg}" to a known track. Try a different spelling.`,
        );
        process.exit(1);
    }
    console.log(
        `Track-specific mode: ${targetTrack.folderName} (${targetTrack.exportName}), lookback 2 years`,
    );
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

    let nissanSkipped = 0;

    for (const attachment of attachments) {
        if (
            channel.car === 'nissangtpzxt' &&
            new Date(attachment.timestamp) < NISSAN_PHYSICS_CUTOFF
        ) {
            nissanSkipped++;
            continue;
        }

        // Stage 1: filename tokens — iterate all; stop early on unambiguous hit
        const filenameTokens = attachment.filename
            .replace(/\.[^.]+$/, '')
            .split(/[_\-. ]+/)
            .filter((t) => t.length >= 4 && !/^\d+$/.test(t));
        let resolved = null;
        let candidates = [];
        for (const token of filenameTokens) {
            const hits = trackIndex.resolveAll(token);
            if (hits.length === 1) {
                resolved = hits[0];
                break;
            }
            if (hits.length > 1 && candidates.length === 0) {
                candidates = hits; // first multi-match token wins; Stage 2 can still override via message
            }
        }

        // Stage 2: message text match — message overrides filename candidates
        if (!resolved && attachment.messageContent) {
            const hits = trackIndex.resolveAll(attachment.messageContent);
            if (hits.length === 1) {
                resolved = hits[0];
            } else if (hits.length > 1) {
                candidates = hits;
            }
        }

        // Stage 3: season heuristic
        if (!resolved && candidates.length > 0) {
            const pick = pickBySchedule(candidates, attachment.timestamp, schedule);
            if (pick) {
                resolved = pick;
                console.log(`  ↳ auto-resolved by season schedule: ${pick.folderName}`);
            }
        }

        // Stage 4: interactive (skipped in track-specific mode)
        if (!resolved) {
            if (targetTrack) continue;
            console.log(`\n  ? ${attachment.filename}`);
            if (attachment.messageContent) {
                console.log(`    Message: "${attachment.messageContent.slice(0, 120)}"`);
            }
            if (candidates.length > 0) {
                console.log('    Multiple tracks matched:');
                candidates.forEach((c, i) => console.log(`      [${i + 1}] ${c.folderName}`));
                const answer = await prompt(
                    '    Enter number, folder name, or press enter to skip: ',
                    trackIndex.folderNames,
                );
                if (!answer) {
                    console.log('    Skipped.');
                    continue;
                }
                const num = parseInt(answer, 10);
                if (!isNaN(num) && num >= 1 && num <= candidates.length) {
                    resolved = candidates[num - 1];
                } else {
                    const resolvedByName = trackIndex.resolve(answer);
                    resolved = { folderName: answer, exportName: resolvedByName?.exportName ?? null };
                }
            } else {
                const answer = await prompt(
                    '    Enter track folder name (or press enter to skip): ',
                    trackIndex.folderNames,
                );
                if (!answer) {
                    console.log('    Skipped.');
                    continue;
                }
                const resolvedByName = trackIndex.resolve(answer);
                resolved = { folderName: answer, exportName: resolvedByName?.exportName ?? null };
            }
        }

        // In track-specific mode, only download files for the target track
        if (targetTrack && resolved.folderName !== targetTrack.folderName) continue;

        // Author dedup: skip older uploads from the same person for the same track+car+type
        const { type } = detectType(attachment.filename);
        const authorKey = `${attachment.authorId}|${resolved.folderName}|${channel.car}|${type}`;
        if (seenByAuthor.has(authorKey)) {
            console.log(
                `  ~ ${resolved.folderName}/${attachment.filename} (older upload by ${attachment.authorName}, skipped)`,
            );
            continue;
        }
        seenByAuthor.add(authorKey);

        const destDir = path.join(
            PROJECT_ROOT,
            'public',
            'setups',
            channel.car,
            resolved.folderName,
        );
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

    if (nissanSkipped > 0) {
        console.log(
            `  ⚠  Skipped ${nissanSkipped} pre-26s2 Nissan setup${nissanSkipped === 1 ? '' : 's'} (incompatible with current physics)`,
        );
    }
}

if (totalDownloaded > 0) {
    console.log(`\nDownloaded ${totalDownloaded} file(s).`);
} else {
    console.log('\nNo new files downloaded.');
}

console.log('Running sync-setups...');

const syncArgs = targetTrack ? `${targetTrack.folderName} --export=${targetTrack.exportName}` : '';
execSync(`node ${JSON.stringify(path.join(__dirname, 'sync-setups.mjs'))} ${syncArgs}`.trim(), {
    cwd: PROJECT_ROOT,
    stdio: 'inherit',
});
