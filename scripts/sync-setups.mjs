import { readFileSync, writeFileSync, readdirSync } from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

import { discoverNewSetups } from './lib/git-discover.mjs';
import { readMeta } from './lib/meta.mjs';
import { buildFolderMap, findExportByFolderPrefix } from './lib/track-map.mjs';
import { pairSetups, seasonSortKey, getStem, detectType, looseKey } from './lib/parse-filename.mjs';
import { formatEntry, insertEntries, removeEntry, appendNewExport, addSetupsToExport, hasSetupsBlock } from './lib/write-track-data.mjs';
import { prompt } from './lib/prompt.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = path.resolve(__dirname, '..');
const TRACK_DATA_PATH = path.join(PROJECT_ROOT, 'src/data/track-data.js');
const CARS = ['audi90gto', 'nissangtpzxt'];
const MAX_SETUPS = 4;

const filenameFromPath = p => p.split('/').pop();
const isQual = e => e.comment === 'Qualifying setup';

function printPreview(car, track, pairs, existing, suggested) {
  const newRaceCount = pairs.reduce((n, p) => n + (p.race ? 1 : 0), 0);
  const existingRaceCount = existing.filter(e => !isQual(e)).length;
  const total = existingRaceCount + newRaceCount;
  const pruneNote = total > MAX_SETUPS ? `  ⚠  ${total} race setups after additions (max ${MAX_SETUPS} suggested)` : '';
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
    const filename = filenameFromPath(entry.file);
    const qualTag = isQual(entry) ? ' [QUAL]' : '';
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

// --- Discovery ---

function scanTrackFolder(track) {
  const found = [];
  for (const car of CARS) {
    const dir = path.join(PROJECT_ROOT, 'public/setups', car, track);
    let files;
    try { files = readdirSync(dir); } catch { continue; }
    for (const filename of files) {
      if (filename.endsWith('.sto')) found.push({ car, track, filename });
    }
  }
  return found;
}

// --- Main ---

const targetTrack = process.argv[2];
let newSetups;

if (targetTrack) {
  newSetups = scanTrackFolder(targetTrack);
  if (newSetups.length === 0) {
    console.log(`No .sto files found in public/setups/*/${targetTrack}/`);
    process.exit(0);
  }
  console.log(`Seeding mode: found ${newSetups.length} file(s) in "${targetTrack}"`);
} else {
  newSetups = discoverNewSetups(PROJECT_ROOT);
  if (newSetups.length === 0) {
    console.log('No new setup files found. (All .sto files in public/setups/ are already tracked by git.)');
    process.exit(0);
  }
  console.log(`Found ${newSetups.length} new setup file(s).`);
}

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

for (const [key, rawSetups] of groups) {
  const [car, track] = key.split('|');
  const exportName = folderToExport.get(track);

  // Try prefix-fallback for tracks whose arrays are commented out (e.g. DONINGTON_PARK with no active files)
  const resolvedExport = exportName || findExportByFolderPrefix(track, allExports, sharedExports);

  if (!resolvedExport) {
    const pairs = pairSetups(rawSetups);
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

  const existing = trackData[resolvedExport]?.setups?.[car] ?? [];

  // In seeding mode, exclude files already registered so we don't add duplicates
  const existingFilenames = new Set(existing.map(e => filenameFromPath(e.file)));
  const setups = targetTrack
    ? rawSetups.filter(s => !existingFilenames.has(s.filename))
    : rawSetups;

  if (setups.length === 0) {
    console.log(`\n${car} / ${track} — all files already registered, skipping.`);
    continue;
  }

  // Enrich each setup with authorId from its sidecar if available
  const setupsWithMeta = setups.map(s => {
    const meta = readMeta(path.join(PROJECT_ROOT, 'public/setups', car, track, s.filename));
    return meta ? { ...s, authorId: meta.authorId } : s;
  });

  const allPairs = pairSetups(setupsWithMeta);

  const existingRace = existing.filter(e => !isQual(e));

  // Reject orphaned qualifying setups — a qual with no race sibling is not useful.
  // A qual is only truly orphaned if no matching race exists in existing entries either.
  const orphanedQuals = allPairs.filter(p => {
    if (!p.qual || p.race) return false;
    const qualStem = getStem(p.qual);
    const qualLooseKey = looseKey(p.qual);
    return !existingRace.some(e => {
      const f = filenameFromPath(e.file);
      return getStem(f) === qualStem || (qualLooseKey && looseKey(f) === qualLooseKey);
    });
  });
  for (const p of orphanedQuals) {
    console.log(`\n  ⚠  Skipping orphaned qualifying setup (no matching race found): ${p.qual}`);
  }
  const orphanedQualFiles = new Set(orphanedQuals.map(p => p.qual));
  const pairs = allPairs.filter(p => p.race || (p.qual && !orphanedQualFiles.has(p.qual)));

  if (pairs.length === 0 && orphanedQuals.length > 0) {
    console.log(`  No race setups to add.`);
    continue;
  }

  // Budget counts race setups only; qualifying setups are free
  const newRaceCount = pairs.reduce((n, p) => n + (p.race ? 1 : 0), 0);
  const total = existingRace.length + newRaceCount;

  // Build pruning suggestions from race setups only, oldest season first
  let suggested = [];
  if (total > MAX_SETUPS) {
    const toFlag = total - MAX_SETUPS;
    const sorted = [...existingRace]
      .map(e => ({ filename: filenameFromPath(e.file), sortKey: seasonSortKey(filenameFromPath(e.file)) }))
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
    const raceStem = getStem(filename);
    const pairedQual = existing.find(e => {
      const f = filenameFromPath(e.file);
      return detectType(f).type === 'qual' && getStem(f) === raceStem;
    });
    if (pairedQual) currentContent = removeEntry(currentContent, pairedQual.file);
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
    if (!hasSetupsBlock(currentContent, resolvedExport)) {
      // Export exists but has no setups key — add one (e.g. COTA stub entries)
      const entriesMap = Object.fromEntries(CARS.map(c => [c, []]));
      for (const pair of pairs) {
        if (pair.qual) entriesMap[car].push({ filename: pair.qual, isQual: true });
        if (pair.race) entriesMap[car].push({ filename: pair.race, isQual: false });
      }
      currentContent = addSetupsToExport(currentContent, resolvedExport, track, entriesMap);
      anyChanges = true;
    } else {
      console.log(`  ⚠  Could not insert into "${car}" array in ${resolvedExport} — arrays may be commented out. Add manually.`);
    }
  }
}

if (anyChanges) {
  writeFileSync(TRACK_DATA_PATH, currentContent, 'utf8');
  console.log('\n✓ src/data/track-data.js updated.');
  console.log('  Review: git diff src/data/track-data.js');
} else {
  console.log('\nNo changes written.');
}
