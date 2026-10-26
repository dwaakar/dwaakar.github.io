import { config, fields, collection } from '@keystatic/core';

export default config({
  storage: {
    kind: 'cloud',
  },
  cloud: {
    project: 'dwaakar/website',
  },
  collections: {
    projects: collection({
      label: '📁 Projects',
      slugField: 'title',
      path: 'content/projects/*',
      format: { contentField: 'body' },
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        shortDesc: fields.text({ label: 'Short Description', multiline: true }),
        year: fields.text({ label: 'Year' }),
        body: fields.document({ label: 'Full Detail', formatting: true, links: true, tables: true }),
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
        body: fields.document({ label: 'Detailed Overview', formatting: true, links: true }),
      },
    }),
    experience: collection({
      label: '💼 Experience',
      slugField: 'title',
      path: 'content/experience/*',
      format: { contentField: 'body' },
      schema: {
        title: fields.slug({ name: { label: 'Job Title / Role' } }),
        organisation: fields.text({ label: 'Organisation' }),
        location: fields.text({ label: 'Location' }),
        startDate: fields.text({ label: 'Start Date' }),
        endDate: fields.text({ label: 'End Date' }),
        body: fields.document({ label: 'Full Detail', formatting: true, links: true }),
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
        body: fields.document({ label: 'Details', formatting: true, links: true }),
      },
    }),
    awards: collection({
      label: '🏆 Awards',
      slugField: 'title',
      path: 'content/awards/*',
      format: { contentField: 'body' },
      schema: {
        title: fields.slug({ name: { label: 'Award Title' } }),
        org: fields.text({ label: 'Organisation' }),
        year: fields.text({ label: 'Year' }),
        order: fields.text({ label: 'Order' }),
        body: fields.document({ label: 'Details', formatting: true, links: true }),
      },
    }),
  },
});
