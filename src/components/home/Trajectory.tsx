import { ROLES } from '../../content/experience';
import { RESUME } from '../../content/profile';
import { trackEvent } from '../../lib/analytics';
import { cx } from '../../lib/utils';
import { ArrowLink } from '../ui/Links';
import { Reveal } from '../ui/Reveal';
import { SectionHead } from '../ui/SectionHead';

/** Engineer → consultant → AI product, left to right. Short on purpose. */
export function Trajectory() {
  const journey = [...ROLES].reverse();
  return (
    <section aria-labelledby="path-title" className="section pt-0">
      <div className="wrap">
        <SectionHead
          id="path-title"
          title={
            <>
              Career <span className="text-grad-ai">trajectory</span>
            </>
          }
          intro="Engineering first, then customers and revenue, then AI products at scale. Each step added a layer the next one needed."
          action={<ArrowLink to="/about/">Read the full story</ArrowLink>}
        />
        <ol className="relative mt-14 grid gap-12 pl-8 lg:grid-cols-3 lg:gap-10 lg:pl-0 lg:pt-10">
          <span aria-hidden className="absolute bottom-2 left-[5px] top-2 w-px bg-line-2 lg:bottom-auto lg:left-0 lg:right-0 lg:top-[5px] lg:h-px lg:w-auto" />
          {journey.map((r, i) => {
            const current = i === journey.length - 1;
            return (
              <li key={r.company} className="relative">
                <span
                  aria-hidden
                  className={cx(
                    'absolute -left-8 top-1.5 h-[11px] w-[11px] rounded-full border lg:-top-10 lg:left-0',
                    current ? 'border-accent bg-accent' : 'border-line-2 bg-bg'
                  )}
                />
                <Reveal delay={i * 100}>
                  <p className="t-label">{r.period}</p>
                  <p className="mt-3 text-[0.8125rem] font-medium uppercase tracking-[0.06em] text-accent">{r.track}</p>
                  <h3 className="t-h3 mt-2">{r.company}</h3>
                  <p className="mt-1 text-[0.9375rem] text-ink-2">{r.title}</p>
                  <p className="mt-4 text-[0.9375rem] leading-relaxed text-ink-3">{r.summary}</p>
                  <ul className="mt-5 grid gap-2 border-t border-line pt-4">
                    {r.outcomes.map((o) => (
                      <li key={o} className="text-[0.9375rem] leading-snug text-ink">
                        {o}
                      </li>
                    ))}
                  </ul>
                </Reveal>
              </li>
            );
          })}
        </ol>
        <p className="mt-12 text-[0.9375rem] text-ink-3">
          Full detail is in the{' '}
          <a
            href={RESUME.pdf}
            download=""
            onClick={() => trackEvent('resume_download', { file_extension: 'pdf', location: 'trajectory' })}
            className="text-ink underline decoration-accent underline-offset-4"
          >
            résumé (PDF)
          </a>
          .
        </p>
      </div>
    </section>
  );
}
