import Fuse from 'fuse.js';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';
import { buildFolderMap } from './track-map.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = path.resolve(__dirname, '../..');
const TRACK_DATA_PATH = path.join(PROJECT_ROOT, 'src/data/track-data.js');

function normalize(str) {
    return (str || '')
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase();
}

function buildSearchText(exportName, title, alternateTitle) {
    const nameTokens = normalize(exportName).replace(/_/g, ' ');
    return [nameTokens, normalize(title), normalize(alternateTitle)].filter(Boolean).join(' ');
}

// Parse "setups: SOME_EXPORT.setups" from a chunk of source text.
function parseSharedBase(chunk) {
    const m = chunk.match(/setups:\s+(\w+)\.setups/);
    return m ? m[1] : null;
}

async function buildTrackIndex() {
    const trackData = await import(TRACK_DATA_PATH);
    const fileContent = readFileSync(TRACK_DATA_PATH, 'utf8');
    const { exportToFolder, sharedExports } = buildFolderMap(fileContent);

    // Build a map from shared export → base export name by scanning the source.
    const sharedBaseMap = new Map();
    const exportPattern = /export const (\w+) = \{/g;
    let m;
    while ((m = exportPattern.exec(fileContent)) !== null) {
        const exportName = m[1];
        if (!sharedExports.has(exportName)) continue;
        const blockStart = m.index + m[0].length;
        const nextIdx = fileContent.indexOf('export const ', blockStart);
        const chunk = fileContent.slice(blockStart, nextIdx === -1 ? fileContent.length : nextIdx);
        const base = parseSharedBase(chunk);
        if (base) sharedBaseMap.set(exportName, base);
    }

    const entries = [];
    for (const [exportName, value] of Object.entries(trackData)) {
        if (typeof value !== 'object' || !value?.title) continue;
        let folderName = exportToFolder.get(exportName);
        if (!folderName && sharedExports.has(exportName)) {
            // Inherit folder from the base export this one shares setups with.
            const base = sharedBaseMap.get(exportName);
            folderName = base ? exportToFolder.get(base) : undefined;
        }
        folderName ??= exportName.toLowerCase().replace(/_/g, '-');
        entries.push({
            exportName,
            folderName,
            searchText: buildSearchText(exportName, value.title, value.alternateTitle),
        });
    }

    const fuse = new Fuse(entries, {
        keys: ['searchText'],
        threshold: 0.35,
        includeScore: true,
        minMatchCharLength: 3,
        ignoreLocation: true,
    });

    const folderNames = [...new Set(entries.map((e) => e.folderName))].sort();

    return {
        folderNames,
        // Returns all { exportName, folderName } candidates, deduped by folderName.
        // Exact-substring pass still returns [singleMatch] (unambiguous by definition).
        resolveAll(text) {
            const t = text?.trim();
            if (!t || t.length < 2) return [];

            const queryNorm = normalize(t).replace(/[^a-z0-9]/g, '');
            const subMatch = entries
                .filter((e) => {
                    const fNorm = normalize(e.folderName).replace(/[^a-z0-9]/g, '');
                    return fNorm.length >= 4 && queryNorm.includes(fNorm);
                })
                .sort((a, b) => b.folderName.length - a.folderName.length)[0];
            if (subMatch) return [subMatch];

            const results = fuse.search(t);
            // Dedupe by folderName, keeping the entry with the lowest (best) score.
            const byFolder = new Map();
            for (const r of results) {
                const prev = byFolder.get(r.item.folderName);
                if (!prev || r.score < prev.score) {
                    byFolder.set(r.item.folderName, { item: r.item, score: r.score });
                }
            }
            return [...byFolder.values()].map((v) => v.item);
        },
        // Returns { exportName, folderName } or null.
        resolve(text) {
            return this.resolveAll(text)[0] ?? null;
        },
    };
}

export { buildTrackIndex };
