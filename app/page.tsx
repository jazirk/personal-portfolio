import { HeroBackground } from '@/components/HeroBackground'
import { Experience } from '@/components/Experience'
import { Interactions } from '@/components/Interactions'
import { ArrowUpRight, Github, Linkedin, Mail, MapPin } from '@/components/Icons'
import { getPosts } from '@/lib/hashnode'
import { profile, projects, skills, writing } from '@/lib/content'

// Rebuild this page in the background at most once an hour (picks up new Hashnode posts)
export const revalidate = 3600

const nav = [
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
              className="press ml-2 inline-flex min-h-10 items-center gap-2 rounded-full bg-fg px-4 text-sm font-medium text-bg hover:opacity-90"
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
            className="rise relative w-28 shrink-0 sm:w-36 md:order-last md:w-72"
            style={{ ['--i' as string]: 0 }}
          >
            <div
              aria-hidden
              className="absolute -inset-3 -z-10 rounded-[2rem] bg-accent-soft blur-2xl md:-inset-5"
            />
            <img
              src={profile.photo}
              alt={`Portrait of ${profile.name}`}
              width={640}
              height={640}
              fetchPriority="high"
              decoding="async"
              className="aspect-square w-full rounded-3xl border border-line object-cover shadow-xl shadow-black/10 md:rounded-[2rem]"
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

          <h1 className="display rise mt-8 max-w-3xl" style={{ ['--i' as string]: 2 }}>
            {profile.name}.{' '}
            <span className="text-subtle">{profile.headline}</span>
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
              className="press inline-flex min-h-11 items-center gap-2 rounded-full bg-accent px-5 font-medium text-on-accent hover:opacity-90"
            >
              See my work
            </a>
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              className="press inline-flex min-h-11 items-center gap-2 rounded-full border border-line-strong px-5 font-medium hover:bg-surface-2"
            >
              <Github width={16} height={16} />
              GitHub
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
              className="press inline-flex min-h-11 items-center gap-2 rounded-full border border-line-strong px-5 font-medium hover:bg-surface-2"
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

        <Experience />

        {/* ── Projects ── */}
        <section
          id="projects"
          aria-labelledby="projects-title"
          className="border-t border-line py-20 sm:py-28"
        >
          <div data-reveal className="max-w-xl">
            <p className="eyebrow">Freelance & personal</p>
            <h2 id="projects-title" className="h2 mt-3">
              Sites I’ve designed and shipped
            </h2>
          </div>

          <ul className="mt-12 grid gap-4 md:grid-cols-3">
            {projects.map((p, i) => (
              <li key={p.name} data-reveal style={{ ['--i' as string]: i }}>
                <a
                  href={p.url}
                  target="_blank"
                  rel="noreferrer"
                  className="card press group flex h-full flex-col rounded-2xl border border-line bg-surface p-6"
                >
                  <div className="flex items-start justify-between gap-4">
                    <p className="eyebrow">{p.kind}</p>
                    <ArrowUpRight className="arrow shrink-0 text-subtle group-hover:text-accent" />
                  </div>
                  <h3 className="mt-3 text-lg font-semibold tracking-tight">{p.name}</h3>
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
              <p className="eyebrow">Writing</p>
              <h2 id="writing-title" className="mt-3 text-2xl font-semibold tracking-tight">
                Notes from the frontend
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
                    <h3 className="font-semibold tracking-tight group-hover:text-accent">{post.title}</h3>
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
          <div className="grid gap-10 md:grid-cols-[14rem_1fr]">
            <div data-reveal>
              <p className="eyebrow">Toolkit</p>
              <h2 id="skills-title" className="h2 mt-3">
                Skills
              </h2>
            </div>
            <dl className="divide-y divide-line border-y border-line">
              {skills.map((s, i) => (
                <div
                  key={s.group}
                  data-reveal
                  style={{ ['--i' as string]: i }}
                  className="grid gap-3 py-5 sm:grid-cols-[11rem_1fr] sm:gap-6"
                >
                  <dt className="pt-1 text-sm font-medium">{s.group}</dt>
                  <dd className="flex flex-wrap gap-2">
                    {s.items.map((item) => (
                      <span
                        key={item}
                        className="rounded-full border border-line px-3 py-1 text-sm text-muted"
                      >
                        {item}
                      </span>
                    ))}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* ── Contact ── */}
        <section aria-labelledby="contact-title" className="border-t border-line py-24 sm:py-32">
          <div data-reveal className="mx-auto max-w-2xl text-center">
            <p className="eyebrow">Contact</p>
            <h2 id="contact-title" className="h2 mt-3">
              Building something people use every day? Let’s talk.
            </h2>
            <p className="lead mx-auto mt-5 max-w-lg text-muted">
              I’m looking for my next senior frontend or full-stack role, and I take on a few
              website projects for local businesses.
            </p>
            <a
              href={`mailto:${profile.email}`}
              className="press mt-9 inline-flex min-h-12 items-center gap-2 rounded-full bg-accent px-6 font-medium text-on-accent hover:opacity-90"
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
