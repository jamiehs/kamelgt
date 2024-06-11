import * as tracks from './track-names.js'; 
const seasonSetups = [
    {
        ...tracks.SEBRING,
        "weekStart": "2024-06-11",
        "audi90gto": [
            {
                "file": "23s2-tuupola-sebring-r4.sto",
                "comment": "Mika: Fuel is not checked yet (editor's note: most drivers feel 96L is safe this week). I changed to stiffer suspension after testing Javiers setup and my car started to stop properly. Still easy to drive…"
            },
            {
                "file": "A90_23S2_Sebring_Y_Gijsen_R.sto",
                "comment": "Yoeri: Tested it at 26C, 50% rubber; still need to work out fuel"
            },
            {
                "file": "JdelOlmoAudiSebring23S2.sto",
                "comment": "Javier: You have to adjust fuel it is with a full tank"
            }
        ],
        "nissangtpzxt": [
            {
                "file": "GTP-Sebring-SW-R.sto",
                "comment": "Sören: First time trying to make a set for the Nissan"
            },
            {
                "file": "Lgo23S2_Sebring_Intl_MH_Hungaroring_R71.sto",
                "comment": "From Laust; race setup"
            },
            {
                "file": "F122_NGTP_Sebring_1-2.sto",
                "comment": "From Ferran"
            }
        ]
    },
    {
        ...tracks.OULTON_PARK_INTL_NO_CHICANES,
        "weekStart": "2024-06-18",
        "audi90gto": [
        ],
        "nissangtpzxt": [
        ]
    },
    {
        ...tracks.HUNGARORING,
        "weekStart": "2024-06-25",
        "audi90gto": [
        ],
        "nissangtpzxt": [
        ]
    },
    {
        ...tracks.CANADIAN_TIRE_MOSPORT_CTMP,
        "weekStart": "2024-07-02",
        "audi90gto": [
        ],
        "nissangtpzxt": [
        ]
    },
    {
        ...tracks.WILLOW_SPRINGS,
        "notes": [
            "60 minute endurance round",
            "Pit stop may be required"
        ],
        "weekStart": "2024-07-09",
        "audi90gto": [
        ],
        "nissangtpzxt": [
        ]
    },
    {
        ...tracks.LONG_BEACH,
        "weekStart": "2024-07-16",
        "audi90gto": [
        ],
        "nissangtpzxt": [
        ]
    },
    {
        ...tracks.LE_MANS_HISTORIC,
        "notes": [
            "11 laps for the GTP class"
        ],
        "weekStart": "2024-07-23",
        "audi90gto": [
        ],
        "nissangtpzxt": [
        ]
    },
    {
        ...tracks.PHILLIP_ISLAND,
        "notes": [
            "60 minute endurance round",
            "Pit stop may be required"
        ],
        "weekStart": "2024-07-30",
        "audi90gto": [
        ],
        "nissangtpzxt": [
        ]
    },
    {
        ...tracks.SNETTERTON_200,
        "weekStart": "2024-08-06",
        "audi90gto": [
        ],
        "nissangtpzxt": [
        ]
    },
    {
        ...tracks.TWIN_RING_MOTEGI,
        "weekStart": "2024-08-13",
        "audi90gto": [
        ],
        "nissangtpzxt": [
        ]
    },
    {
        ...tracks.SUZUKA,
        "weekStart": "2024-08-20",
        "audi90gto": [
        ],
        "nissangtpzxt": [
        ]
    },
    {
        ...tracks.HOMESTEAD_MIAMI_ROAD_A,
        "weekStart": "2024-08-27",
        "audi90gto": [
        ],
        "nissangtpzxt": [
        ]
    },
]

export default seasonSetups