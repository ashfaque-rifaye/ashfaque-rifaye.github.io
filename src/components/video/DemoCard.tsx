import { Clock, Play } from 'lucide-react';
import { demoPoster } from '../../content/demos';
import type { Demo } from '../../content/types';
import { cx } from '../../lib/utils';
import { useUi } from '../../site/ui-state';

/** A playable demo: poster, gradient play orb, duration. Opens the player. */
export function DemoCard({
  demo,
  location,
  size = 'md',
  className,
  headingLevel = 'h3',
}: {
  demo: Demo;
  location: string;
  size?: 'lg' | 'md';
  className?: string;
  headingLevel?: 'h3' | 'h4';
}) {
  const { playDemo } = useUi();
  const poster = demoPoster(demo);
  const Heading = headingLevel;
  const onRequest = demo.kind === 'request';

  return (
    <article className={cx('panel card-lift group relative flex h-full flex-col overflow-hidden !rounded-3xl', className)}>
      <button
        type="button"
        onClick={() => playDemo(demo.id, location)}
        aria-label={`${onRequest ? 'Open' : 'Play'} video: ${demo.title} (${demo.duration})`}
        className="relative block aspect-video w-full overflow-hidden bg-bg-3 text-left"
      >
        {poster && (
          <img
            src={poster}
            alt=""
            loading="lazy"
            decoding="async"
            width={1280}
            height={720}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-expo group-hover:scale-[1.04]"
          />
        )}
        <span aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />
        <span
          aria-hidden
          className={cx('play-orb absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2', size === 'lg' ? 'h-20 w-20' : 'h-14 w-14')}
        >
          <Play size={size === 'lg' ? 28 : 20} className="translate-x-[2px]" fill="currentColor" />
        </span>
        <span className="absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-black/55 px-2.5 py-1 font-mono text-[0.6875rem] text-white backdrop-blur">
          <Clock size={12} aria-hidden /> {demo.duration}
        </span>
        {onRequest && (
          <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-[0.6875rem] font-semibold text-black">
            On request
          </span>
        )}
        <span className="absolute inset-x-0 bottom-0 block p-4 text-white sm:p-5">
          <span className="block font-mono text-[0.6875rem] uppercase tracking-[0.1em] text-white/70">{demo.context}</span>
        </span>
      </button>
      <div className={cx('flex flex-1 flex-col', size === 'lg' ? 'p-6 sm:p-7' : 'p-5')}>
        <Heading className={cx('text-ink', size === 'lg' ? 't-h3' : 'text-[1.0625rem] font-semibold leading-snug')} style={{ fontStretch: '106%' }}>
          {demo.title}
        </Heading>
        {size === 'lg' && <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-2">{demo.summary}</p>}
        <ul className="mt-auto flex flex-wrap gap-1.5 pt-4">
          {demo.tags.map((t) => (
            <li key={t} className="chip !px-2.5 !py-0.5 !text-[0.75rem]">
              {t}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}
