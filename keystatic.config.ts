import { config, fields, collection } from '@keystatic/core';

export default config({
  storage: {
    kind: 'cloud',
  },
  cloud: {
    project: 'dwaakar/website',
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
        image: fields.text({ label: 'Image URL/Path' }),
        link: fields.url({ label: 'Link' }),
        displayMode: fields.text({ label: 'Display Mode' }),
        popup: fields.text({ label: 'Popup Label' }),
        showCoursework: fields.checkbox({ label: 'Show Coursework' }),
        fpShowCoursework: fields.checkbox({ label: 'Full Page Show Coursework' }),
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
        type: fields.text({ label: 'Type' }),
        shortDesc: fields.text({ label: 'Short Description', multiline: true }),
        gallery: fields.array(
          fields.object({
            src: fields.text({ label: 'Image Source' }),
            caption: fields.text({ label: 'Caption' }),
          }),
          { label: 'Gallery' }
        ),
        displayMode: fields.text({ label: 'Display Mode' }),
        order: fields.integer({ label: 'Order' }),
        body: fields.document({ label: 'Duties and Responsibilities', formatting: true, links: true, tables: true }),
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
        category: fields.text({ label: 'Category' }),
        gallery: fields.array(
          fields.object({
            src: fields.text({ label: 'Image Path (e.g. /images/1.png)' }),
            caption: fields.text({ label: 'Caption' }),
          }),
          { label: 'Gallery', itemLabel: props => props.fields.caption.value || 'Image' }
        ),
        report: fields.object({
          label: fields.text({ label: 'Report Label' }),
        }),
        displayMode: fields.text({ label: 'Display Mode' }),
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
        linkType: fields.text({ label: 'Link Type' }),
        doi: fields.url({ label: 'DOI URL' }),
        abstract: fields.text({ label: 'Abstract', multiline: true }),
        displayMode: fields.text({ label: 'Display Mode' }),
        popupVisLabel: fields.text({ label: 'Popup Visibility Label' }),
        showGallery: fields.checkbox({ label: 'Show Gallery' }),
        showAbstract: fields.checkbox({ label: 'Show Abstract' }),
        showDetail: fields.checkbox({ label: 'Show Detail' }),
        fullpageVisLabel: fields.text({ label: 'Fullpage Visibility Label' }),
        fpShowShortDesc: fields.checkbox({ label: 'FP Show Short Desc' }),
        fpShowGallery: fields.checkbox({ label: 'FP Show Gallery' }),
        fpShowAbstract: fields.checkbox({ label: 'FP Show Abstract' }),
        fpShowDetail: fields.checkbox({ label: 'FP Show Detail' }),
        order: fields.integer({ label: 'Order' }),
        body: fields.document({ label: 'Additional Details', formatting: true, links: true }),
      },
    }),
  },
});
