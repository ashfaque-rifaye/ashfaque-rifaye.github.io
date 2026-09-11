import { useMemo } from 'react';
import { CalendarPlus, FileSearch, Gauge, Mail, ScanSearch, Sparkles, Wand2 } from 'lucide-react';
import { analyzeLocally } from '../../lib/hiring/engine';
import { SAMPLE_ROLES } from '../../lib/hiring/samples';
import { useUi } from '../../site/ui-state';
import { LevelBadge, ScoreRing } from '../agent/ScoreRing';
import { ButtonLink } from '../ui/Links';
import { Reveal } from '../ui/Reveal';

const STEPS = [
  { icon: FileSearch, title: 'Reads your job description', line: 'An LLM extracts each requirement into a fixed skills vocabulary.' },
  { icon: ScanSearch, title: 'Maps it to evidence', line: 'Every requirement is matched to proof from my verified record.' },
  { icon: Gauge, title: 'Scores the fit, honestly', line: 'Deterministic, explainable scoring. Gaps are shown, not hidden.' },
  { icon: Mail, title: 'Drafts the next step', line: 'An outreach email, a calendar invite and a brief, for you to approve.' },
];

/** Home-page introduction to the Hiring Agent, with real (rules-engine) output. */
export function AgentTeaser() {
  const { runHiringAgent } = useUi();
  const sample = SAMPLE_ROLES[0];
  const preview = useMemo(() => analyzeLocally(sample.jd), [sample.jd]);

  return (
    <section aria-labelledby="agent-title" className="section pt-0">
      <div className="wrap">
        <div className="relative overflow-hidden rounded-[2rem] border border-line bg-bg-2 p-6 shadow-card sm:p-10 lg:p-14">
          <div aria-hidden className="mesh mesh-soft">
            <i />
            <i />
            <i />
            <i />
          </div>
          <div className="relative grid gap-12 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-6">
              <p className="chip">
                <Sparkles size={14} aria-hidden className="text-tone-pink" /> An AI agent that does the legwork
              </p>
              <h2 id="agent-title" className="t-h2 mt-5">
                Hand my <span className="text-grad">Hiring Agent</span> your job description.
              </h2>
              <p className="t-lead mt-5">
                It reads the role, maps every requirement to evidence from my work, scores the fit honestly, then drafts your
                outreach email and a calendar invite. You approve every action.
              </p>
              <ol className="mt-8 grid gap-4 sm:grid-cols-2">
                {STEPS.map((s, i) => (
                  <li key={s.title} className="flex gap-3">
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-bg ring-1 ring-line">
                      <s.icon size={17} aria-hidden className="text-tone-violet" />
                    </span>
                    <span>
                      <span className="block text-[0.9375rem] font-semibold text-ink">
                        <span className="text-grad mr-1.5 font-mono text-[0.75rem]">0{i + 1}</span>
                        {s.title}
                      </span>
                      <span className="mt-0.5 block text-[0.875rem] leading-snug text-ink-3">{s.line}</span>
                    </span>
                  </li>
                ))}
              </ol>
              <div className="mt-9 flex flex-wrap gap-3">
                <ButtonLink to="/agent/">Try it with your role</ButtonLink>
                <button type="button" onClick={() => runHiringAgent(sample.jd)} className="btn btn-secondary">
                  <Wand2 size={16} aria-hidden className="text-tone-violet" />
                  Run a sample role
                </button>
              </div>
            </div>

            <Reveal className="lg:col-span-6">
              <figure className="glass ring-grad rounded-3xl p-5 shadow-lift sm:p-7" style={{ ['--ring-o' as string]: '0.6' }}>
                <figcaption className="flex items-center justify-between gap-3 font-mono text-[0.625rem] uppercase tracking-[0.12em] text-ink-3">
                  <span>Sample output · real engine</span>
                  <span className="inline-flex items-center gap-1.5 text-tone-emerald">
                    <span className="h-1.5 w-1.5 rounded-full bg-tone-emerald" /> 5 of 5 steps done
                  </span>
                </figcaption>
                <div className="mt-5 flex items-center gap-5">
                  <ScoreRing score={preview.score} size={112} label="fit" />
                  <div className="min-w-0">
                    <p className="text-[0.8125rem] text-ink-3">{preview.role.company}</p>
                    <p className="mt-0.5 text-[1.0625rem] font-semibold leading-snug text-ink">{preview.role.title}</p>
                    <p className="text-grad mt-1 text-[0.9375rem] font-semibold">{preview.verdict}</p>
                  </div>
                </div>
                <ul className="mt-6 grid gap-2">
                  {preview.requirements.slice(0, 5).map((r) => (
                    <li key={r.text} className="flex items-start justify-between gap-3 rounded-xl bg-bg/60 px-3 py-2.5 ring-1 ring-line">
                      <span className="min-w-0 text-[0.8125rem] leading-snug text-ink-2">{r.text}</span>
                      <LevelBadge level={r.level} className="shrink-0" />
                    </li>
                  ))}
                </ul>
                <div className="mt-5 flex flex-wrap gap-2 text-[0.8125rem] text-ink-2">
                  <span className="chip">
                    <Mail size={13} aria-hidden className="text-tone-violet" /> Email drafted
                  </span>
                  <span className="chip">
                    <CalendarPlus size={13} aria-hidden className="text-tone-violet" /> Invite ready
                  </span>
                  <span className="chip">
                    <FileSearch size={13} aria-hidden className="text-tone-violet" /> {preview.proof.length} proof links
                  </span>
                </div>
              </figure>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
