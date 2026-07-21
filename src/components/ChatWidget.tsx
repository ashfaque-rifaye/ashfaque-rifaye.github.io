import { useEffect, useRef, useState } from 'react';
import { Bot, Check, Copy, Send, X } from 'lucide-react';
import {
  askGateway, detectTopic, SUGGESTED_QUESTIONS, type ChatMessage,
} from '../lib/chat';
import { trackEvent } from '../lib/analytics';
import { cx } from '../lib/utils';
import { Markdown } from './Markdown';

const GREETING: ChatMessage = {
  role: 'model',
  text: "Hi! I'm Ashfaque's AI Twin. Ask me anything about his experience, skills, or projects! ✨",
  model: 'System',
};

export function ChatWidget({ activeSection, openSignal = 0 }: { activeSection: string; openSignal?: number }) {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<ChatMessage[]>([GREETING]);
  const [loading, setLoading] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const endRef = useRef<HTMLDivElement>(null);
  const turns = useRef(0);

  useEffect(() => {
    if (isOpen) endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history, isOpen]);

  /* external "open chat" requests (e.g. from the command palette) */
  useEffect(() => {
    if (openSignal > 0) {
      setIsOpen((prev) => {
        if (!prev) {
          turns.current = 0;
          trackEvent('chat_opened', { referrer_section: activeSection });
        }
        return true;
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openSignal]);

  const toggle = () => {
    setIsOpen((prev) => {
      const willOpen = !prev;
      if (willOpen) {
        turns.current = 0;
        trackEvent('chat_opened', { referrer_section: activeSection });
      } else {
        trackEvent('chat_closed', { turns_in_session: turns.current });
      }
      return willOpen;
    });
  };

  const send = async (raw?: string) => {
    const userMessage = (raw ?? input).trim();
    if (!userMessage || loading) return;
    setInput('');
    turns.current += 1;
    const turn = turns.current;
    const topic = detectTopic(userMessage);
    trackEvent('chat_message_sent', { query_length: userMessage.length, topic, turn_number: turn });

    const prior = history;
    setHistory((p) => [...p, { role: 'user', text: userMessage, model: 'You' }]);
    setLoading(true);
    try {
      const result = await askGateway(prior, userMessage);
      setHistory((p) => [...p, { role: 'model', text: result.text, model: result.model }]);
      if (result.viaFallback) {
        trackEvent('chat_fallback_used', { topic, turn_number: turn });
      } else {
        trackEvent('chat_response_received', {
          model_used: result.model, response_length: result.text.length, turn_number: turn,
        });
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Unexpected error';
      setHistory((p) => [...p, { role: 'model', text: 'Something went wrong — please try again shortly.', model: 'System' }]);
      trackEvent('chat_error', { error_message: msg.substring(0, 100), turn_number: turn });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3 md:bottom-6 md:right-6">
      {isOpen && (
        <div
          role="dialog"
          aria-label="Chat with Ashfaque's AI Twin"
          className="flex w-[calc(100vw-2.5rem)] max-w-sm animate-scale-in flex-col overflow-hidden rounded-2xl border border-line bg-surface shadow-lift"
          style={{ maxHeight: 'min(600px, calc(100vh - 8rem))' }}
        >
          {/* header */}
          <div className="flex items-center justify-between border-b border-line bg-gradient-to-r from-accent-500/12 via-accent-400/6 to-alt/8 p-4">
            <div className="flex items-center gap-2.5">
              <span className="grid h-9 w-9 place-items-center rounded-full bg-gradient-accent text-accent-ink shadow-glow">
                <Bot size={17} aria-hidden />
              </span>
              <div>
                <h3 className="text-sm font-semibold">Ashfaque's AI Twin</h3>
                <p className="text-xs text-faint">Ask about my experience</p>
              </div>
            </div>
            <button onClick={toggle} aria-label="Close chat" className="rounded-lg p-1 text-mute transition-colors hover:bg-accent-500/10">
              <X size={16} aria-hidden />
            </button>
          </div>

          {/* messages */}
          <div className="flex-1 space-y-3 overflow-y-auto p-4" style={{ minHeight: '240px' }}>
            {history.map((msg, i) => (
              <div key={i} className={cx('flex', msg.role === 'user' ? 'justify-end' : 'justify-start')}>
                <div
                  className={cx(
                    'max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed',
                    msg.role === 'user'
                      ? 'rounded-br-md bg-gradient-accent text-accent-ink'
                      : 'rounded-bl-md border border-line bg-raised text-ink'
                  )}
                >
                  {msg.role === 'model'
                    ? <Markdown text={msg.text} />
                    : <p className="whitespace-pre-line break-words">{msg.text}</p>}
                  <div className={cx('mt-1.5 flex items-center justify-between gap-2 font-mono text-[10px]', msg.role === 'user' ? 'text-accent-ink/70' : 'text-faint')}>
                    <span>{msg.model}</span>
                    {msg.role === 'model' && i > 0 && (
                      <button
                        onClick={() => {
                          navigator.clipboard?.writeText(msg.text);
                          setCopiedIndex(i);
                          window.setTimeout(() => setCopiedIndex(null), 1800);
                          trackEvent('chat_response_copied', { message_index: i });
                        }}
                        className="inline-flex items-center gap-1 opacity-60 transition-opacity hover:opacity-100"
                        aria-label="Copy response"
                      >
                        {copiedIndex === i ? <><Check size={11} aria-hidden /> Copied</> : <><Copy size={11} aria-hidden /> Copy</>}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start" aria-label="Thinking">
                <div className="rounded-2xl rounded-bl-md border border-line bg-raised px-4 py-3">
                  <div className="flex gap-1">
                    {[0, 150, 300].map((d) => (
                      <span key={d} className="h-2 w-2 animate-bounce rounded-full bg-accent-500/70" style={{ animationDelay: `${d}ms` }} />
                    ))}
                  </div>
                </div>
              </div>
            )}
            <div ref={endRef} />
          </div>

          {/* suggestions */}
          {history.length <= 2 && !loading && (
            <div className="border-t border-line px-4 py-3">
              <p className="mb-2 text-xs font-semibold text-faint">Suggested questions</p>
              <div className="flex flex-wrap gap-1.5">
                {SUGGESTED_QUESTIONS.map((q, idx) => (
                  <button
                    key={q}
                    onClick={() => {
                      trackEvent('chat_suggested_question_clicked', { question: q, question_index: idx });
                      void send(q);
                    }}
                    className="rounded-full border border-line bg-raised px-3 py-1.5 text-xs transition-colors hover:border-accent-500/40 hover:text-accent-text"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* input */}
          <form onSubmit={(e) => { e.preventDefault(); void send(); }} className="flex gap-2 border-t border-line p-3">
            <label htmlFor="chat-input" className="sr-only">Message the AI Twin</label>
            <input
              id="chat-input"
              className="flex-1 rounded-xl border border-line bg-base/60 px-3 py-2.5 text-sm outline-none transition-colors placeholder:text-faint focus:border-accent-500/60"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about my resume…"
              disabled={loading}
            />
            <button
              type="submit"
              disabled={loading}
              aria-label="Send message"
              className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gradient-accent text-accent-ink transition-all hover:brightness-105 disabled:opacity-50"
            >
              <Send size={16} aria-hidden />
            </button>
          </form>
        </div>
      )}

      {/* launcher */}
      <button
        onClick={toggle}
        aria-label={isOpen ? 'Close chat' : "Chat with Ashfaque's AI Twin"}
        className={cx(
          'grid h-[52px] w-[52px] place-items-center rounded-full bg-gradient-accent text-accent-ink shadow-glow transition-all duration-300 hover:scale-105 active:scale-95',
          isOpen && 'rotate-90'
        )}
      >
        {isOpen ? <X size={21} aria-hidden /> : <Bot size={21} aria-hidden />}
      </button>
    </div>
  );
}
