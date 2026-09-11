import { Moon, Sun } from 'lucide-react';
import { cx } from '../../lib/utils';
import { useUi } from '../../site/ui-state';

/** Sun in dark mode, moon in light mode. Both icons render and CSS shows
    the right one, so the prerendered HTML never flashes the wrong icon. */
export function ThemeToggle({ className }: { className?: string }) {
  const { theme, toggleTheme } = useUi();
  const next = theme === 'dark' ? 'light' : 'dark';
  return (
    <button
      type="button"
      onClick={() => toggleTheme('header')}
      aria-label={`Switch to ${next} theme`}
      title={`Switch to ${next} theme`}
      className={cx(
        'group grid h-10 w-10 place-items-center rounded-full border border-line bg-bg-2/60 text-ink-2 transition-colors hover:border-line-2 hover:text-ink',
        className
      )}
    >
      <Sun size={17} aria-hidden className="only-dark transition-transform duration-500 ease-spring group-hover:rotate-45" />
      <Moon size={17} aria-hidden className="only-light transition-transform duration-500 ease-spring group-hover:-rotate-12" />
    </button>
  );
}
