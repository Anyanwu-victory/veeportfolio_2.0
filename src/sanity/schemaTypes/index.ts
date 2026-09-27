import { type SchemaTypeDefinition } from 'sanity'

import {
  actionLink,
  contactLink,
  playgroundProject,
  seo,
  siteImage,
  workExperience,
} from './objects'
import {aboutPageType} from './aboutPageType'
import {contactPageType} from './contactPageType'
import {homePageType} from './homePageType'
import {playgroundPageType} from './playgroundPageType'
import {workPageType} from './workPageType'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    seo,
    siteImage,
    actionLink,
    workExperience,
    playgroundProject,
    contactLink,
    homePageType,
    aboutPageType,
    playgroundPageType,
    workPageType,
    contactPageType,
  ],
}
