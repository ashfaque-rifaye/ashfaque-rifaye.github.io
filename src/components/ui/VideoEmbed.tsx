import { useState, type ReactNode } from 'react';
import { Mail, Play } from 'lucide-react';
import { PERSON } from '../../content/profile';
import { trackEvent } from '../../lib/analytics';

/** Click-to-play video: nothing loads from YouTube until the visitor asks.
    Without a video id it stays honest: poster plus "available on request". */
export function VideoEmbed({
  youtubeId,
  title,
  poster,
  project,
  duration,
  note,
}: {
  youtubeId?: string;
  title: string;
  poster?: string;
  project: string;
  duration?: string;
  note?: ReactNode;
}) {
  const [playing, setPlaying] = useState(false);
  const thumb = poster ?? (youtubeId ? `https://i.ytimg.com/vi/${youtubeId}/hqdefault.jpg` : undefined);

  return (
    <div className="my-8">
      <div className="relative aspect-video overflow-hidden rounded border border-line bg-bg-2">
        {playing && youtubeId ? (
          <iframe
            className="absolute inset-0 h-full w-full"
            src={`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&rel=0&modestbranding=1`}
            title={title}
            allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
            allowFullScreen
          />
        ) : (
          <>
            {thumb && (
              <img
                src={thumb}
                alt=""
                loading="lazy"
                decoding="async"
                width={1600}
                height={900}
                className="absolute inset-0 h-full w-full object-cover"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-bg/85 via-bg/10 to-transparent" />
            {youtubeId ? (
              <button
                type="button"
                onClick={() => {
                  setPlaying(true);
                  trackEvent('project_video_play', { project });
                }}
                className="group absolute inset-0 flex items-end justify-between gap-4 p-5 text-left md:p-7"
                aria-label={`Play video: ${title}`}
              >
                <span>
                  <span className="block text-[1.0625rem] font-semibold text-ink">{title}</span>
                  {duration && <span className="t-label mt-1 block">{duration}</span>}
                </span>
                <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-accent text-accent-ink transition-transform duration-200 group-hover:scale-105">
                  <Play size={20} aria-hidden className="translate-x-[1px]" fill="currentColor" />
                </span>
              </button>
            ) : (
              <div className="absolute inset-x-0 bottom-0 flex flex-wrap items-end justify-between gap-4 p-5 md:p-7">
                <span>
                  <span className="block text-[1.0625rem] font-semibold text-ink">{title}</span>
                  <span className="t-label mt-1 block">{duration ? `${duration} · ` : ''}available on request</span>
                </span>
                <a
                  href={`mailto:${PERSON.email}?subject=${encodeURIComponent(`Demo request: ${project}`)}`}
                  className="btn btn-secondary bg-bg/80 backdrop-blur"
                >
                  <Mail size={16} aria-hidden />
                  Request the demo
                </a>
              </div>
            )}
          </>
        )}
      </div>
      {note && <p className="mt-3 text-[0.875rem] leading-relaxed text-ink-3">{note}</p>}
    </div>
  );
}
