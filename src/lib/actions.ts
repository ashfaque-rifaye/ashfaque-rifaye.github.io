import { demoById } from '../content/demos';
import { PERSON, RESUME, SOCIALS } from '../content/profile';
import type { Theme } from '../site/theme';
import { copyText, downloadUrl } from './utils';

/* Everything the AI Twin may do on the visitor's behalf. Model output is
   parsed into these shapes and anything outside the allowlist is dropped,
   so a prompt can never make the site navigate to an arbitrary URL. */

export const ACTION_ROUTES = [
  '/',
  '/work/',
  '/work/att-genai-virtual-assistant/',
  '/work/verizon-digital-commerce/',
  '/work/ai-product-innovation/',
  '/demos/',
  '/agent/',
  '/lab/',
  '/about/',
  '/resume/',
  '/contact/',
] as const;
export type ActionRoute = (typeof ACTION_ROUTES)[number];

const ROUTE_LABEL: Record<ActionRoute, string> = {
  '/': 'Home',
  '/work/': 'Work',
  '/work/att-genai-virtual-assistant/': 'AT&T GenAI case study',
  '/work/verizon-digital-commerce/': 'Verizon case study',
  '/work/ai-product-innovation/': 'DeviceFlex case study',
  '/demos/': 'Demos',
  '/agent/': 'Hiring Agent',
  '/lab/': 'AI Lab',
  '/about/': 'About',
  '/resume/': 'Résumé',
  '/contact/': 'Contact',
};

export type SiteAction =
  | { type: 'navigate'; to: ActionRoute }
  | { type: 'play_demo'; demo: string }
  | { type: 'download_resume'; format: 'pdf' | 'docx' }
  | { type: 'email'; subject: string; body: string }
  | { type: 'hiring_agent'; jd?: string }
  | { type: 'set_theme'; theme: Theme }
  | { type: 'copy_email' }
  | { type: 'open_link'; target: 'linkedin' | 'github' };

export interface ActionContext {
  navigate: (to: string) => void;
  playDemo: (id: string, location: string) => void;
  setTheme: (theme: Theme, location: string) => void;
  runHiringAgent: (jd?: string) => void;
}

/** Low-risk, reversible actions that may run straight from a request. */
const AUTO_SAFE = new Set<SiteAction['type']>(['navigate', 'play_demo', 'set_theme']);

export function actionLabel(a: SiteAction): string {
  switch (a.type) {
    case 'navigate':
      return `Open ${ROUTE_LABEL[a.to]}`;
    case 'play_demo':
      return `Play the ${demoById(a.demo)?.project ?? 'demo'} demo`;
    case 'download_resume':
      return `Download résumé (${a.format.toUpperCase()})`;
    case 'email':
      return 'Open email draft';
    case 'hiring_agent':
      return a.jd ? 'Run the Hiring Agent on this' : 'Open the Hiring Agent';
    case 'set_theme':
      return `Switch to ${a.theme} mode`;
    case 'copy_email':
      return 'Copy email address';
    case 'open_link':
      return a.target === 'linkedin' ? 'Open LinkedIn' : 'Open GitHub';
  }
}

export function actionDoneLabel(a: SiteAction): string {
  switch (a.type) {
    case 'navigate':
      return `Opened ${ROUTE_LABEL[a.to]}`;
    case 'play_demo':
      return `Playing the ${demoById(a.demo)?.project ?? ''} demo`;
    case 'set_theme':
      return `Switched to ${a.theme} mode`;
    case 'download_resume':
      return 'Résumé download started';
    case 'email':
      return 'Email draft opened in your mail app';
    case 'hiring_agent':
      return 'Hiring Agent started';
    case 'copy_email':
      return 'Email address copied';
    case 'open_link':
      return 'Opened in a new tab';
  }
}

const str = (v: unknown, max: number) => (typeof v === 'string' ? v.trim().slice(0, max) : '');

/** Keep only well-formed, allowlisted actions (max 3). */
export function validateActions(raw: unknown): SiteAction[] {
  if (!Array.isArray(raw)) return [];
  const out: SiteAction[] = [];
  for (const item of raw) {
    if (!item || typeof item !== 'object') continue;
    const a = item as Record<string, unknown>;
    switch (a.type) {
      case 'navigate': {
        const to = str(a.to, 80);
        const route = ACTION_ROUTES.find((r) => r === to || r === `${to}/` || r === to.split('#')[0]);
        if (route) out.push({ type: 'navigate', to: route });
        break;
      }
      case 'play_demo': {
        const demo = str(a.demo, 30).toLowerCase();
        if (demoById(demo)) out.push({ type: 'play_demo', demo });
        break;
      }
      case 'download_resume':
        out.push({ type: 'download_resume', format: a.format === 'docx' ? 'docx' : 'pdf' });
        break;
      case 'email': {
        const subject = str(a.subject, 140);
        const body = str(a.body, 1400);
        if (subject || body) out.push({ type: 'email', subject: subject || 'Hello from your portfolio', body });
        break;
      }
      case 'hiring_agent':
        out.push({ type: 'hiring_agent' });
        break;
      case 'set_theme':
        if (a.theme === 'light' || a.theme === 'dark') out.push({ type: 'set_theme', theme: a.theme });
        break;
      case 'copy_email':
        out.push({ type: 'copy_email' });
        break;
      case 'open_link':
        if (a.target === 'linkedin' || a.target === 'github') out.push({ type: 'open_link', target: a.target });
        break;
      default:
        break;
    }
    if (out.length === 3) break;
  }
  return out;
}

/** A request phrased as a command ("open…", "play…", "switch to…"). */
export function isImperative(message: string): boolean {
  return /^\s*(please\s+|can you\s+|could you\s+)?(open|show|take me|go to|navigate|play|watch|switch|turn|make|start|run|launch|toggle)\b/i.test(
    message
  ) || /\btake me to\b/i.test(message);
}

export const canAutoRun = (a: SiteAction, message: string) => AUTO_SAFE.has(a.type) && isImperative(message);

export function mailtoHref(subject: string, body: string): string {
  return `mailto:${PERSON.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export function runAction(a: SiteAction, ctx: ActionContext, location = 'chat'): void {
  switch (a.type) {
    case 'navigate':
      ctx.navigate(a.to);
      break;
    case 'play_demo':
      ctx.playDemo(a.demo, location);
      break;
    case 'download_resume':
      downloadUrl(a.format === 'docx' ? RESUME.docx : RESUME.pdf, `Ashfaque_Rifaye_Resume.${a.format}`);
      break;
    case 'email':
      window.location.href = mailtoHref(a.subject, a.body);
      break;
    case 'hiring_agent':
      ctx.runHiringAgent(a.jd);
      break;
    case 'set_theme':
      ctx.setTheme(a.theme, location);
      break;
    case 'copy_email':
      void copyText(PERSON.email);
      break;
    case 'open_link':
      window.open(a.target === 'linkedin' ? SOCIALS.linkedin : SOCIALS.github, '_blank', 'noopener');
      break;
  }
}
