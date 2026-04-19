// @vitest-environment node
import { describe, it, expect } from 'vitest';
import { buildFolderMap } from '../lib/track-map.mjs';

const SAMPLE = `const QUAL = "Qualifying setup";

export const SUMMIT_POINT = {
    title: "Summit Point",
    setups: {
        "audi90gto": [
            {
                file: "summit-point/A90_SummitPoint_25S2_Q.sto",
                comment: QUAL
            },
        ],
        "nissangtpzxt": [],
    }
}
export const ARAGON_OUTER = {
    title: "Aragón - Outer",
    setups: {
        "audi90gto": [
            {
                file: "aragon/AragonOuter22c.sto",
            },
        ],
        "nissangtpzxt": [],
    }
}
export const ARAGON_MOTORCYCLE_GP = {
    title: "Aragón - Motorcycle Grand Prix",
    setups: ARAGON_OUTER.setups,
}
export const BRANDS_HATCH = {
    title: "Brands Hatch"
}
`;

describe('buildFolderMap', () => {
  it('maps folder names to export names', () => {
    const { folderToExport } = buildFolderMap(SAMPLE);
    expect(folderToExport.get('summit-point')).toBe('SUMMIT_POINT');
    expect(folderToExport.get('aragon')).toBe('ARAGON_OUTER');
  });
  it('detects exports with shared setups', () => {
    const { sharedExports } = buildFolderMap(SAMPLE);
    expect(sharedExports.has('ARAGON_MOTORCYCLE_GP')).toBe(true);
    expect(sharedExports.has('SUMMIT_POINT')).toBe(false);
  });
  it('does not map exports with no file entries', () => {
    const { folderToExport } = buildFolderMap(SAMPLE);
    expect(folderToExport.has('brands-hatch')).toBe(false);
  });
  it('does not register shared-setups exports as folder owners', () => {
    const { folderToExport } = buildFolderMap(SAMPLE);
    expect([...folderToExport.values()]).not.toContain('ARAGON_MOTORCYCLE_GP');
  });
  it('first export wins when folder appears in multiple exports', () => {
    const { folderToExport } = buildFolderMap(SAMPLE);
    expect(folderToExport.get('aragon')).toBe('ARAGON_OUTER');
  });
});
