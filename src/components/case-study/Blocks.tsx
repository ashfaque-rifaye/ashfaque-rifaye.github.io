import type { ReactNode } from 'react';

const pad = (n: number) => String(n).padStart(2, '0');

/** The one-sentence idea a section hangs on. */
export function PullQuote({ children }: { children: ReactNode }) {
  return (
    <p
      className="panel my-8 p-6 text-[clamp(1.1875rem,1rem+0.6vw,1.4375rem)] leading-snug text-ink md:p-8"
      style={{ fontStretch: '106%' }}
    >
      {children}
    </p>
  );
}

/** A numbered sequence where each step needs a sentence of explanation. */
export function Steps({ items }: { items: { title: string; text: string }[] }) {
  return (
    <ol className="mt-8 border-t border-line">
      {items.map((s, i) => (
        <li key={s.title} className="grid gap-1.5 border-b border-line py-4 md:grid-cols-[11rem_minmax(0,1fr)] md:gap-6">
          <span className="flex items-baseline gap-3 font-semibold text-ink">
            <span className="font-mono text-[0.75rem] font-normal text-accent">{pad(i + 1)}</span>
            {s.title}
          </span>
          <span className="text-[0.9375rem] leading-relaxed text-ink-2">{s.text}</span>
        </li>
      ))}
    </ol>
  );
}

/** Key / value rows in hairlines. */
export function Ledger({ rows }: { rows: { k: string; v: ReactNode }[] }) {
  return (
    <dl className="mt-8 border-t border-line">
      {rows.map((r, i) => (
        <div key={`${r.k}-${i}`} className="grid gap-1.5 border-b border-line py-4 md:grid-cols-[11rem_minmax(0,1fr)] md:gap-6">
          <dt className="font-semibold text-ink">{r.k}</dt>
          <dd className="text-[0.9375rem] leading-relaxed text-ink-2">{r.v}</dd>
        </div>
      ))}
    </dl>
  );
}

export function SubHead({ children }: { children: ReactNode }) {
  return <h3 className="t-h3 mb-4 mt-12">{children}</h3>;
}
