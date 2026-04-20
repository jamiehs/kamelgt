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

async function buildTrackIndex() {
    const trackData = await import(TRACK_DATA_PATH);
    const fileContent = readFileSync(TRACK_DATA_PATH, 'utf8');
    const { exportToFolder } = buildFolderMap(fileContent);

    const entries = [];
    for (const [exportName, value] of Object.entries(trackData)) {
        if (typeof value !== 'object' || !value?.title) continue;
        const folderName =
            exportToFolder.get(exportName) ?? exportName.toLowerCase().replace(/_/g, '-');
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
        // Returns { exportName, folderName } or null.
        resolve(text) {
            const t = text?.trim();
            if (!t || t.length < 2) return null;

            // Exact-substring pass: does the query contain a known folder name?
            // Handles filenames like "JdelOlmoImola22S4D" where the track name
            // is embedded without a separator.
            const queryNorm = normalize(t).replace(/[^a-z0-9]/g, '');
            const subMatch = entries
                .filter((e) => {
                    const fNorm = normalize(e.folderName).replace(/[^a-z0-9]/g, '');
                    return fNorm.length >= 4 && queryNorm.includes(fNorm);
                })
                .sort((a, b) => b.folderName.length - a.folderName.length)[0];
            if (subMatch) return subMatch;

            const results = fuse.search(t);
            return results.length > 0 ? results[0].item : null;
        },
    };
}

export { buildTrackIndex };
