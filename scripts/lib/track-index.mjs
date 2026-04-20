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
  return [nameTokens, normalize(title), normalize(alternateTitle)]
    .filter(Boolean)
    .join(' ');
}

async function buildTrackIndex() {
  const trackData = await import(TRACK_DATA_PATH);
  const fileContent = readFileSync(TRACK_DATA_PATH, 'utf8');
  const { exportToFolder } = buildFolderMap(fileContent);

  const entries = [];
  for (const [exportName, value] of Object.entries(trackData)) {
    if (typeof value !== 'object' || !value?.title) continue;
    const folderName = exportToFolder.get(exportName)
      ?? exportName.toLowerCase().replace(/_/g, '-');
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

  return {
    // Returns { exportName, folderName } or null.
    resolve(text) {
      if (!text?.trim() || text.trim().length < 2) return null;
      const results = fuse.search(text.trim());
      return results.length > 0 ? results[0].item : null;
    },
  };
}

export { buildTrackIndex };
