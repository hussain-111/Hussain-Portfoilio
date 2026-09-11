export type RoleCategory = 
  | 'All Roles'
  | 'Data Engineer'
  | 'AI Engineer'
  | 'Software Engineer';

export type TechStackCategory =
  | 'All Stacks'
  | 'Big Data & Pipelines'
  | 'GenAI & Agents';

export interface Project {
  id: string;
  title: string;
  tagline: string;
  summary: string;
  fullDescription: string;
  roles: ('AI Engineer' | 'Data Engineer' | 'Software Engineer')[];
  techCategory: 'GenAI & Agents' | 'Big Data & Pipelines';
  technologies: string[];
  metrics: string[];
  architectureHighlights: string[];
  githubUrl: string;
  liveUrl?: string;
  featured: boolean;
  model3DType: 'agent' | 'pipeline' | 'neural' | 'cube';
  workflowDemo?: {
    type: 'agent_flow' | 'sql_pipeline' | 'rag_trace' | 'stream_stats';
    steps: { title: string; detail: string; status: 'completed' | 'active' | 'pending' }[];
    codeSnippet?: string;
  };
}

export interface ExperienceItem {
  company: string;
  client?: string;
  role: string;
  period: string;
  location: string;
  type: string;
  description: string;
  highlights: string[];
  techStack: string[];
}

export interface SkillGroup {
  category: string;
  iconName: string;
  color: string;
  description: string;
  skills: { name: string; proficiency: number; level: string; highlighted?: boolean }[];
}

export interface CertificationItem {
  name: string;
  issuer: string;
  category: 'AI / GenAI' | 'Cloud' | 'Data Engineering' | 'Core';
  year: string;
  credentialId?: string;
  badgeColor: string;
}

export interface AchievementItem {
  title: string;
  organization: string;
  year: string;
  description: string;
  badge: string;
}
