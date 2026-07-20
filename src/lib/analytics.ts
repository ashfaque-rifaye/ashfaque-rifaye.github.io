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

/** Every event the site can emit, with its exact parameter shape.
    Names follow GA4 conventions (snake_case, <=40 chars); params are
    snake_case with scalar values so they surface cleanly in GA4. */
export type AnalyticsEvent =
  | { name: 'section_view'; params: { section_name: string } }
  | { name: 'scroll_depth'; params: { percent: 25 | 50 | 75 | 90 } }
  | { name: 'resume_download'; params: { file_name: string; file_extension: string; referrer_section: string } }
  | { name: 'file_download'; params: { file_name: string; file_extension: string } }
  | { name: 'social_link_click'; params: { platform: string; location: string } }
  | { name: 'contact_form_submit'; params: { method: 'email_client' } }
  | { name: 'toggle_theme'; params: { mode: 'light' | 'dark' } }
  | { name: 'open_case_study'; params: { project: string } }
  | { name: 'project_click'; params: { project: string } }
  | { name: 'project_video_click'; params: { project: string } }
  | { name: 'command_palette_opened'; params: Record<string, never> }
  | { name: 'command_palette_action'; params: { action: string } }
  | { name: 'chat_opened'; params: { referrer_section: string } }
  | { name: 'chat_closed'; params: { turns_in_session: number } }
  | { name: 'chat_message_sent'; params: { query_length: number; topic: string; turn_number: number } }
  | { name: 'chat_response_received'; params: { model_used: string; response_length: number; turn_number: number } }
  | { name: 'chat_error'; params: { error_message: string; turn_number: number } }
  | { name: 'chat_fallback_used'; params: { topic: string; turn_number: number } }
  | { name: 'chat_suggested_question_clicked'; params: { question: string; question_index: number } }
  | { name: 'chat_response_copied'; params: { message_index: number } };

export function trackEvent<E extends AnalyticsEvent>(name: E['name'], params: E['params']): void {
  if (typeof window !== 'undefined' && window.gtag && GA_ENABLED) {
    window.gtag('event', name, params);
  }
}

/** Inject gtag.js once. GA's config call sends the initial page_view
    itself — no manual page_view (the old site double-fired it). */
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
