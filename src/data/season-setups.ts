import * as tracks from './track-data.js';

const seasonSetups: SetupWeek[] = [
    {
        ...tracks.PHILLIP_ISLAND,
        weekStart: '2026-06-16',
    },
    {
        ...tracks.SILVERSTONE_2008_HISTORICAL_GP,
        weekStart: '2026-06-23',
    },
    {
        ...tracks.ST_PETERSBURG,
        weekStart: '2026-06-30',
        notes: ['First time visit for the series'],
    },
    {
        ...tracks.WATKINS_GLEN_CLASSIC_BOOT,
        weekStart: '2026-07-07',
        notes: ['60 minute endurance round', 'Fuel stop required'],
    },
    {
        ...tracks.OSCHERSLEBEN,
        weekStart: '2026-07-14',
    },
    {
        ...tracks.BELLE_ISLE,
        weekStart: '2026-07-21',
    },
    {
        ...tracks.TSUKUBA,
        weekStart: '2026-07-28',
    },
    {
        ...tracks.NURBURGRING_GP_BES_WEC,
        weekStart: '2026-08-04',
    },
    {
        ...tracks.MID_OHIO,
        weekStart: '2026-08-11',
    },
    {
        ...tracks.WILLOW_SPRINGS,
        weekStart: '2026-08-18',
        notes: ['60 minute endurance round', 'Fuel stop required'],
    },
    {
        ...tracks.OULTON_PARK_INTL_NO_CHICANES,
        weekStart: '2026-08-25',
    },
    {
        ...tracks.PORTLAND_NO_CHICANE,
        weekStart: '2026-09-01',
    },
];

export default seasonSetups;
export { seasonSetups };
