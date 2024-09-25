import * as tracks from './track-names.js'; 
const seasonSetups = [
    {
        ...tracks.NURBURGRING_COMBINED_24H,
        "weekStart": "2024-09-10",
        "audi90gto": [
        ],
        "nissangtpzxt": [
        ]
    },
    {
        ...tracks.LAGUNA_SECA,
        "weekStart": "2024-09-17",
        "audi90gto": [
        ],
        "nissangtpzxt": [
        ]
    },
    {
        ...tracks.MID_OHIO,
        "weekStart": "2024-09-24",
        "notes": [
            "60 minute endurance round",
            "Pit stop may be required"
        ],
        "audi90gto": [
            {
                "file": "maf_midohio_24s4_q0.sto",
                "comment": "Qualifying Setup",
            },
            {
                "file": "maf_midohio_24s4_r0.sto",
            },
            {
                "file": "Mid-Ohio30c.sto",
            },
        ],
        "nissangtpzxt": [
            {
                "file": "GTP_MidOhio_JdelOlmoR.sto",
            },
            {
                "file": "Mid-Ohio30c.sto",
            },
        ]
    },
    {
        ...tracks.DAYTONA_ROAD,
        "weekStart": "2024-10-01",
        "audi90gto": [
            {
                "file": "A90_DaytonaN_23S4_Y_Gijsen_Q.sto",
                "comment": "Qualifying Setup",
            },
            {
                "file": "A90_DaytonaN_23S4_Y_Gijsen_R.sto",
            },
            {
                "file": "DWC_23S1_Daytona_R2.sto",
            },
        ],
        "nissangtpzxt": [
            {
                "file": "NGTP_DaytonaRC_1-4.sto",
            },
            {
                "file": "Lgo23S1_Daytona_RC_AG_Indy_2W8_Q10.sto",
                "comment": "Qualifying Setup",
            },
            {
                "file": "Lgo23S1_Daytona_RC_AG_Indy_2W8_R10.sto",
            },
            {
                "file": "",
            },
        ]
    },
    {
        ...tracks.ROAD_AMERICA,
        "weekStart": "2024-10-08",
        "audi90gto": [
            {
                "file": "A90_RoadAmerica_23S2_Y_Gijsen_Q.sto",
                "comment": "Qualifying Setup",
            },
            {
                "file": "A90_RoadAmerica_23S2_Y_Gijsen_R.sto",
            },
            {
                "file": "maf_road_america_23s4_q1.sto",
                "comment": "Qualifying Setup",
            },
            {
                "file": "maf_road_america_23s4_r1.sto",
            },
        ],
        "nissangtpzxt": [
            {
                "file": "Lgo23S4_Road_America_Q60.sto",
                "comment": "Qualifying Setup",
            },
            {
                "file": "Lgo23S4_Road_America_R60.sto",
            },
            {
                "file": "GTP_Road_America_JdelOlmoQ2.sto",
                "comment": "Qualifying Setup",
            },
            {
                "file": "GTP_Road_America_JdelOlmoR2.sto",
            },
        ]
    },
    {
        ...tracks.RED_BULL_RING,
        "weekStart": "2024-10-15",
        "audi90gto": [
            {
                "file": "A90_RedBullRing_23S3_Y_Gijsen_Q.sto",
                "comment": "Qualifying Setup",
            },
            {
                "file": "A90_RedBullRing_23S3_Y_Gijsen_R.sto",
            },
        ],
        "nissangtpzxt": [
        ]
    },
    {
        ...tracks.ZOLDER,
        "weekStart": "2024-10-22",
        "audi90gto": [
        ],
        "nissangtpzxt": [
        ]
    },
    {
        ...tracks.JEREZ_MOTO,
        "weekStart": "2024-10-29",
        "audi90gto": [
            {
                "file": "A90_Jerez_23S4_Y_Gijsen_Q.sto",
                "comment": "Qualifying Setup",
            },
            {
                "file": "A90_Jerez_23S4_Y_Gijsen_R.sto",
            },
            {
                "file": "JdelOlmoAudiJerez23S2.sto",
            },
        ],
        "nissangtpzxt": [
            {
                "file": "NGTP_JEREZ_R_ALEX.sto",
            },
        ]
    },
    {
        ...tracks.SACHSENRING,
        "weekStart": "2024-11-05",
        "audi90gto": [
        ],
        "nissangtpzxt": [
        ]
    },
    {
        ...tracks.WATKINS_GLEN_CLASSIC_BOOT,
        "weekStart": "2024-11-12",
        "notes": [
            "60 minute endurance round",
            "Pit stop may be required"
        ],
        "audi90gto": [
            {
                "file": "maf_watkins_24s1_q2.sto",
                "comment": "Qualifying Setup",
            },
            {
                "file": "maf_watkins_24s1_r2.sto",
            },
            {
                "file": "A90_WatkinsGlenCl_24S1_Y_Gijsen_Q.sto",
                "comment": "Qualifying Setup",
            },
            {
                "file": "A90_WatkinsGlenCl_24S1_Y_Gijsen_R.sto",
            },
            {
                "file": "A90_WatkinsGlenCB_21S2_Y_Gijsen_Q.sto",
                "comment": "Qualifying Setup",
            },
            {
                "file": "A90_WatkinsGlenCB_21S2_Y_Gijsen_R.sto",
            },
        ],
        "nissangtpzxt": [
            {
                "file": "watkins-22S3-AG_WGI_5W2.sto",
            },
            {
                "file": "Watkins_Glen_CB_R_v1.2.sto",
            },
            {
                "file": "Watkins5W2v3.sto",
            },
        ]
    },
    {
        ...tracks.VIR,
        "weekStart": "2024-11-19",
        "audi90gto": [
            {
                "file": "A90_23S3_VIR_Y_Gijsen_R20.sto",
            },
            {
                "file": "A90_VIR_24S1_Y_Gijsen_Q2.sto",
                "comment": "Qualifying Setup",
            },
            {
                "file": "A90_VIR_24S1_Y_Gijsen_R2.sto",
            },
            {
                "file": "vir-23S2-r1.sto",
            },
        ],
        "nissangtpzxt": [
            {
                "file": "F122_NGTP_VIR_v1-4.sto",
            },
            {
                "file": "NGTP_VIR_Full_R_v1-5.sto",
            },
        ]
    },
    {
        ...tracks.SEBRING,
        "weekStart": "2024-11-26",
        "audi90gto": [
            {
                "file": "JdelOlmoAudiSebring23S2.sto",
            },
            {
                "file": "maf_sebring_23s4_q3.sto",
                "comment": "Qualifying Setup",
            },
            {
                "file": "maf_sebring_23s4_r3.sto",
            },
            {
                "file": "Sebring_Franco_22s3_RACE.sto",
            },
            {
                "file": "Sebring_Kheireddine_22s3.sto",
            },
            {
                "file": "sebring-21S4-r3.sto",
            },
        ],
        "nissangtpzxt": [
            {
                "file": "DWC_Sebring_R3.sto",
            },
            {
                "file": "F122_NGTP_Sebring_1-2.sto",
            },
            {
                "file": "GTP-Sebring-SW-R.sto",
            },
            {
                "file": "Lgo23S2_Sebring_Intl_MH_Hungaroring_Q70.sto",
                "comment": "Qualifying Setup",
            },
            {
                "file": "Lgo23S2_Sebring_Intl_MH_Hungaroring_R71.sto",
            },
        ]
    },
    {
        ...tracks.DONINGTON_PARK,
        "weekStart": "2024-12-03",
        "audi90gto": [
        ],
        "nissangtpzxt": [
        ]
    },
]

export default seasonSetups