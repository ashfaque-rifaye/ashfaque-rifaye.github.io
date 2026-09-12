export const SITE_URL = 'https://ashfaque-rifaye.github.io';

export const PERSON = {
  name: 'Ashfaque Rifaye',
  role: 'AI Product Leader',
  roleSeo: 'AI Product Manager',
  email: 'ashfaque_rifaye@outlook.com',
  location: 'Chennai, India',
  timezone: 'IST, UTC+5:30',
  openTo: 'Bengaluru · Hyderabad · Dubai · Remote',
  availability: 'Open to senior AI product roles',
} as const;

export const SOCIALS = {
  linkedin: 'https://www.linkedin.com/in/ashfaque-rifaye/',
  github: 'https://github.com/ashfaque-rifaye',
  email: `mailto:${PERSON.email}`,
} as const;

export const RESUME = {
  pdf: '/Ashfaque_Rifaye_Resume.pdf',
  docx: '/Ashfaque_Rifaye_Resume.docx',
  preview: '/media/resume-preview.webp',
  updated: 'September 2026',
} as const;

/* One 3D render (September 2026), cut into a 3:2 card for the hero title
   block and the About panel, and a face crop for the AI Twin. */
export const AVATAR = {
  card: '/media/avatar-card.webp', // 864 × 576
  cardSmall: '/media/avatar-card-576.webp', // 576 × 384
  face: '/media/avatar-face.webp', // 192 × 192
  alt: '3D avatar of Ashfaque Rifaye',
} as const;

export const HERO = {
  /** Headline in three parts; `mark` carries the signal underline. */
  lead: 'AI Product Leader building intelligent products that',
  mark: 'move business metrics',
  end: '.',
  supporting:
    '9+ years across software engineering, digital products and enterprise AI. I work at the intersection of product strategy, AI systems and customer experience, turning complex problems into scalable products with measurable outcomes.',
} as const;

/* Title-block metadata shown beside the hero (engineering-drawing motif). */
export const TITLE_BLOCK = [
  { key: 'Role', value: 'AI Product Manager, enterprise AI' },
  { key: 'Now', value: "Owns AT&T's GenAI virtual assistant" },
  { key: 'Based', value: `${PERSON.location} · ${PERSON.timezone}` },
  { key: 'Open to', value: PERSON.openTo },
  { key: 'Status', value: PERSON.availability },
] as const;

export const HIRE_CTA = {
  question:
    'Building an AI product, scaling an enterprise AI experience, or figuring out where AI actually creates value?',
  line: 'I work at the intersection of product strategy, AI systems and execution.',
} as const;
