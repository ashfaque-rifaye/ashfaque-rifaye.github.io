export const SOCIALS = {
  github: 'https://github.com/ashfaque-rifaye',
  linkedin: 'https://www.linkedin.com/in/ashfaque-rifaye/',
  email: 'ashfaque_rifaye@outlook.com',
} as const;

export const RESUME_PATH = '/Ashfaque_Rifaye_Resume.pdf';

/* Drop a photo in /public (e.g. public/avatar.jpg) and set to '/avatar.jpg'. */
export const AVATAR_SRC = '';

export const NAV = [
  { id: 'work', label: 'Work' },
  { id: 'experience', label: 'Experience' },
  { id: 'expertise', label: 'Expertise' },
  { id: 'recognition', label: 'Recognition' },
  { id: 'about', label: 'About' },
  { id: 'contact', label: 'Contact' },
] as const;

export type SectionId = (typeof NAV)[number]['id'] | 'hero';

export const HERO = {
  headline: ['Product manager for the', 'AI era.'],
  sub: "I'm Ashfaque Rifaye — AI Product Manager & Technical Business Analyst. Nine years turning business strategy into shipped AI products across telecom, retail, and customer experience. Today I own AT&T's GenAI virtual assistant, serving 1.5M+ customer conversations every month.",
  location: 'Chennai, India',
  locationNote: 'Open to BLR · HYD · Dubai · Remote',
  available: true,
} as const;

export const HERO_METRICS = [
  { value: '9+', label: 'years in product & AI' },
  { value: '1.5M+', label: 'monthly AI interactions' },
  { value: '$4.2M', label: 'saved annually' },
  { value: '5', label: 'industry awards' },
] as const;
