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
            {
                "file": "maf_okayama_24s1_q2.sto"
            },
            {
                "file": "maf_okayama_24s1_r2.sto"
            },
            {
                "file": "Okayama_BR-GTO_race_v1.2.sto"
            },
        ],
        "nissangtpzxt": [
            {
                "file": "GTP_Okayama_JdelOlmoR.sto"
            },
            {
                "file": "NGTP_Okayama_1-8.sto"
            },
        ]
    },
    {
        ...tracks.ARAGON_OUTER,
        "weekStart": "2024-02-06",
        "audi90gto": [
            {
                "file": "A90_23S3_Aragon_Y_Gijsen_R.sto"
            },
            {
                "file": "aragon-23S3-r3.sto"
            },
        ],
        "nissangtpzxt": [
            {
                "file": "BL_Aragon_Outer_R51.sto"
            },
            {
                "file": "Lgo23S3_Aragon_Outer_Q51.sto"
            },
            {
                "file": "Lgo23S3_Aragon_Outer_R51.sto"
            },
            {
                "file": "Lgo23S3_Aragon_Outer_R612.sto"
            },
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
            {
                "file": "KB_2022-S3_Silverstone_Historic_R_v2.sto"
            },
            {
                "file": "A90_-_22S3_-_Silverstone_H_-_Y_Gijsen_-_220719_-_R.sto"
            },
            {
                "file": "silverstone-2008-historic-22S3-r1.sto"
            },
        ],
        "nissangtpzxt": [
            {
                "file": "Lgo22S1_HockGP_MH_Silverstone_Int_R_v1_Q61.sto",
                "comment": "Qualifying setup"
            },
            {
                "file": "Lgo22S1_HockGP_MH_Silverstone_Int_R_v1_R61.sto",
                "comment": "Race setup"
            },
        ]
    },
    {
        ...tracks.FUJI_NO_CHICANE,
        "weekStart": "2024-02-20",
        "audi90gto": [
            {
                "file": "Fuji_S3_2022_1.2_Race.sto",
            },
            {
                "file": "A90 - 22S4 - Fuji - J Del Olmo - R.sto",
            },
            {
                "file": "A90 - 22S4 - Fuji - Y Gijsen - 221005 - Q.sto",
                "comment": "Qualifying setup"
            },
            {
                "file": "A90 - 22S4 - Fuji - Y Gijsen - 221005 - R.sto",
                "comment": "Race setup"
            },
            {
                "file": "fuji-22-S3-r-01.sto",
            },
        ],
        "nissangtpzxt": [
            {
                "file": "fuji-22S3-r-NGTP_Fuji_1-3.sto",
            },
            {
                "file": "Lgo22S3_Fuji_NoCh_R41.sto",
            },
        ]
    },
    {
        ...tracks.WATKINS_GLEN_CLASSIC,
        "weekStart": "2024-02-27",
        "notes": [
            "We have not raced this layout recently or ever. Setups are for Classic Boot!"
        ],
        "audi90gto": [
            {
                "file": "watkins-classic-boot-23S3-q.sto",
                "comment": "Qualifying setup"
            },
            {
                "file": "watkins-classic-boot-23S3-r2.sto",
                "comment": "Race setup"
            },
            {
                "file": "watkinsintlboot_2022_S3_R.sto",
            },
        ],
        "nissangtpzxt": [
            {
                "file": "Watkins_Glen_CB_R_v1.2.sto",
            },
            {
                "file": "watkins-22S3-AG_WGI_5W2.sto",
            },
        ]
    },
]

export default seasonSetups