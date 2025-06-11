import * as tracks from './track-data.js';

const seasonShortName = "25S2"
const seasonSetups = [
    {
        ...tracks.NURBURGRING_GP_BES_WEC,
        "weekStart": "2025-06-17",
    },
    {
        ...tracks.MID_OHIO,
        "weekStart": "2025-06-24",
    },
    {
        ...tracks.PORTLAND_NO_CHICANE,
        "weekStart": "2025-07-01",
        "notes": [
            "This is our first visit to Portland!"
        ]
    },
    {
        ...tracks.SUZUKA,
        "weekStart": "2025-07-08",
        "notes": [
            "60 mintue endurance round",
            "Fuel stop required"
        ],
    },
    {
        ...tracks.HOMESTEAD_MIAMI_ROAD_B,
        "weekStart": "2025-07-15",
    },
    {
        ...tracks.MOSPORT,
        "weekStart": "2025-07-22",
    },
    {
        ...tracks.MAGNY_COURS,
        "weekStart": "2025-07-29",
    },
    {
        ...tracks.CHARLOTTE_ROVAL,
        "weekStart": "2025-08-05",
    },
    {
        ...tracks.DAYTONA_ROAD,
        "weekStart": "2025-08-12",
        "notes": [
            "60 mintue endurance round",
            "Fuel stop required"
        ],
    },
    {
        ...tracks.LAGUNA_SECA,
        "weekStart": "2025-08-19",
    },
    {
        ...tracks.MONTREAL,
        "weekStart": "2025-08-26",
    },
    {
        ...tracks.WATKINS_GLEN_CLASSIC_BOOT,
        "weekStart": "2025-09-02",
    },
]


export default seasonSetups
export {
    seasonSetups,
    seasonShortName,
}