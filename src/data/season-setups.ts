import * as tracks from './track-data.js';

const seasonSetups: SetupWeek[] = [
    {
        ...tracks.MOSPORT,
        weekStart: '2026-09-15',
    },
    {
        ...tracks.SUMMIT_POINT,
        weekStart: '2026-09-22',
    },
    {
        ...tracks.QUALCOMM_CIRCUIT,
        weekStart: '2026-09-29',
        notes: ['First time visit for the series'],
    },
    {
        ...tracks.INDY_ROAD,
        weekStart: '2026-10-06',
        notes: ['60 minute endurance round', 'Fuel stop required'],
    },
    {
        ...tracks.SNETTERTON_200,
        weekStart: '2026-10-13',
    },
    {
        ...tracks.SEBRING,
        weekStart: '2026-10-20',
    },
    {
        ...tracks.SANDOWN,
        weekStart: '2026-10-27',
        notes: ['First time visit for the series'],
    },
    {
        ...tracks.DAYTONA_ROAD,
        weekStart: '2026-11-03',
    },
    {
        ...tracks.SUZUKA,
        weekStart: '2026-11-10',
    },
    {
        ...tracks.ROAD_AMERICA,
        weekStart: '2026-11-17',
        notes: ['60 minute endurance round', 'Fuel stop required'],
    },
    {
        ...tracks.ZOLDER,
        weekStart: '2026-11-24',
    },
    {
        ...tracks.MUGELLO,
        weekStart: '2026-12-01',
    },
];

export default seasonSetups;
export { seasonSetups };
