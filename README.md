# ashfaque-rifaye.github.io

Portfolio of **Ashfaque Rifaye, AI Product Leader**: enterprise AI, GenAI and customer-experience products, told through case studies rather than a résumé dump.

Live at <https://ashfaque-rifaye.github.io>.

- Strategy, audience and principles: [PRODUCT.md](PRODUCT.md)
- Visual system (tokens, type, motion): [DESIGN.md](DESIGN.md)
- Open content items and decisions: `CONTENT-TODO.md`, a local notes file kept out of git (see `.gitignore`)

## Stack

- **Vite 5 + React 18 + TypeScript** (strict), **Tailwind CSS 3** with OKLCH design tokens in `src/styles.css`
- **React Router 7** for the multi-page structure
- **Static prerender**: every route is rendered to its own `index.html` at build time (`scripts/prerender.mjs`), so each page has real HTML, its own `<title>`, description, canonical URL and social tags, and loads without waiting for JavaScript. The client then hydrates.
- **Self-hosted fonts** via Fontsource (Archivo variable, Martian Mono variable); no third-party font requests
- **GitHub Pages** deploy through GitHub Actions (`.github/workflows/deploy.yml`)

## Pages

| Route | Page |
| --- | --- |
| `/` | Home: hero, selected impact, selected work, capabilities, principles, AI Lab, trajectory, recognition |
| `/work/` | Case-study index and other shipped work |
| `/work/att-genai-virtual-assistant/` | Case study 01 |
| `/work/verizon-digital-commerce/` | Case study 02 |
| `/work/ai-product-innovation/` | Case study 03 (DeviceFlex) |
| `/lab/` | AI Lab experiments, including the AI Twin |
| `/about/` | Story, by the numbers, skills, credentials |
| `/resume/` | Résumé downloads and preview |
| `/contact/` | Contact |

## Where things live

```
src/
  content/            All copy and data (edit here, not in components)
    case-studies/     One file per case study (sections are JSX)
    profile.ts        Name, links, hero copy, résumé paths
    metrics.ts        Impact numbers
    lab.ts            AI Lab experiments
    work.ts           Case-study index + other shipped work
  pages/              One component per route
  components/
    home/             Home sections
    case-study/       Reusable case-study template and blocks
    diagrams/         Figure frame, flows, layered architecture, metric columns
    layout/           Header, footer, page header, command palette (Ctrl/⌘ K)
    chat/             AI Twin panel (code-split, loads on demand)
    ui/               Buttons, links, readouts, reveal, video embed, dev placeholders
  site/               Route metadata (SEO) and shared UI state
  lib/                Analytics, hooks, chat client, utilities
scripts/prerender.mjs Static HTML per route, 404.html and sitemap.xml
```

### Adding a case study

1. Add its metadata to `CASE_STUDIES` in `src/content/work.ts` (the route and SEO metadata derive from it).
2. Create `src/content/case-studies/<slug>.tsx` exporting a `CaseStudyContent` (see the existing three).
3. Register it in `src/pages/CaseStudyPage.tsx`.

### Placeholders

`<Todo>` boxes render only in `npm run dev`; production builds omit them. Open items are listed in the local, git-ignored `CONTENT-TODO.md`.

## Commands

```bash
npm install
npm run dev        # local dev server
npm run build      # typecheck, client build, server build, prerender
npm run preview    # serve the production build locally
```

## Deploy

Pushing to `main` triggers the GitHub Actions workflow, which builds and publishes `dist/` to GitHub Pages. Optional repository secrets:

| Secret | Purpose |
| --- | --- |
| `VITE_GA_MEASUREMENT_ID` | Google Analytics 4. Without it, analytics is a no-op. |
| `VITE_GATEWAY_API_KEY` | Key for the AI Twin's LLM gateway. Without it, the AI Twin uses its curated offline answers. |

`VITE_` values are embedded in the client bundle, so treat them as public: scope and rate-limit the gateway key on the gateway side.
