// All portfolio copy lives here, so updating the site never means touching layout code.

export const profile = {
  name: 'Jasir K',
  role: 'Frontend Engineer',
  location: 'Bengaluru, India',
  email: 'dev.jasirk@gmail.com',
  github: 'https://github.com/jazirk',
  status: 'Open to senior frontend & full-stack roles',
  headline: 'I build interfaces that hold up at scale.',
  intro:
    '6+ years shipping React and TypeScript products. Most recently at Uber, where I built the tools 30,000+ support agents work in every day, and led the frontend of a platform that lets drivers earn between trips.',
}

export type Highlight = {
  title: string
  tag: string
  body: string
  metric?: { value: string; label: string }
}

export const experience = {
  company: 'Uber',
  role: 'Software Engineer II, Frontend',
  period: '2023 – 2026',
  location: 'Bengaluru',
  highlights: [
    {
      title: 'Project Moonshot',
      tag: 'Frontend Lead',
      body: 'Led the frontend across five cross-functional teams to launch a platform where thousands of Uber earners complete AI data-labelling and field tasks during non-driving hours — a new income stream for drivers.',
      metric: { value: '5', label: 'teams aligned' },
    },
    {
      title: 'Bliss 2.0 — Phone channel',
      tag: 'Customer support platform',
      body: 'Co-owned the phone channel of Uber’s next-gen support platform, used across phone, email, chat and in-person support. Built the Genesys telephony integration and set up observability for BPO operations.',
      metric: { value: '30k+', label: 'agents on platform' },
    },
    {
      title: 'Greenlight migration',
      tag: 'Legacy modernisation',
      body: 'Migrated the interface Uber’s in-person support agents use from a legacy stack to a modern one.',
      metric: { value: '~30%', label: 'less maintenance' },
    },
    {
      title: 'Live document capture',
      tag: 'Driver onboarding · UK & Poland',
      body: 'Built an in-house iPad capture flow — QR-code handoff, in-page camera capture and multi-page stitching — for markets that require live photos for identity checks. It replaced a deprecated third-party service.',
      metric: { value: '$4.5k', label: 'yearly infra cost removed' },
    },
  ] satisfies Highlight[],
}

export type Project = {
  name: string
  url: string
  kind: string
  body: string
  tags: string[]
}

export const projects: Project[] = [
  {
    name: 'Sukha Massage Therapy',
    url: 'https://sukhatherapy.in',
    kind: 'Local business website',
    body: 'Booking-focused site for a Bengaluru home-visit practice: local SEO, LocalBusiness and FAQ structured data, custom botanical SVG illustrations and one-tap WhatsApp booking.',
    tags: ['SEO', 'Schema.org', 'SVG', 'Vercel'],
  },
  {
    name: 'Adhruvique Global',
    url: 'https://adhruviqueglobal.com',
    kind: 'Company landing page',
    body: 'Landing page for the business, built with Next.js and designed to load fast on any device.',
    tags: ['Next.js', 'React', 'Responsive'],
  },
  {
    name: 'jaasi.me',
    url: 'https://jaasi.me',
    kind: 'Personal site',
    body: 'My personal site, built with Next.js.',
    tags: ['Next.js', 'React'],
  },
]

export const skills: { group: string; items: string[] }[] = [
  {
    group: 'Languages',
    items: ['TypeScript', 'JavaScript (ES2024+)', 'HTML', 'CSS'],
  },
  {
    group: 'Frameworks',
    items: ['React', 'Next.js', 'Tailwind CSS'],
  },
  {
    group: 'Interface craft',
    items: [
      'Design systems',
      'Motion & interaction design',
      'Accessibility (WCAG)',
      'Responsive layout',
      'Web performance',
    ],
  },
  {
    group: 'Platform',
    items: [
      'Large-scale legacy migrations',
      'Telephony integration (Genesys)',
      'Camera & media APIs',
      'Frontend observability',
    ],
  },
  {
    group: 'Ways of working',
    items: [
      'Cross-team technical leadership',
      'AI-assisted engineering',
      'Code review',
      'SEO & structured data',
    ],
  },
]
