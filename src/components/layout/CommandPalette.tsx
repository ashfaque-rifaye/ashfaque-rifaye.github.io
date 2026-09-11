import { useEffect, useMemo, useRef, useState, type KeyboardEvent as ReactKeyboardEvent } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router';
import {
  ArrowUpRight, Bot, Copy, CornerDownLeft, Download, FileText, FlaskConical, Github, Linkedin, Mail, Play, Search, SunMoon, Wand2,
  type LucideIcon,
} from 'lucide-react';
import { DEMOS } from '../../content/demos';
import { LAB_PROJECTS } from '../../content/lab';
import { PERSON, RESUME, SOCIALS } from '../../content/profile';
import { CASE_STUDIES } from '../../content/work';
import { trackEvent } from '../../lib/analytics';
import { SAMPLE_ROLES } from '../../lib/hiring/samples';
import { useBodyScrollLock, useFocusTrap } from '../../lib/hooks';
import { copyText, cx, downloadUrl } from '../../lib/utils';
import { useUi } from '../../site/ui-state';

type Group = 'Ask AI' | 'Pages' | 'Case studies' | 'Demos' | 'AI Lab' | 'Agent' | 'Actions' | 'Elsewhere';

interface Command {
  id: string;
  label: string;
  group: Group;
  icon: LucideIcon;
  keywords?: string;
  hint?: string;
  run: () => void;
}

const QUESTION = /^(who|what|how|why|when|where|which|does|do|is|are|can|could|has|have|tell|explain)\b|\?$/i;

