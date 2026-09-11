import { prefersReducedMotion } from '../lib/utils';

export type Theme = 'light' | 'dark';

const THEME_COLOR: Record<Theme, string> = { light: '#f9f9fc', dark: '#0d0e17' };

/** The theme the inline script in index.html applied before first paint. */
export function readTheme(): Theme {
  if (typeof document === 'undefined') return 'dark';
  return document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
}

/** Switch theme, remember the choice, and cross-fade colours briefly. */
export function applyTheme(theme: Theme): void {
  const root = document.documentElement;
  const fade = !prefersReducedMotion();
  if (fade) root.classList.add('theme-transition');
  root.setAttribute('data-theme', theme);
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', THEME_COLOR[theme]);
  try {
    localStorage.setItem('theme', theme);
  } catch {
    /* private mode: the choice lasts for this page only */
  }
  if (fade) window.setTimeout(() => root.classList.remove('theme-transition'), 460);
}
