const QUAL = "Qualifying setup";

export const ARAGON_OUTER = {
    title: "Aragón - Outer",
    alternateTitle: "MotorLand Aragon - Outer"
}
export const ARAGON_MOTORCYCLE_GP = {
    title: "Aragón - Motorcycle Grand Prix",
    alternateTitle: "MotorLand Aragon - Motorcycle Grand Prix"
}
export const ALGARVE = {
    title: "Algarve International Circuit - Grand Prix",
    alternateTitle: "Portimão Circuit - Grand Prix"
}
export const BARBER = {
    title: "Barber Motorsports Park"
}
export const BARCELONA = {
    title: "Barcelona",
    alternateTitle: "Circuit de Barcelona-Catalunya - Grand Prix"
}
export const BATHURST = {
    title: "Bathurst",
    alternateTitle: "Mount Panorama Circuit",
    setups: {
        "audi90gto": [
            {
                file: "bathurst/Bathurst60min.sto",
                comment: "From audriusv",
            },
            {
                file: "bathurst/MH_Bathurst_R_v1.sto",
            },
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
                comment: QUAL
            },
            {
                file: "bathurst/JdelOlmoMountParonama23S1D.sto",
            },
            {
                file: "bathurst/maf_bathurst_24s2_r0.sto",
            },
            {
                file: "bathurst/maf_bathurst_24s2_q0.sto",
                comment: QUAL
            },
        ],
        "nissangtpzxt": [
            {
                file: "bathurst/Bathurst60min.sto",
                comment: "From audriusv",
            },
            {
                file: "bathurst/F122_NGTP_Bathurst_1-9.sto",
            },
            {
                file: "bathurst/NGTP_BATH_Q_ALEX_FRI.sto",
                comment: QUAL
            },
            {
                file: "bathurst/NGTP_BATH_R_ALEX_FRI.sto",
            },
            {
                file: "bathurst/BL_Bathurst_R8-2.sto",
            },
            {
                file: "bathurst/BL_Bathurst_Q8-2.sto",
                comment: QUAL
            },
            {
                file: "bathurst/jlo_bathurst_r.sto",
            },
            {
                file: "bathurst/jlo_bathurst_q.sto",
                comment: QUAL
            },
            {
                file: "bathurst/Lgo24S2_Bathurst_R51.sto",
            },
            {
                file: "bathurst/Lgo24S2_Bathurst_Q60.sto",
                comment: QUAL
            },
        ]
    }
}
export const BARCELONA_HISTORIC = {
    title: "Barcelona Historic",
    alternateTitle: "Circuit de Barcelona-Catalunya - Historic"
}
export const BELLE_ISLE = {
    title: "Detroit Belle Isle"
}
export const BRANDS_HATCH = {
    title: "Brands Hatch"
}
export const CHARLOTTE_ROVAL = {
    title: "Charlotte - Roval",
    setups: {
        "audi90gto": [
            {
                file: "charlotte/maf_charlotte_23s4_q2b.sto",
                comment: QUAL
            },
            {
                file: "charlotte/maf_charlotte_23s4_r2b.sto",
            },
            {
                file: "charlotte/A90_Charlotte_22S3_Y_Gijsen_Q.sto",
                comment: QUAL
            },
            {
                file: "charlotte/A90_Charlotte_22S3_Y_Gijsen_R.sto",
            },
        ],
        "nissangtpzxt": [
            {
                file: "charlotte/Charlotte_Q.sto",
                comment: QUAL
            },
            {
                file: "charlotte/BL_Charlotte_Roval_Q6.sto",
                comment: QUAL
            },
            {
                file: "charlotte/BL_Charlotte_Roval_R6.sto",
            },
            {
                file: "charlotte/F122_NGTP_Charlotte_1-4_Q.sto",
                comment: QUAL
            },
            {
                file: "charlotte/F122_NGTP_Charlotte_1-4.sto",
            },
            {
                file: "charlotte/GTP_Charlotte_JdelOlmoR.sto",
            },
            {
                file: "charlotte/Lgo23S4_Charlotte_Roval_Q70.sto",
                comment: QUAL
            },
            {
                file: "charlotte/Lgo23S4_Charlotte_Roval_R70.sto",
            },
            {
                file: "charlotte/rovalo_FRC_hamilR1.2.sto",
            },
        ]
    }
}
export const COTA = {
    title: "COTA",
    alternateTitle: "Circuit of the Americas"
}
export const DAYTONA = {
    title: "Daytona",
    setups: {
        "audi90gto": [
            {
                file: "daytona/A90_DaytonaRC_23S1_Y_Gijsen_Q.sto",
                comment: QUAL
            },
            {
                file: "daytona/A90_DaytonaRC_23S1_Y_Gijsen_R.sto",
            },
            {
                file: "daytona/DWC_23S1_Daytona_R2.sto",
            },
            {
                file: "daytona/KB_2022-S2_Daytona_Road_R-ih.sto",
            },
        ],
        "nissangtpzxt": [
            {
                file: "daytona/F122_NGTP_DaytonaRC_1-8_Q.sto",
                comment: QUAL
            },
            {
                file: "daytona/F122_NGTP_DaytonaRC_1-8.sto",
            },
            {
                file: "daytona/GTP_Daytona_JdelOlmoR.sto",
            },
            {
                file: "daytona/SDC_24s4_GTP_Daytona_Q1.0.1.sto",
                comment: QUAL
            },
            {
                file: "daytona/SDC_24s4_GTP_Daytona_R1.0.1.sto",
            },
        ]
    }
}
export const DAYTONA_ROAD = {
    title: "Daytona - Road",
    setups: DAYTONA.setups
}
export const DAYTONA_2007_ROAD = {
    title: "Daytona 2007 - Road",
    setups: DAYTONA.setups
}
export const DAYTONA_NASCAR_ROAD = {
    title: "Daytona - NASCAR Road",
    setups: DAYTONA.setups
}
export const DONINGTON_PARK = {
    title: "Donington Park"
}
export const FUJI_NO_CHICANE = {
    title: "Fuji - No Chicane"
}
export const HOCKENHEIM_GP = {
    title: "Hockenheim GP",
    alternateTitle: "Hockenheimring Baden-Württemberg - Grand Prix"
}
export const HOCKENHEIM_OUTER = {
    title: "Hockenheim - Outer",
    alternateTitle: "Hockenheimring Baden-Württemberg - Outer"
}
export const HOMESTEAD_MIAMI_ROAD_A = {
    title: "Homestead Miami - Road A",
    alternateTitle: "Homestead Miami Speedway - Road Course A",
    setups: {
        "audi90gto": [
            {
                file: "miami-homestead/A90_23S3_Homestead_Y_Gijsen_Q.sto",
                comment: QUAL
            },
            {
                file: "miami-homestead/A90_23S3_Homestead_Y_Gijsen_R.sto",
            },
            {
                file: "miami-homestead/homestead-22-S2-r-03.sto",
            },
            {
                file: "miami-homestead/homestead-22S2-q.sto",
                comment: QUAL
            },
            {
                file: "miami-homestead/homestead-22S2-r4.sto",
            },
            {
                file: "miami-homestead/homestead-23S3-r1.sto",
            },
            {
                file: "miami-homestead/Miami2022S2b.sto",
            },
        ],
        "nissangtpzxt": [
            {
                file: "miami-homestead/BL_HomesteadA_Q.2.sto",
                comment: QUAL
            },
            {
                file: "miami-homestead/BL_HomesteadA_R.2.sto",
            },
            {
                file: "miami-homestead/F122_NGTP_MiamiA_1-3_Q.sto",
                comment: QUAL
            },
            {
                file: "miami-homestead/F122_NGTP_MiamiA_1-3.sto",
            },
            {
                file: "miami-homestead/F122_NGTP_MiamiA_1-5_Q.sto",
                comment: QUAL
            },
            {
                file: "miami-homestead/F122_NGTP_MiamiA_1-5.sto",
            },
            {
                file: "miami-homestead/Lgo23S3_HomesteadB_R31.sto",
            },
        ]
    }
}
export const HOMESTEAD_MIAMI_ROAD_B = {
    title: "Homestead Miami - Road B",
    alternateTitle: "Homestead Miami Speedway - Road Course B",
    setups: HOMESTEAD_MIAMI_ROAD_A.setups
}
export const HUNGARORING = {
    title: "Hungaroring"
}
export const IMOLA = {
    title: "Imola",
    alternateTitle: "Autodromo Internazionale Enzo e Dino Ferrari"
}
export const INDY_ROAD = {
    title: "Indy - Road",
    alternateTitle: "Indianapolis Motor Speedway - Road",
    setups: {
        "audi90gto": [
            {
                file: "indy-road/A90_Indy09_21S2_Y_Gijsen_R.sto",
            },
            {
                file: "indy-road/A90_Indy09_21S2_Y_Gijsen_Q.sto",
                comment: QUAL
            },
            {
                file: "indy-road/JdelOlmoIndi23S1E.sto",
            },
            {
                file: "indy-road/Indy_Road_1.1.sto",
            },
            {
                file: "indy-road/Indy_a6_90l.sto",
            },
            {
                file: "indy-road/23S1_Indy-road_R.sto",
            },
        ],
        "nissangtpzxt": [
            {
                file: "indy-road/Lgo23S1_Indy_RC_MH_Silverstone_Int_R_R62.sto",
            },
            {
                file: "indy-road/Lgo23S1_Indy_RC_MH_Silverstone_Int_R_Q62.sto",
                comment: QUAL
            },
            {
                file: "indy-road/NGTP_Indianapolis22_1-5.sto",
            },
            {
                file: "indy-road/asg-indy-rNGTP_1-5.sto",
            },
        ]
    }
}
export const INDY_ROAD_2009 = {
    title: "Indy - Road 2009",
    alternateTitle: "Indianapolis Motor Speedway - Road 2009",
    setups: INDY_ROAD.setups,
}
export const INTERLAGOS = {
    title: "Interlagos",
    alternateTitle: "Autódromo José Carlos Pace"
}
export const JEREZ = {
    title: "Jerez",
    alternateTitle: "Circuito de Jerez - Ángel Nieto"
}
export const JEREZ_MOTO = {
    title: "Jerez - Moto",
    alternateTitle: "Circuito de Jerez - Ángel Nieto - Moto"
}
export const LAGUNA_SECA = {
    title: "Laguna Seca",
    setups: {
        "audi90gto": [
            {
                file: "laguna-seca/KB_2022-S2_Laguna_seca_Race.sto",
            },
            {
                file: "laguna-seca/laguna.sto",
            },
            {
                file: "laguna-seca/maf_laguna_24s4_q1.sto",
                comment: QUAL
            },
            {
                file: "laguna-seca/maf_laguna_24s4_r1.sto",
            },
        ],
        "nissangtpzxt": [
            {
                file: "laguna-seca/GTP_LagunaSeca_JdelOlmoR.sto",
            },
            {
                file: "laguna-seca/Laguna33c.sto",
            },
            {
                file: "laguna-seca/LagunaSeca_Race_V1.sto",
            },
        ]
    }
}
export const LE_MANS = {
    title: "Le Mans",
    alternateTitle: "Circuit des 24 Heures du Mans"
}
export const LE_MANS_HISTORIC = {
    title: "Le Mans Historic",
    alternateTitle: "Circuit des 24 Heures du Mans - Historic",
    setups: {
        "audi90gto": [
            {
                file: "lemans/A90_23S3_LeMansH_Y_Gijsen_Q.sto",
                comment: QUAL
            },
            {
                file: "lemans/A90_23S3_LeMansH_Y_Gijsen_R.sto",
            },
            {
                file: "lemans/A90_kb_lemans_q.sto",
                comment: QUAL
            },
            {
                file: "lemans/A90_kb_lemans_r.sto",
            },
            {
                file: "lemans/GTO_LeMans_H_Q5.sto",
                comment: QUAL
            },
            {
                file: "lemans/GTO_LeMans_H_R1.sto",
            },
        ],
        "nissangtpzxt": [
            {
                file: "lemans/Lgo23S3_LeMans_Hist_AG_Indy_2W8_Q10.sto",
                comment: QUAL
            },
            {
                file: "lemans/Lgo23S3_LeMans_Hist_AG_Indy_2W8_R10.sto",
            },
        ]
    }
}
export const LIME_ROCK_CLASSIC = {
    title: "Lime Rock Park - Classic"
}
export const LIME_ROCK_GP = {
    title: "Lime Rock Park - GP"
}
export const LIME_ROCK_WEST_BEND = {
    title: "Lime Rock Park - West Bend Chicane"
}
export const LONG_BEACH = {
    title: "Long Beach",
    setups: {
        "audi90gto": [
            {
                file: "long-beach/A90_23S4_LongBeach_Y_Gijsen_R.sto",
            },
            {
                file: "long-beach/A90_23S4_LongBeach_Y_Gijsen_Q.sto",
                comment: QUAL
            },
            {
                file: "long-beach/andrius_sl_long_beach.sto",
            },
            {
                file: "long-beach/maf_longbeach_23s4_r0.sto",
            },
            {
                file: "long-beach/maf_longbeach_23s4_q0.sto",
                comment: QUAL
            },
        ],
        "nissangtpzxt": [
            {
                file: "long-beach/DWC_ZXT_21S4_long beach-_R1.sto",
            },
            {
                file: "long-beach/DWC_ZXT_21S4_long beach-_Q1.sto",
                comment: QUAL
            },
            {
                file: "long-beach/LONGBITCH_NGTP_R_ALEX.sto",
            },
            {
                file: "long-beach/LONGBITCH_NGTP_Q_ALEX.sto",
                comment: QUAL
            },
            {
                file: "long-beach/F122_NGTP_LongBeach_1-5.sto",
            },
            {
                file: "long-beach/F122_NGTP_LongBeach_1-5_Q.sto",
                comment: QUAL
            },
            {
                file: "long-beach/GTP_LongBeach_JdelOlmoR24S3.sto",
            },
        ]
    }
}
export const MAGNY_COURS = {
    title: "Magny-Cours",
    setups: {
        "audi90gto": [
            {
                file: "magny-cours/A90_23S1_Magny_Y_Gijsen_Q.sto",
                comment: QUAL
            },
            {
                file: "magny-cours/A90_23S1_Magny_Y_Gijsen_R.sto",
            },
            {
                file: "magny-cours/A90_23S1_magnycours_andreas_Rtues.sto",
            },
            {
                file: "magny-cours/JdelOlmoMagnyCourse23S1C.sto",
            },
            {
                file: "magny-cours/KB_2023-S1_Magny_Cours.sto",
            },
        ],
        "nissangtpzxt": [
            {
                file: "magny-cours/Lgo23S1_Magny-Cours_Q63.sto",
                comment: QUAL
            },
            {
                file: "magny-cours/Lgo23S1_Magny-Cours_R63.sto",
            },
            {
                file: "magny-cours/NGTP_MagnyCours_1-6_Q.sto",
                comment: QUAL
            },
            {
                file: "magny-cours/NGTP_MagnyCours_1-6.sto",
            },
        ]
    }
}
export const MID_OHIO = {
    title: "Mid-Ohio",
    setups: {
        "audi90gto": [
            {
                file: "mid-ohio/A90_MidOhio_23S1_Y_Gijsen_Q.sto",
                comment: QUAL
            },
            {
                file: "mid-ohio/A90_MidOhio_23S1_Y_Gijsen_R.sto",
            },
            {
                file: "mid-ohio/maf_midohio_24s4_q0.sto",
                comment: QUAL
            },
            {
                file: "mid-ohio/maf_midohio_24s4_r0.sto",
            },
            {
                file: "mid-ohio/mid-ohio-22S1-r3.sto",
            },
            {
                file: "mid-ohio/Mid-Ohio30c.sto",
            },
        ],
        "nissangtpzxt": [
            {
                file: "mid-ohio/GTP_MidOhio_JdelOlmoR.sto",
            },
            {
                file: "mid-ohio/Mid-Ohio30c Q v2.sto",
                comment: QUAL
            },
            {
                file: "mid-ohio/Mid-Ohio30c v3.sto",
            },
            {
                file: "mid-ohio/NGTP_OHIO_Q_ALEX WED.sto",
                comment: QUAL
            },
            {
                file: "mid-ohio/NGTP_OHIO_R_ALEX WED.sto",
            },
        ]
    }
}
export const MID_OHIO_CHICANE = {
    title: "Mid-Ohio - Chicane"
}
export const MISANO = {
    title: "Misano World Circuit Marco Simoncelli - Grand Prix"
}
export const MONTREAL = {
    title: "Montreal",
    alternateTitle: "Circuit Gilles Villeneuve",
    setups: {
        "audi90gto": [
            {
                file: "montreal/A90_Montreal_24S1_Y_Gijsen_Q.sto",
                comment: QUAL
            },
            {
                file: "montreal/A90_Montreal_24S1_Y_Gijsen_R.sto",
            },
            {
                file: "montreal/JdelOlmoAudiVilleneuve23S2.sto",
            },
            {
                file: "montreal/KB_Montreal_23_v1.sto",
            },
            {
                file: "montreal/maf_montreal_24s1_q1.sto",
                comment: QUAL
            },
            {
                file: "montreal/maf_montreal_24s1_r1.sto",
            },
            {
                file: "montreal/Montreal_BR-GTO_v2-race.sto",
            },
            {
                file: "montreal/Montreal_23_v1.sto",
            },
        ],
        "nissangtpzxt": [
            {
                file: "montreal/F122_NGTP_Montreal_1-3_Q.sto",
                comment: QUAL
            },
            {
                file: "montreal/F122_NGTP_Montreal_1-3.sto",
            },
            {
                file: "montreal/GTP_Gilles_JdelOlmoR2.sto",
            },
            {
                file: "montreal/Lgo24S1_Montreal_Q50.sto",
                comment: QUAL
            },
            {
                file: "montreal/Lgo24S1_Montreal_R50.sto",
            },
        ]
    }
}
export const MONZA = {
    title: "Monza",
    alternateTitle: "Autodromo Nazionale Monza"
}
export const MONZA_WITHOUT_FIRST_CHICANE = {
    title: "Monza without first chicane",
    alternateTitle: "Autodromo Nazionale Monza - GP without first chicane"
}
export const MONZA_COMBINED_WITHOUT_FIRST_CHICANE = {
    title: "Monza - Combined without first chicane",
    alternateTitle: "Autodromo Nazionale di Monza - Combined without first chicane"
}
export const MOSPORT = {
    title: "Canadian Tire Motorsport Park",
    alternateTitle: "CTMP 'Mosport'",
    setups: {
        "audi90gto": [
            {
                file: "ctmp/A90_Mosport_ 23S3_Y_Gijsen_Q.sto",
                comment: QUAL
            },
            {
                file: "ctmp/A90_Mosport_ 23S3_Y_Gijsen_R.sto",
            },
            {
                file: "ctmp/ctmp-22S3-Marc-r1.sto",
            },
            {
                file: "ctmp/ctmp-22S3-q2.sto",
                comment: QUAL
            },
            {
                file: "ctmp/ctmp-22S3-r4.sto",
            },
            {
                file: "ctmp/mosport-21S4-r4.sto",
            },
        ],
        "nissangtpzxt": [
            {
                file: "ctmp/Lgo21S4_Mosport_MH_Silverstone_Int_R_v1_Q64.sto",
                comment: QUAL
            },
            {
                file: "ctmp/Lgo21S4_Mosport_MH_Silverstone_Int_R_v1_R63.sto",
            },
        ]
    }
}
export const MUGELLO = {
    title: "Mugello",
    alternateTitle: "Autodromo Internazionale del Mugello - Grand Prix"
}
export const NAVARRA = {
    title: "Circuito de Navarra",
}
export const NORDSCHLEIFE_INDUSTRIEFAHRTEN = {
    title: "Nordschleife - Industriefahrten",
    alternateTitle: "Nurburgring Nürburgring Nordschleife - Industriefahrten"
}
export const NURBURGRING_COMBINED_24H = {
    title: "Nürburgring Combined - 24H",
    alternateTitle: "Nurburgring Combined - 24H"
}
export const NURBURGRING_COMBINED_GESAMTSTRECKE_VLN = {
    title: "Nürburgring Combined - Gesamtstrecke VLN",
    alternateTitle: "Nurburgring Combined - Gesamtstrecke VLN"
}
export const NURBURGRING_GP = {
    title: "Nürburgring GP",
    alternateTitle: "Nurburgring GP",
    setups: {
        "audi90gto": [
            {
                file: "nurburgring-gp/A90_NurbGP_24S1_Y_Gijsen_Q.sto",
                comment: QUAL
            },
            {
                file: "nurburgring-gp/A90_NurbGP_24S1_Y_Gijsen_R.sto",
            },
            {
                file: "nurburgring-gp/maf_nurbgp_24s1_q1.sto",
                comment: QUAL
            },
            {
                file: "nurburgring-gp/maf_nurbgp_24s1_r1.sto",
            },
            {
                file: "nurburgring-gp/NurbGP_BR-GTO_Q_v1.2.sto",
                comment: QUAL
            },
            {
                file: "nurburgring-gp/NurbGP_BR-GTO_race_v1.2.sto",
            },
            {
                file: "nurburgring-gp/nurburgring-gp-22S3_andreas.sto",
            },
            {
                file: "nurburgring-gp/nurburgring-gp-22S3_JavierNurg4.1.sto",
            },
        ],
        "nissangtpzxt": [
            {
                file: "nurburgring-gp/nurburgring-gp-22S3_Ferran_1-2.sto",
            },
            {
                file: "nurburgring-gp/nurburgring-gp-22S3_MH_R_v1.1.sto",
            },
            {
                file: "nurburgring-gp/Lgo24S1_Nur_BES_WEC_Q70.sto",
                comment: QUAL
            },
            {
                file: "nurburgring-gp/Lgo24S1_Nur_BES_WEC_R70.sto",
            },
            {
                file: "nurburgring-gp/GTP_Nurb_JdelOlmoR.sto",
            },
            {
                file: "nurburgring-gp/GTP_Nurb_JdelOlmoRNascar.sto",
            },
        ]
    }
}
export const NURBURGRING_GP_BES_WEC = {
    title: "Nürburgring GP BES/WEC",
    alternateTitle: "Nurburgring GP BES/WEC",
    setups: NURBURGRING_GP.setups,
}
export const NURBURGRING_GP_WITHOUT_ARENA = {
    title: "Nürburgring GP without arena",
    alternateTitle: "Nurburgring GP without arena",
    setups: NURBURGRING_GP.setups,
}
export const OKAYAMA = {
    title: "Okayama"
}
export const ORAN_PARK = {
    title: "Oran Park"
}
export const OSCHERSLEBEN = {
    title: "Oschersleben"
}
export const OULTON_PARK_INTL_WOUT_HISLOP = {
    title: "Oulton Park - Intl w/out Hislop"
}
export const OULTON_PARK_INTL_NO_CHICANES = {
    title: "Oulton Park - Intl w/no Chicanes"
}
export const PHILLIP_ISLAND = {
    title: "Phillip Island",
    setups: {
        "audi90gto": [
            {
                file: "phillip-island/A90_PhillipIsland_23S3_Y_Gijsen_Q.sto",
                comment: QUAL
            },
            {
                file: "phillip-island/A90_PhillipIsland_23S3_Y_Gijsen_R.sto",
            },
            {
                file: "phillip-island/phillip-island-22S3-Phil3.1.1.sto",
            },
            {
                file: "phillip-island/phillip-island-22S3-r1.sto",
            },
            {
                file: "phillip-island/phillip-island-22S3-Y_Gijsen-220727-R.sto",
            },
        ],
        "nissangtpzxt": [
            {
                file: "phillip-island/Lgo22S3_Phillip_Island_AG_WGI_6W1_Q62.sto",
                comment: QUAL
            },
            {
                file: "phillip-island/Lgo22S3_Phillip_Island_AG_WGI_6W1_R62 v3.sto",
            },
            {
                file: "phillip-island/LH_Phillip_Island_R.sto",
            },
            {
                file: "phillip-island/phillip-island-22S3_1-1.sto",
            },
            {
                file: "phillip-island/phillip-island-22S3_wing7_R6.sto",
            },
            {
                file: "phillip-island/phillip-island-22S3-Lgo_AG_WGI_6W1_R62.sto",
            },
        ]
    }
}
export const PORTLAND = {
    title: "Portland International Raceway"
}
export const PORTLAND_NO_CHICANE = {
    title: "Portland International Raceway - No Chicane"
}
export const PHOENIX_2008_OVAL = {
    title: "Phoenix Oval",
    alternateTitle: "Phoenix Raceway 2008 - Oval"
}
export const RED_BULL_RING = {
    title: "Red Bull Ring"
}
export const ROAD_AMERICA = {
    title: "Road America",
    setups: {
        "audi90gto": [
            {
                file: "road-america/A90_RoadAmerica_23S2_Y_Gijsen_R.sto",
            },
            {
                file: "road-america/A90_RoadAmerica_23S2_Y_Gijsen_Q.sto",
                comment: QUAL
            },
            {
                file: "road-america/maf_road_america_23s4_r1.sto",
            },
            {
                file: "road-america/maf_road_america_23s4_q1.sto",
                comment: QUAL
            },
        ],
        "nissangtpzxt": [
            {
                file: "road-america/GTP_RoadAmerica_JdelOlmoR.sto",
            },
            {
                file: "road-america/Lgo20S3_Road_America_high_downforce_R77.sto",
            },
            {
                file: "road-america/road_america_22s4_Full_R_v1-4.sto",
            },
            {
                file: "road-america/SDC_23S2_GTP_RAMERICA_RACEv0.86.sto",
            },
            {
                file: "road-america/SDC_23S2_GTP_RAMERICA_QUALYv0.85.sto",
            },
        ]
    }
}
export const ROAD_AMERICA_500 = {
    title: "Road America 500",
    setups: {
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
            ...ROAD_AMERICA.setups.audi90gto
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
            ...ROAD_AMERICA.setups.nissangtpzxt
        ]
    }
}
export const ROAD_ATLANTA = {
    title: "Road Atlanta",
    setups: {
        "audi90gto": [
            {
                file: "road-atlanta/A90 - 22S4 - RoadAtlanta - Y Gijsen - 221129 - R.sto",
            },
            {
                file: "road-atlanta/A90_RoadAtlanta_23S3__Y_Gijsen_Q.sto",
                comment: QUAL
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
                comment: QUAL
            },
        ]
    }
}
export const SACHSENRING = {
    title: "Sachsenring"
}
export const SEBRING = {
    title: "Sebring"
}
export const SILVERSTONE_GP = {
    title: "Silverstone - Grand Prix"
}
export const SILVERSTONE_INTERNATIONAL = {
    title: "Silverstone - International"
}
export const SILVERSTONE_2008_HISTORICAL_GP = {
    title: "Silverstone 2008 - Historical Grand Prix"
}
export const SNETTERTON_200 = {
    title: "Snetterton 200",
    alternateTitle: "Snetterton Circuit - 200"
}
export const SONOMA = {
    title: "Sonoma"
}
export const SONOMA_CUP = {
    title: "Sonoma - Cup"
}
export const SONOMA_NASCAR_LONG = {
    title: "Sonoma - NASCAR Long"
}
export const SPA_CLASSIC_PITS = {
    title: "Spa",
    alternateTitle: "Circuit de Spa-Francorchamps - Classic Pits",
    setups: {
        "audi90gto": [
            {
                file: "spa/A90_Sliumba_24S2_spa_Q.sto",
                comment: QUAL
            },
            {
                file: "spa/A90_Sliumba_24S2_spa_R2.sto",
            },
            {
                file: "spa/maf_spa_r3.sto",
            },
            {
                file: "spa/javier_spa_2022s4_4_ascR.sto",
            },
            {
                file: "spa/A90_23S3_Spa_Y_Gijsen_Q.sto",
                comment: QUAL
            },
            {
                file: "spa/A90_23S3_Spa_Y_Gijsen_R.sto",
            },
        ],
        "nissangtpzxt": [
            {
                file: "spa/F122_NGTP_Spa_1-2_Q.sto",
                comment: QUAL
            },
            {
                file: "spa/F122_NGTP_Spa_1-2.sto",
            },
            {
                file: "spa/GTP_Spa_JdelOlmoR.sto",
            },
            {
                file: "spa/Lgo24S2_Spa_Q50.sto",
                comment: QUAL
            },
            {
                file: "spa/Lgo24S2_Spa_R50.sto",
            },
            {
                file: "spa/rgeada_spa_q.sto",
                comment: QUAL
            },
            {
                file: "spa/rgeada_spa_r.sto",
            },
        ]
    }
}
export const SPA_ENDURANCE_PITS = {
    title: "Spa",
    alternateTitle: "Circuit de Spa-Francorchamps - Endurance Pits",
    setups: {...SPA_CLASSIC_PITS.setups}
}
export const SPA_GRAND_PRIX_PITS = {
    title: "Spa",
    alternateTitle: "Circuit de Spa-Francorchamps - Grand Prix Pits",
    setups: {...SPA_CLASSIC_PITS.setups}
}
export const SUMMIT_POINT = {
    title: "Summit Point",
    setups: {
        "audi90gto": [
            {
                file: "summit-point/A90 - 22S4 - SummitPoint - J Del Olmo - R.sto",
            },
            {
                file: "summit-point/A90 - 22S4 - SummitPoint - M Ollé - R.sto",
            },
            {
                file: "summit-point/A90_SummitPoint_21S2_Y_Gijsen_Q.sto",
                comment: QUAL
            },
            {
                file: "summit-point/A90_SummitPoint_21S2_Y_Gijsen_R.sto",
            },
            {
                file: "summit-point/summit-21S4-q.sto",
                comment: QUAL
            },
            {
                file: "summit-point/summit-21S4-r2.sto",
            },
        ],
        "nissangtpzxt": [
            {
                file: "summit-point/asg-summit-q-NGTP_R_v1-4.sto",
                comment: QUAL
            },
            {
                file: "summit-point/asg-summit-r-NGTP_R_v1-4.sto",
            },
            {
                file: "summit-point/Lgo22S4_Summit_Q80.sto",
                comment: QUAL
            },
            {
                file: "summit-point/Lgo22S4_Summit_R81.sto",
            },
        ]
    }
}
export const SUZUKA = {
    title: "Suzuka",
    setups: {
        "audi90gto": [
            {
                file: "suzuka/A90_Suzuka_23S4_Y_Gijsen_Q.sto",
                comment: QUAL
            },
            {
                file: "suzuka/A90_Suzuka_23S4_Y_Gijsen_R.sto",
            },
            {
                file: "suzuka/suzuka-23s1-arturas-saturday.sto",
            },
            {
                file: "suzuka/suzuka-23S1-Javier-r2.sto",
            },
        ],
        "nissangtpzxt": [
            {
                file: "suzuka/BL_Suzuka_Q7.1.sto",
                comment: QUAL
            },
            {
                file: "suzuka/BL_Suzuka_R7.1.sto",
            },
            {
                file: "suzuka/F122_NGTP_Suzuka_1-3_Q.sto",
                comment: QUAL
            },
            {
                file: "suzuka/F122_NGTP_Suzuka_1-3.sto",
            },
            {
                file: "suzuka/JW-Suzuka-Quali-V3.sto",
                comment: QUAL
            },
            {
                file: "suzuka/JW-Suzuka-Race-V3.sto",
            },
            {
                file: "suzuka/NGTP_SUZU_Q_ALEX WED.sto",
                comment: QUAL
            },
            {
                file: "suzuka/NGTP_SUZU_R_ALEX WED.sto",
            },
        ]
    }
}
export const THRUXTON = {
    title: "Thruxton Circuit",
    setups: {
        "audi90gto": [
            {
                file: "thruxton/A90_Thruxton_25S2_Y_Gijsen_R.sto",
            },
            {
                file: "thruxton/A90_Thruxton_25S2_Y_Gijsen_Q.sto",
                comment: QUAL
            },
            {
                file: "thruxton/maf_thruxton_25s2_r3.sto",
            },
            {
                file: "thruxton/maf_thruxton_25s2_q3.sto",
                comment: QUAL
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
    }
}
export const TSUKUBA = {
    title: "Tsukuba",
    alternateTitle: "Tsukuba Circuit"
}
export const TWIN_RING_MOTEGI = {
    title: "Mobility Resort Motegi",
    alternateTitle: "Twin Ring Motegi"
}
export const VIR = {
    title: "VIR",
    alternateTitle: "Virginia International Raceway"
}
export const WATKINS_GLEN_BOOT = {
    title: "Watkins Glen - Boot",
    alternateTitle: "Watkins Glen International - Boot",
    setups: {
        "audi90gto": [
            {
                file: "watkins-glen/maf_watkins_24s4_q1.sto",
                comment: QUAL
            },
            {
                file: "watkins-glen/maf_watkins_24s4_r1.sto",
            },
            {
                file: "watkins-glen/Watkins32c.sto",
            },
            {
                file: "watkins-glen/WatkinsClassicBoot_BR-GTO_Q_v1.0.sto",
                comment: QUAL
            },
            {
                file: "watkins-glen/WatkinsClassicBoot_BR-GTO_60min_v1.1.sto",
            },
            {
                file: "public/setups/audi90gto/watkins-glen/watkins-classic-boot-23S3-q.sto",
                comment: QUAL
            },
            {
                file: "public/setups/audi90gto/watkins-glen/watkins-classic-boot-23S3-r2.sto",
            },
        ],
        "nissangtpzxt": [
            {
                file: "watkins-glen/GTP_WGB_JdelOlmoR.sto",
            },
            {
                file: "watkins-glen/Lgo24S4_WG_Classic_Boot_Q52.sto",
                comment: QUAL
            },
            {
                file: "watkins-glen/Lgo24S4_WG_Classic_Boot_R52.sto",
            },
            {
                file: "watkins-glen/Watkins_Glen_CB_R_v1.2.sto",
            },
            {
                file: "watkins-glen/watkins-22S3-AG_WGI_5W2.sto",
            },
            {
                file: "watkins-glen/Watkins5W2v3.sto",
            },
            {
                file: "watkins-glen/Watkins32c.sto",
            },
        ]
    }
}
export const WATKINS_GLEN_CLASSIC = {
    title: "Watkins Glen - Classic",
    alternateTitle: "Watkins Glen International - Classic",
    setups: WATKINS_GLEN_BOOT.setups
}
export const WATKINS_GLEN_CLASSIC_BOOT = {
    title: "Watkins Glen - Classic Boot",
    alternateTitle: "Watkins Glen International - Classic Boot",
    setups: WATKINS_GLEN_BOOT.setups
}
export const WATKINS_GLEN_CUP = {
    title: "Watkins Glen - Cup",
    alternateTitle: "Watkins Glen International - Cup",
    setups: WATKINS_GLEN_BOOT.setups
}
export const WILLOW_SPRINGS = {
    title: "Willow Springs"
}
export const ZANDVOORT = {
    title: "Zandvoort",
    setups: {
        "audi90gto": [
            {
                file: "zandvoort/A90_Zandvoort_23S4_Y_Gijsen_Q.sto",
                comment: QUAL
            },
            {
                file: "zandvoort/A90_Zandvoort_23S4_Y_Gijsen_R.sto",
            },
            {
                file: "zandvoort/Zandvoort_S3_2021_1.3_34oC_RACE.sto",
            },
            {
                file: "zandvoort/zandvoort-21S3-r4.sto",
            },
        ],
        "nissangtpzxt": [
            {
                file: "zandvoort/GTP_ZandvoortJdelOlmoQ.sto",
                comment: QUAL
            },
            {
                file: "zandvoort/GTP_ZandvoortJdelOlmo.sto",
            },
            {
                file: "zandvoort/Lgo23S4_Zandvoort_GP_Q62.sto",
                comment: QUAL
            },
            {
                file: "zandvoort/Lgo23S4_Zandvoort_GP_R53.sto",
            },
            {
                file: "zandvoort/ZAND_NGTP_Q_ALEX.sto",
                comment: QUAL
            },
            {
                file: "zandvoort/ZAND_NGTP_R_ALEX.sto",
            },
        ]
    }
}
export const ZOLDER = {
    title: "Zolder",
    alternateTitle: "Circuit Zolder"
}
export const ZOLDER_ALTERNATE = {
    title: "Zolder Alternate",
    alternateTitle: "Circuit Zolder - Alternate"
}

const trackData = {
    ARAGON_OUTER,
    ARAGON_MOTORCYCLE_GP,
    ALGARVE,
    BARBER,
    BARCELONA,
    BATHURST,
    BARCELONA_HISTORIC,
    BELLE_ISLE,
    BRANDS_HATCH,
    CHARLOTTE_ROVAL,
    COTA,
    DAYTONA,
    DAYTONA_ROAD,
    DAYTONA_2007_ROAD,
    DAYTONA_NASCAR_ROAD,
    DONINGTON_PARK,
    FUJI_NO_CHICANE,
    HOCKENHEIM_GP,
    HOCKENHEIM_OUTER,
    HOMESTEAD_MIAMI_ROAD_A,
    HOMESTEAD_MIAMI_ROAD_B,
    HUNGARORING,
    IMOLA,
    INDY_ROAD_2009,
    INDY_ROAD,
    INTERLAGOS,
    JEREZ,
    JEREZ_MOTO,
    LAGUNA_SECA,
    LE_MANS,
    LE_MANS_HISTORIC,
    LIME_ROCK_CLASSIC,
    LIME_ROCK_GP,
    LIME_ROCK_WEST_BEND,
    LONG_BEACH,
    MAGNY_COURS,
    MID_OHIO,
    MID_OHIO_CHICANE,
    MISANO,
    MONTREAL,
    MONZA,
    MONZA_WITHOUT_FIRST_CHICANE,
    MONZA_COMBINED_WITHOUT_FIRST_CHICANE,
    MOSPORT,
    MUGELLO,
    NAVARRA,
    NORDSCHLEIFE_INDUSTRIEFAHRTEN,
    NURBURGRING_COMBINED_24H,
    NURBURGRING_COMBINED_GESAMTSTRECKE_VLN,
    NURBURGRING_GP,
    NURBURGRING_GP_BES_WEC,
    NURBURGRING_GP_WITHOUT_ARENA,
    OKAYAMA,
    ORAN_PARK,
    OSCHERSLEBEN,
    OULTON_PARK_INTL_WOUT_HISLOP,
    OULTON_PARK_INTL_NO_CHICANES,
    PHILLIP_ISLAND,
    PORTLAND,
    PORTLAND_NO_CHICANE,
    PHOENIX_2008_OVAL,
    RED_BULL_RING,
    ROAD_AMERICA,
    ROAD_ATLANTA,
    SACHSENRING,
    SEBRING,
    SILVERSTONE_GP,
    SILVERSTONE_INTERNATIONAL,
    SILVERSTONE_2008_HISTORICAL_GP,
    SNETTERTON_200,
    SONOMA,
    SONOMA_CUP,
    SONOMA_NASCAR_LONG,
    SPA_CLASSIC_PITS,
    SPA_ENDURANCE_PITS,
    SPA_GRAND_PRIX_PITS,
    SUMMIT_POINT,
    SUZUKA,
    THRUXTON,
    TSUKUBA,
    TWIN_RING_MOTEGI,
    VIR,
    WATKINS_GLEN_BOOT,
    WATKINS_GLEN_CLASSIC,
    WATKINS_GLEN_CLASSIC_BOOT,
    WILLOW_SPRINGS,
    ZANDVOORT,
    ZOLDER,
    ZOLDER_ALTERNATE,
}
export default trackData