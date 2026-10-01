// All portfolio copy lives here, so updating the site never means touching layout code.

export const profile = {
  name: 'Jasir K',
  role: 'Full Stack Engineer',
  location: 'Bengaluru, India',
  email: 'dev.jasirk@gmail.com',
  github: 'https://github.com/jazirk',
  linkedin: 'https://www.linkedin.com/in/jazirk',
  photo: '/jasir.webp',
  avatar: '/jasir-cartoon.webp',
  status: 'Open to senior frontend & full-stack roles',
  headline: { before: 'I build the interfaces people rely on ', accent: 'every day.', after: '' },
  intro:
    'Full stack engineer with 6+ years at Uber, FactSet and Infrrd.ai. I take products end to end — React and Next.js up front, Node.js, Go, GraphQL and PostgreSQL behind — and most recently built tools that 30,000+ Uber support agents rely on every day.',
}

export type Metric = { value: string; label: string }

export type Highlight = {
  title: string
  tag: string
  body: string
  metric?: Metric
}

export type Job = {
  company: string
  role: string
  period: string
  location: string
  summary: string
  stats?: Metric[]
  highlights?: Highlight[]
  points?: string[]
  metric?: Metric
  tech: string[]
}

export const jobs: Job[] = [
  {
    company: 'Uber',
    role: 'Software Engineer 2',
    period: 'Jan 2023 – Present',
    location: 'Bengaluru',
    summary:
      'Frontend for Uber’s next-gen customer support platform — used across phone, email, chat, messaging and in-person support. I drive sprint planning and phased rollouts with Product and Engineering, and I’m an active production on-call responder.',
    stats: [
      { value: '370+', label: 'production changes shipped' },
      { value: '25+', label: 'technical design docs' },
      { value: '100+', label: 'staged feature-flag rollouts' },
      { value: '30k+', label: 'agents on the platform' },
    ],
    highlights: [
      {
        title: 'iPad Document Capture',
        tag: 'Driver onboarding · UK & Poland',
        body: 'Designed and built a live document and photo capture flow — QR-code handoff, in-page camera capture and multi-page image stitching — for markets that require live photos for identity checks. It replaced a deprecated third-party service and eliminated its yearly infra cost.',
        metric: { value: '400k+', label: 'uploads per quarter' },
      },
      {
        title: 'Support Platform — Phone Channel',
        tag: 'Co-owner · 2.5+ years',
        body: 'Owned the phone channel end to end: Genesys/PureCloud telephony integration, a WebSocket-based telephony gateway client, observability and alerting dashboards, and an emergency-calling feature for EMEA markets.',
        metric: { value: '8,000+', label: 'phone agents' },
      },
      {
        title: 'In-Person Agent Platform',
        tag: 'Platform migration',
        body: 'Led the Queue Page migration and wider evolution of the tool Uber’s in-person support agents use, writing seven production readiness reviews to guide the transition.',
        metric: { value: '~30%', label: 'less maintenance' },
      },
      {
        title: 'Driver Tasks Platform',
        tag: 'Frontend Lead',
        body: 'Partnered across five teams to launch a platform where thousands of Uber earners complete AI data-labelling and field tasks between trips. Designed the support-side integration and reworked the Task Widget to fit the new trip-to-task model.',
        metric: { value: '5', label: 'teams aligned' },
      },
    ],
    tech: ['React', 'TypeScript', 'GraphQL'],
  },
  {
    company: 'FactSet',
    role: 'Software Engineer 3',
    period: 'Apr 2021 – Jan 2023',
    location: 'Hyderabad',
    summary: 'Financial data and analytics tools for portfolio managers.',
    points: [
      'Designed and built Price Target Alerts, so portfolio managers could take action on their portfolios.',
      'Set up E2E testing with TestCafe and BrowserStack, with release jobs that ran tests against production on a schedule.',
      'Created a shared composable library for user settings and preferences, reused across applications.',
      'Migrated frontend build tooling from Webpack to Vite, cutting development and maintenance effort.',
    ],
    metric: { value: '70%', label: 'fewer application bugs' },
    tech: ['Vue', 'TypeScript', 'Golang', 'PostgreSQL', 'TestCafe', 'Jest', 'Vite'],
  },
  {
    company: 'Infrrd.ai',
    role: 'Software Engineer – Frontend',
    period: 'Oct 2019 – Apr 2021',
    location: 'Bengaluru',
    summary: 'Where I started — building Homegenius, a real estate transaction management platform.',
    points: [
      'Built reusable UI components and directives, and performant frontend experiences for the Homegenius platform.',
    ],
    tech: ['Angular', 'TypeScript', 'JavaScript', 'SASS'],
  },
]

