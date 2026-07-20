import { Quote } from 'lucide-react';
import { AWARDS, TESTIMONIAL } from '../data/recognition';
import { cx } from '../lib/utils';
import { CARD, CARD_HOVER, Reveal, Section } from './ui';

export function Recognition() {
  return (
    <Section
      id="recognition"
      eyebrow="Recognition"
      title="Awarded for building things people use."
      intro="Honors from AT&T and Verizon leadership — and what they were for."
    >
      <div className="grid gap-4 md:grid-cols-2">
        {AWARDS.map((award, i) => (
          <Reveal key={award.title} delay={(i % 2) * 70} className={i === AWARDS.length - 1 ? 'md:col-span-2' : ''}>
            <div className={cx(CARD, CARD_HOVER, 'group h-full p-6')}>
              <div className="flex items-start gap-4">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-accent-500/10 text-accent-text transition-colors group-hover:bg-accent-500/20">
                  <award.icon size={22} aria-hidden />
                </span>
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-base font-semibold tracking-tight">{award.title}</h3>
                    <span className="rounded-md bg-accent-500/10 px-2 py-0.5 font-mono text-[10px] text-accent-text">{award.year}</span>
                  </div>
                  <p className="mt-0.5 text-xs font-semibold uppercase tracking-wide text-faint">{award.org}</p>
                  <p className="mt-2 text-sm leading-relaxed text-mute">{award.desc}</p>
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-8">
        <figure className={cx(CARD, 'relative overflow-hidden p-7 md:p-9')}>
          <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_120%_at_10%_0%,rgb(var(--accent-500)/0.08),transparent_60%)]" />
          <Quote size={28} aria-hidden className="text-accent-500/40" />
          <blockquote className="relative mt-4 max-w-3xl text-lg leading-relaxed md:text-xl">
            "{TESTIMONIAL.quote}"
          </blockquote>
          <figcaption className="relative mt-6 flex items-center gap-3">
            <span aria-hidden className="grid h-11 w-11 place-items-center rounded-full bg-accent-500/15 font-semibold text-accent-text">
              {TESTIMONIAL.initials}
            </span>
            <span>
              <span className="block text-sm font-semibold">{TESTIMONIAL.name}</span>
              <span className="block text-xs text-faint">{TESTIMONIAL.title}</span>
            </span>
          </figcaption>
        </figure>
      </Reveal>
    </Section>
  );
}
