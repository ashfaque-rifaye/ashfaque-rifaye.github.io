export const EXPERTISE_GROUPS = [
  {
    title: 'AI & GenAI',
    items: ['Generative AI', 'RAG', 'Google CCAI', 'Dialogflow CX', 'LLMs', 'NLP', 'Conversation Design', 'Prompt Engineering', 'Genesys CX'],
  },
  {
    title: 'Product & Strategy',
    items: ['Product Ownership', 'Roadmap Strategy', 'SAFe Agile', 'Scrum', 'BRD / PRD', 'KPI Frameworks', 'A/B Testing', 'Stakeholder Management'],
  },
  {
    title: 'Data & Engineering',
    items: ['Python', 'SQL', 'Power BI', 'React', 'REST APIs', 'Git', 'Jira', 'Confluence', 'Azure'],
  },
] as const;

export const AI_TOOLS = [
  'GitHub Copilot', 'Claude', 'Lovable', 'Hugging Face', 'Perplexity AI',
  'Microsoft Copilot', 'Emergent', 'MixPanel',
] as const;

export const AI_MODELS = [
  { name: 'Claude', org: 'Anthropic', models: ['Opus', 'Sonnet', 'Haiku'] },
  { name: 'ChatGPT', org: 'OpenAI', models: ['GPT-4o', 'o1', 'GPT-5'] },
  { name: 'Gemini', org: 'Google', models: ['1.5 Pro', '1.5 Flash', '2.0'] },
  { name: 'Video & OSS', org: 'Specialized', models: ['Runway', 'Pika', 'DeepSeek'] },
] as const;

export const CERTS = [
  { name: 'SAFe 6 Lean Portfolio Manager', year: '2024' },
  { name: 'SAFe 6 Agilist (SA & PO/PM)', year: '2023' },
  { name: 'Azure AI Fundamentals', year: '2023' },
  { name: 'Certified Scrum Product Owner', year: '2022' },
] as const;
