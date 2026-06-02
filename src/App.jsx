import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Sun, Moon, Menu, X, MapPin, Download, ArrowUpRight, ArrowRight, Sparkles,
  Briefcase, ShieldCheck, TrendingUp, Award, Cpu, Target, Bot, GraduationCap,
  CheckCircle, Brain, ChevronRight, Trophy, Zap, Globe, Code2,
  MessageSquare, BarChart2, Star, Quote, Mail, Linkedin, Github, Send, Copy, Check,
  Search, Palette, FileText, PenLine, ExternalLink, CornerDownLeft,
} from 'lucide-react';

/* ------------------------------------------------------------------ */
/*  Config                                                            */
/* ------------------------------------------------------------------ */
const LLM_ENDPOINTS = [
  'https://ashfaque94-inference-gateway-4.hf.space',
  'https://ashfaque94-inference-gateway-5.hf.space',
];
const GATEWAY_API_KEY = import.meta.env.VITE_GATEWAY_API_KEY || '';
const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID || 'G-XXXXXXXXXX';

const SOCIALS = {
  github: 'https://github.com/ashfaque-rifaye',
  linkedin: 'https://www.linkedin.com/in/ashfaque-rifaye/',
  email: 'ashfaque_rifaye@outlook.com',
};

// To use a real photo later: drop the file in /public (e.g. public/avatar.jpg)
// and set AVATAR_SRC = '/avatar.jpg'. Leave as '' to show the illustrated avatar.
const AVATAR_SRC = '';

const RESUME_CONTEXT = `
You are Ashfaque Rifaye's AI assistant. Answer in EXACTLY 1-3 SHORT lines with emojis.

RULES:
- MAX 150 characters per response
- Use ONLY: 🚀 💡 🎯 ⭐ 📊 $
- Format metrics as [1.5M+] not sentences
- NO long explanations - facts only
- Template: EMOJI Point [metric] | EMOJI Point [metric]

DATA SHORTCUTS:
- AI/ML: RAG, CCAI, Dialogflow, 1.5M+ users, 55% containment, $4.2M saved
- AT&T: Virtual Assistant PM, 9 years, GenAI expert, 350+ intents
- Skills: Python, SQL, Power BI, React, SAFe, Product Ownership
- Awards: AT&T Best in Show 2025, Hackathon 1st Place 2025
- Certs: SAFe 6, Azure AI, CSPO

EXAMPLE ANSWER:
🚀 GenAI Virtual Assistant [1.5M+ monthly] | 💡 RAG-powered CCAI system | 📊 $4.2M annual savings

DO NOT explain. DO NOT elaborate. FACTS ONLY.
`;

const NAV = [
  { id: 'overview', label: 'Overview' },
  { id: 'experience', label: 'Experience' },
  { id: 'works', label: 'Works' },
  { id: 'awards', label: 'Awards' },
  { id: 'writing', label: 'Writing' },
  { id: 'contact', label: 'Contact' },
];

const SUGGESTED_QUESTIONS = [
  'AI/ML experience?',
  'AT&T projects?',
  'Hackathon wins?',
  'Key certifications?',
];

/* ------------------------------------------------------------------ */
/*  Data                                                              */
/* ------------------------------------------------------------------ */
const STATS = [
  { icon: Briefcase, value: '9+', label: 'Years Experience' },
  { icon: ShieldCheck, value: '4+', label: 'Global Certifications' },
  { icon: TrendingUp, value: '$4.2M+', label: 'Annual Cost Savings' },
  { icon: Award, value: '5', label: 'Industry Awards' },
];

