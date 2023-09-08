import * as tracks from './track-names.js'; 
const seasonSetups = [
    {
        ...tracks.SUZUKA,
        "week": 1,
        "weekStart": "2023-09-12",
        "audi90gto": [
            {
                "file": "suzuka-23s1-arturas-saturday.sto"
            },
            {
                "file": "suzuka-23S1-Javier-r2.sto"
            }
        ],
        "nissangtpzxt": [
            {
                "file": "Lgo22S2_Suzuka_GP_MH_Hungaroring_R_v1_Q81.sto"
            },
            {
                "file": "Lgo22S2_Suzuka_GP_MH_Hungaroring_R_v1_R80.sto"
            }
        ]
    },
    {
        ...tracks.HOCKENHEIM_OUTER,
        "week": 2,
        "weekStart": "2023-09-19",
        "notes": [
            "60 minute endurance round",
            "Pit stop required"
        ],
        "audi90gto": [
            {
                "file": "hockenheim-outer-21S2-r1.sto"
            }
        ],
        "nissangtpzxt": [
            {
                "file": "Lgo23S1_HockGP_MH_Silverstone_Int_R61.sto"
            }
        ]
    },
    {
        ...tracks.ZANDVOORT,
        "week": 3,
        "weekStart": "2023-09-26",
        "audi90gto": [
            {
                "file": "Zandvoort_S3_2021_1.3_34oC_RACE.sto"
            },
            {
                "file": "zandvoort-21S3-r4.sto"
            }
        ],
        "nissangtpzxt": [
            {
                "file": ""
            }
        ]
    },
    {
        ...tracks.SEBRING,
        "week": 4,
        "weekStart": "2023-10-03",
        "audi90gto": [
        ],
        "nissangtpzxt": [
        ]
    },
    {
        ...tracks.SONOMA_CUP,
        "week": 5,
        "weekStart": "2023-10-10",
        "audi90gto": [
        ],
        "nissangtpzxt": [
        ]
    },
    {
        ...tracks.CHARLOTTE_ROVAL,
        "week": 6,
        "weekStart": "2023-10-17",
        "audi90gto": [
        ],
        "nissangtpzxt": [
        ]
    },
    {
        ...tracks.ROAD_AMERICA,
        "week": 7,
        "weekStart": "2023-10-24",
        "notes": [
            "60 minute endurance round",
            "Pit stop required"
        ],
        "audi90gto": [
        ],
        "nissangtpzxt": [
        ]
    },
    {
        ...tracks.IMOLA,
        "week": 8,
        "weekStart": "2023-10-31",
        "audi90gto": [
        ],
        "nissangtpzxt": [
        ]
    },
    {
        ...tracks.JEREZ_MOTO,
        "week": 9,
        "weekStart": "2023-11-07",
        "audi90gto": [
        ],
        "nissangtpzxt": [
        ]
    },
    {
        ...tracks.TWIN_RING_MOTEGI,
        "week": 10,
        "weekStart": "2023-11-14",
        "audi90gto": [
        ],
        "nissangtpzxt": [
            {
                "file": "Lgo22S1_Motegi_MH_Silverstone_Int_R_v1_Q63.sto"
            },
            {
                "file": "Lgo22S1_Motegi_MH_Silverstone_Int_R_v1_R63.sto"
            }
        ]
    },
    {
        ...tracks.DAYTONA_NASCAR_ROAD,
        "week": 11,
        "weekStart": "2023-11-21",
        "audi90gto": [
        ],
        "nissangtpzxt": [
        ]
    },
    {
        ...tracks.LONG_BEACH,
        "week": 12,
        "weekStart": "2023-11-28",
        "audi90gto": [
        ],
        "nissangtpzxt": [
        ]
    }
]

export default seasonSetups