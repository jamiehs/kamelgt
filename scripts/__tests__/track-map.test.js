// @vitest-environment node
import { describe, it, expect } from 'vitest';
import { buildFolderMap, findExportByFolderPrefix } from '../lib/track-map.mjs';

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
export const LIME_ROCK = {
    title: "Lime Rock Park - GP"
}
export const LIME_ROCK_CLASSIC = {
    title: "Lime Rock Park - Classic",
    setups: LIME_ROCK.setups,
}
export const LIME_ROCK_WEST_BEND = {
    title: "Lime Rock Park - West Bend Chicane",
    setups: LIME_ROCK.setups,
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
    it('does not flag a stub export as shared because a sibling uses its setups', () => {
        // LIME_ROCK has no setups — LIME_ROCK_CLASSIC references LIME_ROCK.setups.
        // A 300-char lookahead from LIME_ROCK bleeds into LIME_ROCK_CLASSIC and falsely
        // detects a shared-setups pattern. The block must be bounded to the export itself.
        const { sharedExports } = buildFolderMap(SAMPLE);
        expect(sharedExports.has('LIME_ROCK')).toBe(false);
        expect(sharedExports.has('LIME_ROCK_CLASSIC')).toBe(true);
        expect(sharedExports.has('LIME_ROCK_WEST_BEND')).toBe(true);
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

describe('findExportByFolderPrefix', () => {
    const allExports = [
        'SONOMA',
        'SONOMA_CUP',
        'SONOMA_CUP_LONG',
        'DONINGTON_PARK',
        'TWIN_RING_MOTEGI',
    ];
    const sharedExports = new Set();

    it('returns exact match when folder name equals an export name', () => {
        expect(findExportByFolderPrefix('sonoma', allExports, sharedExports)).toBe('SONOMA');
    });
    it('returns unique prefix match when no exact match exists', () => {
        expect(findExportByFolderPrefix('donington', allExports, sharedExports)).toBe(
            'DONINGTON_PARK',
        );
    });
    it('returns null when multiple exports share a prefix and no exact match', () => {
        expect(findExportByFolderPrefix('sonoma-cup', allExports, sharedExports)).toBe(
            'SONOMA_CUP',
        );
    });
    it('returns null when folder has no prefix relationship to any export', () => {
        expect(findExportByFolderPrefix('motegi', allExports, sharedExports)).toBeNull();
    });
});
