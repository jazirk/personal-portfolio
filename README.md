# Jasir K — Portfolio

Personal portfolio of Jasir K, Full Stack Engineer — built with **Next.js 16**, **React 19**, **TypeScript** and **Tailwind CSS 4**, deployed on **Vercel**.

**Live:** [jaasi.me](https://jaasi.me)

## Sections

- **Hero** — photo, headline and links, over an ambient animated background (drifting aurora, dot grid, cursor spotlight).
- **About** — headline statement, short career story with a drop cap, and three working principles.
- **Experience** — scroll-linked timeline across Uber, FactSet and Infrrd.ai, plus education and certifications.
- **Projects** — freelance and personal sites (Roush Mobile Phones, Adhruvique Global, jaasi.me).
- **Writing** — latest posts pulled live from Hashnode.
- **Skills** — numbered capabilities index, plus an AI-assisted development note.
- **How I work** — design, build, ship & run.
- **Off the clock** — photography and motovlogging on Instagram.
- **Contact** — email, GitHub, LinkedIn.

## Develop

Requires Node.js 20.9+.

```bash
npm install
npm run dev        # http://localhost:3000
npm run typecheck
npm run build      # production build
npm start          # serve the production build locally
```

## Editing content

Almost everything is data, so updates never touch layout code:

| What | Where |
| --- | --- |
| Intro, story, principles, experience, education, projects, skills, hobbies, process | [`lib/content.ts`](lib/content.ts) |
| Hero illustration / profile photo | `public/jasir-cartoon.webp` (transparent, 768px) / `public/jasir.webp` (square, ~640px) |
| Hashnode blog address & fallback posts | `writing` in [`lib/content.ts`](lib/content.ts) |

**Writing** is fetched from Hashnode ([jasir.hashnode.dev](https://jasir.hashnode.dev)) through its public GraphQL API in [`lib/hashnode.ts`](lib/hashnode.ts). The home page regenerates at most once an hour (ISR), so a newly published post appears without a redeploy. If Hashnode is unreachable, the fallback posts in `content.ts` are shown.

## Project structure

```
app/
  layout.tsx            fonts, metadata, theme colour
  page.tsx              page sections
  globals.css           design tokens, motion, hero background, timeline
components/
  Experience.tsx        experience timeline
  HeroBackground.tsx    aurora + dot grid + cursor spotlight
  Interactions.tsx      scroll reveals, card spotlights, timeline progress
  Icons.tsx             inline SVG icons
lib/
  content.ts            all site copy
  hashnode.ts           Hashnode posts fetcher
public/
  jasir.webp            profile photo
```

## Design notes

- **Editorial design system**: dark "code dark + run green" palette (with a matching light theme), Newsreader serif display with one italic accent phrase per headline, Instrument Sans body and JetBrains Mono labels — all self-hosted via Fontsource. Numbered section labels and an index-style skills list.
- **Motion** after Emil Kowalski: custom ease-out curves, `scale(0.97)` press feedback, short staggered entrances that never start from nothing, hover effects gated to real pointers.
- **Apple HIG on the web**: translucent `backdrop-filter` nav, size-specific tracking and leading, smoothed (critically damped) cursor follow.
- **Performance**: animations use only `transform`/`opacity`, the hero background pauses off-screen, and the photo is a 28 KB WebP.
- **Accessibility**: skip link, visible focus rings, semantic landmarks, 44px+ touch targets, AA contrast in both themes, and full `prefers-reduced-motion` / `prefers-reduced-transparency` support.

## Deploy

Hosted on Vercel, connected to this repo:

1. Import the repo at [vercel.com/new](https://vercel.com/new) — no settings needed.
2. Every push to `main` deploys automatically.
3. Custom domain: Project → Settings → Domains.

Hourly regeneration (ISR) needs a Next.js-aware host such as Vercel or Netlify — not a plain static host.
