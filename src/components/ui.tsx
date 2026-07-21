import { useEffect, useRef, type ReactNode } from 'react';
import { cx } from '../lib/utils';

/* Shared style tokens */
export const CARD = 'rounded-2xl border border-line bg-surface shadow-soft transition-all duration-300';
export const CARD_HOVER = 'hover:-translate-y-1 hover:shadow-lift hover:border-accent-500/40';
export const TAG = 'inline-flex items-center rounded-full border border-line bg-raised px-2.5 py-1 text-[11px] font-medium text-mute';
export const TAG_ACCENT = 'inline-flex items-center rounded-full border border-accent-500/25 bg-accent-500/10 px-2.5 py-1 text-[11px] font-medium text-accent-text';

export function Tag({ children, accent = false }: { children: ReactNode; accent?: boolean }) {
  return <span className={accent ? TAG_ACCENT : TAG}>{children}</span>;
}

/* Scroll reveal wrapper */
export function Reveal({
  children,
  className = '',
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    const show = () => el.classList.add('is-visible');

    if (el.getBoundingClientRect().top < window.innerHeight * 0.92) {
      show();
      return undefined;
    }
    if (typeof IntersectionObserver === 'undefined') {
      show();
      return undefined;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            show();
            io.unobserve(el);
          }
        });
      },
      // Generous bottom margin: reveal as content approaches the viewport,
      // so nothing is ever "missing" when the user arrives at it.
      { threshold: 0, rootMargin: '0px 0px 12% 0px' }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} className={cx('reveal', className)} style={delay ? { transitionDelay: `${delay}ms` } : undefined}>
      {children}
    </div>
  );
}

/* Section shell with anchored heading */
export function Section({
  id,
  eyebrow,
  title,
  intro,
  children,
  className = '',
}: {
  id: string;
  eyebrow: string;
  title: string;
  intro?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className={cx('scroll-mt-24 py-16 md:py-24', className)}>
      <Reveal>
        <p className="mb-3 flex items-center gap-2.5 font-mono text-xs font-semibold uppercase tracking-[0.2em] text-accent-text">
          <span aria-hidden className="h-px w-8 bg-gradient-to-r from-accent-500 to-alt" />
          {eyebrow}
        </p>
        <h2 id={`${id}-title`} className="max-w-2xl text-3xl font-semibold tracking-tight md:text-4xl">
          {title}
        </h2>
        {intro && <p className="mt-4 max-w-2xl text-base leading-relaxed text-mute">{intro}</p>}
      </Reveal>
      <div className="mt-10 md:mt-12">{children}</div>
    </section>
  );
}
