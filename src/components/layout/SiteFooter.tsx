import { PERSON, RESUME, SOCIALS } from '../../content/profile';
import { trackEvent } from '../../lib/analytics';

const YEAR = __BUILD_DATE__.slice(0, 4);

export function SiteFooter() {
  const links = [
    { label: 'LinkedIn', href: SOCIALS.linkedin, external: true },
    { label: 'GitHub', href: SOCIALS.github, external: true },
    { label: 'Résumé', href: RESUME.pdf, download: true },
    { label: 'Email', href: SOCIALS.email },
  ];
  return (
    <footer className="border-t border-line">
      <div className="wrap grid gap-10 py-14 md:grid-cols-12 md:items-end">
        <div className="md:col-span-6">
          <p className="text-[1.125rem] font-semibold text-ink" style={{ fontStretch: '112%' }}>
            {PERSON.name}
          </p>
          <p className="mt-1 text-ink-2">{PERSON.role}</p>
          <p className="t-label mt-3">AI · Product · Technology</p>
        </div>
        <ul className="flex flex-wrap gap-x-8 gap-y-3 md:col-span-6 md:justify-end">
          {links.map((l) => (
            <li key={l.label}>
              <a
                href={l.href}
                target={l.external ? '_blank' : undefined}
                rel={l.external ? 'noreferrer' : undefined}
                download={l.download ? '' : undefined}
                onClick={() =>
                  l.download
                    ? trackEvent('resume_download', { file_extension: 'pdf', location: 'footer' })
                    : trackEvent('social_link_click', { platform: l.label.toLowerCase(), location: 'footer' })
                }
                className="inline-flex min-h-11 items-center text-[0.9375rem] font-medium text-ink-2 no-underline transition-colors hover:text-ink"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div className="wrap flex flex-wrap justify-between gap-x-6 gap-y-2 border-t border-line py-6 text-[0.8125rem] text-ink-3">
        <span>© {YEAR} {PERSON.name}</span>
        <span>{PERSON.location}. Prerendered React, hosted on GitHub Pages.</span>
      </div>
    </footer>
  );
}
