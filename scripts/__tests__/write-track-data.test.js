// @vitest-environment node
import { describe, it, expect } from 'vitest';
import {
    findCarArrayBounds,
    formatEntry,
    insertEntries,
    removeEntry,
    appendNewExport,
} from '../lib/write-track-data.mjs';

const SAMPLE = `const QUAL = "Qualifying setup";

export const SUMMIT_POINT = {
    title: "Summit Point",
    setups: {
        "audi90gto": [
            {
                file: "summit-point/existing_R.sto",
            },
        ],
        "nissangtpzxt": [],
    }
}
export const OTHER_TRACK = {
    title: "Other",
    setups: {
        "audi90gto": [
            {
                file: "other/other_R.sto",
            },
        ],
        "nissangtpzxt": [],
    }
}
`;

describe('findCarArrayBounds', () => {
    it('finds bounds of audi90gto array', () => {
        const bounds = findCarArrayBounds(SAMPLE, 'SUMMIT_POINT', 'audi90gto');
        expect(bounds).not.toBeNull();
        expect(SAMPLE[bounds.start]).toBe('[');
        expect(SAMPLE[bounds.end]).toBe(']');
    });
    it('does not cross into the next export', () => {
        const bounds = findCarArrayBounds(SAMPLE, 'SUMMIT_POINT', 'audi90gto');
        expect(bounds.start).toBeLessThan(SAMPLE.indexOf('export const OTHER_TRACK'));
    });
    it('finds bounds of empty nissangtpzxt array', () => {
        const bounds = findCarArrayBounds(SAMPLE, 'SUMMIT_POINT', 'nissangtpzxt');
        expect(bounds).not.toBeNull();
        expect(SAMPLE[bounds.start]).toBe('[');
        expect(SAMPLE[bounds.end]).toBe(']');
    });
    it('returns null for unknown export', () => {
        expect(findCarArrayBounds(SAMPLE, 'NONEXISTENT', 'audi90gto')).toBeNull();
    });
    it('returns null for unknown car key', () => {
        expect(findCarArrayBounds(SAMPLE, 'SUMMIT_POINT', 'unknowncar')).toBeNull();
    });
});

describe('formatEntry', () => {
    it('formats a race entry without comment', () => {
        const entry = formatEntry('summit-point', 'new_R.sto', false);
        expect(entry).toContain("file: 'summit-point/new_R.sto'");
        expect(entry).not.toContain('comment');
    });
    it('formats a qualifying entry with QUAL comment', () => {
        const entry = formatEntry('summit-point', 'new_Q.sto', true);
        expect(entry).toContain("file: 'summit-point/new_Q.sto'");
        expect(entry).toContain('comment: QUAL');
    });
});

describe('insertEntries', () => {
    it('inserts a new entry into an existing car array', () => {
        const result = insertEntries(SAMPLE, 'SUMMIT_POINT', 'audi90gto', [
            formatEntry('summit-point', 'new_R.sto', false),
        ]);
        expect(result).toContain('new_R.sto');
        expect(result).toContain('existing_R.sto');
    });
    it('prepends new entry before existing entries', () => {
        const result = insertEntries(SAMPLE, 'SUMMIT_POINT', 'audi90gto', [
            formatEntry('summit-point', 'new_R.sto', false),
        ]);
        expect(result.indexOf('new_R.sto')).toBeLessThan(result.indexOf('existing_R.sto'));
    });
    it('inserts qual before race when given as ordered pair', () => {
        const result = insertEntries(SAMPLE, 'SUMMIT_POINT', 'audi90gto', [
            formatEntry('summit-point', 'new_Q.sto', true),
            formatEntry('summit-point', 'new_R.sto', false),
        ]);
        expect(result.indexOf('new_Q.sto')).toBeLessThan(result.indexOf('new_R.sto'));
    });
    it('inserts into empty nissangtpzxt array', () => {
        const result = insertEntries(SAMPLE, 'SUMMIT_POINT', 'nissangtpzxt', [
            formatEntry('summit-point', 'nissan_R.sto', false),
        ]);
        expect(result).toContain('nissan_R.sto');
    });
    it('does not modify the other export', () => {
        const result = insertEntries(SAMPLE, 'SUMMIT_POINT', 'audi90gto', [
            formatEntry('summit-point', 'new_R.sto', false),
        ]);
        expect(result).toContain('other/other_R.sto');
    });
    it('throws for unknown export', () => {
        expect(() => insertEntries(SAMPLE, 'NONEXISTENT', 'audi90gto', [])).toThrow();
    });
});

describe('removeEntry', () => {
    it('removes an entry by its full file path', () => {
        const result = removeEntry(SAMPLE, 'summit-point/existing_R.sto');
        expect(result).not.toContain('existing_R.sto');
    });
    it('preserves other entries when removing one', () => {
        const result = removeEntry(SAMPLE, 'summit-point/existing_R.sto');
        expect(result).toContain('other/other_R.sto');
    });
    it('returns content unchanged when file path not found', () => {
        const result = removeEntry(SAMPLE, 'summit-point/nonexistent.sto');
        expect(result).toBe(SAMPLE);
    });
});

describe('appendNewExport', () => {
    it('appends a new export block', () => {
        const entries = {
            audi90gto: [
                { filename: 'new_Q.sto', isQual: true },
                { filename: 'new_R.sto', isQual: false },
            ],
            nissangtpzxt: [],
        };
        const result = appendNewExport(
            SAMPLE,
            'LIME_ROCK_CLASSIC',
            'Lime Rock Park - Classic',
            'lime-rock-classic',
            entries,
        );
        expect(result).toContain('export const LIME_ROCK_CLASSIC = {');
        expect(result).toContain('title: "Lime Rock Park - Classic"');
        expect(result).toContain('lime-rock-classic/new_Q.sto');
        expect(result).toContain('comment: QUAL');
        expect(result).toContain('lime-rock-classic/new_R.sto');
    });
    it('preserves original content', () => {
        const result = appendNewExport(SAMPLE, 'NEW_TRACK', 'New Track', 'new-track', {
            audi90gto: [],
            nissangtpzxt: [],
        });
        expect(result).toContain('existing_R.sto');
    });
});
