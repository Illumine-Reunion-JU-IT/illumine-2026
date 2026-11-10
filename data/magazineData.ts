import { MagazineIssue } from '@/types/magazine';

export const magazineIssues: MagazineIssue[] = [
  {
    id: 'mag-1',
    title: 'ILLUMINE Silver Jubilee Magazine',
    publishDate: 'December 2026',
    pdfUrl: '/documents/magazine-2026.pdf',
    thumbnailUrl: '/photos/magazine/thumb-2026.png',
    volume: 3,
    issueNumber: 2,
    description: 'A special commemorative publication celebrating 25 years of IT excellence, featuring stories from our founders, alumni paths, and current student achievements.',
  },
  {
    id: 'mag-2',
    title: 'Department Tech Newsletter - Spring 2026',
    publishDate: 'June 2026',
    pdfUrl: '/documents/newsletter-spring-2026.pdf',
    thumbnailUrl: '/photos/magazine/thumb-spring-2026.png',
    volume: 3,
    issueNumber: 1,
    description: 'Highlights department research breakthroughs, student hackathon victories, and academic publications from the first half of 2026.',
  },
  {
    id: 'mag-3',
    title: 'Illumine Reunion Newsletter - Vol 2',
    publishDate: 'December 2024',
    pdfUrl: '/documents/newsletter-dec-2024.pdf',
    thumbnailUrl: '/photos/magazine/thumb-2024.png',
    volume: 2,
    issueNumber: 2,
    description: 'A recap of our previous reunion gathering, featuring photos, cohort milestones, and alumni networking activities.',
  },
  {
    id: 'mag-4',
    title: 'Department Tech Newsletter - Spring 2024',
    publishDate: 'June 2024',
    pdfUrl: '/documents/newsletter-spring-2024.pdf',
    thumbnailUrl: '/photos/magazine/thumb-spring-2024.png',
    volume: 2,
    issueNumber: 1,
    description: 'Focuses on industry-academia collaborations, technical workshops, and updates from labs.',
  },
  {
    id: 'mag-5',
    title: 'Genesis Technical Newsletter - Vol 1',
    publishDate: 'December 2022',
    pdfUrl: '/documents/newsletter-dec-2022.pdf',
    thumbnailUrl: '/photos/magazine/thumb-2022.png',
    volume: 1,
    issueNumber: 1,
    description: 'The first edition of the reunion newsletters tracking early batch developments and founding steps of the IT department.',
  },
];

export function getMagazineIssues(): MagazineIssue[] {
  return [...magazineIssues].sort((a, b) => b.volume - a.volume || b.issueNumber - a.issueNumber);
}
