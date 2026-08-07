import { getTechColor, type BrandColorSpec } from '../utils/colorConfig';

export type EntranceDirection = 'left' | 'right' | 'top' | 'bottom' | 'behind';

export interface SkillItem {
  id: string;
  name: string;
  category: 'Frontend' | 'Backend' | 'Languages' | 'DevOps & Cloud' | 'AI & ML';
  iconName: string;
  proficiency: number; // 0 - 100%
  size: 'sm' | 'md' | 'lg';
  entranceDirection: EntranceDirection;
  brandColors: BrandColorSpec;
  description: string;
  highlights: string[];
  // Legacy compatibility fields
  glowColor?: string;
  borderColor?: string;
}

// Backwards compatibility alias
export type FloatingSkill = SkillItem;

export interface SkillCategoryGroup {
  id: string;
  title: string;
  badge: string;
  skills: SkillItem[];
}

export const ALL_SKILLS_DATA: SkillItem[] = [
  // Frontend
  {
    id: 'react',
    name: 'React.js',
    category: 'Frontend',
    iconName: 'Atom',
    proficiency: 95,
    size: 'lg',
    entranceDirection: 'left',
    brandColors: getTechColor('react'),
    glowColor: getTechColor('react').primary,
    borderColor: getTechColor('react').glow,
    description: 'Declarative component architecture, custom hooks, Fiber reconciliation, and state management.',
    highlights: ['React 19 Concurrent Features', 'Custom Performance Hooks', 'Design System Architecture']
  },
  {
    id: 'nextjs',
    name: 'Next.js',
    category: 'Frontend',
    iconName: 'Globe',
    proficiency: 92,
    size: 'lg',
    entranceDirection: 'bottom',
    brandColors: getTechColor('nextjs'),
    glowColor: getTechColor('nextjs').primary,
    borderColor: getTechColor('nextjs').glow,
    description: 'Server Components, SSR/SSG rendering, App Router, and full-stack edge API routing.',
    highlights: ['App Router & Server Actions', 'SEO & Core Web Vitals Optimization', 'Incremental Static Regeneration']
  },
  {
    id: 'typescript',
    name: 'TypeScript',
    category: 'Frontend',
    iconName: 'Code2',
    proficiency: 94,
    size: 'lg',
    entranceDirection: 'right',
    brandColors: getTechColor('typescript'),
    glowColor: getTechColor('typescript').primary,
    borderColor: getTechColor('typescript').glow,
    description: 'Strict type safety, generics, utility types, compile-time validation, and modern ES features.',
    highlights: ['Advanced Generic Patterns', 'AST & Type Guards', 'Zero-runtime Cost Design']
  },
  {
    id: 'javascript',
    name: 'JavaScript',
    category: 'Frontend',
    iconName: 'FileCode',
    proficiency: 96,
    size: 'lg',
    entranceDirection: 'top',
    brandColors: getTechColor('javascript'),
    glowColor: getTechColor('javascript').primary,
    borderColor: getTechColor('javascript').glow,
    description: 'ES6+ ECMAScript features, async/await event loop engineering, and DOM API optimization.',
    highlights: ['Async Event Loop Tuning', 'Canvas & WebGL Animation', 'Memory Leak Profiling']
  },
  {
    id: 'tailwindcss',
    name: 'Tailwind CSS',
    category: 'Frontend',
    iconName: 'Palette',
    proficiency: 95,
    size: 'md',
    entranceDirection: 'behind',
    brandColors: getTechColor('tailwindcss'),
    glowColor: getTechColor('tailwindcss').primary,
    borderColor: getTechColor('tailwindcss').glow,
    description: 'Utility-first CSS styling, custom design tokens, dark mode systems, and responsive layouts.',
    highlights: ['Custom JIT Config', 'Responsive Fluid Typography', 'Design System Integration']
  },

  // Backend
  {
    id: 'nodejs',
    name: 'Node.js',
    category: 'Backend',
    iconName: 'Cpu',
    proficiency: 90,
    size: 'lg',
    entranceDirection: 'left',
    brandColors: getTechColor('nodejs'),
    glowColor: getTechColor('nodejs').primary,
    borderColor: getTechColor('nodejs').glow,
    description: 'Non-blocking I/O event loops, microservices, stream pipelines, and high-concurrency servers.',
    highlights: ['REST & GraphQL Microservices', 'Stream Processing Pipelines', 'JWT & OAuth Authentication']
  },
  {
    id: 'expressjs',
    name: 'Express.js',
    category: 'Backend',
    iconName: 'Workflow',
    proficiency: 88,
    size: 'md',
    entranceDirection: 'bottom',
    brandColors: getTechColor('expressjs'),
    glowColor: getTechColor('expressjs').primary,
    borderColor: getTechColor('expressjs').glow,
    description: 'Minimalist web framework for building resilient HTTP APIs, middleware chains, and security headers.',
    highlights: ['Custom Security Middleware', 'Rate Limiting & Caching', 'API Route Modularization']
  },
  {
    id: 'mongodb',
    name: 'MongoDB',
    category: 'Backend',
    iconName: 'Database',
    proficiency: 86,
    size: 'lg',
    entranceDirection: 'right',
    brandColors: getTechColor('mongodb'),
    glowColor: getTechColor('mongodb').primary,
    borderColor: getTechColor('mongodb').glow,
    description: 'NoSQL document schemas, aggregation pipelines, indexing strategies, and database sharding.',
    highlights: ['Complex Aggregation Pipelines', 'Index Performance Optimization', 'Mongoose ODM Modeling']
  },

  // Languages
  {
    id: 'python',
    name: 'Python',
    category: 'Languages',
    iconName: 'Terminal',
    proficiency: 92,
    size: 'lg',
    entranceDirection: 'top',
    brandColors: getTechColor('python'),
    glowColor: getTechColor('python').primary,
    borderColor: getTechColor('python').glow,
    description: 'Data structures, AI script automation, data analysis, model training, and backend APIs.',
    highlights: ['FastAPI & Flask Backends', 'NumPy & Pandas Pipelines', 'AI Model Integration']
  },
  {
    id: 'java',
    name: 'Java',
    category: 'Languages',
    iconName: 'Layers',
    proficiency: 85,
    size: 'md',
    entranceDirection: 'behind',
    brandColors: getTechColor('java'),
    glowColor: getTechColor('java').primary,
    borderColor: getTechColor('java').glow,
    description: 'Object-Oriented Programming, Spring Boot APIs, enterprise architecture, and multi-threading.',
    highlights: ['Spring Boot Microservices', 'Concurrency & Executor Pools', 'Clean Architecture Patterns']
  },
  {
    id: 'c',
    name: 'C Language',
    category: 'Languages',
    iconName: 'Box',
    proficiency: 82,
    size: 'md',
    entranceDirection: 'left',
    brandColors: getTechColor('c'),
    glowColor: getTechColor('c').primary,
    borderColor: getTechColor('c').glow,
    description: 'Low-level memory management, pointers, system algorithms, and performance computing.',
    highlights: ['Manual Pointer Math', 'Dynamic Memory Management', 'Data Structure Implementations']
  },

  // DevOps & Cloud
  {
    id: 'docker',
    name: 'Docker',
    category: 'DevOps & Cloud',
    iconName: 'Box',
    proficiency: 85,
    size: 'md',
    entranceDirection: 'bottom',
    brandColors: getTechColor('docker'),
    glowColor: getTechColor('docker').primary,
    borderColor: getTechColor('docker').glow,
    description: 'Containerization, multi-stage Dockerfiles, Docker Compose orchestrations, and lightweight builds.',
    highlights: ['Multi-Stage Production Builds', 'Container Isolation & Security', 'Docker Compose Local Stacks']
  },
  {
    id: 'github',
    name: 'GitHub',
    category: 'DevOps & Cloud',
    iconName: 'GitBranch',
    proficiency: 94,
    size: 'md',
    entranceDirection: 'right',
    brandColors: getTechColor('github'),
    glowColor: getTechColor('github').primary,
    borderColor: getTechColor('github').glow,
    description: 'CI/CD GitHub Actions pipelines, code review workflows, issue tracking, and automated releases.',
    highlights: ['Automated CI/CD Pipelines', 'Branch Protection Protocols', 'Package Registry Integration']
  },
  {
    id: 'git',
    name: 'Git',
    category: 'DevOps & Cloud',
    iconName: 'GitPullRequest',
    proficiency: 95,
    size: 'md',
    entranceDirection: 'top',
    brandColors: getTechColor('git'),
    glowColor: getTechColor('git').primary,
    borderColor: getTechColor('git').glow,
    description: 'Distributed version control, rebase workflows, cherry-picking, and conflict resolution.',
    highlights: ['Interactive Rebase Tuning', 'Gitflow & Trunk Development', 'Submodules & Trees']
  },
  {
    id: 'azure',
    name: 'Microsoft Azure',
    category: 'DevOps & Cloud',
    iconName: 'Cloud',
    proficiency: 80,
    size: 'md',
    entranceDirection: 'behind',
    brandColors: getTechColor('azure'),
    glowColor: getTechColor('azure').primary,
    borderColor: getTechColor('azure').glow,
    description: 'Cloud App Services, Blob storage, serverless Azure Functions, and IAM security.',
    highlights: ['App Service Deployments', 'Azure Functions Serverless', 'Cloud Storage & CDN Setup']
  },

  // AI & ML
  {
    id: 'tensorflow',
    name: 'TensorFlow',
    category: 'AI & ML',
    iconName: 'Sparkles',
    proficiency: 84,
    size: 'lg',
    entranceDirection: 'left',
    brandColors: getTechColor('tensorflow'),
    glowColor: getTechColor('tensorflow').primary,
    borderColor: getTechColor('tensorflow').glow,
    description: 'Neural network model design, deep learning inference, image recognition, and TensorBoard debugging.',
    highlights: ['Custom Keras Model Tuning', 'Model Export for Web Inference', 'Hyperparameter Optimization']
  }
];

