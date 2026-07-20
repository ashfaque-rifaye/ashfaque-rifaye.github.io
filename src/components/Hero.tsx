import { ArrowRight, Download, MapPin } from 'lucide-react';
import { HERO, HERO_METRICS, SOCIALS } from '../data/profile';
import { trackEvent } from '../lib/analytics';
import { useCountUp } from '../lib/hooks';

function HeroMetric({ value, label }: { value: string; label: string }) {
  const [ref, display] = useCountUp(value);
  return (
    <div className="border-l border-line pl-4">
      <p ref={(el) => { ref.current = el; }} className="text-2xl font-semibold tabular-nums tracking-tight md:text-3xl">
        {display}
      </p>
      <p className="mt-1 text-xs leading-snug text-mute md:text-[13px]">{label}</p>
    </div>
  );
}

export function Hero({ onResume }: { onResume: () => void }) {
  return (
    <section id="hero" className="relative overflow-hidden pb-16 pt-32 md:pb-24 md:pt-44">
      {/* quiet ambient washes */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -top-[30%] left-1/2 h-[60%] w-[80%] -translate-x-1/2 rounded-full bg-accent-500/[0.06] blur-[120px]" />
        <div className="absolute inset-0 bg-dot-grid text-ink/[0.04]" />
      </div>

      <div className="relative mx-auto max-w-6xl px-5 md:px-8">
        <div className="mb-6 flex flex-wrap items-center gap-3 animate-fade-in-up">
          {HERO.available && (
            <span className="inline-flex items-center gap-2 rounded-full border border-alt/30 bg-alt/10 px-3 py-1.5 text-xs font-medium text-ink">
              <span aria-hidden className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-alt opacity-70" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-alt" />
              </span>
              Open to new roles
            </span>
          )}
          <span className="inline-flex items-center gap-1.5 text-sm font-medium text-mute">
            <MapPin size={14} aria-hidden className="text-accent-text" /> {HERO.location}
            <span className="text-faint">· {HERO.locationNote}</span>
          </span>
        </div>

        <h1
          className="max-w-4xl text-[2.6rem] font-semibold leading-[1.04] tracking-[-0.03em] animate-fade-in-up md:text-7xl"
          style={{ animationDelay: '60ms' }}
        >
          {HERO.headline[0]}
          <br className="hidden sm:block" />{' '}
          <span className="display-accent font-normal">{HERO.headline[1]}</span>
        </h1>

        <p
          className="mt-6 max-w-2xl text-base leading-relaxed text-mute animate-fade-in-up md:text-lg"
          style={{ animationDelay: '120ms' }}
        >
          {HERO.sub}
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-3 animate-fade-in-up" style={{ animationDelay: '180ms' }}>
          <button
            onClick={onResume}
            className="group inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-accent-ink shadow-glow transition-all hover:brightness-105 active:scale-95"
          >
            <Download size={16} aria-hidden className="transition-transform group-hover:-translate-y-0.5" />
            Download Resume
          </button>
          <a
            href="#work"
            className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-6 py-3 text-sm font-semibold text-ink transition-colors hover:border-accent-500/40"
          >
            View selected work <ArrowRight size={15} aria-hidden />
          </a>
          <a
            href={SOCIALS.linkedin}
            target="_blank"
            rel="noreferrer"
            onClick={() => trackEvent('social_link_click', { platform: 'LinkedIn', location: 'hero' })}
            className="inline-flex items-center gap-1.5 px-2 py-3 text-sm font-semibold text-accent-text transition-opacity hover:opacity-80"
          >
            LinkedIn <ArrowRight size={14} aria-hidden className="-rotate-45" />
          </a>
        </div>

        {/* proof, immediately */}
        <div className="mt-14 grid max-w-3xl grid-cols-2 gap-x-6 gap-y-8 animate-fade-in-up sm:grid-cols-4" style={{ animationDelay: '240ms' }}>
          {HERO_METRICS.map((m) => (
            <HeroMetric key={m.label} value={m.value} label={m.label} />
          ))}
        </div>
      </div>
    </section>
  );
}
