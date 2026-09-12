import { Link } from 'react-router';
import { ArrowUpRight, Globe2, Wand2 } from 'lucide-react';
import { LIVE_APPS } from '../../content/demos';
import { trackEvent } from '../../lib/analytics';

/** Interactive builds: the Hiring Agent opens on this site, the rest in a new tab. */
export function LiveApps({ className }: { className?: string }) {
  return (
    <div className={className}>
      <p className="font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-ink-3">Try it live</p>
      <ul className="mt-4 grid gap-3 md:grid-cols-3">
        {LIVE_APPS.map((app) => {
          const inner = (
            <>
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-grad-cta text-white shadow-glow">
                {app.internal ? <Wand2 size={18} aria-hidden /> : <Globe2 size={18} aria-hidden />}
              </span>
              <span className="min-w-0 flex-1">
                <span className="flex items-center gap-1.5 font-semibold text-ink">
                  {app.name}
                  {app.internal ? <span className="chip !px-2 !py-0 !text-[0.6875rem]">On this site</span> : <ArrowUpRight size={15} aria-hidden className="text-tone-pink" />}
                </span>
                <span className="mt-1 block text-[0.875rem] leading-snug text-ink-3">{app.line}</span>
              </span>
            </>
          );
          const cls = 'panel card-lift flex h-full items-start gap-3.5 p-4 no-underline';
          return (
            <li key={app.name}>
              {app.internal ? (
                <Link to={app.href} className={cls}>
                  {inner}
                </Link>
              ) : (
                <a
                  href={app.href}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => trackEvent('project_link_click', { project: app.name, link_type: 'live' })}
                  className={cls}
                >
                  {inner}
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
