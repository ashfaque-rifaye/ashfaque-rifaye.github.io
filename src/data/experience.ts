import type { Role } from './types';

export const EXPERIENCE: Role[] = [
  {
    company: 'AT&T Communications Services India',
    role: 'AI Technical Business Solution Analyst (PM) · Consumer Technology & Experience',
    period: 'Aug 2022 — Present',
    current: true,
    summary:
      "End-to-end product owner of AT&T's GenAI virtual assistant on Google CCAI / Dialogflow — omnichannel across chat, voice, WhatsApp, and RCS for the consumer line of business.",
    metrics: [
      { value: '1.5M+', label: 'monthly interactions' },
      { value: '55%', label: 'containment rate' },
      { value: '$4.2M', label: 'annual savings' },
      { value: '92%', label: 'intent accuracy' },
    ],
    points: [
      'Led end-to-end product ownership of the GenAI virtual assistant, scaling omnichannel deployment across chat, voice, WhatsApp, and RCS to 1.5M+ monthly customer interactions.',
      'Drove AI-powered automation through conversation design — 350+ intents, 1,200+ training phrases, and RAG-powered knowledge retrieval — reaching 55% containment, cutting live-agent escalations 28%, and saving an estimated $4.2M annually.',
      'Architected the integration ecosystem connecting the AI layer with telephony infrastructure and backend CRMs via REST APIs, reducing average handle time by 32 seconds per interaction.',
      'Delivered technical documentation — process flows, data-flow diagrams, and BRDs aligned to enterprise AI strategy — supporting a 12-person cross-functional team across engineering, UX, and operations.',
      'Ran Agile delivery in SAFe, owning backlog and sprint planning for 2 squads (18 developers) with 95% sprint commitment reliability via Jira and Confluence.',
      'Built Power BI / SQL dashboards tracking 15+ KPIs — containment, CSAT, 92% intent recognition accuracy, fallback rates — improving NPS by 8 points.',
      'Partnered with US stakeholders — product owners, enterprise architects, business SMEs — to align the AI roadmap with CX objectives, securing $2.5M budget for FY25 enhancements.',
    ],
    extraTitle: 'AI innovation',
    extra: [
      'Architected a Retrieval-Augmented Generation (RAG) system to automate knowledge retrieval for chatbots.',
      'Rapid-prototyped AI features and use cases to demo to business stakeholders.',
      'Established human-in-the-loop feedback: low-confidence AI responses flagged for manual review.',
      'Monitored token usage and API cost against performance; worked with engineers to optimize GenAI response times.',
    ],
    stack: ['Google CCAI', 'Dialogflow CX', 'RAG', 'REST APIs', 'Power BI', 'SQL', 'Jira', 'SAFe'],
  },
  {
    company: 'Verizon Data Services',
    role: 'Consultant · Digital & Assisted Sales, Verizon Consumer Group',
    period: 'Mar 2020 — Aug 2022',
    summary:
      "Product consulting across Verizon's digital ecosystem — funnel analysis, A/B testing, and cross-functional delivery over retail, consumer, and B2B platforms.",
    metrics: [
      { value: '$1.5M+', label: 'incremental revenue FY21' },
      { value: '15+', label: 'features shipped' },
      { value: '94%', label: 'on-time delivery' },
    ],
    points: [
      "Delivered actionable insights through funnel analysis, A/B testing, and market research across 3 lines of business, informing BRDs/PRDs for 15+ features in Verizon's digital ecosystem.",
      'Led cross-functional delivery with UX, data science, and product teams — 94% on-time delivery and $1.5M+ incremental revenue in FY21.',
      'Managed end-to-end execution across retail, consumer, and B2B platforms, coordinating 8–12 stakeholders including Scrum Masters, RTEs, and engineering in SAFe.',
      'Facilitated Agile ceremonies for 4 concurrent workstreams, holding sprint spillover under 4%.',
    ],
    extraTitle: 'High-impact projects',
    projects: [
      { name: 'Hum+ Wi-Fi Plan', metric: '$100K+ ARR · 23% attach rate' },
      { name: 'Omni Universal Cart', metric: '+11% order growth · −13% abandonment' },
      { name: 'Split Fulfillment', metric: '2.1 days faster delivery · +3 CSAT pts' },
      { name: 'ETF Redesign', metric: '−22% service inquiries' },
      { name: '3-Year Device Payment', metric: '$320K pilot revenue · 14% upgrade rate' },
    ],
    stack: ['A/B Testing', 'Funnel Analytics', 'BRD/PRD', 'SAFe', 'E-Commerce'],
  },
  {
    company: 'Infosys',
    role: 'Senior Software Engineer',
    period: 'May 2016 — Feb 2020',
    summary:
      'Full-stack engineering for Boeing: modernized the Work Statement Requirement Database serving 1,200+ maintenance engineers across 5 facilities.',
    metrics: [
      { value: '$2.8M', label: 'annual savings' },
      { value: '99.2%', label: 'uptime post-launch' },
      { value: '6', label: 'major releases' },
    ],
    points: [
      'Modernized the legacy Work Statement Requirement Database serving 1,200+ maintenance engineers across 5 Boeing facilities, integrating REST APIs from disparate sources to centralize aircraft maintenance work statements.',
      'Led full-stack development — data encapsulation, API orchestration, master data management, workflow automation — across 6 major releases in 18 months.',
      'Coordinated UX, backend/frontend engineers, and DBAs to mitigate 40+ critical risks, holding 99.2% uptime post-launch.',
      'Cut average incident downtime 40% (8h → 4.8h) through rapid root-cause analysis, and raised data-processing throughput 30% (12K → 15.6K records/day).',
      'Improved maintenance scheduling efficiency 25%, enabling faster aircraft turnaround — an estimated $2.8M saved annually in operational delays.',
    ],
    stack: ['Java 8', 'Spring Boot', 'React', 'Angular', 'PostgreSQL', 'Oracle', 'Python'],
  },
];

export const EDUCATION = {
  degree: 'B.E. Mechanical Engineering — Distinction (CGPA 8.596)',
  school: 'Velammal Engineering College, Anna University',
  period: '2012 – 2016',
} as const;
