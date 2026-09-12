# ashfaque-rifaye.github.io

Portfolio of **Ashfaque Rifaye, AI Product Leader**: enterprise AI, GenAI and customer-experience products, told through case studies rather than a résumé dump.

Live at <https://ashfaque-rifaye.github.io>.

- Strategy, audience and principles: [PRODUCT.md](PRODUCT.md)
- Visual system (tokens, type, motion): [DESIGN.md](DESIGN.md)
- Open content items and decisions: `CONTENT-TODO.md`, a local notes file kept out of git (see `.gitignore`)

## Stack

- **Vite 5 + React 18 + TypeScript** (strict), **Tailwind CSS 3** with OKLCH design tokens in `src/styles.css`: a gradient spectrum with light and dark themes (dark by default, toggle in the header)
- **React Router 7** for the multi-page structure
- **Static prerender**: every route is rendered to its own `index.html` at build time (`scripts/prerender.mjs`), so each page has real HTML, its own `<title>`, description, canonical URL and social tags, and loads without waiting for JavaScript. The client then hydrates.
- **Self-hosted fonts** via Fontsource (Archivo variable, Martian Mono variable); no third-party font requests
- **GitHub Pages** deploy through GitHub Actions (`.github/workflows/deploy.yml`)

## Pages

| Route | Page |
| --- | --- |
| `/` | Home: hero, selected impact, selected work, capabilities, skills and competencies, Hiring Agent teaser, principles, AI Lab, trajectory, recognition |
| `/work/` | Case-study index and other shipped work |
| `/work/att-genai-virtual-assistant/` | Case study 01 |
| `/work/verizon-digital-commerce/` | Case study 02 |
| `/work/ai-product-innovation/` | Case study 03 (DeviceFlex) |
| `/demos/` | Video walkthroughs and live apps. Not a header tab: demos lead the AI Lab, which links here, as do the hero, footer and search |
| `/agent/` | Hiring Agent: job description → evidence map, fit score, outreach email, calendar invite, brief. Not a header tab: linked from the home page, AI Lab, Contact, footer, search and the AI Twin |
| `/lab/` | AI Lab experiments, with the demos first |
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
    demos.ts          Video demos and live apps (DEVICEFLEX_VIDEO_PUBLIC lives here)
    work.ts           Case-study index + other shipped work
  pages/              One component per route
  components/
    home/             Home sections (hero, demo reel, agent teaser, …)
    agent/            Hiring Agent UI: timeline, fit report, actions, "under the hood"
    video/            Demo cards and the full-screen player
    case-study/       Reusable case-study template and blocks
    diagrams/         Figure frame, flows, layered architecture, metric columns
    layout/           Header, footer, page header, theme toggle, search palette (Ctrl/⌘ K)
    chat/             AI Twin: floating launcher + panel (panel code-split)
    ui/               Buttons, links, readouts, reveal, inline video, dev placeholders
  site/               Route metadata (SEO), theme, shared UI state
  lib/
    llm.ts            Gateway client (hedged: OpenRouter Gemini 2.5 Flash, then Hugging Face Qwen 2.5 72B)
    twin.ts           AI Twin: fast paths for commands, LLM answers with actions, offline answers
    actions.ts        Allowlisted site actions the AI may take (navigate, play demo, email, theme…)
    facts.ts          The verified fact sheet the AI answers from
    hiring/           Hiring Agent: skills taxonomy, evidence graph, engine, sample roles
    …                 Analytics, hooks, utilities
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
| `VITE_GA_MEASUREMENT_ID` | Google Analytics 4. Without it, analytics is a no-op. Page views after the first come from GA4 Enhanced Measurement ("Page changes based on browser history events"), so keep that setting on for the web stream. |
| `VITE_GATEWAY_API_KEY` | Key for the LLM gateway used by the AI Twin and the Hiring Agent. Without it, the AI Twin uses curated offline answers and the agent runs on its rules engine and templates. |

`VITE_` values are embedded in the client bundle, so treat them as public: scope and rate-limit the gateway key on the gateway side.

## AI features

- **AI Twin** (floating, bottom right): answers from `src/lib/facts.ts`, proposes actions from the allowlist in `src/lib/actions.ts`, and runs low-risk ones (navigate, play a demo, switch theme) when the visitor asks. Commands and pasted job descriptions skip the model entirely.
- **Hiring Agent** (`/agent/`): the model reads the job description into a fixed skills vocabulary and writes the brief; matching and scoring are deterministic (`src/lib/hiring/`). Email, calendar invite and brief are drafts the visitor sends or saves.
- **Model routing** (`src/lib/llm.ts`): each call names its provider on the gateway so it skips the generic fallback chain. OpenRouter with Gemini 2.5 Flash goes first; Hugging Face with Qwen 2.5 72B starts if the first fails or is silent after 3.5s.

## Demo videos

YouTube demos are listed in `src/content/demos.ts` and load only when played. The DeviceFlex walkthrough is prepared but off by default: add the web encode as `public/media/deviceflex-demo.mp4` and set `DEVICEFLEX_VIDEO_PUBLIC = true`.
