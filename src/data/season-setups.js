import * as tracks from './track-names.js';

const seasonShortName = "25S1"
const seasonSetups = [
    {
        ...tracks.MUGELLO,
        "weekStart": "2024-12-17",
        "audi90gto": [
            {
                file: "mugello/maf_mugello_23s4_q1.sto",
                comment: "Qualifying setup"
            },
            {
                file: "mugello/maf_mugello_23s4_r1.sto",
            },
            {
                file: "mugello/A90_24S1_Mugello_Y_Gijsen_Q.sto",
                comment: "Qualifying setup"
            },
            {
                file: "mugello/A90_24S1_Mugello_Y_Gijsen_R.sto",
            },
            {
                file: "mugello/Mugello_BR-GTO_v3.1_Q.sto",
                comment: "Qualifying setup"
            },
            {
                file: "mugello/Mugello_BR-GTO_v3_race.sto",
            },
        ],
        "nissangtpzxt": [
            {
                file: "mugello/asg-mugello-q.sto",
                comment: "Qualifying setup"
            },
            {
                file: "mugello/asg-mugello-r.sto",
            },
            {
                file: "mugello/F122_NGTP_Mugello_1-7_Q.sto",
                comment: "Qualifying setup"
            },
            {
                file: "mugello/F122_NGTP_Mugello_1-7.sto",
            },
            {
                file: "mugello/GTP_Mugello_JdelOlmoR2.sto",
            },
            {
                file: "mugello/Lgo24S1_Mugello_Q60.sto",
                comment: "Qualifying setup"
            },
            {
                file: "mugello/Lgo24S1_Mugello_R61.sto",
            },
            {
                file: "mugello/Lgo24S1_Mugello_R61_gear_changes_v2.sto",
            },
        ]
    },
    {
        ...tracks.ARAGON_MOTORCYCLE_GP,
        "weekStart": "2024-12-24",
        "notes": [
            "First time at this layout, setups are for 'Outer'"
        ],
        "audi90gto": [
            {
                file: "aragon/A90_AragonO_24S1_Y_Gijsen_Q.sto",
                comment: "Qualifying setup"
            },
            {
                file: "aragon/A90_AragonO_24S1_Y_Gijsen_R.sto",
            },
            {
                file: "aragon/Aragon_BR-GTO_24s1_Q_v1.5.sto",
                comment: "Qualifying setup"
            },
            {
                file: "aragon/Aragon_BR-GTO_24s1_race_v1.5.sto",
            },
            {
                file: "aragon/maf_aragon_23s4_q0.sto",
                comment: "Qualifying setup"
            },
            {
                file: "aragon/maf_aragon_23s4_r1.sto",
            },
        ],
        "nissangtpzxt": [
            {
                file: "aragon/Lgo23S3_Aragon_Outer_Q51.sto",
                comment: "Qualifying setup"
            },
            {
                file: "aragon/Lgo23S3_Aragon_Outer_R51.sto",
            },
            {
                file: "aragon/Lgo23S3_Aragon_Outer_R612.sto",
            },
        ]
    },
    {
        ...tracks.NAVARRA,
        "weekStart": "2024-12-31",
        "notes": [
            "First time at this track, check Discord for developing setups"
        ],
        "audi90gto": [
        ],
        "nissangtpzxt": [
        ]
    },
    {
        ...tracks.HOCKENHEIM_GP,
        "weekStart": "2025-01-07",
        "audi90gto": [
            {
                file: "hockenheimring/23_S1_Hockenheim_1.0_Race.sto",
            },
            {
                file: "hockenheimring/A90_23S1_Hockenheim_Y_Gijsen_R.sto",
            },
            {
                file: "hockenheimring/hockenheim-23S1-r1.sto",
            },
            {
                file: "hockenheimring/KB_2023-S1_Hockenheim-v2.sto",
            },
            {
                file: "hockenheimring/JdelOlmoAudiHocken23S1C.sto",
            },
        ],
        "nissangtpzxt": [
            {
                file: "hockenheimring/Lgo22S1_HockGP_MH_Silverstone_Int_R_v1_Q61.sto",
                comment: "Qualifying setup"
            },
            {
                file: "hockenheimring/Lgo22S1_HockGP_MH_Silverstone_Int_R_v1_R61.sto",
            },
        ]
    },
    {
        ...tracks.MOSPORT,
        "weekStart": "2025-01-14",
        "notes": [
            "70 minute endurance round",
            "Pit stop may be required"
        ],
        "audi90gto": [
            {
                file: "ctmp/ctmp-22S3-Marc-r1.sto",
            },
            {
                file: "ctmp/ctmp-22S3-q2.sto",
            },
            {
                file: "ctmp/ctmp-22S3-r1.sto",
            },
            {
                file: "ctmp/ctmp-22S3-r4.sto",
            },
        ],
        "nissangtpzxt": [
            {
                file: "ctmp/Lgo21S4_Mosport_MH_Silverstone_Int_R_v1_Q64.sto",
                comment: "Qualifying setup"
            },
            {
                file: "ctmp/Lgo21S4_Mosport_MH_Silverstone_Int_R_v1_R63.sto",
            },
        ]
    },
    {
        ...tracks.ALGARVE,
        "weekStart": "2025-01-21",
        "audi90gto": [            
            {
                file: "algarve/A90_Portimao_24S2_Y_Gijsen_Q.sto",
                comment: "Qualifying setup"
            },
            {
                file: "algarve/A90_Portimao_24S2_Y_Gijsen_R.sto",
            },
            {
                file: "algarve/A90_Sliumba_24S2_portimao_Q.sto",
                comment: "Qualifying setup"
            },
            {
                file: "algarve/A90_Sliumba_24S2_portimao_R.sto",
            },
            {
                file: "algarve/maf_port_24s2_q2.sto",
                comment: "Qualifying setup"
            },
            {
                file: "algarve/maf_port_24s2_r2.sto",
            },
        ],
        "nissangtpzxt": [
            {
                file: "algarve/Lgo24S2_Algarve_Q72.sto",
                comment: "Qualifying setup"
            },
            {
                file: "algarve/Lgo24S2_Algarve_R72.sto",
            },
            {
                file: "algarve/rgeada_portimao_q.sto",
            },
            {
                file: "algarve/rgeada_portimao_r.sto",
            },
            {
                file: "algarve/qualy_algarve.sto",
                comment: "Qualifying setup"
            },
            {
                file: "algarve/GTP_Algarve_JdelOlmoR.sto",
            },
        ]
    },
    {
        ...tracks.LIME_ROCK_CLASSIC,
        "weekStart": "2025-01-28",
        "audi90gto": [
            {
                file: "lime-rock-park/A90_LimeRockC_21S2_Y_Gijsen_Q.sto",
                comment: "Qualifying setup"
            },
            {
                file: "lime-rock-park/A90_LimeRockC_21S2_Y_Gijsen_R.sto",
            },
        ],
        "nissangtpzxt": [
            {
                file: "lime-rock-park/Lgo22S2_LRP_West_R_v1_Q81.sto",
                comment: "Qualifying setup"
            },
            {
                file: "lime-rock-park/Lgo22S2_LRP_West_R_v1_R81.sto",
            },
        ]
    },
    {
        ...tracks.BRANDS_HATCH,
        "weekStart": "2025-02-04",
        "audi90gto": [
            {
                file: "brands-hatch/A90_Brands_22S3_Y_Gijsen_Q.sto",
                comment: "Qualifying setup"
            },
            {
                file: "brands-hatch/A90_Brands_22S3_Y_Gijsen_R.sto",
            },
            {
                file: "brands-hatch/brands-21S3-r2.sto",
            },
            {
                file: "brands-hatch/brands-hatch-21S3_MarcOlle_2.2_Race.sto",
            },
            {
                file: "brands-hatch/brands-hatch-21S3_Marti.sto",
            },
        ],
        "nissangtpzxt": [
            {
                file: "brands-hatch/Lgo22S3_Brands_Hatch_GP_6W1_Q62.sto",
                comment: "Qualifying setup"
            },
            {
                file: "brands-hatch/Lgo22S3_Brands_Hatch_GP_6W1_R62.sto",
            },
        ]
    },
    {
        ...tracks.SILVERSTONE_GP,
        "weekStart": "2025-02-11",
        "notes": [
            "We have not raced this version and layout in over 4 years, if ever!",
        ],
        "audi90gto": [
            {
                file: "silverstone/A90_Silverstone08H_23S2_Y_Gijsen_Q.sto",
                comment: "Qualifying setup"
            },
            {
                file: "silverstone/A90_Silverstone08H_23S2_Y_Gijsen_R.sto",
            },
        ],
        "nissangtpzxt": [
            {
                file: "silverstone/SILVERSTONEC_NGTP_Q_ALEX.sto",
                comment: "Qualifying setup"
            },
            {
                file: "silverstone/SILVERSTONEC_NGTP_R_ALEX.sto",
            },
            {
                file: "silverstone/Lgo24S1_Silverstone_Hist_R60.sto",
            },
            {
                file: "silverstone/NGTP_SilverstoneH_1-2.sto",
            },
        ]
    },
    {
        ...tracks.FUJI_NO_CHICANE,
        "weekStart": "2025-02-18",
        "audi90gto": [
            {
                file: "fuji/andrius_sl_fuji_24S1_Q.sto",
                comment: "Qualifying setup"
            },
            {
                file: "fuji/andrius_sl_fuji_24S1_R.sto",
            },
            {
                file: "fuji/A90 - 22S4 - Fuji - Y Gijsen - 221005 - Q.sto",
                comment: "Qualifying setup"
            },
            {
                file: "fuji/A90 - 22S4 - Fuji - Y Gijsen - 221005 - R.sto",
            },
            {
                file: "fuji/A90 - 22S4 - Fuji - J Del Olmo - R.sto",
            },
            {
                file: "fuji/fuji-22-S3-r-01.sto",
            },
            {
                file: "fuji/KB_2022-S3_Fuji_R.sto",
            },
        ],
        "nissangtpzxt": [
            {
                file: "fuji/F122_NGTP_Fuji_1-4_Q.sto",
                comment: "Qualifying setup"
            },
            {
                file: "fuji/F122_NGTP_Fuji_1-4.sto",
            },
            {
                file: "fuji/GTP_Fuji_No_Chicane_JdelOlmoR.sto",
            },
            {
                file: "fuji/Lgo24S1_Fuji_NoCh_Q61.sto",
                comment: "Qualifying setup"
            },
            {
                file: "fuji/Lgo24S1_Fuji_NoCh_R60.sto",
            },
        ]
    },
    {
        ...tracks.OSCHERSLEBEN,
        "weekStart": "2025-02-25",
        "notes": [
            "60 minute endurance round",
            "Pit stop may be required"
        ],
        "audi90gto": [
            {
                file: "oschersleben/oschersleben-22s4-d_cloud-r.sto",
            },
            {
                file: "oschersleben/oschersleben-22s4-e_gaudin-r.sto",
            },
            {
                file: "oschersleben/oschersleben-22s4-j_del_olmo-r.sto",
            },
            {
                file: "oschersleben/oschersleben-22s4-j_hamel-smith-r.sto",
            },
            {
                file: "oschersleben/oschersleben-22s4-m_ollé-r.sto",
            },
        ],
        "nissangtpzxt": [
            {
                file: "oschersleben/Lgo22S4_Oschersleben_Q81.sto",
                comment: "Qualifying setup"
            },
            {
                file: "oschersleben/Lgo22S4_Oschersleben_R82.sto",
            },
        ]
    },
    {
        ...tracks.SONOMA_NASCAR_LONG,
        "weekStart": "2025-03-04",
        "audi90gto": [
            {
                file: "sonoma/A90_Sonoma_24S2_Y_Gijsen_Q.sto",
                comment: "Qualifying setup"
            },
            {
                file: "sonoma/A90_Sonoma_24S2_Y_Gijsen_R.sto",
            },
            {
                file: "sonoma/maf_sonoma_24s2_q5.sto",
                comment: "Qualifying setup"
            },
            {
                file: "sonoma/maf_sonoma_24s2_r5.sto",
            },
            {
                file: "sonoma/Sonoma.sto",
            },
        ],
        "nissangtpzxt": [
            {
                file: "sonoma/F122_NGTP_Sonoma_1-4_Q.sto",
                comment: "Qualifying setup"
            },
            {
                file: "sonoma/F122_NGTP_Sonoma_1-4.sto",
            },
            {
                file: "sonoma/Lgo24S2_Sonoma_Cup_Q70.sto",
                comment: "Qualifying setup"
            },
            {
                file: "sonoma/Lgo24S2_Sonoma_Cup_R70.sto",
            },
            {
                file: "sonoma/SONOMA_NGTP_R_ALEX.sto",
            },
        ]
    },
]


export default seasonSetups
export {
    seasonSetups,
    seasonShortName,
}