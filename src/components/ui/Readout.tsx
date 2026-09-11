import type { Metric } from '../../content/types';
import { useCountUp } from '../../lib/hooks';
import { cx } from '../../lib/utils';

/** A metric as evidence: numeral, what it measures, and where it comes from.
    Renders a dt/dd group, so place it inside a <dl>. The label comes first in
    the DOM (read as "label: value") and is shown under the numeral via order. */
export function Readout({
  metric,
  size = 'lg',
  countUp = false,
  className,
}: {
  metric: Metric;
  size?: 'lg' | 'md';
  countUp?: boolean;
  className?: string;
}) {
  return (
    <div className={cx('flex flex-col', className)}>
      <dt className={cx('order-2 mt-3 text-ink-2', size === 'lg' ? 't-small' : 'text-[0.875rem] leading-snug')}>
        {metric.label}
      </dt>
      <dd className="order-1">
        {countUp ? <CountingValue value={metric.value} size={size} /> : <Value value={metric.value} size={size} />}
      </dd>
      {metric.source && <dd className="t-label order-3 mt-2 normal-case tracking-[0.02em]">{metric.source}</dd>}
    </div>
  );
}

function Value({ value, size }: { value: string; size: 'lg' | 'md' }) {
  return <span className={cx('block text-ink', size === 'lg' ? 't-num' : 't-num-sm')}>{value}</span>;
}

function CountingValue({ value, size }: { value: string; size: 'lg' | 'md' }) {
  const [ref, display] = useCountUp(value);
  return (
    <span ref={ref} className={cx('block text-ink', size === 'lg' ? 't-num' : 't-num-sm')}>
      <span aria-hidden>{display}</span>
      <span className="sr-only">{value}</span>
    </span>
  );
}
