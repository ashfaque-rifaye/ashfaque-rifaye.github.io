export interface Decision {
  decision: string;
  why: string;
  tradeoff: string;
}

/** Decision / Why / Trade-off, as a ledger rather than a card grid.
    `labels` renames the three columns (e.g. Change / Signal / Result). */
export function Decisions({
  items,
  labels = ['Decision', 'Why', 'Trade-off managed'],
}: {
  items: Decision[];
  labels?: [string, string, string];
}) {
  return (
    <div className="mt-8 border-t border-line">
      <div aria-hidden className="hidden grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)_minmax(0,1fr)] gap-8 border-b border-line py-3 lg:grid">
        <span className="t-label">{labels[0]}</span>
        <span className="t-label">{labels[1]}</span>
        <span className="t-label">{labels[2]}</span>
      </div>
      <ol>
        {items.map((d, i) => (
          <li
            key={d.decision}
            className="grid gap-3 border-b border-line py-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)_minmax(0,1fr)] lg:gap-8"
          >
            <p className="flex gap-3 font-semibold leading-snug text-ink" style={{ fontStretch: '104%' }}>
              <span className="font-mono text-[0.75rem] font-normal leading-6 text-accent">{String.fromCharCode(65 + i)}</span>
              {d.decision}
            </p>
            <p className="text-[0.9375rem] leading-relaxed text-ink-2">
              <span className="t-label mr-2 lg:hidden">{labels[1]}</span>
              {d.why}
            </p>
            <p className="text-[0.9375rem] leading-relaxed text-ink-2">
              <span className="t-label mr-2 lg:hidden">{labels[2]}</span>
              {d.tradeoff}
            </p>
          </li>
        ))}
      </ol>
    </div>
  );
}
