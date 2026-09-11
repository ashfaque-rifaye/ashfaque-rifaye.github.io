import { IMPACT_PRIMARY, IMPACT_SECONDARY } from '../../content/metrics';
import { vars } from '../../lib/utils';
import { Readout } from '../ui/Readout';

/** Proof immediately under the hero: evidence, each with its source. */
export function ImpactBand() {
  return (
    <section aria-labelledby="impact-title" className="wrap fade-up" style={vars({ '--d': '700ms' })}>
      <div className="border-y border-line">
        <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b border-line py-4">
          <h2 id="impact-title" className="text-[0.9375rem] font-semibold text-ink" style={{ fontStretch: '106%' }}>
            Selected impact
          </h2>
          <p className="text-[0.8125rem] text-ink-3">Figures from production programs. Savings are estimates.</p>
        </div>
        <dl className="grid grid-cols-2 gap-x-6 gap-y-10 py-10 lg:grid-cols-4 lg:divide-x lg:divide-line lg:[&>div:not(:first-child)]:pl-8">
          {IMPACT_PRIMARY.map((m) => (
            <Readout key={m.label} metric={m} />
          ))}
        </dl>
        <dl className="grid grid-cols-2 gap-x-6 gap-y-8 border-t border-line py-8 lg:grid-cols-4 lg:divide-x lg:divide-line lg:[&>div:not(:first-child)]:pl-8">
          {IMPACT_SECONDARY.map((m) => (
            <Readout key={m.label} metric={m} size="md" countUp />
          ))}
        </dl>
      </div>
    </section>
  );
}
