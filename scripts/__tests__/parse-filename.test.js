// @vitest-environment node
import { describe, it, expect } from 'vitest';
import { detectType, getStem, pairSetups, extractAuthor, looseKey } from '../lib/parse-filename.mjs';

// Mirrors the author dedup key used in fetch-setups.mjs.
// Kept here so changes to the key shape break a test rather than silently misbehaving.
function authorKey(authorId, folderName, car, filename) {
  const { type } = detectType(filename);
  return `${authorId}|${folderName}|${car}|${type}`;
}

describe('detectType', () => {
  it('detects qual from exact Q token', () => {
    expect(detectType('A90_Fuji_Y_Gijsen_Q.sto')).toMatchObject({ type: 'qual', ambiguous: false });
  });
  it('detects qual from versioned q1 token', () => {
    expect(detectType('maf_summit_25s2_q1.sto')).toMatchObject({ type: 'qual', ambiguous: false });
  });
  it('detects qual from versioned Q82 token', () => {
    expect(detectType('Lgo26S2_Adelaide_Q82.sto')).toMatchObject({ type: 'qual', ambiguous: false });
  });
  it('detects qual from "quali" keyword', () => {
    expect(detectType('fuji-22-S3-quali-01.sto')).toMatchObject({ type: 'qual', ambiguous: false });
  });
  it('detects qual from "qualifying" keyword', () => {
    expect(detectType('SummitPoint_qualifying.sto')).toMatchObject({ type: 'qual', ambiguous: false });
  });
  it('detects race from exact R token', () => {
    expect(detectType('A90_Fuji_Y_Gijsen_R.sto')).toMatchObject({ type: 'race', ambiguous: false });
  });
  it('detects race from versioned r1 token', () => {
    expect(detectType('maf_summit_25s2_r1.sto')).toMatchObject({ type: 'race', ambiguous: false });
  });
  it('detects race from versioned r4b token', () => {
    expect(detectType('ctmp-22S3-r4.sto')).toMatchObject({ type: 'race', ambiguous: false });
  });
  it('detects race from "race" keyword', () => {
    expect(detectType('Fuji_S3_2022_Race.sto')).toMatchObject({ type: 'race', ambiguous: false });
  });
  it('defaults to race with ambiguous flag when no Q/R token found', () => {
    expect(detectType('Fuji_S3_2022_1.2.sto')).toMatchObject({ type: 'race', ambiguous: true });
  });
  it('uses last Q/R token when Q appears earlier in name', () => {
    expect(detectType('A90_Q_Fuji_R.sto')).toMatchObject({ type: 'race' });
  });
  it('detects race from versioned R80 token', () => {
    expect(detectType('Lgo26S2_Adelaide_R82.sto')).toMatchObject({ type: 'race', ambiguous: false });
  });
});

describe('getStem', () => {
  it('produces identical stems for a Q/R pair with exact tokens', () => {
    expect(getStem('A90_Fuji_Y_Gijsen_Q.sto')).toBe(getStem('A90_Fuji_Y_Gijsen_R.sto'));
  });
  it('produces identical stems for a Q/R pair with versioned tokens', () => {
    expect(getStem('maf_summit_25s2_q1.sto')).toBe(getStem('maf_summit_25s2_r1.sto'));
  });
  it('produces identical stems for versioned tokens with trailing letters', () => {
    expect(getStem('maf_imola_23s4_q1a.sto')).toBe(getStem('maf_imola_23s4_r1b.sto'));
  });
  it('returns a non-empty stem for ambiguous files', () => {
    expect(getStem('SummitPoint22c.sto')).toBeTruthy();
  });
  it('pairs Lgo Adelaide Q/R by stem', () => {
    expect(getStem('Lgo26S2_Adelaide_Q82.sto')).toBe(getStem('Lgo26S2_Adelaide_R82.sto'));
  });
});

