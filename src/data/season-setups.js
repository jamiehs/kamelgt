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
                "file": "maf_sonoma_23s4_q1.sto",
                "comment": "qualifying setup",
            },
            {
                "file": "maf_sonoma_23s4_q1a.sto",
                "comment": "qualifying setup",
            },
            {
                "file": "maf_sonoma_23s4_r1.sto",
            },
            {
                "file": "sonoma-22S3-Yoeri_Gijsen_-_220824_-_R.sto",
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
                "file": "Lgo22S3_Sonoma_Long_MH_Int_R_R61.sto",
            },
            {
                "file": "Lgo22S3_Sonoma_Long_MH_Int_R_R66.sto",
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
        ],
        "nissangtpzxt": [
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
        ],
        "nissangtpzxt": [
        ]
    },
    {
        ...tracks.ROAD_ATLANTA,
        "weekStart": "2024-05-21",
        "audi90gto": [
        ],
        "nissangtpzxt": [
        ]
    },
    {
        ...tracks.BELLE_ISLE,
        "weekStart": "2024-05-28",
        "audi90gto": [
        ],
        "nissangtpzxt": [
        ]
    },
]

export default seasonSetups