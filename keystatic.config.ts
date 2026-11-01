import { config, fields, collection, singleton } from '@keystatic/core';

// Shared option lists (same choices the old Decap CMS offered)
const DISPLAY_MODE = [
  { label: 'Popup only', value: 'popup' },
  { label: 'Popup + Full Page', value: 'fullpage' },
];
// Experience & Publications can also have no popup at all (the "Read more" link is then hidden)
const DISPLAY_MODE_OPTIONAL = [
  { label: 'No popup (no "Read more" link)', value: 'none' },
  { label: 'Popup', value: 'popup' },
  { label: 'Popup + Full Page', value: 'fullpage' },
];
const MONTHS = [
  { label: 'None (Year only)', value: '' },
  ...['January','February','March','April','May','June','July','August','September','October','November','December']
    .map((label, i) => ({ label, value: String(i + 1) })),
];
const IMG = { directory: 'images', publicPath: '/images/' } as const;

export default config({
  storage: {
    kind: 'cloud',
  },
  cloud: {
    project: 'dwaakar/website',
  },
  ui: {
    brand: { name: 'Diwakar Adhikari' },
    navigation: {
      '⚙️ Site': ['settings', 'skills', 'map', 'sections'],
      '📚 Content': ['education', 'experience', 'projects', 'publications', 'awards', 'customItems'],
    },
  },
  collections: {
    awards: collection({
      label: '🏆 Awards',
      slugField: 'title',
      path: 'content/awards/*',
      format: { contentField: 'body' },
      schema: {
        title: fields.slug({ name: { label: 'Award Title' } }),
        org: fields.text({ label: 'Organisation' }),
        year: fields.text({ label: 'Year' }),
        order: fields.integer({ label: 'Order' }),
        body: fields.document({ label: 'Details', formatting: true }),
      },
    }),
    
    education: collection({
      label: '🎓 Education',
      slugField: 'title',
      path: 'content/education/*',
      format: { contentField: 'body' },
      schema: {
        title: fields.slug({ name: { label: 'Degree / Title' } }),
        institution: fields.text({ label: 'Institution' }),
        year: fields.text({ label: 'Year' }),
        grade: fields.text({ label: 'Grade' }),
        specialisation: fields.text({ label: 'Specialisation' }),
        thesis: fields.text({ label: 'Thesis' }),
        coursework: fields.array(fields.text({ label: 'Course' }), { label: 'Coursework', itemLabel: props => props.value }),
        image: fields.image({ label: 'Image', ...IMG }),
        link: fields.url({ label: 'Link' }),
        displayMode: fields.select({ label: 'Display Mode', options: DISPLAY_MODE, defaultValue: 'popup' }),
        popup: fields.text({ label: 'Popup Label' }),
        showCoursework: fields.checkbox({ label: 'Show Coursework' }),
        fpShowCoursework: fields.checkbox({ label: 'Full Page Show Coursework' }),
        gallery: fields.array(
          fields.object({
            src: fields.image({ label: 'Image', ...IMG }),
            caption: fields.text({ label: 'Caption' }),
          }),
          { label: 'Gallery', itemLabel: props => props.fields.caption.value || 'Image' }
        ),
        popupVisLabel: fields.text({ label: 'Popup Visibility Label (internal)' }),
        fullpageVisLabel: fields.text({ label: 'Fullpage Visibility Label (internal)' }),
        showGallery: fields.checkbox({ label: 'Show Gallery' }),
        showDetail: fields.checkbox({ label: 'Show Detail' }),
        fpShowShortDesc: fields.checkbox({ label: 'FP Show Short Desc' }),
        fpShowGallery: fields.checkbox({ label: 'FP Show Gallery' }),
        fpShowDetail: fields.checkbox({ label: 'FP Show Detail' }),
        showOnJourney: fields.checkbox({ label: 'Show on Journey timeline' }),
        month: fields.select({ label: 'Month (used when several Journey items share a year)', options: MONTHS, defaultValue: '' }),
        elevation: fields.text({ label: 'Elevation (blank = auto)', description: 'Leave blank to place automatically by date' }),
        journeyIcon: fields.text({ label: 'Journey Icon (emoji)' }),
        districts: fields.array(fields.text({ label: 'District' }), { label: 'Districts (Nepal map)', itemLabel: props => props.value || 'District' }),
        hybridSyncLabel: fields.text({ label: 'Hybrid Sync Label (internal)' }),
        order: fields.integer({ label: 'Order' }),
        body: fields.document({ label: 'Notes', formatting: true }),
      },
    }),
    
    experience: collection({
      label: '💼 Experience',
      slugField: 'title',
      path: 'content/experience/*',
      format: { contentField: 'body' },
      schema: {
        title: fields.slug({ name: { label: 'Job Title' } }),
        organisation: fields.text({ label: 'Organisation' }),
        location: fields.text({ label: 'Location' }),
        startDate: fields.text({ label: 'Start Date' }),
        endDate: fields.text({ label: 'End Date' }),
        current: fields.checkbox({ label: 'Current Role' }),
        type: fields.select({ label: 'Type', options: [{ label: 'Research', value: 'research' }, { label: 'Work', value: 'work' }, { label: 'Consultancy', value: 'consultancy' }], defaultValue: 'work' }),
        shortDesc: fields.text({ label: 'Short Description', multiline: true }),
        gallery: fields.array(
          fields.object({
            src: fields.image({ label: 'Image', ...IMG }),
            caption: fields.text({ label: 'Caption' }),
          }),
          { label: 'Gallery' }
        ),
        image: fields.image({ label: 'Image', ...IMG }),
        displayMode: fields.select({ label: 'Display Mode (Read more)', description: 'No popup = no "Read more" link on the site. Popup = Read more opens a popup. Popup + Full Page = the popup also gets a Full Page button.', options: DISPLAY_MODE_OPTIONAL, defaultValue: 'popup' }),
        showShortDesc: fields.checkbox({ label: 'Popup · Short Description', description: 'Untick to hide it in the popup.', defaultValue: true }),
        showImage: fields.checkbox({ label: 'Popup · Cover Image' }),
        showProject: fields.checkbox({ label: 'Popup · Project', description: 'Shows the part of the text under the heading "Project".' }),
        showDutiesAndResponsibilities: fields.checkbox({ label: 'Popup · Duties and Responsibilities', description: 'Shows the part of the text under the heading "Duties and Responsibilities".' }),
        showSelectedProgrammeAchievements: fields.checkbox({ label: 'Popup · Selected Programme Achievements', description: 'Shows the part of the text under the heading "Selected Programme Achievements".' }),
        showDetail: fields.checkbox({ label: 'Popup · Other text', description: 'Text before the first heading, and any heading that does not have its own checkbox.' }),
        showGallery: fields.checkbox({ label: 'Popup · Gallery' }),
        fpShowShortDesc: fields.checkbox({ label: 'Full Page · Short Description', defaultValue: true }),
        fpShowImage: fields.checkbox({ label: 'Full Page · Cover Image' }),
        fpShowProject: fields.checkbox({ label: 'Full Page · Project' }),
        fpShowDutiesAndResponsibilities: fields.checkbox({ label: 'Full Page · Duties and Responsibilities' }),
        fpShowSelectedProgrammeAchievements: fields.checkbox({ label: 'Full Page · Selected Programme Achievements' }),
        fpShowDetail: fields.checkbox({ label: 'Full Page · Other text' }),
        fpShowGallery: fields.checkbox({ label: 'Full Page · Gallery' }),
        showOnJourney: fields.checkbox({ label: 'Show on Journey timeline' }),
        month: fields.select({ label: 'Month (used when several Journey items share a year)', options: MONTHS, defaultValue: '' }),
        elevation: fields.text({ label: 'Elevation (blank = auto)', description: 'Leave blank to place automatically by date' }),
        journeyIcon: fields.text({ label: 'Journey Icon (emoji)' }),
        districts: fields.array(fields.text({ label: 'District' }), { label: 'Districts (Nepal map)', itemLabel: props => props.value || 'District' }),
        order: fields.integer({ label: 'Order' }),
        hybridSyncLabel: fields.text({ label: 'Hybrid Sync Label (internal)' }),
        popupVisLabel: fields.text({ label: 'Popup Visibility Label (internal)' }),
        fullpageVisLabel: fields.text({ label: 'Fullpage Visibility Label (internal)' }),
        body: fields.document({ label: 'Details', description: 'Start each part with a bold heading on its own line, e.g. Project, Duties and Responsibilities, Selected Programme Achievements. Each heading becomes its own section on the site that you can show or hide with the checkboxes.', formatting: true, links: true, tables: true }),
      },
    }),
    
    projects: collection({
      label: '📁 Projects',
      slugField: 'title',
      path: 'content/projects/*',
      format: { contentField: 'body' },
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        shortDesc: fields.text({ label: 'Short Description', multiline: true }),
        year: fields.text({ label: 'Year' }),
        status: fields.text({ label: 'Status' }),
        organisation: fields.text({ label: 'Organisation' }),
        category: fields.select({ label: 'Category', options: [{ label: 'Research', value: 'research' }, { label: 'Community', value: 'community' }], defaultValue: 'research' }),
        gallery: fields.array(
          fields.object({
            src: fields.image({ label: 'Image', ...IMG }),
            caption: fields.text({ label: 'Caption' }),
          }),
          { label: 'Gallery', itemLabel: props => props.fields.caption.value || 'Image' }
        ),
        report: fields.object({
          file: fields.text({ label: 'Report File Path' }),
          label: fields.text({ label: 'Report Label' }),
        }),
        displayMode: fields.select({ label: 'Display Mode', options: DISPLAY_MODE, defaultValue: 'popup' }),
        popupVisLabel: fields.text({ label: 'Popup Visibility Label' }),
        showGallery: fields.checkbox({ label: 'Show Gallery' }),
        showDetail: fields.checkbox({ label: 'Show Detail' }),
        showVideo: fields.checkbox({ label: 'Show Video' }),
        showReport: fields.checkbox({ label: 'Show Report' }),
        showRelatedPubs: fields.checkbox({ label: 'Show Related Pubs' }),
        fullpageVisLabel: fields.text({ label: 'Fullpage Visibility Label' }),
        fpShowGallery: fields.checkbox({ label: 'FP Show Gallery' }),
        fpShowDetail: fields.checkbox({ label: 'FP Show Detail' }),
        fpShowVideo: fields.checkbox({ label: 'FP Show Video' }),
        fpShowReport: fields.checkbox({ label: 'FP Show Report' }),
        fpShowRelatedPubs: fields.checkbox({ label: 'FP Show Related Pubs' }),
        tags: fields.array(fields.text({ label: 'Tag' }), { label: 'Tags', itemLabel: props => props.value || 'Tag' }),
        image: fields.image({ label: 'Image', ...IMG }),
        videoUrl: fields.text({ label: 'Video URL' }),
        relatedPubs: fields.array(fields.text({ label: 'Publication' }), { label: 'Related Publications', itemLabel: props => props.value || 'Publication' }),
        link: fields.text({ label: 'Link' }),
        fpShowShortDesc: fields.checkbox({ label: 'FP Show Short Desc' }),
        showOnJourney: fields.checkbox({ label: 'Show on Journey timeline' }),
        month: fields.select({ label: 'Month (used when several Journey items share a year)', options: MONTHS, defaultValue: '' }),
        elevation: fields.text({ label: 'Elevation (blank = auto)', description: 'Leave blank to place automatically by date' }),
        journeyIcon: fields.text({ label: 'Journey Icon (emoji)' }),
        districts: fields.array(fields.text({ label: 'District' }), { label: 'Districts (Nepal map)', itemLabel: props => props.value || 'District' }),
        hybridSyncLabel: fields.text({ label: 'Hybrid Sync Label (internal)' }),
        order: fields.integer({ label: 'Order' }),
        body: fields.document({ label: 'Full Project Detail', formatting: true, links: true, tables: true }),
      },
    }),
    
    publications: collection({
      label: '📚 Publications',
      slugField: 'title',
      path: 'content/publications/*',
      format: { contentField: 'body' },
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        authors: fields.text({ label: 'Authors' }),
        year: fields.text({ label: 'Year' }),
        category: fields.text({ label: 'Category' }),
        linkType: fields.select({ label: 'Link Type', options: [{ label: '↗ DOI (Research Article / Book Chapter)', value: 'doi' }, { label: '↗ Link (Feature Article / No DOI)', value: 'link' }], defaultValue: 'doi' }),
        doi: fields.url({ label: 'DOI URL' }),
        abstract: fields.text({ label: 'Abstract', multiline: true }),
        journal: fields.text({ label: 'Journal' }),
        status: fields.text({ label: 'Status' }),
        citations: fields.integer({ label: 'Citations' }),
        gallery: fields.array(
          fields.object({
            src: fields.image({ label: 'Image', ...IMG }),
            caption: fields.text({ label: 'Caption' }),
          }),
          { label: 'Gallery', itemLabel: props => props.fields.caption.value || 'Image' }
        ),
        link: fields.text({ label: 'Link' }),
        image: fields.image({ label: 'Image', ...IMG }),
        displayMode: fields.select({ label: 'Display Mode (Read more)', description: 'No popup = no "Read more" link on the site. Popup = Read more opens a popup. Popup + Full Page = the popup also gets a Full Page button.', options: DISPLAY_MODE_OPTIONAL, defaultValue: 'popup' }),
        showShortDesc: fields.checkbox({ label: 'Popup · Short Description', description: 'Untick to hide it in the popup.', defaultValue: true }),
        showImage: fields.checkbox({ label: 'Popup · Cover Image' }),
        showAbstract: fields.checkbox({ label: 'Popup · Abstract' }),
        showDetail: fields.checkbox({ label: 'Popup · Detail' }),
        showGallery: fields.checkbox({ label: 'Popup · Figures', description: 'The gallery images.' }),
        fpShowShortDesc: fields.checkbox({ label: 'Full Page · Short Description', defaultValue: true }),
        fpShowImage: fields.checkbox({ label: 'Full Page · Cover Image' }),
        fpShowAbstract: fields.checkbox({ label: 'Full Page · Abstract' }),
        fpShowDetail: fields.checkbox({ label: 'Full Page · Detail' }),
        fpShowGallery: fields.checkbox({ label: 'Full Page · Figures', description: 'The gallery images.' }),
        order: fields.integer({ label: 'Order' }),
        popupVisLabel: fields.text({ label: 'Popup Visibility Label' }),
        fullpageVisLabel: fields.text({ label: 'Fullpage Visibility Label' }),
        body: fields.document({ label: 'Detail', formatting: true, links: true }),
      },
    }),
    customItems: collection({
      label: '📝 Custom Section Items',
      slugField: 'title',
      path: 'content/custom/*',
      format: { contentField: 'body' },
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        sectionId: fields.text({ label: 'Section', description: 'Must match a Section ID from Custom Sections exactly (e.g. fieldwork)', validation: { isRequired: true } }),
        organisation: fields.text({ label: 'Organisation / Institution' }),
        location: fields.text({ label: 'Location' }),
        year: fields.text({ label: 'Year / Start Date' }),
        startDate: fields.text({ label: 'Start Date', description: 'e.g. Jan 2022 (for timeline display)' }),
        endDate: fields.text({ label: 'End Date' }),
        current: fields.checkbox({ label: 'Currently Active' }),
        type: fields.text({ label: 'Type / Role Label', description: 'e.g. Lead Researcher, Participant' }),
        shortDesc: fields.text({ label: 'Short Description', multiline: true, description: 'Always shown first in the popup - keep it under 250 words.' }),
        image: fields.image({ label: 'Cover Image', ...IMG }),
        gallery: fields.array(
          fields.object({
            src: fields.image({ label: 'Image', ...IMG }),
            caption: fields.text({ label: 'Caption' }),
          }),
          { label: 'Gallery Images', itemLabel: props => props.fields.caption.value || 'Image' }
        ),
        link: fields.text({ label: 'External Link' }),
        displayMode: fields.select({ label: 'Display Mode', options: [{ label: 'Popup only', value: 'popup' }, { label: 'Popup + Full Page', value: 'fullpage' }], defaultValue: 'popup' }),
        order: fields.integer({ label: 'Sort Order' }),
        body: fields.document({ label: 'Full Detail', formatting: true, links: true, tables: true }),
      },
    }),
  },

  singletons: {
    settings: singleton({
      label: '⚙️ Site Settings',
      path: 'content/settings',
      format: { data: 'json' },
      schema: {
      name: fields.text({ label: 'Full Name', validation: { isRequired: true } }),
      email: fields.text({ label: "Email" }),
      phone: fields.text({ label: "Phone" }),
      location: fields.text({ label: "Location" }),
      photo: fields.image({ label: "Profile Photo", ...IMG }),
      bio: fields.text({ label: "Bio (shown on hero)", multiline: true }),
      taglines: fields.array(fields.text({ label: 'Item' }), { label: "Typing Taglines", itemLabel: props => props.value || 'Item' }),
      aboutResearchObjective: fields.text({ label: "Research Objective", multiline: true }),
      researchInterests: fields.array(fields.text({ label: 'Item' }), { label: "Research Interests", itemLabel: props => props.value || 'Item' }),
      aboutProfessionalObjective: fields.text({ label: "Professional Objective", multiline: true }),
      professionalInterests: fields.array(fields.text({ label: 'Item' }), { label: "Professional Interests", itemLabel: props => props.value || 'Item' }),
      cvAcademic: fields.file({ label: "Academic CV (PDF)", ...IMG }),
      cvProfessional: fields.file({ label: "Professional CV (PDF)", ...IMG }),
      github: fields.text({ label: "GitHub URL" }),
      linkedin: fields.text({ label: "LinkedIn URL" }),
      facebook: fields.text({ label: "Facebook URL" }),
      instagram: fields.text({ label: "Instagram URL" }),
      storygraph: fields.text({ label: "Storygraph URL" }),
      showAbout: fields.checkbox({ label: "Show About Section", defaultValue: true }),
      showProjects: fields.checkbox({ label: "Show Projects Section", defaultValue: true }),
      showPublications: fields.checkbox({ label: "Show Publications Section", defaultValue: true }),
      showExperience: fields.checkbox({ label: "Show Experience Section", defaultValue: true }),
      showTimeline: fields.checkbox({ label: "Show Journey River Section", defaultValue: true }),
      showNepalMap: fields.checkbox({ label: "Show Nepal Map Section", defaultValue: true }),
      showSkills: fields.checkbox({ label: "Show Skills Section", defaultValue: true }),
      journeyLabel: fields.text({ label: "Journey Bar Title", description: "Title shown on the Journey toggle bar.", defaultValue: "Explore My Journey" }),
      journeyHintExpand: fields.text({ label: "Expand Hint Text", defaultValue: "Click to expand" }),
      journeyHintCollapse: fields.text({ label: "Collapse Hint Text", defaultValue: "Click to collapse" }),
      journeyDefaultOpen: fields.checkbox({ label: "Start Journey Expanded by Default", description: "Turn ON if you want the river unfolded as soon as visitors load the page.", defaultValue: false }),
      showJourneyFlowControls: fields.checkbox({ label: "Show Interactive Flow Buttons (Upstream / Downstream)", defaultValue: true }),
      milestones: fields.array(
        fields.object({
          year: fields.text({ label: "Year", description: "e.g. 2024 or 2018–2022", validation: { isRequired: true } }),
          month: fields.select({ label: "Month (optional — used when multiple milestones share the same year)", description: "If two or more milestones have the same Year, selecting a Month orders them Upstream → Downstream and displays the month on the card.", options: [{ label: "None (Year only)", value: "" }, { label: "January", value: "1" }, { label: "February", value: "2" }, { label: "March", value: "3" }, { label: "April", value: "4" }, { label: "May", value: "5" }, { label: "June", value: "6" }, { label: "July", value: "7" }, { label: "August", value: "8" }, { label: "September", value: "9" }, { label: "October", value: "10" }, { label: "November", value: "11" }, { label: "December", value: "12" }], defaultValue: "" }),
          date: fields.text({ label: "Custom Display Date Override (optional)", description: "Leave empty to auto-display Year (or Month + Year when multiple milestones share the same year)." }),
          elevation: fields.integer({ label: 'River Position / Elevation (metres, optional)', description: "Position on the river AND the icon: ≥5750m=🧊Glacier, 4750-5749m=🪨Huge Rock, 3500-4749m=⛰️Landslide, 2250-3499m=🪵Driftwood, 1000-2249m=🌿Riparian Vegetation, 250-999m=🌉River Crossing, <250m=🌊River Mouth." }),
          title: fields.text({ label: "Title" }),
          description: fields.text({ label: "Description", multiline: true, description: "Shown on the card when expanded." }),
          sub: fields.text({ label: "Subtitle / Institution", description: "e.g. Tribhuvan University" }),
          icon: fields.text({ label: "Icon (emoji)", defaultValue: "📌" }),
          type: fields.text({ label: 'Type (internal, leave as is)' }),
        }),
        { label: "Timeline Milestones (Ordered Upstream → Downstream)", description: "Add, edit, delete, or drag to reorder milestones along the river. Milestones are placed from Upstream (headwaters) to Downstream (river mouth).", itemLabel: props => props.fields.title.value || props.fields.year.value || 'Milestone' }
      ),
      scholarUserId: fields.text({ label: "Google Scholar User ID (for automatic weekly citation sync)", description: "From your Google Scholar profile URL: scholar.google.com/citations?user=YOUR_ID" }),
      orcid: fields.text({ label: "ORCID iD (optional — for live OpenAlex citation sync)", description: "e.g. 0000-0002-XXXX-XXXX" }),
      autoSyncCitations: fields.checkbox({ label: "Auto-Update Citations Counter", description: "Automatically updates the Citations counter when live DOI/OpenAlex/Scholar citations exceed the baseline value.", defaultValue: true }),
      stats: fields.array(
        fields.object({
          value: fields.text({ label: "Number (digits only)", description: "e.g. 100" }),
          label: fields.text({ label: "Label", description: "e.g. Districts Visited" }),
          prefix: fields.text({ label: "Prefix (optional)", description: "e.g. $" }),
          suffix: fields.text({ label: "Suffix (optional)", description: "e.g. K+ or +" }),
        }),
        { label: "Stats", description: "Each stat appears as an animated counter. Leave empty to use defaults.", itemLabel: props => props.fields.value.value || 'Item' }
      ),
      sectionOrder: fields.array(
        fields.select({ label: 'Section', options: [{ label: "about", value: "about" }, { label: "timeline", value: "timeline" }, { label: "nepal-map", value: "nepal-map" }, { label: "projects", value: "projects" }, { label: "publications", value: "publications" }, { label: "experience", value: "experience" }, { label: "skills", value: "skills" }, { label: "custom-sections-wrap", value: "custom-sections-wrap" }, { label: "contact", value: "contact" }], defaultValue: 'about' }),
        { label: 'Section Order', description: 'Add sections in the order you want them on the page. Sections you leave out follow in the default order.', itemLabel: props => props.value || 'Section' }
      ),
      customSocials: fields.array(
        fields.object({
      name: fields.text({ label: 'Full Name', validation: { isRequired: true } }),
          url: fields.text({ label: "URL" }),
          icon: fields.text({ label: "Emoji Icon", defaultValue: "🔗" }),
        }),
        { label: "Custom Social Links", itemLabel: props => props.fields.name.value || 'Item' }
      ),
      },
    }),

    skills: singleton({
      label: '🛠️ Skills',
      path: 'content/skills',
      format: { data: 'json' },
      schema: {
        items: fields.array(
          fields.object({
            group: fields.text({ label: 'Group Name' }),
            items: fields.array(fields.text({ label: 'Skill' }), { label: 'Skills', itemLabel: props => props.value || 'Skill' }),
          }),
          { label: 'Skill Groups', itemLabel: props => props.fields.group.value || 'Group' }
        ),
      },
    }),

    map: singleton({
      label: '🗺️ Nepal District Map',
      path: 'content/map',
      format: { data: 'json' },
      schema: {
        districts: fields.array(
          fields.object({
            name: fields.select({ label: 'District Name', options: [{ label: "Achham", value: "ACHHAM" }, { label: "Arghakhanchi", value: "ARGHAKHANCHI" }, { label: "Baglung", value: "BAGLUNG" }, { label: "Baitadi", value: "BAITADI" }, { label: "Bajhang", value: "BAJHANG" }, { label: "Bajura", value: "BAJURA" }, { label: "Banke", value: "BANKE" }, { label: "Bara", value: "BARA" }, { label: "Bardiya", value: "BARDIYA" }, { label: "Bhaktapur", value: "BHAKTAPUR" }, { label: "Bhojpur", value: "BHOJPUR" }, { label: "Chitwan", value: "CHITWAN" }, { label: "Dadeldhura", value: "DADELDHURA" }, { label: "Dailekh", value: "DAILEKH" }, { label: "Dang", value: "DANG" }, { label: "Darchula", value: "DARCHULA" }, { label: "Dhading", value: "DHADING" }, { label: "Dhankuta", value: "DHANKUTA" }, { label: "Dhanusa", value: "DHANUSA" }, { label: "Dolakha", value: "DOLAKHA" }, { label: "Dolpa", value: "DOLPA" }, { label: "Doti", value: "DOTI" }, { label: "Gorkha", value: "GORKHA" }, { label: "Gulmi", value: "GULMI" }, { label: "Humla", value: "HUMLA" }, { label: "Ilam", value: "ILAM" }, { label: "Jajarkot", value: "JAJARKOT" }, { label: "Jhapa", value: "JHAPA" }, { label: "Jumla", value: "JUMLA" }, { label: "Kailali", value: "KAILALI" }, { label: "Kalikot", value: "KALIKOT" }, { label: "Kanchanpur", value: "KANCHANPUR" }, { label: "Kapilbastu", value: "KAPILBASTU" }, { label: "Kaski", value: "KASKI" }, { label: "Kathmandu", value: "KATHMANDU" }, { label: "Kavre", value: "KAVRE" }, { label: "Khotang", value: "KHOTANG" }, { label: "Lalitpur", value: "LALITPUR" }, { label: "Lamjung", value: "LAMJUNG" }, { label: "Mahottari", value: "MAHOTTARI" }, { label: "Makwanpur", value: "MAKWANPUR" }, { label: "Manang", value: "MANANG" }, { label: "Morang", value: "MORANG" }, { label: "Mugu", value: "MUGU" }, { label: "Mustang", value: "MUSTANG" }, { label: "Myagdi", value: "MYAGDI" }, { label: "Nawalparasi", value: "NAWALPARASI" }, { label: "Nuwakot", value: "NUWAKOT" }, { label: "Okhaldhunga", value: "OKHALDHUNGA" }, { label: "Palpa", value: "PALPA" }, { label: "Panchthar", value: "PANCHTHAR" }, { label: "Parbat", value: "PARBAT" }, { label: "Parsa", value: "PARSA" }, { label: "Pyuthan", value: "PYUTHAN" }, { label: "Ramechhap", value: "RAMECHHAP" }, { label: "Rasuwa", value: "RASUWA" }, { label: "Rautahat", value: "RAUTAHAT" }, { label: "Rolpa", value: "ROLPA" }, { label: "Rukum", value: "RUKUM" }, { label: "Rupandehi", value: "RUPANDEHI" }, { label: "Salyan", value: "SALYAN" }, { label: "Sankhuwasabha", value: "SANKHUWASABHA" }, { label: "Saptari", value: "SAPTARI" }, { label: "Sarlahi", value: "SARLAHI" }, { label: "Sindhuli", value: "SINDHULI" }, { label: "Sindhupalchok", value: "SINDHUPALCHOK" }, { label: "Siraha", value: "SIRAHA" }, { label: "Solukhumbu", value: "SOLUKHUMBU" }, { label: "Sunsari", value: "SUNSARI" }, { label: "Surkhet", value: "SURKHET" }, { label: "Syangja", value: "SYANGJA" }, { label: "Tanahu", value: "TANAHU" }, { label: "Taplejung", value: "TAPLEJUNG" }, { label: "Tehrathum", value: "TEHRATHUM" }, { label: "Udayapur", value: "UDAYAPUR" }], defaultValue: 'KATHMANDU' }),
            type: fields.select({ label: 'Activity Type', options: [{ label: 'Research', value: 'research' }, { label: 'Community', value: 'community' }, { label: 'EIA', value: 'eia' }, { label: 'Visited', value: 'visited' }, { label: 'Other', value: 'other' }], defaultValue: 'research' }),
            project: fields.text({ label: 'Project Name' }),
            year: fields.text({ label: 'Year', description: 'e.g. 2023 or 2021–2024' }),
            note: fields.text({ label: 'Note', multiline: true, description: 'Short description shown in the popup' }),
          }),
          { label: 'Districts', itemLabel: props => (props.fields.name.value || 'District') + (props.fields.project.value ? ' — ' + props.fields.project.value : '') }
        ),
      },
    }),

    sections: singleton({
      label: '📂 Custom Sections',
      path: 'content/sections',
      format: { data: 'json' },
      schema: {
        sections: fields.array(
          fields.object({
            id: fields.text({ label: 'Section ID', description: 'No spaces, lowercase, e.g. fieldwork', validation: { isRequired: true } }),
            title: fields.text({ label: 'Section Title (shown on site)' }),
            icon: fields.text({ label: 'Icon (emoji)', defaultValue: '📌' }),
            display: fields.select({ label: 'Display Style', options: [{ label: 'Cards', value: 'cards' }, { label: 'Timeline', value: 'timeline' }], defaultValue: 'cards' }),
            visible: fields.checkbox({ label: 'Visible on Site', defaultValue: true }),
          }),
          { label: 'Custom Sections', itemLabel: props => props.fields.title.value || props.fields.id.value || 'Section' }
        ),
      },
    }),
  },
});
