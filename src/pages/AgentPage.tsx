import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router';
import { Eraser, Lock, Sparkles, Wand2 } from 'lucide-react';
import { AgentActions } from '../components/agent/AgentActions';
import { FitReportView } from '../components/agent/FitReportView';
import { initialSteps, RunTimeline, type StepState } from '../components/agent/RunTimeline';
import { UnderTheHood } from '../components/agent/UnderTheHood';
import { PageHeader } from '../components/layout/PageHeader';
import { HireCta } from '../components/sections/HireCta';
import { trackEvent } from '../lib/analytics';
import { runAgent, type FitReport } from '../lib/hiring/engine';
import { SAMPLE_ROLES } from '../lib/hiring/samples';
import { cx, prefersReducedMotion } from '../lib/utils';
import type { AgentHandoff } from '../site/ui-state';

type Phase = 'idle' | 'running' | 'done';
type Source = 'paste' | 'sample' | 'chat' | 'link';

export function AgentPage() {
  const location = useLocation();
  const [jd, setJd] = useState('');
  const [phase, setPhase] = useState<Phase>('idle');
  const [steps, setSteps] = useState<StepState>(initialSteps);
  const [report, setReport] = useState<FitReport | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [runCount, setRunCount] = useState(0);
  const runId = useRef(0);
  const reportRef = useRef<HTMLDivElement>(null);

  const run = async (text: string, source: Source) => {
    const trimmed = text.trim();
    if (trimmed.length < 80) {
      setError('Paste a fuller job description, a few lines at least, so there are requirements to match.');
      return;
    }
    const id = ++runId.current;
    setError(null);
    setReport(null);
    setSteps(initialSteps());
    setPhase('running');
    trackEvent('agent_run_started', { source, jd_length: trimmed.length });
    const t0 = performance.now();
    try {
      const result = await runAgent(
        trimmed,
        (step, status, detail) => {
          if (runId.current === id) setSteps((s) => ({ ...s, [step]: { status, detail } }));
        },
        { pacing: prefersReducedMotion() ? 0 : 420 }
      );
      if (runId.current !== id) return;
      if (result.requirements.length === 0) {
        setError("I couldn't find requirements in that text. Paste the responsibilities and qualifications sections of the posting.");
        setPhase('idle');
        return;
      }
      setReport(result);
      setRunCount((n) => n + 1);
      setPhase('done');
      trackEvent('agent_run_completed', {
        fit_score: result.score,
        requirements: result.requirements.length,
        via_llm: result.viaLlm ? 'yes' : 'no',
        duration_ms: Math.round(performance.now() - t0),
      });
    } catch {
      if (runId.current !== id) return;
      setError('The agent hit an unexpected error. Please try again.');
      setPhase('idle');
    }
  };

  /* Hand-offs from the AI Twin, the palette or a "sample role" button. */
  useEffect(() => {
    const state = location.state as AgentHandoff | null;
    if (!state?.jd) return;
    setJd(state.jd);
    if (state.autorun) void run(state.jd, state.source === 'chat' ? 'chat' : 'link');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.key]);

  useEffect(() => {
    if (report) window.setTimeout(() => reportRef.current?.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth', block: 'start' }), 120);
  }, [report]);

  return (
    <>
      <PageHeader
        title={
          <>
            Hiring <span className="text-grad">Agent</span>
          </>
        }
        lede="Paste a job description. The agent reads the role, maps every requirement to evidence from my work, scores the fit honestly, then drafts your outreach email and a calendar invite. You approve every action."
      >
        <p className="chip">
          <Sparkles size={14} aria-hidden className="text-tone-pink" /> Built as a product demo: an agent with tools, guardrails and a human in the loop
        </p>
      </PageHeader>

      <section aria-label="Run the agent" className="wrap no-print">
        <div className="grid gap-6 lg:grid-cols-12">
          <form
            className="panel !rounded-3xl p-5 sm:p-6 lg:col-span-7"
            onSubmit={(e) => {
              e.preventDefault();
              void run(jd, 'paste');
            }}
          >
            <div className="flex items-center justify-between gap-3">
              <label htmlFor="jd" className="text-[1rem] font-semibold text-ink" style={{ fontStretch: '106%' }}>
                Job description
              </label>
              <span className="font-mono text-[0.6875rem] text-ink-4">{jd.length.toLocaleString()} / 8,000</span>
            </div>
            <textarea
              id="jd"
              value={jd}
              onChange={(e) => setJd(e.target.value.slice(0, 8000))}
              placeholder={'Paste the full posting: title, responsibilities, requirements…'}
              className="mt-3 min-h-[16rem] w-full resize-y rounded-2xl border border-line bg-bg px-4 py-3.5 text-[0.9375rem] leading-relaxed text-ink outline-none transition-colors placeholder:text-ink-4 focus:border-tone-violet"
              aria-describedby="jd-help"
            />
            <div className="mt-4">
              <p className="font-mono text-[0.625rem] uppercase tracking-[0.12em] text-ink-3">Or try a sample role</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {SAMPLE_ROLES.map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    disabled={phase === 'running'}
                    onClick={() => {
                      setJd(s.jd);
                      void run(s.jd, 'sample');
                    }}
                    className="chip min-h-9 transition-transform hover:-translate-y-px hover:text-ink disabled:opacity-50"
                  >
                    <Wand2 size={13} aria-hidden className="text-tone-violet" />
                    {s.label}
                  </button>
                ))}
              </div>
            </div>
            {error && (
              <p role="alert" className="mt-4 rounded-xl bg-tone-pink/10 px-4 py-3 text-[0.875rem] text-ink ring-1 ring-inset ring-tone-pink/30">
                {error}
              </p>
            )}
            <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
              <p id="jd-help" className="flex max-w-md items-start gap-2 text-[0.8125rem] leading-snug text-ink-3">
                <Lock size={14} aria-hidden className="mt-0.5 shrink-0" />
                The text goes to the site&rsquo;s AI gateway only to read the requirements and write the brief. Nothing is stored.
              </p>
              <div className="flex gap-2">
                {jd && phase !== 'running' && (
                  <button
                    type="button"
                    onClick={() => {
                      setJd('');
                      setReport(null);
                      setPhase('idle');
                      setSteps(initialSteps());
                      setError(null);
                    }}
                    className="btn btn-secondary !min-h-11 !px-3.5"
                    aria-label="Clear"
                  >
                    <Eraser size={16} aria-hidden />
                  </button>
                )}
                <button type="submit" disabled={phase === 'running'} className={cx('btn btn-primary !min-h-11', phase === 'running' && 'cursor-wait opacity-80')}>
                  <Sparkles size={16} aria-hidden />
                  {phase === 'running' ? 'Agent working…' : phase === 'done' ? 'Run again' : 'Run the agent'}
                </button>
              </div>
            </div>
          </form>

          <div className="lg:col-span-5">
            <RunTimeline steps={steps} phase={phase} />
          </div>
        </div>
      </section>

      {report && (
        <div ref={reportRef} className="wrap mt-10 grid scroll-mt-28 gap-6">
          <FitReportView report={report} />
          <div className="no-print">
            <AgentActions key={runCount} report={report} />
          </div>
        </div>
      )}

      <div className="no-print">
        <UnderTheHood />
        <HireCta location="agent" />
      </div>
    </>
  );
}
