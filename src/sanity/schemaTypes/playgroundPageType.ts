import {JoystickIcon} from '@sanity/icons'
import {defineArrayMember, defineField, defineType} from 'sanity'

import {pageGroups, seoField, sitePreview} from './pageFields'

const projectSeed = (
  key: string,
  title: string,
  description: string,
  tools: string[],
  url: string,
  previewNames: string[],
) => ({
  _key: key,
  _type: 'playgroundProject',
  title,
  description,
  tools,
  url,
  previews: previewNames.map((name, index) =>
    sitePreview(
      `/assets/playground/${name}.webp`,
      `${title} — preview ${index + 1}`,
      `${key}-preview-${index + 1}`,
    ),
  ),
})

export const playgroundPageType = defineType({
  name: 'playgroundPage',
  title: 'Playground',
  type: 'document',
  icon: JoystickIcon,
  groups: pageGroups,
  fields: [
    defineField({name: 'heading', type: 'string', group: 'content', validation: (rule) => rule.required()}),
    defineField({name: 'introduction', type: 'text', rows: 2, group: 'content', validation: (rule) => rule.required()}),
    defineField({
      name: 'projects',
      type: 'array',
      group: 'content',
      of: [defineArrayMember({type: 'playgroundProject'})],
      validation: (rule) => rule.required().min(1),
    }),
    defineField({name: 'endnote', type: 'text', rows: 2, group: 'content', validation: (rule) => rule.required()}),
    defineField({name: 'callToAction', type: 'actionLink', group: 'content', validation: (rule) => rule.required()}),
    defineField({name: 'colophon', type: 'string', group: 'content', validation: (rule) => rule.required()}),
    seoField,
  ],
  initialValue: {
    heading: 'Playground',
    introduction: 'From blood, sweat and experimentations to beautiful websites',
    projects: [
      projectSeed('vsl', 'VSL Matchup', 'Find love, even in Lagos, Nigeria.', ['Next.js', 'Object-oriented JavaScript'], 'https://vsl.goodie.work/', ['vsl_1', 'vsl_2', 'vsl_3']),
      projectSeed('untitled01', 'Untitled 1', 'A recreation of karinasirqueira.com.', ['HTML', 'CSS', 'JavaScript'], 'https://untitled01.goodie.work/', ['untitled01_1', 'untitled01_2', 'untitled01_3']),
      projectSeed('untitled02', 'Untitled 2', 'Exploring new, fun ways to rate.', ['Rive JS', 'requestAnimationFrame'], 'https://untitled02.goodie.work/', ['untitled02_1', 'untitled02_2', 'untitled02_3']),
      projectSeed('howdy', 'Howdy', 'An instant messaging web app.', ['Vue', 'Express', 'GSAP', 'TypeScript'], 'https://howdy.goodie.work/', ['howdy_1', 'howdy_2', 'howdy_3']),
      projectSeed('endl', 'Endl', "Exploring React with Kadet's EndSars.", ['React', 'GitHub'], 'https://bhpwt.csb.app/', ['endl_1', 'endl_2', 'endl_3']),
    ],
    endnote: 'Always room for one more idea.',
    callToAction: {_type: 'actionLink', label: "Let's make something", href: '/contact'},
    colophon: 'End of this page. Not the experiments.',
    seo: {
      _type: 'seo',
      title: 'Playground — Victory',
      description: 'Experimental websites and playful interaction studies by Victory.',
    },
  },
  preview: {prepare: () => ({title: 'Playground'})},
})
