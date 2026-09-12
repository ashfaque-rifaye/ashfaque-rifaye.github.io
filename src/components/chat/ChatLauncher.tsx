import { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { AVATAR } from '../../content/profile';
import { trackEvent } from '../../lib/analytics';
import { cx, session } from '../../lib/utils';
import { useUi } from '../../site/ui-state';

/** The floating AI Twin orb, plus a one-time greeting per visit. */
export function ChatLauncher({ open, onToggle }: { open: boolean; onToggle: () => void }) {
  const { openChat, runHiringAgent } = useUi();
  const [nudge, setNudge] = useState(false);

  useEffect(() => {
    if (session.get('twin-nudge')) return undefined;
    const t = window.setTimeout(() => {
      setNudge(true);
      session.set('twin-nudge', 1);
      trackEvent('chat_nudge_shown', {});
    }, 6500);
    return () => window.clearTimeout(t);
  }, []);

  useEffect(() => {
    if (open) setNudge(false);
  }, [open]);

  return (
    <div className="no-print fixed bottom-4 right-4 z-launcher flex flex-col items-end gap-3 sm:bottom-6 sm:right-6">
      {nudge && !open && (
        <div role="status" className="animate-pop glass ring-grad relative w-[min(19.5rem,calc(100vw-2rem))] rounded-2xl p-4 pr-10 shadow-lift">
          <button
            type="button"
            onClick={() => {
              setNudge(false);
              trackEvent('chat_nudge_clicked', { choice: 'dismiss' });
            }}
            aria-label="Dismiss"
            className="absolute right-2 top-2 grid h-8 w-8 place-items-center rounded-full text-ink-3 transition-colors hover:bg-bg-3 hover:text-ink"
          >
            <X size={15} aria-hidden />
          </button>
          <div className="flex items-center gap-3">
            <img
              src={AVATAR.face}
              alt=""
              width={40}
              height={40}
              className="h-10 w-10 shrink-0 rounded-full object-cover ring-2 ring-tone-violet/40"
            />
            <p className="text-[0.9375rem] font-semibold leading-snug text-ink">Hi, I&rsquo;m Ashfaque&rsquo;s AI Twin.</p>
          </div>
          <p className="mt-2 text-[0.8125rem] leading-snug text-ink-2">
            Ask me anything about his work, or let my Hiring Agent match him to your role.
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => {
                trackEvent('chat_nudge_clicked', { choice: 'ask' });
                openChat('nudge');
              }}
              className="btn btn-primary !min-h-9 !rounded-xl !px-3.5 !text-[0.8125rem]"
            >
              Ask a question
            </button>
            <button
              type="button"
              onClick={() => {
                trackEvent('chat_nudge_clicked', { choice: 'agent' });
                setNudge(false);
                runHiringAgent();
              }}
              className="btn btn-secondary !min-h-9 !rounded-xl !px-3.5 !text-[0.8125rem]"
            >
              Match a role
            </button>
          </div>
        </div>
      )}
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        aria-controls="twin-panel"
        aria-label={open ? 'Close the AI Twin' : "Chat with Ashfaque's AI Twin"}
        title={open ? 'Close the AI Twin' : "Ask Ashfaque's AI Twin"}
        className={cx('twin-orb h-14 w-14 sm:h-[3.75rem] sm:w-[3.75rem]', open && 'max-sm:hidden')}
      >
        {open ? (
          <X size={22} aria-hidden />
        ) : (
          <img src={AVATAR.face} alt="" width={96} height={96} className="h-[calc(100%-6px)] w-[calc(100%-6px)] rounded-full object-cover" />
        )}
        {!open && (
          <span aria-hidden className="absolute right-0 top-0 h-3.5 w-3.5 rounded-full border-2 border-bg bg-tone-emerald" />
        )}
      </button>
    </div>
  );
}
