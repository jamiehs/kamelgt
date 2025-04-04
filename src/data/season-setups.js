import * as tracks from './track-names.js';

const seasonShortName = "25S2"
const seasonSetups = [
    {
        ...tracks.ROAD_ATLANTA,
        "weekStart": "2025-03-18",
        "audi90gto": [
            {
                file: "road-atlanta/A90 - 22S4 - RoadAtlanta - Y Gijsen - 221129 - R.sto",
            },
            {
                file: "road-atlanta/A90_RoadAtlanta_23S3__Y_Gijsen_Q.sto",
                comment: "Qualifying setup"
            },
            {
                file: "road-atlanta/A90 - 22S4 - RoadAtlanta - K Bouafia - R.sto",
            },
            {
                file: "road-atlanta/A90 - 22S4 - RoadAtlanta - J Del Olmo - R.sto",
            },
        ],
        "nissangtpzxt": [
            {
                file: "road-atlanta/Lgo22S4_Road_Atlanta_MH_Silverstone_Int_R61.sto",
                comment: ""
            },
            {
                file: "road-atlanta/Lgo22S4_Road_Atlanta_MH_Silverstone_Int_Q61.sto",
                comment: "Qualifying setup"
            },
        ]
    },
    {
        ...tracks.WILLOW_SPRINGS,
        "weekStart": "2025-03-25",
        "audi90gto": [
            {
                file: "willow-springs/A90_23S3_WillowSprings_Y_Gijsen_R.sto",
            },
            {
                file: "willow-springs/A90_23S3_WillowSprings_Y_Gijsen_Q.sto",
                comment: "Qualifying setup"
            },
            {
                file: "willow-springs/JDS-WillowSprings-Race.sto",
            },
            {
                file: "willow-springs/maf_willow_r4.sto",
            },
            {
                file: "willow-springs/maf_willow_q4.sto",
                comment: "Qualifying setup"
            },
            {
                file: "willow-springs/willow-springs-23S3-r1.sto",
            },
        ],
        "nissangtpzxt": [
            {
                file: "willow-springs/GTP_Willow_JdelOlmoR.sto",
            },
            {
                file: "willow-springs/WillowSprings-Q.sto",
                comment: "Qualifying setup"
            },
            {
                file: "willow-springs/WillowSprings-R.sto",
            },
            {
                file: "willow-springs/WillowSprings-R2-wing5.sto",
            },
            {
                file: "willow-springs/WillowSprings-TR.sto",
            },
        ]
    },
    {
        ...tracks.THRUXTON,
        "weekStart": "2025-04-01",
        "notes": [
            "This is IMSA Vintage’s first visit to Thruxton"
        ],
        "audi90gto": [
            {
                file: "thruxton/A90_Thruxton_25S2_Y_Gijsen_R.sto",
            },
            {
                file: "thruxton/A90_Thruxton_25S2_Y_Gijsen_Q.sto",
                comment: "Qualifying setup"
            },
            {
                file: "thruxton/maf_thruxton_25s2_r3.sto",
            },
            {
                file: "thruxton/maf_thruxton_25s2_q3.sto",
                comment: "Qualifying setup"
            },
            {
                file: "thruxton/DWC_25S2_Thruxton_R3.sto",
            },
            {
                file: "thruxton/Thruxton27c.sto",
                comment: "From audriusv"
            },
        ],
        "nissangtpzxt": [
            {
                file: "thruxton/Thruxton27c.sto",
                comment: "From audriusv"
            },
            {
                file: "thruxton/Lgo25S2_Thruxton_R60.sto",
                comment: "From Laust"
            },
        ]
    },
    {
        ...tracks.BATHURST,
        "weekStart": "2025-04-08",
        "notes": [
            "60 mintue endurance round",
            "Fuel stop likely required"
        ],
        "audi90gto": [
            {
                file: "bathurst/23S1_Buthurt_R.sto",
            },
            {
                file: "bathurst/a_sliumba_24S2_bathurst_R2.sto",
            },
            {
                file: "bathurst/A90_23S3_Bathurst_Y_Gijsen_R.sto",
            },
            {
                file: "bathurst/A90_23S3_Bathurst_Y_Gijsen_Q.sto",
                comment: "Qualifying setup"
            },
            {
                file: "bathurst/JdelOlmoMountParonama23S1D.sto",
            },
            {
                file: "bathurst/maf_bathurst_24s2_r0.sto",
            },
            {
                file: "bathurst/maf_bathurst_24s2_q0.sto",
                comment: "Qualifying setup"
            },
        ],
        "nissangtpzxt": [
            {
                file: "bathurst/BL_Bathurst_R8-2.sto",
            },
            {
                file: "bathurst/BL_Bathurst_Q8-2.sto",
                comment: "Qualifying setup"
            },
            {
                file: "bathurst/jlo_bathurst_r.sto",
            },
            {
                file: "bathurst/jlo_bathurst_q.sto",
                comment: "Qualifying setup"
            },
            {
                file: "bathurst/Lgo24S2_Bathurst_R51.sto",
            },
            {
                file: "bathurst/Lgo24S2_Bathurst_Q60.sto",
                comment: "Qualifying setup"
            },
        ]
    },
    {
        ...tracks.LONG_BEACH,
        "weekStart": "2025-04-15",
        "audi90gto": [
            {
                file: "long-beach/A90_23S4_LongBeach_Y_Gijsen_R.sto",
            },
            {
                file: "long-beach/A90_23S4_LongBeach_Y_Gijsen_Q.sto",
                comment: "Qualifying setup"
            },
            {
                file: "long-beach/andrius_sl_long_beach.sto",
            },
            {
                file: "long-beach/maf_longbeach_23s4_r0.sto",
            },
            {
                file: "long-beach/maf_longbeach_23s4_q0.sto",
                comment: "Qualifying setup"
            },
        ],
        "nissangtpzxt": [
            {
                file: "long-beach/DWC_ZXT_21S4_long beach-_R1.sto",
            },
            {
                file: "long-beach/DWC_ZXT_21S4_long beach-_Q1.sto",
                comment: "Qualifying setup"
            },
            {
                file: "long-beach/LONGBITCH_NGTP_R_ALEX.sto",
            },
            {
                file: "long-beach/LONGBITCH_NGTP_Q_ALEX.sto",
                comment: "Qualifying setup"
            },
            {
                file: "long-beach/F122_NGTP_LongBeach_1-5.sto",
            },
            {
                file: "long-beach/F122_NGTP_LongBeach_1-5_Q.sto",
                comment: "Qualifying setup"
            },
            {
                file: "long-beach/GTP_LongBeach_JdelOlmoR24S3.sto",
            },
        ]
    },
    {
        ...tracks.ROAD_AMERICA,
        "weekStart": "2025-04-22",
        "notes": [
            "Road America 500 (special event week)"
        ],
        "audi90gto": [
            {
                file: "road-america/maf_RA500_24s2_R.sto",
                comment: "RA500 setup"
            },
            {
                file: "road-america/RA500_2023_1.2_120L_RACE_1.sto",
                comment: "RA500 setup"
            },
            {
                file: "road-america/A90_RoadAmerica_24S2_Y_Gijsen_R500.sto",
                comment: "RA500 setup"
            },
            {
                file: "road-america/A90_RoadAmerica_23S2_Y_Gijsen_R.sto",
            },
            {
                file: "road-america/A90_RoadAmerica_23S2_Y_Gijsen_Q.sto",
                comment: "Qualifying setup"
            },
            {
                file: "road-america/maf_road_america_23s4_r1.sto",
            },
            {
                file: "road-america/maf_road_america_23s4_q1.sto",
                comment: "Qualifying setup"
            },
        ],
        "nissangtpzxt": [
            {
                file: "road-america/F122_NGTP_RA500_1-7.sto",
                comment: "RA500 setup"
            },
            {
                file: "road-america/F122_NGTP_RA500_1-7_Q.sto",
                comment: "RA500 Qualifying setup"
            },
            {
                file: "road-america/SDC_24s2_GTP_R500_R1.1.2.sto",
                comment: "RA500 setup"
            },
            {
                file: "road-america/GTP_RoadAmerica_JdelOlmoR.sto",
                comment: ""
            },
            {
                file: "road-america/Lgo20S3_Road_America_high_downforce_R77.sto",
                comment: ""
            },
            {
                file: "road-america/road_america_22s4_Full_R_v1-4.sto",
                comment: ""
            },
            {
                file: "road-america/SDC_23S2_GTP_RAMERICA_RACEv0.86.sto",
                comment: ""
            },
            {
                file: "road-america/SDC_23S2_GTP_RAMERICA_QUALYv0.85.sto",
                comment: ""
            },
        ]
    },
    {
        ...tracks.INDY_ROAD,
        "weekStart": "2025-04-29",
        "audi90gto": [
            {
                file: "",
                comment: ""
            },
        ],
        "nissangtpzxt": [
            {
                file: "",
                comment: ""
            },
        ]
    },
    {
        ...tracks.SUMMIT_POINT,
        "weekStart": "2025-05-06",
        "audi90gto": [
            {
                file: "",
                comment: ""
            },
        ],
        "nissangtpzxt": [
            {
                file: "",
                comment: ""
            },
        ]
    },
    {
        ...tracks.SPA_CLASSIC_PITS,
        "weekStart": "2025-05-13",
        "audi90gto": [
            {
                file: "",
                comment: ""
            },
        ],
        "nissangtpzxt": [
            {
                file: "",
                comment: ""
            },
        ]
    },
    {
        ...tracks.PHILLIP_ISLAND,
        "weekStart": "2025-05-20",
        "notes": [
            "60 mintue endurance round",
            "Fuel stop likely required"
        ],
        "audi90gto": [
            {
                file: "",
                comment: ""
            },
        ],
        "nissangtpzxt": [
            {
                file: "",
                comment: ""
            },
        ]
    },
    {
        ...tracks.ZANDVOORT,
        "weekStart": "2025-05-27",
        "audi90gto": [
            {
                file: "",
                comment: ""
            },
        ],
        "nissangtpzxt": [
            {
                file: "",
                comment: ""
            },
        ]
    },
    {
        ...tracks.LE_MANS_HISTORIC,
        "weekStart": "2025-06-03",
        "notes": [
            "Race duration is 11 laps"
        ],
        "audi90gto": [
            {
                file: "",
                comment: ""
            },
        ],
        "nissangtpzxt": [
            {
                file: "",
                comment: ""
            },
        ]
    },
]


export default seasonSetups
export {
    seasonSetups,
    seasonShortName,
}