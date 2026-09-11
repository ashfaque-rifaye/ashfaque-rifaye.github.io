/* Shared content shapes. All copy lives in src/content so it can be
   edited without touching layout code. Only verified facts go here;
   open items are tracked in CONTENT-TODO.md. */

export interface Metric {
  value: string;
  label: string;
  /** Where the number comes from (program, period). */
  source?: string;
}

export interface Role {
  company: string;
  track: string;
  title: string;
  unit: string;
  period: string;
  summary: string;
  outcomes: string[];
}

export interface Award {
  year: string;
  event: string;
  title: string;
  context: string;
  lead?: boolean;
}

export interface SkillGroup {
  title: string;
  items: string[];
}

export interface Capability {
  title: string;
  description: string;
  items: string[];
  glyph: 'ai' | 'enterprise' | 'strategy';
}

export interface Principle {
  title: string;
  line: string;
  inPractice: string;
}

export interface LabProject {
  slug: string;
  name: string;
  context: string;
  oneLiner: string;
  question: string;
  learned: string[];
  stack: string[];
  status: 'Live demo' | 'Prototype' | 'Hackathon build' | 'Running on this site';
  team?: boolean;
  featured?: boolean;
  links: { github?: string; demo?: string; youtube?: string };
}

export interface CaseStudyMeta {
  slug: string;
  title: string;
  subtitle: string;
  summary: string;
  role: string;
  period: string;
  proof: string[];
  tags: string[];
}

export interface WorkLedgerItem {
  name: string;
  company: string;
  result: string;
  caseStudy?: string;
}
