import type { LucideIcon } from 'lucide-react';

export interface Metric {
  value: string;
  label: string;
}

export interface CaseStudy {
  role: string;
  problem: string;
  approach: string;
  outcome?: string;
  metrics: Metric[];
  stack: string[];
}

export interface WorkItem {
  icon: LucideIcon;
  title: string;
  desc: string;
  tags: string[];
  badge?: string;
  caseStudy: CaseStudy;
}

export interface Role {
  company: string;
  role: string;
  period: string;
  current?: boolean;
  summary: string;
  metrics: Metric[];
  points: string[];
  extraTitle?: string;
  extra?: string[];
  projects?: { name: string; metric: string }[];
  stack: string[];
}

export interface PersonalProject {
  name: string;
  lang: string;
  desc: string;
  tags: string[];
  github?: string;
  youtube?: string;
  featured?: boolean;
}

export interface AwardItem {
  icon: LucideIcon;
  title: string;
  year: string;
  org: string;
  desc: string;
}
