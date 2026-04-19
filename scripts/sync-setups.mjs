import { readFileSync, writeFileSync } from 'fs';
import { createInterface } from 'readline';
import { fileURLToPath } from 'url';
import path from 'path';

import { discoverNewSetups } from './lib/git-discover.mjs';
import { buildFolderMap, findExportByFolderPrefix } from './lib/track-map.mjs';
import { pairSetups, seasonSortKey } from './lib/parse-filename.mjs';
import { formatEntry, insertEntries, removeEntry, appendNewExport } from './lib/write-track-data.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = path.resolve(__dirname, '..');
const TRACK_DATA_PATH = path.join(PROJECT_ROOT, 'src/data/track-data.js');
const CARS = ['audi90gto', 'nissangtpzxt'];
const MAX_SETUPS = 4;

function prompt(question) {
  const rl = createInterface({ input: process.stdin, output: process.stdout });
  return new Promise(resolve => rl.question(question, answer => { rl.close(); resolve(answer.trim()); }));
}

function printPreview(car, track, pairs, existing, suggested) {
  const newCount = pairs.reduce((n, p) => n + (p.qual ? 1 : 0) + (p.race ? 1 : 0), 0);
  const total = existing.length + newCount;
  const pruneNote = total > MAX_SETUPS ? `  ⚠  ${total} setups after additions (max ${MAX_SETUPS} suggested)` : '';
  console.log(`\n${car} / ${track}${pruneNote}`);

  for (const pair of pairs) {
    if (pair.qual) {
      const flag = pair.ambiguous ? ' [AMBIGUOUS — defaulting to qual]' : ' [QUAL]';
      console.log(`  ADD:    ${pair.qual}${flag}`);
    }
    if (pair.race) {
      const flag = pair.ambiguous ? ' [AMBIGUOUS — defaulting to race]' : '';
      console.log(`  ADD:    ${pair.race}${flag}`);
    }
  }

  for (const entry of existing) {
    const filename = entry.file.split('/').pop();
    const isQual = entry.comment === 'Qualifying setup';
    const qualTag = isQual ? ' [QUAL]' : '';
    const isSuggested = suggested.includes(filename);
    console.log(`  ${isSuggested ? 'REMOVE?' : 'KEEP:  '} ${filename}${qualTag}`);
  }
}

async function getPruningDecision(existing, suggested) {
  if (suggested.length === 0) return [];

  console.log(`\n  Pruning options:`);
  console.log(`    [s] Skip pruning — keep everything`);
  console.log(`    [a] Accept suggestions — remove ${suggested.length} older entry(s)`);
  console.log(`    [i] Interactive — review each flagged setup`);

  const choice = (await prompt('  Choice [s/a/i]: ')).toLowerCase();

  if (choice === 'a') {
    // Only auto-remove entries with detectable seasons; never remove no-season entries
    return suggested.filter(f => seasonSortKey(f) !== Infinity);
  }

  if (choice === 'i') {
    const toRemove = [];
    for (const filename of suggested) {
      const answer = await prompt(`  Remove ${filename}? (y/N) `);
      if (answer.toLowerCase() === 'y') toRemove.push(filename);
    }
    return toRemove;
  }

  return [];
}

async function handleNewTrack(car, track, pairs, content) {
  console.log(`\nNew track detected in public/setups/${car}/${track}/`);
  const title = await prompt('  Enter track title: ');
  const exportName = title.toUpperCase().replace(/[^A-Z0-9]+/g, '_').replace(/^_+|_+$/g, '');
  console.log(`  → Creating export ${exportName}`);
  console.log(`  → Remember to add it to season-setups.js manually`);

  const entries = Object.fromEntries(CARS.map(c => [c, []]));
  for (const pair of pairs) {
    if (pair.qual) entries[car].push({ filename: pair.qual, isQual: true });
    if (pair.race) entries[car].push({ filename: pair.race, isQual: false });
  }

  return appendNewExport(content, exportName, title, track, entries);
}

// --- Main ---

const newSetups = discoverNewSetups(PROJECT_ROOT);

if (newSetups.length === 0) {
  console.log('No new setup files found. (All .sto files in public/setups/ are already tracked by git.)');
  process.exit(0);
}

console.log(`Found ${newSetups.length} new setup file(s).`);

const trackDataContent = readFileSync(TRACK_DATA_PATH, 'utf8');
const { folderToExport, sharedExports, allExports } = buildFolderMap(trackDataContent);
const trackData = await import(TRACK_DATA_PATH);

// Group by car + track
const groups = new Map();
for (const setup of newSetups) {
  const key = `${setup.car}|${setup.track}`;
  if (!groups.has(key)) groups.set(key, []);
  groups.get(key).push(setup);
}

let currentContent = trackDataContent;
let anyChanges = false;

for (const [key, setups] of groups) {
  const [car, track] = key.split('|');
  const exportName = folderToExport.get(track);

  // Try prefix-fallback for tracks whose arrays are commented out (e.g. DONINGTON_PARK with no active files)
  const resolvedExport = exportName || findExportByFolderPrefix(track, allExports, sharedExports);

  if (!resolvedExport) {
    const pairs = pairSetups(setups);
    currentContent = await handleNewTrack(car, track, pairs, currentContent);
    anyChanges = true;
    continue;
  }

  if (resolvedExport !== exportName) {
    console.log(`\nℹ  Matched "${track}" → ${resolvedExport} (no active file entries found, matched by name)`);
  }

  if (sharedExports.has(resolvedExport)) {
    console.log(`\n⚠  ${resolvedExport} shares setups with another track — skipping ${car}/${track}. Add manually.`);
    continue;
  }

  const pairs = pairSetups(setups);
  const existing = trackData[resolvedExport]?.setups?.[car] ?? [];
  const newCount = pairs.reduce((n, p) => n + (p.qual ? 1 : 0) + (p.race ? 1 : 0), 0);
  const total = existing.length + newCount;

  // Build pruning suggestions: oldest season first, then no-season entries
  let suggested = [];
  if (total > MAX_SETUPS) {
    const toFlag = total - MAX_SETUPS;
    const sorted = [...existing]
      .map(e => ({ filename: e.file.split('/').pop(), sortKey: seasonSortKey(e.file.split('/').pop()) }))
      .sort((a, b) => a.sortKey - b.sortKey);
    suggested = sorted.slice(0, toFlag).map(e => e.filename);
  }

  printPreview(car, track, pairs, existing, suggested);

  const toRemove = await getPruningDecision(existing, suggested);

  const confirm = (await prompt('\n  Apply changes? [y/n] ')).toLowerCase();
  if (confirm !== 'y') {
    console.log('  Skipped.');
    continue;
  }

  for (const filename of toRemove) {
    const filePath = existing.find(e => e.file.endsWith('/' + filename))?.file;
    if (filePath) currentContent = removeEntry(currentContent, filePath);
  }

  const entries = [];
  for (const pair of pairs) {
    if (pair.qual) entries.push(formatEntry(track, pair.qual, true));
    if (pair.race) entries.push(formatEntry(track, pair.race, false));
  }
  try {
    currentContent = insertEntries(currentContent, resolvedExport, car, entries);
    anyChanges = true;
  } catch {
    console.log(`  ⚠  Could not find active "${car}" array in ${resolvedExport} — arrays may be commented out. Add manually.`);
  }
}

if (anyChanges) {
  writeFileSync(TRACK_DATA_PATH, currentContent, 'utf8');
  console.log('\n✓ src/data/track-data.js updated.');
  console.log('  Review: git diff src/data/track-data.js');
} else {
  console.log('\nNo changes written.');
}
