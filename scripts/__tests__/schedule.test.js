// @vitest-environment node
import { describe, it, expect } from 'vitest';
import { pickBySchedule } from '../lib/schedule.mjs';

const SCHEDULE = [
    { exportName: 'ROAD_ATLANTA', weekStart: '2026-03-17' },
    { exportName: 'COTA', weekStart: '2026-04-21' },
    { exportName: 'MIAMI_INTERNATIONAL_AUTODROME', weekStart: '2026-04-28' },
    { exportName: 'BATHURST', weekStart: '2026-05-05' },
];

const HOMESTEAD = { exportName: 'HOMESTEAD_MIAMI_ROAD_A', folderName: 'miami-homestead' };
const MIA = { exportName: 'MIAMI_INTERNATIONAL_AUTODROME', folderName: 'miami-international-autodrome' };
const candidates = [HOMESTEAD, MIA];

describe('pickBySchedule', () => {
    it('resolves to the candidate scheduled for the current week', () => {
        // Timestamp in MIAMI week (Apr 28–May 5). idx=2 (MIAMI). relevant=[MIAMI, BATHURST].
        // MIA matches; HOMESTEAD does not.
        const result = pickBySchedule(candidates, '2026-04-29T12:00:00Z', SCHEDULE);
        expect(result?.exportName).toBe('MIAMI_INTERNATIONAL_AUTODROME');
    });

    it('resolves to the candidate scheduled for next week', () => {
        // Timestamp in COTA week (Apr 21–28). idx=1 (COTA). relevant=[COTA, MIAMI].
        // MIA matches next week; HOMESTEAD does not appear.
        const result = pickBySchedule(candidates, '2026-04-22T12:00:00Z', SCHEDULE);
        expect(result?.exportName).toBe('MIAMI_INTERNATIONAL_AUTODROME');
    });

    it('returns null when both candidates fall within the two-week window', () => {
        const scheduleWithBoth = [
            { exportName: 'HOMESTEAD_MIAMI_ROAD_A', weekStart: '2026-04-21' },
            { exportName: 'MIAMI_INTERNATIONAL_AUTODROME', weekStart: '2026-04-28' },
        ];
        // Timestamp Apr 22 → idx=0 (HOMESTEAD). relevant=[HOMESTEAD, MIAMI]. Both match.
        const result = pickBySchedule(candidates, '2026-04-22T12:00:00Z', scheduleWithBoth);
        expect(result).toBeNull();
    });

    it('returns null when timestamp is before the season starts', () => {
        const result = pickBySchedule(candidates, '2026-01-01T12:00:00Z', SCHEDULE);
        expect(result).toBeNull();
    });
});
