import { BadgeCheck, Code2, GraduationCap, KanbanSquare, MessagesSquare, ShieldCheck, Target, Users, type LucideIcon } from 'lucide-react';
import { CERTIFICATIONS, EDUCATION } from '../../content/experience';
import { COMPETENCIES } from '../../content/home';
import type { Competency } from '../../content/types';
import { cx } from '../../lib/utils';
import { ArrowLink } from '../ui/Links';
import { Reveal } from '../ui/Reveal';
import { SectionHead } from '../ui/SectionHead';

const ICONS: Record<Competency['icon'], { icon: LucideIcon; tone: string }> = {
  quality: { icon: ShieldCheck, tone: 'bg-tone-emerald/10 text-tone-emerald' },
  conversation: { icon: MessagesSquare, tone: 'bg-tone-violet/10 text-tone-violet' },
  technical: { icon: Code2, tone: 'bg-tone-blue/10 text-tone-blue' },
  delivery: { icon: KanbanSquare, tone: 'bg-tone-orange/10 text-tone-orange' },
  stakeholders: { icon: Users, tone: 'bg-tone-pink/10 text-tone-pink' },
  commerce: { icon: Target, tone: 'bg-tone-cyan/10 text-tone-cyan' },
};

/** Proof line with the **marked** figures in bold. */
function Proof({ text }: { text: string }) {
  return (
    <>
      {text.split(/\*\*(.+?)\*\*/g).map((part, i) =>
        i % 2 ? (
          <strong key={i} className="font-semibold text-ink">
            {part}
          </strong>
        ) : (
          part
        )
      )}
    </>
  );
}

/** Skills a hiring team screens for, laid out as a spec sheet: the
    competency, the proof behind it, and the skills it covers. */
export function Competencies() {
  return (
    <section aria-labelledby="skills-title" className="section pt-0">
      <div className="wrap">
        <SectionHead
          id="skills-title"
          title={
            <>
              Skills and <span className="text-grad">competencies</span>
            </>
          }
          intro="What a hiring team screens for, each tied to where I used it and what it produced."
          action={<ArrowLink to="/about/#skills-title">Full skills list</ArrowLink>}
        />
        <Reveal className="spec mt-12">
          <ul>
            {COMPETENCIES.map((c) => {
              const { icon: Icon, tone } = ICONS[c.icon];
              return (
                <li key={c.title} className="grid gap-4 border-t border-line px-5 py-6 first:border-t-0 sm:px-8 lg:grid-cols-12 lg:gap-8 lg:py-7">
                  <div className="flex items-start gap-3.5 lg:col-span-3">
                    <span aria-hidden className={cx('grid h-10 w-10 shrink-0 place-items-center rounded-xl', tone)}>
                      <Icon size={19} />
                    </span>
                    <div className="min-w-0">
                      <h3 className="text-[1.0625rem] font-semibold leading-snug text-ink" style={{ fontStretch: '106%' }}>
                        {c.title}
                      </h3>
                      <p className="mt-0.5 text-[0.8125rem] text-ink-3">{c.source}</p>
                    </div>
                  </div>
                  <p className="max-w-[62ch] text-[0.9375rem] leading-relaxed text-ink-2 lg:col-span-5">
                    <Proof text={c.proof} />
                  </p>
                  <ul aria-label={`${c.title}: skills`} className="flex flex-wrap content-start gap-1.5 lg:col-span-4">
                    {c.skills.map((s) => (
                      <li key={s} className="chip">
                        {s}
                      </li>
                    ))}
                  </ul>
                </li>
              );
            })}
          </ul>
          <div className="grid gap-7 border-t border-line bg-bg-3/40 px-5 py-6 sm:px-8 lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-8">
              <h3 className="flex items-center gap-2 text-[0.9375rem] font-semibold text-ink">
                <BadgeCheck size={17} aria-hidden className="text-tone-violet" />
                Certifications
              </h3>
              <ul className="mt-3 flex flex-wrap gap-1.5">
                {CERTIFICATIONS.map((c) => (
                  <li key={c.name} className="chip">
                    {c.name}
                    <span className="font-mono text-[0.6875rem] text-ink-3">{c.year}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="lg:col-span-4">
              <h3 className="flex items-center gap-2 text-[0.9375rem] font-semibold text-ink">
                <GraduationCap size={17} aria-hidden className="text-tone-violet" />
                Education
              </h3>
              <p className="mt-3 text-[0.9375rem] text-ink">{EDUCATION.degree}</p>
              <p className="mt-0.5 text-[0.8125rem] leading-snug text-ink-3">
                {EDUCATION.school} · {EDUCATION.note}
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
