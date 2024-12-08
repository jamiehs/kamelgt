import * as tracks from './track-names.js';

const seasonShortName = "25S1"
const seasonSetups = [
    {
        ...tracks.MUGELLO,
        "weekStart": "2024-12-17",
        "audi90gto": [
            {
                file: "maf_mugello_23s4_q1.sto",
                comment: "Qualifying setup"
            },
            {
                file: "maf_mugello_23s4_r1.sto",
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
        "audi90gto": [
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
        "audi90gto": [
        ],
        "nissangtpzxt": [
        ]
    },
    {
        ...tracks.HOCKENHEIM_GP,
        "weekStart": "2025-01-07",
        "audi90gto": [
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
            "60 minute endurance round",
            "Pit stop may be required"
        ],
        "audi90gto": [
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
        "audi90gto": [
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