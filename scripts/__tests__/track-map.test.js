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
export const ROAD_AMERICA = {
    title: "Road America",
    setups: {
        "audi90gto": [
            { file: "road-america/maf_RA_25s2_R.sto" },
        ],
        "nissangtpzxt": [],
    }
}
export const ROAD_AMERICA_500 = {
    title: "Road America 500",
    setups: {
        "audi90gto": [
            { file: "road-america/maf_RA500_24s2_R.sto" },
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
  it('exportToFolder maps each export to its own folder directly', () => {
    const { exportToFolder } = buildFolderMap(SAMPLE);
    expect(exportToFolder.get('ROAD_AMERICA')).toBe('road-america');
    expect(exportToFolder.get('ROAD_AMERICA_500')).toBe('road-america');
  });
  it('exportToFolder is independent of insertion order', () => {
    const { exportToFolder } = buildFolderMap(SAMPLE);
    // Both base and variant resolve to the same folder regardless of which came first
    expect(exportToFolder.get('ROAD_AMERICA')).toBe(exportToFolder.get('ROAD_AMERICA_500'));
  });
});
