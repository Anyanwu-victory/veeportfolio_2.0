import {ProjectsIcon} from '@sanity/icons'
import {defineArrayMember, defineField, defineType} from 'sanity'

import {pageGroups, seoField} from './pageFields'

export const workPageType = defineType({
  name: 'workPage',
  title: 'Work',
  type: 'document',
  icon: ProjectsIcon,
  groups: pageGroups,
  fields: [
    defineField({name: 'heading', type: 'string', group: 'content', validation: (rule) => rule.required()}),
    defineField({name: 'introduction', type: 'text', rows: 3, group: 'content', validation: (rule) => rule.required()}),
    defineField({
      name: 'experiences',
      type: 'array',
      group: 'content',
      of: [defineArrayMember({type: 'workExperience'})],
      validation: (rule) => rule.required().min(1),
    }),
    seoField,
  ],
  initialValue: {
    heading: 'Work',
    introduction: 'I did gain a little experience over the past year. The less boring stuff is probably in my playground.',
    experiences: [
      {
        _key: 'frikax',
        _type: 'workExperience',
        company: 'Frikax',
        role: 'Frontend Developer',
        period: "Mar '22 – Aug '22",
        description: 'Worked with talented designers and developers while transforming designs into beautiful portfolio themes. Integrated several features into the web app.',
        tools: ['Next.js', 'Tailwind CSS', 'Git', 'GitHub'],
      },
      {
        _key: 'independent',
        _type: 'workExperience',
        company: 'Independent',
        role: 'Creative Developer',
        period: "May '22 – present",
        description: 'Exploring different approaches to creating amazing websites while collaborating with amazing designers.',
        tools: ['WebGL', 'GLSL', 'Three.js', 'GSAP', 'WAAPI', 'Object-oriented JavaScript'],
      },
    ],
    seo: {
      _type: 'seo',
      title: 'Work — Victory',
      description: "Victory's professional experience as a frontend and independent creative developer.",
    },
  },
  preview: {prepare: () => ({title: 'Work'})},
})