export function CommandPalette({ open, onClose }: { open: boolean; onClose: () => void }) {
  const navigate = useNavigate();
  const { openChat, playDemo, toggleTheme, runHiringAgent } = useUi();
  const [query, setQuery] = useState('');
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

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
      { id: 'work', label: 'Work', group: 'Pages', icon: CornerDownLeft, keywords: 'case studies projects', run: go('/work/', 'nav_work') },
      { id: 'demos', label: 'Demos', group: 'Pages', icon: CornerDownLeft, keywords: 'videos walkthroughs watch', run: go('/demos/', 'nav_demos') },
      { id: 'agent', label: 'Hiring Agent', group: 'Pages', icon: CornerDownLeft, keywords: 'job description match fit role recruiter', run: go('/agent/', 'nav_agent') },
      { id: 'lab', label: 'AI Lab', group: 'Pages', icon: CornerDownLeft, keywords: 'experiments builds hackathon', run: go('/lab/', 'nav_lab') },
      { id: 'about', label: 'About', group: 'Pages', icon: CornerDownLeft, keywords: 'story skills education certifications awards', run: go('/about/', 'nav_about') },
      { id: 'resume', label: 'Résumé', group: 'Pages', icon: CornerDownLeft, keywords: 'resume cv', run: go('/resume/', 'nav_resume') },
      { id: 'contact', label: 'Contact', group: 'Pages', icon: CornerDownLeft, keywords: 'email hire', run: go('/contact/', 'nav_contact') },
      ...CASE_STUDIES.map<Command>((cs) => ({
        id: cs.slug,
        label: cs.title,
        group: 'Case studies',
        icon: FileText,
        keywords: `${cs.subtitle} ${cs.tags.join(' ')} ${cs.proof.join(' ')}`,
        run: go(`/work/${cs.slug}/`, `case_${cs.slug}`),
      })),
      ...DEMOS.map<Command>((d) => ({
        id: `demo-${d.id}`,
        label: `${d.kind === 'request' ? 'Demo' : 'Play'}: ${d.title}`,
        group: 'Demos',
        icon: Play,
        hint: d.duration,
        keywords: `${d.project} video watch walkthrough ${d.tags.join(' ')}`,
        run: () => {
          done(`demo_${d.id}`);
          onClose();
          playDemo(d.id, 'command_palette');
        },
      })),
      ...LAB_PROJECTS.map<Command>((p) => ({
        id: `lab-${p.slug}`,
        label: p.name,
        group: 'AI Lab',
        icon: FlaskConical,
        hint: p.status,
        keywords: `${p.oneLiner} ${p.context} ${p.stack.join(' ')}`,
        run: go(`/lab/#${p.slug}`, `lab_${p.slug}`),
      })),
      {
        id: 'agent-run',
        label: 'Match Ashfaque to a job description',
        group: 'Agent',
        icon: Wand2,
        keywords: 'hiring agent fit role jd recruiter',
        run: () => {
          done('agent_open');
          onClose();
          runHiringAgent();
        },
      },
      ...SAMPLE_ROLES.map<Command>((s) => ({
        id: `sample-${s.id}`,
        label: `Try the agent on: ${s.label}`,
        group: 'Agent',
        icon: Wand2,
        keywords: 'sample role hiring agent',
        run: () => {
          done(`agent_sample_${s.id}`);
          onClose();
          runHiringAgent(s.jd);
        },
      })),
      {
        id: 'chat',
        label: 'Ask the AI Twin',
        group: 'Actions',
        icon: Bot,
        keywords: 'chat question assistant',
        run: () => {
          done('chat');
          onClose();
          openChat('command_palette');
        },
      },
      {
        id: 'theme',
        label: 'Toggle light / dark theme',
        group: 'Actions',
        icon: SunMoon,
        keywords: 'dark mode light mode appearance',
        run: () => {
          done('theme');
          toggleTheme('command_palette');
        },
      },
      {
        id: 'resume-pdf',
        label: 'Download résumé (PDF)',
        group: 'Actions',
        icon: Download,
        keywords: 'resume cv',
        run: () => {
          done('resume_pdf');
          trackEvent('resume_download', { file_extension: 'pdf', location: 'command_palette' });
          downloadUrl(RESUME.pdf, 'Ashfaque_Rifaye_Resume.pdf');
          onClose();
        },
      },
      {
        id: 'resume-docx',
        label: 'Download résumé (Word)',
        group: 'Actions',
        icon: Download,
        keywords: 'resume cv docx',
        run: () => {
          done('resume_docx');
          trackEvent('resume_download', { file_extension: 'docx', location: 'command_palette' });
          downloadUrl(RESUME.docx, 'Ashfaque_Rifaye_Resume.docx');
          onClose();
        },
      },
      {
        id: 'copy-email',
        label: 'Copy email address',
        group: 'Actions',
        icon: Copy,
        run: () => {
          done('copy_email');
          void copyText(PERSON.email);
          trackEvent('email_copied', { location: 'command_palette' });
          onClose();
        },
      },
      { id: 'email', label: 'Email Ashfaque', group: 'Elsewhere', icon: Mail, run: () => { done('email'); window.location.href = SOCIALS.email; } },
      { id: 'linkedin', label: 'LinkedIn', group: 'Elsewhere', icon: Linkedin, hint: 'New tab', run: () => { done('linkedin'); window.open(SOCIALS.linkedin, '_blank', 'noopener'); onClose(); } },
      { id: 'github', label: 'GitHub', group: 'Elsewhere', icon: Github, hint: 'New tab', run: () => { done('github'); window.open(SOCIALS.github, '_blank', 'noopener'); onClose(); } },
    ];
  }, [navigate, onClose, openChat, playDemo, toggleTheme, runHiringAgent]);

  const q = query.trim();
  const results = useMemo(() => {
    if (!q) return commands.filter((c) => c.group !== 'AI Lab' && !c.id.startsWith('sample-'));
    const tokens = q.toLowerCase().split(/\s+/);
    const matches = commands
      .map((c) => {
        const label = c.label.toLowerCase();
        const hay = `${label} ${(c.keywords ?? '').toLowerCase()} ${c.group.toLowerCase()}`;
        if (!tokens.every((t) => hay.includes(t))) return null;
        const score = (label.startsWith(tokens[0]) ? 3 : 0) + (tokens.every((t) => label.includes(t)) ? 2 : 0);
        return { c, score };
      })
      .filter((x): x is { c: Command; score: number } => x !== null)
      .sort((a, b) => b.score - a.score)
      .map((x) => x.c)
      .slice(0, 14);
    const ask: Command = {
      id: 'ask-ai',
      label: `Ask the AI Twin: “${q.length > 60 ? `${q.slice(0, 60)}…` : q}”`,
      group: 'Ask AI',
      icon: Bot,
      hint: 'Enter',
      run: () => {
        trackEvent('search_ask_ai', { query_length: q.length });
        onClose();
        openChat('command_palette', q);
      },
    };
    return matches.length === 0 || QUESTION.test(q) ? [ask, ...matches] : [...matches, ask];
  }, [q, commands, onClose, openChat]);

  useEffect(() => {
    if (!open) return undefined;
    setQuery('');
    setActive(0);
    const t = window.setTimeout(() => inputRef.current?.focus(), 20);
    return () => window.clearTimeout(t);
  }, [open]);

  useEffect(() => setActive(0), [query]);

  useEffect(() => {
    listRef.current?.querySelector(`[data-index="${active}"]`)?.scrollIntoView({ block: 'nearest' });
  }, [active]);

  if (!open) return null;

  const onKeyDown = (e: ReactKeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActive((a) => Math.min(a + 1, results.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      results[active]?.run();
    }
  };

  return createPortal(
    <div className="fixed inset-0 z-dialog flex items-start justify-center px-3 pt-[10vh] sm:px-4">
      <div aria-hidden className="absolute inset-0 bg-black/45 backdrop-blur-sm" onClick={onClose} />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Search the site"
        className="animate-dialog relative w-full max-w-xl overflow-hidden rounded-2xl border border-line bg-bg-2 shadow-lift"
      >
        <div className="flex items-center gap-3 border-b border-line px-4">
          <Search size={18} aria-hidden className="shrink-0 text-tone-violet" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder="Search pages, case studies, demos… or ask a question"
            aria-label="Search the site"
            aria-controls="palette-results"
            aria-activedescendant={results[active] ? `cmd-${results[active].id}` : undefined}
            role="combobox"
            aria-expanded="true"
            className="h-14 min-w-0 flex-1 bg-transparent text-[0.9875rem] text-ink outline-none placeholder:text-ink-4"
          />
          <kbd className="kbd">Esc</kbd>
        </div>
        <ul ref={listRef} id="palette-results" role="listbox" aria-label="Results" className="max-h-[min(26rem,58vh)] overflow-y-auto p-2">
          {results.map((c, i) => (
            <li key={c.id} role="presentation">
              {(i === 0 || results[i - 1].group !== c.group) && (
                <p className="px-3 pb-1.5 pt-3 font-mono text-[0.625rem] uppercase tracking-[0.12em] text-ink-4">{c.group}</p>
              )}
              <button
                id={`cmd-${c.id}`}
                data-index={i}
                type="button"
                role="option"
                aria-selected={i === active}
                onMouseMove={() => setActive(i)}
                onClick={() => c.run()}
                className={cx(
                  'flex min-h-11 w-full items-center gap-3 rounded-xl px-3 text-left text-[0.9375rem] transition-colors',
                  i === active ? 'bg-[linear-gradient(90deg,oklch(var(--g-2)/0.12),oklch(var(--g-3)/0.1))] text-ink' : 'text-ink-2'
                )}
              >
                <span
                  className={cx(
                    'grid h-8 w-8 shrink-0 place-items-center rounded-lg',
                    c.group === 'Ask AI' || c.group === 'Agent' ? 'bg-grad-cta text-white' : i === active ? 'bg-bg text-tone-violet' : 'bg-bg-3 text-ink-3'
                  )}
                >
                  <c.icon size={16} aria-hidden />
                </span>
                <span className="min-w-0 flex-1 truncate">{c.label}</span>
                {c.hint && <span className="shrink-0 font-mono text-[0.6875rem] text-ink-4">{c.hint}</span>}
                {c.group === 'Elsewhere' && <ArrowUpRight size={14} aria-hidden className="shrink-0 text-ink-4" />}
              </button>
            </li>
          ))}
        </ul>
        <div className="flex items-center justify-between gap-3 border-t border-line bg-bg-3/60 px-4 py-2.5 text-[0.75rem] text-ink-3">
          <span className="flex items-center gap-1.5">
            <kbd className="kbd">↑</kbd>
            <kbd className="kbd">↓</kbd> to move
            <kbd className="kbd ml-2">↵</kbd> to open
          </span>
          <span className="hidden items-center gap-1.5 sm:flex">
            <Bot size={13} aria-hidden className="text-tone-violet" /> Questions go to the AI Twin
          </span>
        </div>
      </div>
    </div>,
    document.body
  );
}
