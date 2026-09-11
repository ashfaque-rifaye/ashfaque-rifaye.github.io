import type { ReactNode } from 'react';
import { cx } from '../../lib/utils';

/** Section heading without the eyebrow scaffold: a real h2, an optional
    intro, and an optional action aligned to the heading baseline. */
export function SectionHead({
  id,
  title,
  intro,
  action,
  className,
}: {
  id: string;
  title: ReactNode;
  intro?: ReactNode;
  action?: ReactNode;
  className?: string;
}) {
  return (
    <div className={cx('grid gap-6 md:grid-cols-12 md:items-end', className)}>
      <div className="md:col-span-8">
        <h2 id={id} className="t-h2">
          {title}
        </h2>
        {intro && <p className="t-lead mt-5">{intro}</p>}
      </div>
      {action && <div className="md:col-span-4 md:flex md:justify-end md:pb-1">{action}</div>}
    </div>
  );
}