export const education = {
  school: 'VTU, Belgaum',
  degree: 'B.E. in Computer Science',
  period: '2015 – 2019',
  certifications: ['Vue – The Complete Guide (Udemy)', 'Vue.js Forge Hackathon (VueSchool)'],
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
    name: 'Roush Mobile Phones',
    url: 'https://roush.ae',
    kind: 'E-commerce store · UAE',
    body: 'Online store for my UAE electronics business — smartphones, tablets, smartwatches and gaming gear, with Tabby and Tamara instalments, cash on delivery and fast delivery across the UAE.',
    tags: ['E-commerce', 'Payments', 'Rebuild in progress'],
  },
  {
    name: 'Adhruvique Global',
    url: 'https://adhruviqueglobal.com',
    kind: 'Agri export business',
    body: 'Website for an agricultural products export business — presenting the company and its product range to international buyers. Built with Next.js and designed to load fast on any device.',
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

export const skills: { group: string; blurb: string; items: string[] }[] = [
  {
    group: 'Languages',
    blurb: 'The foundations I write every day',
    items: ['JavaScript (ES6+)', 'TypeScript', 'Python', 'SQL', 'HTML5', 'CSS3'],
  },
  {
    group: 'Frontend',
    blurb: 'Building interfaces people rely on',
    items: ['React', 'Next.js', 'Vue', 'Angular', 'Tailwind CSS', 'SASS', 'Frontend architecture'],
  },
  {
    group: 'Backend & APIs',
    blurb: 'Enough of the stack to ship end to end',
    items: ['Node.js', 'Golang', 'GraphQL', 'REST', 'PostgreSQL', 'WebSockets'],
  },
  {
    group: 'Testing & tooling',
    blurb: 'Keeping fast-moving codebases healthy',
    items: ['Jest', 'TestCafe', 'BrowserStack', 'E2E testing', 'Vite', 'Webpack', 'ESLint', 'Git'],
  },
  {
    group: 'Delivery & operations',
    blurb: 'Getting changes to production safely',
    items: [
      'Continuous delivery',
      'Feature-flag rollouts',
      'Observability & alerting',
      'Production on-call',
      'Production readiness reviews',
      'Technical design docs',
      'Code reviews',
    ],
  },
  {
    group: 'AI-assisted development',
    blurb: 'How I ship at the pace of a small engineering team',
    items: [
      'Claude',
      'Claude Skills',
      'Cursor',
      'Prompt engineering',
      'Context documents',
      'AI agent tooling',
      'Rapid prototyping',
    ],
  },
  {
    group: 'Platform & integrations',
    blurb: 'Connecting products to the systems around them',
    items: ['Genesys / PureCloud telephony', 'Camera & media APIs', 'Legacy migrations', 'Shared component libraries'],
  },
  {
    group: 'Interface craft',
    blurb: 'The details that make software feel right',
    items: ['Motion & interaction design', 'Accessibility (WCAG)', 'Responsive layout', 'Web performance', 'SEO & structured data'],
  },
  {
    group: 'Ways of working',
    blurb: 'How I work with teams',
    items: ['Cross-team technical leadership', 'Agile', 'OOP', 'Data structures & algorithms'],
  },
]

export const writing = {
  blog: 'https://jasir.hashnode.dev',
  posts: [
    {
      title: 'Uber SDE 2 Interview Experience',
      url: 'https://jasir.hashnode.dev/uber-sde-2-interview-experience',
      summary: 'My interview experience for Software Engineer II – Frontend at Uber, shared to help anyone preparing for a similar role.',
      readTime: '4 min read',
    },
    {
      title: 'A Toggle Recursive List Menu, Any Levels Deep, with Vue 3',
      url: 'https://jasir.hashnode.dev/creating-a-toggle-recursive-list-menu-with-any-number-of-levels-deep-with-vue-3',
      summary: 'Using recursion and the Composition API to render nested, collapsible lists of any depth.',
      readTime: '3 min read',
    },
  ],
}

export const hobbies = [
  {
    kind: 'photo' as const,
    title: 'Photography',
    body: 'Chasing light and moments, then taking my time over the colour grade in Lightroom.',
    handle: 'the__shutter__stories',
    url: 'https://www.instagram.com/the__shutter__stories/',
  },
  {
    kind: 'moto' as const,
    title: 'Motovlogging',
    body: 'Rides and road stories on my KTM 390 Adventure — shot, cut and narrated myself.',
    handle: 'two__wheel__stories',
    url: 'https://www.instagram.com/two__wheel__stories/',
  },
]

// ── Editorial copy ────────────────────────────────────────────
// Headline parts render as: before + <em>accent</em> + after

export const about = {
  statement: {
    before: 'Most teams hire an engineer who ships fast ',
    accent: 'or',
    after: ' one who sweats the details. I’m both.',
  },
  story: [
    'I started in 2019 at Infrrd.ai, building reusable UI for Homegenius, a real estate transaction platform. It taught me that a good component library is a product in its own right.',
    'At FactSet I moved into financial tooling for portfolio managers, and learned that tests are a feature: the E2E suites I set up cut application bugs by 70%. I also moved our build from Webpack to Vite.',
    'Then Uber. Since 2023 I’ve worked on the support platform 30,000+ agents use every day — co-owning the phone channel, leading the frontend for a new way for drivers to earn between trips, and shipping 370+ production changes along the way.',
  ],
  pillars: [
    {
      title: 'End-to-end ownership',
      body: 'I write the technical design, ship it behind a feature flag, and watch the dashboards after. 25+ design docs and an on-call rotation say I finish what I start.',
    },
    {
      title: 'Interface craft',
      body: 'Motion, accessibility and performance aren’t polish added at the end — they’re part of the build. This site is the proof.',
    },
    {
      title: 'AI-assisted pace',
      body: 'Claude and Cursor are part of how I work every day. I write Claude Skills that automate the tedious parts of engineering, so the hard parts get my full attention.',
    },
  ],
}

export const experienceIntro = {
  range: 'Selected work, 2019 – 2026',
  headline: { before: 'Six years shipping interfaces, ', accent: 'at scale.', after: '' },
  lead: 'From a real estate platform to financial analytics to the support platform behind Uber — owning features from the first design doc to production.',
  metricsLabel: 'From my time at Uber',
}

export const aiNote = {
  quote: {
    before: 'Claude and Cursor are part of my development environment. Specs, context documents and reusable prompt patterns let me move ',
    accent: 'at the pace of a small team.',
    after: '',
  },
  sideLabel: ['Framework', 'agnostic'],
  side: 'React, Vue and Angular — I’ve shipped production code in all three. Components, state and accessibility are the same problems everywhere.',
}

export const process = {
  statement: {
    before: 'You get one engineer who can own a feature end to end — design it, build it, ship it safely and keep it healthy, ',
    accent: 'without the hand-offs.',
    after: '',
  },
  steps: [
    { title: 'Design', body: 'A technical design doc, edge cases and a rollout plan before the first line of code.' },
    { title: 'Build', body: 'Accessible, fast UI with the tests to back it up.' },
    { title: 'Ship & run', body: 'Feature-flagged rollouts, observability and on-call. Same person.' },
  ],
}
