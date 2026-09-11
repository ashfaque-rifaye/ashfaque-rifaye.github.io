import type { ReactNode } from 'react';
import { cx, vars } from '../../lib/utils';

/** Top of every inner page: a soft colour mesh, one h1, an optional lede and actions. */
export function PageHeader({
  title,
  lede,
  children,
  className,
}: {
  title: ReactNode;
  lede?: ReactNode;
  children?: ReactNode;
  className?: string;
}) {
  return (
    <div className="relative overflow-hidden">
      <div aria-hidden className="mesh mesh-soft">
        <i />
        <i />
        <i />
        <i />
      </div>
      <header className={cx('wrap relative pb-[clamp(2.5rem,2rem+2.5vw,4.5rem)] pt-[clamp(3rem,2rem+4vw,6rem)]', className)}>
        <h1 className="t-h1 fade-up max-w-[20ch]">{title}</h1>
        {lede && (
          <p className="t-lead fade-up mt-6" style={vars({ '--d': '80ms' })}>
            {lede}
          </p>
        )}
        {children && (
          <div className="fade-up mt-10" style={vars({ '--d': '160ms' })}>
            {children}
          </div>
        )}
      </header>
    </div>
  );
}
