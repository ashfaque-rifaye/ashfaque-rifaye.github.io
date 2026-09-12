import type { Demo } from './types';

/* Video walkthroughs of things I have built. YouTube videos load only when
   played (youtube-nocookie). Self-hosted files live in public/media. */

/**
 * The DeviceFlex walkthrough stays off the public site until publishing it
 * is approved: it shows AT&T branding and demonstrates the invention covered
 * by the disclosure. To publish, add the web encode (720p H.264, ~40 MB) as
 * public/media/deviceflex-demo.mp4 and set this to true.
 */
export const DEVICEFLEX_VIDEO_PUBLIC = false;

export const DEMOS: Demo[] = [
  {
    id: 'deviceflex',
    title: 'DeviceFlex walkthrough',
    project: 'DeviceFlex',
    context: 'AT&T Sprint-a-thon 2026 · conceived and built solo',
    summary:
      'Device protection reimagined as an AI-powered membership: AI-guided claims, a household protection score, same-day swaps and a data vault. AI perceives; deterministic functions decide.',
    duration: '5:20',
    kind: DEVICEFLEX_VIDEO_PUBLIC ? 'file' : 'request',
    src: '/media/deviceflex-demo.mp4',
    poster: '/media/deviceflex-poster.webp',
    tags: ['Vision model', 'Deterministic decisions', 'Claims automation'],
    links: { caseStudy: '/work/ai-product-innovation/' },
  },
  {
    id: 'climatwin',
    title: 'ClimaTwin: urban microclimate decision engine',
    project: 'ClimaTwin',
    context: 'Google Gen AI Academy APAC hackathon',
    summary:
      'Pick a point in a city, read its microclimate, design an intervention within a budget and simulate the impact before any money is spent.',
    duration: '2:59',
    kind: 'youtube',
    youtubeId: 'mLN7ojhJgFw',
    tags: ['Gemini 2.5 Flash', 'BigQuery ML', 'Earth Engine'],
    links: {
      live: 'https://climatwin-980129431310.asia-south1.run.app',
      github: 'https://github.com/ashfaque-rifaye/clima-twin',
      lab: '/lab/#climatwin',
    },
  },
  {
    id: 'nebulax',
    title: 'NebulaX: a self-correcting agent swarm',
    project: 'NebulaX',
    context: 'Independent build',
    summary:
      'Describe a research mission in plain language; agents gather, cross-check and reconcile findings into a ranked build plan, and surface conflicts for a person to resolve.',
    duration: '2:41',
    kind: 'youtube',
    youtubeId: 'hDhJHZPzrPc',
    tags: ['Multi-agent', 'Provider-agnostic LLMs', 'Human in the loop'],
    links: { github: 'https://github.com/ashfaque-rifaye/nebulaX', lab: '/lab/#nebulax' },
  },
];

export const demoById = (id: string) => DEMOS.find((d) => d.id === id);

/** Playable demos lead, anything "on request" follows. */
export const orderedDemos = () => [...DEMOS.filter((d) => d.kind !== 'request'), ...DEMOS.filter((d) => d.kind === 'request')];

/** Poster for a demo card: local poster first, else the YouTube HD thumbnail. */
export function demoPoster(d: Demo): string | undefined {
  if (d.poster) return d.poster;
  return d.youtubeId ? `https://i.ytimg.com/vi/${d.youtubeId}/maxresdefault.jpg` : undefined;
}

/** Interactive builds you can open right now. */
export const LIVE_APPS = [
  {
    name: 'Hiring Agent',
    line: 'Paste a job description; an agent maps it to evidence, drafts outreach and prepares a calendar invite.',
    href: '/agent/',
    internal: true,
  },
  {
    name: 'ClimaTwin',
    line: 'Simulate a heat, flood or air-quality intervention for a point in Chennai.',
    href: 'https://climatwin-980129431310.asia-south1.run.app',
    internal: false,
  },
  {
    name: 'MatchDay Ops',
    line: 'Explainable GenAI operations for stadium volunteers, control rooms and fans.',
    href: 'https://matchday-ops-163580532635.us-central1.run.app',
    internal: false,
  },
] as const;
