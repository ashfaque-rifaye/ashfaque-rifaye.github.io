import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router';
import { HIRE_CTA, PERSON, RESUME, SOCIALS } from '../../content/profile';
import { trackEvent } from '../../lib/analytics';

/** Closing call to action shared by every page. */
export function HireCta({ location }: { location: string }) {
  const links = [
    { label: 'LinkedIn', href: SOCIALS.linkedin, external: true },
    { label: 'Email', href: SOCIALS.email, external: false },
    { label: 'Résumé', href: RESUME.pdf, external: false, download: true },
    { label: 'GitHub', href: SOCIALS.github, external: true },
  ];
  return (
    <section aria-labelledby={`hire-${location}`} className="pb-[var(--section)] pt-[clamp(3rem,2rem+3vw,5rem)]">
      <div className="wrap">
        <div className="grid gap-12 border-t border-line pt-[clamp(3rem,2rem+3vw,5rem)] lg:grid-cols-12">
          <div className="lg:col-span-8">
            <h2 id={`hire-${location}`} className="t-h2 max-w-[24ch]">
              {HIRE_CTA.question}
            </h2>
            <p className="t-lead mt-6">{HIRE_CTA.line}</p>
            <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-4">
              <a
                href={`${SOCIALS.email}?subject=${encodeURIComponent("Let's talk")}`}
                onClick={() => trackEvent('social_link_click', { platform: 'email', location })}
                className="btn btn-primary"
              >
                Let&rsquo;s talk
                <ArrowRight size={17} aria-hidden className="arrow" />
              </a>
              <Link to="/contact/" className="text-[0.9375rem] font-medium text-ink-2 underline decoration-line-2 underline-offset-4 transition-colors hover:text-ink hover:decoration-accent">
                Other ways to reach me
              </Link>
            </div>
          </div>
          <div className="lg:col-span-4 lg:pt-2">
            <p className="t-label">Direct</p>
            <ul className="mt-4 border-t border-line">
              {links.map((l) => (
                <li key={l.label} className="border-b border-line">
                  <a
                    href={l.href}
                    target={l.external ? '_blank' : undefined}
                    rel={l.external ? 'noreferrer' : undefined}
                    download={l.download ? '' : undefined}
                    onClick={() =>
                      l.download
                        ? trackEvent('resume_download', { file_extension: 'pdf', location })
                        : trackEvent('social_link_click', { platform: l.label.toLowerCase(), location })
                    }
                    className="group flex min-h-12 items-center justify-between py-3 text-ink no-underline transition-colors hover:text-accent"
                  >
                    <span className="font-medium">{l.label}</span>
                    <span className="text-[0.875rem] text-ink-3 transition-colors group-hover:text-ink-2">
                      {l.label === 'Email' ? PERSON.email : l.label === 'Résumé' ? 'PDF' : l.label === 'LinkedIn' ? 'in/ashfaque-rifaye' : 'ashfaque-rifaye'}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
