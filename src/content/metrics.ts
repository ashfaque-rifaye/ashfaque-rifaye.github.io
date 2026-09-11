import type { Metric } from './types';

const VA = 'AT&T GenAI Virtual Assistant';

/* Home: proof immediately below the hero. The first four are primary. */
export const IMPACT_PRIMARY: Metric[] = [
  { value: '1.5M+', label: 'Monthly AI interactions', source: VA },
  { value: '$4.2M', label: 'Estimated annual operational savings', source: VA },
  { value: '28%', label: 'Reduction in live-agent escalations', source: VA },
  { value: '9+', label: 'Years across engineering, product and AI', source: 'Infosys · Verizon · AT&T' },
];

export const IMPACT_SECONDARY: Metric[] = [
  { value: '55%', label: 'Containment rate', source: VA },
  { value: '32 sec', label: 'Lower average handle time per interaction', source: VA },
  { value: '+8 pts', label: 'NPS improvement', source: VA },
  { value: '$1.5M+', label: 'Incremental revenue influenced, FY21', source: 'Verizon Digital & Assisted Sales' },
];

/* About: seniority at a glance. */
export const BY_THE_NUMBERS: Metric[] = [
  { value: '9+', label: 'Years in engineering, product and AI' },
  { value: '1.5M+', label: 'Monthly AI interactions owned' },
  { value: '$4.2M', label: 'Estimated annual savings' },
  { value: '$1.5M+', label: 'Incremental revenue influenced' },
  { value: '18', label: 'Developers across two squads' },
  { value: '55%', label: 'AI containment' },
];
