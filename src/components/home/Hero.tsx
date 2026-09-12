import { Fragment } from 'react';
import { Link } from 'react-router';
import { Play } from 'lucide-react';
import { AVATAR, HERO, PERSON, RESUME, TITLE_BLOCK } from '../../content/profile';
import { trackEvent } from '../../lib/analytics';
import { vars } from '../../lib/utils';
import { ButtonAnchor, ButtonLink } from '../ui/Links';

export function Hero() {
  let i = 0;
  const markWords = HERO.mark.split(' ');
  const n = markWords.length;

  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden">
      <div aria-hidden className="mesh">
        <i />
        <i />
        <i />
        <i />
      </div>
      <div aria-hidden className="dot-grid" />
      <div className="wrap relative pb-[clamp(3rem,2rem+3vw,5rem)] pt-[clamp(2.5rem,1.5rem+5vw,6.5rem)]">
        <p className="fade-up inline-flex max-w-full flex-wrap items-center gap-x-2 gap-y-1 rounded-full border border-tone-emerald/30 bg-tone-emerald/10 px-3.5 py-1.5 text-[0.8125rem] font-medium text-ink">
          <span aria-hidden className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-tone-emerald opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-tone-emerald" />
          </span>
          {PERSON.availability}
          <span className="hidden text-ink-3 sm:inline">· {PERSON.openTo}</span>
        </p>

        <h1 id="hero-title" className="t-display mt-7 max-w-[22ch]">
          {HERO.lead.split(' ').map((w, k) => (
            <Fragment key={`l${k}`}>
              <span className="rise-w">
                <span style={vars({ '--i': i++ })}>{w}</span>
              </span>{' '}
            </Fragment>
          ))}
          {markWords.map((w, k) => (
            <Fragment key={`m${k}`}>
              <span className="rise-w">
                <span
                  className="grad-word"
                  style={vars({ '--i': i++, '--span': `${n * 100}%`, '--pos': `${n > 1 ? (k / (n - 1)) * 100 : 0}%` })}
                >
                  {k === n - 1 ? `${w}${HERO.end}` : w}
                </span>
              </span>
              {k < n - 1 ? ' ' : ''}
            </Fragment>
          ))}
        </h1>

        <div className="mt-10 grid gap-12 lg:mt-12 lg:grid-cols-12 lg:items-start lg:gap-16">
          <div className="lg:col-span-7">
            <p className="t-lead fade-up" style={vars({ '--d': '420ms' })}>
              {HERO.supporting}
            </p>
            <div className="fade-up mt-9 flex flex-wrap gap-3" style={vars({ '--d': '520ms' })}>
              <ButtonLink to="/work/">Explore my work</ButtonLink>
              <ButtonAnchor
                href={RESUME.pdf}
                download="Ashfaque_Rifaye_Resume.pdf"
                onClick={() => trackEvent('resume_download', { file_extension: 'pdf', location: 'hero' })}
              >
                Download résumé
              </ButtonAnchor>
            </div>
            <Link
              to="/demos/"
              className="fade-up group mt-7 inline-flex items-center gap-2.5 text-[0.9375rem] font-medium text-ink-2 no-underline transition-colors hover:text-ink"
              style={vars({ '--d': '600ms' })}
            >
              <span className="play-orb h-8 w-8">
                <Play size={13} aria-hidden className="translate-x-px" fill="currentColor" />
              </span>
              Watch the demos
            </Link>
          </div>
          <div className="titleblock fade-up lg:col-span-5" style={vars({ '--d': '620ms' })}>
            <img
              src={AVATAR.card}
              srcSet={`${AVATAR.cardSmall} 576w, ${AVATAR.card} 864w`}
              sizes="(min-width: 1024px) 30rem, 100vw"
              width={864}
              height={576}
              alt={AVATAR.alt}
              className="block aspect-[3/2] w-full object-cover"
            />
            <dl>
              {TITLE_BLOCK.map((row) => (
                <div key={row.key}>
                  <dt className="t-label">{row.key}</dt>
                  <dd>
                    {row.key === 'Status' && (
                      <span aria-hidden className="mr-2 inline-block h-1.5 w-1.5 -translate-y-px rounded-full bg-tone-emerald align-middle" />
                    )}
                    {row.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
