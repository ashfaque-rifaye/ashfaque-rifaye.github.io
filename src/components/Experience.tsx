import { useState } from 'react';
import { ChevronDown, Sparkles } from 'lucide-react';
import { EXPERIENCE } from '../data/experience';
import type { Role } from '../data/types';
import { cx } from '../lib/utils';
import { CARD, Reveal, Section, Tag } from './ui';

const VISIBLE_POINTS = 3;

function RoleCard({ job }: { job: Role }) {
  const [expanded, setExpanded] = useState(false);
  const hidden = job.points.length - VISIBLE_POINTS;
  const shown = expanded ? job.points : job.points.slice(0, VISIBLE_POINTS);

  return (
    <article className={cx(CARD, 'relative p-6 md:ml-14 md:p-8')}>
      {/* timeline node */}
      <span aria-hidden className="absolute -left-[46px] top-9 hidden h-5 w-5 place-items-center rounded-full border border-accent-500/40 bg-base md:grid">
        <span className={cx('h-2 w-2 rounded-full', job.current ? 'animate-pulse bg-alt' : 'bg-accent-500')} />
      </span>

      <div className="flex flex-col gap-1.5 md:flex-row md:items-start md:justify-between md:gap-4">
        <div>
          <h3 className="text-xl font-semibold tracking-tight md:text-2xl">{job.company}</h3>
          <p className="mt-1 text-sm font-medium text-accent-text">{job.role}</p>
        </div>
        <p className="shrink-0 font-mono text-xs text-faint md:mt-1.5">{job.period}</p>
      </div>

      <p className="mt-4 text-[15px] leading-relaxed text-mute">{job.summary}</p>

      {/* impact metrics */}
      <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {job.metrics.map((m) => (
          <div key={m.label} className="rounded-xl border border-line bg-raised px-3.5 py-3">
            <p className="text-lg font-semibold tabular-nums tracking-tight text-accent-text">{m.value}</p>
            <p className="mt-0.5 text-[11px] leading-tight text-faint">{m.label}</p>
          </div>
        ))}
      </div>

      <ul className="mt-6 space-y-3">
        {shown.map((point) => (
          <li key={point.slice(0, 40)} className="flex items-start gap-3 text-sm leading-relaxed text-mute">
            <span aria-hidden className="mt-[9px] h-1 w-3 shrink-0 rounded-full bg-accent-500/60" />
            <span>{point}</span>
          </li>
        ))}
      </ul>

      {expanded && job.extra && (
        <div className="mt-6 border-t border-line pt-5">
          <h4 className="mb-3 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-faint">
            <Sparkles size={13} aria-hidden className="text-accent-text" /> {job.extraTitle}
          </h4>
          <ul className="space-y-2.5">
            {job.extra.map((item) => (
              <li key={item.slice(0, 40)} className="flex items-start gap-3 text-sm leading-relaxed text-mute">
                <span aria-hidden className="mt-[9px] h-1 w-3 shrink-0 rounded-full bg-alt/50" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {expanded && job.projects && (
        <div className="mt-6 border-t border-line pt-5">
          <h4 className="mb-3 text-[11px] font-semibold uppercase tracking-wider text-faint">{job.extraTitle}</h4>
          <div className="grid gap-3 sm:grid-cols-2">
            {job.projects.map((proj) => (
              <div key={proj.name} className="rounded-xl border border-line bg-raised p-3.5">
                <p className="text-sm font-semibold">{proj.name}</p>
                <p className="mt-1 text-xs text-accent-text">{proj.metric}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="mt-6 flex flex-wrap items-center gap-2">
        {job.stack.map((s) => (
          <Tag key={s}>{s}</Tag>
        ))}
      </div>

      {(hidden > 0 || job.extra || job.projects) && (
        <button
          onClick={() => setExpanded((e) => !e)}
          aria-expanded={expanded}
          className="mt-5 inline-flex items-center gap-1.5 text-xs font-semibold text-accent-text transition-opacity hover:opacity-80"
        >
          {expanded ? 'Show less' : `Full case study${hidden > 0 ? ` (+${hidden} highlights)` : ''}`}
          <ChevronDown size={14} aria-hidden className={cx('transition-transform', expanded && 'rotate-180')} />
        </button>
      )}
    </article>
  );
}

export function Experience() {
  return (
    <Section
      id="experience"
      eyebrow="Career"
      title="Nine years, three chapters — engineer to AI product owner."
      intro="Each role treated as a case study: the scope, the numbers, and what actually shipped."
    >
      <div className="relative space-y-6">
        <div aria-hidden className="absolute bottom-6 left-[13px] top-2 hidden w-px bg-gradient-to-b from-accent-500/40 via-line to-transparent md:block" />
        {EXPERIENCE.map((job, idx) => (
          <Reveal key={job.company} delay={idx * 60}>
            <RoleCard job={job} />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
