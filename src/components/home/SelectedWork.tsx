import { Link } from 'react-router';
import { ArrowRight } from 'lucide-react';
import type { CaseStudyMeta } from '../../content/types';
import { CASE_STUDIES } from '../../content/work';
import { trackEvent } from '../../lib/analytics';
import { cx } from '../../lib/utils';
import { ArrowLink } from '../ui/Links';
import { Reveal } from '../ui/Reveal';
import { SectionHead } from '../ui/SectionHead';

/* Case-study cards. Each is a single link (no nested anchors) and carries
   a small schematic so the grid never reads as identical text blocks. */

export function SelectedWork({ headingLevel = 'h2' }: { headingLevel?: 'h2' | 'h3' }) {
  const [flagship, ...rest] = CASE_STUDIES;
  return (
    <section aria-labelledby="work-title" className="section">
      <div className="wrap">
        <SectionHead
          id="work-title"
          title={
            <>
              Selected <span className="text-grad">work</span>
            </>
          }
          intro="Three case studies, each showing a different muscle: scaling an enterprise AI product, commercial experimentation, and inventing a product from an ambiguous problem."
          action={<ArrowLink to="/work/">All work</ArrowLink>}
        />
        <div className="mt-14 grid gap-5 lg:grid-cols-2">
          <Reveal className="lg:col-span-2">
            <CaseCard cs={flagship} number="01" wide headingLevel={headingLevel} schematic={<AssistantSchematic />} />
          </Reveal>
          {rest.map((cs, i) => (
            <Reveal key={cs.slug} delay={i * 90}>
              <CaseCard
                cs={cs}
                number={String(i + 2).padStart(2, '0')}
                headingLevel={headingLevel}
                schematic={cs.slug === 'verizon-digital-commerce' ? <FunnelSchematic /> : <InnovationSchematic />}
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function CaseCard({
  cs,
  number,
  wide = false,
  schematic,
  headingLevel = 'h2',
}: {
  cs: CaseStudyMeta;
  number: string;
  wide?: boolean;
  schematic?: React.ReactNode;
  headingLevel?: 'h2' | 'h3';
}) {
  const Heading = headingLevel === 'h2' ? 'h3' : 'h4';
  return (
    <Link
      to={`/work/${cs.slug}/`}
      onClick={() => trackEvent('case_study_open', { slug: cs.slug, location: 'case_card' })}
      className={cx(
        'group panel grid h-full gap-10 p-6 no-underline transition-colors duration-200 hover:border-line-2 hover:bg-bg-3 sm:p-8 lg:p-10',
        wide && 'lg:grid-cols-12 lg:gap-14'
      )}
    >
      <div className={cx('flex flex-col', wide && 'lg:col-span-7')}>
        <p className="t-label">
          Case study {number} <span className="text-ink-4">·</span> {cs.period}
        </p>
        <Heading className={cx('mt-5 text-ink', wide ? 't-h2' : 't-h3 !text-[clamp(1.375rem,1.15rem+0.8vw,1.75rem)]')}>
          {cs.title}
        </Heading>
        <p className="mt-3 text-[1.0625rem] leading-relaxed text-ink-2">{cs.subtitle}</p>
        <ul className="mt-8 grid gap-2.5">
          {cs.proof.map((p) => (
            <li key={p} className="flex gap-3 text-[0.9375rem] leading-snug text-ink">
              <span aria-hidden className="mt-[0.6em] h-px w-3 shrink-0 bg-accent" />
              {p}
            </li>
          ))}
        </ul>
        <span className="link-arrow mt-auto pt-10">
          <span className="u">View case study</span>
          <ArrowRight size={16} aria-hidden />
        </span>
      </div>
      {schematic && (
        <div aria-hidden className={cx('figure-frame self-stretch p-5 sm:p-6', wide ? 'lg:col-span-5' : 'order-first')}>
          {schematic}
        </div>
      )}
    </Link>
  );
}

export function schematicFor(slug: string) {
  if (slug === 'att-genai-virtual-assistant') return <AssistantSchematic />;
  if (slug === 'verizon-digital-commerce') return <FunnelSchematic />;
  return <InnovationSchematic />;
}

const nodeCls = 'node px-3 py-2 text-[0.8125rem] leading-snug text-ink-2';

function Down() {
  return <span className="mx-auto block h-5 w-px bg-ink-4" />;
}

function AssistantSchematic() {
  return (
    <div className="flex h-full flex-col justify-center">
      <div className="grid grid-cols-2 gap-1.5 text-center sm:grid-cols-4">
        {['Chat', 'Voice', 'WhatsApp', 'RCS'].map((c) => (
          <span key={c} className={cx(nodeCls, 'px-1')}>{c}</span>
        ))}
      </div>
      <Down />
      <span className={cx(nodeCls, 'node-accent text-center text-ink')}>Conversation AI · Dialogflow CX + GenAI</span>
      <Down />
      <div className="grid grid-cols-2 gap-1.5 text-center">
        <span className={nodeCls}>RAG knowledge</span>
        <span className={nodeCls}>CRM + telephony APIs</span>
      </div>
      <Down />
      <div className="grid grid-cols-2 gap-1.5 text-center">
        <span className={cx(nodeCls, 'text-ink')}>Resolved · 55%</span>
        <span className={nodeCls}>Escalated with context</span>
      </div>
    </div>
  );
}

function FunnelSchematic() {
  const stages = [
    { s: 'Discover', w: 100 },
    { s: 'Configure', w: 86, m: 'Payment plans · Hum+' },
    { s: 'Cart', w: 72, m: 'Universal cart' },
    { s: 'Fulfill', w: 58, m: 'Split fulfillment' },
    { s: 'Support', w: 46, m: 'ETF redesign' },
  ];
  return (
    <div className="grid gap-2">
      {stages.map((st) => (
        <div key={st.s} className="flex items-center gap-3">
          <span className="h-7 shrink-0 rounded-sm border border-line-2 bg-bg" style={{ width: `${st.w * 0.55}%` }} />
          <span className="min-w-0 text-[0.75rem] leading-tight text-ink-3">
            <span className="block text-ink-2">{st.s}</span>
            {st.m && <span className="block text-accent">{st.m}</span>}
          </span>
        </div>
      ))}
    </div>
  );
}

function InnovationSchematic() {
  const steps = [
    { s: 'Problem', m: 'Surprise deductibles, trust-only claims' },
    { s: 'Insight', m: 'The network already holds the evidence' },
    { s: 'Prototype', m: '17 routes, built solo', accent: true },
    { s: 'Business case', m: 'Attach, claims cost, time to replace' },
    { s: 'Pitch + IP', m: 'Invention disclosure submitted' },
  ];
  return (
    <ol className="grid gap-2">
      {steps.map((st) => (
        <li key={st.s} className="flex items-center gap-3">
          <span className={cx(nodeCls, 'w-[7.5rem] shrink-0 text-center', st.accent && 'node-accent text-ink')}>{st.s}</span>
          <span className="min-w-0 text-[0.75rem] leading-tight text-ink-3">{st.m}</span>
        </li>
      ))}
    </ol>
  );
}
