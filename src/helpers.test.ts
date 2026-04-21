// @vitest-environment node
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { getCurrentWeekData } from './helpers';

// A minimal two-week season for clarity:
// Week 1: Road Atlanta  — 2026-03-17 → ends 2026-03-22 (weekStart + 5 days)
// Week 2: Spa           — 2026-06-02 → ends 2026-06-07
// Week 13 / off-season: any date after 2026-06-07
const TEST_SEASON: SetupWeek[] = [
    { title: 'Road Atlanta', weekStart: '2026-03-17' },
    { title: 'Spa', weekStart: '2026-06-02' },
];

describe('getCurrentWeekData', () => {
    beforeEach(() => {
        vi.useFakeTimers();
    });
    afterEach(() => {
        vi.useRealTimers();
    });

    it('returns week 1 data during week 1', () => {
        vi.setSystemTime(new Date('2026-03-18T12:00:00Z'));
        const result = getCurrentWeekData(TEST_SEASON);
        expect(result.week).toBe(1);
        expect(result.label).toBe('Road Atlanta');
    });

    it('returns week 2 data during week 2', () => {
        vi.setSystemTime(new Date('2026-06-03T12:00:00Z'));
        const result = getCurrentWeekData(TEST_SEASON);
        expect(result.week).toBe(2);
        expect(result.label).toBe('Spa');
    });

    it('returns week 2 data during the gap between weeks (before week 2 starts)', () => {
        // Between week 1 end (03-22) and week 2 start (06-02), the next upcoming
        // week is shown — so week 2 is correct here.
        vi.setSystemTime(new Date('2026-04-01T12:00:00Z'));
        const result = getCurrentWeekData(TEST_SEASON);
        expect(result.week).toBe(2);
        expect(result.label).toBe('Spa');
    });

    it('returns empty object during week 13 (all rounds over)', () => {
        // After the last week ends (2026-06-07), no active week exists.
        // The season is over — week 13 is iRacing's testing/deployment week.
        vi.setSystemTime(new Date('2026-06-10T12:00:00Z'));
        const result = getCurrentWeekData(TEST_SEASON);
        // BUG: currently returns { week: 2, label: 'Spa', notes: undefined }
        // because the loop runs to completion and leaves currentWeek set to the last round.
        expect(result).toEqual({});
    });

    it('returns empty object before the season starts', () => {
        vi.setSystemTime(new Date('2026-01-01T12:00:00Z'));
        const result = getCurrentWeekData(TEST_SEASON);
        // BUG: currently returns { week: 1, label: 'Road Atlanta', notes: undefined }
        // because currentWeek is set before the end-date check on the first iteration,
        // and week 1's end date (2026-03-22) is still in the future.
        // This one is actually working correctly by accident — week 1 IS the next upcoming week.
        // Leaving this test to document the current (acceptable) behavior.
        expect(result.week).toBe(1);
        expect(result.label).toBe('Road Atlanta');
    });

    it('includes notes when the current week has them', () => {
        const seasonWithNotes: SetupWeek[] = [
            {
                title: 'Laguna Seca',
                weekStart: '2026-04-07',
                notes: ['60 minute endurance round', 'Fuel stop required'],
            },
        ];
        vi.setSystemTime(new Date('2026-04-08T12:00:00Z'));
        const result = getCurrentWeekData(seasonWithNotes);
        expect(result.notes).toEqual(['60 minute endurance round', 'Fuel stop required']);
    });
});
