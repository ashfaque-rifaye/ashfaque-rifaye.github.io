import { AWARDS, TESTIMONIAL } from '../../content/awards';
import { Reveal } from '../ui/Reveal';
import { SectionHead } from '../ui/SectionHead';

export function Recognition() {
  const [lead, ...rest] = AWARDS;
  return (
    <section aria-labelledby="awards-title" className="section pt-0">
      <div className="wrap">
        <SectionHead
          id="awards-title"
          title={<span className="text-grad">Recognition</span>}
          intro="Innovation awards for new product ideas, and team awards for products that shipped."
        />
        <div className="mt-14 grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <Reveal className="border-t border-line pt-8">
              <p className="t-num text-accent">{lead.year}</p>
              <h3 className="t-h3 mt-5">
                {lead.event}: {lead.title}
              </h3>
              <p className="mt-3 max-w-[52ch] text-[1.0625rem] leading-relaxed text-ink-2">{lead.context}</p>
            </Reveal>
            <ol className="mt-10 border-t border-line">
              {rest.map((a) => (
                <li key={`${a.year}-${a.event}`} className="grid grid-cols-[3.5rem_minmax(0,1fr)] gap-4 border-b border-line py-5 sm:grid-cols-[4.5rem_minmax(0,1fr)]">
                  <span className="font-mono text-[0.875rem] text-ink-3">{a.year}</span>
                  <span>
                    <span className="block font-semibold text-ink">
                      {a.event} <span className="font-normal text-ink-3">·</span> {a.title}
                    </span>
                    <span className="mt-1 block text-[0.9375rem] leading-relaxed text-ink-3">{a.context}</span>
                  </span>
                </li>
              ))}
            </ol>
          </div>
          <Reveal className="lg:col-span-5" delay={120}>
            <figure className="panel p-7 md:p-10">
              <span aria-hidden className="block font-mono text-[2.5rem] leading-none text-accent">“</span>
              <blockquote className="mt-4 text-[1.125rem] leading-relaxed text-ink">{TESTIMONIAL.quote}</blockquote>
              <figcaption className="mt-8 border-t border-line pt-5">
                <span className="block font-semibold text-ink">{TESTIMONIAL.name}</span>
                <span className="block text-[0.9375rem] text-ink-3">{TESTIMONIAL.title}</span>
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
