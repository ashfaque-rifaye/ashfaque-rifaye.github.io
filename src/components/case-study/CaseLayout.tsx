import type { ReactNode } from 'react';
import { Link } from 'react-router';
import { ArrowRight } from 'lucide-react';
import type { Metric } from '../../content/types';
import { CASE_STUDIES, caseStudyBySlug } from '../../content/work';
import { trackEvent } from '../../lib/analytics';
import { useScrollSpy } from '../../lib/hooks';
import { cx, vars } from '../../lib/utils';
import { Readout } from '../ui/Readout';

export interface CaseSectionDef {
  id: string;
  title: string;
  body: ReactNode;
}

export interface CaseStudyContent {
  slug: string;
  number: string;
  lede: ReactNode;
  facts: { key: string; value: string }[];
  keyMetrics: Metric[];
  sections: CaseSectionDef[];
}

const pad = (n: number) => String(n).padStart(2, '0');

/** The reusable case-study template: header, title block, key metrics,
    numbered sections with a sticky contents rail, and the next study. */
export function CaseLayout({ content }: { content: CaseStudyContent }) {
  const meta = caseStudyBySlug(content.slug);
  const ids = content.sections.map((s) => s.id);
  const active = useScrollSpy(ids);
  if (!meta) return null;
  const index = CASE_STUDIES.findIndex((c) => c.slug === content.slug);
  const next = CASE_STUDIES[(index + 1) % CASE_STUDIES.length];

  return (
    <article>
      <header className="wrap pt-[clamp(3rem,2rem+4vw,6rem)]">
        <nav aria-label="Breadcrumb" className="t-label fade-up">
          <Link to="/work/" className="text-ink-2 no-underline transition-colors hover:text-ink">
            Work
          </Link>
          <span aria-hidden className="mx-2 text-ink-4">/</span>
          <span>Case study {content.number}</span>
        </nav>
        <h1 className="t-h1 fade-up mt-6 max-w-[20ch]" style={vars({ '--d': '60ms' })}>
          {meta.title}
        </h1>
        <p className="t-lead fade-up mt-6" style={vars({ '--d': '120ms' })}>
          {meta.subtitle}
        </p>

        <div className="mt-12 grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="prose-case lg:col-span-7">{content.lede}</div>
          <dl className="titleblock self-start lg:col-span-5">
            {content.facts.map((f) => (
              <div key={f.key}>
                <dt className="t-label">{f.key}</dt>
                <dd>{f.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <dl className="mt-14 grid grid-cols-2 gap-x-6 gap-y-10 border-y border-line py-10 lg:grid-cols-4">
          {content.keyMetrics.map((m) => (
            <Readout key={m.label} metric={m} size="md" />
          ))}
        </dl>
      </header>

      <div className="wrap mt-14 grid gap-10 lg:mt-20 lg:grid-cols-[13.5rem_minmax(0,1fr)] lg:gap-16 xl:gap-24">
        <Contents sections={content.sections} active={active} />
        <div className="min-w-0">
          {content.sections.map((s, i) => (
            <section
              key={s.id}
              id={s.id}
              aria-labelledby={`${s.id}-title`}
              className="border-t border-line pb-16 pt-10 first:border-t-0 first:pt-0 md:pb-20"
            >
              <div className="flex items-baseline gap-4">
                <span className="t-label text-accent">{pad(i + 1)}</span>
                <h2 id={`${s.id}-title`} className="t-h2 !text-[clamp(1.5rem,1.2rem+1.2vw,2.25rem)]">
                  {s.title}
                </h2>
              </div>
              <div className="mt-7">{s.body}</div>
            </section>
          ))}
        </div>
      </div>

      <div className="wrap">
        <Link
          to={`/work/${next.slug}/`}
          onClick={() => trackEvent('case_study_open', { slug: next.slug, location: 'next_case_study' })}
          className="group panel block p-7 no-underline transition-colors duration-200 hover:border-line-2 hover:bg-bg-3 md:p-12"
        >
          <span className="t-label">Next case study</span>
          <span className="t-h2 mt-4 block text-ink">{next.title}</span>
          <span className="t-lead mt-3 block">{next.subtitle}</span>
          <span className="link-arrow mt-8">
            <span className="u">Read the case study</span>
            <ArrowRight size={16} aria-hidden />
          </span>
        </Link>
      </div>
    </article>
  );
}

function Contents({ sections, active }: { sections: CaseSectionDef[]; active: string }) {
  const list = (onPick?: () => void) => (
    <ol className="grid gap-0.5">
      {sections.map((s, i) => (
        <li key={s.id}>
          <a
            href={`#${s.id}`}
            onClick={onPick}
            aria-current={active === s.id ? 'location' : undefined}
            className={cx(
              'flex items-baseline gap-3 rounded-sm py-1.5 text-[0.875rem] leading-snug no-underline transition-colors',
              active === s.id ? 'text-ink' : 'text-ink-3 hover:text-ink'
            )}
          >
            <span className={cx('font-mono text-[0.6875rem]', active === s.id ? 'text-accent' : 'text-ink-4')}>{pad(i + 1)}</span>
            {s.title}
          </a>
        </li>
      ))}
    </ol>
  );

  return (
    <>
      <details className="panel group lg:hidden">
        <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between px-4 text-[0.9375rem] font-medium text-ink">
          Contents
          <span aria-hidden className="text-ink-3 transition-transform group-open:rotate-45">+</span>
        </summary>
        <div className="border-t border-line px-4 py-3">{list()}</div>
      </details>
      <nav aria-label="Case study sections" className="hidden lg:block">
        <div className="sticky top-28">
          <p className="t-label mb-4">Contents</p>
          {list()}
        </div>
      </nav>
    </>
  );
}
