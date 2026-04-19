// @vitest-environment node
import { describe, it, expect } from 'vitest';
import { discoverNewSetups } from '../lib/git-discover.mjs';

const fakeGitOutput = [
  'public/setups/audi90gto/summit-point/maf_summit_25s2_q1.sto',
  'public/setups/audi90gto/summit-point/maf_summit_25s2_r1.sto',
  'public/setups/nissangtpzxt/motegi/Lgo26S2_Motegi_Q80.sto',
  'public/setups/audi90gto/summit-point/.DS_Store',
].join('\n');

const fakeExec = () => fakeGitOutput;

describe('discoverNewSetups', () => {
  it('parses git output into setup objects', () => {
    const setups = discoverNewSetups('/fake/root', fakeExec);
    expect(setups).toHaveLength(3);
  });
  it('extracts car from path', () => {
    const setups = discoverNewSetups('/fake/root', fakeExec);
    expect(setups[0].car).toBe('audi90gto');
    expect(setups[2].car).toBe('nissangtpzxt');
  });
  it('extracts track from path', () => {
    const setups = discoverNewSetups('/fake/root', fakeExec);
    expect(setups[0].track).toBe('summit-point');
    expect(setups[2].track).toBe('motegi');
  });
  it('extracts filename from path', () => {
    const setups = discoverNewSetups('/fake/root', fakeExec);
    expect(setups[0].filename).toBe('maf_summit_25s2_q1.sto');
  });
  it('filters out non-.sto files', () => {
    const setups = discoverNewSetups('/fake/root', fakeExec);
    expect(setups.every(s => s.filename.endsWith('.sto'))).toBe(true);
  });
  it('returns empty array when git output is empty', () => {
    expect(discoverNewSetups('/fake/root', () => '')).toHaveLength(0);
  });
  it('returns empty array when git command throws', () => {
    expect(discoverNewSetups('/fake/root', () => { throw new Error('not a git repo'); })).toHaveLength(0);
  });
});
