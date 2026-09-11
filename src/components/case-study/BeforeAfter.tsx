export interface ChangeRow {
  area: string;
  before: string;
  after: string;
}

/** "What changed": one row per capability, before and after. */
export function BeforeAfter({ rows }: { rows: ChangeRow[] }) {
  return (
    <div className="mt-8 border-t border-line">
      <div aria-hidden className="hidden grid-cols-[11rem_minmax(0,1fr)_minmax(0,1fr)] gap-8 border-b border-line py-3 md:grid">
        <span className="t-label">Area</span>
        <span className="t-label">Before</span>
        <span className="t-label text-accent">After</span>
      </div>
      {rows.map((r) => (
        <dl key={r.area} className="grid gap-2 border-b border-line py-5 md:grid-cols-[11rem_minmax(0,1fr)_minmax(0,1fr)] md:gap-8">
          <dt className="font-semibold text-ink">{r.area}</dt>
          <dd className="text-[0.9375rem] leading-relaxed text-ink-3">
            <span className="t-label mr-2 md:sr-only">Before</span>
            {r.before}
          </dd>
          <dd className="text-[0.9375rem] leading-relaxed text-ink">
            <span className="t-label mr-2 text-accent md:sr-only">After</span>
            {r.after}
          </dd>
        </dl>
      ))}
    </div>
  );
}
