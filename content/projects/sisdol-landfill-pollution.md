---
title: Rainfall Imputation in High Relief Himalayan Terrain
shortDesc: ""
year: "2025"
status: Independent Project
organisation: ""
category: research
tags: []
image: ""
gallery:
  - src: /images/observedvsimputed.png
    caption: Time series of observed vs. imputed daily rainfall at Goga/Tilche
      (2,256 m) across the full Long30 record (1990–2023)
  - src: /images/spatial-nse.png
    caption: Spatial NSE Map
  - src: /images/magnitudeanddirectionpreservation.png
    caption: Magnitude and Direction Preservation
  - src: /images/fsicsi.png
    caption: F1 and CSI wet-day detection scores at 50% random missing
displayMode: fullpage
link: https://github.com/dwaakar/rainfall-imputation
showGallery: false
showDetail: false
fpShowGallery: true
fpShowDetail: true
order: 4
---
Complete and continuous daily rainfall records are essential for climate trend detection, hydrological modelling, and water resource management, yet stations in mountainous regions frequently contain substantial data gaps. In high-relief Himalayan terrain, the stations most in need of gap-filling are also those where neighbouring donors are least representative, creating a fundamental challenge that method complexity alone cannot resolve. This study presents a controlled evaluation of nine imputation methods applied to daily rainfall records from 20 stations in the Marsyangdi River Basin, central Nepal, spanning elevations from 280 to over 8,000 m for the period 1990 to 2023. Three method classes were evaluated: statistical baselines (Simple Average, Normal Ratio, Linear Regression, and Multiple Linear Regression with PCA), spatial interpolation methods (Inverse Distance Weighting (IDW), Elevation-Weighted IDW, Ordinary Kriging, and Co-kriging with Elevation), and machine learning (XGBoost). Beyond standard accuracy metrics, the evaluation assessed wet-day detection skill, trend preservation using Sen's slope, systematic and unsystematic error decomposition, bootstrap prediction uncertainty, and leaving a station (spatial leave-one-out) cross-validation to derive network design thresholds. Key findings reveal that meteorological isolation, not elevation or algorithmic complexity, is the primary determinant of reconstruction skill. Co-kriging with Elevation collapsed to ElevIDW under sparse network conditions, confirming that added model sophistication yields no benefit when donor density is the binding constraint. NormalRatio was the only method preserving long-term trend magnitude reliably, with Sen's slope bias of 100%, compared to 1,009 to 1,286% for all other methods. Linear Regression, despite competitive RMSE, exhibited wet-day F1 scores 34% lower than leading methods. Over 52% of total imputation errors, and 86-87% of extreme-event error, are systematic and correctable through post-imputation quantile mapping. Spatial leave-one-out analysis established a practical reconstruction viability threshold of approximately 0.85 neighbour availability with at least 10-12 concurrent donors, below which imputation failure reflects a data infrastructure deficit that no algorithm can resolve. These findings provide a practical, application-specific framework for method selection and network design in high-relief Himalayan environments and comparable data-scarce mountain regions worldwide.
