const INDENT = '            '; // 12 spaces — matches track-data.js indentation style

// Returns { start, end } where content[start] === '[' and content[end] === ']'
// for the array belonging to carName within exportName's setups block.
function findCarArrayBounds(content, exportName, carName) {
    const exportMarker = `export const ${exportName} = {`;
    const exportStart = content.indexOf(exportMarker);
    if (exportStart === -1) return null;

    const nextExport = content.indexOf('export const ', exportStart + exportMarker.length);
    const exportEnd = nextExport === -1 ? content.length : nextExport;
    const exportBlock = content.slice(exportStart, exportEnd);

    const carMarkerQuoted = `"${carName}": [`;
    const carMarkerUnquoted = `${carName}: [`;
    let carLocalIdx = exportBlock.indexOf(carMarkerQuoted);
    let carMarker = carMarkerQuoted;
    if (carLocalIdx === -1) {
        carLocalIdx = exportBlock.indexOf(carMarkerUnquoted);
        carMarker = carMarkerUnquoted;
    }
    if (carLocalIdx === -1) return null;

    const bracketOpen = exportStart + carLocalIdx + carMarker.length - 1;

    let depth = 0;
    let i = bracketOpen;
    while (i < content.length) {
        if (content[i] === '[') depth++;
        else if (content[i] === ']') {
            depth--;
            if (depth === 0) return { start: bracketOpen, end: i };
        }
        i++;
    }
    return null;
}

function formatEntry(trackFolder, filename, isQual) {
    let entry = `${INDENT}{\n${INDENT}    file: "${trackFolder}/${filename}",\n`;
    if (isQual) entry += `${INDENT}    comment: QUAL\n`;
    entry += `${INDENT}},\n`;
    return entry;
}

// Inserts formatted entry strings before the closing ] of the car array.
function insertEntries(content, exportName, carName, entries) {
    const bounds = findCarArrayBounds(content, exportName, carName);
    if (!bounds) throw new Error(`Could not locate "${carName}" array in ${exportName}`);
    const toInsert = entries.join('');
    return content.slice(0, bounds.end) + toInsert + content.slice(bounds.end);
}

// Removes the entry block containing filePath (e.g. "summit-point/foo.sto").
function removeEntry(content, filePath) {
    const fileRef = `"${filePath}"`;
    const refIdx = content.indexOf(fileRef);
    if (refIdx === -1) return content;

    let openBrace = refIdx;
    while (openBrace > 0 && content[openBrace] !== '{') openBrace--;

    let closeBrace = refIdx;
    while (closeBrace < content.length && content[closeBrace] !== '}') closeBrace++;

    let end = closeBrace + 1;
    if (content[end] === ',') end++;
    if (content[end] === '\n') end++;

    // Strip leading whitespace up to (but not including) the preceding newline
    let start = openBrace;
    while (start > 0 && content[start - 1] !== '\n') start--;

    return content.slice(0, start) + content.slice(end);
}

// Appends a new full export block for a previously unknown track.
// entries: { [car]: Array<{ filename, isQual }> }
function appendNewExport(content, exportName, title, trackFolder, entries) {
    const cars = ['audi90gto', 'nissangtpzxt'];
    let block = `\nexport const ${exportName} = {\n    title: "${title}",\n    setups: {\n`;

    for (const car of cars) {
        const carEntries = entries[car] ?? [];
        block += `        "${car}": [\n`;
        for (const { filename, isQual } of carEntries) {
            block += formatEntry(trackFolder, filename, isQual);
        }
        block += `        ],\n`;
    }

    block += `    }\n}\n`;
    return content + block;
}

// Adds a full setups block to an existing export that has none.
// entries: { [car]: Array<{ filename, isQual }> }
// Inserts before the export's closing brace using brace-counting.
function addSetupsToExport(content, exportName, trackFolder, entries) {
    const exportMarker = `export const ${exportName} = {`;
    const exportStart = content.indexOf(exportMarker);
    if (exportStart === -1) throw new Error(`Export ${exportName} not found`);

    // Find the closing } of the export using brace counting
    let depth = 1;
    let i = exportStart + exportMarker.length;
    while (i < content.length && depth > 0) {
        if (content[i] === '{') depth++;
        else if (content[i] === '}') depth--;
        i++;
    }
    const closingBrace = i - 1;

    const cars = ['audi90gto', 'nissangtpzxt'];
    let setupsBlock = `,\n    setups: {\n`;
    for (const car of cars) {
        const carEntries = entries[car] ?? [];
        setupsBlock += `        "${car}": [\n`;
        for (const { filename, isQual } of carEntries) {
            setupsBlock += formatEntry(trackFolder, filename, isQual);
        }
        setupsBlock += `        ],\n`;
    }
    setupsBlock += `    }`;

    return content.slice(0, closingBrace) + setupsBlock + content.slice(closingBrace);
}

// Returns true if the export already has an active (non-commented) setups key.
function hasSetupsBlock(content, exportName) {
    const exportMarker = `export const ${exportName} = {`;
    const exportStart = content.indexOf(exportMarker);
    if (exportStart === -1) return false;
    const nextExport = content.indexOf('export const ', exportStart + exportMarker.length);
    const exportEnd = nextExport === -1 ? content.length : nextExport;
    const block = content.slice(exportStart, exportEnd);
    return /(?<!\/\/\s*)setups\s*:/.test(block);
}

export {
    findCarArrayBounds,
    formatEntry,
    insertEntries,
    removeEntry,
    appendNewExport,
    addSetupsToExport,
    hasSetupsBlock,
};
