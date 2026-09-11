import type { LabProject } from './types';

/* Experiments outside the day job, each framed by the product question
   behind it. Lessons are drawn from each repository's documented design
   choices; see CONTENT-TODO.md to add first-person notes. */
export const LAB_PROJECTS: LabProject[] = [
  {
    slug: 'crosscheck',
    name: 'Crosscheck',
    context: 'Microsoft Agents League Hackathon · Reasoning agents',
    oneLiner:
      'An agent that audits a body of enterprise knowledge for contradictions between authoritative documents, citing both sides.',
    question:
      'Why do enterprise assistants answer confidently and wrong? Often because two sources quietly disagree, and retrieval grounds in whichever one it fetched.',
    learned: [
      'Audit RAG by inverting it: extract atomic claims across sources, cluster them, and flag disagreement instead of answering.',
      'A grounding guardrail beats a clever prompt: no contradiction is reported without citations from two different documents.',
      'Suggested resolutions are labelled as suggestions, with the heuristic shown, never asserted as truth.',
    ],
    stack: ['Python', 'FastAPI', 'Microsoft Foundry IQ', 'Azure AI Search', 'LLM reasoning'],
    status: 'Hackathon build',
    featured: true,
    links: { github: 'https://github.com/ashfaque-rifaye/crosscheck' },
  },
  {
    slug: 'climatwin',
    name: 'ClimaTwin',
    context: 'Google Gen AI Academy APAC hackathon',
    oneLiner:
      'Urban climate decision intelligence: pick a point in a city, read its microclimate, design an intervention within a budget and simulate the impact.',
    question:
      'Climate tools show where it is hot or flood-prone. Could one prove the consequence of a fix before money is spent?',
    learned: [
      'Prescriptive beats descriptive: the product is the simulation and the budget optimizer, not the map.',
      'Label modeled numbers honestly: every figure carries an uncertainty band, cited coefficients and its provenance.',
      'Heavy pipelines run at build time (satellite exports, model training), which keeps the runtime cost close to zero.',
    ],
    stack: ['React 19', 'TypeScript', 'FastAPI', 'Gemini 2.5 Flash', 'BigQuery ML', 'Earth Engine', 'Cloud Run'],
    status: 'Live demo',
    featured: true,
    links: {
      github: 'https://github.com/ashfaque-rifaye/clima-twin',
      demo: 'https://climatwin-980129431310.asia-south1.run.app',
      youtube: 'mLN7ojhJgFw',
    },
  },
  {
    slug: 'nebulax',
    name: 'NebulaX',
    context: 'Independent build',
    oneLiner:
      'A self-correcting agent swarm: describe a research mission in plain language and agents gather, cross-check and reconcile findings into a ranked build plan.',
    question:
      'Can an agent swarm surface conflicting data for a person to reconcile, instead of hiding it behind a confidence score?',
    learned: [
      'Replace opaque confidence scores with a plain Verified / Needs review badge and the number of sources.',
      'Make disagreement a first-class object: a conflict shows both sides, and one click records the canonical value.',
      'Meter every model run by actual token consumption, so cost is visible product state.',
    ],
    stack: ['React 19', 'TypeScript', 'Express', 'Provider-agnostic LLM layer', 'Groq · Cerebras · OpenRouter'],
    status: 'Prototype',
    featured: true,
    links: { github: 'https://github.com/ashfaque-rifaye/nebulaX', youtube: 'hDhJHZPzrPc' },
  },
  {
    slug: 'fourcast',
    name: 'FourCast',
    context: 'AMD Developer Hackathon: ACT II · Track 2 · team project',
    oneLiner:
      'A containerized video-captioning agent that grounds each caption in what is on screen, writes it in four voices, and judges itself before shipping.',
    question:
      'Most captioners fail by hallucinating or by crashing the grading harness. What does a captioner built for reliability look like?',
    learned: [
      'Ground first: a facts-only scene report is the contract. If it is not visible, it does not exist.',
      'Judge with a different model family to avoid self-bias, and refine only when a caption misses the quality bar.',
      'Reliability is a feature: atomic writes, per-clip timeouts and deterministic fallbacks keep the output valid.',
    ],
    stack: ['Python 3.12', 'FastAPI', 'Fireworks AI (AMD-hosted)', 'Kimi K2.6', 'GLM 5.2', 'gpt-oss-120b', 'Docker'],
    status: 'Hackathon build',
    team: true,
    links: { github: 'https://github.com/ashfaque-rifaye/fourcast' },
  },
  {
    slug: 'matchday-ops',
    name: 'MatchDay Ops',
    context: 'Prompt Wars Challenge 4 · FIFA World Cup 2026',
    oneLiner:
      'An explainable GenAI operations platform for stadium volunteers, control rooms and fans with accessibility needs.',
    question:
      'Where is a model genuinely necessary? The build answers task by task, and the interface badges which engine answered.',
    learned: [
      'Use the model only where language needs reasoning (intent, register, translation); thresholds and routing stay deterministic.',
      'Every AI output carries a short, human-readable "why".',
      'Test the deployed app: Arabic and Hindi tokenize expensively, and a low token limit was silently truncating answers.',
    ],
    stack: ['React 19', 'TanStack Start', 'TypeScript', 'Gemini · Fireworks', 'Zod', 'Vitest', 'Cloud Run'],
    status: 'Live demo',
    links: {
      github: 'https://github.com/ashfaque-rifaye/matchday-ops',
      demo: 'https://matchday-ops-163580532635.us-central1.run.app',
    },
  },
  {
    slug: 'ai-twin',
    name: 'AI Twin',
    context: 'This site',
    oneLiner:
      'A résumé assistant that answers recruiter questions from a verified fact sheet, with curated answers when the model gateway is down.',
    question:
      "Can a portfolio answer a recruiter's specific question faster than a PDF, without inventing anything?",
    learned: [
      'Constrain the model to a verified fact sheet and have it say "I don\'t know" outside it.',
      'Design the failure path first: curated answers keep the panel useful when the gateway is unreachable.',
      'Browser-side keys are public, so scope and rate-limit them at the gateway.',
    ],
    stack: ['React', 'OpenAI-compatible gateway', 'Gemini 2.0 Flash'],
    status: 'Running on this site',
    links: {},
  },
];

export const MORE_BUILDS = [
  {
    name: 'Titus-Prime',
    line: 'Autonomous financial-operations agent for US and India SaaS: multi-agent, 11 connectors, USD and INR.',
    github: 'https://github.com/ashfaque-rifaye/titus-prime',
  },
  {
    name: 'VaaniSetu',
    line: 'AI for Bharat hackathon: voice-first access to government schemes in local Indian languages.',
    github: 'https://github.com/ashfaque-rifaye/ai-for-bharat-hackathon',
  },
  {
    name: 'CarbonSync',
    line: 'A carbon coach that ranks the next best action by impact per effort; deterministic analytics give the model its ground truth.',
    github: 'https://github.com/ashfaque-rifaye/carbon-footprint-awareness',
  },
  {
    name: 'Election Ballot Buddy',
    line: 'An agentic election assistant for Indian voters on Vertex AI with Gemini 2.5 Flash.',
    github: 'https://github.com/ashfaque-rifaye/election-ballot-buddy',
  },
  {
    name: 'Productivity Hub',
    line: 'A multi-agent productivity system hosted on Google Cloud.',
    github: 'https://github.com/ashfaque-rifaye/productivity_hub',
  },
  {
    name: 'AI Mock Interview',
    line: 'Mock interviews evaluated by an LLM, with structured feedback.',
    github: 'https://github.com/ashfaque-rifaye/ai-mock-interview',
  },
] as const;
