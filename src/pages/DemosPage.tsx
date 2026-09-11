import { Github } from 'lucide-react';
import { orderedDemos, LiveApps } from '../components/home/DemoReel';
import { PageHeader } from '../components/layout/PageHeader';
import { HireCta } from '../components/sections/HireCta';
import { ArrowLink } from '../components/ui/Links';
import { Reveal } from '../components/ui/Reveal';
import { SectionHead } from '../components/ui/SectionHead';
import { DemoCard } from '../components/video/DemoCard';
import { SOCIALS } from '../content/profile';
import { trackEvent } from '../lib/analytics';

export function DemosPage() {
  const demos = orderedDemos();
  return (
    <>
      <PageHeader
        title={
          <>
            See the work <span className="text-grad">running</span>
          </>
        }
        lede="Video walkthroughs of things I have built, plus live apps you can open right now, including an agent on this site that can match me to your role."
      />

      <section aria-label="Video walkthroughs" className="wrap">
        <div className="grid gap-6 md:grid-cols-2">
          {demos.map((d, i) => (
            <Reveal key={d.id} delay={(i % 2) * 90} className={i === 0 ? 'md:col-span-2' : undefined}>
              <DemoCard demo={d} size="lg" location="demos_page" headingLevel="h3" />
            </Reveal>
          ))}
        </div>
      </section>

      <section aria-labelledby="live-title" className="section pb-0">
        <div className="wrap">
          <SectionHead
            id="live-title"
            title="Open them yourself"
            intro="Deployed builds, not mock-ups. The Hiring Agent runs here; the others open in a new tab."
          />
          <LiveApps className="mt-10" />
          <p className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 text-[0.9375rem] text-ink-3">
            <a
              href={SOCIALS.github}
              target="_blank"
              rel="noreferrer"
              onClick={() => trackEvent('social_link_click', { platform: 'github', location: 'demos_page' })}
              className="link-arrow"
            >
              <Github size={16} aria-hidden />
              <span className="u">All source on GitHub</span>
            </a>
            <ArrowLink to="/lab/">What each experiment taught me</ArrowLink>
          </p>
        </div>
      </section>

      <HireCta location="demos" />
    </>
  );
}
