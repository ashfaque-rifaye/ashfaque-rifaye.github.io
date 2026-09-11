import { Fragment } from 'react';
import { HERO, RESUME, TITLE_BLOCK } from '../../content/profile';
import { trackEvent } from '../../lib/analytics';
import { vars } from '../../lib/utils';
import { ButtonAnchor, ButtonLink } from '../ui/Links';

export function Hero() {
  let i = 0;
  const word = (w: string) => (
    <span className="rise-w">
      <span style={vars({ '--i': i++ })}>{w}</span>
    </span>
  );
  const markWords = HERO.mark.split(' ');

  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden">
      <div aria-hidden className="hero-glow" />
      <div className="wrap relative pb-[clamp(3rem,2rem+3vw,5rem)] pt-[clamp(3.5rem,2rem+6vw,8rem)]">
        <h1 id="hero-title" className="t-display max-w-[22ch]">
          {HERO.lead.split(' ').map((w, k) => (
            <Fragment key={`l${k}`}>
              {word(w)}{' '}
            </Fragment>
          ))}
          <span className="mark">
            {markWords.map((w, k) => (
              <Fragment key={`m${k}`}>
                {word(k === markWords.length - 1 ? `${w}${HERO.end}` : w)}
                {k < markWords.length - 1 ? ' ' : ''}
              </Fragment>
            ))}
          </span>
        </h1>

        <div className="mt-10 grid gap-12 lg:mt-14 lg:grid-cols-12 lg:items-end lg:gap-16">
          <div className="lg:col-span-7">
            <p className="t-lead fade-up" style={vars({ '--d': '420ms' })}>
              {HERO.supporting}
            </p>
            <div className="fade-up mt-10 flex flex-wrap gap-3" style={vars({ '--d': '520ms' })}>
              <ButtonLink to="/work/">Explore my work</ButtonLink>
              <ButtonAnchor
                href={RESUME.pdf}
                download="Ashfaque_Rifaye_Resume.pdf"
                onClick={() => trackEvent('resume_download', { file_extension: 'pdf', location: 'hero' })}
              >
                Download résumé
              </ButtonAnchor>
            </div>
          </div>
          <dl className="titleblock fade-up lg:col-span-5" style={vars({ '--d': '620ms' })}>
            {TITLE_BLOCK.map((row) => (
              <div key={row.key}>
                <dt className="t-label">{row.key}</dt>
                <dd>
                  {row.key === 'Status' && <span aria-hidden className="mr-2 inline-block h-1.5 w-1.5 -translate-y-px rounded-full bg-accent align-middle" />}
                  {row.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
