import type { ReactNode } from 'react';
import { useInViewClass } from '../../lib/hooks';
import { cx } from '../../lib/utils';

/** A framed diagram on a faint drafting grid. Connectors inside with the
    `draw` class trace themselves once the figure scrolls into view. */
export function Figure({
  n,
  title,
  note,
  children,
  className,
}: {
  n: string;
  title: string;
  note?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  const ref = useInViewClass<HTMLElement>('draw');
  return (
    <figure ref={ref} className={cx('figure-frame my-10 overflow-hidden', className)}>
      <figcaption className="flex flex-wrap items-baseline gap-x-4 gap-y-1 border-b border-line bg-bg/70 px-4 py-3 md:px-5">
        <span className="t-label text-accent">Fig. {n}</span>
        <span className="text-[0.9375rem] font-medium text-ink" style={{ fontStretch: '104%' }}>
          {title}
        </span>
      </figcaption>
      <div className="p-4 sm:p-6 md:p-8">{children}</div>
      {note && (
        <div className="border-t border-line bg-bg/70 px-4 py-3 text-[0.875rem] leading-relaxed text-ink-3 md:px-5">
          {note}
        </div>
      )}
    </figure>
  );
}
