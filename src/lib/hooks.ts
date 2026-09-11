import { useEffect, useRef, useState, type RefObject } from 'react';
import { trackEvent } from './analytics';
import { prefersReducedMotion } from './utils';

/* Every hook here renders the same markup on the server (prerender) and on
   the first client render; browser-only work happens inside effects. */

/** True once the app has hydrated in the browser. */
export function useHydrated(): boolean {
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => setHydrated(true), []);
  return hydrated;
}

/** True once the page has scrolled past `threshold` px (header state). */
export function useScrolled(threshold = 8): boolean {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [threshold]);
  return scrolled;
}

/** Scroll-in enhancement. Content is visible by default (prerendered HTML);
    only elements that start below the fold are hidden, then revealed once. */
export function useInViewClass<T extends HTMLElement>(kind: 'reveal' | 'draw' = 'reveal') {
  const ref = useRef<T | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion() || typeof IntersectionObserver === 'undefined') return undefined;
    if (el.getBoundingClientRect().top < window.innerHeight * 0.9) return undefined;
    el.classList.add(`${kind}-pending`);
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting)) return;
        io.disconnect();
        el.classList.replace(`${kind}-pending`, `${kind}-shown`);
      },
      { rootMargin: '0px 0px -12% 0px' }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [kind]);
  return ref;
}

/** Count-up for numerals that scroll into view. Numbers already on screen
    at load are left alone (no flash of a replayed animation). */
export function useCountUp(value: string, duration = 1300) {
  const ref = useRef<HTMLElement | null>(null);
  const [display, setDisplay] = useState(value);
  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion() || typeof IntersectionObserver === 'undefined') return undefined;
    const match = value.match(/^(\D*)([\d.,]+)(.*)$/);
    if (!match || el.getBoundingClientRect().top < window.innerHeight) return undefined;
    const [, prefix, digits, suffix] = match;
    const target = parseFloat(digits.replace(/,/g, ''));
    const decimals = (digits.split('.')[1] || '').length;
    const format = (n: number) => `${prefix}${n.toFixed(decimals)}${suffix}`;
    setDisplay(format(0));
    let raf = 0;
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting)) return;
        io.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const p = Math.min((now - start) / duration, 1);
          if (p < 1) {
            setDisplay(format(target * (1 - Math.pow(1 - p, 4))));
            raf = requestAnimationFrame(tick);
          } else {
            setDisplay(value);
          }
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.6 }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [value, duration]);
  return [ref, display] as const;
}

/** Which of `ids` currently sits in the reading band (case-study TOC). */
export function useScrollSpy(ids: readonly string[]): string {
  const [active, setActive] = useState(ids[0] ?? '');
  const key = ids.join('|');
  useEffect(() => {
    const els = key
      .split('|')
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (els.length === 0) return undefined;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: '-30% 0px -60% 0px' }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [key]);
  return active;
}

/** Fire scroll-depth events once per threshold, per page. */
export function useScrollDepthTracking(pagePath: string): void {
  useEffect(() => {
    const fired = new Set<number>();
    const onScroll = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      if (h <= 0) return;
      const pct = Math.round((window.scrollY / h) * 100);
      ([25, 50, 75, 90] as const).forEach((t) => {
        if (pct >= t && !fired.has(t)) {
          fired.add(t);
          trackEvent('scroll_depth', { percent: t, page_path: pagePath });
        }
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [pagePath]);
}

/** Lock page scroll while an overlay is open. */
export function useBodyScrollLock(locked: boolean): void {
  useEffect(() => {
    if (!locked) return undefined;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [locked]);
}

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

/** Keep Tab focus inside an open dialog and restore it on close. */
export function useFocusTrap(ref: RefObject<HTMLElement>, active: boolean, onEscape?: () => void): void {
  useEffect(() => {
    if (!active || !ref.current) return undefined;
    const container = ref.current;
    const previous = document.activeElement as HTMLElement | null;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && onEscape) {
        e.preventDefault();
        onEscape();
        return;
      }
      if (e.key !== 'Tab') return;
      const items = Array.from(container.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
        (n) => n.offsetParent !== null
      );
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('keydown', onKey);
      previous?.focus?.();
    };
  }, [ref, active, onEscape]);
}
