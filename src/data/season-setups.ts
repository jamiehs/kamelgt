import * as tracks from './track-data.js';

const seasonSetups: SetupWeek[] = [
    {
        ...tracks.ROAD_ATLANTA,
        weekStart: '2026-03-17',
    },
    {
        ...tracks.TWIN_RING_MOTEGI,
        weekStart: '2026-03-24',
    },
    {
        ...tracks.ADELAIDE_STREET_CIRCUIT,
        weekStart: '2026-03-31',
    },
    {
        ...tracks.LAGUNA_SECA,
        weekStart: '2026-04-07',
        notes: ['60 minute endurance round', 'Fuel stop required'],
    },
    {
        ...tracks.DONINGTON_PARK,
        weekStart: '2026-04-14',
    },
    {
        ...tracks.COTA,
        weekStart: '2026-04-21',
    },
    {
        ...tracks.MIAMI_INTERNATIONAL_AUTODROME,
        weekStart: '2026-04-28',
    },
    {
        ...tracks.BATHURST,
        weekStart: '2026-05-05',
    },
    {
        ...tracks.LIME_ROCK_CLASSIC,
        weekStart: '2026-05-12',
    },
    {
        ...tracks.LONG_BEACH,
        weekStart: '2026-05-19',
        notes: ['70 minute endurance round', 'Fuel stop required'],
    },
    {
        ...tracks.MISANO,
        weekStart: '2026-05-26',
    },
    {
        ...tracks.SPA_CLASSIC_PITS,
        weekStart: '2026-06-02',
    },
];

export default seasonSetups;
export { seasonSetups };
