import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Cpu, Sparkles, Target, TrendingUp, X } from 'lucide-react';
import type { WorkItem } from '../data/types';
import { useBodyScrollLock } from '../lib/hooks';
import { Tag } from './ui';

export function CaseStudyModal({ item, onClose }: { item: WorkItem | null; onClose: () => void }) {
  useBodyScrollLock(!!item);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!item) return undefined;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [item, onClose]);

  if (!item) return null;
  const cs = item.caseStudy;

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${item.title} case study`}
      className="fixed inset-0 z-[90] flex items-end justify-center sm:items-center sm:p-4"
    >
      <div className="absolute inset-0 animate-fade-in bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative max-h-[92vh] w-full max-w-2xl animate-scale-in overflow-y-auto rounded-t-2xl border border-line bg-surface shadow-lift sm:rounded-2xl">
        {/* header */}
        <div className="relative overflow-hidden border-b border-line p-6 md:p-8">
          <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_120%_at_90%_0%,rgb(var(--accent-500)/0.14),transparent_60%)]" />
          <button
            ref={closeRef}
            onClick={onClose}
            aria-label="Close case study"
            className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full border border-line bg-surface/80 text-mute transition-colors hover:text-ink"
          >
            <X size={16} aria-hidden />
          </button>
          <span className="relative inline-grid h-12 w-12 place-items-center rounded-xl bg-accent-500/10 text-accent-text">
            <item.icon size={24} aria-hidden />
          </span>
          {item.badge && (
            <span className="relative ml-3 inline-flex items-center rounded-full border border-accent-500/25 bg-accent-500/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-accent-text">
              {item.badge}
            </span>
          )}
          <h3 className="relative mt-4 text-2xl font-semibold tracking-tight">{item.title}</h3>
          <p className="relative mt-1 text-sm font-medium text-accent-text">{cs.role}</p>
        </div>

        {/* metrics */}
        <div className="grid grid-cols-2 gap-px border-b border-line bg-line/60 sm:grid-cols-4">
          {cs.metrics.map((m) => (
            <div key={m.label} className="bg-surface p-4 text-center">
              <p className="text-lg font-semibold tabular-nums tracking-tight">{m.value}</p>
              <p className="mt-0.5 text-[11px] text-faint">{m.label}</p>
            </div>
          ))}
        </div>

        {/* body */}
        <div className="space-y-6 p-6 md:p-8">
          <div>
            <h4 className="mb-1.5 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-faint">
              <Target size={13} aria-hidden className="text-accent-text" /> The problem
            </h4>
            <p className="text-sm leading-relaxed text-mute">{cs.problem}</p>
          </div>
          <div>
            <h4 className="mb-1.5 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-faint">
              <Sparkles size={13} aria-hidden className="text-accent-text" /> The approach
            </h4>
            <p className="text-sm leading-relaxed text-mute">{cs.approach}</p>
          </div>
          {cs.outcome && (
            <div>
              <h4 className="mb-1.5 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-faint">
                <TrendingUp size={13} aria-hidden className="text-accent-text" /> The outcome
              </h4>
              <p className="text-sm leading-relaxed text-mute">{cs.outcome}</p>
            </div>
          )}
          <div>
            <h4 className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-faint">
              <Cpu size={13} aria-hidden className="text-accent-text" /> Stack &amp; methods
            </h4>
            <div className="flex flex-wrap gap-2">
              {cs.stack.map((s) => (
                <Tag key={s} accent>{s}</Tag>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
