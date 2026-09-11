import { useEffect, useMemo, useState } from 'react';
import { CalendarPlus, Check, Copy, FileDown, Mail, Printer } from 'lucide-react';
import { mailtoHref } from '../../lib/actions';
import { trackEvent } from '../../lib/analytics';
import { briefMarkdown, buildIcs, draftEmail, proposeSlots, type FitReport, type Slot, type Visitor } from '../../lib/hiring/engine';
import { copyText, cx, downloadText, slugify } from '../../lib/utils';

const field =
  'w-full rounded-xl border border-line bg-bg px-3.5 py-2.5 text-[0.9375rem] text-ink outline-none transition-colors placeholder:text-ink-4 focus:border-tone-violet';

/** Step 5, human in the loop: nothing is sent or saved without a click. */
export function AgentActions({ report }: { report: FitReport }) {
  const [visitor, setVisitor] = useState<Visitor>({ name: '', company: report.role.company ?? '' });
  const slots = useMemo(() => proposeSlots(), []);
  const [slot, setSlot] = useState<Slot | null>(null);
  const [edited, setEdited] = useState(false);
  const [draft, setDraft] = useState(() => draftEmail(report, visitor));
  const [copied, setCopied] = useState<string | null>(null);

  // Keep the draft in step with the inputs until the visitor edits it by hand.
  useEffect(() => {
    if (!edited) setDraft(draftEmail(report, visitor, slot ?? undefined));
  }, [report, visitor, slot, edited]);

  const flash = (key: string) => {
    setCopied(key);
    window.setTimeout(() => setCopied(null), 1600);
  };
  const file = slugify(`${report.role.title}${report.role.company ? `-${report.role.company}` : ''}`);

  return (
    <section aria-labelledby="actions-title" className="panel !rounded-[2rem] p-6 sm:p-10">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="t-label">Step 5 · you approve every action</p>
          <h2 id="actions-title" className="t-h3 mt-2">
            Take the next step
          </h2>
        </div>
        <div className="grid w-full gap-3 sm:w-auto sm:grid-cols-2">
          <label className="grid gap-1 text-[0.8125rem] text-ink-3">
            Your name
            <input className={field} value={visitor.name} onChange={(e) => setVisitor((v) => ({ ...v, name: e.target.value }))} placeholder="Alex Morgan" autoComplete="name" />
          </label>
          <label className="grid gap-1 text-[0.8125rem] text-ink-3">
            Company
            <input className={field} value={visitor.company} onChange={(e) => setVisitor((v) => ({ ...v, company: e.target.value }))} placeholder="Company" autoComplete="organization" />
          </label>
        </div>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-12">
        {/* Email */}
        <div className="rounded-2xl border border-line bg-bg p-5 lg:col-span-7">
          <h3 className="flex items-center gap-2 text-[0.9375rem] font-semibold text-ink">
            <Mail size={17} aria-hidden className="text-tone-violet" /> Outreach email to Ashfaque
          </h3>
          <label className="mt-4 grid gap-1 text-[0.8125rem] text-ink-3">
            Subject
            <input
              className={field}
              value={draft.subject}
              onChange={(e) => {
                setEdited(true);
                setDraft((d) => ({ ...d, subject: e.target.value }));
              }}
            />
          </label>
          <label className="mt-3 grid gap-1 text-[0.8125rem] text-ink-3">
            Message
            <textarea
              className={cx(field, 'min-h-[13rem] resize-y leading-relaxed')}
              value={draft.body}
              onChange={(e) => {
                setEdited(true);
                setDraft((d) => ({ ...d, body: e.target.value }));
              }}
            />
          </label>
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <a
              href={mailtoHref(draft.subject, draft.body)}
              onClick={() => trackEvent('agent_action', { action: 'email' })}
              className="btn btn-primary !min-h-11"
            >
              <Mail size={16} aria-hidden /> Open in your email app
            </a>
            <button
              type="button"
              onClick={async () => {
                if (await copyText(`Subject: ${draft.subject}\n\n${draft.body}`)) flash('email');
                trackEvent('agent_action', { action: 'copy' });
              }}
              className="btn btn-secondary !min-h-11"
            >
              {copied === 'email' ? <Check size={16} aria-hidden /> : <Copy size={16} aria-hidden />}
              {copied === 'email' ? 'Copied' : 'Copy'}
            </button>
            {edited && (
              <button type="button" onClick={() => setEdited(false)} className="text-[0.8125rem] text-ink-3 underline underline-offset-4 hover:text-ink">
                Reset to draft
              </button>
            )}
          </div>
        </div>

        <div className="grid content-start gap-6 lg:col-span-5">
          {/* Calendar */}
          <div className="rounded-2xl border border-line bg-bg p-5">
            <h3 className="flex items-center gap-2 text-[0.9375rem] font-semibold text-ink">
              <CalendarPlus size={17} aria-hidden className="text-tone-violet" /> Book a 30-minute intro
            </h3>
            <p className="mt-1 text-[0.8125rem] text-ink-3">Times shown in your time zone; he works IST (UTC+5:30).</p>
            <div role="radiogroup" aria-label="Proposed times" className="mt-4 grid grid-cols-2 gap-2">
              {slots.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  role="radio"
                  aria-checked={slot?.id === s.id}
                  onClick={() => setSlot(s)}
                  className={cx(
                    'rounded-xl border px-3 py-2 text-left text-[0.8125rem] leading-tight transition-colors',
                    slot?.id === s.id ? 'border-transparent bg-grad-cta text-white shadow-glow' : 'border-line bg-bg-2 text-ink-2 hover:border-tone-violet/50'
                  )}
                >
                  <span className="block font-semibold">{s.label}</span>
                  <span className={cx('mt-0.5 block font-mono text-[0.625rem]', slot?.id === s.id ? 'text-white/80' : 'text-ink-4')}>{s.ist} IST</span>
                </button>
              ))}
            </div>
            <button
              type="button"
              disabled={!slot}
              onClick={() => {
                if (!slot) return;
                downloadText(`intro-call-${file}.ics`, buildIcs(report, slot, visitor), 'text/calendar');
                trackEvent('agent_action', { action: 'ics' });
              }}
              className="btn btn-secondary mt-4 w-full !min-h-11 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <CalendarPlus size={16} aria-hidden /> {slot ? 'Download calendar invite' : 'Pick a time first'}
            </button>
            {slot && <p className="mt-2 text-[0.75rem] text-ink-3">The time is also added to your email draft.</p>}
          </div>

          {/* Brief */}
          <div className="rounded-2xl border border-line bg-bg p-5">
            <h3 className="flex items-center gap-2 text-[0.9375rem] font-semibold text-ink">
              <FileDown size={17} aria-hidden className="text-tone-violet" /> Keep the brief
            </h3>
            <div className="mt-4 grid gap-2 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
              <button
                type="button"
                onClick={() => {
                  downloadText(`fit-brief-${file}.md`, briefMarkdown(report), 'text/markdown');
                  trackEvent('agent_action', { action: 'brief_md' });
                }}
                className="btn btn-secondary !min-h-11 !px-3"
              >
                <FileDown size={16} aria-hidden /> Markdown
              </button>
              <button
                type="button"
                onClick={() => {
                  trackEvent('agent_action', { action: 'print' });
                  window.print();
                }}
                className="btn btn-secondary !min-h-11 !px-3"
              >
                <Printer size={16} aria-hidden /> PDF
              </button>
              <button
                type="button"
                onClick={async () => {
                  if (await copyText(`${report.role.title}: ${report.score}% (${report.verdict})\n\n${report.summary}`)) flash('summary');
                  trackEvent('agent_action', { action: 'copy' });
                }}
                className="btn btn-secondary !min-h-11 !px-3"
              >
                {copied === 'summary' ? <Check size={16} aria-hidden /> : <Copy size={16} aria-hidden />}
                {copied === 'summary' ? 'Copied' : 'Summary'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
