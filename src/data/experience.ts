export interface ExperienceDocument {
  title: string;
  url: string;
  type: 'offer_letter' | 'certificate';
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  location: string;
  description: string;
  achievements: string[];
  techStack: string[];
  documents?: ExperienceDocument[];
}

export const EXPERIENCE_DATA: Experience[] = [
  {
    id: 'exp-technoapp-internship',
    role: 'Web Developer Intern',
    company: 'TechnoApp Solution Private Limited',
    period: 'May 2026 — June 2026',
    location: 'Surat, Gujarat, India',
    description: 'Worked as a Web Developer Intern in the Development Team at TechnoApp Solution, building result-oriented web solutions, responsive UI components, and contributing to core client applications with practical understanding and attention to detail.',
    achievements: [
      'Successfully completed 1-month Web Development internship with outstanding performance feedback.',
      'Developed and optimized responsive web interfaces, adhering to modern UI/UX standards and clean code principles.',
      'Collaborated with the core development team to deliver result-oriented web applications on schedule.'
    ],
    techStack: ['HTML5', 'CSS3', 'JavaScript', 'React', 'TypeScript', 'Web Development'],
    documents: [
      {
        title: 'Internship Offer Letter',
        url: '/Het_Kalathiya_Internship_Offerletter.pdf',
        type: 'offer_letter'
      },
      {
        title: 'Internship Completion Certificate',
        url: '/Het_Kalathiya_Internship_Certificate.pdf',
        type: 'certificate'
      }
    ]
  }
];
