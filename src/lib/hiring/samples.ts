/* Sample roles for trying the Hiring Agent in one click. Fictional
   companies; requirements typical of real postings. */
export const SAMPLE_ROLES = [
  {
    id: 'conv-ai',
    label: 'Senior AI PM, Conversational AI',
    jd: `Senior AI Product Manager, Conversational AI
Contoso Telecom · Bengaluru or remote

About the role
You will own the roadmap for our customer-care virtual assistant across chat, voice and messaging, used by millions of customers every month.

What you'll do
- Define product strategy and roadmap for GenAI-powered customer service experiences
- Improve containment and reduce escalations while raising CSAT and NPS
- Partner with engineering, data science and operations to ship LLM and RAG features safely
- Design experiments (A/B tests) and define the KPIs that prove impact
- Drive agile delivery with cross-functional squads and communicate with executive stakeholders

Requirements
- 6+ years of product management experience, including AI or ML products
- Hands-on experience with conversational AI platforms (Dialogflow, CCAI or similar)
- Working knowledge of large language models, retrieval-augmented generation and evaluation
- Strong analytics skills: SQL, dashboards, funnel analysis
- Experience integrating with CRM and telephony platforms

Nice to have
- Telecom domain experience
- Experience with Google Cloud`,
  },
  {
    id: 'agents',
    label: 'PM, GenAI Agents Platform',
    jd: `Product Manager, GenAI Agents Platform
Northwind Cloud · Hyderabad

We're looking for a technical product manager to build the platform our customers use to create AI agents.

Responsibilities
- Own the agent orchestration roadmap: tool calling, memory and multi-agent workflows
- Define evaluation and observability for LLM agents in production (evals, hallucination and quality metrics)
- Work with developers on APIs, SDKs and developer experience
- Set guardrails, safety and responsible AI policies with legal and security
- Prioritize a platform backlog and ship in weekly releases

Qualifications
- 5+ years in product management, ideally on developer or platform products
- Technical background; computer science degree preferred
- Experience with AWS or other major cloud platforms
- Excellent written communication

Nice to have
- Experience managing a team of product managers
- Machine learning fundamentals`,
  },
  {
    id: 'commerce',
    label: 'AI Product Owner, Digital Commerce',
    jd: `AI Product Owner, Digital Commerce
Fabrikam Retail · Dubai

About the role
Lead AI-driven personalization and checkout improvements across our omnichannel commerce platform.

What you'll do
- Own the backlog for personalization and recommendations on web and mobile app
- Run A/B tests on conversion, cart and checkout journeys
- Translate business goals into requirements, user stories and acceptance criteria in a SAFe release train
- Build business cases with revenue and ROI impact for leadership
- Track KPIs in Power BI and share insights with stakeholders

Requirements
- 4+ years as a product owner or product manager in e-commerce or retail
- Experience with experimentation and product analytics
- Strong stakeholder management

Preferred
- MBA
- Experience with generative AI in customer experience`,
  },
] as const;
