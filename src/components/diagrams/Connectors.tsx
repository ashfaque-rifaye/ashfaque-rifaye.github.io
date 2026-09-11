import type { CSSProperties } from 'react';
import { cx } from '../../lib/utils';

/* Hairline arrows used between diagram nodes. `pathLength={1}` lets the
   .draw class animate any path with a single dash value. */

const delay = (i: number) => ({ '--delay': `${160 + i * 140}ms` }) as CSSProperties;

/** Arrow placed in a 2.5rem horizontal gap (lg and up). */
export function ArrowRightGap({ index = 0, className }: { index?: number; className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 40 12"
      fill="none"
      style={delay(index)}
      className={cx('pointer-events-none absolute -right-10 top-1/2 hidden h-3 w-10 -translate-y-1/2 text-ink-4 lg:block', className)}
    >
      <path className="draw" pathLength={1} d="M3 6H36" stroke="currentColor" />
      <path className="draw" pathLength={1} d="M31 2l5 4-5 4" stroke="currentColor" />
    </svg>
  );
}

/** Arrow placed in a 2rem vertical gap (below lg, or always with `always`). */
export function ArrowDownGap({
  index = 0,
  className,
  always = false,
}: {
  index?: number;
  className?: string;
  always?: boolean;
}) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 12 32"
      fill="none"
      style={delay(index)}
      className={cx('pointer-events-none absolute -bottom-8 h-8 w-3 text-ink-4', !always && 'lg:hidden', className)}
    >
      <path className="draw" pathLength={1} d="M6 3V28" stroke="currentColor" />
      <path className="draw" pathLength={1} d="M2 23l4 5 4-5" stroke="currentColor" />
    </svg>
  );
}
