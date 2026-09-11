import type { Role } from './types';

/* Career trajectory: deliberately short. Full detail lives in the résumé. */
export const ROLES: Role[] = [
  {
    company: 'AT&T',
    track: 'Enterprise AI product',
    title: 'AI Technical Business Analyst (Product Manager)',
    unit: 'Consumer Technology & Experience',
    period: '2022 – Present',
    summary:
      "End-to-end product owner of AT&T's GenAI virtual assistant across chat, voice, WhatsApp and RCS.",
    outcomes: [
      '1.5M+ monthly interactions at 55% containment',
      '$4.2M estimated annual savings; $2.5M FY25 budget secured',
    ],
  },
  {
    company: 'Verizon',
    track: 'Digital product & consulting',
    title: 'Consultant, Digital & Assisted Sales',
    unit: 'Verizon Consumer Group',
    period: '2020 – 2022',
    summary:
      'Funnel analysis, experiments and requirements across retail, consumer and B2B commerce journeys.',
    outcomes: ['$1.5M+ incremental revenue in FY21', '15+ features shipped at 94% on-time delivery'],
  },
  {
    company: 'Infosys',
    track: 'Software engineering',
    title: 'Senior Software Engineer',
    unit: 'Client: Boeing',
    period: '2016 – 2020',
    summary:
      "Full-stack modernization of Boeing's Work Statement Requirement Database for 1,200+ maintenance engineers.",
    outcomes: ['6 major releases, 99.2% uptime after launch', '$2.8M estimated annual savings from 25% faster scheduling'],
  },
];

export const EDUCATION = {
  degree: 'B.E., Mechanical Engineering',
  school: 'Velammal Engineering College, Anna University',
  period: '2012 – 2016',
  note: 'Distinction, CGPA 8.596',
} as const;

export const CERTIFICATIONS = [
  { name: 'SAFe 6 Lean Portfolio Manager', year: '2024' },
  { name: 'SAFe 6 Agilist', year: '2023' },
  { name: 'SAFe 6 Product Owner / Product Manager', year: '2023' },
  { name: 'Microsoft Azure AI Fundamentals', year: '2023' },
  { name: 'Certified Scrum Product Owner (CSPO)', year: '2022' },
] as const;
