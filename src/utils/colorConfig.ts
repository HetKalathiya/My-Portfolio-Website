// Brand Color Specifications according to CINEMATIC TECHNICAL SKILLS SECTION v2.0

export interface BrandColorSpec {
  primary: string;
  secondary: string;
  glow: string;
}

export const TECH_COLORS: Record<string, BrandColorSpec> = {
  // Frontend
  react: {
    primary: '#61DAFB',
    secondary: '#20232A',
    glow: 'rgba(97, 218, 251, 0.6)'
  },
  nextjs: {
    primary: '#FFFFFF',
    secondary: '#000000',
    glow: 'rgba(255, 255, 255, 0.4)'
  },
  javascript: {
    primary: '#F7DF1E',
    secondary: '#323330',
    glow: 'rgba(247, 223, 30, 0.6)'
  },
  typescript: {
    primary: '#3178C6',
    secondary: '#1D4D8C',
    glow: 'rgba(49, 120, 198, 0.6)'
  },
  tailwindcss: {
    primary: '#06B6D4',
    secondary: '#0F172A',
    glow: 'rgba(6, 182, 212, 0.6)'
  },

  // Backend
  nodejs: {
    primary: '#339933',
    secondary: '#1B3A1B',
    glow: 'rgba(51, 153, 51, 0.6)'
  },
  expressjs: {
    primary: '#FFFFFF',
    secondary: '#222222',
    glow: 'rgba(255, 255, 255, 0.4)'
  },
  mongodb: {
    primary: '#47A248',
    secondary: '#1A3E1A',
    glow: 'rgba(71, 162, 72, 0.6)'
  },
  python: {
    primary: '#3776AB',
    secondary: '#FFD43B',
    glow: 'rgba(55, 118, 171, 0.6)'
  },
  java: {
    primary: '#FF6B35',
    secondary: '#003D82',
    glow: 'rgba(255, 107, 53, 0.6)'
  },

  // DevOps & Tools
  docker: {
    primary: '#2496ED',
    secondary: '#134B8C',
    glow: 'rgba(36, 150, 237, 0.6)'
  },
  github: {
    primary: '#FFFFFF',
    secondary: '#1F1F1F',
    glow: 'rgba(255, 255, 255, 0.4)'
  },
  git: {
    primary: '#F1502F',
    secondary: '#5C2D0A',
    glow: 'rgba(241, 80, 47, 0.6)'
  },
  azure: {
    primary: '#0078D4',
    secondary: '#00468A',
    glow: 'rgba(0, 120, 212, 0.6)'
  },

  // AI & ML
  tensorflow: {
    primary: '#FF6F00',
    secondary: '#CC5500',
    glow: 'rgba(255, 111, 0, 0.6)'
  },

  // Languages
  c: {
    primary: '#A8B9CC',
    secondary: '#003E8E',
    glow: 'rgba(168, 185, 204, 0.5)'
  }
};

export const getTechColor = (id: string): BrandColorSpec => {
  const normalizedId = id.toLowerCase().replace(/[^a-z0-9]/g, '');
  return TECH_COLORS[normalizedId] || {
    primary: '#00F5FF',
    secondary: '#0F172A',
    glow: 'rgba(0, 245, 255, 0.6)'
  };
};
