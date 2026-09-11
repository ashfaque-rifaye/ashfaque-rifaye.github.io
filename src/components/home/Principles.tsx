import { PRINCIPLES } from '../../content/home';
import { Reveal } from '../ui/Reveal';
import { SectionHead } from '../ui/SectionHead';

export function Principles() {
  return (
    <section aria-labelledby="think-title" className="section pt-0">
      <div className="wrap">
        <SectionHead id="think-title" title="How I think about AI products" />
        <ul className="mt-12 grid gap-px overflow-hidden rounded border border-line bg-line md:grid-cols-2">
          {PRINCIPLES.map((p, i) => (
            <li key={p.title} className="bg-bg">
              <Reveal delay={(i % 2) * 90} className="flex h-full flex-col p-7 md:p-10">
                <span aria-hidden className="mb-8 block h-2 w-2 bg-accent" />
                <h3 className="t-h3">{p.title}</h3>
                <p className="mt-3 text-[1.125rem] leading-relaxed text-ink-2">{p.line}</p>
                <p className="mt-8 border-t border-line pt-5 text-[0.9375rem] leading-relaxed text-ink-3">
                  <span className="font-medium text-ink-2">In practice: </span>
                  {p.inPractice}
                </p>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
