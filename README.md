# Vee Portfolio 2.0

A modern personal portfolio and creative studio website built with Next.js. The project presents a portfolio brand with animated sections for work experience, an about page, a playground gallery, and contact information.

## Overview

This app is a custom portfolio experience designed for:

- showcasing professional work and experience
- presenting a creative identity and personal brand
- highlighting experimental projects in a gallery format
- using motion-heavy interactions and immersive UI transitions
- supporting a clean, editorial-style layout with responsive design

The site is structured around a multi-page experience using the App Router and custom layout components.

## Tech Stack

### Frontend

- Next.js 16.2.9
- React 19.2.4
- TypeScript 5
- App Router architecture

### Styling and UI

- CSS Modules for component-specific styling
- Global CSS and custom design tokens
- Tailwind CSS v4 (installed and configured for the project)
- Custom typography using `next/font/google`

### Motion and Interaction

- GSAP
- @gsap/react
- Framer Motion
- Custom scroll and hover animations

### Content / CMS

- Sanity client
- next-sanity
- @sanity/image-url

### Tooling

- ESLint
- TypeScript compiler
- PostCSS
- Sass

## Main Languages

- TypeScript for application logic and component structure
- CSS for custom styling and component visuals
- JSX / TSX for page and component composition

## Project Structure

```bash
src/
  app/
    _components/
    about/
    contact/
    playground/
    playground-journal/
    work/
  components/
    layout/
    navigation/
    ui/
  context/
  lib/
  types/
public/
  assets/
```

### Key app sections

- Home landing page
- Work page with animated experience cards
- About page
- Playground page with project gallery
- Contact page
- Playground journal / editorial section

## Core Features

- Responsive portfolio layout across mobile, tablet, and desktop
- Animated entrance and hover transitions using GSAP
- Custom navigation system and mobile menu
- Intro gate / landing experience
- Scroll-driven interactive components
- Project showcase cards with previews and links
- CMS-ready structure for Sanity-powered content

## Getting Started

Install dependencies:

```bash
pnpm install
```

Run the development server:

```bash
pnpm dev
```

Open http://localhost:3000 to view the app in the browser.

## Production Build

```bash
pnpm build
pnpm start
```

## Linting

```bash
pnpm lint
```

## Environment Variables

If the project is connected to Sanity, add your environment variables in a `.env.local` file, for example:

```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=
your_project_id
NEXT_PUBLIC_SANITY_DATASET=
your_dataset
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
```

You may also need additional Sanity tokens depending on your content setup.

## Notes

This project is designed as a personal portfolio brand site with a strong visual identity, motion-driven UX, and modular sections. It combines storytelling, experimental UI, and a polished creative developer aesthetic.

## Recommended Next Steps

- connect real portfolio content and project data
- wire up Sanity schemas and content queries
- customize metadata and social sharing details
- replace placeholder text and final project links
- deploy to Vercel or another hosting provider

## License

This project is currently configured for local development and portfolio use. Add a license if you plan to open-source or distribute it publicly.
