import * as tracks from './track-data.js';

const seasonShortName = "26S1"
const seasonSetups = [
    {
        ...tracks.NURBURGRING_COMBINED_24H,
        "weekStart": "2025-12-16",
    },
    {
        ...tracks.INTERLAGOS,
        "weekStart": "2025-12-23",
    },
    {
        ...tracks.MEXICO_NATIONAL_HISTORIC,
        "weekStart": "2025-12-30",
    },
    {
        ...tracks.MONZA_WITHOUT_FIRST_CHICANE,
        "weekStart": "2026-01-06",
    },
    {
        ...tracks.ORAN_PARK,
        "weekStart": "2026-01-13",
    },
    {
        ...tracks.LE_MANS,
        "weekStart": "2026-01-20",
        "notes": [
            "60 mintue endurance round",
            "Fuel stop required"
        ],
    },
    {
        ...tracks.POCONO_RACEWAY_2009_INTERNATIONAL,
        "weekStart": "2026-01-27",
    },
    {
        ...tracks.RED_BULL_RING,
        "weekStart": "2026-02-03",
    },
    {
        ...tracks.HUNGARORING,
        "weekStart": "2026-02-10",
    },
    {
        ...tracks.FUJI_NO_CHICANE,
        "weekStart": "2026-02-17",
        "notes": [
            "60 mintue endurance round",
            "Fuel stop required"
        ],
    },
    {
        ...tracks.IMOLA,
        "weekStart": "2026-02-24",
    },
    {
        ...tracks.SONOMA_CUP_LONG,
        "weekStart": "2026-03-03",
    },
]


export default seasonSetups
export {
    seasonSetups,
    seasonShortName,
}