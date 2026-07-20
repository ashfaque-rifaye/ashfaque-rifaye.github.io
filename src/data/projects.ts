import {
  BarChart2, Globe, MessageSquare, Sparkles, TrendingUp, Zap,
} from 'lucide-react';
import type { PersonalProject, WorkItem } from './types';

/* Featured production + hackathon work, presented as case studies. */
export const FEATURED_WORK: WorkItem[] = [
  {
    icon: MessageSquare,
    title: 'GenAI Virtual Assistant',
    badge: 'Production · AT&T',
    desc: 'RAG-powered CCAI implementation serving 1.5M+ monthly customers across chat, voice, WhatsApp, and RCS. 350+ intents, 55% containment, $4.2M saved annually.',
    tags: ['Google CCAI', 'Dialogflow CX', 'RAG'],
    caseStudy: {
      role: 'Product Owner · AT&T Consumer Technology & Experience',
      problem:
        'Customer care carried high volumes of repetitive contacts across chat, voice, WhatsApp, and RCS, with long handle times and costly live-agent escalations.',
      approach:
        'Owned the end-to-end GenAI virtual assistant on Google CCAI/Dialogflow — 350+ intents, 1,200+ training phrases, RAG-powered knowledge retrieval — deployed omnichannel with human-in-the-loop review for low-confidence answers.',
      outcome:
        'Containment passed 55% while intent accuracy held at 92%; escalations fell 28% and average handle time dropped 32 seconds per interaction.',
      metrics: [
        { value: '1.5M+', label: 'monthly interactions' },
        { value: '55%', label: 'containment rate' },
        { value: '$4.2M', label: 'annual savings' },
        { value: '−28%', label: 'agent escalations' },
      ],
      stack: ['Google CCAI', 'Dialogflow CX', 'RAG', 'REST APIs', 'Power BI'],
    },
  },
  {
    icon: Zap,
    title: 'AT&T Helios — Zero Friction Convergence',
    badge: 'Best in Show 2025',
    desc: 'AI-fueled single-cart experience that assembles mobile, fiber, trade-in, and BYOD in one guided flow. Best in Show at AT&T Innovation Jam 2025.',
    tags: ['Generative AI', 'One-Click Bundle', 'CX Innovation'],
    caseStudy: {
      role: 'Product Lead · AT&T Innovation Jam 2025',
      problem:
        'Buying a converged bundle (mobile + fiber + accessories) meant navigating several disconnected flows — trade-in, BYOD, and eligibility checks each lived in their own silo, a major source of drop-off.',
      approach:
        'Designed an AI-fueled single-cart experience that assembles devices, plans, fiber, and trade-in in one guided flow, with real-time eligibility and bundle recommendations surfaced inline.',
      metrics: [
        { value: 'Best in Show', label: 'AT&T Innovation Jam' },
        { value: '1-click', label: 'bundle assembly' },
        { value: '4 LOBs', label: 'unified in one cart' },
      ],
      stack: ['React', 'Generative AI', 'Recommendations', 'UX Prototyping'],
    },
  },
  {
    icon: Globe,
    title: 'Hyper-Personalized International Travel',
    badge: '1st Place 2025',
    desc: 'Predictive models over travel patterns proactively recommend the right international plan — 1st Place and Most Impactful Business Solution at the AT&T Hackathon 2025.',
    tags: ['Predictive Modeling', 'Personalization', 'Travel CX'],
    caseStudy: {
      role: 'Product Lead · AT&T Hackathon 2025',
      problem:
        'International roaming activation was confusing and reactive — customers discovered plans too late, leading to bill shock, support contacts, and poor trip experiences.',
      approach:
        'Built predictive models over travel patterns and media preferences to proactively recommend the right international plan, plus interactive tools for plan comparison, coverage checks, and self-serve troubleshooting.',
      metrics: [
        { value: '1st Place', label: 'AT&T Hackathon' },
        { value: 'Most Impactful', label: 'business solution' },
        { value: 'Proactive', label: 'plan activation' },
      ],
      stack: ['Predictive Modeling', 'AI/ML', 'Personalization', 'Mobile + Web'],
    },
  },
  {
    icon: TrendingUp,
    title: 'AI Performance Analytics Suite',
    badge: 'Production · AT&T',
    desc: 'Real-time Power BI dashboards over 15+ KPIs across 6 channels — the single source of truth for containment, intent accuracy, fallback, and NPS.',
    tags: ['Power BI', 'SQL', 'Data Modelling'],
    caseStudy: {
      role: 'Product / Data · AT&T CTX',
      problem:
        'AI assistant performance was hard to see across channels, making it slow to spot regressions in containment, accuracy, and CSAT.',
      approach:
        'Built real-time Power BI dashboards over 15+ KPIs across 6 channels, giving the team a single source of truth for containment, intent accuracy, fallback, and NPS.',
      metrics: [
        { value: '15+', label: 'KPIs tracked' },
        { value: '6', label: 'channels monitored' },
        { value: '+8', label: 'NPS points' },
      ],
      stack: ['Power BI', 'SQL', 'Data Modelling'],
    },
  },
  {
    icon: Sparkles,
    title: 'Retail Hyper-Personalization',
    badge: 'AT&T',
    desc: 'AI-driven personalization layer for retail recommendation surfaces — +15% recommendation click-through across channels.',
    tags: ['AI/ML', 'Analytics', 'Personalization'],
    caseStudy: {
      role: 'Product / Analytics · AT&T Retail',
      problem:
        'Generic product recommendations across retail channels under-converted and ignored individual customer context.',
      approach:
        'Drove an AI-driven personalization layer informed by behavioural analytics, tuning recommendation surfaces against CTR and conversion.',
      metrics: [
        { value: '+15%', label: 'recommendation CTR' },
        { value: 'Multi-channel', label: 'retail coverage' },
      ],
      stack: ['AI/ML', 'Analytics', 'Personalization'],
    },
  },
  {
    icon: BarChart2,
    title: 'Omni Universal Cart',
    badge: 'Verizon',
    desc: 'Unified omnichannel cart across retail, web, and assisted channels — +11% order growth, −13% cart abandonment.',
    tags: ['Omnichannel', 'E-Commerce', 'SAFe'],
    caseStudy: {
      role: 'Consultant · Verizon Consumer Group',
      problem:
        'Fragmented carts across retail, web, and assisted channels caused abandonment and inconsistent fulfillment.',
      approach:
        'Helped define and deliver a unified omnichannel cart, coordinating UX, data science, and engineering in a SAFe framework.',
      metrics: [
        { value: '+11%', label: 'order growth' },
        { value: '−13%', label: 'cart abandonment' },
      ],
      stack: ['Omnichannel', 'E-Commerce', 'SAFe Agile'],
    },
  },
];

