export const cx = (...a: Array<string | false | null | undefined>): string =>
  a.filter(Boolean).join(' ');

export const prefersReducedMotion = (): boolean =>
  typeof window !== 'undefined' &&
  !!window.matchMedia &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;
