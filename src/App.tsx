import { useEffect, useRef } from 'react';
import { Route, Routes, useLocation } from 'react-router';
import { SiteFooter } from './components/layout/SiteFooter';
import { SiteHeader } from './components/layout/SiteHeader';
import { initAnalytics } from './lib/analytics';
import { useScrollDepthTracking } from './lib/hooks';
import { AboutPage } from './pages/AboutPage';
import { AgentPage } from './pages/AgentPage';
import { CaseStudyPage } from './pages/CaseStudyPage';
import { ContactPage } from './pages/ContactPage';
import { DemosPage } from './pages/DemosPage';
import { HomePage } from './pages/HomePage';
import { LabPage } from './pages/LabPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { ResumePage } from './pages/ResumePage';
import { WorkPage } from './pages/WorkPage';
import { applyMeta, metaFor } from './site/routes';
import { UiProvider } from './site/ui-state';

export default function App() {
  const { pathname, hash } = useLocation();
  const firstRender = useRef(true);

  useEffect(() => {
    initAnalytics();
  }, []);

  /* Client-side navigation: update <head>, reset scroll, move focus to the
     new content, and enable route transitions. The first render keeps the
     prerendered <head> untouched. GA4 reports the page view itself (see
     initAnalytics). */
  useEffect(() => {
    const meta = metaFor(pathname);
    if (firstRender.current) {
      firstRender.current = false;
      if (import.meta.env.DEV) applyMeta(meta);
      return;
    }
    applyMeta(meta);
    document.documentElement.classList.add('nav-client');
    if (!window.location.hash) {
      window.scrollTo({ top: 0, left: 0 });
      document.getElementById('main')?.focus({ preventScroll: true });
    }
  }, [pathname]);

  /* In-page anchors such as /lab/#crosscheck. */
  useEffect(() => {
    if (!hash) return;
    const el = document.getElementById(decodeURIComponent(hash.slice(1)));
    if (el) el.scrollIntoView({ block: 'start' });
  }, [pathname, hash]);

  useScrollDepthTracking(pathname);

  return (
    <UiProvider>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <SiteHeader />
      <main id="main" tabIndex={-1} key={pathname} className="route-enter outline-none">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/work" element={<WorkPage />} />
          <Route path="/work/:slug" element={<CaseStudyPage />} />
          <Route path="/demos" element={<DemosPage />} />
          <Route path="/agent" element={<AgentPage />} />
          <Route path="/lab" element={<LabPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/resume" element={<ResumePage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <SiteFooter />
    </UiProvider>
  );
}
