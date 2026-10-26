import { config, fields, collection, singleton } from '@keystatic/core';

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
        status: fields.text({ label: 'Status / Role' }),
        organisation: fields.text({ label: 'Organisation' }),
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
        journal: fields.text({ label: 'Journal / Book' }),
        doi: fields.url({ label: 'DOI URL' }),
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
        startDate: fields.text({ label: 'Start Date' }),
        endDate: fields.text({ label: 'End Date' }),
        body: fields.document({ label: 'Full Detail', formatting: true, links: true }),
      },
    }),
  },
  singletons: {
    settings: singleton({
      label: '⚙️ Site Settings',
      path: 'content/settings',
      format: { data: 'json' },
      schema: {
        siteTitle: fields.text({ label: 'Site Title' }),
        authorName: fields.text({ label: 'Author Name' }),
      },
    }),
    skills: singleton({
      label: '⚡ Skills',
      path: 'content/skills',
      format: { data: 'json' },
      schema: {
        skillsList: fields.array(
          fields.text({ label: 'Skill' }),
          { label: 'Skills', itemLabel: props => props.value }
        ),
      },
    }),
  },
});
