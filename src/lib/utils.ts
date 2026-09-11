import type { CSSProperties } from 'react';

export const cx = (...a: Array<string | false | null | undefined>): string =>
  a.filter(Boolean).join(' ');

export const prefersReducedMotion = (): boolean =>
  typeof window !== 'undefined' &&
  !!window.matchMedia &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/** Inline CSS custom properties, typed (e.g. vars({ '--d': '120ms' })). */
export const vars = (v: Record<`--${string}`, string | number>): CSSProperties => v as CSSProperties;
