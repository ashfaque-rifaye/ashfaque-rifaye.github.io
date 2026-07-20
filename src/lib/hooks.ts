import { useCallback, useEffect, useRef, useState } from 'react';
import { trackEvent } from './analytics';
import { prefersReducedMotion } from './utils';

export function useTheme() {
  const [theme, setTheme] = useState<'light' | 'dark'>(() =>
    typeof document !== 'undefined' && document.documentElement.classList.contains('dark') ? 'dark' : 'light'
  );
  const toggle = useCallback(() => {
    setTheme((prev) => {
      const next = prev === 'dark' ? 'light' : 'dark';
      document.documentElement.classList.add('theme-transition');
      document.documentElement.classList.toggle('dark', next === 'dark');
      try { localStorage.setItem('theme', next); } catch { /* private mode */ }
      trackEvent('toggle_theme', { mode: next });
      window.setTimeout(() => document.documentElement.classList.remove('theme-transition'), 450);
      return next;
    });
  }, []);
  return { theme, toggle };
}

/** Top reading-progress bar. */
export function useScrollProgress(): number {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(h > 0 ? Math.min(window.scrollY / h, 1) : 0);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return progress;
}

/** Which section id currently dominates the viewport (for nav highlight).
    Also fires a one-time GA section_view per section. */
export function useScrollSpy(ids: string[]): string {
  const [active, setActive] = useState(ids[0] ?? '');
  const seen = useRef(new Set<string>());
  useEffect(() => {
    const els = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (els.length === 0) return undefined;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            setActive(id);
            if (!seen.current.has(id)) {
              seen.current.add(id);
              trackEvent('section_view', { section_name: id });
            }
          }
        });
      },
      // A slim horizontal band ~1/3 down the viewport decides the active section.
      { rootMargin: '-30% 0px -60% 0px' }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [ids]);
  return active;
}

/** Fire scroll-depth GA events once per threshold. */
export function useScrollDepthTracking(): void {
  useEffect(() => {
    const fired = new Set<number>();
    const onScroll = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      if (h <= 0) return;
      const pct = Math.round((window.scrollY / h) * 100);
      ([25, 50, 75, 90] as const).forEach((t) => {
        if (pct >= t && !fired.has(t)) {
          fired.add(t);
          trackEvent('scroll_depth', { percent: t });
        }
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
}

/** Count-up that starts when the element scrolls into view.
    Parses "$4.2M+" into prefix / number / suffix and animates the number. */
export function useCountUp(value: string, duration = 1400) {
  const ref = useRef<HTMLElement | null>(null);
  const [display, setDisplay] = useState(value);
  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    const match = String(value).match(/^(\D*)([\d.]+)(.*)$/);
    if (!match || prefersReducedMotion()) {
      setDisplay(value);
      return undefined;
    }
    const [, prefix, numStr, suffix] = match;
    const target = parseFloat(numStr);
    const decimals = (numStr.split('.')[1] || '').length;
    let raf = 0;
    let started = false;
    const run = () => {
      const start = performance.now();
      const tick = (now: number) => {
        const p = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        setDisplay(`${prefix}${(target * eased).toFixed(decimals)}${suffix}`);
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    };
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && !started) {
            started = true;
            run();
            io.unobserve(el);
          }
        });
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    const failsafe = window.setTimeout(() => { if (!started) setDisplay(value); }, 1800);
    return () => { io.disconnect(); cancelAnimationFrame(raf); clearTimeout(failsafe); };
  }, [value, duration]);
  return [ref, display] as const;
}

/** Lock body scroll while a modal is open. */
export function useBodyScrollLock(locked: boolean): void {
  useEffect(() => {
    if (!locked) return undefined;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prev; };
  }, [locked]);
}
