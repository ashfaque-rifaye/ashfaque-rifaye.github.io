import { Brain, Cog, Lock, ShieldCheck, UserCheck, WifiOff } from 'lucide-react';
import { STEPS } from '../../lib/hiring/engine';
import { EVIDENCE } from '../../lib/hiring/evidence';
import { SKILLS } from '../../lib/hiring/taxonomy';
import { SectionHead } from '../ui/SectionHead';

const ENGINE = { read: 'LLM', match: 'Rules', score: 'Rules', write: 'LLM', act: 'Rules' } as const;
const WHY: Record<string, string> = {
  read: `Language is messy; a model maps it onto a fixed vocabulary of ${SKILLS.length} skills, and nothing outside that vocabulary survives.`,
  match: `A lookup against ${EVIDENCE.length} verified evidence items. No model, so no invented experience.`,
  score: 'Weighted and explainable: must-haves count double, and "or" requirements take the stronger match.',
  write: 'The model sees only the matched evidence and the computed score, which it may not change.',
  act: 'Allowlisted outputs only. The email and invite are drafts you send yourself.',
};

const GUARDRAILS = [
  { icon: ShieldCheck, title: 'Evidence or nothing', line: 'Every claim links to a case study, role or build. Gaps are reported plainly.' },
  { icon: Lock, title: 'Injection-resistant', line: 'The job description is treated as data. Actions come from a fixed allowlist, never from the text.' },
  { icon: UserCheck, title: 'Human in the loop', line: 'Nothing is sent, booked or saved until you click.' },
  { icon: WifiOff, title: 'Graceful without the model', line: 'If the gateway is down, a rules-based reader and template writer take over.' },
];

/** How the Hiring Agent is built, for readers who care about the design. */
export function UnderTheHood() {
  return (
    <section aria-labelledby="hood-title" className="section">
      <div className="wrap">
        <SectionHead
          id="hood-title"
          title={
            <>
              Under the hood: <span className="text-grad-ai">the model perceives, code decides</span>
            </>
          }
          intro="The same principle behind DeviceFlex. The LLM does what only language models can do; everything that decides an outcome is deterministic and replayable."
        />
        <ol className="mt-12 grid gap-4 md:grid-cols-5">
          {STEPS.map((s, i) => {
            const llm = ENGINE[s.id] === 'LLM';
            return (
              <li key={s.id} className={llm ? 'ring-grad rounded-2xl bg-bg-2 p-5' : 'rounded-2xl border border-line bg-bg-2 p-5'} style={llm ? { ['--ring' as string]: 'var(--grad-ai)' } : undefined}>
                <p className="flex items-center justify-between">
                  <span className="text-grad font-mono text-[0.75rem] font-semibold">0{i + 1}</span>
                  <span className={llm ? 'inline-flex items-center gap-1 rounded-full bg-tone-violet/12 px-2 py-0.5 text-[0.6875rem] font-semibold text-tone-violet' : 'inline-flex items-center gap-1 rounded-full bg-bg-3 px-2 py-0.5 text-[0.6875rem] font-semibold text-ink-3'}>
                    {llm ? <Brain size={12} aria-hidden /> : <Cog size={12} aria-hidden />}
                    {llm ? 'LLM' : 'Deterministic'}
                  </span>
                </p>
                <p className="mt-3 font-semibold text-ink">{s.label}</p>
                <code className="mt-1 block font-mono text-[0.6875rem] text-ink-3">{s.tool}()</code>
                <p className="mt-3 text-[0.875rem] leading-snug text-ink-2">{WHY[s.id]}</p>
              </li>
            );
          })}
        </ol>
        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {GUARDRAILS.map((g) => (
            <li key={g.title} className="flex gap-3">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-grad-cta text-white shadow-glow">
                <g.icon size={18} aria-hidden />
              </span>
              <span>
                <span className="block font-semibold text-ink">{g.title}</span>
                <span className="mt-1 block text-[0.875rem] leading-snug text-ink-3">{g.line}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
