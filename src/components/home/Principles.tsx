import { PRINCIPLES } from '../../content/home';
import { Reveal } from '../ui/Reveal';
import { SectionHead } from '../ui/SectionHead';

export function Principles() {
  return (
    <section aria-labelledby="think-title" className="band section">
      <div className="wrap">
        <SectionHead
          id="think-title"
          title={
            <>
              How I <span className="text-grad-ai">think</span> about AI products
            </>
          }
        />
        <ul className="mt-12 grid gap-5 md:grid-cols-2">
          {PRINCIPLES.map((p, i) => (
            <li key={p.title}>
              <Reveal delay={(i % 2) * 90} className="panel card-lift flex h-full flex-col p-7 md:p-9">
                <span aria-hidden className="text-grad font-mono text-[0.875rem] font-semibold">
                  0{i + 1}
                </span>
                <h3 className="t-h3 mt-4">{p.title}</h3>
                <p className="mt-3 text-[1.125rem] leading-relaxed text-ink-2">{p.line}</p>
                <span aria-hidden className="block min-h-8 flex-1" />
                <p className="border-t border-line pt-5 text-[0.9375rem] leading-relaxed text-ink-3">
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
