import type { Capability, Principle } from './types';

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
