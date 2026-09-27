import {HomeIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

import {pageGroups, seoField} from './pageFields'

export const homePageType = defineType({
  name: 'homePage',
  title: 'Home',
  type: 'document',
  icon: HomeIcon,
  groups: pageGroups,
  fields: [
    defineField({name: 'heading', type: 'string', group: 'content', validation: (rule) => rule.required()}),
    defineField({name: 'role', type: 'string', group: 'content', validation: (rule) => rule.required()}),
    defineField({name: 'introduction', type: 'text', rows: 3, group: 'content', validation: (rule) => rule.required()}),
    defineField({name: 'artwork', type: 'siteImage', group: 'content', validation: (rule) => rule.required()}),
    seoField,
  ],
  initialValue: {
    heading: 'Victory',
    role: 'Frontend Developer from Nigeria.',
    introduction: 'Passionate about motion, interactivity, 3D, and utilizing them for building immersive, memorable web experiences.',
    artwork: {
      _type: 'siteImage',
      source: 'site',
      path: '/assets/Hero-reveal.png',
      alt: 'Illustration of Victory relaxing on a couch with a laptop and a floor lamp',
    },
    seo: {
      _type: 'seo',
      title: 'Victory — Frontend Developer',
      description: 'Frontend developer from Nigeria creating immersive, memorable web experiences with motion, interactivity, and 3D.',
    },
  },
  preview: {prepare: () => ({title: 'Home'})},
})
