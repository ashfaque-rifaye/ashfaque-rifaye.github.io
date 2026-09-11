import { CheckCircle2, CircleDashed, Loader2 } from 'lucide-react';
import { STEPS, type StepId, type StepStatus } from '../../lib/hiring/engine';
import { LLM_ENABLED } from '../../lib/llm';
import { cx } from '../../lib/utils';

export type StepState = Record<StepId, { status: StepStatus; detail?: string }>;

export const initialSteps = (): StepState =>
  Object.fromEntries(STEPS.map((s) => [s.id, { status: 'pending' as StepStatus }])) as StepState;

const ENGINE: Record<StepId, 'LLM' | 'Rules'> = { read: 'LLM', match: 'Rules', score: 'Rules', write: 'LLM', act: 'Rules' };

/** The agent's plan, then its live trace: tool, status, what it found. */
export function RunTimeline({ steps, phase }: { steps: StepState; phase: 'idle' | 'running' | 'done' }) {
  return (
    <div className="panel relative overflow-hidden !rounded-3xl p-5 sm:p-6">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-[1rem] font-semibold text-ink" style={{ fontStretch: '106%' }}>
          {phase === 'idle' ? 'The agent’s plan' : phase === 'running' ? 'Working…' : 'Done'}
        </h2>
        <span className="font-mono text-[0.625rem] uppercase tracking-[0.12em] text-ink-3">
          {LLM_ENABLED ? 'LLM + rules' : 'Rules engine'}
        </span>
      </div>
      <ol className="relative mt-5 grid gap-1">
        <span aria-hidden className="absolute bottom-6 left-[15px] top-6 w-px bg-line" />
        {STEPS.map((s) => {
          const st = steps[s.id];
          return (
            <li key={s.id} className="relative flex gap-3.5 py-2.5" aria-current={st.status === 'running' ? 'step' : undefined}>
              <span
                className={cx(
                  'relative z-[1] grid h-8 w-8 shrink-0 place-items-center rounded-full ring-1',
                  st.status === 'done' && 'bg-tone-emerald/12 text-tone-emerald ring-tone-emerald/30',
                  st.status === 'running' && 'bg-grad-cta text-white ring-transparent shadow-glow',
                  st.status === 'pending' && 'bg-bg text-ink-4 ring-line'
                )}
              >
                {st.status === 'done' && <CheckCircle2 size={16} aria-hidden />}
                {st.status === 'running' && <Loader2 size={16} aria-hidden className="animate-spin" />}
                {st.status === 'pending' && <CircleDashed size={16} aria-hidden />}
              </span>
              <div className="min-w-0 flex-1">
                <p className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
                  <span className={cx('text-[0.9375rem] font-semibold', st.status === 'pending' ? 'text-ink-2' : 'text-ink')}>{s.label}</span>
                  <code className="font-mono text-[0.6875rem] text-ink-3">{s.tool}()</code>
                  <span
                    className={cx(
                      'rounded-full px-1.5 py-px font-mono text-[0.5625rem] uppercase tracking-[0.1em]',
                      ENGINE[s.id] === 'LLM' ? 'bg-tone-violet/12 text-tone-violet' : 'bg-bg-3 text-ink-3'
                    )}
                  >
                    {ENGINE[s.id]}
                  </span>
                </p>
                <p className={cx('mt-0.5 text-[0.8125rem] leading-snug', st.status === 'running' ? 'shimmer' : 'text-ink-3')}>
                  {st.detail ?? (st.status === 'running' ? 'In progress' : STEP_HINT[s.id])}
                </p>
              </div>
            </li>
          );
        })}
      </ol>
      <p className="sr-only" aria-live="polite">
        {phase === 'running' ? 'The agent is working.' : phase === 'done' ? 'The agent has finished. The fit brief is below.' : ''}
      </p>
    </div>
  );
}

const STEP_HINT: Record<StepId, string> = {
  read: 'Extract requirements into a fixed skills vocabulary',
  match: 'Find proof for each requirement in the verified record',
  score: 'Weighted, explainable score; must-haves count double',
  write: 'Summarise using only the matched evidence',
  act: 'Draft an email, a calendar invite and a brief',
};
