// @vitest-environment node
import { describe, it, expect } from 'vitest';
import { recencyTier, compareRecency, selectKeepers } from '../lib/setup-pruning.mjs';

describe('recencyTier', () => {
    it('prefers the embedded season over a timestamp (tier 2 beats tier 1)', () => {
        const withSeason = { filename: 'maf_summit_25s2_r1.sto', timestamp: '2020-01-01T00:00:00Z' };
        const withOnlyTimestamp = { filename: 'JdelOlmoSummitPointR.sto', timestamp: '2026-09-29T00:00:00Z' };
        expect(recencyTier(withSeason.filename, withSeason.timestamp).tier).toBe(2);
        expect(recencyTier(withOnlyTimestamp.filename, withOnlyTimestamp.timestamp).tier).toBe(1);
        expect(compareRecency(withSeason, withOnlyTimestamp)).toBeLessThan(0); // withSeason ranks first
    });

    it('falls back to timestamp when no season is embedded', () => {
        const older = recencyTier('SummitPoint22c.sto', '2024-01-01T00:00:00Z');
        const newer = recencyTier('JdelOlmoSummitPointR.sto', '2026-09-29T00:00:00Z');
        expect(older.tier).toBe(1);
        expect(newer.tier).toBe(1);
        expect(newer.value).toBeGreaterThan(older.value);
    });

    it('ranks lowest (tier 0) when neither season nor timestamp is available', () => {
        expect(recencyTier('mystery.sto', null).tier).toBe(0);
    });
});

describe('selectKeepers', () => {
    it('keeps everything when candidates fit within maxCount', () => {
        const candidates = [
            { key: 'a', filename: 'maf_x_26s4_r0.sto', timestamp: null },
            { key: 'b', filename: 'maf_x_25s3_r0.sto', timestamp: null },
        ];
        const { keepKeys, dropKeys } = selectKeepers(candidates, 4);
        expect(keepKeys).toEqual(new Set(['a', 'b']));
        expect(dropKeys.size).toBe(0);
    });

    it('keeps the most recent maxCount by season, regardless of existing-vs-new source', () => {
        // Mirrors the real Mosport/Summit Point situation: existing entries
        // and newly-downloaded ones are ranked as one pool by season.
        const candidates = [
            { key: 'existing-23s3', filename: 'A90_Mosport_23S3_R.sto', timestamp: null },
            { key: 'existing-22s3-a', filename: 'ctmp-22S3-Marc-r1.sto', timestamp: null },
            { key: 'existing-22s3-b', filename: 'ctmp-22S3-r4.sto', timestamp: null },
            { key: 'existing-21s4', filename: 'mosport-21S4-r4.sto', timestamp: null },
            { key: 'new-25s3', filename: 'A90_Mosport__25S3_R.sto', timestamp: null },
            { key: 'new-26s4-a', filename: 'asc_mosport_26s4_r1b.sto', timestamp: null },
            { key: 'new-26s4-b', filename: 'maf_mosport_26s4_r0.sto', timestamp: null },
        ];
        const { keepKeys, dropKeys } = selectKeepers(candidates, 4);
        expect(keepKeys).toEqual(new Set(['new-26s4-a', 'new-26s4-b', 'new-25s3', 'existing-23s3']));
        expect(dropKeys).toEqual(new Set(['existing-22s3-a', 'existing-22s3-b', 'existing-21s4']));
    });

    it('regression: does not drop a recent existing entry in favor of an older new one', () => {
        // The actual Summit Point near-miss: "accept suggestions" used to
        // discard an existing 26S3 (last-season) setup to make room for a
        // newly-downloaded 21S2 (2021) one, purely because it only ever
        // pruned from "existing" and kept 100% of "new" unconditionally.
        const candidates = [
            { key: 'existing-26s3', filename: 'maf_summit_26s3_r0.sto', timestamp: null },
            { key: 'existing-22s4-a', filename: 'A90 - 22S4 - SummitPoint - J Del Olmo - R.sto', timestamp: null },
            { key: 'existing-22s4-b', filename: 'A90 - 22S4 - SummitPoint - M Olle - R.sto', timestamp: null },
            { key: 'existing-21s4', filename: 'summit-21S4-r2.sto', timestamp: null },
            { key: 'new-21s2', filename: 'A90_SummitPoint_21S2_Y_Gijsen_R.sto', timestamp: null },
            { key: 'new-25s2', filename: 'A90_SummitPoint_25S2_Y_Gijsen_R.sto', timestamp: null },
            { key: 'new-25s2-b', filename: 'maf_summit_25s2_r1.sto', timestamp: null },
        ];
        const { keepKeys, dropKeys } = selectKeepers(candidates, 4);
        expect(keepKeys.has('existing-26s3')).toBe(true);
        expect(dropKeys.has('new-21s2')).toBe(true);
    });

    it('unknown-signal candidates are dropped before known-recent ones when over the cap', () => {
        const candidates = [
            { key: 'known', filename: 'maf_x_26s4_r0.sto', timestamp: null },
            { key: 'unknown', filename: 'mystery.sto', timestamp: null },
        ];
        const { keepKeys, dropKeys } = selectKeepers(candidates, 1);
        expect(keepKeys).toEqual(new Set(['known']));
        expect(dropKeys).toEqual(new Set(['unknown']));
    });

    it('breaks exact ties by input order (stable sort)', () => {
        const candidates = [
            { key: 'first', filename: 'mystery1.sto', timestamp: null },
            { key: 'second', filename: 'mystery2.sto', timestamp: null },
        ];
        const { keepKeys } = selectKeepers(candidates, 1);
        expect(keepKeys).toEqual(new Set(['first']));
    });
});
