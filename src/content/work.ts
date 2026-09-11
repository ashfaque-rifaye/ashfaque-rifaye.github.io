import type { CaseStudyMeta, WorkLedgerItem } from './types';

export const CASE_STUDIES: CaseStudyMeta[] = [
  {
    slug: 'att-genai-virtual-assistant',
    title: 'AT&T GenAI Virtual Assistant',
    subtitle: 'Scaling enterprise conversational AI across voice, chat and messaging.',
    summary:
      'End-to-end ownership of a RAG-powered assistant on Google CCAI and Dialogflow, from conversation design and integrations to the KPI framework and roadmap.',
    role: 'Product owner',
    period: '2022 – Present',
    proof: ['1.5M+ monthly interactions', '55% containment', '28% fewer live-agent escalations', '$4.2M estimated annual savings'],
    tags: ['Conversational AI', 'RAG', 'Google CCAI', 'CRM & telephony', 'SAFe'],
  },
  {
    slug: 'verizon-digital-commerce',
    title: 'Verizon Digital Commerce',
    subtitle: 'Using customer analytics, experimentation and product strategy to improve digital commerce journeys.',
    summary:
      'Funnel analysis, A/B tests and requirements across retail, consumer and B2B, turned into five shipped changes with commercial results.',
    role: 'Consultant, Digital & Assisted Sales',
    period: '2020 – 2022',
    proof: ['$1.5M+ incremental revenue', '11% fulfillment growth', '13% less cart abandonment', '$320K pilot revenue'],
    tags: ['Funnel analysis', 'A/B testing', 'Omnichannel', 'Financing'],
  },
  {
    slug: 'ai-product-innovation',
    title: 'AI Product Innovation',
    subtitle: 'From ambiguous problem to product concept, prototype, business case and pitch.',
    summary:
      'A repeatable way of turning a vague opportunity into something people can click, told through DeviceFlex: a solo prototype with an invention disclosure behind it.',
    role: 'Product lead and builder',
    period: '2025 – 2026',
    proof: [
      'AT&T Innovation Jam · Best in Show / All Around · 2026',
      'AT&T Hackathon · 1st Place · 2025',
      'Equitech Hackathon · Most Impactful Business Solution · 2025',
      'DeviceFlex · Invention disclosure submitted · 2026',
    ],
    tags: ['0 → 1', 'Prototyping', 'AI architecture', 'Business case', 'IP'],
  },
];

export const caseStudyBySlug = (slug: string) => CASE_STUDIES.find((c) => c.slug === slug);

export const OTHER_WORK: WorkLedgerItem[] = [
  { name: 'AI Performance Analytics Suite', company: 'AT&T', result: 'Real-time monitoring of 15+ KPIs across 6 channels', caseStudy: 'att-genai-virtual-assistant' },
  { name: 'Retail Hyper-Personalization', company: 'AT&T', result: '15% uplift in product recommendation click-through' },
  { name: 'Omni Universal Cart', company: 'Verizon', result: '11% more orders fulfilled, 13% less cart abandonment', caseStudy: 'verizon-digital-commerce' },
  { name: 'Three-Year Device Payment Plans', company: 'Verizon', result: '$320K pilot revenue, 14% higher upgrade rate', caseStudy: 'verizon-digital-commerce' },
  { name: 'Early Termination Fee Redesign', company: 'Verizon', result: '22% fewer service inquiries', caseStudy: 'verizon-digital-commerce' },
  { name: 'Hum+ Wi-Fi Plan', company: 'Verizon', result: '$100K+ ARR at a 23% attach rate', caseStudy: 'verizon-digital-commerce' },
  { name: 'Split Fulfillment', company: 'Verizon', result: 'Delivery 2.1 days faster, CSAT up 3 points', caseStudy: 'verizon-digital-commerce' },
  { name: 'Work Statement Requirement Database', company: 'Infosys · Boeing', result: '1,200+ engineers served, 99.2% uptime, $2.8M estimated annual savings' },
];
