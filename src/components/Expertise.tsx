import { Brain, ShieldCheck } from 'lucide-react';
import { AI_MODELS, AI_TOOLS, CERTS, EXPERTISE_GROUPS } from '../data/skills';
import { cx } from '../lib/utils';
import { CARD, Reveal, Section, Tag } from './ui';

export function Expertise() {
  return (
    <Section
      id="expertise"
      eyebrow="Expertise"
      title="Product craft, grounded in the AI stack."
      intro="The skills I use daily — from conversation design and RAG architecture to the ceremonies that keep 18 engineers shipping."
    >
      <div className="grid gap-5 md:grid-cols-3">
        {EXPERTISE_GROUPS.map((group, i) => (
          <Reveal key={group.title} delay={i * 70}>
            <div className={cx(CARD, 'h-full p-6')}>
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-faint">{group.title}</h3>
              <div className="flex flex-wrap gap-2">
                {group.items.map((s) => (
                  <Tag key={s} accent={i === 0}>{s}</Tag>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-5">
        <div className={cx(CARD, 'p-6 md:p-7')}>
          <div className="mb-5 flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-chip text-accent-text">
              <Brain size={20} aria-hidden />
            </span>
            <div>
              <h3 className="text-lg font-semibold tracking-tight">AI stack &amp; models</h3>
              <p className="text-xs text-faint">Tools and models I actively use and experiment with</p>
            </div>
          </div>
          <div className="mb-6 flex flex-wrap gap-2">
            {AI_TOOLS.map((tool) => (
              <span key={tool} className="rounded-lg border border-line bg-raised px-3 py-1.5 text-xs font-medium">
                {tool}
              </span>
            ))}
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {AI_MODELS.map((group) => (
              <div key={group.name} className="rounded-xl border border-line bg-raised p-4">
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-sm font-semibold">{group.name}</span>
                  <span className="rounded bg-line/60 px-1.5 py-0.5 font-mono text-[9px] text-faint">{group.org}</span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {group.models.map((m) => (
                    <span key={m} className="rounded-full border border-line bg-surface px-2 py-0.5 text-[10px] text-mute">
                      {m}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      <Reveal className="mt-5">
        <div className={cx(CARD, 'p-6 md:p-7')}>
          <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold tracking-tight">
            <ShieldCheck size={19} aria-hidden className="text-accent-text" /> Certifications
          </h3>
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {CERTS.map((cert) => (
              <li key={cert.name} className="rounded-xl border border-line bg-raised p-4">
                <p className="font-mono text-[10px] text-faint">{cert.year}</p>
                <p className="mt-1 text-sm font-semibold leading-snug">{cert.name}</p>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </Section>
  );
}
