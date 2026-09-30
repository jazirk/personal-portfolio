import { education, jobs, type Highlight, type Job } from '@/lib/content'
import { GraduationCap } from './Icons'

function Chips({ items, label }: { items: string[]; label: string }) {
  return (
    <ul className="flex flex-wrap gap-1.5" aria-label={label}>
      {items.map((t) => (
        <li key={t} className="rounded-md bg-surface-2 px-2 py-1 font-mono text-[0.7rem] text-muted">
          {t}
        </li>
      ))}
    </ul>
  )
}

function HighlightCard({ h, i, wide }: { h: Highlight; i: number; wide: boolean }) {
  return (
    <li
      data-reveal
      style={{ ['--i' as string]: i % 2 }}
      className={`card flex flex-col rounded-2xl border border-line bg-surface p-6 ${wide ? 'sm:col-span-2' : ''}`}
    >
      <p className="eyebrow">{h.tag}</p>
      <h4 className="mt-3 text-lg font-semibold tracking-tight">{h.title}</h4>
      <p className="mt-3 flex-1 text-[0.95rem] leading-relaxed text-muted">{h.body}</p>
      {h.metric && (
        <p className="mt-6 flex items-baseline gap-2 border-t border-line pt-4">
          <span className="font-mono text-2xl font-medium tracking-tight text-accent">{h.metric.value}</span>
          <span className="text-sm text-subtle">{h.metric.label}</span>
        </p>
      )}
    </li>
  )
}

function JobEntry({ job }: { job: Job }) {
  const current = job.period.includes('Present')
  const highlights = job.highlights ?? []

  return (
    <li className="relative pb-20 pl-10 last:pb-0 md:pl-14">
      <span aria-hidden className="timeline-dot" />
      <div className="grid gap-6 md:grid-cols-[14rem_1fr] md:gap-10">
        {/* Meta column stays pinned while you read the job on desktop */}
        <header data-reveal className="md:sticky md:top-24 md:self-start">
          <div className="flex items-center gap-3">
            <span
              aria-hidden
              className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-line bg-surface font-mono text-lg font-medium text-accent"
            >
              {job.company[0]}
            </span>
            <div>
              <h3 className="flex items-center gap-2 text-xl font-semibold tracking-tight">
                {job.company}
                {current && (
                  <span className="rounded-full bg-accent-soft px-2 py-0.5 text-[0.65rem] font-medium uppercase tracking-wider text-accent">
                    Now
                  </span>
                )}
              </h3>
              <p className="text-sm text-muted">{job.role}</p>
            </div>
          </div>
          <p className="mt-4 font-mono text-xs text-subtle">
            {job.period} · {job.location}
          </p>
          <div className="mt-4">
            <Chips items={job.tech} label="Technologies" />
          </div>
        </header>

        <div className="min-w-0">
          <p data-reveal className="lead max-w-2xl text-[1.05rem] leading-relaxed text-muted">
            {job.summary}
          </p>

          {job.stats && (
            <dl
              data-reveal
              className="mt-6 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-4"
            >
              {job.stats.map((s) => (
                <div key={s.label} className="flex flex-col-reverse gap-1 bg-surface p-4 sm:p-5">
                  <dt className="text-xs leading-snug text-subtle">{s.label}</dt>
                  <dd className="font-mono text-2xl font-medium tracking-tight">{s.value}</dd>
                </div>
              ))}
            </dl>
          )}

          {highlights.length > 0 && (
            <ul className="mt-4 grid gap-4 sm:grid-cols-2">
              {highlights.map((h, i) => (
                <HighlightCard
                  key={h.title}
                  h={h}
                  i={i}
                  wide={highlights.length % 2 === 1 && i === highlights.length - 1}
                />
              ))}
            </ul>
          )}

          {job.points && (
            <div data-reveal className="rounded-2xl border border-line bg-surface p-6 sm:p-7">
              <ul className="space-y-3.5">
                {job.points.map((pt) => (
                  <li key={pt} className="flex gap-3 text-[0.95rem] leading-relaxed text-muted">
                    <span aria-hidden className="mt-[0.7em] h-px w-3 shrink-0 bg-accent" />
                    {pt}
                  </li>
                ))}
              </ul>
              {job.metric && (
                <p className="mt-6 flex items-baseline gap-2 border-t border-line pt-4">
                  <span className="font-mono text-2xl font-medium tracking-tight text-accent">
                    {job.metric.value}
                  </span>
                  <span className="text-sm text-subtle">{job.metric.label}</span>
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </li>
  )
}

export function Experience() {
  return (
    <section id="work" aria-labelledby="work-title" className="border-t border-line py-20 sm:py-28">
      <div data-reveal className="max-w-2xl">
        <p className="eyebrow">Experience</p>
        <h2 id="work-title" className="h2 mt-3">
          Six years of interfaces people rely on every day
        </h2>
        <p className="lead mt-4 text-muted">
          From real estate tooling to financial analytics to Uber’s support platform.
        </p>
      </div>

      <div data-timeline className="relative mt-14 sm:mt-20">
        <div aria-hidden className="timeline-rail">
          <div className="timeline-fill" />
        </div>
        <ol>

        {jobs.map((job) => (
          <JobEntry key={job.company} job={job} />
        ))}

        {/* Education closes the timeline */}
        <li className="relative pl-10 md:pl-14">
          <span aria-hidden className="timeline-dot" />
          <div className="grid gap-6 md:grid-cols-[14rem_1fr] md:gap-10">
            <header data-reveal className="flex items-center gap-3">
              <span
                aria-hidden
                className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-line bg-surface text-accent"
              >
                <GraduationCap width={20} height={20} />
              </span>
              <div>
                <h3 className="text-xl font-semibold tracking-tight">Education</h3>
                <p className="font-mono text-xs text-subtle">{education.period}</p>
              </div>
            </header>
            <div
              data-reveal
              className="flex flex-col gap-4 rounded-2xl border border-line bg-surface p-6 lg:flex-row lg:items-center lg:justify-between"
            >
              <div className="shrink-0">
                <p className="font-semibold tracking-tight">{education.degree}</p>
                <p className="text-sm text-muted">{education.school}</p>
              </div>
              <Chips items={education.certifications} label="Certifications" />
            </div>
          </div>
        </li>
        </ol>
      </div>
    </section>
  )
}
