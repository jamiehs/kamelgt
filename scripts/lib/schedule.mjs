import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SEASON_SETUPS_PATH = path.resolve(__dirname, '../../src/data/season-setups.ts');

function buildSchedule() {
    const content = readFileSync(SEASON_SETUPS_PATH, 'utf8');
    const schedule = [];
    const re = /\.\.\.\s*tracks\.(\w+)[\s\S]*?weekStart:\s*['"](\d{4}-\d{2}-\d{2})['"]/g;
    let m;
    while ((m = re.exec(content)) !== null) {
        schedule.push({ exportName: m[1], weekStart: m[2] });
    }
    if (schedule.length === 0) {
        throw new Error(
            `buildSchedule: no entries parsed from ${SEASON_SETUPS_PATH} — check file format`,
        );
    }
    return schedule.sort((a, b) => a.weekStart.localeCompare(b.weekStart));
}

// timestamp: ISO 8601 string. Returns null if no candidate matches the two-week window.
function pickBySchedule(candidates, timestamp, schedule) {
    const date = new Date(timestamp);
    // Last schedule entry whose weekStart is on or before the attachment date
    const idx = schedule.findLastIndex(
        (e) => new Date(e.weekStart + 'T00:00:00Z') <= date,
    );
    if (idx === -1) return null;

    const relevant = schedule.slice(idx, idx + 2).map((e) => e.exportName);
    const matches = candidates.filter((c) => relevant.includes(c.exportName));
    return matches.length === 1 ? matches[0] : null;
}

export { buildSchedule, pickBySchedule };
