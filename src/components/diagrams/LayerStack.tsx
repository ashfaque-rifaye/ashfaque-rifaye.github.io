import { RefreshCw } from 'lucide-react';
import { cx } from '../../lib/utils';
import { ArrowDownGap } from './Connectors';

export interface Layer {
  name: string;
  role?: string;
  nodes: { label: string; accent?: boolean }[];
  note: string;
}

export interface Rail {
  title: string;
  items: string[];
  note: string;
}

/** Layered architecture: request path top to bottom with numbered
    callouts, optional feedback rail, and callout notes underneath. */
export function LayerStack({ layers, rail }: { layers: Layer[]; rail?: Rail }) {
  return (
    <div>
      <div className={cx('grid gap-8', rail && 'xl:grid-cols-[minmax(0,1fr)_15.5rem] xl:gap-10')}>
        <ol className="grid gap-8" aria-label="Request path, top to bottom">
          {layers.map((layer, i) => (
            <li key={layer.name} className="relative grid gap-3 sm:grid-cols-[11rem_minmax(0,1fr)] sm:items-center sm:gap-6">
              <div className="flex items-start gap-3">
                <span className="callout mt-0.5">{i + 1}</span>
                <div>
                  <span className="block text-[0.9375rem] font-semibold leading-snug text-ink">{layer.name}</span>
                  {layer.role && <span className="mt-0.5 block text-[0.8125rem] leading-snug text-ink-3">{layer.role}</span>}
                </div>
              </div>
              <ul className="flex flex-wrap gap-2">
                {layer.nodes.map((node) => (
                  <li
                    key={node.label}
                    className={cx(
                      'node px-3 py-2 text-[0.875rem] leading-snug',
                      node.accent ? 'node-accent text-ink' : 'text-ink-2'
                    )}
                  >
                    {node.label}
                  </li>
                ))}
              </ul>
              {i < layers.length - 1 && (
                <ArrowDownGap index={i} always className="left-[0.45rem] sm:left-[calc(11rem+1.5rem+1.1rem)]" />
              )}
            </li>
          ))}
        </ol>

        {rail && (
          <aside className="node relative flex flex-col gap-4 border-dashed p-5 xl:my-2" aria-label={rail.title}>
            <span className="flex items-center gap-2 text-[0.9375rem] font-semibold text-ink">
              <RefreshCw size={16} aria-hidden className="text-accent" />
              {rail.title}
            </span>
            <ul className="grid gap-2.5">
              {rail.items.map((item) => (
                <li key={item} className="border-t border-line pt-2.5 text-[0.875rem] leading-snug text-ink-2">
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-auto text-[0.8125rem] leading-relaxed text-ink-3">{rail.note}</p>
          </aside>
        )}
      </div>

      <ol className="mt-10 grid gap-x-10 gap-y-4 border-t border-line pt-6 md:grid-cols-2">
        {layers.map((layer, i) => (
          <li key={layer.name} className="flex gap-3 text-[0.875rem] leading-relaxed text-ink-2">
            <span className="callout mt-0.5">{i + 1}</span>
            <span>
              <strong className="font-semibold text-ink">{layer.name}.</strong> {layer.note}
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
}