export const PERSONAL_PROJECTS: PersonalProject[] = [
  {
    name: 'NebulaX',
    lang: 'TypeScript',
    desc: 'Self-correcting agent swarm: define an Intelligence Mission in plain language and an autonomous AI swarm senses the web, cross-checks sources, resolves conflicting data, and turns analysis into prototypes and ranked build plans — routed to GitHub, Jira, and Figma.',
    tags: ['Agent Swarm', 'React 19', 'TypeScript', 'LLM'],
    github: 'https://github.com/ashfaque-rifaye/nebulaX',
    youtube: 'hDhJHZPzrPc',
    featured: true,
  },
  { name: 'AI for Bharat Hackathon', lang: 'Python', desc: 'Hackathon submission exploring AI-driven solutions for India-specific challenges — end-to-end Python ML pipeline with a conversational interface.', tags: ['Python', 'AI/ML', 'NLP'] },
  { name: 'AI Mock Interview', lang: 'React', desc: 'AI-powered mock interview platform that simulates real interview scenarios, evaluates responses with LLMs, and returns structured feedback.', tags: ['LLM', 'Interview AI', 'React'] },
  { name: 'Productivity Hub', lang: 'Python', desc: 'Multi-agent productivity system on Google Cloud orchestrating specialized AI agents for task management, research, scheduling, and knowledge retrieval.', tags: ['Multi-Agent', 'GCP', 'Python'] },
  { name: 'Job Automater', lang: 'Python', desc: 'Automated job application assistant that parses listings, matches requirements against a profile, and streamlines applications with scripted AI workflows.', tags: ['Automation', 'Python', 'AI'] },
  { name: 'PC Builder 101', lang: 'React', desc: 'End-to-end PC configuration and buying guide — component selection with compatibility checks and region-specific purchase links.', tags: ['React', 'E-Commerce', 'UX'] },
  { name: 'Health Wise Monitoring', lang: 'React', desc: 'Personal health dashboard for continuous wellness tracking, surfacing trends across vitals and activity data.', tags: ['Health Tech', 'Dashboard', 'Analytics'] },
];
