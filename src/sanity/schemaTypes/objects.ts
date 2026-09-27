import {ImageIcon, LinkIcon} from '@sanity/icons'
import {defineArrayMember, defineField, defineType} from 'sanity'

export const seo = defineType({
  name: 'seo',
  title: 'Search and social',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Page title',
      type: 'string',
      validation: (rule) => rule.max(60).warning('Search results may truncate titles over 60 characters.'),
    }),
    defineField({
      name: 'description',
      type: 'text',
      rows: 3,
      validation: (rule) => rule.max(160).warning('Search results may truncate descriptions over 160 characters.'),
    }),
    defineField({
      name: 'shareImage',
      title: 'Social share image',
      type: 'image',
      options: {hotspot: true},
      fields: [
        defineField({
          name: 'alt',
          title: 'Alternative text',
          type: 'string',
          validation: (rule) => rule.required(),
        }),
      ],
    }),
  ],
})

export const siteImage = defineType({
  name: 'siteImage',
  title: 'Image',
  type: 'object',
  icon: ImageIcon,
  fields: [
    defineField({
      name: 'source',
      type: 'string',
      options: {
        layout: 'radio',
        list: [
          {title: 'Sanity image', value: 'sanity'},
          {title: 'Existing site asset', value: 'site'},
        ],
      },
      initialValue: 'sanity',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'image',
      type: 'image',
      options: {hotspot: true},
      hidden: ({parent}) => parent?.source !== 'sanity',
      validation: (rule) =>
        rule.custom((value, context) => {
          const parent = context.parent as {source?: string} | undefined
          return parent?.source !== 'sanity' || value ? true : 'Choose an image.'
        }),
    }),
    defineField({
      name: 'path',
      title: 'Site asset path',
      description: 'A root-relative file path from the public folder, such as /assets/image.png.',
      type: 'string',
      hidden: ({parent}) => parent?.source !== 'site',
      validation: (rule) =>
        rule.custom((value, context) => {
          const parent = context.parent as {source?: string} | undefined
          if (parent?.source !== 'site') return true
          return typeof value === 'string' && value.startsWith('/')
            ? true
            : 'Enter a root-relative path beginning with /.'
        }),
    }),
    defineField({
      name: 'alt',
      title: 'Alternative text',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {title: 'alt', media: 'image'},
  },
})

export const actionLink = defineType({
  name: 'actionLink',
  title: 'Link',
  type: 'object',
  icon: LinkIcon,
  fields: [
    defineField({
      name: 'label',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'href',
      title: 'Destination',
      description: 'Use a root-relative path for this site, or a full https/mailto URL.',
      type: 'string',
      validation: (rule) =>
        rule.required().custom((value) => {
          if (!value) return true
          return /^(\/|https:\/\/|mailto:)/.test(value)
            ? true
            : 'Use a path beginning with /, an https URL, or a mailto URL.'
        }),
    }),
  ],
  preview: {
    select: {title: 'label', subtitle: 'href'},
  },
})

export const workExperience = defineType({
  name: 'workExperience',
  title: 'Work experience',
  type: 'object',
  fields: [
    defineField({name: 'company', type: 'string', validation: (rule) => rule.required()}),
    defineField({name: 'role', type: 'string', validation: (rule) => rule.required()}),
    defineField({
      name: 'period',
      title: 'Display period',
      description: "For example: Mar '22 – Aug '22",
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      type: 'text',
      rows: 4,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'tools',
      type: 'array',
      of: [defineArrayMember({type: 'string'})],
      validation: (rule) => rule.required().min(1).unique(),
    }),
  ],
  preview: {
    select: {title: 'company', subtitle: 'role'},
  },
})

export const playgroundProject = defineType({
  name: 'playgroundProject',
  title: 'Playground project',
  type: 'object',
  fields: [
    defineField({name: 'title', type: 'string', validation: (rule) => rule.required()}),
    defineField({name: 'description', type: 'text', rows: 2, validation: (rule) => rule.required()}),
    defineField({
      name: 'tools',
      type: 'array',
      of: [defineArrayMember({type: 'string'})],
      validation: (rule) => rule.required().min(1).unique(),
    }),
    defineField({
      name: 'url',
      title: 'Live project URL',
      type: 'url',
      validation: (rule) => rule.required().uri({scheme: ['http', 'https']}),
    }),
    defineField({
      name: 'previews',
      type: 'array',
      of: [defineArrayMember({type: 'siteImage'})],
      validation: (rule) => rule.required().min(1),
    }),
  ],
  preview: {
    select: {title: 'title', subtitle: 'description', media: 'previews.0.image'},
  },
})

export const contactLink = defineType({
  name: 'contactLink',
  title: 'Contact link',
  type: 'object',
  icon: LinkIcon,
  fields: [
    defineField({name: 'label', type: 'string', validation: (rule) => rule.required()}),
    defineField({name: 'displayValue', title: 'Display value', type: 'string', validation: (rule) => rule.required()}),
    defineField({
      name: 'href',
      title: 'Destination',
      type: 'string',
      validation: (rule) =>
        rule.required().custom((value) =>
          !value || /^(https:\/\/|mailto:)/.test(value)
            ? true
            : 'Use an https URL or a mailto URL.',
        ),
    }),
  ],
  preview: {
    select: {title: 'label', subtitle: 'displayValue'},
  },
})
