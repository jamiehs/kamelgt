// @vitest-environment node
import { describe, it, expect } from 'vitest';
import { checkYtDlpAvailable, searchYouTube, parseSearchOutput } from '../lib/yt-search.mjs';

const FIXTURE_OUTPUT = [
    'g7SyuYWPLB0\tIMSA Vintage Series | 2026 Season 3 | Round 1 | Phillip Island | iRacing\t@GSRCBroadcasting\t4380',
    '3Pqvs8D9Npo\tIMSA Vintage, Audi 90 GTO, S3 2026 W6, Detroit. Tuesday. iRacing\t@ianhaycox\t3509',
    '',
    'abc123\tSome video with no duration\t@someoneelse\tNA',
].join('\n');

describe('parseSearchOutput', () => {
    it('parses tab-separated rows into result objects', () => {
        const results = parseSearchOutput(FIXTURE_OUTPUT);
        expect(results).toHaveLength(3);
        expect(results[0]).toEqual({
            id: 'g7SyuYWPLB0',
            title: 'IMSA Vintage Series | 2026 Season 3 | Round 1 | Phillip Island | iRacing',
            uploaderId: '@GSRCBroadcasting',
            duration: 4380,
        });
    });

    it('skips blank lines', () => {
        const results = parseSearchOutput(FIXTURE_OUTPUT);
        expect(results.some((r) => r.id === '')).toBe(false);
    });

    it('maps a non-numeric duration to null', () => {
        const results = parseSearchOutput(FIXTURE_OUTPUT);
        expect(results[2]).toMatchObject({ id: 'abc123', duration: null });
    });

    it('returns an empty array for empty output', () => {
        expect(parseSearchOutput('')).toEqual([]);
    });
});

describe('checkYtDlpAvailable', () => {
    it('returns true when execFn succeeds', () => {
        expect(checkYtDlpAvailable(() => '2025.02.19')).toBe(true);
    });

    it('returns false when execFn throws', () => {
        expect(
            checkYtDlpAvailable(() => {
                throw new Error('command not found');
            }),
        ).toBe(false);
    });
});

describe('searchYouTube', () => {
    it('invokes yt-dlp with a ytsearch query and parses the result', () => {
        const calls = [];
        const fakeExec = (file, args) => {
            calls.push({ file, args });
            return FIXTURE_OUTPUT;
        };

        const results = searchYouTube('imsa vintage 2026 s3', 5, fakeExec);

        expect(calls).toHaveLength(1);
        expect(calls[0].file).toBe('yt-dlp');
        expect(calls[0].args).toContain('ytsearch5:imsa vintage 2026 s3');
        expect(calls[0].args).toContain('--flat-playlist');
        expect(results).toHaveLength(3);
        expect(results[0].uploaderId).toBe('@GSRCBroadcasting');
    });
});
