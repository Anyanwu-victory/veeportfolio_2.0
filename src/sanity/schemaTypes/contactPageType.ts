import { EnvelopeIcon } from '@sanity/icons'
import { defineArrayMember, defineField, defineType } from 'sanity'

import { pageGroups, seoField } from './pageFields'

export const contactPageType = defineType({
  name: 'contactPage',
  title: 'Contact',
  type: 'document',
  icon: EnvelopeIcon,
  groups: pageGroups,
  fields: [
    defineField({ name: 'heading', type: 'string', group: 'content', validation: (rule) => rule.required() }),
    defineField({
      name: 'links',
      type: 'array',
      group: 'content',
      of: [defineArrayMember({ type: 'contactLink' })],
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: 'animationPath',
      title: 'Animation asset path',
      type: 'string',
      group: 'content',
      validation: (rule) => rule.required().regex(/^\//, { name: 'root-relative path' }),
    }),
    defineField({ name: 'animationAlt', title: 'Animation alternative text', type: 'string', group: 'content', validation: (rule) => rule.required() }),
    defineField({ name: 'builtBy', type: 'string', group: 'content', validation: (rule) => rule.required() }),
    defineField({
      name: 'typefaces',
      type: 'array',
      group: 'content',
      of: [defineArrayMember({ type: 'string' })],
      validation: (rule) => rule.required().min(1).unique(),
    }),
    seoField,
  ],
  initialValue: {
    heading: "Got an idea? Let's talk",
    links: [
      { _key: 'github', _type: 'contactLink', label: 'GitHub', displayValue: '/Anyanwu-victory', href: 'https://github.com/Anyanwu-victory' },
      { _key: 'gmail', _type: 'contactLink', label: 'Gmail', displayValue: 'victanyanwu306', href: 'mailto:victanyanwu306@gmail.com' },
      { _key: 'resume', _type: 'contactLink', label: 'Resume', displayValue: '/Victory', href: 'https://github.com/Anyanwu-victory' },
      { _key: 'linkedin', _type: 'contactLink', label: 'LinkedIn', displayValue: '/victory-anyanwu', href: 'https://linkedin.com/in/victory-anyanwu' },
    ],
    animationPath: '/assets/animations/Figure_Message_sent.json',
    animationAlt: 'An animated envelope ready for a message',
    builtBy: 'Vicky',
    typefaces: ['Clash Display', 'Manuscribe'],
    seo: {
      _type: 'seo',
      title: 'Contact Victory',
      description: 'Get in touch with Victory about frontend development, creative development, and interactive web experiences.',
    },
  },
  preview: { prepare: () => ({ title: 'Contact' }) },
})