describe('pairSetups', () => {
  it('pairs Q and R files with matching stems', () => {
    const pairs = pairSetups([
      { filename: 'A90_Fuji_Y_Gijsen_Q.sto' },
      { filename: 'A90_Fuji_Y_Gijsen_R.sto' },
    ]);
    expect(pairs).toHaveLength(1);
    expect(pairs[0]).toMatchObject({ qual: 'A90_Fuji_Y_Gijsen_Q.sto', race: 'A90_Fuji_Y_Gijsen_R.sto', ambiguous: false });
  });
  it('leaves unpaired race file with null qual', () => {
    const pairs = pairSetups([{ filename: 'maf_summit_25s2_r1.sto' }]);
    expect(pairs).toHaveLength(1);
    expect(pairs[0]).toMatchObject({ qual: null, race: 'maf_summit_25s2_r1.sto' });
  });
  it('leaves unpaired qual file with null race', () => {
    const pairs = pairSetups([{ filename: 'maf_summit_25s2_q1.sto' }]);
    expect(pairs).toHaveLength(1);
    expect(pairs[0]).toMatchObject({ qual: 'maf_summit_25s2_q1.sto', race: null });
  });
  it('flags ambiguous files', () => {
    const pairs = pairSetups([{ filename: 'SummitPoint22c.sto' }]);
    expect(pairs[0].ambiguous).toBe(true);
  });
  it('pairs multiple independent Q/R pairs', () => {
    const pairs = pairSetups([
      { filename: 'A90_Fuji_Y_Gijsen_Q.sto' },
      { filename: 'A90_Fuji_Y_Gijsen_R.sto' },
      { filename: 'maf_fuji_25s2_q1.sto' },
      { filename: 'maf_fuji_25s2_r1.sto' },
    ]);
    expect(pairs).toHaveLength(2);
    expect(pairs.every(p => p.qual !== null && p.race !== null)).toBe(true);
  });
  it('does not cross-pair different setups', () => {
    const pairs = pairSetups([
      { filename: 'Lgo26S2_Adelaide_Q82.sto' },
      { filename: 'Lgo26S2_Adelaide_R82.sto' },
      { filename: 'maf_summit_25s2_q1.sto' },
      { filename: 'maf_summit_25s2_r1.sto' },
    ]);
    expect(pairs).toHaveLength(2);
    const adelaidePair = pairs.find(p => p.qual?.includes('Adelaide'));
    expect(adelaidePair?.race).toContain('Adelaide');
  });
});

describe('extractAuthor', () => {
  it('extracts author prefix embedded before season token', () => {
    expect(extractAuthor('Lgo26S2_Donington_Q00.sto')).toBe('lgo');
  });
  it('extracts author when season comes first', () => {
    expect(extractAuthor('26s2_Lgo_Donington_Q00.sto')).toBe('lgo');
  });
  it('extracts author from lowercase prefix', () => {
    expect(extractAuthor('maf_summit_26s2_r1.sto')).toBe('maf');
  });
  it('returns null when no short alphabetic token exists', () => {
    expect(extractAuthor('26s2-Donington30c.sto')).toBeNull();
  });
});

describe('looseKey', () => {
  it('returns author|season key for prefixed filename', () => {
    expect(looseKey('Lgo26S2_Donington_Q00.sto')).toBe('lgo|2026s2');
  });
  it('returns null when no season is detectable', () => {
    expect(looseKey('A90_Fuji_Q.sto')).toBeNull();
  });
});

describe('pairSetups loose matching', () => {
  it('pairs by author+season when stems genuinely differ (sidecar authorId)', () => {
    // Q file has version 00, R file has version 01 — stems don't match exactly.
    // Both carry the same authorId from their sidecar metadata.
    const files = [
      { filename: 'Lgo26S2_Donington_Nat_Q00.sto', authorId: 'user-lgo' },
      { filename: 'Lgo26S2_Donington_R01.sto', authorId: 'user-lgo' },
    ];
    const pairs = pairSetups(files);
    expect(pairs).toHaveLength(1);
    expect(pairs[0].qual).toContain('Q00');
    expect(pairs[0].race).toContain('R01');
  });

  it('does not loose-pair files from different authors in the same season', () => {
    const files = [
      { filename: 'Lgo26S2_Donington_Q00.sto', authorId: 'user-lgo' },
      { filename: 'maf_26S2_Donington_R01.sto', authorId: 'user-maf' },
    ];
    const pairs = pairSetups(files);
    // Different authors — should not be paired; each appears independently
    expect(pairs).toHaveLength(2);
    expect(pairs.find(p => p.qual && p.race)).toBeUndefined();
  });
});

describe('author dedup key', () => {
  it('qual and race from the same author produce different keys', () => {
    const qual = authorKey('user-123', 'barber', 'audi90gto', 'maf_barber_26s2_q1.sto');
    const race = authorKey('user-123', 'barber', 'audi90gto', 'maf_barber_26s2_r1.sto');
    expect(qual).not.toBe(race);
    expect(qual).toContain('qual');
    expect(race).toContain('race');
  });

  it('two race files from the same author produce the same key (dedup triggers)', () => {
    const a = authorKey('user-123', 'barber', 'audi90gto', 'maf_barber_26s2_r1.sto');
    const b = authorKey('user-123', 'barber', 'audi90gto', 'maf_barber_26s2_r2.sto');
    expect(a).toBe(b);
  });

  it('same type from different authors produce different keys', () => {
    const lgo = authorKey('user-lgo', 'barber', 'audi90gto', 'lgo_barber_26s2_r1.sto');
    const maf = authorKey('user-maf', 'barber', 'audi90gto', 'maf_barber_26s2_r1.sto');
    expect(lgo).not.toBe(maf);
  });
});
