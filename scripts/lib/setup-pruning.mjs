import { seasonSortKey } from './parse-filename.mjs';

// Returns a comparable recency descriptor for a race setup filename — used
// to rank existing and newly-downloaded candidates together when deciding
// which ~maxCount to keep. Two-tier, most-trusted first:
//   tier 2: the season embedded in the filename (e.g. "26S4") — the
//           semantically meaningful signal for iRacing setups, since car
//           balance changes between seasons, and available for most files.
//   tier 1: the real Discord upload timestamp (from a .meta.json sidecar),
//           used only when no season is embedded in the filename.
//   tier 0: neither signal is available — there's nothing to justify
//           keeping this over a candidate we can positively confirm is more
//           recent, so it ranks lowest.
function recencyTier(filename, timestamp) {
    const season = seasonSortKey(filename);
    if (season !== Infinity) return { tier: 2, value: season };
    if (timestamp) {
        const ms = Date.parse(timestamp);
        if (!Number.isNaN(ms)) return { tier: 1, value: ms };
    }
    return { tier: 0, value: 0 };
}

// Higher tier wins; within a tier, higher value (more recent) wins.
function compareRecency(a, b) {
    const ta = recencyTier(a.filename, a.timestamp);
    const tb = recencyTier(b.filename, b.timestamp);
    if (ta.tier !== tb.tier) return tb.tier - ta.tier;
    return tb.value - ta.value;
}

// candidates: Array<{ key: string, filename: string, timestamp: string|null }>
// Ranks all candidates together — regardless of whether they're already in
// track-data.js or newly downloaded — and keeps the maxCount most recent.
// Ties keep their original input order (stable sort).
// Returns { keepKeys: Set<string>, dropKeys: Set<string> }.
function selectKeepers(candidates, maxCount) {
    const ordered = [...candidates].sort(compareRecency);
    const keepKeys = new Set(ordered.slice(0, maxCount).map((c) => c.key));
    const dropKeys = new Set(ordered.slice(maxCount).map((c) => c.key));
    return { keepKeys, dropKeys };
}

export { recencyTier, compareRecency, selectKeepers };
