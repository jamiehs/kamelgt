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
                "file": "barber-21S3-q.sto"
            },
            {
                "file": "barber-21S3-r4.sto"
            },

        ],
        "nissangtpzxt": [
            {
                "file": "MH_Barber_R_v1.sto",
                "comment": "Quite old; possible it may fail tech"
            },
        ]
    },
    {
        ...tracks.IMOLA,
        "weekStart": "2024-01-16",
        "audi90gto": [
        ],
        "nissangtpzxt": [
        ]
    },
    {
        ...tracks.NURBURGRING_GP_BES_WEC,
        "weekStart": "2024-01-23",
        "audi90gto": [
        ],
        "nissangtpzxt": [
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