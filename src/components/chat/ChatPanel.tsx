import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { ArrowUp, X } from 'lucide-react';
import { askGateway, detectTopic, SUGGESTED_QUESTIONS, type ChatMessage } from '../../lib/chat';
import { trackEvent } from '../../lib/analytics';
import { useBodyScrollLock, useFocusTrap } from '../../lib/hooks';
import { cx } from '../../lib/utils';
import { Markdown } from './Markdown';

const GREETING: ChatMessage = {
  role: 'model',
  text: "Ask about Ashfaque's AI products, the AT&T assistant, DeviceFlex, awards or availability. I answer from a verified fact sheet and say so when I don't know.",
  model: 'AI Twin',
};

/** The AI Twin, an AI Lab experiment. Mounted only while open. */
export function ChatPanel({ location, onClose }: { location: string; onClose: () => void }) {
  const panelRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const logRef = useRef<HTMLDivElement>(null);
  const turns = useRef(0);
  const [history, setHistory] = useState<ChatMessage[]>([GREETING]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const close = () => {
    trackEvent('chat_closed', { turns_in_session: turns.current });
    onClose();
  };

  useBodyScrollLock(true);
  useFocusTrap(panelRef, true, close);

  useEffect(() => {
    trackEvent('chat_opened', { location });
    const t = window.setTimeout(() => inputRef.current?.focus(), 60);
    return () => window.clearTimeout(t);
  }, [location]);

  useEffect(() => {
    logRef.current?.scrollTo({ top: logRef.current.scrollHeight, behavior: 'smooth' });
  }, [history, loading]);

  const send = async (raw?: string) => {
    const message = (raw ?? input).trim();
    if (!message || loading) return;
    setInput('');
    turns.current += 1;
    const turn = turns.current;
    const topic = detectTopic(message);
    trackEvent('chat_message_sent', { query_length: message.length, topic, turn_number: turn });
    const prior = history;
    setHistory((h) => [...h, { role: 'user', text: message, model: 'You' }]);
    setLoading(true);
    try {
      const result = await askGateway(prior, message);
      setHistory((h) => [...h, { role: 'model', text: result.text, model: result.model }]);
      if (result.viaFallback) trackEvent('chat_fallback_used', { topic, turn_number: turn });
      else trackEvent('chat_response_received', { model_used: result.model, response_length: result.text.length, turn_number: turn });
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Unexpected error';
      setHistory((h) => [...h, { role: 'model', text: 'Something went wrong. Please try again, or use the contact page.', model: 'System' }]);
      trackEvent('chat_error', { error_message: msg.slice(0, 100), turn_number: turn });
    } finally {
      setLoading(false);
    }
  };

  return createPortal(
    <div className="fixed inset-0 z-dialog">
      <div aria-hidden className="absolute inset-0 bg-bg/70 backdrop-blur-sm" onClick={close} />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="chat-title"
        className="absolute inset-y-0 right-0 flex w-full max-w-md flex-col border-l border-line-2 bg-bg-2 shadow-2xl [animation:dialog-in_320ms_var(--ease-expo)_both]"
      >
        <div className="flex items-start justify-between gap-4 border-b border-line px-5 py-4">
          <div>
            <h2 id="chat-title" className="text-[1.0625rem] font-semibold text-ink" style={{ fontStretch: '108%' }}>
              AI Twin
            </h2>
            <p className="mt-0.5 text-[0.8125rem] leading-snug text-ink-3">
              An AI Lab experiment. Answers come from a verified fact sheet.
            </p>
          </div>
          <button type="button" onClick={close} aria-label="Close the AI Twin" className="grid h-11 w-11 shrink-0 place-items-center rounded border border-line text-ink-2 transition-colors hover:border-line-2 hover:text-ink">
            <X size={18} aria-hidden />
          </button>
        </div>

        <div ref={logRef} role="log" aria-live="polite" aria-busy={loading} className="flex-1 space-y-5 overflow-y-auto px-5 py-6">
          {history.map((m, i) => (
            <div key={i} className={cx('flex flex-col', m.role === 'user' ? 'items-end' : 'items-start')}>
              <div
                className={cx(
                  'max-w-[88%] rounded px-4 py-3 text-[0.9375rem] leading-relaxed',
                  m.role === 'user' ? 'bg-bg-3 text-ink' : 'border border-line bg-bg text-ink-2'
                )}
              >
                {m.role === 'model' ? <Markdown text={m.text} /> : <p className="whitespace-pre-line break-words">{m.text}</p>}
              </div>
              <span className="t-label mt-1.5 normal-case tracking-normal">{m.model}</span>
            </div>
          ))}
          {loading && (
            <p className="t-label normal-case tracking-normal" aria-label="Answering">
              Answering…
            </p>
          )}
        </div>

        {history.length <= 1 && !loading && (
          <div className="border-t border-line px-5 py-4">
            <p className="t-label mb-3">Try asking</p>
            <div className="flex flex-wrap gap-2">
              {SUGGESTED_QUESTIONS.map((q, idx) => (
                <button
                  key={q}
                  type="button"
                  onClick={() => {
                    trackEvent('chat_suggested_question_clicked', { question: q, question_index: idx });
                    void send(q);
                  }}
                  className="min-h-10 rounded border border-line px-3 text-left text-[0.875rem] text-ink-2 transition-colors hover:border-line-2 hover:text-ink"
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
          className="flex gap-2 border-t border-line p-4"
        >
          <label htmlFor="chat-input" className="sr-only">
            Ask the AI Twin a question
          </label>
          <input
            id="chat-input"
            ref={inputRef}
            value={input}
            maxLength={500}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask a question"
            disabled={loading}
            className="h-12 flex-1 rounded border border-line bg-bg px-3.5 text-[0.9375rem] text-ink outline-none transition-colors placeholder:text-ink-3 focus:border-accent"
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            aria-label="Send question"
            className="grid h-12 w-12 shrink-0 place-items-center rounded bg-accent text-accent-ink transition-colors hover:bg-accent-hi disabled:cursor-not-allowed disabled:opacity-40"
          >
            <ArrowUp size={18} aria-hidden />
          </button>
        </form>
      </div>
    </div>,
    document.body
  );
}
