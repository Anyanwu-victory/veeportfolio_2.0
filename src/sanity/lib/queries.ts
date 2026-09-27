import {defineQuery} from 'next-sanity'

const siteImageProjection = /* groq */ `
  source,
  path,
  alt,
  image {
    asset->{
      _id,
      url,
      metadata {
        dimensions {width, height, aspectRatio}
      }
    },
    crop,
    hotspot
  }
`

const seoProjection = /* groq */ `
  title,
  description,
  shareImage {
    alt,
    asset->{_id, url}
  }
`

export const homePageQuery = defineQuery(/* groq */ `
  *[_id == "homePage"][0] {
    _id,
    heading,
    role,
    introduction,
    artwork {${siteImageProjection}},
    seo {${seoProjection}}
  }
`)

export const aboutPageQuery = defineQuery(/* groq */ `
  *[_id == "aboutPage"][0] {
    _id,
    introduction,
    statement[]{...},
    artwork {${siteImageProjection}},
    artworkCaption,
    seo {${seoProjection}}
  }
`)

export const playgroundPageQuery = defineQuery(/* groq */ `
  *[_id == "playgroundPage"][0] {
    _id,
    heading,
    introduction,
    projects[] {
      _key,
      title,
      description,
      tools,
      url,
      previews[] {
        _key,
        ${siteImageProjection}
      }
    },
    endnote,
    callToAction {label, href},
    colophon,
    seo {${seoProjection}}
  }
`)

export const workPageQuery = defineQuery(/* groq */ `
  *[_id == "workPage"][0] {
    _id,
    heading,
    introduction,
    experiences[] {
      _key,
      company,
      role,
      period,
      description,
      tools
    },
    seo {${seoProjection}}
  }
`)

export const contactPageQuery = defineQuery(/* groq */ `
  *[_id == "contactPage"][0] {
    _id,
    heading,
    links[] {
      _key,
      label,
      displayValue,
      href
    },
    animationPath,
    animationAlt,
    builtBy,
    typefaces,
    seo {${seoProjection}}
  }
`)

export type PlaygroundPreview = {
  _key: string
  source: 'sanity' | 'site'
  path?: string
  alt: string
  image?: {
    asset?: {
      _id: string
      url: string
      metadata?: {
        dimensions?: {
          width?: number
          height?: number
          aspectRatio?: number
        }
      }
    }
    crop?: Record<string, number>
    hotspot?: Record<string, number>
  }
}

export type PlaygroundPageData = {
  _id: string
  heading: string
  introduction: string
  projects: Array<{
    _key: string
    title: string
    description: string
    tools: string[]
    url: string
    previews: PlaygroundPreview[]
  }>
  endnote: string
  callToAction: {
    label: string
    href: string
  }
  colophon: string
}
