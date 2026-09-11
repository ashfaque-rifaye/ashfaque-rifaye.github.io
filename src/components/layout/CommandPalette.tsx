import { useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router';
import {
  Bot, Copy, CornerDownLeft, Download, Github, Linkedin, Mail, Search, type LucideIcon,
} from 'lucide-react';
import { PERSON, RESUME, SOCIALS } from '../../content/profile';
import { CASE_STUDIES } from '../../content/work';
import { trackEvent } from '../../lib/analytics';
import { useBodyScrollLock, useFocusTrap } from '../../lib/hooks';
import { cx } from '../../lib/utils';

interface Command {
  id: string;
  label: string;
  group: 'Pages' | 'Case studies' | 'Actions' | 'Elsewhere';
  icon: LucideIcon;
  keywords?: string;
  run: () => void;
}

export function CommandPalette({ open, onClose, onChat }: { open: boolean; onClose: () => void; onChat: () => void }) {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useBodyScrollLock(open);
  useFocusTrap(panelRef, open, onClose);

  const commands = useMemo<Command[]>(() => {
    const done = (action: string) => trackEvent('command_palette_action', { action });
    const go = (path: string, action: string) => () => {
      done(action);
      onClose();
      navigate(path);
    };
    return [
      { id: 'home', label: 'Home', group: 'Pages', icon: CornerDownLeft, run: go('/', 'nav_home') },
      { id: 'work', label: 'Work', group: 'Pages', icon: CornerDownLeft, run: go('/work/', 'nav_work') },
      { id: 'lab', label: 'AI Lab', group: 'Pages', icon: CornerDownLeft, keywords: 'experiments projects', run: go('/lab/', 'nav_lab') },
      { id: 'about', label: 'About', group: 'Pages', icon: CornerDownLeft, keywords: 'story skills', run: go('/about/', 'nav_about') },
      { id: 'resume', label: 'Résumé', group: 'Pages', icon: CornerDownLeft, keywords: 'resume cv', run: go('/resume/', 'nav_resume') },
      { id: 'contact', label: 'Contact', group: 'Pages', icon: CornerDownLeft, run: go('/contact/', 'nav_contact') },
      ...CASE_STUDIES.map<Command>((cs) => ({
        id: cs.slug,
        label: cs.title,
        group: 'Case studies',
        icon: CornerDownLeft,
        keywords: cs.tags.join(' '),
        run: go(`/work/${cs.slug}/`, `case_${cs.slug}`),
      })),
      {
        id: 'resume-pdf',
        label: 'Download résumé (PDF)',
        group: 'Actions',
        icon: Download,
        keywords: 'resume cv',
        run: () => {
          done('resume_pdf');
          trackEvent('resume_download', { file_extension: 'pdf', location: 'command_palette' });
          const a = document.createElement('a');
          a.href = RESUME.pdf;
          a.download = '';
          a.click();
          onClose();
        },
      },
      { id: 'chat', label: 'Ask the AI Twin', group: 'Actions', icon: Bot, keywords: 'chat question', run: () => { done('chat'); onClose(); onChat(); } },
      {
        id: 'copy-email',
        label: 'Copy email address',
        group: 'Actions',
        icon: Copy,
        run: () => {
          done('copy_email');
          void navigator.clipboard?.writeText(PERSON.email).catch(() => undefined);
          trackEvent('email_copied', { location: 'command_palette' });
          onClose();
        },
      },
      { id: 'email', label: 'Email Ashfaque', group: 'Elsewhere', icon: Mail, run: () => { done('email'); window.location.href = SOCIALS.email; } },
      { id: 'linkedin', label: 'LinkedIn', group: 'Elsewhere', icon: Linkedin, run: () => { done('linkedin'); window.open(SOCIALS.linkedin, '_blank', 'noopener'); onClose(); } },
      { id: 'github', label: 'GitHub', group: 'Elsewhere', icon: Github, run: () => { done('github'); window.open(SOCIALS.github, '_blank', 'noopener'); onClose(); } },
    ];
  }, [navigate, onClose, onChat]);

  const q = query.trim().toLowerCase();
  const filtered = q
    ? commands.filter((c) => `${c.label} ${c.keywords ?? ''} ${c.group}`.toLowerCase().includes(q))
    : commands;

  useEffect(() => {
    if (!open) return undefined;
    setQuery('');
    setActive(0);
    const t = window.setTimeout(() => inputRef.current?.focus(), 20);
    return () => window.clearTimeout(t);
  }, [open]);

  useEffect(() => setActive(0), [query]);

  if (!open) return null;

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActive((a) => Math.min(a + 1, filtered.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      filtered[active]?.run();
    }
  };

  return createPortal(
    <div className="fixed inset-0 z-dialog flex items-start justify-center px-4 pt-[12vh]">
      <div aria-hidden className="absolute inset-0 bg-bg/75 backdrop-blur-sm" onClick={onClose} />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Search and quick navigation"
        className="relative w-full max-w-lg overflow-hidden rounded-md border border-line-2 bg-bg-2 shadow-2xl [animation:dialog-in_260ms_var(--ease-expo)_both]"
      >
        <div className="flex items-center gap-3 border-b border-line px-4">
          <Search size={17} aria-hidden className="text-ink-3" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder="Jump to a page, case study or action"
            aria-label="Search pages and actions"
            aria-controls="palette-results"
            aria-activedescendant={filtered[active] ? `cmd-${filtered[active].id}` : undefined}
            className="h-14 flex-1 bg-transparent text-[0.9375rem] text-ink outline-none placeholder:text-ink-3"
          />
          <kbd className="rounded border border-line px-1.5 py-0.5 font-mono text-[0.625rem] text-ink-3">Esc</kbd>
        </div>
        <ul id="palette-results" role="listbox" aria-label="Results" className="max-h-[min(24rem,55vh)] overflow-y-auto p-1.5">
          {filtered.length === 0 && <li className="px-3 py-8 text-center text-[0.875rem] text-ink-3">Nothing matches that.</li>}
          {filtered.map((c, i) => (
            <li key={c.id} role="presentation">
              {(i === 0 || filtered[i - 1].group !== c.group) && (
                <p className="t-label px-3 pb-1.5 pt-3">{c.group}</p>
              )}
              <button
                id={`cmd-${c.id}`}
                type="button"
                role="option"
                aria-selected={i === active}
                onMouseMove={() => setActive(i)}
                onClick={() => c.run()}
                className={cx(
                  'flex min-h-11 w-full items-center gap-3 rounded px-3 text-left text-[0.9375rem] transition-colors',
                  i === active ? 'bg-bg-3 text-ink' : 'text-ink-2'
                )}
              >
                <c.icon size={16} aria-hidden className={i === active ? 'text-accent' : 'text-ink-4'} />
                {c.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>,
    document.body
  );
}
