/* GA4 wiring. The measurement ID is injected at build time via
   VITE_GA_MEASUREMENT_ID; with no ID configured every call is a no-op,
   so local/dev traffic never pollutes analytics. */

const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID || '';
const GA_ENABLED = /^G-[A-Z0-9]+$/.test(GA_MEASUREMENT_ID) && GA_MEASUREMENT_ID !== 'G-XXXXXXXXXX';

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

/** Every event the site can emit, with its exact parameter shape
    (GA4 conventions: snake_case names ≤ 40 chars, scalar params). */
export type AnalyticsEvent =
  | { name: 'page_view'; params: { page_path: string; page_title: string } }
  | { name: 'scroll_depth'; params: { percent: 25 | 50 | 75 | 90; page_path: string } }
  | { name: 'resume_download'; params: { file_extension: 'pdf' | 'docx'; location: string } }
  | { name: 'social_link_click'; params: { platform: string; location: string } }
  | { name: 'email_copied'; params: { location: string } }
  | { name: 'case_study_open'; params: { slug: string; location: string } }
  | { name: 'project_link_click'; params: { project: string; link_type: 'github' | 'demo' | 'video' } }
  | { name: 'project_video_play'; params: { project: string } }
  | { name: 'command_palette_opened'; params: Record<string, never> }
  | { name: 'command_palette_action'; params: { action: string } }
  | { name: 'chat_opened'; params: { location: string } }
  | { name: 'chat_closed'; params: { turns_in_session: number } }
  | { name: 'chat_message_sent'; params: { query_length: number; topic: string; turn_number: number } }
  | { name: 'chat_response_received'; params: { model_used: string; response_length: number; turn_number: number } }
  | { name: 'chat_fallback_used'; params: { topic: string; turn_number: number } }
  | { name: 'chat_error'; params: { error_message: string; turn_number: number } }
  | { name: 'chat_suggested_question_clicked'; params: { question: string; question_index: number } };

export function trackEvent<E extends AnalyticsEvent>(name: E['name'], params: E['params']): void {
  if (typeof window !== 'undefined' && window.gtag && GA_ENABLED) {
    window.gtag('event', name, params);
  }
}

/** Inject gtag.js once. The config call sends the first page_view;
    later client-side navigations report their own via trackPageView. */
export function initAnalytics(): void {
  if (!GA_ENABLED || typeof window === 'undefined' || window.gtag) return;
  const s = document.createElement('script');
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(s);
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag(...args: unknown[]) {
    window.dataLayer!.push(args);
  };
  window.gtag('js', new Date());
  window.gtag('config', GA_MEASUREMENT_ID);
}

export function trackPageView(path: string, title: string): void {
  trackEvent('page_view', { page_path: path, page_title: title });
}
