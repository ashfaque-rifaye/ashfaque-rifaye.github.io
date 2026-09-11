import { CAPABILITIES } from '../../content/home';
import { cx } from '../../lib/utils';
import { CapabilityGlyph } from '../diagrams/Glyphs';
import { Reveal } from '../ui/Reveal';
import { SectionHead } from '../ui/SectionHead';

const HUES = ['bg-grad-brand', 'bg-grad-ai', 'bg-grad-spectrum'];

export function Capabilities() {
  return (
    <section aria-labelledby="build-title" className="section pt-0">
      <div className="wrap">
        <SectionHead
          id="build-title"
          title={
            <>
              What I <span className="text-grad">build</span>
            </>
          }
          intro="Three areas, one job: turning a business problem into a product that moves a number."
        />
        <ul className="mt-14 grid gap-5 lg:grid-cols-3">
          {CAPABILITIES.map((c, i) => (
            <li key={c.title}>
              <Reveal delay={i * 90} className="panel card-lift relative flex h-full flex-col overflow-hidden p-7 sm:p-8">
                <span aria-hidden className={cx('absolute inset-x-0 top-0 h-1', HUES[i % HUES.length])} />
                <span className={cx('grid h-14 w-14 place-items-center rounded-2xl text-white shadow-glow', HUES[i % HUES.length])}>
                  <CapabilityGlyph kind={c.glyph} className="h-9 w-9 text-white" accentClassName="text-white" />
                </span>
                <h3 className="t-h3 mt-7">{c.title}</h3>
                <p className="t-body mt-3">{c.description}</p>
                <ul className="mt-7 grid gap-2" aria-label={`${c.title} focus areas`}>
                  {c.items.map((item) => (
                    <li key={item} className="flex items-center gap-2.5 text-[0.9375rem] text-ink-2">
                      <span aria-hidden className={cx('h-1.5 w-1.5 shrink-0 rounded-full', HUES[i % HUES.length])} />
                      {item}
                    </li>
                  ))}
                </ul>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
