import { classifyToken } from './parse-filename.mjs';

// Car/series identifier words: never a track name, but short ones can
// spuriously fuzzy-match a real track in track-index.mjs's Fuse search
// (e.g. "audi" fuzzy-matches "Mosport", "nissan" fuzzy-matches "Sandown"/
// "Misano"). Excluded from track-name candidates for the same reason
// qual/race markers are excluded via classifyToken.
const CAR_TOKENS = new Set(['audi', 'a90', 'gto', 'nissan', 'gtp', 'zxt', 'gsrc']);

// Whether a filename token could plausibly identify a track — as opposed to
// setup type (qual/race), car/series identity, or noise too short/numeric
// to be useful. Used to filter tokens before trying them against the track
// index, so generic vocabulary never gets a chance to fuzzy-match a track.
function isTrackCandidateToken(token) {
    if (token.length < 3) return false;
    if (/^\d+$/.test(token)) return false;
    if (classifyToken(token)) return false;
    if (CAR_TOKENS.has(token.toLowerCase())) return false;
    return true;
}

export { isTrackCandidateToken, CAR_TOKENS };
