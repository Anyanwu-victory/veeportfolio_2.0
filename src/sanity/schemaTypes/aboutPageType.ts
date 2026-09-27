import { UserIcon } from '@sanity/icons'
import { defineArrayMember, defineField, defineType } from 'sanity'

import { pageGroups, seoField } from './pageFields'

export const aboutPageType = defineType({
  name: 'aboutPage',
  title: 'About',
  type: 'document',
  icon: UserIcon,
  groups: pageGroups,
  fields: [
    defineField({ name: 'introduction', type: 'text', rows: 4, group: 'content', validation: (rule) => rule.required() }),
    defineField({
      name: 'statement',
      title: 'Creative statement',
      type: 'array',
      group: 'content',
      of: [defineArrayMember({ type: 'block', styles: [{ title: 'Normal', value: 'normal' }], lists: [] })],
      validation: (rule) => rule.required().min(1),
    }),
    defineField({ name: 'artwork', type: 'siteImage', group: 'content', validation: (rule) => rule.required() }),
    defineField({ name: 'artworkCaption', type: 'text', rows: 2, group: 'content', validation: (rule) => rule.required() }),
    seoField,
  ],
  initialValue: {
    introduction: "In the game for over 6 years, I'm currently based in Ho Chi Minh City, working as an independent designer since July 2022.",
    statement: [
      {
        _key: 'creative-statement',
        _type: 'block',
        style: 'normal',
        markDefs: [],
        children: [
          { _key: 'statement-1', _type: 'span', text: 'Enthusiastic about crafting ', marks: [] },
          { _key: 'statement-2', _type: 'span', text: 'ideas, visual elements, motion', marks: ['em'] },
          { _key: 'statement-3', _type: 'span', text: ' and ', marks: [] },
          { _key: 'statement-4', _type: 'span', text: 'typography', marks: ['em'] },
          { _key: 'statement-5', _type: 'span', text: ' into memorable creations.', marks: [] },
        ],
      },
    ],
    artwork: {
      _type: 'siteImage',
      source: 'site',
      path: '/assets/images/Image-reveal-1.png',
      alt: "Illustration of Victory floating with a laptop, a sleeping cat, a coffee mug reading 'Good Code Better Coffee,' and a trailing plant",
    },
    artworkCaption: 'This is me, doing my daily things',
    seo: {
      _type: 'seo',
      title: 'About Victory',
      description: 'Learn about Victory, an independent creative developer crafting ideas, motion, typography, and visual elements into memorable experiences.',
    },
  },
  preview: { prepare: () => ({ title: 'About' }) },
})
