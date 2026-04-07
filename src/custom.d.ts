/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />

interface SingleBroadcast {
    id: string
    label: string
    round: number
    title: string
    thumbText?: string
    thumb?: string
    alternateTitle?: string
    url: string
}

interface CarSetup {
    file: string
    comment?: string
}

interface SetupWeek {
    title: string
    week: number
    weekStart: string
    notes?: Array<string>
    audi90gto?: Array<CarSetup>
    nissangtpzxt?: Array<CarSetup>
}

interface CurrentWeek {
    week?: number
    label?: string
    notes?: Array<string>
}
