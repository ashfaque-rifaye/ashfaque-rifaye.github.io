import { CAPABILITIES } from '../../content/home';
import { CapabilityGlyph } from '../diagrams/Glyphs';
import { Reveal } from '../ui/Reveal';
import { SectionHead } from '../ui/SectionHead';

export function Capabilities() {
  return (
    <section aria-labelledby="build-title" className="section pt-0">
      <div className="wrap">
        <SectionHead
          id="build-title"
          title="What I build"
          intro="Three areas, one job: turning a business problem into a product that moves a number."
        />
        <ul className="mt-14 grid border-t border-line lg:grid-cols-3 lg:divide-x lg:divide-line">
          {CAPABILITIES.map((c, i) => (
            <li key={c.title} className="border-b border-line lg:border-b-0">
              <Reveal delay={i * 90} className="py-10 lg:px-8 lg:pb-2">
                <CapabilityGlyph kind={c.glyph} />
                <h3 className="t-h3 mt-8">{c.title}</h3>
                <p className="t-body mt-3">{c.description}</p>
                <ul className="mt-7 border-t border-line" aria-label={`${c.title} focus areas`}>
                  {c.items.map((item) => (
                    <li key={item} className="border-b border-line py-2.5 text-[0.9375rem] text-ink-2">
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
