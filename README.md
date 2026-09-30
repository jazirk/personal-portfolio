# Jasir K — Portfolio

Personal portfolio built with **Next.js 16**, **React 19**, **TypeScript** and **Tailwind CSS 4**, exported as a fully static site.

## Develop

```bash
npm install
npm run dev        # http://localhost:3000
npm run build
npm start          # serve the production build
npm run typecheck
```

## Editing content

All copy (intro, experience, projects, skills, contact) lives in [`lib/content.ts`](lib/content.ts). Layout code never needs to change to update the site.

**Writing** is pulled live from Hashnode ([jasir.hashnode.dev](https://jasir.hashnode.dev)) via its public GraphQL API in [`lib/hashnode.ts`](lib/hashnode.ts). The home page regenerates at most once an hour, so a newly published post appears automatically. If the API is unreachable, the fallback posts in `content.ts` are shown.

## Design notes

- **Design system** from UI/UX Pro Max: dark-first "code dark + run green" palette, IBM Plex Sans + JetBrains Mono (self-hosted via Fontsource), with a light theme that follows the OS.
- **Motion** after Emil Kowalski: custom ease-out curves, `scale(0.97)` press feedback, short staggered entrances that never start from nothing, hover effects gated to real pointers, full `prefers-reduced-motion` support.
- **Apple HIG on the web**: translucent `backdrop-filter` nav with content scrolling beneath, size-specific tracking and leading, `prefers-reduced-transparency` fallback.
- Accessible by default: skip link, visible focus rings, semantic landmarks, 44px+ touch targets, AA contrast in both themes.

## Deploy

Import the repo in Vercel (zero config). Hourly regeneration (ISR) needs a Next.js-aware host such as Vercel or Netlify, not a plain static host.
