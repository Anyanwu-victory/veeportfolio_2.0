import {defineField} from 'sanity'

export const seoField = defineField({
  name: 'seo',
  title: 'Search and social',
  type: 'seo',
  group: 'seo',
})

export const pageGroups = [
  {name: 'content', title: 'Content', default: true},
  {name: 'seo', title: 'SEO'},
]

export const sitePreview = (path: string, alt: string, key: string) => ({
  _key: key,
  _type: 'siteImage',
  source: 'site',
  path,
  alt,
})
