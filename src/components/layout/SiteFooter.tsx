import { Link } from 'react-router';
import { PERSON, RESUME, SOCIALS } from '../../content/profile';
import { trackEvent } from '../../lib/analytics';
import { LogoMark } from './LogoMark';

const YEAR = __BUILD_DATE__.slice(0, 4);

const EXPLORE = [
  { to: '/work/', label: 'Work' },
  { to: '/demos/', label: 'Demos' },
  { to: '/agent/', label: 'Hiring Agent' },
  { to: '/lab/', label: 'AI Lab' },
  { to: '/about/', label: 'About' },
  { to: '/resume/', label: 'Résumé' },
  { to: '/contact/', label: 'Contact' },
];

export function SiteFooter() {
  const connect = [
    { label: 'LinkedIn', href: SOCIALS.linkedin, external: true },
    { label: 'GitHub', href: SOCIALS.github, external: true },
    { label: 'Email', href: SOCIALS.email },
    { label: 'Résumé (PDF)', href: RESUME.pdf, download: true },
  ];
  const linkCls = 'inline-flex min-h-10 items-center text-[0.9375rem] font-medium text-ink-2 no-underline transition-colors hover:text-ink';
  return (
    <footer className="no-print relative mt-4 overflow-hidden border-t border-line">
      <div aria-hidden className="rule-grad absolute inset-x-0 top-0" />
      <div aria-hidden className="mesh mesh-soft opacity-60">
        <i />
        <i />
      </div>
      <div className="wrap relative grid gap-10 py-14 md:grid-cols-12">
        <div className="md:col-span-5">
          <Link to="/" className="inline-flex items-center gap-3 no-underline">
            <LogoMark size={42} />
            <span>
              <span className="block text-[1.125rem] font-semibold text-ink" style={{ fontStretch: '112%' }}>
                {PERSON.name}
              </span>
              <span className="block text-[0.875rem] text-ink-3">{PERSON.role}</span>
            </span>
          </Link>
          <p className="mt-5 max-w-sm text-[0.9375rem] leading-relaxed text-ink-2">
            I build AI-powered products that solve real business problems and{' '}
            <span className="text-grad font-semibold">move measurable outcomes</span>.
          </p>
        </div>
        <nav aria-label="Footer" className="md:col-span-4">
          <p className="font-mono text-[0.625rem] uppercase tracking-[0.14em] text-ink-4">Explore</p>
          <ul className="mt-2 grid grid-cols-2 gap-x-6">
            {EXPLORE.map((l) => (
              <li key={l.to}>
                <Link to={l.to} className={linkCls}>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="md:col-span-3">
          <p className="font-mono text-[0.625rem] uppercase tracking-[0.14em] text-ink-4">Connect</p>
          <ul className="mt-2 grid">
            {connect.map((l) => (
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
                  className={linkCls}
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="wrap relative flex flex-wrap justify-between gap-x-6 gap-y-2 border-t border-line py-6 text-[0.8125rem] text-ink-3">
        <span>
          © {YEAR} {PERSON.name} · {PERSON.location}
        </span>
        <span>
          Press <kbd className="kbd">Ctrl K</kbd> to search, or ask the AI Twin in the corner.
        </span>
      </div>
    </footer>
  );
}