export const CATEGORIZED_SKILLS_GROUPS: SkillCategoryGroup[] = [
  {
    id: 'frontend',
    title: 'Frontend Engineering',
    badge: 'UI & INTERFACE ARCHITECTURE',
    skills: ALL_SKILLS_DATA.filter((s) => s.category === 'Frontend')
  },
  {
    id: 'backend',
    title: 'Backend & Infrastructure',
    badge: 'SERVER & DATA SYSTEMS',
    skills: ALL_SKILLS_DATA.filter((s) => s.category === 'Backend')
  },
  {
    id: 'languages',
    title: 'Programming Languages',
    badge: 'CORE COMPUTING',
    skills: ALL_SKILLS_DATA.filter((s) => s.category === 'Languages')
  },
  {
    id: 'devops',
    title: 'DevOps & Cloud Tools',
    badge: 'CONTAINERS & CI/CD',
    skills: ALL_SKILLS_DATA.filter((s) => s.category === 'DevOps & Cloud')
  },
  {
    id: 'aiml',
    title: 'AI & Machine Learning',
    badge: 'NEURAL NETWORKS & DEEP LEARNING',
    skills: ALL_SKILLS_DATA.filter((s) => s.category === 'AI & ML')
  }
];

export const CATEGORIZED_SKILLS_DATA = CATEGORIZED_SKILLS_GROUPS;
