import { useEffect, useMemo, useState } from 'react';
import { ArrowUp } from 'lucide-react';
import { NAV, RESUME_PATH } from './data/profile';
import { initAnalytics, trackEvent } from './lib/analytics';
import {
  useScrollDepthTracking, useScrollProgress, useScrollSpy, useTheme,
} from './lib/hooks';
import { About } from './components/About';
import { ChatWidget } from './components/ChatWidget';
import { CommandPalette } from './components/CommandPalette';
import { Contact } from './components/Contact';
import { Experience } from './components/Experience';
import { Expertise } from './components/Expertise';
import { Footer } from './components/Footer';
import { Hero } from './components/Hero';
import { Nav } from './components/Nav';
import { Recognition } from './components/Recognition';
import { Work } from './components/Work';
import { cx } from './lib/utils';

const SECTION_IDS = ['hero', ...NAV.map((n) => n.id)];

export default function App() {
  const { theme, toggle } = useTheme();
  const progress = useScrollProgress();
  const active = useScrollSpy(SECTION_IDS);
  const [cmdOpen, setCmdOpen] = useState(false);
  const [chatSignal, setChatSignal] = useState(0);
  const [showTop, setShowTop] = useState(false);

  useScrollDepthTracking();
  useEffect(() => { initAnalytics(); }, []);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 700);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* ⌘K / Ctrl+K */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setCmdOpen((o) => !o);
      } else if (e.key === 'Escape') {
        setCmdOpen(false);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const handleResume = useMemo(
    () => () => {
      trackEvent('resume_download', { file_name: 'Ashfaque_Rifaye_Resume', file_extension: 'pdf', referrer_section: active });
      trackEvent('file_download', { file_name: 'Ashfaque_Rifaye_Resume', file_extension: 'pdf' });
      const link = document.createElement('a');
      link.href = RESUME_PATH;
      link.download = 'Ashfaque_Rifaye_Resume.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    },
    [active]
  );

  return (
    <div className="min-h-screen bg-base font-sans text-ink antialiased">
      <a href="#work" className="skip-link">Skip to content</a>

      <Nav
        active={active}
        theme={theme}
        onToggleTheme={toggle}
        onOpenPalette={() => setCmdOpen(true)}
        onResume={handleResume}
        progress={progress}
      />

      <main>
        <Hero onResume={handleResume} />
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <Work />
          <div className="rule-gradient" aria-hidden />
          <Experience />
          <div className="rule-gradient" aria-hidden />
          <Expertise />
          <div className="rule-gradient" aria-hidden />
          <Recognition />
          <div className="rule-gradient" aria-hidden />
          <About />
          <div className="rule-gradient" aria-hidden />
          <Contact onResume={handleResume} />
        </div>
      </main>

      <Footer />

      {/* scroll to top */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Scroll to top"
        className={cx(
          'fixed bottom-24 right-6 z-40 grid h-11 w-11 place-items-center rounded-full border border-line bg-surface/90 text-ink shadow-lift backdrop-blur transition-all duration-300',
          showTop ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0'
        )}
      >
        <ArrowUp size={18} aria-hidden />
      </button>

      <ChatWidget activeSection={active} openSignal={chatSignal} />

      <CommandPalette
        isOpen={cmdOpen}
        onClose={() => setCmdOpen(false)}
        onResume={handleResume}
        onChat={() => setChatSignal((n) => n + 1)}
        onTheme={toggle}
      />
    </div>
  );
}
