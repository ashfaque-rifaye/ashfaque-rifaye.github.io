import { useEffect, useState } from 'react';
import { Command, Download, Menu, Moon, Sun, X } from 'lucide-react';
import { NAV } from '../data/profile';
import { cx } from '../lib/utils';

export function Nav({
  active,
  theme,
  onToggleTheme,
  onOpenPalette,
  onResume,
  progress,
}: {
  active: string;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
  onOpenPalette: () => void;
  onResume: () => void;
  progress: number;
}) {
  const [menuOpen, setMenuOpen] = useState(false);

  // close the mobile menu when resizing up to desktop
  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setMenuOpen(false); };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-line/70 bg-base/80 backdrop-blur-xl">
      {/* reading progress */}
      <div aria-hidden className="absolute inset-x-0 top-0 h-[2px]">
        <div
          className="h-full origin-left bg-gradient-to-r from-accent-600 via-accent-400 to-alt"
          style={{ transform: `scaleX(${progress})` }}
        />
      </div>

      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 md:px-8">
        <a href="#hero" className="group flex items-center gap-3" aria-label="Back to top">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-accent text-accent-ink shadow-glow transition-transform group-hover:scale-105">
            <span className="display-accent !text-accent-ink text-lg leading-none">A</span>
          </span>
          <span className="hidden flex-col text-left sm:flex">
            <span className="text-sm font-semibold leading-tight">Ashfaque Rifaye</span>
            <span className="text-[10px] font-medium uppercase tracking-[0.16em] text-faint">AI Product Manager</span>
          </span>
        </a>

        {/* Desktop nav */}
        <nav aria-label="Primary" className="hidden items-center gap-1 md:flex">
          {NAV.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              aria-current={active === item.id ? 'true' : undefined}
              className={cx(
                'rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors',
                active === item.id
                  ? 'bg-accent-500/10 text-accent-text'
                  : 'text-mute hover:bg-raised hover:text-ink'
              )}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            onClick={onOpenPalette}
            aria-label="Open command palette (Cmd+K)"
            className="hidden h-9 items-center gap-1.5 rounded-full border border-line bg-surface px-3 text-xs font-medium text-mute transition-colors hover:border-accent-500/40 hover:text-ink md:inline-flex"
          >
            <Command size={13} aria-hidden /> <span className="font-mono">K</span>
          </button>
          <button
            onClick={onToggleTheme}
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            className="grid h-9 w-9 place-items-center rounded-full border border-line bg-surface text-mute transition-colors hover:border-accent-500/40 hover:text-ink"
          >
            {theme === 'dark' ? <Moon size={15} aria-hidden /> : <Sun size={15} aria-hidden />}
          </button>
          <button
            onClick={onResume}
            className="hidden items-center gap-2 rounded-full bg-accent px-4 py-2 text-sm font-semibold text-accent-ink shadow-glow transition-all hover:brightness-105 active:scale-95 md:inline-flex"
          >
            <Download size={14} aria-hidden /> Resume
          </button>
          <button
            onClick={() => setMenuOpen((o) => !o)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            className="grid h-9 w-9 place-items-center rounded-full border border-line bg-surface text-ink md:hidden"
          >
            {menuOpen ? <X size={17} aria-hidden /> : <Menu size={17} aria-hidden />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav
          aria-label="Mobile"
          className="animate-fade-in border-b border-line bg-base/95 px-5 pb-4 pt-1 backdrop-blur-xl md:hidden"
        >
          {NAV.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={() => setMenuOpen(false)}
              aria-current={active === item.id ? 'true' : undefined}
              className={cx(
                'block rounded-xl px-4 py-3 text-[15px] font-medium transition-colors',
                active === item.id ? 'bg-accent-500/10 text-accent-text' : 'text-ink hover:bg-raised'
              )}
            >
              {item.label}
            </a>
          ))}
          <button
            onClick={() => { setMenuOpen(false); onResume(); }}
            className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-accent px-4 py-3 text-sm font-semibold text-accent-ink"
          >
            <Download size={15} aria-hidden /> Download Resume
          </button>
        </nav>
      )}
    </header>
  );
}
