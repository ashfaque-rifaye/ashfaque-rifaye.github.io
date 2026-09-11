import { PageHeader } from '../components/layout/PageHeader';
import { HireCta } from '../components/sections/HireCta';
import { Readout } from '../components/ui/Readout';
import { Reveal } from '../components/ui/Reveal';
import { SectionHead } from '../components/ui/SectionHead';
import { Todo } from '../components/ui/Todo';
import { CERTIFICATIONS, EDUCATION } from '../content/experience';
import { BY_THE_NUMBERS } from '../content/metrics';
import { SKILL_GROUPS } from '../content/skills';
import { cx } from '../lib/utils';

const ROUTE = [
  {
    period: '2012 – 2016',
    stage: 'Mechanical engineering',
    place: 'Velammal Engineering College, Anna University',
    text: 'A B.E. with distinction. It taught me to think in systems, constraints and failure modes before I wrote a line of production code.',
  },
  {
    period: '2016 – 2020',
    stage: 'Software engineering',
    place: 'Infosys, for Boeing',
    text: "I modernized Boeing's Work Statement Requirement Database for 1,200+ maintenance engineers across five facilities: REST integrations across disparate data sources, six major releases in 18 months, 99.2% uptime after launch, and incident response that cut average downtime by 40%.",
  },
  {
    period: '2020 – 2022',
    stage: 'Digital product and consulting',
    place: 'Verizon',
    text: 'I moved closer to customers and revenue: funnel analysis, A/B tests and market research across retail, consumer and B2B, written into requirements for 15+ features. The work contributed $1.5M+ in incremental revenue in FY21.',
  },
  {
    period: '2022 – present',
    stage: 'Enterprise AI product',
    place: 'AT&T',
    text: 'I own a GenAI virtual assistant end to end: conversation design, retrieval, telephony and CRM integration, the KPI framework and the roadmap. It handles 1.5M+ customer interactions a month.',
  },
  {
    period: 'Next',
    stage: 'AI product leadership',
    place: 'The role I am building toward',
    text: 'Owning AI products from the problem worth solving to the metric that proves it. The innovation work, an Innovation Jam Best in Show and an invention disclosure, is the evidence that I can create products as well as run them.',
  },
];

export function AboutPage() {
  return (
    <>
      <PageHeader
        title={
          <>
            The path to <span className="text-grad">AI products</span>
          </>
        }
        lede="I trained as a mechanical engineer, wrote production software for aircraft maintenance, ran commerce experiments at Verizon, and now own an enterprise AI product at AT&T. Each step added a layer the next one needed."
      />

      <section aria-labelledby="story-title" className="wrap">
        <h2 id="story-title" className="sr-only">
          Career story
        </h2>
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          <ol className="relative grid gap-12 pl-9 lg:col-span-7">
            <span aria-hidden className="absolute bottom-3 left-[5px] top-3 w-px bg-line-2" />
            {ROUTE.map((r, i) => (
              <li key={r.stage} className="relative">
                <span
                  aria-hidden
                  className={cx(
                    'absolute -left-9 top-1.5 h-[11px] w-[11px] rounded-full border',
                    i === ROUTE.length - 1 ? 'border-dashed border-accent bg-bg' : i === ROUTE.length - 2 ? 'border-accent bg-accent' : 'border-line-2 bg-bg'
                  )}
                />
                <Reveal delay={i * 60}>
                  <p className="t-label">{r.period}</p>
                  <h3 className="t-h3 mt-3">{r.stage}</h3>
                  <p className="mt-1 text-[0.9375rem] text-ink-3">{r.place}</p>
                  <p className="t-body mt-4 max-w-measure">{r.text}</p>
                </Reveal>
              </li>
            ))}
          </ol>
          <aside className="lg:col-span-5">
            <div className="panel p-7 md:p-9 lg:sticky lg:top-28">
              <h2 className="t-h3">Why this intersection</h2>
              <div className="prose-case mt-5">
                <p>
                  My engineering foundation helps me understand systems, APIs and technical trade-offs. My product experience
                  connects that technology to customers and business outcomes.
                </p>
                <p>
                  Enterprise AI needs both. A model only creates value once it is integrated with the systems around it,
                  measured against a business metric, and trusted by the people who depend on it.
                </p>
              </div>
              <div className="mt-8">
                <Todo>Portrait: add public/media/portrait.webp (4:5, at least 800px wide) to show it here.</Todo>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section aria-labelledby="numbers-title" className="section pb-0">
        <div className="wrap">
          <SectionHead id="numbers-title" title="By the numbers" intro="Seniority at a glance. Savings are estimates." />
          <dl className="mt-12 grid grid-cols-2 gap-x-6 gap-y-12 border-t border-line pt-10 lg:grid-cols-3">
            {BY_THE_NUMBERS.map((m) => (
              <Readout key={m.label} metric={m} countUp />
            ))}
          </dl>
        </div>
      </section>

      <section aria-labelledby="skills-title" className="section pb-0">
        <div className="wrap">
          <SectionHead id="skills-title" title="Skills" intro="Grouped by the job they do, and limited to what I use in AI product work." />
          <dl className="mt-12 border-t border-line">
            {SKILL_GROUPS.map((g) => (
              <div key={g.title} className="grid gap-2 border-b border-line py-5 md:grid-cols-12 md:gap-6">
                <dt className="font-semibold text-ink md:col-span-3">{g.title}</dt>
                <dd className="text-[1rem] leading-relaxed text-ink-2 md:col-span-9">{g.items.join(' · ')}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section aria-labelledby="credentials-title" className="section pb-0">
        <div className="wrap">
          <SectionHead id="credentials-title" title="Education and certifications" />
          <div className="mt-12 grid gap-10 border-t border-line pt-8 md:grid-cols-2 md:gap-16">
            <div>
              <p className="t-label">Education</p>
              <p className="mt-4 font-semibold text-ink">{EDUCATION.degree}</p>
              <p className="mt-1 text-[0.9375rem] text-ink-2">{EDUCATION.school}</p>
              <p className="mt-1 text-[0.9375rem] text-ink-3">
                {EDUCATION.period} · {EDUCATION.note}
              </p>
            </div>
            <div>
              <p className="t-label">Certifications</p>
              <ul className="mt-4 border-t border-line">
                {CERTIFICATIONS.map((c) => (
                  <li key={c.name} className="flex items-baseline justify-between gap-4 border-b border-line py-3 text-[0.9375rem]">
                    <span className="text-ink">{c.name}</span>
                    <span className="font-mono text-[0.8125rem] text-ink-3">{c.year}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <HireCta location="about" />
    </>
  );
}
