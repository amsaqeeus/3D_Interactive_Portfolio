export interface ProjectItem {
  id: string;
  title: string;
  category: string;
  tagline: string;
  description: string;
  techStack: string[];
  features: string[];
  metrics?: string;
  githubUrl?: string;
  demoUrl?: string;
  securityRating: string;
}

export interface ExperienceItem {
  id: string;
  company: string;
  role: string;
  period: string;
  location: string;
  type: string;
  summary: string;
  keyAchievements: string[];
  technologies: string[];
  badgeColor: string;
}

export interface SkillCategory {
  categoryName: string;
  iconName: string;
  skills: {
    name: string;
    level: number; // 0 - 100
    category: string;
    yearsOrDepth: string;
    specialty?: string;
  }[];
}

export interface EducationItem {
  degree: string;
  institution: string;
  period: string;
  location: string;
  highlight: string;
  details: string[];
}

export interface CertificationItem {
  title: string;
  issuer: string;
  year: string;
  credentialId?: string;
  badgeCode: string;
}

export interface StationLocation {
  id: string;
  name: string;
  label: string;
  icon: string;
  color: string;
  position: [number, number, number]; // [x, y, z]
  radius: number;
  type: 'about' | 'projects' | 'experience' | 'skills' | 'certs' | 'contact' | 'arcade';
}

export interface PlayerStats {
  hp: number;
  maxHp: number;
  level: number;
  exp: number;
  maxExp: number;
  collectedBits: number;
  totalBits: number;
  discoveredStations: string[];
  hacksCompleted: number;
}
