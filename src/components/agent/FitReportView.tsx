import { Link } from 'react-router';
import { AlertTriangle, ArrowRight, CheckCircle2, MapPin, HelpCircle, Play } from 'lucide-react';
import { trackEvent } from '../../lib/analytics';
import type { FitReport } from '../../lib/hiring/engine';
import type { Evidence } from '../../lib/hiring/evidence';
import { cx } from '../../lib/utils';
import { useUi } from '../../site/ui-state';
import { LevelBadge, ScoreRing } from './ScoreRing';

function EvidenceChip({ e }: { e: Evidence }) {
  const { playDemo } = useUi();
  if (e.demo && e.kind === 'Demo') {
    return (
      <button
        type="button"
        onClick={() => playDemo(e.demo!, 'agent_report')}
        className="chip !py-0.5 transition-transform hover:-translate-y-px hover:text-ink"
      >
        <Play size={11} aria-hidden className="text-tone-pink" fill="currentColor" /> {e.title}
      </button>
    );
  }
  return (
    <Link
      to={e.href}
      onClick={() => trackEvent('agent_action', { action: 'open_proof' })}
      className="chip !py-0.5 no-underline transition-transform hover:-translate-y-px hover:text-ink"
    >
      {e.title}
    </Link>
  );
}

export function FitReportView({ report }: { report: FitReport }) {
  const { playDemo } = useUi();
  const where = [report.role.company, report.role.location].filter(Boolean).join(' · ');
  const counts = {
    strong: report.requirements.filter((r) => r.level === 'strong').length,
    partial: report.requirements.filter((r) => r.level === 'partial').length,
    gap: report.requirements.filter((r) => r.level === 'gap').length,
  };

  return (
    <article aria-labelledby="report-title" className="panel relative overflow-hidden !rounded-[2rem]">
      <div aria-hidden className="h-1.5 bg-grad-spectrum" />
      <div className="p-6 sm:p-10">
        <header className="flex flex-col gap-6 sm:flex-row sm:items-center">
          <ScoreRing score={report.score} size={148} label="fit" />
          <div className="min-w-0">
            <p className="t-label">Fit brief · {report.viaLlm ? `AI-assisted (${report.model})` : 'rules engine'}</p>
            <h2 id="report-title" className="t-h2 mt-2 !text-[clamp(1.5rem,1.2rem+1.4vw,2.25rem)]">
              {report.role.title}
            </h2>
            {where && <p className="mt-1 text-[0.9375rem] text-ink-3">{where}</p>}
            <p className="mt-3 flex flex-wrap items-center gap-2">
              <span className="text-grad text-[1.25rem] font-semibold">{report.verdict}</span>
              <span className="text-[0.8125rem] text-ink-3">
                {counts.strong} strong · {counts.partial} partial · {counts.gap} gap
              </span>
            </p>
          </div>
        </header>

        <p className="mt-7 max-w-[70ch] text-[1.0625rem] leading-relaxed text-ink">{report.summary}</p>

        <section aria-labelledby="req-map" className="mt-10">
          <h3 id="req-map" className="t-label">Requirement map</h3>
          <ul className="mt-4 divide-y divide-line overflow-hidden rounded-2xl border border-line">
            {report.requirements.map((r, i) => (
              <li key={`${r.text}-${i}`} className="grid gap-3 bg-bg-2 p-4 md:grid-cols-12 md:gap-5">
                <div className="flex items-start gap-2 md:col-span-2 md:flex-col md:items-start">
                  <LevelBadge level={r.level} />
                  <span className="font-mono text-[0.625rem] uppercase tracking-[0.1em] text-ink-4">{r.priority === 'must' ? 'Must' : 'Nice'}</span>
                </div>
                <div className="min-w-0 md:col-span-5">
                  <p className="text-[0.9375rem] font-medium leading-snug text-ink">{r.text}</p>
                  <p className="mt-1 text-[0.8125rem] leading-snug text-ink-3">{r.basis}</p>
                </div>
                <div className="flex flex-wrap content-start gap-1.5 md:col-span-5 md:justify-end">
                  {r.evidence.length ? r.evidence.map((e) => <EvidenceChip key={e.id} e={e} />) : <span className="text-[0.8125rem] text-ink-4">No evidence in the record</span>}
                </div>
              </li>
            ))}
          </ul>
        </section>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <section aria-labelledby="strengths" className="rounded-2xl bg-tone-emerald/[0.07] p-5 ring-1 ring-inset ring-tone-emerald/20">
            <h3 id="strengths" className="flex items-center gap-2 text-[0.9375rem] font-semibold text-ink">
              <CheckCircle2 size={17} aria-hidden className="text-tone-emerald" /> Why he fits
            </h3>
            <ul className="prose-case mt-3 text-[0.9375rem]">
              {report.strengths.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </section>
          <section aria-labelledby="gaps" className="rounded-2xl bg-tone-amber/[0.08] p-5 ring-1 ring-inset ring-tone-amber/25">
            <h3 id="gaps" className="flex items-center gap-2 text-[0.9375rem] font-semibold text-ink">
              <AlertTriangle size={17} aria-hidden className="text-tone-amber" /> Honest gaps
            </h3>
            {report.gaps.length ? (
              <ul className="prose-case mt-3 text-[0.9375rem]">
                {report.gaps.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            ) : (
              <p className="mt-3 text-[0.9375rem] text-ink-2">None found against this description.</p>
            )}
            {report.logistics.map((l) => (
              <p key={l} className="mt-3 flex gap-2 text-[0.875rem] text-ink-2">
                <MapPin size={15} aria-hidden className="mt-0.5 shrink-0 text-tone-violet" /> {l}
              </p>
            ))}
          </section>
        </div>

        <section aria-labelledby="questions" className="mt-6 rounded-2xl bg-bg-3/60 p-5 ring-1 ring-inset ring-line">
          <h3 id="questions" className="flex items-center gap-2 text-[0.9375rem] font-semibold text-ink">
            <HelpCircle size={17} aria-hidden className="text-tone-violet" /> Questions worth asking him
          </h3>
          <ol className="mt-3 grid gap-2 text-[0.9375rem] text-ink-2">
            {report.questions.map((q, i) => (
              <li key={q} className="flex gap-3">
                <span className="text-grad font-mono text-[0.8125rem] font-semibold">0{i + 1}</span>
                {q}
              </li>
            ))}
          </ol>
        </section>

        {report.proof.length > 0 && (
          <section aria-labelledby="proof" className="mt-10">
            <h3 id="proof" className="t-label">Proof to look at first</h3>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {report.proof.map((e) => {
                const isDemo = e.demo && e.kind === 'Demo';
                const body = (
                  <>
                    <span className="flex items-center justify-between gap-3">
                      <span className="font-mono text-[0.625rem] uppercase tracking-[0.1em] text-ink-3">{e.kind}</span>
                      {isDemo ? <Play size={14} aria-hidden className="text-tone-pink" fill="currentColor" /> : <ArrowRight size={15} aria-hidden className="text-tone-pink transition-transform group-hover:translate-x-0.5" />}
                    </span>
                    <span className="mt-2 block font-semibold text-ink">{e.title}</span>
                    <span className="mt-1 block text-[0.875rem] leading-snug text-ink-3">{e.detail}</span>
                  </>
                );
                const cls = cx('panel card-lift group block h-full p-4 text-left no-underline');
                return (
                  <li key={e.id}>
                    {isDemo ? (
                      <button type="button" onClick={() => playDemo(e.demo!, 'agent_proof')} className={cx(cls, 'w-full')}>
                        {body}
                      </button>
                    ) : (
                      <Link to={e.href} onClick={() => trackEvent('agent_action', { action: 'open_proof' })} className={cls}>
                        {body}
                      </Link>
                    )}
                  </li>
                );
              })}
            </ul>
          </section>
        )}

        <p className="mt-8 text-[0.8125rem] leading-relaxed text-ink-3">
          Scores are computed deterministically from his verified record, so the same description always gets the same score.
          {report.viaLlm ? ' The write-up is AI-assisted and grounded only in that record.' : ' The write-up comes from templates.'} Verify anything
          important with Ashfaque directly.
        </p>
      </div>
    </article>
  );
}
