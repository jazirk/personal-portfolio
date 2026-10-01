import { education, experienceIntro, jobs, type Highlight, type Job } from '@/lib/content'
import { Em } from './Em'
import { GraduationCap } from './Icons'

function Chips({ items, label }: { items: string[]; label: string }) {
  return (
    <ul className="flex flex-wrap gap-1.5" aria-label={label}>
      {items.map((t) => (
        <li key={t} className="tag !px-2 !py-1 !text-[0.62rem]">
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
      className={`card flex flex-col rounded-md border border-line bg-surface p-6 ${wide ? 'sm:col-span-2' : ''}`}
    >
      <p className="eyebrow">{h.tag}</p>
      <h4 className="serif mt-3 text-[1.55rem] leading-tight tracking-tight">{h.title}</h4>
      <p className="mt-3 flex-1 text-[0.95rem] leading-relaxed text-muted">{h.body}</p>
      {h.metric && (
        <p className="mt-6 flex items-baseline gap-2 border-t border-line pt-4">
          <span className="serif text-[2rem] leading-none text-accent">{h.metric.value}</span>
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
              className="serif grid h-11 w-11 shrink-0 place-items-center rounded-[4px] border border-line bg-surface text-2xl italic text-accent"
            >
              {job.company[0]}
            </span>
            <div>
              <h3 className="serif flex items-center gap-2 text-3xl tracking-tight">
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
            <div data-reveal className="rounded-md border border-line bg-surface p-6 sm:p-7">
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
                  <span className="serif text-[2rem] leading-none text-accent">
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
  const current = jobs[0]

  return (
    <section id="work" aria-labelledby="work-title" className="border-t border-line py-20 sm:py-28">
      <div data-reveal className="flex flex-wrap items-baseline justify-between gap-4 border-b border-line pb-5">
        <p className="eyebrow">
          <b>02</b>Experience
        </p>
        <p className="eyebrow">{experienceIntro.range}</p>
      </div>

      <div className="mt-14 grid gap-12 md:grid-cols-[1.2fr_1fr] md:gap-0">
        <div className="md:pr-14">
          <h2 id="work-title" data-reveal className="display text-[clamp(2.4rem,5.6vw,4.5rem)]">
            <Em h={experienceIntro.headline} />
          </h2>
          <p data-reveal className="lead mt-8 max-w-xl text-lg leading-relaxed text-muted">
            {experienceIntro.lead}
          </p>
        </div>

        <div data-reveal className="md:border-l md:border-line md:pl-10">
          <p className="eyebrow">
            <b>Role</b>
          </p>
          <p className="serif mt-3 text-[1.75rem] leading-tight">
            {current.role}, {current.company}
          </p>
          <p className="mt-1 text-muted">
            {current.location} · {current.period}
          </p>
          <p className="eyebrow mt-8">
            <b>Metrics</b>
            {experienceIntro.metricsLabel}
          </p>
          <dl className="mt-4 divide-y divide-line border border-line">
            {(current.stats ?? []).slice(0, 3).map((m) => (
              <div key={m.label} className="flex items-center gap-6 px-5 py-4">
                <dd className="serif w-24 shrink-0 text-4xl leading-none">{m.value}</dd>
                <dt className="eyebrow !tracking-[0.18em]">{m.label}</dt>
              </div>
            ))}
          </dl>
        </div>
      </div>

      <div data-timeline className="relative mt-20 sm:mt-28">
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
                className="grid h-11 w-11 shrink-0 place-items-center rounded-[4px] border border-line bg-surface text-accent"
              >
                <GraduationCap width={20} height={20} />
              </span>
              <div>
                <h3 className="serif text-3xl tracking-tight">Education</h3>
                <p className="font-mono text-xs text-subtle">{education.period}</p>
              </div>
            </header>
            <div
              data-reveal
              className="grid overflow-hidden rounded-md border border-line bg-surface sm:grid-cols-2"
            >
              <div className="p-6">
                <p className="eyebrow">
                  <b>Degree</b>
                </p>
                <p className="serif mt-3 text-xl tracking-tight">{education.degree}</p>
                <p className="text-sm text-muted">
                  {education.school} · {education.period}
                </p>
              </div>
              <div className="border-t border-line p-6 sm:border-l sm:border-t-0">
                <p className="eyebrow">
                  <b>Certifications</b>
                </p>
                <ul className="mt-3 space-y-3">
                  {education.certifications.map((c) => (
                    <li key={c.name}>
                      <p className="serif text-xl leading-tight tracking-tight">{c.name}</p>
                      <p className="text-sm text-muted">{c.issuer}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </li>
        </ol>
      </div>
    </section>
  )
}
