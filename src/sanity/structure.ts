import {EnvelopeIcon, HomeIcon, JoystickIcon, ProjectsIcon, UserIcon} from '@sanity/icons'
import type {StructureResolver} from 'sanity/structure'

const singletonTypes = new Set([
  'homePage',
  'aboutPage',
  'playgroundPage',
  'workPage',
  'contactPage',
])

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Website content')
    .items([
      S.listItem()
        .title('Home')
        .icon(HomeIcon)
        .child(S.document().schemaType('homePage').documentId('homePage').title('Home')),
      S.listItem()
        .title('About')
        .icon(UserIcon)
        .child(S.document().schemaType('aboutPage').documentId('aboutPage').title('About')),
      S.listItem()
        .title('Playground')
        .icon(JoystickIcon)
        .child(
          S.document()
            .schemaType('playgroundPage')
            .documentId('playgroundPage')
            .title('Playground'),
        ),
      S.listItem()
        .title('Work')
        .icon(ProjectsIcon)
        .child(S.document().schemaType('workPage').documentId('workPage').title('Work')),
      S.listItem()
        .title('Contact')
        .icon(EnvelopeIcon)
        .child(
          S.document().schemaType('contactPage').documentId('contactPage').title('Contact'),
        ),
      ...S.documentTypeListItems().filter(
        (listItem) => !singletonTypes.has(listItem.getId() as string),
      ),
    ])
