// ============================================================
//  DIWAKAR ADHIKARI — PORTFOLIO CONFIG
//  Edit this file to update your website. No coding needed!
//  Save the file and refresh your browser to see changes.
// ============================================================

const SITE_CONFIG = {

  // ── PERSONAL INFO ─────────────────────────────────────────
  name: "Diwakar Adhikari",
  taglines: [
    "Environmental Scientist",
    "Water Resource Researcher",
    "Hydrologic Modeller",
    "Climate Adaptation Advocate"
  ],
  email: "thisisdwakr@gmail.com",
  phone: "+977-984-3247059",
  location: "Kathmandu, Nepal",
  github: "https://github.com/",        // Add your GitHub URL
  linkedin: "",                          // Add your LinkedIn URL if any

  bio: `I am an environmental scientist specialising in water resource management, 
  restoration ecology, and climate-resilient infrastructure. My work spans hydrologic 
  modelling, contaminant fate and transport, and integrated urban water systems — 
  with a focus on communities and rivers in the Hindu Kush Himalayan region.`,

  // ── RESEARCH INTERESTS ────────────────────────────────────
  researchInterests: [
    "Integrated & Urban Water Systems, Governance and Political Economy",
    "Modelling Water Systems for Climate-Resilient Infrastructure and Adaptation",
    "Contaminant Fate, Transport, and Treatment"
  ],

  // ── SKILLS ────────────────────────────────────────────────
  // Each group has a label and a list of skills
  skills: [
    {
      group: "Hydrologic & Climate Modelling",
      items: ["SWAT+", "HEC-HMS", "Watershed Delineation", "GCM Selection", "Climate Impact Assessment"]
    },
    {
      group: "GIS & Remote Sensing",
      items: ["QGIS", "ArcGIS", "Geospatial Data Collection", "Spatial Mapping"]
    },
    {
      group: "Programming & Data",
      items: ["Python", "R", "SPSS", "Excel", "Statistical Visualisation"]
    },
    {
      group: "Field & Lab",
      items: ["Water/Soil/Sediment Sampling", "QA/QC", "Physicochemical Analysis", "Heavy Metal Analysis"]
    },
    {
      group: "Program Management",
      items: ["Grant Writing", "M&E Frameworks", "Stakeholder Engagement", "Capacity Building", "Budget Management"]
    },
    {
      group: "Communication & Advocacy",
      items: ["Strategic Content Development", "Campaign Design", "Community Outreach", "Environmental Advocacy"]
    }
  ],

  // ── PROJECTS ──────────────────────────────────────────────
  // tags: used for filtering — keep them consistent
  // detail: shown when the user clicks "Read More"
  projects: [
    {
      id: 1,
      slug: "hydroclimatic-variability-marsyangdi",
      displayMode: "fullpage",
      gallery: [],
      videoUrl: "",
      report: { file: "", label: "Download Report" },
      relatedPubs: [],
      title: "Hydroclimatic Variability in the Marsyangdi River Basin",
      shortDesc: "Assessing climate-driven changes in hydrology and their implications for water resource management in the Marsyangdi River Basin.",
      tags: ["Research", "Hydrology", "Climate Change"],
      year: "2025",
      status: "Independent Project",
      detail: `This independent project investigates hydroclimatic variability under a changing climate in the Marsyangdi River Basin (MRB), Nepal. Using General Circulation Model (GCM) outputs and hydrological modelling tools (SWAT+ and HEC-HMS), the study projects future changes in precipitation patterns, temperature extremes, and river discharge. Findings are intended to inform climate-resilient water infrastructure planning and adaptive management strategies for the basin. All analytical code is openly available on GitHub.`,
      link: "" // Add GitHub link here
    },
    {
      id: 2,
      slug: "sediment-dynamics-hydropower",
      displayMode: "fullpage",
      gallery: [],
      videoUrl: "",
      report: { file: "", label: "Download Report" },
      relatedPubs: [],
      title: "Sediment Dynamics & Hydropower Impacts — Marsyangdi River",
      shortDesc: "MSc thesis examining sediment load, transport mechanisms, and environmental impacts of run-of-river hydropower plants.",
      tags: ["Research", "Sediment", "Hydropower"],
      year: "2024",
      status: "MSc Thesis — Tribhuvan University",
      detail: `This thesis assessed sediment load and transport mechanisms in the Marsyangdi River Basin and evaluated the environmental impacts of peaking run-of-river hydropower plants. The research combined field sampling, GIS analysis, and hydrological modelling to quantify sediment fluxes and identify how hydropower operations alter natural sediment regimes — with implications for downstream ecology, infrastructure longevity, and riparian communities. A peer-reviewed journal article from this work has been submitted to the Journal of Sedimentary Environments.`,
      link: ""
    },
    {
      id: 3,
      slug: "water-soil-food-nexus",
      displayMode: "fullpage",
      gallery: [],
      videoUrl: "",
      report: { file: "", label: "Download Report" },
      relatedPubs: [],
      title: "Water-Soil-Food Nexus & Agrobiodiversity — Marsyangdi Basin",
      shortDesc: "Research fellowship exploring sustainable livelihoods through agrobiodiversity mainstreaming along the Marsyangdi River Basin.",
      tags: ["Research", "Food Systems", "Livelihoods"],
      year: "2023–2024",
      status: "Research Fellow — Dept. of Botany, TU",
      detail: `As a Research Fellow at the Department of Botany, Tribhuvan University, this project examined the water-soil-food nexus to promote sustainable livelihoods in the Marsyangdi River Basin, Gandaki Province. The research included comprehensive surveys on water poverty, climate vulnerability, and socioeconomic implications for local communities. It also assessed the potential of agrobiodiversity mainstreaming as a strategy for food and livelihood security under climate change.`,
      link: ""
    },
    {
      id: 4,
      slug: "sisdol-landfill-pollution",
      displayMode: "popup",
      gallery: [],
      videoUrl: "",
      report: { file: "", label: "Download Report" },
      relatedPubs: [],
      title: "Environmental Pollution Assessment — Sisdol Landfill",
      shortDesc: "Post-closure pollution assessment of the Sisdol Landfill site, covering water, soil, air, and leachate contamination.",
      tags: ["Research", "Pollution", "Lab Analysis"],
      year: "2023–2024",
      status: "Research Assistant — RECAST",
      detail: `Working at the Research Centre for Applied Science and Technology (RECAST), this project assessed environmental pollution at the Sisdol Landfill Site following its closure. Over 50 surface water, groundwater, leachate, soil, air quality, and noise pollution samples were collected and analysed for physicochemical, biological, and heavy metal parameters. The study characterised the post-closure impact of the landfill on surrounding land, water bodies, air quality, and local communities.`,
      link: ""
    },
    {
      id: 5,
      slug: "nepal-waste-map",
      displayMode: "fullpage",
      gallery: [],
      videoUrl: "",
      report: { file: "", label: "Download Report" },
      relatedPubs: [],
      title: "Nepal Waste Map — Digital Waste Management System",
      shortDesc: "City-scale digital waste management platform mapping 70,000+ households across six municipalities in Nepal.",
      tags: ["Program", "Waste Management", "Digital"],
      year: "2018–2022",
      status: "Program Officer — Clean Up Nepal",
      detail: `The Nepal Waste Map (now Safa Nepal) was a flagship digital waste management initiative connecting waste generators, collectors, and recyclers through a mobile application and web dashboard. As Program Officer, key achievements included mapping ~70,000 households across Tulsipur, Birgunj, Waling, Kathmandu, Bharatpur, and Ilam; training 500+ waste management workers and officials; resolving 1,000+ waste-related grievances; and enabling 200+ households to directly connect with recyclers. The project secured approximately $100,000 in grants and won the Most Innovative Development Project (Runner Up) award from the Global Development Network in 2021.`,
      link: ""
    },
    {
      id: 6,
      slug: "climate-adaptation-marginalized",
      displayMode: "popup",
      gallery: [],
      videoUrl: "",
      report: { file: "", label: "Download Report" },
      relatedPubs: [],
      title: "Climate Change Adaptation for Marginalized Communities",
      shortDesc: "Policy and grassroots capacity-building programme for climate adaptation with marginalised communities in Nepal.",
      tags: ["Program", "Climate Change", "Policy"],
      year: "2024–2025",
      status: "Consultant — Nepal Peacebuilding Initiative",
      detail: `This project strengthened policy-level and grassroots capacity to enhance climate change adaptation for marginalised communities across Nepal. Key activities included participatory climate risk assessments, training 90+ youth leaders from 6 municipalities in climate advocacy, facilitating Policy Dialogue Consultations, and bridging governance gaps between communities and local government. The work resulted in community-identified priorities being integrated into district climate plans, and adaptive livelihood strategies being designed for vulnerable populations.`,
      link: ""
    },
    {
      id: 7,
      slug: "spring-water-karnali",
      displayMode: "popup",
      gallery: [],
      videoUrl: "",
      report: { file: "", label: "Download Report" },
      relatedPubs: [],
      title: "Spring Water Assessment — Karnali River Basin",
      shortDesc: "Physicochemical and biological analysis of 5,000+ spring water samples across the Karnali River Basin.",
      tags: ["Research", "Water Quality", "Field Work"],
      year: "2022",
      status: "Research Assistant — Kathmandu University",
      detail: `Conducted at Kathmandu University, this project assessed spring water quality across the Karnali River Basin. The work involved training local teams on spring water sampling techniques, managing field logistics, and heading a minilab that analysed physicochemical and biological parameters of over 5,000 spring water samples. Findings contributed to a broader understanding of spring water availability and quality in the high-altitude watersheds of western Nepal.`,
      link: ""
    }
  ],

  // ── PUBLICATIONS ──────────────────────────────────────────
  publications: [
    {
      authors: "Upadhaya, M., Adhikari, D., Thapa, L. B., Yadhav, R. K. P., & Pant, R.",
      year: "2026",
      title: "Assessment of drinking water quality and irrigation suitability in the Marsyangdi river Basin, Nepal: implications for SDG 6 and ecosystem sustainability",
      journal: "Environmental Earth Science",
      status: "Accepted",
      doi: ""
    },
    {
      authors: "Pant, R. R., Zhang, F., Qaiser, F. U. R., Varol, M., Adhikari, D., Wang, G., Saqr, A. M., & Bishwakarma, K.",
      year: "2025",
      title: "Trace elements in fluvial sediments of the Gandaki River Basin, Central Himalaya, Nepal: Distribution, sources, and risk assessment",
      journal: "Journal of Soils and Sediments",
      status: "Published",
      doi: "https://doi.org/10.1007/s11368-025-04091-x"
    },
    {
      authors: "Pant, R. R., Koirala, M., Adhikari, D., & Gaire, N. P.",
      year: "2024",
      title: "Ecological Restoration in Nepal: A Comprehensive Policy Overview",
      journal: "Sustainable Ecological Restoration and Conservation in the Hindu Kush Himalayan Region, CABI",
      status: "Published",
      doi: "https://doi.org/10.1079/9781800622579.0011"
    },
    {
      authors: "Adhikari, D., Upadhaya, M., Shah, D.N., Thapa, L. B., Yadhav, R. K. P., Srivastava, A, & Pant, R.",
      year: "",
      title: "Sediment dynamics and environmental implications of the peaking run-of-river hydropower plants in the Marsyangdi River, Nepal",
      journal: "Journal of Sedimentary Environments",
      status: "Revision Submitted",
      doi: ""
    },
    {
      authors: "Adhikari, D., Thapa, L. B., Yadhav, R. K. P., & Pant, R.",
      year: "",
      title: "Hydroclimatic variability under climate change in the Marsyangdi River Basin: Implications for water resources management",
      journal: "Hydrological Processes",
      status: "Submitted",
      doi: ""
    }
  ],

  // ── AWARDS & GRANTS ───────────────────────────────────────
  awards: [
    { year: "2023", title: "Research Fellowship", org: "Department of Botany, Tribhuvan University" },
    { year: "2023", title: "Data Fellowship", org: "Code for Nepal" },
    { year: "2021", title: "Most Innovative Development Project (Runner Up)", org: "Global Development Network" },
    { year: "2021", title: "Climate Action Fund", org: "The Asia Foundation" },
    { year: "2021", title: "Digital Solution Systems for Province 2", org: "The Asia Foundation" },
    { year: "2021", title: "Small Asian Small Grant Project (SASGP)", org: "The Asia Foundation" }
  ],

  // ── EDUCATION ─────────────────────────────────────────────
  education: [
    {
      degree: "MSc in Environmental Science",
      institution: "Central Department of Environmental Science, Tribhuvan University",
      year: "2021–2024",
      detail: "CGPA: 3.85 | Specialisation: Water Resource Management, Restoration Ecology | Thesis: Assessment of Sediment Load, Transport Mechanisms, and the Impacts Due to Hydropower Plants in the Marsyangdi River Basin."
    },
    {
      degree: "BSc in Environmental Science",
      institution: "Tri-Chandra Multiple Campus, Tribhuvan University",
      year: "2015–2018",
      detail: "Major: Environmental Science and Chemistry | Elective: Zoology"
    }
  ]

};
