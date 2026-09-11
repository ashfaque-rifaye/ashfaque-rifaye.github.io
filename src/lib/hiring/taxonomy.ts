/* Skills the Hiring Agent recognises in a job description, with how strong
   Ashfaque's evidence is for each (0 to 1) and the one-line basis for that
   rating. Ratings are deliberately conservative: gaps are shown, not hidden. */

export interface Skill {
  id: string;
  label: string;
  /** Lower-case fragments; up to 4 characters match whole words only. */
  terms: string[];
  strength: number;
  basis: string;
  evidence: string[];
  /** Generic skills (platform, delivery…) that match incidentally carry less weight. */
  broad?: boolean;
  /** More specific skills that replace this one when both match. */
  overriddenBy?: string[];
}

export const SKILLS: Skill[] = [
  {
    id: 'ai-product',
    label: 'AI product management',
    terms: ['ai product', 'ai/ml product', 'ml product', 'ai-powered', 'ai powered', 'ai feature', 'ai capabilit', 'ai solution', 'applied ai', 'ai pm', 'ai-first', 'ai initiative', 'ai strategy', 'ai roadmap', 'ai', 'artificial intelligence', 'intelligent'],
    strength: 1,
    basis: 'Owns a production GenAI assistant at AT&T serving 1.5M+ interactions a month.',
    evidence: ['att-va', 'deviceflex', 'att-analytics'],
  },
  {
    id: 'conversational-ai',
    label: 'Conversational AI and virtual assistants',
    terms: ['conversational', 'chatbot', 'chat bot', 'virtual assistant', 'virtual agent', 'voicebot', 'voice bot', 'voice assistant', 'dialogflow', 'ccai', 'contact center ai', 'nlu', 'intent', 'bot', 'bots', 'ivr', 'assistant'],
    strength: 1,
    basis: "End-to-end owner of AT&T's assistant across chat, voice, WhatsApp and RCS; 350+ intents at 92% recognition accuracy.",
    evidence: ['att-va', 'ai-twin'],
  },
  {
    id: 'genai-llm',
    label: 'Generative AI and LLMs',
    terms: ['generative', 'genai', 'gen ai', 'llm', 'llms', 'large language', 'language model', 'gpt', 'gemini', 'claude', 'foundation model', 'prompt', 'copilot'],
    strength: 0.95,
    basis: 'GenAI in production at AT&T, plus LLM products built on Gemini and open models.',
    evidence: ['att-va', 'climatwin', 'nebulax', 'matchday'],
  },
  {
    id: 'rag',
    label: 'Retrieval-augmented generation',
    terms: ['rag', 'retrieval', 'knowledge base', 'knowledge management', 'vector', 'embedding', 'semantic search', 'grounding', 'grounded', 'search relevance'],
    strength: 0.9,
    basis: 'RAG knowledge retrieval in the AT&T assistant; Crosscheck audits RAG sources for contradictions.',
    evidence: ['att-va', 'crosscheck'],
  },
  {
    id: 'agentic',
    label: 'Agentic AI and multi-agent systems',
    terms: ['agentic', 'ai agent', 'agents', 'multi-agent', 'multi agent', 'autonomous', 'orchestrat', 'tool use', 'tool calling', 'function calling', 'workflow automation', 'automation'],
    strength: 0.8,
    basis: "Agent builds (NebulaX, Crosscheck, FourCast) and this site's Hiring Agent; not yet an agent platform at enterprise scale.",
    evidence: ['nebulax', 'crosscheck', 'ai-twin', 'deviceflex'],
  },
  {
    id: 'ml',
    label: 'Machine learning and data science',
    terms: ['machine learning', 'ml model', 'model training', 'deep learning', 'data science', 'data scientist', 'predictive', 'classification', 'forecast', 'mlops', 'ml ops', 'ml', 'model development', 'fine-tun', 'fine tun', 'training data'],
    strength: 0.55,
    basis: 'Works closely with ML teams and used BigQuery ML in ClimaTwin; not a data scientist or ML engineer by title.',
    evidence: ['climatwin', 'att-personalization', 'att-va'],
  },
  {
    id: 'ai-quality',
    label: 'AI evaluation and monitoring',
    terms: ['evaluation', 'evals', 'eval', 'model performance', 'accuracy', 'monitoring', 'observability', 'quality', 'benchmark', 'llm-as-judge', 'judge', 'precision', 'recall', 'hallucination'],
    strength: 0.85,
    basis: 'A 15+ KPI framework and a 6-channel analytics suite for the AT&T assistant; a cross-model judge in FourCast.',
    evidence: ['att-analytics', 'att-va', 'fourcast', 'crosscheck'],
  },
  {
    id: 'responsible-ai',
    label: 'Responsible AI, guardrails and human oversight',
    terms: ['responsible', 'ethic', 'guardrail', 'safety', 'human-in-the-loop', 'human in the loop', 'explainab', 'transparen', 'trust', 'bias', 'fairness', 'governance', 'compliance', 'privacy'],
    strength: 0.8,
    basis: 'Human review of low-confidence answers at AT&T; DeviceFlex keeps every decision deterministic and replayable.',
    evidence: ['att-va', 'deviceflex', 'matchday', 'crosscheck'],
  },
  {
    id: 'multimodal',
    label: 'Vision, voice and multimodal AI',
    terms: ['vision', 'multimodal', 'multi-modal', 'image', 'video', 'computer vision', 'speech', 'voice', 'audio', 'ocr'],
    strength: 0.7,
    basis: 'The voice channel of the AT&T assistant; vision-model claims triage in DeviceFlex; video captioning in FourCast.',
    evidence: ['att-va', 'deviceflex', 'fourcast'],
  },
  {
    id: 'cx',
    label: 'Customer experience',
    terms: ['customer experience', 'cx', 'nps', 'csat', 'satisfaction', 'customer journey', 'user journey', 'self-service', 'self service', 'digital experience', 'user experience', 'ux', 'customer-centric', 'customer centric', 'customer obsess'],
    strength: 0.95,
    basis: 'NPS up 8 points on the AT&T assistant; CX-led redesigns at Verizon (22% fewer service inquiries).',
    evidence: ['att-va', 'vz-etf', 'vz-split'],
  },
  {
    id: 'contact-center',
    label: 'Contact centre and customer care',
    terms: ['contact center', 'contact centre', 'customer care', 'customer service', 'customer support', 'call center', 'call centre', 'agent assist', 'containment', 'deflection', 'handle time', 'aht', 'escalation', 'ticket'],
    strength: 1,
    basis: '55% containment, 28% fewer live-agent escalations and 32 seconds lower average handle time.',
    evidence: ['att-va'],
  },
  {
    id: 'experimentation',
    label: 'Experimentation and A/B testing',
    terms: ['a/b', 'ab test', 'a/b test', 'experiment', 'split test', 'hypothes', 'multivariate', 'test and learn', 'test-and-learn'],
    strength: 0.9,
    basis: 'Funnel analysis and A/B tests behind five shipped Verizon commerce changes.',
    evidence: ['vz-commerce', 'vz-dpp', 'vz-cart'],
  },
  {
    id: 'analytics',
    label: 'Product analytics and KPIs',
    terms: ['analytics', 'kpi', 'kpis', 'metric', 'data-driven', 'data driven', 'sql', 'power bi', 'tableau', 'looker', 'dashboard', 'funnel', 'insight', 'okr', 'okrs', 'measure', 'data analysis'],
    strength: 0.9,
    basis: 'Tracks 15+ KPIs in Power BI and SQL; funnel analysis at Verizon.',
    evidence: ['att-analytics', 'att-va', 'vz-commerce'],
  },
  {
    id: 'strategy',
    broad: true,
    label: 'Product strategy and roadmap',
    terms: ['strategy', 'strategic', 'roadmap', 'vision', 'prioriti', 'product direction', 'go-to-market', 'go to market', 'gtm', 'market research', 'competitive', 'north star', 'product-market'],
    strength: 0.85,
    basis: 'Owns the AT&T assistant roadmap; took DeviceFlex from an ambiguous problem to a pitched product.',
    evidence: ['att-va', 'deviceflex', 'helios'],
  },
  {
    id: 'discovery',
    broad: true,
    label: 'Discovery and customer research',
    terms: ['discovery', 'user research', 'customer research', 'interview', 'problem definition', 'jobs to be done', 'jtbd', 'personas', 'usability', 'customer insight', 'empathy'],
    strength: 0.75,
    basis: 'Customer research and funnel diagnostics at Verizon; problem framing in the DeviceFlex case study.',
    evidence: ['vz-commerce', 'deviceflex'],
  },
  {
    id: 'delivery',
    broad: true,
    label: 'Agile delivery (Scrum and SAFe)',
    terms: ['agile', 'scrum', 'safe', 'sprint', 'backlog', 'kanban', 'jira', 'user stor', 'requirements', 'prd', 'prds', 'product owner', 'acceptance criteria', 'release', 'delivery', 'execution', 'ship'],
    strength: 1,
    basis: 'Backlog and sprint planning for 2 squads (18 developers) in SAFe at 95% sprint reliability; SAFe and CSPO certified.',
    evidence: ['att-va', 'certs', 'vz-commerce'],
  },
  {
    id: 'stakeholders',
    broad: true,
    label: 'Stakeholders and cross-functional leadership',
    terms: ['stakeholder', 'cross-functional', 'cross functional', 'influence', 'executive', 'alignment', 'collaborat', 'partner with', 'communicat', 'leadership', 'senior leaders'],
    strength: 0.85,
    basis: 'Aligns engineering, design, operations and business owners for the assistant; helped secure a $2.5M FY25 budget.',
    evidence: ['att-va', 'vz-commerce', 'helios'],
  },
  {
    id: 'people-management',
    label: 'People management',
    terms: ['people manager', 'people management', 'manage a team', 'managing a team', 'direct report', 'line manag', 'hire and grow', 'hiring and developing', 'mentor', 'coach', 'build a team', 'team of product managers', 'lead a team', 'manage product managers'],
    strength: 0.45,
    basis: 'Leads delivery for 2 squads as product owner; the record shows no formal line management.',
    evidence: ['att-va'],
  },
  {
    id: 'business',
    label: 'Business cases, ROI and monetization',
    terms: ['business case', 'roi', 'p&l', 'p & l', 'revenue', 'monetiz', 'monetis', 'pricing', 'commercial', 'cost saving', 'savings', 'budget', 'unit economics', 'profitab', 'business impact', 'business outcome', 'margin'],
    strength: 0.85,
    basis: 'About $4.2M in estimated annual savings, $1.5M+ incremental revenue and a $2.5M budget secured.',
    evidence: ['att-va', 'vz-commerce', 'vz-dpp', 'vz-hum'],
  },
  {
    id: 'platform',
    broad: true,
    label: 'APIs, platforms and integrations',
    terms: ['api', 'apis', 'integration', 'platform', 'crm', 'telephony', 'salesforce', 'microservice', 'backend', 'system design', 'architecture', 'technical design', 'sdk', 'data pipeline', 'developer experience'],
    strength: 0.85,
    basis: 'Telephony and CRM integrations for the AT&T assistant; full-stack engineering at Infosys.',
    evidence: ['att-va', 'infosys-boeing'],
  },
  {
    id: 'technical',
    broad: true,
    label: 'Technical depth and hands-on building',
    terms: ['technical', 'engineering background', 'software engineer', 'software development', 'coding', 'programming', 'python', 'java', 'javascript', 'typescript', 'react', 'developer', 'hands-on', 'hands on', 'prototype', 'prototyping'],
    strength: 0.85,
    basis: 'Four years as a senior software engineer; builds working prototypes himself (DeviceFlex, ClimaTwin, NebulaX).',
    evidence: ['infosys-boeing', 'deviceflex', 'climatwin'],
  },
  {
    id: 'cs-degree',
    label: 'Computer science or advanced degree',
    terms: ['computer science', 'cs degree', 'degree in cs', "bachelor's in computer", 'masters in computer', "master's in computer", 'b.tech in computer', 'm.s. in computer', 'phd', 'ph.d'],
    strength: 0.35,
    basis: 'B.E. in Mechanical Engineering with distinction, not computer science; no advanced degree in the record.',
    evidence: ['education', 'infosys-boeing'],
  },
  {
    id: 'degree',
    label: "Bachelor's degree",
    terms: ['bachelor', 'degree', 'b.e', 'b.tech', 'engineering degree'],
    strength: 0.9,
    basis: 'B.E. Mechanical Engineering with distinction.',
    evidence: ['education'],
    overriddenBy: ['cs-degree', 'mba'],
  },
  {
    id: 'mba',
    label: 'MBA',
    terms: ['mba', 'master of business'],
    strength: 0.2,
    basis: 'No MBA in the record; business outcomes show in revenue and savings results instead.',
    evidence: ['vz-commerce', 'att-va'],
  },
  {
    id: 'cloud',
    label: 'Cloud platforms',
    terms: ['cloud', 'gcp', 'google cloud', 'azure', 'aws', 'amazon web services', 'vertex', 'bedrock', 'kubernetes', 'serverless'],
    strength: 0.7,
    basis: 'Google CCAI at AT&T, Cloud Run and BigQuery in ClimaTwin, Azure AI Search in Crosscheck; Azure AI Fundamentals.',
    evidence: ['climatwin', 'crosscheck', 'certs', 'att-va'],
  },
  {
    id: 'ecommerce',
    label: 'Digital commerce',
    terms: ['e-commerce', 'ecommerce', 'commerce', 'checkout', 'cart', 'conversion', 'retail', 'marketplace', 'online sales', 'shopping', 'omnichannel', 'omni-channel'],
    strength: 0.9,
    basis: 'Five shipped Verizon commerce changes across retail, consumer and B2B; +15% recommendation click-through at AT&T.',
    evidence: ['vz-commerce', 'vz-cart', 'att-personalization'],
  },
  {
    id: 'telecom',
    label: 'Telecom',
    terms: ['telecom', 'telco', 'telecommunication', 'wireless', 'carrier', 'mobile network', '5g', 'broadband', 'isp', 'connectivity'],
    strength: 1,
    basis: 'Six years across AT&T and Verizon.',
    evidence: ['att-va', 'vz-commerce', 'deviceflex'],
  },
  {
    id: 'enterprise',
    broad: true,
    label: 'Enterprise scale and B2B',
    terms: ['enterprise', 'fortune 500', 'at scale', 'large-scale', 'large scale', 'millions', 'b2b', 'saas', 'global', 'regulated'],
    strength: 0.9,
    basis: 'AI at AT&T scale (1.5M+ interactions a month); B2B journeys at Verizon; Boeing at Infosys.',
    evidence: ['att-va', 'vz-commerce', 'infosys-boeing'],
  },
  {
    id: 'innovation',
    label: '0→1 innovation',
    terms: ['0 to 1', '0-1', '0-to-1', 'zero to one', '0→1', 'new product', 'incubat', 'mvp', 'innovation', 'innovative', 'hackathon', 'greenfield', 'venture', 'from scratch'],
    strength: 0.95,
    basis: 'Best in Show at AT&T Innovation Jam 2026, AT&T Hackathon 1st place, and DeviceFlex built solo with an invention disclosure.',
    evidence: ['deviceflex', 'helios', 'hackathon-travel', 'equitech'],
  },
  {
    id: 'personalization',
    label: 'Personalization and recommendations',
    terms: ['personaliz', 'personalis', 'recommend', 'segmentation', 'targeting', 'next best action'],
    strength: 0.7,
    basis: 'Retail hyper-personalization at AT&T (+15% click-through) and a hackathon-winning personalized travel concept.',
    evidence: ['att-personalization', 'hackathon-travel'],
  },
  {
    id: 'communication',
    label: 'Communication and storytelling',
    terms: ['storytelling', 'presentation', 'pitch', 'written communication', 'verbal', 'articulate', 'evangel', 'narrative', 'present to'],
    strength: 0.85,
    basis: 'Won pitch-judged innovation awards; writes long-form case studies like the ones on this site.',
    evidence: ['helios', 'deviceflex', 'equitech'],
  },
  {
    id: 'insurance',
    label: 'Insurance, claims and protection',
    terms: ['insurance', 'insurtech', 'claims', 'warranty', 'protection plan', 'underwriting'],
    strength: 0.6,
    basis: 'DeviceFlex reimagines device protection and claims; no insurance-industry role in the record.',
    evidence: ['deviceflex'],
  },
  {
    id: 'fintech',
    label: 'Payments and financial services',
    terms: ['fintech', 'payment', 'payments', 'banking', 'lending', 'financial services', 'credit'],
    strength: 0.45,
    basis: 'Device-payment plans at Verizon; no role in financial services.',
    evidence: ['vz-dpp'],
  },
  {
    id: 'healthcare',
    label: 'Healthcare',
    terms: ['healthcare', 'health care', 'clinical', 'patient', 'medical', 'hipaa', 'pharma'],
    strength: 0.15,
    basis: 'No healthcare experience in the record.',
    evidence: [],
  },
  {
    id: 'mobile',
    label: 'Mobile and app products',
    terms: ['mobile app', 'ios', 'android', 'app store', 'mobile experience', 'native app'],
    strength: 0.65,
    basis: 'Owns messaging channels (WhatsApp, RCS); DeviceFlex is designed to live inside the myAT&T app.',
    evidence: ['att-va', 'deviceflex'],
  },
];

export const skillById = (id: string) => SKILLS.find((s) => s.id === id);

const escapeRe = (s: string) => s.replace(/[.*+?^${}()|[\]\\/]/g, '\\$&');
const MATCHERS = SKILLS.map((s) => ({
  id: s.id,
  res: s.terms.map((t) => (t.length <= 4 ? new RegExp(`(^|[^a-z0-9])${escapeRe(t)}($|[^a-z0-9])`, 'i') : null)),
  terms: s.terms,
}));

/** Skill ids whose terms appear in the text, with overrides applied. */
export function matchSkills(text: string): string[] {
  const lower = text.toLowerCase();
  const hits = MATCHERS.filter((m) => m.terms.some((t, i) => (m.res[i] ? m.res[i]!.test(lower) : lower.includes(t)))).map((m) => m.id);
  return hits.filter((id) => !skillById(id)?.overriddenBy?.some((o) => hits.includes(o)));
}
