import { useState, type ReactNode } from 'react';
import { Clock, Mail, Play } from 'lucide-react';
import { demoById, demoPoster } from '../../content/demos';
import { PERSON } from '../../content/profile';
import { trackEvent } from '../../lib/analytics';

/** Inline, click-to-play demo video: nothing loads from YouTube (or the
    self-hosted file) until the visitor asks. A demo shared "on request"
    stays honest: poster plus a request button. */
export function VideoEmbed({ demoId, note, location = 'inline' }: { demoId: string; note?: ReactNode; location?: string }) {
  const demo = demoById(demoId);
  const [playing, setPlaying] = useState(false);
  if (!demo) return null;
  const poster = demoPoster(demo);
  const play = () => {
    setPlaying(true);
    trackEvent('demo_play', { demo: demo.id, location });
  };

  return (
    <div className="my-8">
      <div className="ring-grad group relative aspect-video overflow-hidden rounded-2xl bg-bg-3 shadow-card" style={{ ['--ring-o' as string]: '0.7' }}>
        {playing && demo.kind === 'youtube' && demo.youtubeId && (
          <iframe
            className="absolute inset-0 h-full w-full"
            src={`https://www.youtube-nocookie.com/embed/${demo.youtubeId}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
            title={demo.title}
            allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
            allowFullScreen
          />
        )}
        {playing && demo.kind === 'file' && demo.src && (
          <video className="absolute inset-0 h-full w-full bg-black" src={demo.src} poster={poster} controls autoPlay playsInline preload="auto" />
        )}
        {!playing && (
          <>
            {poster && (
              <img
                src={poster}
                alt=""
                loading="lazy"
                decoding="async"
                width={1280}
                height={720}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-expo group-hover:scale-[1.03]"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent" />
            {demo.kind === 'request' ? (
              <div className="absolute inset-x-0 bottom-0 flex flex-wrap items-end justify-between gap-4 p-5 text-white md:p-7">
                <span>
                  <span className="block text-[1.0625rem] font-semibold">{demo.title}</span>
                  <span className="mt-1 block font-mono text-[0.6875rem] uppercase tracking-[0.1em] text-white/70">
                    {demo.duration} · shared on request
                  </span>
                </span>
                <a
                  href={`mailto:${PERSON.email}?subject=${encodeURIComponent(`Demo request: ${demo.project}`)}`}
                  onClick={() => trackEvent('demo_request', { demo: demo.id, location })}
                  className="btn btn-primary"
                >
                  <Mail size={16} aria-hidden />
                  Request the demo
                </a>
              </div>
            ) : (
              <button type="button" onClick={play} className="absolute inset-0 flex items-end justify-between gap-4 p-5 text-left text-white md:p-7" aria-label={`Play video: ${demo.title} (${demo.duration})`}>
                <span>
                  <span className="block text-[1.0625rem] font-semibold">{demo.title}</span>
                  <span className="mt-1 inline-flex items-center gap-1.5 font-mono text-[0.6875rem] uppercase tracking-[0.1em] text-white/70">
                    <Clock size={12} aria-hidden /> {demo.duration}
                  </span>
                </span>
                <span className="play-orb h-16 w-16 shrink-0">
                  <Play size={22} aria-hidden className="translate-x-[2px]" fill="currentColor" />
                </span>
              </button>
            )}
          </>
        )}
      </div>
      {note && <p className="mt-3 text-[0.875rem] leading-relaxed text-ink-3">{note}</p>}
    </div>
  );
}
