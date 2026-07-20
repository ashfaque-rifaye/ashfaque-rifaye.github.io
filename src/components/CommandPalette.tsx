import { useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import {
  Bot, CornerDownLeft, Download, Github, Linkedin, Mail, Search, Sun, type LucideIcon,
} from 'lucide-react';
import { NAV, SOCIALS } from '../data/profile';
import { trackEvent } from '../lib/analytics';
import { cx } from '../lib/utils';

interface Command {
  id: string;
  label: string;
  hint: string;
  icon: LucideIcon;
  run: () => void;
}

export function CommandPalette({
  isOpen,
  onClose,
  onResume,
  onChat,
  onTheme,
}: {
  isOpen: boolean;
  onClose: () => void;
  onResume: () => void;
  onChat: () => void;
  onTheme: () => void;
}) {
  const [query, setQuery] = useState('');
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const commands = useMemo<Command[]>(() => {
    const done = (action: string) => trackEvent('command_palette_action', { action });
    const nav: Command[] = NAV.map((n) => ({
      id: `nav-${n.id}`,
      label: `Go to ${n.label}`,
      hint: 'Section',
      icon: CornerDownLeft,
      run: () => {
        done(`nav_${n.id}`);
        onClose();
        document.getElementById(n.id)?.scrollIntoView({ behavior: 'smooth' });
      },
    }));
    return [
      ...nav,
      { id: 'resume', label: 'Download resume (PDF)', hint: 'Action', icon: Download, run: () => { done('resume'); onResume(); onClose(); } },
      { id: 'chat', label: 'Ask the AI Twin', hint: 'Action', icon: Bot, run: () => { done('chat'); onChat(); onClose(); } },
      { id: 'theme', label: 'Toggle light / dark', hint: 'Theme', icon: Sun, run: () => { done('theme'); onTheme(); } },
      { id: 'email', label: 'Email Ashfaque', hint: 'Contact', icon: Mail, run: () => { done('email'); window.location.href = `mailto:${SOCIALS.email}`; onClose(); } },
      { id: 'linkedin', label: 'Open LinkedIn', hint: 'Contact', icon: Linkedin, run: () => { done('linkedin'); window.open(SOCIALS.linkedin, '_blank'); onClose(); } },
      { id: 'github', label: 'Open GitHub', hint: 'Contact', icon: Github, run: () => { done('github'); window.open(SOCIALS.github, '_blank'); onClose(); } },
    ];
  }, [onClose, onResume, onChat, onTheme]);

  const filtered = commands.filter((c) => c.label.toLowerCase().includes(query.toLowerCase()));

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setActive(0);
      trackEvent('command_palette_opened', {});
      const t = window.setTimeout(() => inputRef.current?.focus(), 30);
      return () => clearTimeout(t);
    }
    return undefined;
  }, [isOpen]);

  useEffect(() => { setActive(0); }, [query]);

  if (!isOpen) return null;

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); setActive((a) => Math.min(a + 1, filtered.length - 1)); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setActive((a) => Math.max(a - 1, 0)); }
    else if (e.key === 'Enter') { e.preventDefault(); filtered[active]?.run(); }
  };

  return createPortal(
    <div role="dialog" aria-modal="true" aria-label="Command palette" className="fixed inset-0 z-[90] flex items-start justify-center p-4 pt-[12vh]">
      <div className="absolute inset-0 animate-fade-in bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-lg animate-scale-in overflow-hidden rounded-2xl border border-line bg-surface shadow-lift">
        <div className="flex items-center gap-3 border-b border-line px-4 py-3">
          <Search size={17} aria-hidden className="text-faint" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder="Type a command or search…"
            aria-label="Search commands"
            className="flex-1 bg-transparent text-sm text-ink outline-none placeholder:text-faint"
          />
          <kbd className="rounded-md border border-line px-1.5 py-0.5 font-mono text-[10px] text-faint">Esc</kbd>
        </div>
        <div className="max-h-[50vh] overflow-y-auto p-1.5">
          {filtered.length === 0 && <p className="px-3 py-6 text-center text-sm text-faint">No matching commands.</p>}
          {filtered.map((c, i) => (
            <button
              key={c.id}
              onMouseEnter={() => setActive(i)}
              onClick={() => c.run()}
              className={cx(
                'flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm transition-colors',
                i === active ? 'bg-accent-500/10 text-accent-text' : 'text-ink'
              )}
            >
              <c.icon size={16} aria-hidden className="shrink-0 opacity-70" />
              <span className="flex-1">{c.label}</span>
              <span className="text-[10px] uppercase tracking-wide text-faint">{c.hint}</span>
            </button>
          ))}
        </div>
      </div>
    </div>,
    document.body
  );
}
