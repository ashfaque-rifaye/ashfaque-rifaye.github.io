import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router';
import { ArrowUpRight, Github, Mail, X } from 'lucide-react';
import { demoById, demoPoster } from '../../content/demos';
import { PERSON } from '../../content/profile';
import { trackEvent } from '../../lib/analytics';
import { useBodyScrollLock, useFocusTrap } from '../../lib/hooks';

/** Full-screen player for a demo. YouTube loads only here, on request. */
export function VideoModal({ demoId, location, onClose }: { demoId: string; location: string; onClose: () => void }) {
  const demo = demoById(demoId);
  const ref = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  useBodyScrollLock(true);
  useFocusTrap(ref, true, onClose);

  useEffect(() => {
    if (!demo) return;
    trackEvent(demo.kind === 'request' ? 'demo_request' : 'demo_play', { demo: demo.id, location });
    closeRef.current?.focus();
  }, [demo, location]);

  if (!demo) return null;
  const poster = demoPoster(demo);

  return createPortal(
    <div className="fixed inset-0 z-dialog flex items-center justify-center p-3 sm:p-6">
      <div aria-hidden className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={onClose} />
      <div ref={ref} role="dialog" aria-modal="true" aria-labelledby="video-title" className="animate-dialog relative w-full max-w-5xl">
        <div className="mb-3 flex items-end justify-between gap-4 text-white">
          <div className="min-w-0">
            <p className="font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-white/60">
              {demo.context} · {demo.duration}
            </p>
            <h2 id="video-title" className="mt-1 truncate text-[1.125rem] font-semibold text-white sm:text-[1.25rem]" style={{ fontStretch: '108%' }}>
              {demo.title}
            </h2>
          </div>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Close video"
            className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-white/25 bg-white/10 text-white transition-colors hover:bg-white/20"
          >
            <X size={18} aria-hidden />
          </button>
        </div>

        <div className="ring-grad relative aspect-video overflow-hidden rounded-2xl bg-black shadow-lift" style={{ ['--ring-w' as string]: '1.5px' }}>
          {demo.kind === 'youtube' && demo.youtubeId && (
            <iframe
              className="absolute inset-0 h-full w-full"
              src={`https://www.youtube-nocookie.com/embed/${demo.youtubeId}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
              title={demo.title}
              allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
              allowFullScreen
            />
          )}
          {demo.kind === 'file' && demo.src && (
            <video className="absolute inset-0 h-full w-full bg-black" src={demo.src} poster={poster} controls autoPlay playsInline preload="auto">
              Your browser cannot play this video. <a href={demo.src}>Download it instead.</a>
            </video>
          )}
          {demo.kind === 'request' && (
            <>
              {poster && <img src={poster} alt="" className="absolute inset-0 h-full w-full object-cover opacity-60" />}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/10" />
              <div className="absolute inset-x-0 bottom-0 flex flex-wrap items-end justify-between gap-4 p-5 text-white sm:p-8">
                <p className="max-w-md text-[0.9375rem] leading-relaxed text-white/85">
                  This walkthrough is shared on request. The case study covers the product, the architecture and the decisions in
                  full.
                </p>
                <div className="flex flex-wrap gap-3">
                  <a
                    href={`mailto:${PERSON.email}?subject=${encodeURIComponent(`Demo request: ${demo.project}`)}`}
                    className="btn btn-primary"
                  >
                    <Mail size={16} aria-hidden />
                    Request the demo
                  </a>
                </div>
              </div>
            </>
          )}
        </div>

        <div className="mt-4 flex flex-col gap-4 text-white sm:flex-row sm:items-start sm:justify-between">
          <p className="max-w-2xl text-[0.9375rem] leading-relaxed text-white/80">{demo.summary}</p>
          <div className="flex shrink-0 flex-wrap gap-2">
            {demo.links.live && (
              <a
                href={demo.links.live}
                target="_blank"
                rel="noreferrer"
                onClick={() => trackEvent('project_link_click', { project: demo.project, link_type: 'live' })}
                className="inline-flex min-h-10 items-center gap-1.5 rounded-full bg-white px-4 text-[0.875rem] font-semibold text-black transition-transform hover:-translate-y-px"
              >
                Try it live <ArrowUpRight size={15} aria-hidden />
              </a>
            )}
            {demo.links.github && (
              <a
                href={demo.links.github}
                target="_blank"
                rel="noreferrer"
                onClick={() => trackEvent('project_link_click', { project: demo.project, link_type: 'github' })}
                className="inline-flex min-h-10 items-center gap-1.5 rounded-full border border-white/25 px-4 text-[0.875rem] font-medium text-white transition-colors hover:bg-white/10"
              >
                <Github size={15} aria-hidden /> Source
              </a>
            )}
            {(demo.links.caseStudy || demo.links.lab) && (
              <Link
                to={demo.links.caseStudy ?? demo.links.lab!}
                onClick={onClose}
                className="inline-flex min-h-10 items-center gap-1.5 rounded-full border border-white/25 px-4 text-[0.875rem] font-medium text-white transition-colors hover:bg-white/10"
              >
                {demo.links.caseStudy ? 'Read the case study' : 'Read the write-up'}
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
