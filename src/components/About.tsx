import { GraduationCap } from 'lucide-react';
import { EDUCATION } from '../data/experience';
import { cx } from '../lib/utils';
import { CARD, Reveal, Section } from './ui';

export function About() {
  return (
    <Section
      id="about"
      eyebrow="About"
      title="From mechanical engineering to conversational AI."
      intro=""
    >
      <div className="grid gap-5 md:grid-cols-[1.5fr,1fr]">
        <Reveal>
          <div className={cx(CARD, 'h-full p-6 md:p-8')}>
            <div className="space-y-4 text-[15px] leading-relaxed text-mute">
              <p>
                I started as a software engineer at Infosys, building full-stack systems for Boeing's aircraft
                maintenance operations. Watching how the right product decisions moved real operational numbers pulled
                me toward the business side — first as a product consultant at Verizon, then into AI product
                ownership at AT&amp;T.
              </p>
              <p>
                Today I sit at the intersection of business strategy and technical execution: I write the BRDs,
                design the conversations, argue for the budget, and read the dashboards. My strength is translating
                between executives who need outcomes and engineers who need precise requirements — in both directions.
              </p>
              <p>
                Outside work I build AI products end-to-end — agent swarms, mock-interview coaches, multi-agent
                productivity systems — because the fastest way to have an informed product opinion about AI is to
                ship some.
              </p>
            </div>
          </div>
        </Reveal>
        <Reveal delay={80}>
          <div className={cx(CARD, 'flex h-full flex-col justify-between p-6 md:p-8')}>
            <div>
              <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-faint">
                <GraduationCap size={16} aria-hidden className="text-accent-text" /> Education
              </h3>
              <p className="text-sm font-semibold">{EDUCATION.degree}</p>
              <p className="mt-1 text-sm text-mute">{EDUCATION.school}</p>
              <p className="mt-0.5 font-mono text-xs text-faint">{EDUCATION.period}</p>
            </div>
            <div className="mt-8 border-t border-line pt-6">
              <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-faint">Domains</h3>
              <p className="text-sm leading-relaxed text-mute">
                Telecom · Retail &amp; E-Commerce · Customer Experience · Aviation
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
