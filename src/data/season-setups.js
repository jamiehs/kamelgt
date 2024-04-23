import * as tracks from './track-names.js'; 
const seasonSetups = [
    {
        ...tracks.BATHURST,
        "notes": [
            "Surviving is the goal; stay out of the walls"
        ],
        "weekStart": "2024-03-12",
        "audi90gto": [
        ],
        "nissangtpzxt": [
        ]
    },
    {
        ...tracks.COTA,
        "weekStart": "2024-03-19",
        "audi90gto": [
        ],
        "nissangtpzxt": [
        ]
    },
    {
        ...tracks.ALGARVE,
        "weekStart": "2024-03-26",
        "audi90gto": [
        ],
        "nissangtpzxt": [
        ]
    },
    {
        ...tracks.SPA_CLASSIC_PITS,
        "weekStart": "2024-04-02",
        "audi90gto": [
        ],
        "nissangtpzxt": [
        ]
    },
    {
        ...tracks.ROAD_AMERICA,
        "notes": [
            "60 minute endurance round",
            "Pit stop required",
        ],
        "weekStart": "2024-04-09",
        "audi90gto": [
            {
                "file": "A90_RoadAmerica_24S2_Y_Gijsen_R60.sto",
            },
            {
                "file": "maf_roadam_24s2_q2.sto",
            },
            {
                "file": "maf_roadam_24s2_r3.sto",
            },
            {
                "file": "maf_RA500_24s2_R.sto",
            },
        ],
        "nissangtpzxt": [
            {
                "file": "GTP_RoadAmerica_JdelOlmoR.sto",
            },
            {
                "file": "SDC_23S2_GTP_RAMERICA_QUALYv0.85.sto",
            },
            {
                "file": "SDC_23S2_GTP_RAMERICA_RACEv0.85.sto",
            },
        ]
    },
    {
        ...tracks.SONOMA_NASCAR_LONG,
        "weekStart": "2024-04-16",
        "audi90gto": [
            {
                "file": "maf_sonoma_24s2_q5.sto",
                "comment": "qualifying setup",
            },
            {
                "file": "maf_sonoma_24s2_r5.sto",
            },
            {
                "file": "A90_Sonoma_24S2_Y_Gijsen_Q.sto",
                "comment": "qualifying setup",
            },
            {
                "file": "A90_Sonoma_24S2_Y_Gijsen_R.sto",
            },
            {
                "file": "A90_Sliumba_24S2_sonoma_R1.sto",
            },
            {
                "file": "sonoma-23S4-r1.sto",
            },
            {
                "file": "sonoma-22S3-2.3.sto",
            },
            {
                "file": "sonoma-22S3-r1.sto",
            },
        ],
        "nissangtpzxt": [
            {
                "file": "SONOMA_NGTP_R_ALEX.sto",
            },
            {
                "file": "GTP_Sonoma_JdelOlmoQ.sto",
                "comment": "qualifying setup",
            },
            {
                "file": "GTP_Sonoma_JdelOlmoR.sto",
            },
            {
                "file": "Lgo22S3_Sonoma_Long_MH_Int_R_Q66.sto",
                "comment": "qualifying setup",
            },
            {
                "file": "public/setups/nissangtpzxt/Lgo24S2_Sonoma_Cup_Q70.sto",
                "comment": "qualifying setup",
            },
            {
                "file": "public/setups/nissangtpzxt/Lgo24S2_Sonoma_Cup_R70.sto",
            },
            {
                "file": "Lgo23S4_Sonoma_Cup_Q70.sto",
                "comment": "qualifying setup",
            },
            {
                "file": "Lgo23S4_Sonoma_Cup_R71.sto",
            },
        ]
    },
    {
        ...tracks.NURBURGRING_COMBINED_GESAMTSTRECKE_VLN,
        "weekStart": "2024-04-23",
        "audi90gto": [
            {
                "file": "maf_nords_24s2_r1.sto",
            },
            {
                "file": "nords-24S2-r1.sto",
            },
            {
                "file": "A90_23S3_Nordschleife24h_Y_Gijsen_Q.sto",
                "comment": "qualifying setup",
            },
            {
                "file": "A90_23S3_Nordschleife24h_Y_Gijsen_R.sto",
            },
        ],
        "nissangtpzxt": [
            {
                "file": "Lgo23S1_Nords_Combined_24h_Q64.sto",
                "comment": "qualifying setup",
            },
            {
                "file": "Lgo23S1_Nords_Combined_24h_R64.sto",
            },
        ]
    },
    {
        ...tracks.INTERLAGOS,
        "weekStart": "2024-04-30",
        "audi90gto": [
            {
                "file": "A90_23S2_Interlagos_Y_Gijsen_R.sto",
            },
        ],
        "nissangtpzxt": [
            {
                "file": "F122_NGTP_Interlagos_1-4.sto",
            },
            {
                "file": "Lgo22S2_Interlagos_MH_Silverstone_Int_R_Q63.sto",
                "comment": "qualifying setup",
            },
            {
                "file": "Lgo22S2_Interlagos_MH_Silverstone_Int_R_R63.sto",
            },
        ]
    },
    {
        ...tracks.MISANO,
        "weekStart": "2024-05-07",
        "audi90gto": [
        ],
        "nissangtpzxt": [
        ]
    },
    {
        ...tracks.MONZA,
        "notes": [
            "Endurance round - 18 laps (~60 minutes)",
            "Pit stop required",
        ],
        "weekStart": "2024-05-14",
        "audi90gto": [
            {
                "file": "A90_23S2_Monza_Y_Gijsen_Q3.sto",
                "comment": "qualifying setup",
            },
            {
                "file": "A90_23S2_Monza_Y_Gijsen_R3.sto",
            },
        ],
        "nissangtpzxt": [
            {
                "file": "Lgo22S1_MH_Monza_R_v1.1_Q10.sto",
                "comment": "qualifying setup",
            },
            {
                "file": "Lgo23S2_MH_Monza_R_v1.1_R10.sto",
            },
        ]
    },
    {
        ...tracks.ROAD_ATLANTA,
        "weekStart": "2024-05-21",
        "audi90gto": [
            {
                "file": "KB 2022-S4 Road Atlanta.sto",
            },
            {
                "file": "2022S4W12_Road_Atlanta_R1.sto",
            },
            {
                "file": "A90 - 22S4 - RoadAtlanta - K Bouafia - R.sto",
            },
            {
                "file": "A90 - 22S4 - RoadAtlanta - Y Gijsen - 221129 - Q.sto",
                "comment": "qualifying setup",
            },
            {
                "file": "A90 - 22S4 - RoadAtlanta - Y Gijsen - 221129 - R.sto",
            },
        ],
        "nissangtpzxt": [
            {
                "file": "Lgo22S4_Road_Atlanta_MH_Silverstone_Int_Q61.sto",
                "comment": "qualifying setup",
            },
            {
                "file": "Lgo22S4_Road_Atlanta_MH_Silverstone_Int_R61.sto",
            },
            {
                "file": "NGTP_RoAtlanta_1-1.sto",
            },
        ]
    },
    {
        ...tracks.BELLE_ISLE,
        "weekStart": "2024-05-28",
        "audi90gto": [
            {
                "file": "A90_23S2_Detroit_Y_Gijsen_Q.sto",
                "comment": "qualifying setup",
            },
            {
                "file": "A90_23S2_Detroit_Y_Gijsen_R.sto",
            },
            {
                "file": "JdelOlmoBelleIsle22S4C.sto",
            },
            {
                "file": "KB_2022-S4_Belle_Isle_R.sto",
            },
        ],
        "nissangtpzxt": [
            {
                "file": "Lgo22S4_Detroit_Q85.sto",
                "comment": "qualifying setup",
            },
            {
                "file": "Lgo23S2_Detroit_R80.sto",
            },
        ]
    },
]

export default seasonSetups