import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router';
import { Menu, Search, X } from 'lucide-react';
import { PERSON, RESUME, SOCIALS } from '../../content/profile';
import { trackEvent } from '../../lib/analytics';
import { useBodyScrollLock, useFocusTrap, useScrolled } from '../../lib/hooks';
import { cx } from '../../lib/utils';
import { useUi } from '../../site/ui-state';

export const NAV = [
  { to: '/', label: 'Home', end: true },
  { to: '/work/', label: 'Work', end: false },
  { to: '/about/', label: 'About', end: false },
  { to: '/lab/', label: 'AI Lab', end: false },
  { to: '/resume/', label: 'Résumé', end: false },
  { to: '/contact/', label: 'Contact', end: false },
] as const;

export function SiteHeader() {
  const scrolled = useScrolled();
  const [open, setOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const { pathname } = useLocation();
  const { openPalette } = useUi();

  useEffect(() => setOpen(false), [pathname]);
  useBodyScrollLock(open);
  useFocusTrap(headerRef, open, () => setOpen(false));

  return (
    <header ref={headerRef} className="site-header" data-scrolled={scrolled} data-open={open}>
      <div className="wrap flex h-full items-center justify-between gap-6">
        <Link to="/" className="flex min-h-11 items-center gap-2.5 no-underline" aria-label={`${PERSON.name}, home`}>
          <span aria-hidden className="h-2 w-2 rounded-full bg-accent" />
          <span className="text-[1.0625rem] font-semibold tracking-[-0.01em] text-ink" style={{ fontStretch: '112%' }}>
            {PERSON.name}
          </span>
        </Link>

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-7">
            {NAV.map((item) => (
              <li key={item.to}>
                <NavLink to={item.to} end={item.end} className="nav-link">
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
            title="Search and quick navigation (Ctrl K or ⌘K)"
            className="hidden h-10 items-center gap-2 rounded border border-line px-3 text-[0.8125rem] text-ink-3 transition-colors hover:border-line-2 hover:text-ink lg:inline-flex"
          >
            <Search size={15} aria-hidden />
            Search
          </button>
          <button
            type="button"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((o) => !o)}
            className="inline-flex h-11 items-center gap-2 rounded border border-line px-3.5 text-[0.875rem] font-medium text-ink transition-colors hover:border-line-2 lg:hidden"
          >
            {open ? <X size={18} aria-hidden /> : <Menu size={18} aria-hidden />}
            {open ? 'Close' : 'Menu'}
          </button>
        </div>
      </div>

      {open && (
        <div id="mobile-menu" className="fixed inset-x-0 bottom-0 top-[var(--header-h)] z-overlay overflow-y-auto border-t border-line bg-bg lg:hidden">
          <nav aria-label="Primary" className="wrap flex min-h-full flex-col justify-between gap-12 py-8">
            <ul className="border-t border-line">
              {NAV.map((item) => (
                <li key={item.to} className="border-b border-line">
                  <NavLink
                    to={item.to}
                    end={item.end}
                    className={({ isActive }) =>
                      cx(
                        'flex min-h-16 items-center justify-between text-[1.625rem] font-medium tracking-[-0.02em] no-underline',
                        isActive ? 'text-ink' : 'text-ink-2'
                      )
                    }
                    style={{ fontStretch: '108%' }}
                  >
                    {({ isActive }) => (
                      <>
                        {item.label}
                        {isActive && <span aria-hidden className="h-2 w-2 rounded-full bg-accent" />}
                      </>
                    )}
                  </NavLink>
                </li>
              ))}
            </ul>
            <div className="grid gap-3 text-[0.9375rem]">
              <a href={SOCIALS.email} className="text-ink underline decoration-line-2 underline-offset-4">
                {PERSON.email}
              </a>
              <div className="flex flex-wrap gap-x-6 gap-y-2 text-ink-2">
                <a href={SOCIALS.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
                <a href={SOCIALS.github} target="_blank" rel="noreferrer">GitHub</a>
                <a
                  href={RESUME.pdf}
                  download=""
                  onClick={() => trackEvent('resume_download', { file_extension: 'pdf', location: 'mobile_menu' })}
                >
                  Résumé (PDF)
                </a>
              </div>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
