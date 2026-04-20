// @vitest-environment node
import { describe, it, expect, beforeAll } from 'vitest';
import { buildTrackIndex } from '../lib/track-index.mjs';

// These tests run against the real track-data.js — they are integration tests.
// If a track is renamed or removed, update the expected folderName accordingly.

let index;

beforeAll(async () => {
  index = await buildTrackIndex();
});

describe('buildTrackIndex', () => {
  it('resolves exact short name', () => {
    const result = index.resolve('barber');
    expect(result?.folderName).toBe('barber');
  });

  it('resolves by alternateTitle word (Bathurst = Mount Panorama)', () => {
    const result = index.resolve('panorama');
    expect(result?.folderName).toBe('bathurst');
  });

  it('resolves COTA by abbreviation', () => {
    const result = index.resolve('cota');
    expect(result?.folderName).toBe('cota');
  });

  it('resolves COTA by alternateTitle word', () => {
    const result = index.resolve('americas');
    expect(result?.folderName).toBe('cota');
  });

  it('resolves by partial name prefix', () => {
    const result = index.resolve('snett');
    expect(result?.exportName).toContain('SNETTERTON');
  });

  it('resolves by alternateTitle fragment (Mexico = Rodriguez)', () => {
    const result = index.resolve('rodriguez');
    expect(result?.exportName).toContain('MEXICO');
  });

  it('resolves fuji', () => {
    const result = index.resolve('fuji');
    expect(result?.exportName).toContain('FUJI');
  });

  it('returns null for gibberish', () => {
    expect(index.resolve('xyzqwerty123')).toBeNull();
  });

  it('returns null for empty string', () => {
    expect(index.resolve('')).toBeNull();
  });

  it('returns null for null', () => {
    expect(index.resolve(null)).toBeNull();
  });

  it('every resolved result has a folderName', () => {
    const result = index.resolve('imola');
    expect(result?.folderName).toBeTruthy();
  });
});
