import { useCallback, useEffect, useRef, useState, type KeyboardEvent as ReactKeyboardEvent } from 'react';
import { useNavigate } from 'react-router';
import {
  ArrowRight, ArrowUp, ArrowUpRight, Bot, Check, CheckCircle2, Copy, Download, Mail, Moon, Play, RotateCcw, Sun, Wand2, X,
  type LucideIcon,
} from 'lucide-react';
import {
  actionDoneLabel, actionLabel, canAutoRun, runAction, type ActionContext, type SiteAction,
} from '../../lib/actions';
import { trackEvent } from '../../lib/analytics';
import { askTwin, detectTopic, SUGGESTED_QUESTIONS, type ChatMessage } from '../../lib/twin';
import { copyText, cx, session } from '../../lib/utils';
import { useUi, type ChatRequest } from '../../site/ui-state';
import { Markdown } from './Markdown';

const GREETING: ChatMessage = {
  role: 'model',
  text: "Hi! I'm Ashfaque's AI Twin. Ask me about his AI products, the AT&T assistant, DeviceFlex or his awards. I can also **play his demos**, open any page, or **match him to a job description**.",
  model: 'AI Twin',
};

const ICON: Record<SiteAction['type'], LucideIcon> = {
  navigate: ArrowRight,
  play_demo: Play,
  download_resume: Download,
  email: Mail,
  hiring_agent: Wand2,
  set_theme: Sun,
  copy_email: Copy,
  open_link: ArrowUpRight,
};

const STORE = 'twin-history-v2';
const isNarrow = () => typeof window !== 'undefined' && window.matchMedia('(max-width: 639px)').matches;

