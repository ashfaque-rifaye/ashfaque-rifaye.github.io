import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router';
import { Download, Menu, Search, Sparkles, X } from 'lucide-react';
import { PERSON, RESUME, SOCIALS } from '../../content/profile';
import { trackEvent } from '../../lib/analytics';
import { useBodyScrollLock, useFocusTrap, useScrolled } from '../../lib/hooks';
import { cx } from '../../lib/utils';
import { useUi } from '../../site/ui-state';
import { LogoMark } from './LogoMark';
import { ThemeToggle } from './ThemeToggle';

export const NAV = [
  { to: '/work/', label: 'Work', end: false },
  { to: '/demos/', label: 'Demos', end: false },
  { to: '/agent/', label: 'Hiring Agent', end: false, ai: true },
  { to: '/lab/', label: 'AI Lab', end: false },
  { to: '/about/', label: 'About', end: false },
  { to: '/contact/', label: 'Contact', end: false },
] as const;

const MOBILE_NAV = [{ to: '/', label: 'Home', end: true }, ...NAV, { to: '/resume/', label: 'Résumé', end: false }] as const;

export function SiteHeader() {
  const scrolled = useScrolled();
  const [open, setOpen] = useState(false);
  const [mod, setMod] = useState('Ctrl K');
  const headerRef = useRef<HTMLElement>(null);
  const { pathname } = useLocation();
  const { openPalette } = useUi();

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    if (/Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent)) setMod('⌘K');
  }, []);
  useBodyScrollLock(open);
  useFocusTrap(headerRef, open, () => setOpen(false));

  return (
    <header ref={headerRef} className="site-header" data-scrolled={scrolled} data-open={open}>
      <div className="wrap flex h-full items-center justify-between gap-4">
        <Link to="/" className="flex min-h-11 items-center gap-2.5 no-underline" aria-label={`${PERSON.name}, home`}>
          <LogoMark size={34} />
          <span className="leading-tight">
            <span className="block whitespace-nowrap text-[1.0625rem] font-semibold tracking-[-0.01em] text-ink" style={{ fontStretch: '112%' }}>
              {PERSON.name}
            </span>
            <span className="hidden font-mono text-[0.625rem] uppercase tracking-[0.14em] text-ink-3 xl:block">{PERSON.role}</span>
          </span>
        </Link>

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-5 xl:gap-6">
            {NAV.map((item) => (
              <li key={item.to}>
                <NavLink to={item.to} end={item.end} className="nav-link">
                  {'ai' in item && <Sparkles size={14} aria-hidden className="text-tone-pink" />}
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={openPalette}
            aria-label="Search the site"
            title={`Search (${mod})`}
            className="group hidden h-10 items-center gap-2 rounded-full border border-line bg-bg-2/70 pl-3 pr-1.5 text-[0.875rem] text-ink-3 transition-colors hover:border-tone-violet/50 hover:text-ink lg:inline-flex"
          >
            <Search size={15} aria-hidden className="text-tone-violet" />
            <span className="hidden pr-6 xl:inline">Search…</span>
            <kbd className="kbd">{mod}</kbd>
          </button>
          <button
            type="button"
            onClick={openPalette}
            aria-label="Search the site"
            className="grid h-10 w-10 place-items-center rounded-full border border-line bg-bg-2/60 text-ink-2 transition-colors hover:text-ink lg:hidden"
          >
            <Search size={17} aria-hidden />
          </button>
          <ThemeToggle />
          <a
            href={RESUME.pdf}
            download="Ashfaque_Rifaye_Resume.pdf"
            onClick={() => trackEvent('resume_download', { file_extension: 'pdf', location: 'header' })}
            className="btn btn-primary hidden !min-h-10 !rounded-full !px-4 !text-[0.875rem] xl:inline-flex"
          >
            <Download size={15} aria-hidden />
            Résumé
          </a>
          <button
            type="button"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((o) => !o)}
            className="inline-flex h-10 items-center gap-2 rounded-full border border-line bg-bg-2/60 px-3.5 text-[0.875rem] font-medium text-ink transition-colors hover:border-line-2 lg:hidden"
          >
            {open ? <X size={17} aria-hidden /> : <Menu size={17} aria-hidden />}
            <span className="max-[440px]:sr-only">{open ? 'Close' : 'Menu'}</span>
          </button>
        </div>
      </div>

      {open && (
        <div id="mobile-menu" className="fixed inset-x-0 bottom-0 top-[var(--header-h)] z-overlay overflow-y-auto border-t border-line bg-bg lg:hidden">
          <div aria-hidden className="mesh mesh-soft">
            <i />
            <i />
            <i />
          </div>
          <nav aria-label="Primary" className="wrap relative flex min-h-full flex-col justify-between gap-10 py-6">
            <ul>
              {MOBILE_NAV.map((item) => (
                <li key={item.to} className="border-b border-line">
                  <NavLink
                    to={item.to}
                    end={item.end}
                    className={({ isActive }) =>
                      cx(
                        'flex min-h-[3.75rem] items-center justify-between text-[1.5rem] font-semibold tracking-[-0.02em] no-underline',
                        isActive ? 'text-ink' : 'text-ink-2'
                      )
                    }
                    style={{ fontStretch: '108%' }}
                  >
                    {({ isActive }) => (
                      <>
                        <span className={cx('flex items-center gap-2', isActive && 'text-grad')}>
                          {item.label}
                          {'ai' in item && <Sparkles size={18} aria-hidden className="text-tone-pink" />}
                        </span>
                        {isActive && <span aria-hidden className="h-2.5 w-2.5 rounded-full bg-grad-brand" />}
                      </>
                    )}
                  </NavLink>
                </li>
              ))}
            </ul>
            <div className="grid gap-3 text-[0.9375rem]">
              <a
                href={RESUME.pdf}
                download=""
                onClick={() => trackEvent('resume_download', { file_extension: 'pdf', location: 'mobile_menu' })}
                className="btn btn-primary w-full"
              >
                <Download size={16} aria-hidden /> Download résumé
              </a>
              <a href={SOCIALS.email} className="text-ink underline decoration-line-2 underline-offset-4">
                {PERSON.email}
              </a>
              <div className="flex flex-wrap gap-x-6 gap-y-2 text-ink-2">
                <a href={SOCIALS.linkedin} target="_blank" rel="noreferrer">
                  LinkedIn
                </a>
                <a href={SOCIALS.github} target="_blank" rel="noreferrer">
                  GitHub
                </a>
              </div>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
