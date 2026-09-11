import { useId } from 'react';
import { CheckCircle2, CircleDashed, CircleDot } from 'lucide-react';
import type { Level } from '../../lib/hiring/engine';
import { cx } from '../../lib/utils';

/** Fit score as a gradient ring. */
export function ScoreRing({ score, size = 132, label }: { score: number; size?: number; label?: string }) {
  const gid = `ring-${useId().replace(/:/g, '')}`;
  const r = 52;
  const c = 2 * Math.PI * r;
  return (
    <div className="relative grid shrink-0 place-items-center" style={{ width: size, height: size }}>
      <svg viewBox="0 0 120 120" width={size} height={size} className="-rotate-90" aria-hidden>
        <defs>
          <linearGradient id={gid} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="oklch(var(--g-1))" />
            <stop offset="0.5" stopColor="oklch(var(--g-2))" />
            <stop offset="1" stopColor="oklch(var(--g-3))" />
          </linearGradient>
        </defs>
        <circle cx="60" cy="60" r={r} fill="none" stroke="oklch(var(--line))" strokeWidth="9" />
        <circle
          cx="60"
          cy="60"
          r={r}
          fill="none"
          stroke={`url(#${gid})`}
          strokeWidth="9"
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={c * (1 - Math.max(0, Math.min(100, score)) / 100)}
          style={{ transition: 'stroke-dashoffset 1200ms var(--ease-expo)' }}
        />
      </svg>
      <div className="absolute inset-0 grid place-items-center text-center">
        <div>
          <span className="t-num-sm !bg-none !text-ink" style={{ WebkitTextFillColor: 'currentColor' }}>
            {score}%
          </span>
          {label && <span className="mt-0.5 block font-mono text-[0.625rem] uppercase tracking-[0.12em] text-ink-3">{label}</span>}
        </div>
      </div>
    </div>
  );
}

const LEVEL: Record<Level, { text: string; cls: string; Icon: typeof CheckCircle2 }> = {
  strong: { text: 'Strong', cls: 'bg-tone-emerald/12 text-tone-emerald ring-tone-emerald/30', Icon: CheckCircle2 },
  partial: { text: 'Partial', cls: 'bg-tone-amber/15 text-tone-amber ring-tone-amber/35', Icon: CircleDot },
  gap: { text: 'Gap', cls: 'bg-tone-pink/12 text-tone-pink ring-tone-pink/30', Icon: CircleDashed },
};

export function LevelBadge({ level, className }: { level: Level; className?: string }) {
  const { text, cls, Icon } = LEVEL[level];
  return (
    <span className={cx('inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[0.75rem] font-semibold ring-1 ring-inset', cls, className)}>
      <Icon size={13} aria-hidden />
      {text}
    </span>
  );
}