/** The AI Twin: a floating, non-modal assistant that answers and acts. */
export function ChatPanel({ open, request, onClose }: { open: boolean; request: ChatRequest | null; onClose: () => void }) {
  const ui = useUi();
  const navigate = useNavigate();
  const [history, setHistory] = useState<ChatMessage[]>(() => session.get<ChatMessage[]>(STORE) ?? [GREETING]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState<number | null>(null);
  const turns = useRef(0);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const logRef = useRef<HTMLDivElement>(null);
  const historyRef = useRef(history);
  historyRef.current = history;

  useEffect(() => session.set(STORE, history.slice(-30)), [history]);

  useEffect(() => {
    logRef.current?.scrollTo({ top: logRef.current.scrollHeight, behavior: 'smooth' });
  }, [history, loading, open]);

  const ctx: ActionContext = {
    navigate: (to) => navigate(to),
    playDemo: ui.playDemo,
    setTheme: ui.setTheme,
    runHiringAgent: (jd) => ui.runHiringAgent(jd, 'chat'),
  };

  const act = (a: SiteAction, index: number, auto: boolean) => {
    runAction(a, ctx, 'chat');
    trackEvent('chat_action', { action: a.type, auto: auto ? 'yes' : 'no' });
    setHistory((h) =>
      h.map((m, i) =>
        i === index ? { ...m, actions: m.actions?.filter((x) => x !== a), done: [...(m.done ?? []), actionDoneLabel(a)] } : m
      )
    );
    if (isNarrow() && (a.type === 'navigate' || a.type === 'hiring_agent')) onClose();
  };

  const send = useCallback(
    async (raw?: string) => {
      const message = (raw ?? input).trim();
      if (!message || loading) return;
      setInput('');
      turns.current += 1;
      const turn = turns.current;
      const topic = detectTopic(message);
      trackEvent('chat_message_sent', { query_length: message.length, topic, turn_number: turn });
      const prior = historyRef.current;
      setHistory((h) => [...h, { role: 'user', text: message, model: 'You' }]);
      setLoading(true);
      try {
        const reply = await askTwin(prior, message);
        // Low-risk actions the visitor asked for run immediately; the rest wait for a click.
        const auto =
          reply.actions.find((a) => canAutoRun(a, message)) ??
          (reply.model === 'Site action' ? reply.actions.find((a) => a.type === 'set_theme' || a.type === 'play_demo') : undefined);
        if (auto) {
          runAction(auto, ctx, 'chat');
          trackEvent('chat_action', { action: auto.type, auto: 'yes' });
        }
        setHistory((h) => [
          ...h,
          {
            role: 'model',
            text: reply.text,
            model: reply.model,
            actions: reply.actions.filter((a) => a !== auto),
            done: auto ? [actionDoneLabel(auto)] : [],
          },
        ]);
        if (reply.viaFallback) trackEvent('chat_fallback_used', { topic, turn_number: turn });
        else trackEvent('chat_response_received', { model_used: reply.model, response_length: reply.text.length, turn_number: turn });
        if (auto && isNarrow() && auto.type === 'navigate') onClose();
      } catch (err) {
        const msg = err instanceof Error ? err.message : 'Unexpected error';
        setHistory((h) => [...h, { role: 'model', text: 'Something went wrong. Please try again, or use the contact page.', model: 'System' }]);
        trackEvent('chat_error', { error_message: msg.slice(0, 100), turn_number: turn });
      } finally {
        setLoading(false);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [input, loading]
  );

  /* Open requests: focus, or send a message handed over (palette, buttons).
     The ref guard keeps a hand-off from being sent twice. */
  const handled = useRef<number | null>(null);
  useEffect(() => {
    if (!open || !request || handled.current === request.nonce) return undefined;
    handled.current = request.nonce;
    trackEvent('chat_opened', { location: request.location });
    if (request.message) {
      void send(request.message);
      return undefined;
    }
    const t = window.setTimeout(() => inputRef.current?.focus(), 80);
    return () => window.clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [request?.nonce, open]);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !document.querySelector('[aria-modal="true"]')) {
        trackEvent('chat_closed', { turns_in_session: turns.current });
        onClose();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  const onInputKey = (e: ReactKeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      void send();
    }
  };

  const reset = () => {
    setHistory([GREETING]);
    turns.current = 0;
    inputRef.current?.focus();
  };

  return (
    <section
      id="twin-panel"
      role="dialog"
      aria-modal="false"
      aria-labelledby="twin-title"
      className={cx(
        'no-print animate-pop fixed inset-2 z-launcher flex-col overflow-hidden rounded-3xl border border-line bg-bg-2 shadow-lift sm:inset-auto sm:bottom-[6.5rem] sm:right-6 sm:h-[min(41rem,calc(100dvh-8.5rem))] sm:w-[25.5rem]',
        open ? 'flex' : 'hidden'
      )}
    >
      <header className="relative flex items-center gap-3 overflow-hidden bg-grad-cta px-4 py-3.5 text-white">
        <span aria-hidden className="absolute -right-10 -top-16 h-40 w-40 rounded-full bg-white/15 blur-2xl" />
        <span className="relative grid h-10 w-10 shrink-0 place-items-center rounded-full bg-white/20 ring-1 ring-white/40">
          <Bot size={20} aria-hidden />
          <span aria-hidden className="absolute -right-0.5 -top-0.5 h-3 w-3 rounded-full border-2 border-white bg-tone-emerald" />
        </span>
        <div className="relative min-w-0 flex-1">
          <h2 id="twin-title" className="text-[1rem] font-semibold text-white" style={{ fontStretch: '106%' }}>
            Ashfaque&rsquo;s AI Twin
          </h2>
          <p className="truncate text-[0.75rem] text-white/80">Verified answers · takes actions</p>
        </div>
        <button
          type="button"
          onClick={reset}
          aria-label="Start a new chat"
          title="New chat"
          className="relative grid h-9 w-9 place-items-center rounded-full text-white/85 transition-colors hover:bg-white/15 hover:text-white"
        >
          <RotateCcw size={16} aria-hidden />
        </button>
        <button
          type="button"
          onClick={() => {
            trackEvent('chat_closed', { turns_in_session: turns.current });
            onClose();
          }}
          aria-label="Close the AI Twin"
          className="relative grid h-9 w-9 place-items-center rounded-full text-white/85 transition-colors hover:bg-white/15 hover:text-white"
        >
          <X size={18} aria-hidden />
        </button>
      </header>

      <div ref={logRef} role="log" aria-live="polite" aria-busy={loading} className="flex-1 space-y-4 overflow-y-auto px-4 py-5">
        {history.map((m, i) => (
          <div key={i} className={cx('flex flex-col', m.role === 'user' ? 'items-end' : 'items-start')}>
            <div
              className={cx(
                'max-w-[88%] rounded-2xl px-3.5 py-2.5 text-[0.9375rem] leading-relaxed',
                m.role === 'user' ? 'rounded-br-md bg-grad-cta text-white' : 'rounded-bl-md border border-line bg-bg-3/70 text-ink-2'
              )}
            >
              {m.role === 'model' ? <Markdown text={m.text} /> : <p className="whitespace-pre-line break-words">{m.text.length > 600 ? `${m.text.slice(0, 600)}…` : m.text}</p>}
            </div>

            {m.done && m.done.length > 0 && (
              <ul className="mt-2 grid gap-1">
                {m.done.map((d) => (
                  <li key={d} className="flex items-center gap-1.5 text-[0.8125rem] font-medium text-tone-emerald">
                    <CheckCircle2 size={14} aria-hidden /> {d}
                  </li>
                ))}
              </ul>
            )}

            {m.actions && m.actions.length > 0 && (
              <div className="mt-2 flex max-w-[92%] flex-wrap gap-1.5">
                {m.actions.map((a, k) => {
                  const Icon = a.type === 'set_theme' && a.theme === 'dark' ? Moon : ICON[a.type];
                  return (
                    <button
                      key={`${a.type}-${k}`}
                      type="button"
                      onClick={() => act(a, i, false)}
                      className="ring-grad inline-flex min-h-9 items-center gap-1.5 rounded-full bg-bg-2 px-3 text-[0.8125rem] font-medium text-ink transition-transform hover:-translate-y-px"
                      style={{ ['--ring-o' as string]: '0.8' }}
                    >
                      <Icon size={14} aria-hidden className="text-tone-violet" />
                      {actionLabel(a)}
                    </button>
                  );
                })}
              </div>
            )}

            <div className="mt-1 flex items-center gap-2 px-1 font-mono text-[0.625rem] uppercase tracking-[0.08em] text-ink-4">
              <span>{m.model}</span>
              {m.role === 'model' && i > 0 && (
                <button
                  type="button"
                  onClick={async () => {
                    if (await copyText(m.text)) {
                      setCopied(i);
                      window.setTimeout(() => setCopied(null), 1600);
                    }
                  }}
                  className="inline-flex items-center gap-1 normal-case tracking-normal text-ink-3 transition-colors hover:text-ink"
                  aria-label="Copy answer"
                >
                  {copied === i ? <Check size={11} aria-hidden /> : <Copy size={11} aria-hidden />}
                  {copied === i ? 'Copied' : 'Copy'}
                </button>
              )}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex items-center gap-2.5" aria-label="Thinking">
            <span className="flex gap-1 rounded-2xl rounded-bl-md border border-line bg-bg-3/70 px-3.5 py-3">
              {[0, 160, 320].map((d) => (
                <span key={d} className="typing-dot h-1.5 w-1.5 rounded-full bg-tone-violet" style={{ animationDelay: `${d}ms` }} />
              ))}
            </span>
            <span className="shimmer text-[0.8125rem]">Checking his record…</span>
          </div>
        )}
      </div>

      {history.length <= 1 && !loading && (
        <div className="border-t border-line px-4 py-3">
          <p className="mb-2 font-mono text-[0.625rem] uppercase tracking-[0.1em] text-ink-3">Try</p>
          <div className="flex flex-wrap gap-1.5">
            {SUGGESTED_QUESTIONS.map((q, idx) => (
              <button
                key={q}
                type="button"
                onClick={() => {
                  trackEvent('chat_suggested_question_clicked', { question: q, question_index: idx });
                  void send(q);
                }}
                className="chip min-h-8 transition-transform hover:-translate-y-px hover:text-ink"
              >
                {q}
              </button>
            ))}
          </div>
        </div>
      )}

      <form
        onSubmit={(e) => {
          e.preventDefault();
          void send();
        }}
        className="flex items-end gap-2 border-t border-line bg-bg-2 p-3"
      >
        <label htmlFor="twin-input" className="sr-only">
          Ask the AI Twin, or paste a job description
        </label>
        <textarea
          id="twin-input"
          ref={inputRef}
          rows={1}
          value={input}
          maxLength={6000}
          onChange={(e) => {
            setInput(e.target.value);
            e.target.style.height = 'auto';
            e.target.style.height = `${Math.min(e.target.scrollHeight, 120)}px`;
          }}
          onKeyDown={onInputKey}
          placeholder="Ask anything, or paste a job description"
          disabled={loading}
          className="max-h-[120px] min-h-11 flex-1 resize-none rounded-xl border border-line bg-bg px-3.5 py-2.5 text-[0.9375rem] leading-snug text-ink outline-none transition-colors placeholder:text-ink-4 focus:border-tone-violet"
        />
        <button
          type="submit"
          disabled={loading || !input.trim()}
          aria-label="Send"
          className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-grad-cta text-white shadow-glow transition-transform hover:-translate-y-px disabled:cursor-not-allowed disabled:opacity-40 disabled:shadow-none"
        >
          <ArrowUp size={18} aria-hidden />
        </button>
      </form>
    </section>
  );
}
