import type { CSSProperties } from 'react';
import { cx } from '../../lib/utils';
import { ArrowDownGap, ArrowRightGap } from './Connectors';

export interface MetricColumn {
  title: string;
  caption: string;
  items: { value?: string; label: string }[];
  accent?: boolean;
}

/** Grouped measures. `connected` draws arrows when each group feeds the
    next (watch → move → prove); turn it off for independent groups. */
export function MetricColumns({ columns, connected = true }: { columns: MetricColumn[]; connected?: boolean }) {
  return (
    <ol
      className="grid gap-y-8 lg:gap-x-10 lg:[grid-template-columns:repeat(var(--cols),minmax(0,1fr))]"
      style={{ '--cols': columns.length } as CSSProperties}
    >
      {columns.map((col, i) => (
        <li key={col.title} className={cx('node relative flex flex-col', col.accent && 'node-accent')}>
          <div className="border-b border-line px-4 py-3">
            <span className="block text-[0.975rem] font-semibold text-ink" style={{ fontStretch: '104%' }}>
              {col.title}
            </span>
            <span className="mt-0.5 block text-[0.8125rem] leading-snug text-ink-3">{col.caption}</span>
          </div>
          <dl className="grid gap-px bg-line">
            {col.items.map((item) => (
              <div key={item.label} className="flex items-baseline justify-between gap-4 bg-bg px-4 py-3">
                <dt className="text-[0.875rem] leading-snug text-ink-2">{item.label}</dt>
                {item.value && (
                  <dd className="t-num-sm shrink-0 text-ink" style={{ fontSize: '1.25rem' }}>
                    {item.value}
                  </dd>
                )}
              </div>
            ))}
          </dl>
          {connected && i < columns.length - 1 && (
            <>
              <ArrowRightGap index={i} />
              <ArrowDownGap index={i} className="left-6" />
            </>
          )}
        </li>
      ))}
    </ol>
  );
}
