/* The evidence graph the Hiring Agent matches against. Every item is a
   verified fact from the résumé or a case study, with a link to its proof. */

export interface Evidence {
  id: string;
  title: string;
  detail: string;
  href: string;
  kind: 'Case study' | 'Role' | 'Award' | 'AI Lab' | 'Credential' | 'Demo';
  demo?: string;
}

export const EVIDENCE: Evidence[] = [
  {
    id: 'att-va',
    title: 'AT&T GenAI virtual assistant',
    detail: 'Product owner: 1.5M+ monthly interactions, 55% containment, 28% fewer escalations, ~$4.2M annual savings',
    href: '/work/att-genai-virtual-assistant/',
    kind: 'Case study',
  },
  {
    id: 'att-analytics',
    title: 'AI Performance Analytics Suite',
    detail: 'Real-time monitoring of 15+ KPIs across 6 channels (Power BI, SQL)',
    href: '/work/att-genai-virtual-assistant/',
    kind: 'Case study',
  },
  {
    id: 'att-personalization',
    title: 'Retail Hyper-Personalization, AT&T',
    detail: '15% uplift in product recommendation click-through',
    href: '/work/',
    kind: 'Role',
  },
  {
    id: 'vz-commerce',
    title: 'Verizon digital commerce',
    detail: 'Funnel analysis and A/B tests behind 15+ features; $1.5M+ incremental revenue in FY21',
    href: '/work/verizon-digital-commerce/',
    kind: 'Case study',
  },
  {
    id: 'vz-cart',
    title: 'Omni Universal Cart, Verizon',
    detail: '11% more orders fulfilled, 13% less cart abandonment',
    href: '/work/verizon-digital-commerce/',
    kind: 'Case study',
  },
  {
    id: 'vz-dpp',
    title: 'Three-Year Device Payment Plans, Verizon',
    detail: '$320K pilot revenue, 14% higher upgrade rate',
    href: '/work/verizon-digital-commerce/',
    kind: 'Case study',
  },
  {
    id: 'vz-etf',
    title: 'Early Termination Fee redesign, Verizon',
    detail: '22% fewer service inquiries',
    href: '/work/verizon-digital-commerce/',
    kind: 'Case study',
  },
  {
    id: 'vz-hum',
    title: 'Hum+ Wi-Fi add-on, Verizon',
    detail: '$100K+ ARR at a 23% attach rate',
    href: '/work/verizon-digital-commerce/',
    kind: 'Case study',
  },
  {
    id: 'vz-split',
    title: 'Split Fulfillment, Verizon',
    detail: 'Delivery 2.1 days faster, CSAT up 3 points',
    href: '/work/verizon-digital-commerce/',
    kind: 'Case study',
  },
  {
    id: 'infosys-boeing',
    title: 'Infosys, Senior Software Engineer (Boeing)',
    detail: 'Modernized a requirements database for 1,200+ engineers; 6 releases, 99.2% uptime',
    href: '/about/',
    kind: 'Role',
  },
  {
    id: 'deviceflex',
    title: 'DeviceFlex, AT&T Sprint-a-thon 2026',
    detail: 'Solo 0→1 prototype: vision-model claims, deterministic decisions; invention disclosure submitted',
    href: '/work/ai-product-innovation/',
    kind: 'Case study',
    demo: 'deviceflex',
  },
  {
    id: 'helios',
    title: 'AT&T Innovation Jam 2026, Best in Show',
    detail: 'AT&T Helios: a one-click converged bundle experience',
    href: '/work/ai-product-innovation/',
    kind: 'Award',
  },
  {
    id: 'hackathon-travel',
    title: 'AT&T Hackathon 2025, 1st place',
    detail: 'Hyper-personalized international travel experience',
    href: '/about/',
    kind: 'Award',
  },
  {
    id: 'equitech',
    title: 'Equitech Hackathon 2025',
    detail: 'Most Impactful Business Solution',
    href: '/about/',
    kind: 'Award',
  },
  {
    id: 'crosscheck',
    title: 'Crosscheck',
    detail: 'Agent that audits enterprise knowledge for contradictions, with citations',
    href: '/lab/#crosscheck',
    kind: 'AI Lab',
  },
  {
    id: 'climatwin',
    title: 'ClimaTwin',
    detail: 'Urban climate decision engine on Gemini, BigQuery ML and Earth Engine; live demo',
    href: '/lab/#climatwin',
    kind: 'Demo',
    demo: 'climatwin',
  },
  {
    id: 'nebulax',
    title: 'NebulaX',
    detail: 'Self-correcting agent swarm with human conflict resolution and cost metering',
    href: '/lab/#nebulax',
    kind: 'Demo',
    demo: 'nebulax',
  },
  {
    id: 'matchday',
    title: 'MatchDay Ops',
    detail: 'Explainable GenAI operations: the model only where language needs it',
    href: '/lab/#matchday-ops',
    kind: 'AI Lab',
  },
  {
    id: 'fourcast',
    title: 'FourCast (team)',
    detail: 'Grounded video-captioning agent with a cross-model judge',
    href: '/lab/#fourcast',
    kind: 'AI Lab',
  },
  {
    id: 'ai-twin',
    title: 'This site: AI Twin and Hiring Agent',
    detail: 'Grounded assistant with allowlisted actions; agent with deterministic scoring',
    href: '/agent/',
    kind: 'AI Lab',
  },
  {
    id: 'certs',
    title: 'SAFe 6 LPM, Agilist, PO/PM; CSPO; Azure AI Fundamentals',
    detail: 'Certified 2022 to 2024',
    href: '/about/',
    kind: 'Credential',
  },
  {
    id: 'education',
    title: 'B.E. Mechanical Engineering',
    detail: 'Velammal Engineering College, Anna University; distinction',
    href: '/about/',
    kind: 'Credential',
  },
];

export const evidenceById = (id: string) => EVIDENCE.find((e) => e.id === id);
