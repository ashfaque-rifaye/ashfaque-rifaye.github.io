import { Bot, Wand2 } from 'lucide-react';
import { PageHeader } from '../components/layout/PageHeader';
import { HireCta } from '../components/sections/HireCta';
import { ArrowAnchor, ArrowLink, ButtonLink } from '../components/ui/Links';
import { SectionHead } from '../components/ui/SectionHead';
import { VideoEmbed } from '../components/ui/VideoEmbed';
import { DemoCard } from '../components/video/DemoCard';
import { demoById, orderedDemos } from '../content/demos';
import { LAB_PROJECTS, MORE_BUILDS } from '../content/lab';
import type { LabProject } from '../content/types';
import { trackEvent } from '../lib/analytics';
import { SAMPLE_ROLES } from '../lib/hiring/samples';
import { useUi } from '../site/ui-state';

export function LabPage() {
  const playable = orderedDemos().filter((d) => d.kind !== 'request');
  return (
    <>
      <PageHeader
        title={
          <>
            AI <span className="text-grad">Lab</span>
          </>
        }
        lede="What I build outside the day job. Each experiment starts from a product question: where retrieval fails, when agents should defer to people, how much of an AI system should be deterministic, and what it costs to run."
      >
        <p className="text-[1rem] text-ink-2">
          My most complete prototype, DeviceFlex, is written up in full.{' '}
          <ArrowLink to="/work/ai-product-innovation/" className="ml-1">
            Read the case study
          </ArrowLink>
        </p>
      </PageHeader>

      <section aria-labelledby="lab-demos" className="wrap pb-6">
        <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
          <h2 id="lab-demos" className="font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-ink-3">
            Watch first
          </h2>
          <ArrowLink to="/demos/">All demos and live apps</ArrowLink>
        </div>
        <div className="mt-4 grid gap-5 md:grid-cols-2">
          {playable.map((d) => (
            <DemoCard key={d.id} demo={d} location="lab_top" />
          ))}
        </div>
      </section>

      <div className="wrap">
        {LAB_PROJECTS.map((p) => (
          <LabEntry key={p.slug} project={p} />
        ))}
      </div>

      <section aria-labelledby="more-builds" className="section pb-0">
        <div className="wrap">
          <SectionHead id="more-builds" title="More builds" intro="Smaller experiments and hackathon entries, all public on GitHub." />
          <ul className="mt-12 grid border-t border-line md:grid-cols-2 md:gap-x-12">
            {MORE_BUILDS.map((b) => (
              <li key={b.name} className="border-b border-line py-5">
                <a
                  href={b.github}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => trackEvent('project_link_click', { project: b.name, link_type: 'github' })}
                  className="group block no-underline"
                >
                  <span className="font-semibold text-ink transition-colors group-hover:text-accent">{b.name}</span>
                  <span className="sr-only"> on GitHub (opens in a new tab)</span>
                  <span className="mt-1 block text-[0.9375rem] leading-relaxed text-ink-3">{b.line}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <HireCta location="lab" />
    </>
  );
}

function LabEntry({ project: p }: { project: LabProject }) {
  const { openChat, runHiringAgent } = useUi();
  const demo = demoById(p.slug);
  return (
    <article id={p.slug} aria-labelledby={`${p.slug}-name`} className="grid gap-8 border-t border-line py-12 md:py-16 lg:grid-cols-12 lg:gap-12">
      <div className="lg:col-span-4">
        <p className="t-label">{p.context}</p>
        <h2 id={`${p.slug}-name`} className="t-h2 mt-4 !text-[clamp(1.75rem,1.4rem+1.2vw,2.5rem)]">
          {p.name}
        </h2>
        <p className="mt-3 flex items-center gap-2 text-[0.875rem] text-ink-2">
          <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-accent" />
          {p.status}
          {p.team && <span className="text-ink-3">· Team project</span>}
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
          {p.links.demo && (
            <ArrowAnchor href={p.links.demo} onClick={() => trackEvent('project_link_click', { project: p.name, link_type: 'demo' })}>
              Live demo
            </ArrowAnchor>
          )}
          {p.links.github && (
            <ArrowAnchor href={p.links.github} onClick={() => trackEvent('project_link_click', { project: p.name, link_type: 'github' })}>
              Source on GitHub
            </ArrowAnchor>
          )}
          {p.slug === 'hiring-agent' && (
            <>
              <ButtonLink to="/agent/">Open the Hiring Agent</ButtonLink>
              <button type="button" onClick={() => runHiringAgent(SAMPLE_ROLES[0].jd)} className="btn btn-ai ring-grad">
                <Wand2 size={17} aria-hidden className="text-tone-violet" />
                Run a sample role
              </button>
            </>
          )}
          {p.slug === 'ai-twin' && (
            <button type="button" onClick={() => openChat('lab')} className="btn btn-primary">
              <Bot size={17} aria-hidden />
              Ask the AI Twin
            </button>
          )}
        </div>
      </div>

      <div className="min-w-0 lg:col-span-8">
        <p className="text-[clamp(1.125rem,1rem+0.4vw,1.3125rem)] leading-relaxed text-ink">{p.oneLiner}</p>
        {demo && demo.kind !== 'request' && <VideoEmbed demoId={demo.id} location="lab_entry" />}
        <div className="mt-8 grid gap-8 md:grid-cols-2 md:gap-10">
          <div>
            <h3 className="t-label">Why I built it</h3>
            <p className="t-body mt-3">{p.question}</p>
          </div>
          <div>
            <h3 className="t-label">What I learned</h3>
            <ul className="prose-case mt-3 text-[1rem]">
              {p.learned.map((l) => (
                <li key={l}>{l}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-line pt-6">
          <h3 className="t-label">Built with</h3>
          <ul className="mt-3 flex flex-wrap gap-2">
            {p.stack.map((s) => (
              <li key={s} className="rounded-sm border border-line px-2.5 py-1 text-[0.8125rem] text-ink-2">
                {s}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  );
}
