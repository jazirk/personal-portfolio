import { HeroBackground } from '@/components/HeroBackground'
import { Em } from '@/components/Em'
import { Experience } from '@/components/Experience'
import { Interactions } from '@/components/Interactions'
import { ArrowUpRight, Camera, Github, Instagram, Linkedin, Mail, MapPin, Video } from '@/components/Icons'
import { getPosts } from '@/lib/hashnode'
import { about, aiNote, hobbies, process, profile, projects, skills, writing } from '@/lib/content'

// Rebuild this page in the background at most once an hour (picks up new Hashnode posts)
export const revalidate = 3600

const nav = [
  { href: '#about', label: 'About' },
  { href: '#work', label: 'Experience' },
  { href: '#projects', label: 'Projects' },
  { href: '#skills', label: 'Skills' },
]

export default async function Home() {
  const posts = await getPosts()

  return (
    <>
      <Interactions />

      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-accent focus:px-4 focus:py-2 focus:text-on-accent"
      >
        Skip to content
      </a>

      {/* ── Nav: translucent layer, content scrolls underneath ── */}
      <header className="glass sticky top-0 z-40 border-b border-line">
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-5 sm:px-8">
          <a href="#top" className="press font-mono text-sm font-medium tracking-tight">
            jaasi<span className="text-accent">.</span>me
          </a>
          <nav aria-label="Primary" className="flex items-center gap-1">
            {nav.map((n) => (
              <a
                key={n.href}
                href={n.href}
                className="press hidden rounded-lg px-3 py-2 text-sm text-muted hover:text-fg sm:inline-block"
              >
                {n.label}
              </a>
            ))}
            <a
              href={`mailto:${profile.email}`}
              className="press ml-2 inline-flex min-h-10 items-center gap-2 rounded-[4px] bg-fg px-4 text-sm font-medium text-bg hover:opacity-90"
            >
              <Mail width={16} height={16} />
              Get in touch
            </a>
          </nav>
        </div>
      </header>

      <main id="main" className="mx-auto max-w-5xl px-5 sm:px-8">
        {/* ── Hero ── */}
        <section
          id="top"
          className="relative isolate grid items-center gap-10 pb-20 pt-16 sm:pb-28 sm:pt-24 md:grid-cols-[1fr_auto] md:gap-14"
        >
          <HeroBackground />
          <figure
            className="rise relative w-40 shrink-0 sm:w-48 md:order-last md:w-80"
            style={{ ['--i' as string]: 0 }}
          >
            <div aria-hidden className="absolute inset-4 -z-10 rounded-full bg-accent-soft blur-3xl" />
            <img
              src={profile.avatar}
              alt={`Illustration of ${profile.name} coding on a laptop`}
              width={768}
              height={768}
              fetchPriority="high"
              decoding="async"
              className="aspect-square w-full drop-shadow-2xl"
            />
          </figure>

          <div>
          <p
            className="rise inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3 py-1.5 text-xs text-muted"
            style={{ ['--i' as string]: 1 }}
          >
            <span className="relative flex h-2 w-2">
              <span className="h-2 w-2 rounded-full bg-accent" />
            </span>
            {profile.status}
          </p>

          <p className="eyebrow rise mt-8" style={{ ['--i' as string]: 2 }}>
            <b>{profile.name}</b>
            {profile.role}
          </p>
          <h1 className="display rise mt-4 max-w-3xl" style={{ ['--i' as string]: 2 }}>
            <Em h={profile.headline} />
          </h1>

          <p
            className="lead rise mt-6 max-w-2xl text-lg text-muted sm:text-xl"
            style={{ ['--i' as string]: 3 }}
          >
            {profile.intro}
          </p>

          <div className="rise mt-10 flex flex-wrap items-center gap-3" style={{ ['--i' as string]: 4 }}>
            <a
              href="#work"
              className="press inline-flex min-h-11 items-center gap-2 rounded-[4px] bg-accent px-5 font-medium text-on-accent hover:opacity-90"
            >
              See my work
            </a>
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              className="press inline-flex min-h-11 items-center gap-2 rounded-[4px] border border-line-strong px-5 font-medium hover:bg-surface-2"
            >
              <Github width={16} height={16} />
              GitHub
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
              className="press inline-flex min-h-11 items-center gap-2 rounded-[4px] border border-line-strong px-5 font-medium hover:bg-surface-2"
            >
              <Linkedin width={16} height={16} />
              LinkedIn
            </a>
            <span className="inline-flex items-center gap-1.5 px-2 text-sm text-subtle">
              <MapPin width={15} height={15} />
              {profile.location}
            </span>
          </div>
          </div>
        </section>

        {/* ── 01 About ── */}
        <section id="about" aria-labelledby="about-title" className="border-t border-line py-20 sm:py-28">
          <p data-reveal className="eyebrow">
            <b>01</b>About
          </p>
          <h2 id="about-title" data-reveal className="display mt-8 max-w-4xl text-[clamp(2.2rem,5.4vw,4.25rem)]">
            <Em h={about.statement} />
          </h2>

          <div className="mt-14 grid gap-12 md:grid-cols-[1.15fr_1fr] md:gap-0">
            <div className="space-y-6 text-lg leading-relaxed text-muted md:pr-14">
              <figure data-reveal className="flex items-center gap-4">
                <img
                  src={profile.photo}
                  alt={`Photo of ${profile.name}`}
                  width={640}
                  height={640}
                  loading="lazy"
                  decoding="async"
                  className="h-16 w-16 rounded-md border border-line object-cover"
                />
                <figcaption className="text-sm leading-snug">
                  <span className="block text-fg">{profile.name}, the real one</span>
                  <span className="text-subtle">{profile.location}</span>
                </figcaption>
              </figure>
              {about.story.map((para, i) => (
                <p key={i} data-reveal className={i === 0 ? 'dropcap text-fg' : ''}>
                  {para}
                </p>
              ))}
            </div>
            <ol className="divide-y divide-line md:border-l md:border-line">
              {about.pillars.map((p, i) => (
                <li key={p.title} data-reveal style={{ ['--i' as string]: i }} className="py-6 first:pt-0 md:pl-10 md:first:pt-1">
                  <p className="eyebrow">
                    <b>{String(i + 1).padStart(2, '0')}</b>
                    {p.title}
                  </p>
                  <p className="mt-3 leading-relaxed text-muted">{p.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <Experience />

        {/* ── Projects ── */}
        <section
          id="projects"
          aria-labelledby="projects-title"
          className="border-t border-line py-20 sm:py-28"
        >
          <div data-reveal className="max-w-xl">
            <p className="eyebrow"><b>03</b>Freelance & personal</p>
            <h2 id="projects-title" className="h2 mt-3">
              Sites I’ve designed <span className="em">and shipped</span>
            </h2>
          </div>

          <ul className="mt-12 grid gap-4 md:grid-cols-3">
            {projects.map((p, i) => (
              <li key={p.name} data-reveal style={{ ['--i' as string]: i }}>
                <a
                  href={p.url}
                  target="_blank"
                  rel="noreferrer"
                  className="card press group flex h-full flex-col rounded-md border border-line bg-surface p-6"
                >
                  <div className="flex items-start justify-between gap-4">
                    <p className="eyebrow">{p.kind}</p>
                    <ArrowUpRight className="arrow shrink-0 text-subtle group-hover:text-accent" />
                  </div>
                  <h3 className="serif mt-3 text-[1.6rem] leading-tight tracking-tight">{p.name}</h3>
                  <p className="mt-3 flex-1 text-[0.95rem] leading-relaxed text-muted">{p.body}</p>
                  <ul className="mt-6 flex flex-wrap gap-1.5" aria-label="Built with">
                    {p.tags.map((t) => (
                      <li
                        key={t}
                        className="rounded-md bg-surface-2 px-2 py-1 font-mono text-[0.7rem] text-muted"
                      >
                        {t}
                      </li>
                    ))}
                  </ul>
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              </li>
            ))}
          </ul>
        </section>

        {/* ── Writing (a glimpse; full posts live on Hashnode) ── */}
        <section aria-labelledby="writing-title" className="border-t border-line py-16 sm:py-20">
          <div data-reveal className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="eyebrow"><b>04</b>Writing</p>
              <h2 id="writing-title" className="h2 mt-4">
                Notes from <span className="em">the frontend</span>
              </h2>
            </div>
            <a
              href={writing.blog}
              target="_blank"
              rel="noreferrer"
              className="press group inline-flex min-h-10 items-center gap-1.5 text-sm font-medium text-muted hover:text-fg"
            >
              All posts on Hashnode
              <ArrowUpRight width={16} height={16} className="arrow" />
            </a>
          </div>

          <ul className="mt-8 divide-y divide-line border-y border-line">
            {posts.map((post, i) => (
              <li key={post.url} data-reveal style={{ ['--i' as string]: i }}>
                <a
                  href={post.url}
                  target="_blank"
                  rel="noreferrer"
                  className="card group -mx-4 grid gap-1 rounded-xl px-4 py-5 sm:grid-cols-[1fr_auto] sm:items-center sm:gap-8"
                >
                  <div>
                    <h3 className="serif text-xl tracking-tight group-hover:text-accent sm:text-2xl">{post.title}</h3>
                    <p className="mt-1 line-clamp-2 text-[0.95rem] text-muted">{post.summary}</p>
                  </div>
                  <span className="flex items-center gap-2 font-mono text-xs text-subtle">
                    {post.readTime}
                    <ArrowUpRight width={15} height={15} className="arrow" />
                  </span>
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              </li>
            ))}
          </ul>
        </section>

        {/* ── Skills ── */}
        <section id="skills" aria-labelledby="skills-title" className="border-t border-line py-20 sm:py-28">
          <div data-reveal className="max-w-2xl">
            <p className="eyebrow"><b>05</b>Index · Capabilities</p>
            <h2 id="skills-title" className="h2 mt-4">
              What I bring <span className="em">to the table</span>
            </h2>
          </div>

          <dl className="mt-12 divide-y divide-line border-y border-line">
            {skills.map((s, i) => (
              <div
                key={s.group}
                data-reveal
                className="grid gap-5 py-8 md:grid-cols-[minmax(0,22rem)_1fr] md:gap-0"
              >
                <dt className="flex gap-4 md:border-r md:border-line md:pr-10">
                  <span className="pt-1.5 font-mono text-xs text-accent tabular-nums">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span>
                    <span className="serif block text-2xl leading-tight tracking-tight sm:text-[1.9rem]">{s.group}</span>
                    <span className="mt-1.5 block text-[0.95rem] text-muted">{s.blurb}</span>
                  </span>
                </dt>
                <dd className="flex flex-wrap content-start gap-2 pl-9 md:pl-10">
                  {s.items.map((item) => (
                    <span
                      key={item}
                      className="tag"
                    >
                      {item}
                    </span>
                  ))}
                </dd>
              </div>
            ))}
          </dl>

          {/* AI pull-quote */}
          <div className="mt-20 grid gap-10 md:grid-cols-[1.2fr_1fr] md:gap-0">
            <p data-reveal className="statement md:pr-14">
              <Em h={aiNote.quote} />
            </p>
            <div data-reveal className="md:border-l md:border-line md:pl-10">
              <p className="eyebrow">
                <b>{aiNote.sideLabel[0]}</b>
                {aiNote.sideLabel[1]}
              </p>
              <p className="mt-4 leading-relaxed text-muted">{aiNote.side}</p>
            </div>
          </div>
        </section>

        {/* ── 06 How I work ── */}
        <section aria-labelledby="process-title" className="border-t border-line py-20 sm:py-28">
          <div className="grid gap-12 md:grid-cols-[1.2fr_1fr] md:gap-0">
            <div className="md:pr-14">
              <p data-reveal className="eyebrow">
                <b>06</b>How I work
              </p>
              <h2 id="process-title" data-reveal className="statement mt-8">
                <Em h={process.statement} />
              </h2>
            </div>
            <ol className="divide-y divide-line md:border-l md:border-line">
              {process.steps.map((st, i) => (
                <li key={st.title} data-reveal style={{ ['--i' as string]: i }} className="py-6 first:pt-0 md:pl-10 md:first:pt-1">
                  <p className="eyebrow">
                    <b>{String(i + 1).padStart(2, '0')}</b>
                    {st.title}
                  </p>
                  <p className="mt-3 text-lg leading-relaxed">{st.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ── Off the clock ── */}
        <section aria-labelledby="hobbies-title" className="border-t border-line py-20 sm:py-24">
          <div data-reveal className="max-w-xl">
            <p className="eyebrow"><b>07</b>Off the clock</p>
            <h2 id="hobbies-title" className="h2 mt-4">
              Behind a camera, <span className="em">or on the road</span>
            </h2>
          </div>

          <ul className="mt-8 grid gap-4 sm:grid-cols-2">
            {hobbies.map((h, i) => {
              const Icon = h.kind === 'photo' ? Camera : Video
              return (
                <li key={h.handle} data-reveal style={{ ['--i' as string]: i }}>
                  <a
                    href={h.url}
                    target="_blank"
                    rel="noreferrer"
                    className="card press group flex h-full flex-col rounded-md border border-line bg-surface p-6"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <span className="grid h-11 w-11 place-items-center rounded-xl bg-accent-soft text-accent">
                        <Icon width={20} height={20} />
                      </span>
                      <ArrowUpRight className="arrow shrink-0 text-subtle group-hover:text-accent" />
                    </div>
                    <h3 className="serif mt-5 text-[1.6rem] leading-tight tracking-tight">{h.title}</h3>
                    <p className="mt-2 flex-1 text-[0.95rem] leading-relaxed text-muted">{h.body}</p>
                    <p className="mt-5 inline-flex items-center gap-2 font-mono text-sm text-subtle group-hover:text-fg">
                      <Instagram width={16} height={16} />@{h.handle}
                    </p>
                    <span className="sr-only">(opens Instagram in a new tab)</span>
                  </a>
                </li>
              )
            })}
          </ul>
        </section>

        {/* ── Contact ── */}
        <section aria-labelledby="contact-title" className="border-t border-line py-24 sm:py-32">
          <div data-reveal className="mx-auto max-w-2xl text-center">
            <p className="eyebrow"><b>08</b>Contact</p>
            <h2 id="contact-title" className="h2 mt-3">
              Building something people use every day? <span className="em">Let’s talk.</span>
            </h2>
            <p className="lead mx-auto mt-5 max-w-lg text-muted">
              I’m looking for my next senior frontend or full-stack role, and I take on a few
              website projects for local businesses.
            </p>
            <a
              href={`mailto:${profile.email}`}
              className="press mt-9 inline-flex min-h-12 items-center gap-2 rounded-[4px] bg-accent px-6 font-medium text-on-accent hover:opacity-90"
            >
              <Mail width={17} height={17} />
              {profile.email}
            </a>
          </div>
        </section>
      </main>

      <footer className="border-t border-line">
        <div className="mx-auto flex max-w-5xl flex-col gap-3 px-5 py-8 text-sm text-subtle sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <p>
            © {new Date().getFullYear()} {profile.name}
          </p>
          <div className="flex gap-5">
            <a href={profile.github} target="_blank" rel="noreferrer" className="link-underline hover:text-fg">
              GitHub
            </a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer" className="link-underline hover:text-fg">
              LinkedIn
            </a>
            <a href={`mailto:${profile.email}`} className="link-underline hover:text-fg">
              Email
            </a>
          </div>
        </div>
      </footer>
    </>
  )
}
