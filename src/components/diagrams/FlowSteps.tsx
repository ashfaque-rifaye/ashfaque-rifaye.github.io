import { cx, vars } from '../../lib/utils';
import { ArrowDownGap, ArrowRightGap } from './Connectors';

export interface FlowStep {
  kicker?: string;
  title: string;
  detail?: string;
  metric?: string;
  accent?: boolean;
}

const pad = (n: number) => String(n).padStart(2, '0');

/** A sequence: one row of up to four steps on desktop; five or more wrap
    into rows of three, numbered so the order survives the wrap. Stacks
    top to bottom on smaller screens. */
export function FlowSteps({ steps, className }: { steps: FlowStep[]; className?: string }) {
  const cols = steps.length <= 4 ? steps.length : 3;
  const numbered = steps.length > 4;
  return (
    <ol
      className={cx(
        'grid gap-y-8 lg:gap-x-10 lg:[grid-template-columns:repeat(var(--cols),minmax(0,1fr))]',
        className
      )}
      style={vars({ '--cols': cols })}
    >
      {steps.map((step, i) => {
        const last = i === steps.length - 1;
        const rowEnd = (i + 1) % cols === 0;
        return (
          <li key={step.title} className={cx('node relative flex flex-col p-4', step.accent && 'node-accent')}>
            {(step.kicker || numbered) && (
              <span className="t-label mb-2 block">
                {numbered && <span className="mr-2 text-ink-4">{pad(i + 1)}</span>}
                {step.kicker}
              </span>
            )}
            <span className="text-[0.975rem] font-semibold leading-snug text-ink" style={{ fontStretch: '104%' }}>
              {step.title}
            </span>
            {step.detail && <span className="mt-1.5 block text-[0.875rem] leading-relaxed text-ink-3">{step.detail}</span>}
            {step.metric && (
              <span className="mt-auto block border-t border-line pt-2.5 text-[0.8125rem] font-medium text-accent [margin-top:max(0.75rem,auto)]">
                {step.metric}
              </span>
            )}
            {!last && !rowEnd && <ArrowRightGap index={i} />}
            {!last && <ArrowDownGap index={i} className="left-6" />}
          </li>
        );
      })}
    </ol>
  );
}
