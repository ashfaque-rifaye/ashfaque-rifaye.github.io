import { useState } from 'react';
import { ArrowRight, ArrowUpRight, Code2, Github, Play } from 'lucide-react';
import { FEATURED_WORK, PERSONAL_PROJECTS } from '../data/projects';
import { SOCIALS } from '../data/profile';
import type { PersonalProject, WorkItem } from '../data/types';
import { trackEvent } from '../lib/analytics';
import { cx } from '../lib/utils';
import { CARD, CARD_HOVER, Reveal, Section, Tag } from './ui';
import { CaseStudyModal } from './CaseStudyModal';
import { VideoModal } from './VideoModal';

function WorkCard({ item, onOpen }: { item: WorkItem; onOpen: (item: WorkItem) => void }) {
  const open = () => {
    onOpen(item);
    trackEvent('open_case_study', { project: item.title });
  };
  return (
    <button
      onClick={open}
      className={cx(CARD, CARD_HOVER, 'group relative h-full w-full overflow-hidden p-6 text-left md:p-7')}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute -inset-px bg-[radial-gradient(45%_50%_at_50%_0%,rgb(var(--accent-500)/0.10),transparent_70%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      />
      <div className="relative flex items-start justify-between gap-3">
        <span className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-chip text-accent-text">
          <item.icon size={22} aria-hidden />
        </span>
        {item.badge && (
          <span className="rounded-full border border-accent-500/25 bg-accent-500/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-accent-text">
            {item.badge}
          </span>
        )}
      </div>
      <h3 className="relative mt-4 text-lg font-semibold tracking-tight">{item.title}</h3>
      <p className="relative mt-2 text-sm leading-relaxed text-mute">{item.desc}</p>
      <div className="relative mt-4 flex flex-wrap gap-2">
        {item.tags.map((t) => (
          <Tag key={t}>{t}</Tag>
        ))}
      </div>
      <span className="relative mt-4 inline-flex items-center gap-1 text-xs font-semibold text-accent-text opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        Read case study <ArrowRight size={13} aria-hidden />
      </span>
    </button>
  );
}

function FeaturedPersonal({ proj, onVideo }: { proj: PersonalProject; onVideo: (id: string) => void }) {
  return (
    <div className={cx(CARD, 'group overflow-hidden')}>
      <div className="flex flex-col gap-6 p-6 md:flex-row md:items-start md:p-7">
        {proj.youtube && (
          <button
            onClick={() => { onVideo(proj.youtube!); trackEvent('project_video_click', { project: proj.name }); }}
            aria-label={`Watch ${proj.name} demo video`}
            className="relative w-full shrink-0 overflow-hidden rounded-xl md:w-72 lg:w-80"
          >
            <img
              src={`https://img.youtube.com/vi/${proj.youtube}/hqdefault.jpg`}
              alt=""
              width={480}
              height={360}
              loading="lazy"
              className="h-44 w-full object-cover transition-transform duration-500 group-hover:scale-105 md:h-48"
            />
            <span className="absolute inset-0 flex items-center justify-center bg-black/35 transition-colors hover:bg-black/50">
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/90 shadow-xl transition-transform hover:scale-110">
                <Play size={22} aria-hidden className="ml-1 text-black" />
              </span>
            </span>
            <span className="absolute bottom-2.5 left-2.5 rounded-md bg-black/60 px-2 py-0.5 text-[10px] font-semibold text-white">
              Watch demo
            </span>
          </button>
        )}
        <div className="flex flex-1 flex-col">
          <div className="mb-3 flex items-center justify-between gap-3">
            <span className="rounded-md bg-raised px-2 py-0.5 font-mono text-[10px] text-faint">{proj.lang}</span>
            <span className="rounded-full bg-accent-500/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-accent-text">
              Featured build
            </span>
          </div>
          <h4 className="text-lg font-semibold tracking-tight">{proj.name}</h4>
          <p className="mt-2 flex-1 text-sm leading-relaxed text-mute">{proj.desc}</p>
          <div className="mt-4 flex flex-wrap gap-1.5">
            {proj.tags.map((t) => (
              <Tag key={t} accent>{t}</Tag>
            ))}
          </div>
          {proj.github && (
            <div className="mt-5">
              <a
                href={proj.github}
                target="_blank"
                rel="noreferrer"
                onClick={() => trackEvent('project_click', { project: proj.name })}
                className="inline-flex items-center gap-1.5 rounded-lg border border-line bg-surface px-3.5 py-2 text-xs font-semibold transition-colors hover:border-accent-500/40"
              >
                <Github size={13} aria-hidden /> View source <ArrowUpRight size={11} aria-hidden />
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export function Work() {
  const [activeCase, setActiveCase] = useState<WorkItem | null>(null);
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const featured = PERSONAL_PROJECTS.find((p) => p.featured);
  const rest = PERSONAL_PROJECTS.filter((p) => !p.featured);

  return (
    <Section
      id="work"
      eyebrow="Selected work"
      title="Shipped products, measured outcomes."
      intro="Production AI systems, award-winning hackathon builds, and independent experiments. Every card opens into the problem, the approach, and the numbers."
    >
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {FEATURED_WORK.map((item, i) => (
          <Reveal key={item.title} delay={(i % 3) * 70} className={i === 0 ? 'md:col-span-2 lg:col-span-1' : ''}>
            <WorkCard item={item} onOpen={setActiveCase} />
          </Reveal>
        ))}
      </div>

      <h3 className="mb-2 mt-16 flex items-center gap-2 text-lg font-semibold tracking-tight">
        <Code2 size={19} aria-hidden className="text-accent-text" /> Personal builds &amp; experiments
      </h3>
      <p className="mb-6 text-sm text-mute">
        Independent AI projects from{' '}
        <a
          href={SOCIALS.github}
          target="_blank"
          rel="noreferrer"
          onClick={() => trackEvent('social_link_click', { platform: 'GitHub', location: 'work_section' })}
          className="font-medium text-accent-text underline underline-offset-2 hover:opacity-80"
        >
          github.com/ashfaque-rifaye
        </a>
      </p>

      {featured && (
        <Reveal className="mb-5">
          <FeaturedPersonal proj={featured} onVideo={setActiveVideo} />
        </Reveal>
      )}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {rest.map((proj, i) => (
          <Reveal key={proj.name} delay={(i % 3) * 60}>
            <a
              href={proj.github || SOCIALS.github}
              target="_blank"
              rel="noreferrer"
              onClick={() => trackEvent('project_click', { project: proj.name })}
              className={cx(CARD, CARD_HOVER, 'group flex h-full flex-col p-5')}
            >
              <div className="mb-3 flex items-start justify-between">
                <span className="grid h-9 w-9 place-items-center rounded-lg bg-gradient-chip text-accent-text">
                  <Code2 size={17} aria-hidden />
                </span>
                <span className="rounded-md bg-raised px-2 py-0.5 font-mono text-[10px] text-faint">{proj.lang}</span>
              </div>
              <h4 className="flex items-center gap-1 text-sm font-semibold">
                {proj.name}
                <ArrowUpRight size={13} aria-hidden className="text-accent-text opacity-0 transition-opacity group-hover:opacity-100" />
              </h4>
              <p className="mt-2 flex-grow text-xs leading-relaxed text-mute">{proj.desc}</p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {proj.tags.map((t) => (
                  <Tag key={t}>{t}</Tag>
                ))}
              </div>
            </a>
          </Reveal>
        ))}
      </div>

      <CaseStudyModal item={activeCase} onClose={() => setActiveCase(null)} />
      {activeVideo && <VideoModal videoId={activeVideo} onClose={() => setActiveVideo(null)} />}
    </Section>
  );
}
