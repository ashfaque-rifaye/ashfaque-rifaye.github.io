import type { CSSProperties } from 'react';

export const cx = (...a: Array<string | false | null | undefined>): string =>
  a.filter(Boolean).join(' ');

export const prefersReducedMotion = (): boolean =>
  typeof window !== 'undefined' &&
  !!window.matchMedia &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/** Inline CSS custom properties, typed (e.g. vars({ '--d': '120ms' })). */
export const vars = (v: Record<`--${string}`, string | number>): CSSProperties => v as CSSProperties;

/** Save generated text as a file (browser only). */
export function downloadText(filename: string, content: string, mime = 'text/plain'): void {
  const url = URL.createObjectURL(new Blob([content], { type: `${mime};charset=utf-8` }));
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 2000);
}

/** Trigger a same-origin file download (résumé etc.). */
export function downloadUrl(href: string, filename = ''): void {
  const a = document.createElement('a');
  a.href = href;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
}

export async function copyText(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}

/** sessionStorage that never throws (private mode, blocked storage). */
export const session = {
  get<T>(key: string): T | null {
    try {
      const raw = sessionStorage.getItem(key);
      return raw ? (JSON.parse(raw) as T) : null;
    } catch {
      return null;
    }
  },
  set(key: string, value: unknown): void {
    try {
      sessionStorage.setItem(key, JSON.stringify(value));
    } catch {
      /* ignore */
    }
  },
};

export const slugify = (s: string) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 60) || 'role';
