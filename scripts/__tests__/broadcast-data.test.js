// @vitest-environment node
import { describe, it, expect } from 'vitest';
import {
    parseSeasonBlocks,
    pickCurrentBlock,
    findUnfilledEntry,
    buildSearchQuery,
    averageRecentOffset,
    insertUrl,
} from '../lib/broadcast-data.mjs';

const FIXTURE = `import * as tracks from './track-data.js';
const broadcasts: any[] = [
    {
        id: '25S4',
        label: '2025 Season 4',
        startDate: '2025-09-16',
        endDate: '2025-12-02',
        youTube: [
            {
                ...tracks.SEBRING,
                url: 'https://youtu.be/EVnVa7QS41s?t=890',
            },
            {
                ...tracks.MUGELLO,
                url: 'https://youtu.be/vbAXPeQuJss?t=953',
            },
        ],
    },
    {
        id: '26S1',
        label: '2026 Season 1',
        startDate: '2025-12-16',
        endDate: '2026-03-03',
        youTube: [
            {
                ...tracks.NURBURGRING_COMBINED_24H,
                url: 'https://youtu.be/5KDqj2i0D0M?t=327',
            },
            {
                ...tracks.INTERLAGOS,
                title: 'Custom title',
                url: 'https://youtu.be/0jM6OvtPcmo?t=589',
            },
            {
                ...tracks.MEXICO_NATIONAL_HISTORIC,
            },
        ],
    },
];
export default broadcasts;
`;

describe('parseSeasonBlocks', () => {
    it('parses both season blocks with their metadata', () => {
        const blocks = parseSeasonBlocks(FIXTURE);
        expect(blocks).toHaveLength(2);
        expect(blocks[0]).toMatchObject({
            id: '25S4',
            label: '2025 Season 4',
            startDate: '2025-09-16',
            endDate: '2025-12-02',
        });
        expect(blocks[1]).toMatchObject({
            id: '26S1',
            label: '2026 Season 1',
            startDate: '2025-12-16',
            endDate: '2026-03-03',
        });
    });

    it('parses youTube entries with trackKey and hasUrl', () => {
        const blocks = parseSeasonBlocks(FIXTURE);
        expect(blocks[0].entries).toHaveLength(2);
        expect(blocks[0].entries[0]).toMatchObject({ trackKey: 'SEBRING', hasUrl: true });
        expect(blocks[0].entries[1]).toMatchObject({ trackKey: 'MUGELLO', hasUrl: true });

        expect(blocks[1].entries).toHaveLength(3);
        expect(blocks[1].entries[0]).toMatchObject({
            trackKey: 'NURBURGRING_COMBINED_24H',
            hasUrl: true,
        });
        expect(blocks[1].entries[1]).toMatchObject({ trackKey: 'INTERLAGOS', hasUrl: true });
        expect(blocks[1].entries[2]).toMatchObject({
            trackKey: 'MEXICO_NATIONAL_HISTORIC',
            hasUrl: false,
        });
    });

    it('entry offsets point back into the original content', () => {
        const blocks = parseSeasonBlocks(FIXTURE);
        const entry = blocks[1].entries[2];
        const slice = FIXTURE.slice(entry.start, entry.end + 1);
        expect(slice).toContain('MEXICO_NATIONAL_HISTORIC');
        expect(slice.startsWith('{')).toBe(true);
        expect(slice.endsWith('}')).toBe(true);
    });
});

describe('pickCurrentBlock', () => {
    const blocks = parseSeasonBlocks(FIXTURE);

    it('returns the block whose date range contains today', () => {
        expect(pickCurrentBlock(blocks, '2026-01-15')?.id).toBe('26S1');
    });

    it('falls back to the last block when no range matches', () => {
        expect(pickCurrentBlock(blocks, '2026-06-01')?.id).toBe('26S1');
        expect(pickCurrentBlock(blocks, '2025-01-01')?.id).toBe('26S1');
    });

    it('returns null for an empty block list', () => {
        expect(pickCurrentBlock([], '2026-01-15')).toBeNull();
    });
});

describe('findUnfilledEntry', () => {
    const blocks = parseSeasonBlocks(FIXTURE);

    it('returns null when every entry has a url', () => {
        expect(findUnfilledEntry(blocks[0])).toBeNull();
    });

    it('returns the first unfilled entry and its 1-based round number', () => {
        const result = findUnfilledEntry(blocks[1]);
        expect(result.entry.trackKey).toBe('MEXICO_NATIONAL_HISTORIC');
        expect(result.roundNumber).toBe(3);
    });
});

describe('buildSearchQuery', () => {
    it('builds a query from a season id', () => {
        expect(buildSearchQuery('26S3')).toBe('imsa vintage 2026 s3');
        expect(buildSearchQuery('20S2')).toBe('imsa vintage 2020 s2');
    });

    it('throws on an unrecognized season id format', () => {
        expect(() => buildSearchQuery('bogus')).toThrow();
    });
});

describe('averageRecentOffset', () => {
    it('averages all offsets when windowSize exceeds the count', () => {
        // (890 + 953 + 327 + 589) / 4 = 689.75 -> 690
        expect(averageRecentOffset(FIXTURE, 10)).toBe(690);
    });

    it('averages only the last windowSize offsets, in file order', () => {
        // last 2 in file order: 327 (Nurburgring), 589 (Interlagos) -> 458
        expect(averageRecentOffset(FIXTURE, 2)).toBe(458);
    });

    it('throws when there are no ?t= offsets to average', () => {
        expect(() => averageRecentOffset('const broadcasts = [];', 10)).toThrow();
    });
});

describe('insertUrl', () => {
    it('inserts a url line before the closing brace of a bare entry', () => {
        const blocks = parseSeasonBlocks(FIXTURE);
        const entry = blocks[1].entries[2]; // MEXICO_NATIONAL_HISTORIC, no existing fields
        const updated = insertUrl(FIXTURE, entry, 'https://youtu.be/xyz123?t=456');

        expect(updated).toContain(
            "...tracks.MEXICO_NATIONAL_HISTORIC,\n                url: 'https://youtu.be/xyz123?t=456',\n            },",
        );
        // Untouched entries still present exactly once.
        expect(updated.match(/SEBRING/g)).toHaveLength(1);
        expect(updated.match(/INTERLAGOS/g)).toHaveLength(1);
    });
});
