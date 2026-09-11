import type { Award } from './types';

export const AWARDS: Award[] = [
  {
    year: '2026',
    event: 'AT&T Innovation Jam',
    title: 'Best in Show / All Around',
    context: 'AT&T Helios, Zero Friction Convergence: an AI-fueled, one-click bundle experience.',
    lead: true,
  },
  {
    year: '2025',
    event: 'AT&T Hackathon',
    title: '1st Place',
    context: 'Hyper-personalization of the international travel experience.',
  },
  {
    year: '2025',
    event: 'Equitech Hackathon',
    title: 'Most Impactful Business Solution',
    context: 'Judged the most impactful business solution of the event.',
  },
  {
    year: '2023',
    event: 'AT&T Connection Award',
    title: 'Virtual Assistant team',
    context: "Recognized by AT&T's Consumer Technology & Experience organization.",
  },
  {
    year: '2021',
    event: 'Verizon Spotlight Award',
    title: 'Customer Excellence',
    context: "Recognized by Verizon's GTS team.",
  },
];

export const TESTIMONIAL = {
  quote:
    'Ashfaque brought the best of innovation, product development and teamwork to our hackathon. He and his team won the Best in Show Award… His creative thinking enabled us to take a novel approach to improving an important aspect of customer experience.',
  name: 'Lynn Morgan',
  title: 'Senior Leader, AT&T',
} as const;
