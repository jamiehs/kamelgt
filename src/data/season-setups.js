import * as tracks from './track-names.js'; 
const seasonSetups = [
    {
        ...tracks.VIR,
        "weekStart": "2023-12-12",
        "audi90gto": [
            {
                "file": "A90 - 22S4 - VIR - J Del Olmo - R.sto"
            },
            {
                "file": "vir-23S2-r1.sto"
            },
            {
                "file": "A90_23S3_VIR_Y_Gijsen_R20.sto"
            },
        ],
        "nissangtpzxt": [
            {
                "file": "F122_NGTP_VIR_v1-4.sto"
            },
            {
                "file": "NGTP_VIR_Full_R_v1-5.sto"
            },
        ]
    },
    {
        ...tracks.MONTREAL,
        "weekStart": "2023-12-19",
        "audi90gto": [
            {
                "file": "Montreal_23_v1.sto"
            },
            {
                "file": "KB_Montreal_23_v1.sto"
            },
        ],
        "nissangtpzxt": [
            {
                "file": "F122_NGTP_Montreal_1-3.sto"
            },
            {
                "file": "asg-montreal-r.sto"
            },
        ]
    },
    {
        ...tracks.MUGELLO,
        "weekStart": "2023-12-26",
        "audi90gto": [
            {
                "file": "maf_mugello_23s4_r1.sto"
            },
            {
                "file": "maf_mugello_23s4_q1.sto"
            },
        ],
        "nissangtpzxt": [
            {
                "file": "GTP_Mugello_JdelOlmoR.sto"
            },
        ]
    },
    {
        ...tracks.LE_MANS,
        "weekStart": "2024-01-02",
        "notes": [
            "~60 minute endurance round (18 laps)",
            "Pit stop required"
        ],
        "audi90gto": [
            {
                "file": "le-mans-22S3-r1.sto"
            },
        ],
        "nissangtpzxt": [
            {
                "file": "Le_Mans_R1.7.sto"
            },
        ]
    },
    {
        ...tracks.BARBER,
        "weekStart": "2024-01-09",
        "audi90gto": [
            {
                "file": "A90_Barber_24S1_Y_Gijsen_R2.sto"
            },
            {
                "file": "Barber_BR-GTO_24s1_Q_v3.sto"
            },
            {
                "file": "Barber_BR-GTO_24s1_race_v3.sto"
            },
            {
                "file": "maf_barber_24s1_q2.sto"
            },
            {
                "file": "maf_barber_24s1_r2.sto"
            },
            {
                "file": "barber-24S1-q.sto"
            },
            {
                "file": "barber-24S1-r3.sto"
            },
        ],
        "nissangtpzxt": [
            {
                "file": "BL_Barber_Q7.4.sto",
            },
            {
                "file": "BL_Barber_R7.4.sto",
            },
            {
                "file": "Lgo24S1_Barber_Full_Q70.sto",
            },
            {
                "file": "Lgo24S1_Barber_Full_R70.sto",
            },
        ]
    },
    {
        ...tracks.IMOLA,
        "weekStart": "2024-01-16",
        "audi90gto": [
            {
                "file": "maf_imola_23s4_r1b.sto"
            },
            {
                "file": "imola-23S4-r1.sto"
            },
            {
                "file": "A90_23S4_Imola_Y_Gijsen_R.sto"
            },
            {
                "file": "A90_23S4_Imola_Y_Gijsen_Q.sto"
            },
            {
                "file": "andrius_sl_imola_1_0_R.sto"
            },
        ],
        "nissangtpzxt": [
            {
                "file": "Lgo22S4_MH_Imola_R_v1.3_R62.sto"
            },
            {
                "file": "Lgo22S4_MH_Imola_R_v1.3_Q61.sto"
            },
            {
                "file": "GTP_Imola_JdelOlmoR.sto"
            },
        ]
    },
    {
        ...tracks.NURBURGRING_GP_BES_WEC,
        "weekStart": "2024-01-23",
        "audi90gto": [
            {
                "file": "KB_nurburgring_gp_23_v1.sto"
            },
            {
                "file": "DWC_22S3_nurburgring_gp_StreckeArena_R2.sto"
            },
        ],
        "nissangtpzxt": [
            {
                "file": "asg-nurbgp-r.sto"
            },
            {
                "file": "BL_Nurburgring_GP_6-2_R.sto"
            },
        ]
    },
    {
        ...tracks.OKAYAMA,
        "weekStart": "2024-01-30",
        "audi90gto": [
        ],
        "nissangtpzxt": [
        ]
    },
    {
        ...tracks.ARAGON_OUTER,
        "weekStart": "2024-02-06",
        "audi90gto": [
        ],
        "nissangtpzxt": [
        ]
    },
    {
        ...tracks.SILVERSTONE_2008_HISTORICAL_GP,
        "weekStart": "2024-02-13",
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
        ...tracks.FUJI_NO_CHICANE,
        "weekStart": "2024-02-20",
        "audi90gto": [
        ],
        "nissangtpzxt": [
        ]
    },
    {
        ...tracks.WATKINS_GLEN_CLASSIC,
        "weekStart": "2024-02-27",
        "audi90gto": [
        ],
        "nissangtpzxt": [
        ]
    },
]

export default seasonSetups