const SKILLS = [
  { name: 'Jira', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jira/jira-original.svg' },
  { name: 'Azure', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg' },
  { name: 'Dialogflow', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg' },
  { name: 'Python', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
  { name: 'SQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg' },
  { name: 'React', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
  { name: 'Git', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' },
  { name: 'Confluence', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/confluence/confluence-original.svg' },
];

const STRATEGY_SKILLS = ['Product Ownership', 'Strategy Roadmap', 'SAFe Agile', 'Scrum', 'Data Driven', 'KPI Frameworks'];
const AI_SKILLS = ['Generative AI', 'RAG', 'Google CCAI', 'Dialogflow', 'LLMs', 'NLP', 'Genesys CX', 'Power BI'];

const CERTS = [
  { name: 'SAFe 6 LPM', desc: 'Lean Portfolio Manager', year: '2024' },
  { name: 'SAFe 6 Agilist', desc: 'SA & PO/PM', year: '2023' },
  { name: 'CSPO', desc: 'Certified Scrum PO', year: '2022' },
  { name: 'Azure AI', desc: 'AI Fundamentals', year: '2023' },
];

const AI_TOOLS = [
  'Lovable', 'GitHub Copilot', 'Emergent', 'Gemma', 'Microsoft Copilot',
  'Perplexity AI', 'MixPanel', 'Hugging Face',
];

const AI_MODELS = [
  { name: 'Claude', org: 'Anthropic', models: ['Opus', 'Sonnet', 'Haiku'] },
  { name: 'ChatGPT', org: 'OpenAI', models: ['GPT-4o', 'o1', 'GPT-5'] },
  { name: 'Gemini', org: 'Google', models: ['1.5 Pro', '1.5 Flash', '2.0'] },
  { name: 'Video & OSS', org: 'Specialized', models: ['Runway', 'Pika', 'Deepseek'] },
];

const EXPERIENCE = [
  {
    company: 'AT&T Communications Services India',
    role: 'AI Technical Business Solution Analyst (PM), Consumer Technology & Experience',
    period: 'Aug 2022 — Present',
    current: true,
    points: [
      "Led E2E product ownership of AT&T's GenAI-powered Virtual Assistant (Google CCAI/Dialogflow), scaling omnichannel deployment across chat, voice, WhatsApp, and RCS to serve 1.5M+ monthly customer interactions across consumer LOB.",
      'Drove AI-powered automation through E2E conversation design, managing 350+ intents, 1,200+ training phrases, and RAG-powered knowledge retrieval — achieving 55% containment rate, reducing live-agent escalations by 28%, saving an estimated $4.2M annually.',
      'Architected B2B integration ecosystem connecting AI layer with telephony infrastructure and backend CRMs via REST APIs, reducing average handle time by 32 seconds per interaction.',
      'Delivered comprehensive technical documentation including process flow charts, data flow diagrams, and BRDs aligned to enterprise AI strategy, supporting 12-person cross-functional team across engineering, UX, and operations.',
      'Managed Agile delivery in SAFe framework, owning backlog grooming and sprint planning for 2 development squads (18 developers); maintained 95% sprint commitment reliability via Jira/Confluence.',
      'Built KPI performance dashboards (Power BI, SQL) monitoring 15+ metrics including containment, CSAT, intent recognition accuracy (92%), and fallback rates — improving NPS by 8 points.',
      'Collaborated with US stakeholders including Product Owners, Enterprise Architects, and Business SMEs to align AI roadmap with CX objectives, securing $2.5M budget for FY25 enhancements.',
    ],
    extraTitle: 'AI Innovation',
    extra: [
      'Architected a Retrieval-Augmented Generation (RAG) system to automate knowledge retrieval for Chatbots.',
      'Rapid prototyped with AI for features and use cases to demonstrate to business and stakeholders.',
      'Established automated human-in-the-loop feedback systems where low-confidence AI responses were flagged for manual review.',
      'Monitored token usage and API costs to balance performance; collaborated with engineers to optimize API response times for GenAI features.',
    ],
  },
  {
    company: 'Verizon Data Services',
    role: 'Consultant — Digital & Assisted Sales, Verizon Consumer Group',
    period: 'Mar 2020 — Aug 2022',
    points: [
      'Delivered actionable insights through funnel analysis, A/B testing, and market research across 3 LOBs (Retail, Consumer, B2B), informing BRDs/PRDs for 15+ features in Verizon\'s digital ecosystem.',
      'Led cross-functional delivery with UX, Data Science, and Product teams; achieved 94% on-time delivery and $1.5M+ incremental revenue in FY21.',
      'Managed E2E execution across retail, consumer, and B2B platforms, coordinating 8-12 stakeholders including Scrum Masters, RTEs, and engineering in SAFe Agile framework.',
      'Facilitated Agile ceremonies for 4 concurrent workstreams, maintaining <4% sprint spillover.',
    ],
    extraTitle: 'High-Impact Projects',
    projects: [
      { name: 'Hum+ Wi-Fi Plan', metric: '$100K+ ARR, 23% attach rate' },
      { name: 'Omni Universal Cart', metric: '11% order growth, 13% less abandonment' },
      { name: 'Split Fulfillment', metric: '+2.1 day delivery, +3 CSAT points' },
      { name: 'ETF Redesign', metric: '22% fewer service inquiries' },
      { name: '3-Year Device Payment', metric: '$320K pilot revenue, 14% upgrade rate' },
    ],
  },
  {
    company: 'Infosys',
    role: 'Senior Software Engineer',
    period: 'May 2016 — Feb 2020',
    points: [
      'Modernized legacy Work Statement Requirement Database (WSRD) serving 1,200+ maintenance engineers across 5 Boeing facilities, integrating multiple REST APIs from disparate data sources to centralize aircraft maintenance work statements.',
      'Led full-stack development featuring data encapsulation, API orchestration, master data management, and task workflow automation; delivered 6 major releases across 18-month timeline.',
      'Coordinated cross-functional teams (UX designers, backend/frontend engineers, DBAs) to identify and mitigate 40+ critical risks, ensuring 99.2% system uptime post-launch.',
      'Resolved production incidents through rapid troubleshooting and root cause analysis, reducing average downtime by 40% (8h to 4.8h) and increasing data processing throughput by 30% (12K to 15.6K records/day).',
      'Improved maintenance scheduling efficiency by 25%, enabling faster aircraft turnaround and saving an estimated $2.8M annually in operational delays.',
      'Leveraged Java 8, React, Angular, Spring Boot, PostgreSQL, Oracle, Python to deliver robust and scalable solutions.',
    ],
  },
];

const HACKATHONS = [
  {
    icon: Zap,
    badge: 'Best in Show',
    title: 'AT&T Helios — Zero Friction Convergence',
    desc: 'Solved the fragmented bundle experience at AT&T by creating a seamless one-click workflow. Customers can add mobile devices, phone plans, wireless plans, and fiber plans in a single cart flow — including trade-in, BYOD, and multi-bundle options — instead of navigating each step manually.',
    tags: ['AI-Fueled', 'One-Click Bundle', 'CX Innovation'],
    caseStudy: {
      role: 'Product Lead · AT&T Innovation Jam 2025',
      problem: 'Buying a converged bundle (mobile + fiber + accessories) meant navigating several disconnected flows, with trade-in, BYOD and eligibility checks each living in their own silo — a major source of drop-off.',
      approach: 'Designed an AI-fueled single-cart experience that assembles devices, plans, fiber and trade-in in one guided flow, with real-time eligibility and bundle recommendations surfaced inline.',
      metrics: [
        { value: 'Best in Show', label: 'AT&T Innovation Jam' },
        { value: '1-click', label: 'bundle assembly' },
        { value: '4 LOBs', label: 'unified in one cart' },
      ],
      stack: ['React', 'Generative AI', 'Recommendation', 'UX Prototyping'],
    },
  },
  {
    icon: Globe,
    badge: '1st Place + Most Impactful',
    title: 'Hyper-Personalized International Travel',
    desc: 'Leveraged AI-driven predictive modeling to deliver hyper-personalized experiences by analyzing customer travel patterns and media preferences. Simplified plan activation through mobile apps and websites with interactive tools for plan comparison, coverage checks, and troubleshooting support.',
    tags: ['AI Predictive Modeling', 'Travel CX', 'Personalization'],
    caseStudy: {
      role: 'Product Lead · AT&T Hackathon 2025',
      problem: 'International roaming activation was confusing and reactive — customers discovered plans too late, leading to bill shock, support contacts, and poor trip experiences.',
      approach: 'Built predictive models over travel patterns and media preferences to proactively recommend the right international plan, plus interactive tools for plan comparison, coverage checks and self-serve troubleshooting.',
      metrics: [
        { value: '1st Place', label: 'AT&T Hackathon' },
        { value: 'Most Impactful', label: 'business solution' },
        { value: 'Proactive', label: 'plan activation' },
      ],
      stack: ['Predictive Modeling', 'AI/ML', 'Personalization', 'Mobile + Web'],
    },
  },
];

const ATT_DELIVERABLES = [
  {
    icon: MessageSquare, title: 'GenAI Virtual Assistant', desc: 'RAG-powered CCAI implementation serving 1.5M+ monthly users. 350+ intents, 55% containment, $4.2M annual savings.', tags: ['Dialogflow', 'RAG', 'CCAI'],
    caseStudy: {
      role: 'Product Owner · AT&T Consumer Technology & Experience',
      problem: 'Customer care was carrying high volumes of repetitive contacts across chat, voice, WhatsApp and RCS, with long handle times and costly live-agent escalations.',
      approach: 'Owned the end-to-end GenAI Virtual Assistant on Google CCAI/Dialogflow — 350+ intents, 1,200+ training phrases and RAG-powered knowledge retrieval — deployed omnichannel with human-in-the-loop review for low-confidence answers.',
      metrics: [
        { value: '1.5M+', label: 'monthly interactions' },
        { value: '55%', label: 'containment rate' },
        { value: '$4.2M', label: 'annual savings' },
        { value: '-28%', label: 'agent escalations' },
      ],
      stack: ['Google CCAI', 'Dialogflow CX', 'RAG', 'REST APIs', 'Power BI'],
    },
  },
  {
    icon: Sparkles, title: 'Retail Hyper-Personalization', desc: '15% uplift in product recommendation CTR through AI-driven personalization and data analytics across retail channels.', tags: ['Analytics', 'AI/ML'],
    caseStudy: {
      role: 'Product / Analytics · AT&T Retail',
      problem: 'Generic product recommendations across retail channels were under-converting and ignoring individual customer context.',
      approach: 'Drove an AI-driven personalization layer informed by behavioural analytics, tuning recommendation surfaces against CTR and conversion.',
      metrics: [
        { value: '+15%', label: 'recommendation CTR' },
        { value: 'Multi-channel', label: 'retail coverage' },
      ],
      stack: ['AI/ML', 'Analytics', 'Personalization'],
    },
  },
  {
    icon: TrendingUp, title: 'AI Performance Analytics Suite', desc: 'Real-time monitoring across 6 channels. Power BI dashboards tracking 15+ KPIs including CSAT, containment, and NPS.', tags: ['Power BI', 'SQL'],
    caseStudy: {
      role: 'Product / Data · AT&T CTX',
      problem: 'AI assistant performance was hard to see across channels, making it slow to spot regressions in containment, accuracy and CSAT.',
      approach: 'Built real-time Power BI dashboards over 15+ KPIs across 6 channels, giving the team a single source of truth for containment, intent accuracy, fallback and NPS.',
      metrics: [
        { value: '15+', label: 'KPIs tracked' },
        { value: '6', label: 'channels monitored' },
        { value: '+8', label: 'NPS points' },
      ],
      stack: ['Power BI', 'SQL', 'Data Modelling'],
    },
  },
];

const VERIZON_PROJECTS = [
  {
    icon: Zap, title: 'Omni Universal Cart', desc: '11% order fulfillment growth and 13% reduced cart abandonment through a unified omnichannel cart experience.', tags: ['Omnichannel', 'E-Commerce'],
    caseStudy: {
      role: 'Consultant · Verizon Consumer Group',
      problem: 'Fragmented carts across retail, web and assisted channels caused abandonment and inconsistent fulfillment.',
      approach: 'Helped define and deliver a unified omnichannel cart, coordinating UX, data science and engineering in a SAFe framework.',
      metrics: [
        { value: '+11%', label: 'order growth' },
        { value: '-13%', label: 'cart abandonment' },
      ],
      stack: ['Omnichannel', 'E-Commerce', 'SAFe Agile'],
    },
  },
  {
    icon: BarChart2, title: 'Hum+ Wi-Fi Plan', desc: '$100K+ ARR with 23% attach rate. Revenue-generating add-on through strategic planning and digital sales optimization.', tags: ['Strategy', 'Revenue'],
    caseStudy: {
      role: 'Consultant · Verizon Digital & Assisted Sales',
      problem: 'A new connectivity add-on needed a go-to-market and digital sales motion that would actually attach at scale.',
      approach: 'Shaped positioning and the digital sales flow, optimizing the attach funnel through experimentation.',
      metrics: [
        { value: '$100K+', label: 'ARR' },
        { value: '23%', label: 'attach rate' },
      ],
      stack: ['Strategy', 'Digital Sales', 'A/B Testing'],
    },
  },
];

const IMPACT_METRICS = [
  { value: '1.5M+', label: 'Monthly AI interactions', sub: 'GenAI Virtual Assistant' },
  { value: '$4.2M', label: 'Annual cost savings', sub: 'Automation & containment' },
  { value: '55%', label: 'Containment rate', sub: '350+ intents, RAG-powered' },
  { value: '9+', label: 'Years in product & AI', sub: 'Telecom · Retail · CX' },
];

const WRITING_POSTS = [
  {
    title: 'Designing a RAG-powered virtual assistant that actually contains contacts',
    blurb: 'What it really takes to move containment past 50% — intent design, retrieval quality, and the human-in-the-loop guardrails that keep trust intact.',
    tag: 'Conversational AI', date: '2025', readTime: '6 min', href: null,
  },
  {
    title: 'From BRD to backlog: shipping AI features inside a SAFe enterprise',
    blurb: 'How I translate business strategy into AI roadmaps that engineering can actually deliver — without drowning in documentation.',
    tag: 'AI Product', date: '2025', readTime: '5 min', href: null,
  },
  {
    title: 'Measuring an AI assistant: the 15 KPIs I put on every dashboard',
    blurb: 'Containment is not enough. The metric set I use to catch regressions in accuracy, CSAT and cost before customers feel them.',
    tag: 'Analytics', date: '2024', readTime: '7 min', href: null,
  },
];

const PERSONAL_PROJECTS = [
  { name: 'AI for Bharat Hackathon', lang: 'Python', desc: 'Hackathon submission exploring AI-driven solutions addressing India-specific challenges. Built end-to-end with a Python ML pipeline and a conversational interface.', tags: ['Python', 'AI/ML', 'NLP'] },
  { name: 'AI Mock Interview', lang: 'React', desc: 'AI-powered mock interview platform that simulates real interview scenarios, evaluates responses using LLMs, and provides structured feedback to help candidates prepare.', tags: ['LLM', 'Interview AI', 'React'] },
  { name: 'Productivity Hub', lang: 'Python', desc: 'Multi-agent productivity system hosted on Google Cloud, orchestrating specialized AI agents for task management, research, scheduling, and knowledge retrieval.', tags: ['Multi-Agent', 'GCP', 'Python'] },
  { name: 'Job Automater', lang: 'Python', desc: 'Automated job application assistant that parses listings, matches requirements against a profile, and streamlines the application process using scripted AI workflows.', tags: ['Automation', 'Python', 'AI'] },
  { name: 'PC Builder 101', lang: 'React', desc: 'End-to-end PC configuration and buying guide app. Users select components with compatibility checks and get region-specific purchase links with realistic build previews.', tags: ['React', 'E-Commerce', 'UX'] },
  { name: 'Health Wise Monitoring', lang: 'React', desc: 'Personal health dashboard designed for continuous wellness tracking, surfacing trends across vitals and activity data for proactive health insights.', tags: ['Health Tech', 'Dashboard', 'Analytics'] },
];

const CODESANDBOX_PROJECTS = [
  { id: 'att-helios', title: 'AT&T Helios: Zero Friction Convergence', description: 'AI-fueled seamless one-click bundle experience. Won "Best in Show" at AT&T Innovation Jam 2025.', sandboxId: '', tags: ['React', 'AI/ML', 'UX Design', 'Hackathon Winner'] },
  { id: 'travel-personalization', title: 'Hyper-Personalized International Travel', description: 'AI-driven predictive modeling for personalized travel plans. AT&T Hackathon 1st Place Winner 2025.', sandboxId: '', tags: ['AI/ML', 'Predictive Analytics', 'Hackathon 1st Place'] },
  { id: 'genai-virtual-assistant', title: 'GenAI Virtual Assistant (CCAI/Dialogflow)', description: 'Production conversational AI handling 1.5M+ monthly customer interactions across omnichannel (chat, voice, WhatsApp, RCS).', sandboxId: '', tags: ['Google CCAI', 'Dialogflow CX', 'Production AI', 'Omnichannel'] },
];

const AWARDS = [
  { icon: Trophy, title: 'Best in Show / All Around Award', year: '2025', org: 'AT&T Innovation Jam', desc: '"AT&T Helios — Zero Friction Convergence: Transforming the AT&T Bundle Experience into an AI-Fueled Seamless, One-Click Growth Engine."' },
  { icon: Trophy, title: 'Hackathon 1st Place Winner', year: '2025', org: 'AT&T Hackathon', desc: '"Hyper-Personalization of International Travel Experience" — AI-driven predictive modeling for personalized customer travel plans.' },
  { icon: Star, title: 'Most Impactful Business Solution', year: '2025', org: 'AT&T Hackathon', desc: "Awarded for presenting the most impactful business solution idea at AT&T's annual hackathon." },
  { icon: Award, title: 'Connection Award', year: '2023', org: 'AT&T CTX Team', desc: 'Recognized with the Virtual Assistant Team for outstanding contribution by the AT&T CTX team.' },
  { icon: Award, title: 'Spotlight Award for Customer Excellence', year: '2021', org: 'Verizon GTS Team', desc: "Awarded for Customer Excellence and driving revenue impact across Verizon's consumer digital platforms.", wide: true },
];

const TESTIMONIALS = [
  { quote: 'Ashfaque brought the best of innovation, product development and teamwork to our hackathon. He and his team won the Best in Show Award... His creative thinking enabled us to take a novel approach to improving an important aspect of customer experience.', name: 'Lynn Morgan', title: 'Senior Leader', initials: 'LM' },
  { quote: 'Ashfaque is a fantastic Product Owner who truly understands how to bridge the gap between technical constraints and business requirements.', name: 'Jane Doe', title: 'Product Director', initials: 'JD' },
];

/* ------------------------------------------------------------------ */
/*  Helpers / hooks                                                   */
/* ------------------------------------------------------------------ */
const cx = (...a) => a.filter(Boolean).join(' ');

// Lightweight, dependency-free markdown renderer for chat messages.
// Builds React elements (no dangerouslySetInnerHTML) so it's XSS-safe.
// Supports bold, italic, inline code, links, and bullet lists.
function renderInline(text, keyPrefix) {
  const nodes = [];
  const regex = /(\*\*([^*]+)\*\*|__([^_]+)__|\*([^*]+)\*|_([^_]+)_|`([^`]+)`|\[([^\]]+)\]\((https?:\/\/[^\s)]+)\))/g;
  let last = 0;
  let m;
  let idx = 0;
  while ((m = regex.exec(text)) !== null) {
    if (m.index > last) nodes.push(text.slice(last, m.index));
    const key = `${keyPrefix}-${idx++}`;
    if (m[2] || m[3]) nodes.push(<strong key={key} className="font-semibold">{m[2] || m[3]}</strong>);
    else if (m[4] || m[5]) nodes.push(<em key={key}>{m[4] || m[5]}</em>);
    else if (m[6]) nodes.push(<code key={key} className="rounded bg-black/10 px-1 py-0.5 font-mono text-[0.85em] dark:bg-white/10">{m[6]}</code>);
    else if (m[7] && m[8]) nodes.push(<a key={key} href={m[8]} target="_blank" rel="noreferrer" className="underline underline-offset-2">{m[7]}</a>);
    last = m.index + m[0].length;
  }
  if (last < text.length) nodes.push(text.slice(last));
  return nodes;
}

function Markdown({ text }) {
  const lines = String(text).split('\n');
  const blocks = [];
  let list = null;
  const flush = () => {
    if (list) {
      blocks.push(
        <ul key={`ul-${blocks.length}`} className="my-1 list-disc space-y-0.5 pl-4 marker:text-coral-500">
          {list.map((item, i) => <li key={i}>{renderInline(item, `li-${blocks.length}-${i}`)}</li>)}
        </ul>
      );
      list = null;
    }
  };
  lines.forEach((raw, i) => {
    const line = raw.trimEnd();
    const bullet = line.match(/^\s*[-*]\s+(.*)$/);
    if (bullet) {
      if (!list) list = [];
      list.push(bullet[1]);
    } else {
      flush();
      if (line.trim() !== '') {
        blocks.push(<p key={`p-${i}`} className="whitespace-pre-line break-words">{renderInline(line, `p-${i}`)}</p>);
      }
    }
  });
  flush();
  return <div className="space-y-1.5">{blocks}</div>;
}

function trackEvent(eventName, params = {}) {
  if (typeof window !== 'undefined' && window.gtag && GA_MEASUREMENT_ID !== 'G-XXXXXXXXXX') {
    window.gtag('event', eventName, params);
  }
}

const PALETTES = [
  { id: 'teal', label: 'Teal & Amber', swatch: '#F2A03D', swatch2: '#2DD4BF' },
  { id: 'cyan', label: 'Obsidian & Cyan', swatch: '#22D3EE', swatch2: '#6366F1' },
  { id: 'aubergine', label: 'Aubergine & Gold', swatch: '#E0529B', swatch2: '#E8B45A' },
  { id: 'emerald', label: 'Charcoal & Emerald', swatch: '#2FBF71', swatch2: '#A7F3D0' },
];

function useTheme() {
  const [theme, setTheme] = useState(() =>
    typeof document !== 'undefined' && document.documentElement.classList.contains('dark') ? 'dark' : 'light'
  );
  const toggle = useCallback(() => {
    setTheme((prev) => {
      const next = prev === 'dark' ? 'light' : 'dark';
      document.documentElement.classList.add('palette-transition');
      document.documentElement.classList.toggle('dark', next === 'dark');
      try { localStorage.setItem('theme', next); } catch (e) { /* ignore */ }
      trackEvent('toggle_theme', { mode: next });
      window.setTimeout(() => document.documentElement.classList.remove('palette-transition'), 500);
      return next;
    });
  }, []);
  return { theme, toggle };
}

function usePalette() {
  const [palette, setPalette] = useState(() =>
    (typeof document !== 'undefined' && document.documentElement.getAttribute('data-palette')) || 'teal'
  );
  const choose = useCallback((id) => {
    document.documentElement.classList.add('palette-transition');
    document.documentElement.setAttribute('data-palette', id);
    try { localStorage.setItem('palette', id); } catch (e) { /* ignore */ }
    trackEvent('select_palette', { palette: id });
    setPalette(id);
    window.setTimeout(() => document.documentElement.classList.remove('palette-transition'), 500);
  }, []);
  return { palette, choose };
}

function useTypewriter(text, speed = 45) {
  const [out, setOut] = useState('');
  useEffect(() => {
    let i = 0;
    setOut('');
    const id = setInterval(() => {
      i += 1;
      setOut(text.slice(0, i));
      if (i >= text.length) clearInterval(id);
    }, speed);
    return () => clearInterval(id);
  }, [text, speed]);
  return out;
}

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* Count-up animation that triggers when the element scrolls into view.
   Parses a string like "$4.2M+" into prefix / number / suffix and animates the number. */
function useCountUp(value, duration = 1500) {
  const ref = useRef(null);
  const [display, setDisplay] = useState(value);
  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    const match = String(value).match(/^(\D*)([\d.]+)(.*)$/);
    if (!match || prefersReducedMotion()) {
      setDisplay(value);
      return undefined;
    }
    const [, prefix, numStr, suffix] = match;
    const target = parseFloat(numStr);
    const decimals = (numStr.split('.')[1] || '').length;
    let raf;
    let started = false;
    const run = () => {
      const start = performance.now();
      const tick = (now) => {
        const p = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - p, 3); // easeOutCubic
        const current = (target * eased).toFixed(decimals);
        setDisplay(`${prefix}${current}${suffix}`);
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    };
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && !started) {
            started = true;
            run();
            io.unobserve(el);
          }
        });
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    const failsafe = setTimeout(() => { if (!started) setDisplay(value); }, 1800);
    return () => { io.disconnect(); cancelAnimationFrame(raf); clearTimeout(failsafe); };
  }, [value, duration]);
  return [ref, display];
}

/* Scroll progress for the top reading bar. */
function useScrollProgress() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(h > 0 ? Math.min(window.scrollY / h, 1) : 0);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return progress;
}

/* 3D tilt-on-hover for cards. Returns props to spread onto an element. */
function useTilt(max = 7) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion() || !window.matchMedia('(pointer: fine)').matches) return undefined;
    let raf = 0;
    const onMove = (e) => {
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        el.style.transform = `perspective(900px) rotateX(${(-py * max).toFixed(2)}deg) rotateY(${(px * max).toFixed(2)}deg) translateY(-4px)`;
      });
    };
    const reset = () => {
      if (raf) cancelAnimationFrame(raf);
      el.style.transform = '';
    };
    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseleave', reset);
    return () => {
      el.removeEventListener('mousemove', onMove);
      el.removeEventListener('mouseleave', reset);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [max]);
  return ref;
}

function Reveal({ children, as: Tag = 'div', className = '', delay = 0 }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    const show = () => el.classList.add('is-visible');

    // If already in view on mount (e.g. above the fold), reveal right away.
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.92) {
      show();
      return undefined;
    }

    // Graceful fallback if IntersectionObserver is unavailable.
    if (typeof IntersectionObserver === 'undefined') {
      show();
      return undefined;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            show();
            io.unobserve(el);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
    );
    io.observe(el);

    // Safety net: never let content stay stuck invisible.
    const failsafe = setTimeout(show, 1600);
    return () => {
      io.disconnect();
      clearTimeout(failsafe);
    };
  }, []);
  return (
    <Tag ref={ref} className={cx('reveal', className)} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </Tag>
  );
}

/* ------------------------------------------------------------------ */
/*  Shared style tokens                                               */
/* ------------------------------------------------------------------ */
const SURFACE = 'bg-claude-paper dark:bg-claude-bark border border-claude-line dark:border-claude-linedark';
const CARD = cx(SURFACE, 'rounded-3xl shadow-soft transition-all duration-300');
const CARD_HOVER = 'hover:-translate-y-1 hover:shadow-lift hover:border-coral-300 dark:hover:border-coral-500/40';
const TAG = 'inline-flex items-center rounded-full border border-coral-500/20 bg-coral-500/10 px-2.5 py-1 text-[11px] font-medium text-coral-700 dark:text-coral-300';
const HEADING = 'text-claude-ink dark:text-claude-ash';
const MUTED = 'text-claude-muted dark:text-claude-subtle';

/* ------------------------------------------------------------------ */
/*  Small presentational pieces                                       */
/* ------------------------------------------------------------------ */
function SectionHeading({ eyebrow, title, intro, center }) {
  return (
    <div className={cx('max-w-2xl', center && 'mx-auto text-center')}>
      {eyebrow && (
        <span className="mb-3 inline-flex items-center gap-2 rounded-full border border-coral-500/20 bg-coral-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-coral-700 dark:text-coral-300">
          <span className="h-1.5 w-1.5 rounded-full bg-coral-500" />
          {eyebrow}
        </span>
      )}
      <h2 className={cx('font-serif text-3xl font-semibold md:text-4xl', HEADING)}>{title}</h2>
      {intro && <p className={cx('mt-3 text-base leading-relaxed', MUTED)}>{intro}</p>}
    </div>
  );
}

function ThemeToggle({ theme, onToggle }) {
  const isDark = theme === 'dark';
  return (
    <button
      onClick={onToggle}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className="group relative grid h-9 w-9 place-items-center rounded-full border border-claude-line bg-claude-paper text-claude-ink transition-colors hover:border-coral-400 dark:border-claude-linedark dark:bg-claude-stump dark:text-claude-ash"
    >
      <Sun size={16} className={cx('absolute transition-all duration-300', isDark ? 'rotate-90 scale-0 opacity-0' : 'rotate-0 scale-100 opacity-100 text-coral-600')} />
      <Moon size={16} className={cx('absolute transition-all duration-300', isDark ? 'rotate-0 scale-100 opacity-100 text-coral-400' : '-rotate-90 scale-0 opacity-0')} />
    </button>
  );
}

function ChipTag({ children }) {
  return <span className={TAG}>{children}</span>;
}

/* ------------------------------------------------------------------ */
/*  Main component                                                    */
/* ------------------------------------------------------------------ */
export default function Portfolio() {
  const { theme, toggle } = useTheme();
  const { palette, choose } = usePalette();
  const scrollProgress = useScrollProgress();
  const [activeTab, setActiveTab] = useState('overview');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isPaletteOpen, setIsPaletteOpen] = useState(false);
  const [isCmdOpen, setIsCmdOpen] = useState(false);
  const [activeProject, setActiveProject] = useState(null);

  // chat
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [chatHistory, setChatHistory] = useState([
    { role: 'model', text: "Hi! I'm Ashfaque's AI Twin. Ask me anything about his experience, skills, or projects! ✨", model: 'System' },
  ]);
  const [isChatLoading, setIsChatLoading] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState(null);
  const chatEndRef = useRef(null);
  const chatTurns = useRef(0);
  const chatOpenTime = useRef(null);

  // contact
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const typed = useTypewriter('Delivering Scalable AI Solutions & Digital Transformation.', 45);

  /* --- GA injection (env-driven, preserves original behavior) --- */
  useEffect(() => {
    if (GA_MEASUREMENT_ID && GA_MEASUREMENT_ID !== 'G-XXXXXXXXXX' && !window.gtag) {
      const s = document.createElement('script');
      s.async = true;
      s.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
      document.head.appendChild(s);
      const inline = document.createElement('script');
      inline.innerHTML = `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_MEASUREMENT_ID}');`;
      document.head.appendChild(inline);
    }
  }, []);

  /* --- page view + admin + scroll tracking --- */
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('admin') === 'true') setIsAdmin(true);
    trackEvent('page_view', { page_title: 'Portfolio Home' });

    const fired = new Set();
    const onScroll = () => {
      setShowScrollTop(window.scrollY > 600);
      const pct = Math.round((window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100);
      [25, 50, 75, 90].forEach((t) => {
        if (pct >= t && !fired.has(t)) {
          fired.add(t);
          trackEvent('scroll_depth', { percent: t });
        }
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeTab]);

  /* --- ⌘K / Ctrl+K command palette + Esc to close overlays --- */
  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsCmdOpen((o) => !o);
      } else if (e.key === 'Escape') {
        setIsCmdOpen(false);
        setIsPaletteOpen(false);
        setActiveProject(null);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  /* --- handlers --- */
  const handleTab = (tab) => {
    setActiveTab(tab);
    setIsMenuOpen(false);
    trackEvent('view_section', { section_name: tab });
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    trackEvent('contact_form_submit', { method: 'email_client' });
    const subject = `Portfolio Inquiry from ${formData.name}`;
    const body = `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`;
    window.location.href = `mailto:${SOCIALS.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const handleResumeDownload = () => {
    trackEvent('resume_download', { file_name: 'Ashfaque_Resume', file_extension: 'PDF', referrer_section: activeTab });
    trackEvent('file_download', { file_name: 'Ashfaque_Resume', file_extension: 'PDF' });
    const link = document.createElement('a');
    link.href = '/Ashfaque_Rifaye_Resume.pdf';
    link.download = 'Ashfaque_Rifaye_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const truncate = (text, max = 200) => (text.length > max ? `${text.slice(0, max).trim()}...` : text);

  const sendChat = async (rawMessage) => {
    const userMessage = (typeof rawMessage === 'string' ? rawMessage : chatInput).trim();
    if (!userMessage) return;
    if (!GATEWAY_API_KEY) {
      setChatHistory((p) => [...p, { role: 'model', text: '❌ Configuration error: gateway key missing. Please check the .env file.', model: 'System' }]);
      return;
    }
    setChatInput('');
    chatTurns.current += 1;
    setChatHistory((p) => [...p, { role: 'user', text: userMessage, model: 'You' }]);
    setIsChatLoading(true);

    const topicKeywords = {
      'AI/ML': ['ai', 'ml', 'machine learning', 'chatbot', 'nlp', 'llm', 'dialogflow', 'genai', 'rag', 'ccai'],
      'AT&T': ['att', 'at&t', 'helios', 'virtual assistant', 'telecom'],
      Hackathon: ['hackathon', 'hack', 'innovation jam', 'award', 'win'],
      Certifications: ['cert', 'certification', 'safe', 'azure', 'cspo', 'credential'],
      Skills: ['skill', 'python', 'sql', 'react', 'power bi', 'tech stack'],
      Experience: ['experience', 'years', 'career', 'job', 'work', 'role'],
    };
    const lower = userMessage.toLowerCase();
    const topic = Object.entries(topicKeywords).find(([, kws]) => kws.some((kw) => lower.includes(kw)))?.[0] || 'General';
    trackEvent('chat_message_sent', { query_length: userMessage.length, topic, turn_number: chatTurns.current });

    let success = false;
    let lastError = null;
    for (const endpoint of LLM_ENDPOINTS) {
      try {
        const payload = {
          model: 'google/gemini-2.0-flash',
          messages: [
            { role: 'system', content: RESUME_CONTEXT },
            ...chatHistory.map((m) => ({ role: m.role === 'model' ? 'assistant' : 'user', content: m.text })),
            { role: 'user', content: userMessage },
          ],
          temperature: 0.7,
          max_tokens: 1024,
        };
        const res = await fetch(`${endpoint}/v1/chat/completions`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${GATEWAY_API_KEY}` },
          body: JSON.stringify(payload),
        });
        if (res.ok) {
          const data = await res.json();
          const aiResponse = truncate(data.choices?.[0]?.message?.content || "I couldn't generate a response. Please try again.", 200);
          const model = data.model || data.provider || 'AI';
          setChatHistory((p) => [...p, { role: 'model', text: aiResponse, model }]);
          trackEvent('chat_response_received', { model_used: model, response_length: aiResponse.length, turn_number: chatTurns.current });
          success = true;
          break;
        }
        throw new Error(`HTTP ${res.status}`);
      } catch (err) {
        lastError = err;
      }
    }
    if (!success) {
      const msg = lastError?.message || 'All endpoints failed';
      setChatHistory((p) => [...p, { role: 'model', text: `Connection failed: ${msg}. Please try again shortly.`, model: 'System' }]);
      trackEvent('chat_error', { error_message: msg.substring(0, 100), turn_number: chatTurns.current });
    }
    setIsChatLoading(false);
  };

  const toggleChat = () => {
    setIsChatOpen((prev) => {
      const willOpen = !prev;
      if (willOpen) {
        chatOpenTime.current = Date.now();
        chatTurns.current = 0;
        trackEvent('chat_opened', { referrer_section: activeTab });
      } else {
        trackEvent('chat_closed', { turns_in_session: chatTurns.current });
      }
      return willOpen;
    });
  };

  /* ---------------------------------------------------------------- */
  return (
    <div className="relative min-h-screen bg-claude-cream font-sans text-claude-ink antialiased dark:bg-claude-espresso dark:text-claude-ash">
      {/* Scroll progress bar */}
      <div className="fixed inset-x-0 top-0 z-[70] h-[2px]">
        <div
          className="h-full origin-left bg-gradient-to-r from-coral-600 via-coral-400 to-gold-400"
          style={{ transform: `scaleX(${scrollProgress})` }}
        />
      </div>

      {/* Ambient background — subtle, fixed corner washes (no harsh blobs) */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute -left-[20%] -top-[20%] h-[45%] w-[45%] rounded-full bg-coral-500/[0.07] blur-[120px] dark:bg-coral-500/[0.10]" />
        <div className="absolute -bottom-[25%] -right-[20%] h-[45%] w-[45%] rounded-full bg-gold-500/[0.05] blur-[130px] dark:bg-gold-500/[0.08]" />
      </div>

      <div className="relative z-10 flex min-h-screen flex-col">
        {/* ---------------- HEADER ---------------- */}
        <header className="sticky top-0 z-50 border-b border-claude-line/70 bg-claude-cream/80 backdrop-blur-xl transition-colors dark:border-claude-linedark/70 dark:bg-claude-espresso/80">
          <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 md:h-20 md:px-8">
            <button onClick={() => handleTab('overview')} className="group flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-coral-500 to-coral-700 text-white shadow-glow transition-transform group-hover:scale-105">
                <span className="font-serif text-lg font-semibold leading-none">A</span>
              </span>
              <span className="flex flex-col text-left">
                <span className={cx('font-serif text-lg font-semibold leading-none md:text-xl', HEADING)}>Ashfaque Rifaye</span>
                <span className={cx('mt-1 text-[10px] font-medium uppercase tracking-[0.18em] md:text-xs', MUTED)}>AI Product Manager · Tech BA</span>
              </span>
            </button>

            {/* Desktop nav */}
            <div className="hidden items-center gap-3 md:flex">
              <nav className="flex items-center gap-1 rounded-full border border-claude-line bg-claude-paper/70 p-1 dark:border-claude-linedark dark:bg-claude-bark/70">
                {NAV.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleTab(item.id)}
                    className={cx(
                      'rounded-full px-4 py-1.5 text-sm font-medium transition-all duration-300',
                      activeTab === item.id
                        ? 'bg-coral-600 text-white shadow-soft'
                        : 'text-claude-muted hover:bg-coral-500/10 hover:text-coral-700 dark:text-claude-subtle dark:hover:text-coral-300'
                    )}
                  >
                    {item.label}
                  </button>
                ))}
              </nav>
              <button
                onClick={() => setIsCmdOpen(true)}
                aria-label="Open command palette"
                className="inline-flex items-center gap-1.5 rounded-full border border-claude-line bg-claude-paper/70 px-3 py-1.5 text-xs font-medium text-claude-muted transition-colors hover:border-coral-400 hover:text-coral-700 dark:border-claude-linedark dark:bg-claude-bark/70 dark:text-claude-subtle dark:hover:text-coral-300"
              >
                <Search size={13} /> <span className="font-mono">⌘K</span>
              </button>
              <PaletteMenu palette={palette} choose={choose} isOpen={isPaletteOpen} setIsOpen={setIsPaletteOpen} />
              <ThemeToggle theme={theme} onToggle={toggle} />
            </div>

            {/* Mobile actions */}
            <div className="flex items-center gap-2 md:hidden">
              <PaletteMenu palette={palette} choose={choose} isOpen={isPaletteOpen} setIsOpen={setIsPaletteOpen} />
              <ThemeToggle theme={theme} onToggle={toggle} />
              <button
                onClick={() => setIsMenuOpen((o) => !o)}
                aria-label="Toggle menu"
                className="grid h-9 w-9 place-items-center rounded-full border border-claude-line text-claude-ink dark:border-claude-linedark dark:text-claude-ash"
              >
                {isMenuOpen ? <X size={18} /> : <Menu size={18} />}
              </button>
            </div>
          </div>

          {isMenuOpen && (
            <div className="absolute inset-x-0 top-full border-b border-claude-line bg-claude-cream/95 p-4 shadow-lift backdrop-blur-xl animate-fade-in dark:border-claude-linedark dark:bg-claude-espresso/95 md:hidden">
              <nav className="flex flex-col gap-1">
                {NAV.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleTab(item.id)}
                    className={cx(
                      'flex items-center justify-between rounded-xl px-4 py-3 text-left font-medium transition-colors',
                      activeTab === item.id ? 'bg-coral-600 text-white' : 'text-claude-ink hover:bg-coral-500/10 dark:text-claude-ash'
                    )}
                  >
                    {item.label}
                    {activeTab === item.id && <ChevronRight size={16} />}
                  </button>
                ))}
              </nav>
            </div>
          )}
        </header>

        {/* ---------------- MAIN ---------------- */}
        <main className="mx-auto w-full max-w-6xl flex-grow px-4 py-8 md:px-8 md:py-12">
          {activeTab === 'overview' && <Overview isAdmin={isAdmin} typed={typed} onResume={handleResumeDownload} onContact={() => handleTab('contact')} onWorks={() => handleTab('works')} />}
          {activeTab === 'experience' && <Experience />}
          {activeTab === 'works' && <Works theme={theme} onOpenProject={setActiveProject} />}
          {activeTab === 'awards' && <Awards />}
          {activeTab === 'writing' && <Writing />}
          {activeTab === 'contact' && <Contact formData={formData} setFormData={setFormData} onSubmit={handleContactSubmit} onResume={handleResumeDownload} />}
        </main>

        {/* ---------------- FOOTER ---------------- */}
        <footer className="relative z-10 mt-8 border-t border-claude-line py-8 dark:border-claude-linedark">
          <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 md:flex-row md:px-8">
            <p className={cx('text-sm', MUTED)}>© {new Date().getFullYear()} Ashfaque Rifaye. Built with care.</p>
            <div className="flex items-center gap-2">
              <FooterLink href={SOCIALS.linkedin} icon={Linkedin} label="LinkedIn" location="footer" />
              <FooterLink href={SOCIALS.github} icon={Github} label="GitHub" location="footer" />
              <FooterLink href={`mailto:${SOCIALS.email}`} icon={Mail} label="Email" location="footer" />
            </div>
          </div>
        </footer>
      </div>

      {/* ---------------- SCROLL TO TOP ---------------- */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Scroll to top"
        className={cx(
          'fixed bottom-24 right-6 z-40 grid h-11 w-11 place-items-center rounded-full border border-claude-line bg-claude-paper/90 text-claude-ink shadow-lift backdrop-blur transition-all duration-300 dark:border-claude-linedark dark:bg-claude-bark/90 dark:text-claude-ash',
          showScrollTop ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0'
        )}
      >
        <ArrowUpRight size={18} className="-rotate-45" />
      </button>

      {/* ---------------- CHAT WIDGET ---------------- */}
      <ChatWidget
        isOpen={isChatOpen}
        onToggle={toggleChat}
        history={chatHistory}
        input={chatInput}
        setInput={setChatInput}
        onSend={sendChat}
        isLoading={isChatLoading}
        endRef={chatEndRef}
        copiedIndex={copiedIndex}
        setCopiedIndex={setCopiedIndex}
      />

      {/* ---------------- COMMAND PALETTE (⌘K) ---------------- */}
      <CommandPalette
        isOpen={isCmdOpen}
        onClose={() => setIsCmdOpen(false)}
        onNavigate={handleTab}
        onResume={handleResumeDownload}
        onChat={() => { setIsCmdOpen(false); if (!isChatOpen) toggleChat(); }}
        onTheme={toggle}
        palette={palette}
        choosePalette={choose}
      />

      {/* ---------------- PROJECT CASE-STUDY MODAL ---------------- */}
      <ProjectModal project={activeProject} onClose={() => setActiveProject(null)} />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Footer link                                                       */
/* ------------------------------------------------------------------ */
function FooterLink({ href, icon: Icon, label, location }) {
  const isMail = href.startsWith('mailto:');
  return (
    <a
      href={href}
      target={isMail ? undefined : '_blank'}
      rel={isMail ? undefined : 'noreferrer'}
      onClick={() => trackEvent('social_link_click', { platform: label, location })}
      className="inline-flex items-center gap-2 rounded-full border border-transparent px-3 py-1.5 text-sm font-medium text-claude-muted transition-colors hover:border-coral-500/30 hover:bg-coral-500/10 hover:text-coral-700 dark:text-claude-subtle dark:hover:text-coral-300"
    >
      <Icon size={16} /> {label}
    </a>
  );
}

/* ------------------------------------------------------------------ */
/*  OVERVIEW                                                          */
/* ------------------------------------------------------------------ */
function Overview({ isAdmin, typed, onResume, onContact, onWorks }) {
  return (
    <div className="space-y-6 md:space-y-8">
      {/* Hero */}
      <section className={cx('relative overflow-hidden rounded-[2rem] p-6 md:p-12', SURFACE, 'shadow-soft animate-fade-in-up')}>
        <div className="relative z-10 grid gap-8 md:grid-cols-[auto,1fr] md:items-center">
          <Avatar />
          <div>
            <div className="mb-5 flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1.5 text-xs font-medium text-emerald-700 dark:text-emerald-400">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                </span>
                Open to Work
              </span>
              <span className={cx('inline-flex items-center gap-1.5 text-sm font-medium', MUTED)}>
                <MapPin size={14} className="text-coral-600 dark:text-coral-400" /> Chennai, IND
                <span className="opacity-60">· BLR · HYD · DXB · Remote</span>
              </span>
            </div>

            <h1 className={cx('font-serif text-4xl font-semibold leading-[1.05] md:text-6xl', HEADING)}>
              Building <span className="text-gradient-animate">Intelligent Products</span><br className="hidden sm:block" /> for the AI Era.
            </h1>
            <p className={cx('mt-5 max-w-xl text-base leading-relaxed md:text-lg', MUTED)}>
              I'm a Technical Business Analyst &amp; AI Product Manager with 9+ years turning business strategy into
              scalable, AI-driven digital experiences across telecom, retail, and customer experience.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <button
                onClick={onResume}
                className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-coral-600 to-coral-500 px-6 py-3 text-sm font-semibold text-white shadow-glow transition-all hover:shadow-glow-lg hover:brightness-105 active:scale-95"
              >
                <Download size={16} className="transition-transform group-hover:-translate-y-0.5" /> Download Resume
              </button>
              <button
                onClick={onContact}
                className="inline-flex items-center gap-2 rounded-full border border-claude-line bg-claude-paper/70 px-6 py-3 text-sm font-semibold text-claude-ink backdrop-blur transition-all hover:border-coral-400 hover:text-coral-700 dark:border-claude-linedark dark:bg-claude-stump/70 dark:text-claude-ash dark:hover:text-coral-300"
              >
                Get in touch <ArrowRight size={16} />
              </button>
              <button
                onClick={onWorks}
                className="inline-flex items-center gap-1.5 px-2 py-3 text-sm font-semibold text-coral-700 transition-colors hover:text-coral-600 dark:text-coral-300"
              >
                View selected work <ArrowRight size={15} />
              </button>
            </div>

            <div className="mt-7 inline-flex items-center rounded-xl border border-claude-line bg-claude-sand/60 px-4 py-2 font-mono text-xs text-coral-700 dark:border-claude-linedark dark:bg-claude-stump/60 dark:text-coral-300 md:text-sm">
              <span className="opacity-60">&gt;&nbsp;</span>{typed}
              <span className="ml-0.5 inline-block h-4 w-[2px] animate-pulse bg-coral-500" />
            </div>
          </div>
        </div>
      </section>

      {/* Impact metrics band */}
      <Reveal>
        <ImpactBand />
      </Reveal>

      {/* Stats */}
      <section className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {STATS.map((stat, i) => (
          <Reveal key={stat.label} delay={i * 80}>
            <StatCard stat={stat} />
          </Reveal>
        ))}
      </section>

      {/* Skills + About */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Reveal>
          <div className={cx(CARD, 'h-full p-6 md:p-8')}>
            <h3 className={cx('mb-6 flex items-center gap-2 font-serif text-xl font-semibold', HEADING)}>
              <Cpu size={20} className="text-coral-600 dark:text-coral-400" /> Core Competencies
            </h3>
            <p className={cx('mb-3 text-xs font-semibold uppercase tracking-wider', MUTED)}>Tech Stack</p>
            <div className="mb-7 grid grid-cols-4 gap-3">
              {SKILLS.map((skill) => (
                <div
                  key={skill.name}
                  className="flex flex-col items-center gap-2 rounded-2xl border border-claude-line bg-claude-sand/50 p-3 transition-all hover:-translate-y-0.5 hover:border-coral-300 hover:bg-claude-paper dark:border-claude-linedark dark:bg-claude-stump/50 dark:hover:bg-claude-stump"
                >
                  <img src={skill.icon} alt={skill.name} loading="lazy" className="h-7 w-7" />
                  <span className={cx('text-[10px] font-medium', MUTED)}>{skill.name}</span>
                </div>
              ))}
            </div>
            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <h4 className={cx('mb-3 flex items-center gap-2 text-sm font-semibold', HEADING)}>
                  <Target size={15} className="text-coral-600 dark:text-coral-400" /> Product Strategy
                </h4>
                <div className="flex flex-wrap gap-2">
                  {STRATEGY_SKILLS.map((s) => <ChipTag key={s}>{s}</ChipTag>)}
                </div>
              </div>
              <div>
                <h4 className={cx('mb-3 flex items-center gap-2 text-sm font-semibold', HEADING)}>
                  <Bot size={15} className="text-coral-600 dark:text-coral-400" /> AI &amp; Tech
                </h4>
                <div className="flex flex-wrap gap-2">
                  {AI_SKILLS.map((s) => <ChipTag key={s}>{s}</ChipTag>)}
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={100}>
          <div className={cx(CARD, 'flex h-full flex-col justify-between p-6 md:p-8')}>
            <div>
              <h3 className={cx('mb-4 font-serif text-xl font-semibold', HEADING)}>About Me</h3>
              <p className={cx('leading-relaxed', MUTED)}>
                I'm a <strong className="font-semibold text-claude-ink dark:text-claude-ash">Technical Business Analyst / AI Product Manager</strong> with 9 years of experience delivering AI-driven digital solutions, virtual assistants, and enterprise-scale automation for telecom and consumer platforms. I specialize in bridging business strategy and technical execution across the <strong className="font-semibold text-claude-ink dark:text-claude-ash">Telecom, Retail/E-Commerce, and Customer Experience</strong> domains.
              </p>
            </div>
            <div className="mt-6 border-t border-claude-line pt-6 dark:border-claude-linedark">
              <h4 className={cx('mb-2 flex items-center gap-2 text-sm font-semibold', HEADING)}>
                <GraduationCap size={16} className="text-coral-600 dark:text-coral-400" /> Education
              </h4>
              <p className={cx('text-sm', MUTED)}>B.E. Mechanical Engineering — Distinction (CGPA: 8.596)</p>
              <p className={cx('text-xs opacity-70', MUTED)}>Velammal Engineering College, Anna University (2012–2016)</p>
            </div>
          </div>
        </Reveal>
      </div>

      {/* Certifications */}
      <Reveal>
        <section className={cx(CARD, 'p-6 md:p-8')}>
          <h3 className={cx('mb-6 flex items-center gap-2 font-serif text-xl font-semibold', HEADING)}>
            <ShieldCheck size={20} className="text-coral-600 dark:text-coral-400" /> Professional Certifications
          </h3>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {CERTS.map((cert) => (
              <div
                key={cert.name}
                className="rounded-2xl border border-claude-line bg-claude-sand/40 p-5 transition-all hover:-translate-y-1 hover:border-coral-300 hover:shadow-soft dark:border-claude-linedark dark:bg-claude-stump/40"
              >
                <div className="mb-3 flex items-start justify-between">
                  <span className="grid h-9 w-9 place-items-center rounded-lg bg-coral-500/10 text-coral-600 dark:text-coral-400">
                    <CheckCircle size={18} />
                  </span>
                  <span className={cx('rounded-md bg-claude-line/60 px-2 py-0.5 font-mono text-[10px] dark:bg-claude-linedark', MUTED)}>{cert.year}</span>
                </div>
                <h4 className={cx('text-sm font-semibold', HEADING)}>{cert.name}</h4>
                <p className={cx('mt-0.5 text-xs', MUTED)}>{cert.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </Reveal>

      {/* AI Stack */}
      <Reveal>
        <section className={cx(CARD, 'p-6 md:p-8')}>
          <div className="mb-6 flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-coral-500/10 text-coral-600 dark:text-coral-400">
              <Brain size={20} />
            </span>
            <div>
              <h3 className={cx('font-serif text-xl font-semibold', HEADING)}>AI Stack &amp; Models</h3>
              <p className={cx('text-xs', MUTED)}>Tools and models I actively use and experiment with</p>
            </div>
          </div>
          <p className={cx('mb-3 font-mono text-[10px] uppercase tracking-widest', MUTED)}>Platforms &amp; Tools</p>
          <div className="mb-6 flex flex-wrap gap-2">
            {AI_TOOLS.map((tool) => (
              <span key={tool} className="rounded-xl border border-claude-line bg-claude-sand/50 px-3 py-1.5 text-xs font-medium text-claude-ink transition-colors hover:border-coral-300 dark:border-claude-linedark dark:bg-claude-stump/50 dark:text-claude-ash">
                {tool}
              </span>
            ))}
          </div>
          <p className={cx('mb-3 font-mono text-[10px] uppercase tracking-widest', MUTED)}>LLMs &amp; AI Models</p>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {AI_MODELS.map((group) => (
              <div key={group.name} className="rounded-2xl border border-claude-line bg-claude-sand/40 p-4 dark:border-claude-linedark dark:bg-claude-stump/40">
                <div className="mb-2 flex items-center justify-between">
                  <span className={cx('text-sm font-semibold', HEADING)}>{group.name}</span>
                  <span className={cx('rounded bg-claude-line/60 px-1.5 py-0.5 font-mono text-[9px] dark:bg-claude-linedark', MUTED)}>{group.org}</span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {group.models.map((m) => (
                    <span key={m} className="rounded-full border border-claude-line bg-claude-paper px-2 py-0.5 text-[10px] text-claude-muted dark:border-claude-linedark dark:bg-claude-bark dark:text-claude-subtle">{m}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </Reveal>

      {isAdmin && (
        <div className="flex items-center justify-center gap-3 rounded-3xl bg-coral-600 p-5 text-white shadow-glow">
          <BarChart2 size={22} className="text-white/80" />
          <div className="text-left">
            <p className="font-mono text-xs text-white/70">Analytics Ready</p>
            <p className="text-sm font-semibold">Admin view active</p>
          </div>
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Palette switcher (header dropdown)                                */
/* ------------------------------------------------------------------ */
function PaletteMenu({ palette, choose, isOpen, setIsOpen }) {
  const ref = useRef(null);
  useEffect(() => {
    if (!isOpen) return undefined;
    const onDoc = (e) => { if (ref.current && !ref.current.contains(e.target)) setIsOpen(false); };
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, [isOpen, setIsOpen]);
  const current = PALETTES.find((p) => p.id === palette) || PALETTES[0];
  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setIsOpen((o) => !o)}
        aria-label="Change color palette"
        className="group relative grid h-9 w-9 place-items-center rounded-full border border-claude-line bg-claude-paper transition-colors hover:border-coral-400 dark:border-claude-linedark dark:bg-claude-stump"
      >
        <span
          className="h-4 w-4 rounded-full ring-2 ring-white/40"
          style={{ background: `linear-gradient(135deg, ${current.swatch}, ${current.swatch2})` }}
        />
      </button>
      {isOpen && (
        <div className="absolute right-0 z-50 mt-2 w-60 origin-top-right overflow-hidden rounded-2xl border border-claude-line bg-claude-paper p-1.5 shadow-lift animate-scale-in dark:border-claude-linedark dark:bg-claude-bark">
          <p className={cx('px-2.5 py-1.5 text-[10px] font-semibold uppercase tracking-wider', MUTED)}>Cinematic palette</p>
          {PALETTES.map((p) => (
            <button
              key={p.id}
              onClick={() => { choose(p.id); setIsOpen(false); }}
              className={cx(
                'flex w-full items-center gap-3 rounded-xl px-2.5 py-2 text-left text-sm transition-colors',
                palette === p.id ? 'bg-coral-500/10 text-coral-700 dark:text-coral-300' : 'text-claude-ink hover:bg-claude-sand/70 dark:text-claude-ash dark:hover:bg-claude-stump/70'
              )}
            >
              <span className="h-5 w-5 shrink-0 rounded-full ring-1 ring-black/10" style={{ background: `linear-gradient(135deg, ${p.swatch}, ${p.swatch2})` }} />
              <span className="flex-1 font-medium">{p.label}</span>
              {palette === p.id && <Check size={14} className="text-coral-600 dark:text-coral-400" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Impact metrics band                                               */
/* ------------------------------------------------------------------ */
function ImpactMetric({ metric }) {
  const [ref, display] = useCountUp(metric.value);
  return (
    <div className="relative px-4 py-5 text-center">
      <p ref={ref} className="font-serif text-3xl font-semibold tabular-nums text-white md:text-4xl">{display}</p>
      <p className="mt-1 text-xs font-semibold text-white/90 md:text-sm">{metric.label}</p>
      <p className="mt-0.5 text-[11px] text-white/60">{metric.sub}</p>
    </div>
  );
}

function ImpactBand() {
  return (
    <section className="relative overflow-hidden rounded-[2rem] shadow-lift">
      {/* graded accent background */}
      <div className="absolute inset-0 bg-gradient-to-br from-coral-700 via-coral-600 to-coral-500" />
      <div className="absolute inset-0 bg-[radial-gradient(60%_120%_at_15%_0%,rgb(var(--alt-500)/0.5),transparent_55%)]" />
      <div className="absolute inset-0 bg-dot-grid text-white/10" />
      <div className="relative grid grid-cols-2 divide-white/15 md:grid-cols-4 md:divide-x">
        {IMPACT_METRICS.map((m) => <ImpactMetric key={m.label} metric={m} />)}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Command palette (⌘K)                                              */
/* ------------------------------------------------------------------ */
function CommandPalette({ isOpen, onClose, onNavigate, onResume, onChat, onTheme, palette, choosePalette }) {
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);
  const [active, setActive] = useState(0);

  const commands = React.useMemo(() => {
    const nav = NAV.map((n) => ({
      id: `nav-${n.id}`, label: `Go to ${n.label}`, hint: 'Section', icon: CornerDownLeft,
      run: () => { onNavigate(n.id); onClose(); },
    }));
    const actions = [
      { id: 'resume', label: 'Download résumé (PDF)', hint: 'Action', icon: Download, run: () => { onResume(); onClose(); } },
      { id: 'chat', label: 'Ask the AI Twin', hint: 'Action', icon: Bot, run: () => { onChat(); } },
      { id: 'theme', label: 'Toggle light / dark', hint: 'Theme', icon: Sun, run: () => { onTheme(); } },
      { id: 'email', label: 'Email Ashfaque', hint: 'Contact', icon: Mail, run: () => { window.location.href = `mailto:${SOCIALS.email}`; onClose(); } },
      { id: 'linkedin', label: 'Open LinkedIn', hint: 'Contact', icon: Linkedin, run: () => { window.open(SOCIALS.linkedin, '_blank'); onClose(); } },
      { id: 'github', label: 'Open GitHub', hint: 'Contact', icon: Github, run: () => { window.open(SOCIALS.github, '_blank'); onClose(); } },
    ];
    const palettes = PALETTES.map((p) => ({
      id: `pal-${p.id}`, label: `Palette: ${p.label}`, hint: 'Palette', icon: Palette,
      run: () => { choosePalette(p.id); },
    }));
    return [...nav, ...actions, ...palettes];
  }, [onNavigate, onClose, onResume, onChat, onTheme, choosePalette]);

  const filtered = commands.filter((c) => c.label.toLowerCase().includes(query.toLowerCase()));

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setActive(0);
      const t = setTimeout(() => inputRef.current?.focus(), 30);
      return () => clearTimeout(t);
    }
    return undefined;
  }, [isOpen]);

  useEffect(() => { setActive(0); }, [query]);

  if (!isOpen) return null;

  const onKeyDown = (e) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); setActive((a) => Math.min(a + 1, filtered.length - 1)); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setActive((a) => Math.max(a - 1, 0)); }
    else if (e.key === 'Enter') { e.preventDefault(); filtered[active]?.run(); }
  };

  return (
    <div className="fixed inset-0 z-[90] flex items-start justify-center p-4 pt-[12vh]">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-fade-in" onClick={onClose} />
      <div className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-claude-line bg-claude-paper shadow-lift animate-scale-in dark:border-claude-linedark dark:bg-claude-bark">
        <div className="flex items-center gap-3 border-b border-claude-line px-4 py-3 dark:border-claude-linedark">
          <Search size={18} className={MUTED} />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder="Type a command or search…"
            className="flex-1 bg-transparent text-sm text-claude-ink outline-none placeholder:text-claude-muted/70 dark:text-claude-ash"
          />
          <kbd className={cx('rounded-md border border-claude-line px-1.5 py-0.5 font-mono text-[10px] dark:border-claude-linedark', MUTED)}>Esc</kbd>
        </div>
        <div className="max-h-[50vh] overflow-y-auto p-1.5">
          {filtered.length === 0 && <p className={cx('px-3 py-6 text-center text-sm', MUTED)}>No matching commands.</p>}
          {filtered.map((c, i) => (
            <button
              key={c.id}
              onMouseEnter={() => setActive(i)}
              onClick={() => c.run()}
              className={cx(
                'flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm transition-colors',
                i === active ? 'bg-coral-500/10 text-coral-700 dark:text-coral-300' : 'text-claude-ink dark:text-claude-ash'
              )}
            >
              <c.icon size={16} className="shrink-0 opacity-70" />
              <span className="flex-1">{c.label}</span>
              <span className={cx('text-[10px] uppercase tracking-wide', MUTED)}>{c.hint}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Project case-study modal                                          */
/* ------------------------------------------------------------------ */
function ProjectModal({ project, onClose }) {
  useEffect(() => {
    if (!project) return undefined;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prev; };
  }, [project]);

  if (!project) return null;
  const cs = project.caseStudy || {};
  const Icon = project.icon || Sparkles;
  return (
    <div className="fixed inset-0 z-[90] flex items-end justify-center p-0 sm:items-center sm:p-4">
      <div className="absolute inset-0 bg-black/55 backdrop-blur-sm animate-fade-in" onClick={onClose} />
      <div className="relative max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-t-3xl border border-claude-line bg-claude-paper shadow-lift animate-scale-in dark:border-claude-linedark dark:bg-claude-bark sm:rounded-3xl">
        {/* header */}
        <div className="relative overflow-hidden border-b border-claude-line p-6 dark:border-claude-linedark md:p-8">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_120%_at_90%_0%,rgb(var(--accent-500)/0.16),transparent_60%)]" />
          <button
            onClick={onClose}
            aria-label="Close"
            className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full border border-claude-line bg-claude-paper/80 text-claude-muted transition-colors hover:text-coral-600 dark:border-claude-linedark dark:bg-claude-bark/80"
          >
            <X size={16} />
          </button>
          <span className="relative inline-grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-coral-500/20 to-gold-500/10 text-coral-600 dark:text-coral-400">
            <Icon size={24} />
          </span>
          {project.badge && (
            <span className="relative ml-3 inline-flex items-center rounded-full border border-coral-500/30 bg-coral-500/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-coral-700 dark:text-coral-300">{project.badge}</span>
          )}
          <h3 className={cx('relative mt-4 font-serif text-2xl font-semibold', HEADING)}>{project.title}</h3>
          {cs.role && <p className="relative mt-1 text-sm font-medium text-coral-700 dark:text-coral-300">{cs.role}</p>}
        </div>

        {/* metrics */}
        {cs.metrics && (
          <div className="grid grid-cols-2 gap-px border-b border-claude-line bg-claude-line/60 sm:grid-cols-4 dark:border-claude-linedark dark:bg-claude-linedark/60">
            {cs.metrics.map((m) => (
              <div key={m.label} className="bg-claude-paper p-4 text-center dark:bg-claude-bark">
                <p className={cx('font-serif text-xl font-semibold', HEADING)}>{m.value}</p>
                <p className={cx('mt-0.5 text-[11px]', MUTED)}>{m.label}</p>
              </div>
            ))}
          </div>
        )}

        {/* body */}
        <div className="space-y-5 p-6 md:p-8">
          {cs.problem && (
            <div>
              <h4 className={cx('mb-1.5 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider', MUTED)}>
                <Target size={13} className="text-coral-600 dark:text-coral-400" /> The problem
              </h4>
              <p className={cx('text-sm leading-relaxed', MUTED)}>{cs.problem}</p>
            </div>
          )}
          {cs.approach && (
            <div>
              <h4 className={cx('mb-1.5 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider', MUTED)}>
                <Sparkles size={13} className="text-coral-600 dark:text-coral-400" /> My approach
              </h4>
              <p className={cx('text-sm leading-relaxed', MUTED)}>{cs.approach}</p>
            </div>
          )}
          {cs.stack && (
            <div>
              <h4 className={cx('mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider', MUTED)}>
                <Cpu size={13} className="text-coral-600 dark:text-coral-400" /> Stack &amp; methods
              </h4>
              <div className="flex flex-wrap gap-2">
                {cs.stack.map((s) => <ChipTag key={s}>{s}</ChipTag>)}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Writing / Insights                                                */
/* ------------------------------------------------------------------ */
function Writing() {
  return (
    <div className="mx-auto max-w-4xl">
      <Reveal>
        <SectionHeading eyebrow="Insights" title="Writing & Notes" intro="Short pieces on conversational AI, AI product management, and measuring what ships. (Full articles coming soon.)" />
      </Reveal>
      <div className="mt-10 space-y-4">
        {WRITING_POSTS.map((post, i) => (
          <Reveal key={post.title} delay={i * 80}>
            <article className={cx(CARD, 'group p-6 transition-all hover:-translate-y-0.5 hover:border-coral-300 hover:shadow-lift dark:hover:border-coral-500/40 md:p-7')}>
              <div className="mb-2 flex flex-wrap items-center gap-2 text-[11px]">
                <span className="rounded-full bg-coral-500/10 px-2.5 py-0.5 font-semibold uppercase tracking-wide text-coral-700 dark:text-coral-300">{post.tag}</span>
                <span className={MUTED}>{post.date}</span>
                <span className={cx('opacity-50', MUTED)}>·</span>
                <span className={MUTED}>{post.readTime} read</span>
              </div>
              <h3 className={cx('font-serif text-xl font-semibold transition-colors group-hover:text-coral-700 dark:group-hover:text-coral-300', HEADING)}>{post.title}</h3>
              <p className={cx('mt-2 text-sm leading-relaxed', MUTED)}>{post.blurb}</p>
              <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-coral-700 dark:text-coral-300">
                {post.href ? 'Read article' : 'Coming soon'}
                {post.href && <ArrowUpRight size={13} className="transition-transform group-hover:translate-x-0.5" />}
              </span>
            </article>
          </Reveal>
        ))}
      </div>
      <Reveal>
        <p className={cx('mt-8 text-center text-sm', MUTED)}>
          More writing on{' '}
          <a href={SOCIALS.linkedin} target="_blank" rel="noreferrer" className="font-medium text-coral-700 underline underline-offset-2 dark:text-coral-300">LinkedIn</a>.
        </p>
      </Reveal>
    </div>
  );
}

function StatCard({ stat }) {
  const [ref, display] = useCountUp(stat.value);
  return (
    <div className={cx(CARD, CARD_HOVER, 'group relative h-full overflow-hidden p-5 md:p-6')}>
      {/* sheen sweep on hover */}
      <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
      <span className="inline-grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-coral-500/15 to-gold-500/10 text-coral-600 transition-colors group-hover:from-coral-500/25 dark:text-coral-400">
        <stat.icon size={22} />
      </span>
      <p ref={ref} className={cx('mt-4 font-serif text-3xl font-semibold tabular-nums md:text-4xl', HEADING)}>{display}</p>
      <p className={cx('mt-1 text-xs font-medium uppercase tracking-wide', MUTED)}>{stat.label}</p>
    </div>
  );
}

function Avatar() {
  return (
    <div className="group relative h-24 w-24 shrink-0 md:h-28 md:w-28">
      {/* gradient ring border (kept within the avatar's circular bounds) */}
      <div className="relative h-full w-full overflow-hidden rounded-full bg-gradient-to-br from-gold-400 via-coral-500 to-coral-700 p-[3px] shadow-soft">
        <div className="h-full w-full overflow-hidden rounded-full">
        {AVATAR_SRC ? (
          <img src={AVATAR_SRC} alt="Ashfaque Rifaye" className="h-full w-full object-cover" />
        ) : (
          <svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg" className="h-full w-full" role="img" aria-label="Illustrated portrait of Ashfaque Rifaye">
            <defs>
              <radialGradient id="avatarBg" cx="50%" cy="32%" r="80%">
                <stop offset="0%" stopColor="#2a2620" />
                <stop offset="60%" stopColor="#1d1a14" />
                <stop offset="100%" stopColor="#100e0a" />
              </radialGradient>
              <linearGradient id="avatarSkin" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#c98a4f" />
                <stop offset="100%" stopColor="#a96f3a" />
              </linearGradient>
              <linearGradient id="avatarRim" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#e0a23b" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#da6a30" stopOpacity="0" />
              </linearGradient>
              <clipPath id="avatarClip"><circle cx="40" cy="40" r="40" /></clipPath>
            </defs>
            <g clipPath="url(#avatarClip)">
              {/* cinematic backdrop + warm glow */}
              <rect width="80" height="80" fill="url(#avatarBg)" />
              <circle cx="58" cy="20" r="30" fill="url(#avatarRim)" opacity="0.5" />
              <ellipse cx="40" cy="78" rx="34" ry="20" fill="#da6a30" opacity="0.12" />
              {/* shoulders / blazer */}
              <path d="M9 80 L9 65 C9 56 19 51 30 49 L33 48 L40 56 L47 48 L50 49 C61 51 71 56 71 65 L71 80 Z" fill="#2b2820" />
              <path d="M9 80 L9 65 C9 58 15 54 23 51 L33 48 L34 52 L25 57 C20 60 18 66 18 72 L18 80 Z" fill="#343026" opacity="0.6" />
              {/* shirt + collar */}
              <path d="M33 48 L40 56 L47 48 L44 46 L40 52 L36 46 Z" fill="#efe9dc" />
              <path d="M36 46 L40 52 L40 60 L34 55 Z" fill="#e3dccb" />
              <path d="M44 46 L40 52 L40 60 L46 55 Z" fill="#efe9dc" />
              {/* tie hint */}
              <path d="M39 52 L41 52 L40.6 62 L40 64 L39.4 62 Z" fill="#9b4018" />
              {/* neck + shadow */}
              <path d="M34.5 39 L45.5 39 L45.5 48 C45.5 51 34.5 51 34.5 48 Z" fill="#9c6533" />
              <path d="M34.5 44 C37 47 43 47 45.5 44 L45.5 48 C45.5 51 34.5 51 34.5 48 Z" fill="#85531f" opacity="0.5" />
              {/* head */}
              <ellipse cx="40" cy="30" rx="15.5" ry="17.5" fill="url(#avatarSkin)" />
              {/* cheek/jaw soft shading */}
              <path d="M25 30 C25 40 30 47 40 47 C50 47 55 40 55 30 C54 39 49 44 40 44 C31 44 26 39 25 30 Z" fill="#92602f" opacity="0.35" />
              {/* ears */}
              <ellipse cx="25" cy="31" rx="3.1" ry="4.3" fill="#b87c41" />
              <ellipse cx="55" cy="31" rx="3.1" ry="4.3" fill="#b87c41" />
              {/* hair — modern short, neat side part */}
              <path d="M24.5 28 C22.8 16 30 7.5 40 7.5 C50.5 7.5 57.6 15 56 28 C55 21.5 53 17.5 49 15.5 C50.2 18.5 50.2 21.5 49 23.8 C46.3 18.2 41 16.5 35.8 17.5 C31.2 18.4 27.4 21.2 26 26.2 C25.4 26.7 24.9 27.2 24.5 28 Z" fill="#15110b" />
              <path d="M36.5 8.5 C43.5 8.5 49.5 12 51.5 17.5 C47.5 14 42.5 13 37.5 13.6 C33.5 14 29.5 16 27.5 19.5 C29 13.5 32.5 9 36.5 8.5 Z" fill="#221911" />
              <path d="M27 21 C30 17 35 15.5 40 15.6 C36 16 31.5 17.8 28.5 21.5 Z" fill="#3a2a1a" opacity="0.7" />
              {/* eyebrows */}
              <path d="M30 25.3 Q34 23.3 37.6 25.1" stroke="#15110b" strokeWidth="1.9" fill="none" strokeLinecap="round" />
              <path d="M42.4 25.1 Q46 23.3 50 25.3" stroke="#15110b" strokeWidth="1.9" fill="none" strokeLinecap="round" />
              {/* eyes */}
              <ellipse cx="33.6" cy="29" rx="3.2" ry="2.4" fill="#fbf8f2" />
              <ellipse cx="46.4" cy="29" rx="3.2" ry="2.4" fill="#fbf8f2" />
              <circle cx="34" cy="29.2" r="1.85" fill="#4a3420" />
              <circle cx="46" cy="29.2" r="1.85" fill="#4a3420" />
              <circle cx="34" cy="29.2" r="0.85" fill="#120c07" />
              <circle cx="46" cy="29.2" r="0.85" fill="#120c07" />
              <circle cx="34.7" cy="28.4" r="0.55" fill="#fff" opacity="0.85" />
              <circle cx="46.7" cy="28.4" r="0.55" fill="#fff" opacity="0.85" />
              {/* nose */}
              <path d="M39.5 31 C39 34 39 36 40 36.6 C41 36 41 34 40.5 31" stroke="#8f5b2b" strokeWidth="1" fill="none" strokeLinecap="round" />
              {/* groomed full beard + moustache framing a slight smile */}
              <path d="M25.5 32.5 C26.5 41 31 49 40 49 C49 49 53.5 41 54.5 32.5 C54.5 38 53.5 43 50 46.5 C53 43 54.2 38 54.2 34 C52 39 49 41 46 41.5 C44 43.5 36 43.5 34 41.5 C31 41 28 39 25.8 34 Z" fill="#15110b" />
              <path d="M34 41.6 C36 43.4 44 43.4 46 41.6 C45 44.2 42.5 45.6 40 45.6 C37.5 45.6 35 44.2 34 41.6 Z" fill="#241a10" />
              <path d="M34.4 37.6 Q40 40 45.6 37.6" stroke="#15110b" strokeWidth="2" fill="none" strokeLinecap="round" />
              <path d="M35.4 39.5 Q40 41.8 44.6 39.5" stroke="#6b3c1f" strokeWidth="1.1" fill="none" strokeLinecap="round" opacity="0.7" />
              {/* face rim highlight (cinematic edge light) */}
              <path d="M52 20 C55 24 55.5 30 54.5 35" stroke="#e0a23b" strokeWidth="1.1" fill="none" strokeLinecap="round" opacity="0.5" />
            </g>
          </svg>
        )}
        </div>
      </div>
      <span className="absolute bottom-0 right-0 z-10 flex h-6 w-6 items-center justify-center rounded-full border-4 border-claude-paper bg-emerald-500 dark:border-claude-bark">
        <span className="absolute h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
      </span>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  EXPERIENCE                                                        */
/* ------------------------------------------------------------------ */
function Experience() {
  return (
    <div className="mx-auto max-w-4xl">
      <Reveal>
        <SectionHeading eyebrow="Career" title="Professional Experience" intro="Nine years across telecom and enterprise — product ownership, conversational AI, and full-stack delivery." />
      </Reveal>

      <div className="relative mt-10 space-y-6">
        {/* timeline rail */}
        <div className="absolute bottom-0 left-[19px] top-2 hidden w-px bg-gradient-to-b from-coral-500/40 via-claude-line to-transparent dark:via-claude-linedark md:block" />
        {EXPERIENCE.map((job, idx) => (
          <Reveal key={job.company} delay={idx * 80}>
            <article className={cx(CARD, CARD_HOVER, 'group relative md:ml-12')}>
              {/* timeline node */}
              <span className="absolute -left-[52px] top-8 hidden h-6 w-6 place-items-center rounded-full border border-coral-500/40 bg-claude-cream text-coral-600 shadow-soft dark:bg-claude-espresso dark:text-coral-400 md:grid">
                <span className="h-2 w-2 rounded-full bg-coral-500" />
              </span>
              <div className="p-6 md:p-8">
                <div className="mb-5 flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
                  <div>
                    <h3 className={cx('font-serif text-xl font-semibold md:text-2xl', HEADING)}>{job.company}</h3>
                    <p className="mt-1 text-sm font-medium text-coral-700 dark:text-coral-300">{job.role}</p>
                  </div>
                  <span className={cx('inline-flex w-fit items-center gap-2 rounded-full border border-claude-line bg-claude-sand/60 px-3 py-1.5 font-mono text-xs dark:border-claude-linedark dark:bg-claude-stump/60', MUTED)}>
                    {job.current && <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />}
                    {job.period}
                  </span>
                </div>

                <h4 className={cx('mb-3 text-[11px] font-semibold uppercase tracking-wider', MUTED)}>Key Responsibilities &amp; Achievements</h4>
                <ul className="space-y-3">
                  {job.points.map((point, i) => (
                    <li key={i} className={cx('flex items-start gap-3 text-sm leading-relaxed md:text-[15px]', MUTED)}>
                      <ChevronRight size={16} className="mt-1 shrink-0 text-coral-600 dark:text-coral-400" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>

                {job.extra && (
                  <div className="mt-6 border-t border-claude-line pt-6 dark:border-claude-linedark">
                    <h4 className={cx('mb-3 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider', MUTED)}>
                      <Sparkles size={13} className="text-coral-600 dark:text-coral-400" /> {job.extraTitle}
                    </h4>
                    <ul className="space-y-2.5">
                      {job.extra.map((item, i) => (
                        <li key={i} className={cx('flex items-start gap-3 text-sm leading-relaxed', MUTED)}>
                          <Sparkles size={13} className="mt-1 shrink-0 text-coral-500/70" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {job.projects && (
                  <div className="mt-6 border-t border-claude-line pt-6 dark:border-claude-linedark">
                    <h4 className={cx('mb-3 text-[11px] font-semibold uppercase tracking-wider', MUTED)}>{job.extraTitle}</h4>
                    <div className="grid gap-3 sm:grid-cols-2">
                      {job.projects.map((proj) => (
                        <div key={proj.name} className="rounded-xl border border-claude-line bg-claude-sand/40 p-3 dark:border-claude-linedark dark:bg-claude-stump/40">
                          <p className={cx('text-sm font-semibold', HEADING)}>{proj.name}</p>
                          <p className="mt-1 text-xs text-coral-700 dark:text-coral-300">{proj.metric}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  WORKS                                                             */
/* ------------------------------------------------------------------ */
function ProjectCard({ icon: Icon, title, desc, tags, badge, onOpen, project }) {
  const tiltRef = useTilt(6);
  const clickable = !!(onOpen && project?.caseStudy);
  const handle = clickable ? () => { onOpen(project); trackEvent('open_case_study', { project: title }); } : undefined;
  return (
    <div
      ref={tiltRef}
      onClick={handle}
      onKeyDown={clickable ? (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handle(); } } : undefined}
      role={clickable ? 'button' : undefined}
      tabIndex={clickable ? 0 : undefined}
      className={cx(
        CARD,
        'group relative h-full overflow-hidden p-6 transition-[transform,box-shadow,border-color] duration-300 will-change-transform hover:border-coral-300 hover:shadow-lift focus:outline-none focus-visible:ring-2 focus-visible:ring-coral-500/50 dark:hover:border-coral-500/40 md:p-8',
        clickable && 'cursor-pointer'
      )}
    >
      {/* radial hover glow */}
      <span className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-[radial-gradient(40%_50%_at_50%_0%,rgb(var(--accent-500)/0.14),transparent_70%)]" />
      {badge && (
        <span className="absolute right-4 top-4 rounded-full border border-coral-500/30 bg-coral-500/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-coral-700 dark:text-coral-300">
          {badge}
        </span>
      )}
      <span className="relative inline-grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-coral-500/15 to-gold-500/10 text-coral-600 transition-colors group-hover:from-coral-500/25 dark:text-coral-400">
        <Icon size={24} />
      </span>
      <h3 className={cx('relative mt-4 font-serif text-lg font-semibold', HEADING)}>{title}</h3>
      <p className={cx('relative mt-2 text-sm leading-relaxed', MUTED)}>{desc}</p>
      <div className="relative mt-4 flex flex-wrap gap-2">
        {tags.map((t) => <ChipTag key={t}>{t}</ChipTag>)}
      </div>
      {clickable && (
        <span className="relative mt-4 inline-flex items-center gap-1 text-xs font-semibold text-coral-700 opacity-0 transition-opacity duration-300 group-hover:opacity-100 dark:text-coral-300">
          View case study <ArrowRight size={13} />
        </span>
      )}
    </div>
  );
}

function Works({ theme, onOpenProject }) {
  return (
    <div className="space-y-12">
      <Reveal>
        <SectionHeading eyebrow="Portfolio" title="Featured Projects & Hackathons" intro="Delivering business value through AI, automation, and innovation. Tap a featured card to open its case study." />
      </Reveal>

      {/* Hackathons */}
      <section>
        <h3 className={cx('mb-5 flex items-center gap-2 font-serif text-lg font-semibold', HEADING)}>
          <Trophy size={20} className="text-coral-600 dark:text-coral-400" /> Award-Winning Hackathon Projects
        </h3>
        <div className="grid gap-6 md:grid-cols-2">
          {HACKATHONS.map((p, i) => (
            <Reveal key={p.title} delay={i * 80}><ProjectCard {...p} project={p} onOpen={onOpenProject} /></Reveal>
          ))}
        </div>
      </section>

      {/* Live demos */}
      <section>
        <h3 className={cx('mb-2 flex items-center gap-2 font-serif text-lg font-semibold', HEADING)}>
          <Code2 size={20} className="text-coral-600 dark:text-coral-400" /> Live Interactive Demos
        </h3>
        <p className={cx('mb-5 text-sm', MUTED)}>Interactive prototypes and live projects. Click into each demo to explore the interface.</p>
        <div className="space-y-6">
          {CODESANDBOX_PROJECTS.map((project, i) => (
            <Reveal key={project.id} delay={i * 60}>
              <div className={cx(CARD, 'overflow-hidden')}>
                <div className="border-b border-claude-line bg-claude-sand/40 p-6 dark:border-claude-linedark dark:bg-claude-stump/40">
                  <div className="mb-3 flex items-start justify-between gap-3">
                    <h4 className={cx('font-serif text-lg font-semibold', HEADING)}>{project.title}</h4>
                    <span className={cx(
                      'shrink-0 rounded-full border px-2.5 py-1 text-[10px] font-semibold',
                      project.sandboxId
                        ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400'
                        : 'border-claude-line bg-claude-paper text-claude-muted dark:border-claude-linedark dark:bg-claude-bark dark:text-claude-subtle'
                    )}>
                      {project.sandboxId ? 'Live' : 'Coming Soon'}
                    </span>
                  </div>
                  <p className={cx('mb-4 text-sm', MUTED)}>{project.description}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {project.tags.map((tag) => (
                      <span key={tag} className="rounded-full border border-claude-line bg-claude-paper px-2 py-0.5 text-[10px] text-claude-muted dark:border-claude-linedark dark:bg-claude-bark dark:text-claude-subtle">{tag}</span>
                    ))}
                  </div>
                </div>
                {project.sandboxId ? (
                  <iframe
                    src={`https://codesandbox.io/embed/${project.sandboxId}?view=preview&theme=${theme}`}
                    title={project.title}
                    className="h-[460px] w-full border-0"
                    allow="accelerometer; camera; encrypted-media; geolocation; gyroscope; microphone"
                    sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
                  />
                ) : (
                  <div className="p-12 text-center">
                    <Code2 size={40} className="mx-auto mb-3 text-coral-500/30" />
                    <p className={cx('font-semibold', HEADING)}>Sandbox coming soon</p>
                    <p className={cx('mt-1 text-sm', MUTED)}>This interactive demo will be available shortly.</p>
                  </div>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* AT&T deliverables */}
      <section>
        <h3 className={cx('mb-5 flex items-center gap-2 font-serif text-lg font-semibold', HEADING)}>
          <Brain size={20} className="text-coral-600 dark:text-coral-400" /> AT&amp;T — Key Deliverables
        </h3>
        <div className="grid gap-6 md:grid-cols-3">
          {ATT_DELIVERABLES.map((p, i) => (
            <Reveal key={p.title} delay={i * 80}><ProjectCard {...p} project={p} onOpen={onOpenProject} /></Reveal>
          ))}
        </div>
      </section>

      {/* Verizon */}
      <section>
        <h3 className={cx('mb-5 flex items-center gap-2 font-serif text-lg font-semibold', HEADING)}>
          <Target size={20} className="text-coral-600 dark:text-coral-400" /> Verizon — High-Impact Projects
        </h3>
        <div className="grid gap-6 md:grid-cols-2">
          {VERIZON_PROJECTS.map((p, i) => (
            <Reveal key={p.title} delay={i * 80}><ProjectCard {...p} project={p} onOpen={onOpenProject} /></Reveal>
          ))}
        </div>
      </section>

      {/* Personal */}
      <section>
        <h3 className={cx('mb-2 flex items-center gap-2 font-serif text-lg font-semibold', HEADING)}>
          <Code2 size={20} className="text-coral-600 dark:text-coral-400" /> Personal Projects &amp; Experiments
        </h3>
        <p className={cx('mb-5 text-sm', MUTED)}>
          Independent builds and AI experiments from{' '}
          <a href={SOCIALS.github} target="_blank" rel="noreferrer" onClick={() => trackEvent('social_link_click', { platform: 'GitHub', location: 'works_section' })} className="font-medium text-coral-700 underline underline-offset-2 hover:text-coral-600 dark:text-coral-300">
            github.com/ashfaque-rifaye
          </a>
        </p>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {PERSONAL_PROJECTS.map((proj, i) => (
            <Reveal key={proj.name} delay={(i % 3) * 80}>
              <a
                href={SOCIALS.github}
                target="_blank"
                rel="noreferrer"
                onClick={() => trackEvent('project_click', { project: proj.name })}
                className={cx(CARD, CARD_HOVER, 'group flex h-full flex-col p-5')}
              >
                <div className="mb-3 flex items-start justify-between">
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-coral-500/10 text-coral-600 dark:text-coral-400">
                    <Code2 size={20} />
                  </span>
                  <span className={cx('rounded-md bg-claude-line/60 px-2 py-0.5 font-mono text-[10px] dark:bg-claude-linedark', MUTED)}>{proj.lang}</span>
                </div>
                <h4 className={cx('flex items-center gap-1 text-sm font-semibold', HEADING)}>
                  {proj.name}
                  <ArrowUpRight size={14} className="text-coral-500 opacity-0 transition-opacity group-hover:opacity-100" />
                </h4>
                <p className={cx('mt-2 flex-grow text-xs leading-relaxed', MUTED)}>{proj.desc}</p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {proj.tags.map((t) => (
                    <span key={t} className="rounded-md border border-claude-line bg-claude-sand/50 px-2 py-0.5 text-[10px] text-claude-muted dark:border-claude-linedark dark:bg-claude-stump/50 dark:text-claude-subtle">{t}</span>
                  ))}
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  AWARDS                                                            */
/* ------------------------------------------------------------------ */
function Awards() {
  return (
    <div className="mx-auto max-w-5xl">
      <Reveal>
        <SectionHeading eyebrow="Recognition" title="Honors & Recommendations" intro="Awards and endorsements from leadership across AT&T and Verizon." />
      </Reveal>

      <div className="mt-10 grid gap-5 md:grid-cols-2">
        {AWARDS.map((award, i) => (
          <Reveal key={award.title} delay={(i % 2) * 80} className={award.wide ? 'md:col-span-2' : ''}>
            <div className={cx(CARD, CARD_HOVER, 'group h-full p-6')}>
              <div className="flex items-start gap-4">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-coral-500/10 text-coral-600 transition-colors group-hover:bg-coral-500/20 dark:text-coral-400">
                  <award.icon size={24} />
                </span>
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className={cx('font-serif text-lg font-semibold', HEADING)}>{award.title}</h3>
                    <span className="rounded-md bg-coral-500/10 px-2 py-0.5 font-mono text-[10px] text-coral-700 dark:text-coral-300">{award.year}</span>
                  </div>
                  <p className="mt-0.5 text-xs font-semibold uppercase tracking-wide text-coral-700/80 dark:text-coral-300/80">{award.org}</p>
                  <p className={cx('mt-2 text-sm leading-relaxed', MUTED)}>{award.desc}</p>
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      <div className="mt-12">
        <Reveal>
          <h3 className={cx('mb-6 font-serif text-2xl font-semibold', HEADING)}>Testimonials</h3>
        </Reveal>
        <div className="grid gap-6 md:grid-cols-2">
          {TESTIMONIALS.map((t, i) => (
            <Reveal key={t.name} delay={i * 100}>
              <figure className={cx(CARD, 'h-full p-7')}>
                <Quote size={28} className="text-coral-500/40" />
                <blockquote className={cx('mt-4 text-[15px] italic leading-relaxed', MUTED)}>"{t.quote}"</blockquote>
                <figcaption className="mt-6 flex items-center gap-3">
                  <span className="grid h-11 w-11 place-items-center rounded-full bg-coral-500/15 font-semibold text-coral-700 dark:text-coral-300">{t.initials}</span>
                  <span>
                    <span className={cx('block text-sm font-semibold', HEADING)}>{t.name}</span>
                    <span className={cx('block text-xs', MUTED)}>{t.title}</span>
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  CONTACT                                                           */
/* ------------------------------------------------------------------ */
function Contact({ formData, setFormData, onSubmit, onResume }) {
  const inputCls = 'w-full rounded-xl border border-claude-line bg-claude-cream/60 px-4 py-3 text-sm text-claude-ink outline-none transition-colors placeholder:text-claude-muted/70 focus:border-coral-400 focus:ring-2 focus:ring-coral-500/20 dark:border-claude-linedark dark:bg-claude-espresso/40 dark:text-claude-ash';
  return (
    <div className="mx-auto max-w-5xl">
      <Reveal>
        <SectionHeading center eyebrow="Say hello" title="Let's build something intelligent" intro="Open to product, AI, and analytics roles — and always happy to talk shop." />
      </Reveal>

      <div className="mt-10 grid gap-6 md:grid-cols-[1fr,1.1fr]">
        {/* Left: contact channels */}
        <Reveal>
          <div className={cx(CARD, 'flex h-full flex-col gap-4 p-7')}>
            <h3 className={cx('font-serif text-xl font-semibold', HEADING)}>Get in touch</h3>
            <ContactRow icon={Mail} label="Email" value={SOCIALS.email} href={`mailto:${SOCIALS.email}`} />
            <ContactRow icon={Linkedin} label="LinkedIn" value="in/ashfaque-rifaye" href={SOCIALS.linkedin} />
            <ContactRow icon={Github} label="GitHub" value="ashfaque-rifaye" href={SOCIALS.github} />
            <ContactRow icon={MapPin} label="Location" value="Chennai, IND · Remote-friendly" />
            <button
              onClick={onResume}
              className="mt-2 inline-flex items-center justify-center gap-2 rounded-full border border-coral-500/30 bg-coral-500/10 px-5 py-2.5 text-sm font-semibold text-coral-700 transition-colors hover:bg-coral-500/20 dark:text-coral-300"
            >
              <Download size={16} /> Download Resume
            </button>
          </div>
        </Reveal>

        {/* Right: form */}
        <Reveal delay={100}>
          <form onSubmit={onSubmit} className={cx(CARD, 'space-y-4 p-7')}>
            <div className="grid gap-4 sm:grid-cols-2">
              <input className={inputCls} placeholder="Name" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
              <input className={inputCls} type="email" placeholder="Email" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
            </div>
            <textarea className={inputCls} rows="5" placeholder="Tell me about the role or project..." required value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} />
            <button type="submit" className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-coral-600 px-5 py-3 text-sm font-semibold text-white shadow-glow transition-all hover:bg-coral-700 active:scale-[0.98]">
              Send Message <Send size={16} className="transition-transform group-hover:translate-x-0.5" />
            </button>
          </form>
        </Reveal>
      </div>
    </div>
  );
}

function ContactRow({ icon: Icon, label, value, href }) {
  const content = (
    <>
      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-coral-500/10 text-coral-600 dark:text-coral-400">
        <Icon size={18} />
      </span>
      <span className="min-w-0">
        <span className={cx('block text-xs uppercase tracking-wide', MUTED)}>{label}</span>
        <span className={cx('block truncate text-sm font-medium', HEADING)}>{value}</span>
      </span>
      {href && <ArrowUpRight size={16} className="ml-auto text-coral-500 opacity-0 transition-opacity group-hover:opacity-100" />}
    </>
  );
  const cls = 'group flex items-center gap-3 rounded-2xl border border-claude-line bg-claude-sand/40 p-3 transition-colors hover:border-coral-300 dark:border-claude-linedark dark:bg-claude-stump/40';
  if (!href) return <div className={cls}>{content}</div>;
  const isMail = href.startsWith('mailto:');
  return (
    <a href={href} target={isMail ? undefined : '_blank'} rel={isMail ? undefined : 'noreferrer'} onClick={() => trackEvent('social_link_click', { platform: label, location: 'contact' })} className={cls}>
      {content}
    </a>
  );
}

/* ------------------------------------------------------------------ */
/*  CHAT WIDGET                                                       */
/* ------------------------------------------------------------------ */
function ChatWidget({ isOpen, onToggle, history, input, setInput, onSend, isLoading, endRef, copiedIndex, setCopiedIndex }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSend();
  };
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {isOpen && (
        <div className="flex w-[calc(100vw-3rem)] max-w-sm flex-col overflow-hidden rounded-3xl border border-claude-line bg-claude-paper shadow-lift animate-scale-in dark:border-claude-linedark dark:bg-claude-bark" style={{ maxHeight: '600px' }}>
          {/* header */}
          <div className="flex items-center justify-between border-b border-claude-line bg-gradient-to-r from-coral-500/10 to-coral-500/5 p-4 dark:border-claude-linedark">
            <div className="flex items-center gap-2.5">
              <span className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-coral-500 to-coral-700 text-white shadow-glow">
                <Bot size={17} />
              </span>
              <div>
                <h3 className={cx('text-sm font-semibold', HEADING)}>Ashfaque's AI Twin</h3>
                <p className={cx('text-xs', MUTED)}>Ask about my experience</p>
              </div>
            </div>
            <button onClick={onToggle} aria-label="Close chat" className={cx('rounded-lg p-1 transition-colors hover:bg-coral-500/10', MUTED)}>
              <X size={16} />
            </button>
          </div>

          {/* messages */}
          <div className="flex-1 space-y-3 overflow-y-auto p-4" style={{ minHeight: '260px', maxHeight: '360px' }}>
            {history.map((msg, i) => (
              <div key={i} className={cx('flex', msg.role === 'user' ? 'justify-end' : 'justify-start')}>
                <div className={cx(
                  'max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed',
                  msg.role === 'user'
                    ? 'rounded-br-md bg-coral-600 text-white'
                    : 'rounded-bl-md border border-claude-line bg-claude-sand/60 text-claude-ink dark:border-claude-linedark dark:bg-claude-stump/60 dark:text-claude-ash'
                )}>
                  {msg.role === 'model'
                    ? <Markdown text={msg.text} />
                    : <p className="whitespace-pre-line break-words">{msg.text}</p>}
                  {msg.model && (
                    <div className={cx('mt-1.5 flex items-center justify-between gap-2 font-mono text-[10px]', msg.role === 'user' ? 'text-white/70' : MUTED)}>
                      <span>📌 {msg.model}</span>
                      {msg.role === 'model' && (
                        <button
                          onClick={() => {
                            navigator.clipboard?.writeText(msg.text);
                            setCopiedIndex(i);
                            setTimeout(() => setCopiedIndex(null), 1800);
                            trackEvent('chat_response_copied', { message_index: i });
                          }}
                          className="inline-flex items-center gap-1 opacity-60 transition-opacity hover:opacity-100"
                          title="Copy"
                        >
                          {copiedIndex === i ? <><Check size={11} /> Copied</> : <><Copy size={11} /> Copy</>}
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="rounded-2xl rounded-bl-md border border-claude-line bg-claude-sand/60 px-4 py-3 dark:border-claude-linedark dark:bg-claude-stump/60">
                  <div className="flex gap-1">
                    {[0, 150, 300].map((d) => (
                      <span key={d} className="h-2 w-2 animate-bounce rounded-full bg-coral-500/70" style={{ animationDelay: `${d}ms` }} />
                    ))}
                  </div>
                </div>
              </div>
            )}
            <div ref={endRef} />
          </div>

          {/* suggestions */}
          {history.length <= 2 && !isLoading && (
            <div className="border-t border-claude-line px-4 py-3 dark:border-claude-linedark">
              <p className={cx('mb-2 text-xs font-semibold', MUTED)}>Suggested questions</p>
              <div className="flex flex-wrap gap-1.5">
                {SUGGESTED_QUESTIONS.map((q, idx) => (
                  <button
                    key={q}
                    onClick={() => { trackEvent('chat_suggested_question_clicked', { question: q, question_index: idx }); onSend(q); }}
                    className="rounded-full border border-claude-line bg-claude-sand/60 px-3 py-1.5 text-xs text-claude-ink transition-colors hover:border-coral-300 hover:text-coral-700 dark:border-claude-linedark dark:bg-claude-stump/60 dark:text-claude-ash dark:hover:text-coral-300"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* input */}
          <form onSubmit={handleSubmit} className="flex gap-2 border-t border-claude-line p-3 dark:border-claude-linedark">
            <input
              className="flex-1 rounded-xl border border-claude-line bg-claude-cream/60 px-3 py-2.5 text-sm text-claude-ink outline-none transition-colors placeholder:text-claude-muted/70 focus:border-coral-400 dark:border-claude-linedark dark:bg-claude-espresso/40 dark:text-claude-ash"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about my resume..."
              disabled={isLoading}
            />
            <button type="submit" disabled={isLoading} className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-coral-600 text-white transition-colors hover:bg-coral-700 disabled:opacity-50">
              <Send size={16} />
            </button>
          </form>
        </div>
      )}

      {/* launcher */}
      <button
        onClick={onToggle}
        aria-label="Chat with Ashfaque's AI Twin"
        className={cx(
          'grid h-14 w-14 place-items-center rounded-full bg-gradient-to-br from-coral-500 to-coral-700 text-white shadow-glow transition-all duration-300 hover:scale-105 active:scale-95',
          isOpen && 'rotate-90'
        )}
      >
        {isOpen ? <X size={22} /> : <Bot size={22} />}
      </button>
    </div>
  );
}
