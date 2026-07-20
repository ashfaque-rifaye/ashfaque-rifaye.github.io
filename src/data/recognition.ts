import { Award, Star, Trophy } from 'lucide-react';
import type { AwardItem } from './types';

export const AWARDS: AwardItem[] = [
  {
    icon: Trophy,
    title: 'Best in Show / All Around Award',
    year: '2025',
    org: 'AT&T Innovation Jam',
    desc: '"AT&T Helios — Zero Friction Convergence: transforming the AT&T bundle experience into an AI-fueled, one-click growth engine."',
  },
  {
    icon: Trophy,
    title: 'Hackathon 1st Place Winner',
    year: '2025',
    org: 'AT&T Hackathon',
    desc: '"Hyper-Personalization of International Travel Experience" — AI-driven predictive modeling for personalized customer travel plans.',
  },
  {
    icon: Star,
    title: 'Most Impactful Business Solution',
    year: '2025',
    org: 'AT&T Hackathon',
    desc: "Awarded for the most impactful business solution idea at AT&T's annual hackathon.",
  },
  {
    icon: Award,
    title: 'Connection Award',
    year: '2023',
    org: 'AT&T CTX Team',
    desc: 'Recognized with the Virtual Assistant team for outstanding contribution by the AT&T CTX team.',
  },
  {
    icon: Award,
    title: 'Spotlight Award for Customer Excellence',
    year: '2021',
    org: 'Verizon GTS Team',
    desc: "For customer excellence and revenue impact across Verizon's consumer digital platforms.",
  },
];

export const TESTIMONIAL = {
  quote:
    'Ashfaque brought the best of innovation, product development and teamwork to our hackathon. He and his team won the Best in Show Award... His creative thinking enabled us to take a novel approach to improving an important aspect of customer experience.',
  name: 'Lynn Morgan',
  title: 'Senior Leader, AT&T',
  initials: 'LM',
} as const;
