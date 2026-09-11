import type { CSSProperties, ReactNode } from 'react';
import { useInViewClass } from '../../lib/hooks';

/** Enhances an already-visible block with a one-time rise when it scrolls in. */
export function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useInViewClass<HTMLDivElement>('reveal');
  const style = delay ? ({ '--delay': `${delay}ms` } as CSSProperties) : undefined;
  return (
    <div ref={ref} className={className} style={style}>
      {children}
    </div>
  );
}
