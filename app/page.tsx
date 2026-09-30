import { Interactions } from '@/components/Interactions'
import { ArrowUpRight, Github, Mail, MapPin } from '@/components/Icons'
import { experience, profile, projects, skills } from '@/lib/content'

const nav = [
  { href: '#work', label: 'Experience' },
  { href: '#projects', label: 'Projects' },
  { href: '#skills', label: 'Skills' },
]

export default function Home() {
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
            jasir<span className="text-accent">.</span>k
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
        <section id="top" className="pb-20 pt-20 sm:pb-28 sm:pt-28">
          <p
            className="rise inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3 py-1.5 text-xs text-muted"
            style={{ ['--i' as string]: 0 }}
          >
            <span className="relative flex h-2 w-2">
              <span className="h-2 w-2 rounded-full bg-accent" />
            </span>
            {profile.status}
          </p>

          <h1 className="display rise mt-8 max-w-3xl" style={{ ['--i' as string]: 1 }}>
            {profile.name}.{' '}
            <span className="text-subtle">{profile.headline}</span>
          </h1>

          <p
            className="lead rise mt-6 max-w-2xl text-lg text-muted sm:text-xl"
            style={{ ['--i' as string]: 2 }}
          >
            {profile.intro}
          </p>

          <div className="rise mt-10 flex flex-wrap items-center gap-3" style={{ ['--i' as string]: 3 }}>
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
            <span className="inline-flex items-center gap-1.5 px-2 text-sm text-subtle">
              <MapPin width={15} height={15} />
              {profile.location}
            </span>
          </div>
        </section>

        {/* ── Experience ── */}
        <section id="work" aria-labelledby="work-title" className="border-t border-line py-20 sm:py-28">
          <div className="grid gap-10 md:grid-cols-[14rem_1fr]">
            <div data-reveal>
              <p className="eyebrow">Experience</p>
              <h2 id="work-title" className="h2 mt-3">
                {experience.company}
              </h2>
              <p className="mt-2 text-muted">{experience.role}</p>
              <p className="mt-1 font-mono text-sm text-subtle">
                {experience.period} · {experience.location}
              </p>
            </div>

            <ol className="grid gap-4 sm:grid-cols-2">
              {experience.highlights.map((h, i) => (
                <li
                  key={h.title}
                  data-reveal
                  style={{ ['--i' as string]: i % 2 }}
                  className="card flex flex-col rounded-2xl border border-line bg-surface p-6"
                >
                  <p className="eyebrow">{h.tag}</p>
                  <h3 className="mt-3 text-lg font-semibold tracking-tight">{h.title}</h3>
                  <p className="mt-3 flex-1 text-[0.95rem] leading-relaxed text-muted">{h.body}</p>
                  {h.metric && (
                    <p className="mt-6 flex items-baseline gap-2 border-t border-line pt-4">
                      <span className="font-mono text-2xl font-medium tracking-tight text-accent">
                        {h.metric.value}
                      </span>
                      <span className="text-sm text-subtle">{h.metric.label}</span>
                    </p>
                  )}
                </li>
              ))}
            </ol>
          </div>
        </section>

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
            <a href={`mailto:${profile.email}`} className="link-underline hover:text-fg">
              Email
            </a>
          </div>
        </div>
      </footer>
    </>
  )
}
