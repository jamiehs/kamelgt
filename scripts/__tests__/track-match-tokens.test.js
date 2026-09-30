// @vitest-environment node
import { describe, it, expect } from 'vitest';
import { isTrackCandidateToken } from '../lib/track-match-tokens.mjs';

describe('isTrackCandidateToken', () => {
    it('rejects car/series identifier words that fuzzy-collide with real tracks', () => {
        // "audi" fuzzy-matches Mosport, "nissan" fuzzy-matches Sandown/Misano
        // in track-index.mjs's Fuse search — confirmed live 2026-09-30 when
        // "JdelOlmo_Audi_Barcelona_25S4A.sto" got misfiled into Mosport.
        expect(isTrackCandidateToken('audi')).toBe(false);
        expect(isTrackCandidateToken('nissan')).toBe(false);
        expect(isTrackCandidateToken('gto')).toBe(false);
        expect(isTrackCandidateToken('a90')).toBe(false);
    });

    it('is case-insensitive for car/series words', () => {
        expect(isTrackCandidateToken('Audi')).toBe(false);
        expect(isTrackCandidateToken('NISSAN')).toBe(false);
    });

    it('rejects qual/race markers (delegates to classifyToken)', () => {
        expect(isTrackCandidateToken('quali')).toBe(false);
        expect(isTrackCandidateToken('r2b')).toBe(false);
    });

    it('rejects tokens shorter than 3 chars and purely numeric tokens', () => {
        expect(isTrackCandidateToken('ab')).toBe(false);
        expect(isTrackCandidateToken('123')).toBe(false);
    });

    it('accepts plausible track-name tokens', () => {
        expect(isTrackCandidateToken('Barcelona')).toBe(true);
        expect(isTrackCandidateToken('Mosport')).toBe(true);
        expect(isTrackCandidateToken('silvoHistoric')).toBe(true);
        expect(isTrackCandidateToken('JdelOlmo')).toBe(true);
    });
});
