import { Link } from 'react-router';
import { CaseCard, schematicFor } from '../components/home/SelectedWork';
import { PageHeader } from '../components/layout/PageHeader';
import { HireCta } from '../components/sections/HireCta';
import { ArrowLink } from '../components/ui/Links';
import { Reveal } from '../components/ui/Reveal';
import { SectionHead } from '../components/ui/SectionHead';
import { CASE_STUDIES, OTHER_WORK } from '../content/work';

export function WorkPage() {
  return (
    <>
      <PageHeader
        title="Work"
        lede="Three case studies, each showing a different muscle. They cover the problem, the decisions and trade-offs, the architecture, the delivery and the numbers, plus what I would do differently."
      />

      <section aria-labelledby="case-studies" className="wrap">
        <h2 id="case-studies" className="sr-only">
          Case studies
        </h2>
        <div className="grid gap-5">
          {CASE_STUDIES.map((cs, i) => (
            <Reveal key={cs.slug} delay={i * 60}>
              <CaseCard cs={cs} number={String(i + 1).padStart(2, '0')} wide schematic={schematicFor(cs.slug)} />
            </Reveal>
          ))}
        </div>
      </section>

      <section aria-labelledby="other-work" className="section pb-0">
        <div className="wrap">
          <SectionHead
            id="other-work"
            title="Other shipped work"
            intro="Products and features behind the case studies, with the result each one moved."
          />
          <div className="mt-12 border-t border-line">
            <div aria-hidden className="hidden grid-cols-12 gap-6 border-b border-line py-3 md:grid">
              <span className="t-label col-span-4">Product</span>
              <span className="t-label col-span-2">Where</span>
              <span className="t-label col-span-6">Result</span>
            </div>
            <ul>
              {OTHER_WORK.map((w) => (
                <li key={w.name} className="grid gap-1.5 border-b border-line py-5 md:grid-cols-12 md:gap-6">
                  <span className="font-semibold text-ink md:col-span-4">
                    {w.caseStudy ? (
                      <Link to={`/work/${w.caseStudy}/`} className="underline decoration-line-2 underline-offset-4 transition-colors hover:decoration-accent">
                        {w.name}
                      </Link>
                    ) : (
                      w.name
                    )}
                  </span>
                  <span className="text-[0.9375rem] text-ink-3 md:col-span-2">{w.company}</span>
                  <span className="text-[0.9375rem] text-ink-2 md:col-span-6">{w.result}</span>
                </li>
              ))}
            </ul>
          </div>
          <p className="mt-10 text-[1.0625rem] text-ink-2">
            Independent prototypes and hackathon builds live in the AI Lab.{' '}
            <ArrowLink to="/lab/" className="ml-1">
              Explore the AI Lab
            </ArrowLink>
          </p>
        </div>
      </section>

      <HireCta location="work" />
    </>
  );
}
