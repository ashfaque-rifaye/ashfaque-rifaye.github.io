import type { SkillGroup } from './types';

/* Only skills that support the target identity. No logo wall. */
export const SKILL_GROUPS: SkillGroup[] = [
  {
    title: 'AI / GenAI',
    items: ['RAG', 'LLMs', 'Conversational AI', 'Agentic AI', 'NLP', 'Google CCAI', 'Dialogflow CX / ES', 'Genesys Cloud CX'],
  },
  {
    title: 'Product',
    items: ['Product strategy', 'Product ownership', 'Roadmaps', 'Discovery', 'Experimentation', 'Agile / SAFe'],
  },
  {
    title: 'Technical',
    items: ['Python', 'SQL', 'REST APIs', 'Azure', 'React', 'Java', 'Data systems'],
  },
  {
    title: 'Analytics',
    items: ['Power BI', 'KPI frameworks', 'Funnel analysis', 'A/B testing'],
  },
  {
    title: 'Business / Domain',
    items: ['Telecom', 'Retail', 'E-commerce', 'Customer experience', 'Omnichannel'],
  },
];
