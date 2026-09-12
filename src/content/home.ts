import type { Capability, Competency, Principle } from './types';

export const CAPABILITIES: Capability[] = [
  {
    title: 'AI Products',
    glyph: 'ai',
    description:
      'Conversational and generative AI that customers actually use: intent design, grounded retrieval, and the guardrails that keep answers trustworthy at scale.',
    items: ['Conversational AI', 'RAG', 'LLMs', 'Agentic AI', 'Customer experience AI'],
  },
  {
    title: 'Enterprise Products',
    glyph: 'enterprise',
    description:
      "The integration work that turns a model's answer into a resolved issue: APIs, CRM and telephony, channels, and the workflows between them.",
    items: ['APIs', 'CRM integration', 'Omnichannel experiences', 'Digital platforms', 'Workflow automation'],
  },
  {
    title: 'Product Strategy',
    glyph: 'strategy',
    description:
      'Deciding what to build and proving it worked: discovery, roadmaps, experiments and metrics, delivered across squads and stakeholders.',
    items: ['Product discovery', 'Roadmaps', 'Experimentation', 'Analytics', 'Product metrics', 'Cross-functional delivery'],
  },
];

/* Skills a hiring team screens for, each tied to proof from the résumé
   (September 2026). Nothing here goes beyond what the résumé states. */
export const COMPETENCIES: Competency[] = [
  {
    title: 'AI quality and safety',
    icon: 'quality',
    source: 'AT&T',
    proof:
      "Defined the assistant's KPI framework: **15+ metrics** in Power BI and SQL, including **92%** intent-recognition accuracy. Low-confidence answers go to human review, and token cost is tracked against response times.",
    skills: ['KPI frameworks', 'AI performance monitoring', 'Human-in-the-loop review', 'LLM cost and latency'],
  },
  {
    title: 'Conversation design',
    icon: 'conversation',
    source: 'AT&T',
    proof:
      'Led conversation design across **350+ intents** and **1,200+ training phrases**, with RAG-powered knowledge retrieval, for chat, voice, WhatsApp and RCS.',
    skills: ['Google CCAI', 'Dialogflow CX / ES', 'Genesys Cloud CX', 'NLP', 'Support automation'],
  },
  {
    title: 'Technical depth',
    icon: 'technical',
    source: 'Infosys · AT&T · DeviceFlex',
    proof:
      "Senior software engineer at Infosys from 2016 to 2020. Architected the REST integrations linking AT&T's AI layer to telephony and CRMs, and built DeviceFlex solo as a working **17-route** prototype.",
    skills: ['Python', 'SQL', 'Java', 'React', 'REST APIs', 'Azure'],
  },
  {
    title: 'Agile delivery at scale',
    icon: 'delivery',
    source: 'AT&T · Verizon',
    proof:
      'Own backlog and sprint planning for **2 squads (18 developers)** in SAFe at **95%** sprint-commitment reliability. At Verizon, coordinated 4 concurrent SAFe workstreams with under **4%** sprint spillover.',
    skills: ['SAFe', 'Scrum', 'Product ownership', 'BRD / PRD', 'Data-flow mapping'],
  },
  {
    title: 'Stakeholders and budgets',
    icon: 'stakeholders',
    source: 'AT&T · Verizon',
    proof:
      'Aligned the AI roadmap with CX goals alongside US product owners, enterprise architects and business SMEs, helping secure a **$2.5M** FY25 budget. At Verizon, led cross-functional delivery at **94%** on time.',
    skills: ['Roadmap alignment', 'Business cases', 'Stakeholder management', 'Cross-functional leadership'],
  },
  {
    title: 'Personalization and commerce',
    icon: 'commerce',
    source: 'AT&T · Verizon',
    proof:
      "AT&T's Retail Hyper-Personalization Program lifted recommendation click-through **15%**. At Verizon, funnel analysis and A/B tests across retail, consumer and B2B shaped requirements for **15+ features**.",
    skills: ['Recommendations', 'A/B testing', 'Funnel analysis', 'Market research', 'Retail and e-commerce'],
  },
];

export const PRINCIPLES: Principle[] = [
  {
    title: 'Start with the problem',
    line: 'AI is a means, not the product.',
    inPractice:
      'At AT&T the assistant exists to absorb repetitive contacts and costly escalations, so containment, not model choice, is the headline metric.',
  },
  {
    title: 'Design for measurable outcomes',
    line: 'Every product should have a meaningful success metric.',
    inPractice:
      'The assistant runs on 15+ tracked KPIs: containment is balanced by intent accuracy, fallback rate and CSAT.',
  },
  {
    title: 'Build for production',
    line: 'Security, cost, latency, architecture and operations matter.',
    inPractice:
      'Token spend and response times are reviewed with engineering, and low-confidence answers are routed to human review.',
  },
  {
    title: 'Iterate with evidence',
    line: 'Experiments and data beat assumptions.',
    inPractice:
      'At Verizon, three-year device payment plans were piloted before scaling: $320K in pilot revenue and a 14% higher upgrade rate.',
  },
];
