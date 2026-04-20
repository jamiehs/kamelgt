/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />

interface SingleBroadcast {
    id: string;
    label: string;
    round: number;
    title: string;
    thumbText?: string;
    thumb?: string;
    alternateTitle?: string;
    url: string;
}

interface TrackEntry {
    title: string;
    alternateTitle?: string;
    setups?: {
        audi90gto: CarSetup[];
        nissangtpzxt: CarSetup[];
    };
}

interface CarSetup {
    file: string;
    comment?: string;
}

interface SetupWeek {
    title: string;
    weekStart: string;
    alternateTitle?: string;
    notes?: string[];
    setups?: {
        audi90gto: CarSetup[];
        nissangtpzxt: CarSetup[];
    };
}

interface CurrentWeek {
    week?: number;
    label?: string;
    notes?: Array<string>;
}
