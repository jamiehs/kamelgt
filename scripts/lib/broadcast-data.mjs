// Returns the index of the character matching content[openIdx] (which must
// be openChar), counting nested occurrences of openChar/closeChar. Returns
// -1 if no match is found before the end of content.
function findMatchingBrace(content, openIdx, openChar, closeChar) {
    let depth = 0;
    for (let i = openIdx; i < content.length; i++) {
        if (content[i] === openChar) depth++;
        else if (content[i] === closeChar) {
            depth--;
            if (depth === 0) return i;
        }
    }
    return -1;
}

// Splits a `youTube: [ ... ]` array (given its '[' and ']' offsets) into its
// top-level `{ ... }` entries.
function parseYouTubeEntries(content, arrayStart, arrayEnd) {
    const entries = [];
    let depth = 0;
    let entryStart = -1;
    for (let i = arrayStart; i <= arrayEnd; i++) {
        if (content[i] === '{') {
            if (depth === 0) entryStart = i;
            depth++;
        } else if (content[i] === '}') {
            depth--;
            if (depth === 0 && entryStart !== -1) {
                const text = content.slice(entryStart, i + 1);
                const trackMatch = text.match(/\.\.\.\s*tracks\.(\w+)/);
                entries.push({
                    start: entryStart,
                    end: i,
                    trackKey: trackMatch ? trackMatch[1] : null,
                    hasUrl: /\burl\s*:\s*'/.test(text),
                });
                entryStart = -1;
            }
        }
    }
    return entries;
}

// Parses every top-level season object out of broadcasts.ts's raw text.
function parseSeasonBlocks(content) {
    const blocks = [];
    const idRe = /id:\s*'([^']+)'/g;
    let m;
    while ((m = idRe.exec(content)) !== null) {
        let blockStart = m.index;
        while (blockStart > 0 && content[blockStart] !== '{') blockStart--;
        const blockEnd = findMatchingBrace(content, blockStart, '{', '}');
        if (blockEnd === -1) continue;
        const blockText = content.slice(blockStart, blockEnd + 1);

        const labelMatch = blockText.match(/label:\s*'([^']+)'/);
        const startDateMatch = blockText.match(/startDate:\s*'([^']+)'/);
        const endDateMatch = blockText.match(/endDate:\s*'([^']+)'/);

        const youTubeMarker = 'youTube: [';
        const markerIdx = blockText.indexOf(youTubeMarker);
        let entries = [];
        if (markerIdx !== -1) {
            const arrayStart = blockStart + markerIdx + youTubeMarker.length - 1;
            const arrayEnd = findMatchingBrace(content, arrayStart, '[', ']');
            if (arrayEnd !== -1) entries = parseYouTubeEntries(content, arrayStart, arrayEnd);
        }

        blocks.push({
            id: m[1],
            label: labelMatch ? labelMatch[1] : m[1],
            startDate: startDateMatch ? startDateMatch[1] : null,
            endDate: endDateMatch ? endDateMatch[1] : null,
            start: blockStart,
            end: blockEnd,
            entries,
        });
    }
    return blocks;
}

// today: 'YYYY-MM-DD'. Returns the block whose date range contains today,
// else the last block (off-season fallback), else null if blocks is empty.
function pickCurrentBlock(blocks, today) {
    if (blocks.length === 0) return null;
    const inRange = blocks.find(
        (b) => b.startDate && b.endDate && b.startDate <= today && today <= b.endDate,
    );
    return inRange ?? blocks[blocks.length - 1];
}

// Returns the first entry without a url and its 1-based round number, or
// null if every entry in the block already has one.
function findUnfilledEntry(block) {
    const idx = block.entries.findIndex((e) => !e.hasUrl);
    if (idx === -1) return null;
    return { entry: block.entries[idx], roundNumber: idx + 1 };
}

function buildSearchQuery(seasonId) {
    const m = seasonId.match(/^(\d{2})S(\d+)$/);
    if (!m) throw new Error(`Unrecognized season id format: ${seasonId}`);
    const year = 2000 + Number(m[1]);
    return `imsa vintage ${year} s${m[2]}`;
}

// Averages the last windowSize `?t=` offsets found in content, in file
// (chronological) order, rounded to the nearest integer.
function averageRecentOffset(content, windowSize) {
    const matches = [...content.matchAll(/\?t=(\d+)/g)].map((mm) => Number(mm[1]));
    if (matches.length === 0) {
        throw new Error('No existing ?t= offsets found in broadcasts.ts to average from.');
    }
    const recent = matches.slice(-windowSize);
    const sum = recent.reduce((a, b) => a + b, 0);
    return Math.round(sum / recent.length);
}

// Inserts a `url: '<url>',` line right before entry's closing brace,
// after the last existing property.
function insertUrl(content, entry, url) {
    let i = entry.end - 1;
    while (i > entry.start && /\s/.test(content[i])) i--;
    const insertAt = i + 1;
    const line = `\n                url: '${url}',`;
    return content.slice(0, insertAt) + line + content.slice(insertAt);
}

export {
    parseSeasonBlocks,
    pickCurrentBlock,
    findUnfilledEntry,
    buildSearchQuery,
    averageRecentOffset,
    insertUrl,
};
