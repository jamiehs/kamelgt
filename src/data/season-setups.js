import * as tracks from './track-data.js';

const seasonShortName = "25S4"
const seasonSetups = [
    {
        ...tracks.SEBRING,
        "weekStart": "2025-09-16",
    },
    {
        ...tracks.MUGELLO,
        "weekStart": "2025-09-23",
    },
    {
        ...tracks.THE_BEND_GT_CIRCUIT,
        "weekStart": "2025-09-30",
        "notes": [
            "This is our first visit to The Bend!"
        ]
    },
    {
        ...tracks.JEREZ_MOTO,
        "weekStart": "2025-10-07",
    },
    {
        ...tracks.ARAGON_OUTER,
        "weekStart": "2025-10-14",
    },
    {
        ...tracks.ROAD_AMERICA,
        "weekStart": "2025-10-21",
        "notes": [
            "60 mintue endurance round",
            "Fuel stop required"
        ],
    },
    {
        ...tracks.BARCELONA_HISTORIC,
        "weekStart": "2025-10-28",
    },
    {
        ...tracks.BARBER,
        "weekStart": "2025-11-04",
    },
    {
        ...tracks.VIR,
        "weekStart": "2025-11-11",
    },
    {
        ...tracks.HOCKENHEIM_GP,
        "weekStart": "2025-11-18",
        "notes": [
            "60 mintue endurance round",
            "Fuel stop required"
        ],
    },
    {
        ...tracks.OKAYAMA,
        "weekStart": "2025-11-25",
    },
    {
        ...tracks.ALGARVE,
        "weekStart": "2025-12-02",
    },
]


export default seasonSetups
export {
    seasonSetups,
    seasonShortName,
}