import { SITE_URL } from '../content/profile';
import { CASE_STUDIES } from '../content/work';

/* Single source of truth for page metadata. Used by the prerender step
   (static <head> per page) and by the client on navigation. */

export interface PageMeta {
  path: string;
  title: string;
  description: string;
  noindex?: boolean;
  ogType?: 'website' | 'article';
}

const SITE = 'Ashfaque Rifaye';

export const PAGES: PageMeta[] = [
  {
    path: '/',
    title: 'Ashfaque Rifaye | AI Product Manager · GenAI · Enterprise AI',
    description:
      'AI Product Manager and technical product leader building enterprise AI, GenAI and customer experience products across telecom and digital platforms.',
  },
  {
    path: '/work/',
    title: `Work | ${SITE}`,
    description:
      'Case studies in enterprise conversational AI, digital commerce experimentation and AI product innovation, with the decisions, trade-offs and metrics behind each.',
  },
  ...CASE_STUDIES.map<PageMeta>((cs) => ({
    path: `/work/${cs.slug}/`,
    title: `${cs.title} | Case study | ${SITE}`,
    description: `${cs.subtitle} ${cs.summary}`,
    ogType: 'article',
  })),
  {
    path: '/lab/',
    title: `AI Lab | ${SITE}`,
    description:
      'Independent AI experiments driven by product questions: auditing RAG knowledge, agentic workflows, grounded generation and explainable AI.',
  },
  {
    path: '/about/',
    title: `About | ${SITE}`,
    description:
      'From mechanical engineering to software, digital product and enterprise AI: the path behind an AI product leader who pairs technical depth with business outcomes.',
  },
  {
    path: '/resume/',
    title: `Résumé | ${SITE}`,
    description:
      'Download the résumé of Ashfaque Rifaye, AI Product Manager: enterprise AI, conversational AI, product strategy and customer experience.',
  },
  {
    path: '/contact/',
    title: `Contact | ${SITE}`,
    description:
      'Building an AI product, scaling an enterprise AI experience, or figuring out where AI creates value? Get in touch with Ashfaque Rifaye.',
  },
];

export const NOT_FOUND: PageMeta = {
  path: '/404/',
  title: `Page not found | ${SITE}`,
  description: 'This page does not exist. Explore the work, the AI Lab or get in touch.',
  noindex: true,
};

export const PRERENDER_ROUTES = PAGES.map((p) => p.path);

export function normalizePath(pathname: string): string {
  const p = pathname.replace(/index\.html$/, '');
  return p.endsWith('/') ? p : `${p}/`;
}

export function metaFor(pathname: string): PageMeta {
  const path = normalizePath(pathname);
  return PAGES.find((p) => p.path === path) ?? NOT_FOUND;
}

const esc = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const OG_IMAGE = `${SITE_URL}/og.png`;

/** Static <head> tags for the prerendered HTML. */
export function headHtml(meta: PageMeta): string {
  const url = `${SITE_URL}${meta.path}`;
  return [
    `<title>${esc(meta.title)}</title>`,
    `<meta name="description" content="${esc(meta.description)}" />`,
    meta.noindex ? '<meta name="robots" content="noindex" />' : `<link rel="canonical" href="${url}" />`,
    `<meta property="og:type" content="${meta.ogType ?? 'website'}" />`,
    `<meta property="og:site_name" content="${SITE}" />`,
    `<meta property="og:title" content="${esc(meta.title)}" />`,
    `<meta property="og:description" content="${esc(meta.description)}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:image" content="${OG_IMAGE}" />`,
    '<meta property="og:image:width" content="1200" />',
    '<meta property="og:image:height" content="630" />',
    '<meta name="twitter:card" content="summary_large_image" />',
    `<meta name="twitter:title" content="${esc(meta.title)}" />`,
    `<meta name="twitter:description" content="${esc(meta.description)}" />`,
    `<meta name="twitter:image" content="${OG_IMAGE}" />`,
  ].join('\n    ');
}

/** Keep <head> in sync after client-side navigation (browser only). */
export function applyMeta(meta: PageMeta): void {
  document.title = meta.title;
  const url = `${SITE_URL}${meta.path}`;
  const set = (selector: string, attr: string, value: string, create: () => HTMLElement) => {
    let el = document.head.querySelector<HTMLElement>(selector);
    if (!el) {
      el = create();
      document.head.appendChild(el);
    }
    el.setAttribute(attr, value);
  };
  const meta_ = (key: string, isProperty = false) => () => {
    const m = document.createElement('meta');
    m.setAttribute(isProperty ? 'property' : 'name', key);
    return m;
  };
  set('meta[name="description"]', 'content', meta.description, meta_('description'));
  set('meta[property="og:title"]', 'content', meta.title, meta_('og:title', true));
  set('meta[property="og:description"]', 'content', meta.description, meta_('og:description', true));
  set('meta[property="og:url"]', 'content', url, meta_('og:url', true));
  if (!meta.noindex) {
    set('link[rel="canonical"]', 'href', url, () => {
      const l = document.createElement('link');
      l.setAttribute('rel', 'canonical');
      return l;
    });
  }
}
