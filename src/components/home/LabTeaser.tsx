import { Link } from 'react-router';
import { LAB_PROJECTS } from '../../content/lab';
import { ArrowLink } from '../ui/Links';
import { Reveal } from '../ui/Reveal';
import { SectionHead } from '../ui/SectionHead';

export function LabTeaser() {
  const featured = LAB_PROJECTS.filter((p) => p.featured);
  return (
    <section aria-labelledby="lab-title" className="section">
      <div className="wrap">
        <SectionHead
          id="lab-title"
          title={
            <>
              From the <span className="text-grad">AI Lab</span>
            </>
          }
          intro="Experiments outside the day job, each started from a product question I wanted answered with working software."
          action={<ArrowLink to="/lab/">Explore the AI Lab</ArrowLink>}
        />
        <ol className="mt-12 border-t border-line">
          {featured.map((p, i) => (
            <li key={p.slug} className="border-b border-line">
              <Reveal delay={i * 80}>
                <Link
                  to={`/lab/#${p.slug}`}
                  className="group grid gap-3 py-7 no-underline md:grid-cols-12 md:gap-8"
                >
                  <span className="md:col-span-3">
                    <span className="block text-[1.125rem] font-semibold text-ink transition-colors group-hover:text-accent" style={{ fontStretch: '108%' }}>
                      {p.name}
                    </span>
                    <span className="t-label mt-1.5 block normal-case tracking-normal">{p.status}</span>
                  </span>
                  <span className="text-[1.0625rem] leading-relaxed text-ink-2 md:col-span-6">{p.question}</span>
                  <span className="text-[0.875rem] leading-relaxed text-ink-3 md:col-span-3">{p.context}</span>
                </Link>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
