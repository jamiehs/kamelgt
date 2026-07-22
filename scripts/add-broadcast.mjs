import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

import {
    parseSeasonBlocks,
    pickCurrentBlock,
    findUnfilledEntry,
    buildSearchQuery,
    averageRecentOffset,
    insertUrl,
} from './lib/broadcast-data.mjs';
import { checkYtDlpAvailable, searchYouTube } from './lib/yt-search.mjs';
import { prompt } from './lib/prompt.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = path.resolve(__dirname, '..');
const BROADCASTS_PATH = path.join(PROJECT_ROOT, 'src/data/broadcasts.ts');

const CHANNEL_HANDLE = '@GSRCBroadcasting';
const SEARCH_RESULT_COUNT = 20;
const OFFSET_WINDOW = 10;

function formatDuration(seconds) {
    if (!Number.isFinite(seconds)) return 'unknown length';
    const m = Math.floor(seconds / 60);
    const s = Math.round(seconds % 60);
    return `${m}m${String(s).padStart(2, '0')}s`;
}

async function main() {
    if (!checkYtDlpAvailable()) {
        console.error('yt-dlp not found on PATH.');
        console.error('Install it with: brew install yt-dlp');
        process.exit(1);
        return;
    }

    const content = readFileSync(BROADCASTS_PATH, 'utf8');
    const blocks = parseSeasonBlocks(content);
    const today = new Date().toISOString().slice(0, 10);
    const block = pickCurrentBlock(blocks, today);
    if (!block) {
        console.error('No season blocks found in broadcasts.ts.');
        process.exit(1);
        return;
    }

    const found = findUnfilledEntry(block);
    if (!found) {
        console.log(`All broadcasts for ${block.label} already have URLs.`);
        return;
    }
    const { entry, roundNumber } = found;

    const query = buildSearchQuery(block.id);
    let results;
    try {
        results = searchYouTube(query, SEARCH_RESULT_COUNT);
    } catch (err) {
        console.error(`yt-dlp search failed: ${err.stderr ?? err.message}`);
        process.exit(1);
        return;
    }
    const channelResults = results.filter((r) => r.uploaderId === CHANNEL_HANDLE);
    const roundRe = new RegExp(`round\\s+${roundNumber}\\b`, 'i');
    const matches = channelResults.filter((r) => roundRe.test(r.title));

    let chosen;
    if (matches.length === 1) {
        chosen = matches[0];
    } else if (matches.length === 0) {
        console.log(
            `No broadcast found yet for Round ${roundNumber} (${entry.trackKey}) from ${CHANNEL_HANDLE} — try again later.`,
        );
        return;
    } else {
        console.log(`Multiple candidates found for Round ${roundNumber}:`);
        matches.forEach((r, i) => {
            console.log(`  [${i + 1}] ${r.title} (${formatDuration(r.duration)})`);
        });
        const choice = await prompt('  Pick one (number): ');
        const idx = parseInt(choice, 10) - 1;
        if (!(idx >= 0 && idx < matches.length)) {
            console.log('  Invalid choice, aborting.');
            process.exit(1);
            return;
        }
        chosen = matches[idx];
    }

    const offset = averageRecentOffset(content, OFFSET_WINDOW);
    const url = `https://youtu.be/${chosen.id}?t=${offset}`;

    console.log(
        `Found: ${chosen.title} (${formatDuration(chosen.duration)}) — writing t=${offset}`,
    );

    const updated = insertUrl(content, entry, url);
    writeFileSync(BROADCASTS_PATH, updated, 'utf8');
    console.log('\n✓ src/data/broadcasts.ts updated.');
    console.log('  Review: git diff src/data/broadcasts.ts');
}

main();
