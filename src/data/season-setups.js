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
                "file": "maf_hockenheim_23s4_r2.sto",
            },
            {
                "file": "maf_hockenheim_23s4_q2.sto",
            },
            {
                "file": "iB_HockOut_23s4_r1.sto",
            },
            {
                "file": "iB_HockOut_23s4_Q1.sto",
            },
            {
                "file": "23_S1_Hockenheim_1.0_Race.sto",
            },
            {
                "file": "hockenheim-outer-21S2-r1.sto",
            },
        ],
        "nissangtpzxt": [
            {
                "file": "Lgo23S4_Hockenheim_Outer_Q51.sto",
            },
            {
                "file": "Lgo23S4_Hockenheim_Outer_R51.sto",
            },
            {
                "file": "Lgo22S1HockGPMHSilverstoneIntRv1QOLMQualy.sto",
            },
            {
                "file": "Lgo22S1HockGPMHSilverstoneIntRv1QOLMRace.sto",
            },
            {
                "file": "Lgo23S1_HockGP_MH_Silverstone_Int_R61.sto",
            },
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
            },
        ],
        "nissangtpzxt": [
            {
                "file": "ZX-T_-_21S3_Zandvoort_-_Y_Gijsen_-_R_-_210707.sto"
            },
            {
                "file": "DWC_ZXT_Zandvoort_Q2.sto"
            },
            {
                "file": "DWC_ZXT_Zandvoort_R2.sto"
            },
        ]
    },
    {
        ...tracks.SEBRING,
        "week": 4,
        "weekStart": "2023-10-03",
        "audi90gto": [
            {
                "file": "A90_23S2_Sebring_Y_Gijsen_R.sto"
            },
            {
                "file": "JdelOlmoAudiSebring23S2.sto"
            },
            {
                "file": "Sebring_Kheireddine_22s3.sto"
            },
        ],
        "nissangtpzxt": [
            {
                "file": "DWC_Sebring_R3.sto"
            },
            {
                "file": "F122_NGTP_Sebring_1-2.sto"
            },
            {
                "file": "GTP-Sebring-SW-R.sto"
            },
        ]
    },
    {
        ...tracks.SONOMA_CUP,
        "week": 5,
        "weekStart": "2023-10-10",
        "audi90gto": [
            {
                "file": "maf_sonoma_23s4_r1.sto"
            },
            {
                "file": "maf_sonoma_23s4_q1a.sto"
            },
            {
                "file": "sonoma-23S4-r1.sto"
            },
            {
                "file": "sonoma-22S3-2.3.sto"
            },
            {
                "file": "sonoma-22S3-r1.sto"
            },
            {
                "file": "sonoma-22S3-Yoeri_Gijsen_-_220824_-_R.sto"
            },
        ],
        "nissangtpzxt": [
            {
                "file": "GTP_Sonoma_JdelOlmoQ.sto",
            },
            {
                "file": "GTP_Sonoma_JdelOlmoR.sto",
                "comment": "From Javier: the only thing I've adjusted is the fuel and first gear. In qualy I have only changed the camber a little and lowered the rear wing a point."
            },
            {
                "file": "Lgo23S4_Sonoma_Cup_Q70.sto",
            },
            {
                "file": "Lgo23S4_Sonoma_Cup_R71.sto",
                "comment": "From Laust: My Wednesday sets - enjoy. Be careful not to stress tires too much, otherwise it becomes quite difficult to drive."
            },
            {
                "file": "sonomaQh.sto",
            },
            {
                "file": "sonomaR.sto",
                "comment": "From Tim: stay off the curbs and be mindful of that bump in the downhill lefthander.  Gentle with the throttle.  But it cuts the essess like it's on rails. Just slight lifts needed between the two hairpins"
            },
        ]
    },
    {
        ...tracks.CHARLOTTE_ROVAL,
        "week": 6,
        "weekStart": "2023-10-17",
        "audi90gto": [
            {
                "file": "maf_charlotte_23s4_r2b.sto"
            },
            {
                "file": "maf_charlotte_23s4_q2b.sto"
            },
            {
                "file": "charlotte-roval-22S3_Marc_1.1.sto"
            },
            {
                "file": "charlotte-roval-22S3-r1.sto"
            },
        ],
        "nissangtpzxt": [
            {
                "file": "F122_NGTP_Charlotte_1-4.sto"
            },
            {
                "file": "F122_NGTP_Charlotte_1-4_Q.sto"
            },
            {
                "file": "GTP_Charlotte_JdelOlmoR.sto"
            },
            {
                "file": "rovalo_RGtpQ.sto",
                "comment": "qualifying setup!"
            },
            {
                "file": "charlotte-roval-22S3-Lgo_AG_WGI_6W1_R62.sto"
            },
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
            {
                "file": "A90 - 22S4 - RoadAmerica - J Del Olmo - R.sto"
            },
            {
                "file": "A90 - 22S4 - RoadAmerica - M Ollé - R.sto"
            },
            {
                "file": "road-america-22S4-r2.sto"
            },
        ],
        "nissangtpzxt": [
            {
                "file": "Lgo22S4_Road_America_MH_Int_R_Q40.sto"
            },
            {
                "file": "Lgo22S4_Road_America_MH_Int_R_R50.sto"
            },
            {
                "file": "Lgo22S4_Road_America_MH_Int_R_R60.sto"
            },
            {
                "file": "Lgo22S2_RoadAm_MH_Silverstone_Int_R_v1_Q60.sto"
            },
            {
                "file": "road_america_22s4_Full_R_v1-4.sto"
            },
            {
                "file": "roadamerica-4Rw5.sto"
            },
            {
                "file": "roadamerica-Q3w5.sto"
            },
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