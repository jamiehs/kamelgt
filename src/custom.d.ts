declare module '*.svg' {
    import React = require('react');
    export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
    const src: string;
    export default src;
}

interface CarSetup {
    file: string
    comment?: string
}
interface SetupWeek {
    label: string
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