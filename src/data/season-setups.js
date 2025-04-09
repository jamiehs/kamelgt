import * as tracks from './track-data.js';

const seasonShortName = "25S2"
const seasonSetups = [
    {
        ...tracks.ROAD_ATLANTA,
        "weekStart": "2025-03-18",
    },
    {
        ...tracks.WILLOW_SPRINGS,
        "weekStart": "2025-03-25",
    },
    {
        ...tracks.THRUXTON,
        "weekStart": "2025-04-01",
        "notes": [
            "This is IMSA Vintage’s first visit to Thruxton"
        ],
    },
    {
        ...tracks.BATHURST,
        "weekStart": "2025-04-08",
        "notes": [
            "60 mintue endurance round",
            "Fuel stop likely required"
        ],
    },
    {
        ...tracks.LONG_BEACH,
        "weekStart": "2025-04-15",
    },
    {
        ...tracks.ROAD_AMERICA_500,
        "weekStart": "2025-04-22",
        "notes": [
            "Road America 500 (special event week)",
            "Road America (40 min) during the week, and the Road America 500 race on the weekend (4 time slots)"
        ],
    },
    {
        ...tracks.INDY_ROAD,
        "weekStart": "2025-04-29",
        "notes": [
            "It has been over 2 years since our last visit!"
        ],
    },
    {
        ...tracks.SUMMIT_POINT,
        "weekStart": "2025-05-06",
    },
    {
        ...tracks.SPA_CLASSIC_PITS,
        "weekStart": "2025-05-13",
    },
    {
        ...tracks.PHILLIP_ISLAND,
        "weekStart": "2025-05-20",
        "notes": [
            "60 mintue endurance round",
            "Fuel stop likely required"
        ],
    },
    {
        ...tracks.ZANDVOORT,
        "weekStart": "2025-05-27",
    },
    {
        ...tracks.LE_MANS_HISTORIC,
        "weekStart": "2025-06-03",
        "notes": [
            "Race duration is 11 laps"
        ],
    },
]


export default seasonSetups
export {
    seasonSetups,
    seasonShortName,
}