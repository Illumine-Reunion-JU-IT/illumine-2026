import { AlumniProfile } from '@/types/alumni';

export const alumniList: AlumniProfile[] = [
  {
    id: 'al-1',
    name: 'Sayan Chowdhury',
    batch: '2005',
    company: 'Google',
    designation: 'Staff Software Engineer',
    linkedin: 'https://linkedin.com/in/sayan-chowdhury',
    image: '/photos/committee/rohan-sen.png',
  },
  {
    id: 'al-2',
    name: 'Priya Mukherjee',
    batch: '2008',
    company: 'Meta',
    designation: 'Product Manager',
    linkedin: 'https://linkedin.com/in/priya-mukherjee',
  },
  {
    id: 'al-3',
    name: 'Anirban Dutta',
    batch: '2012',
    company: 'Microsoft',
    designation: 'Principal Researcher',
    linkedin: 'https://linkedin.com/in/anirban-dutta',
  },
  {
    id: 'al-4',
    name: 'Debjit Saha',
    batch: '2015',
    company: 'Amazon',
    designation: 'Senior SDE',
    linkedin: 'https://linkedin.com/in/debjit-saha',
  },
  {
    id: 'al-5',
    name: 'Tanima Sen',
    batch: '2018',
    company: 'Uber',
    designation: 'Systems Engineer',
    linkedin: 'https://linkedin.com/in/tanima-sen',
  },
  {
    id: 'al-6',
    name: 'Rahul Banerjee',
    batch: '2020',
    company: 'Stripe',
    designation: 'Backend Developer',
    linkedin: 'https://linkedin.com/in/rahul-banerjee',
  },
  {
    id: 'al-7',
    name: 'Sweta Paul',
    batch: '2022',
    company: 'Netflix',
    designation: 'UI Architect',
    linkedin: 'https://linkedin.com/in/sweta-paul',
  },
  {
    id: 'al-8',
    name: 'Arpan Ghoshal',
    batch: '2024',
    company: 'Atlassian',
    designation: 'Associate Developer',
    linkedin: 'https://linkedin.com/in/arpan-ghoshal',
  },
];

export function getAlumni(): AlumniProfile[] {
  return [...alumniList].sort((a, b) => b.batch.localeCompare(a.batch) || a.name.localeCompare(b.name));
}

export function getFilteredAlumni(
  list: AlumniProfile[],
  search: string,
  batch: string
): AlumniProfile[] {
  let filtered = [...list];

  // Apply batch filter
  if (batch && batch.toLowerCase() !== 'all') {
    filtered = filtered.filter(alumnus => alumnus.batch === batch);
  }

  // Apply search query
  if (search) {
    const query = search.toLowerCase().trim();
    filtered = filtered.filter(
      alumnus =>
        alumnus.name.toLowerCase().includes(query) ||
        (alumnus.company && alumnus.company.toLowerCase().includes(query)) ||
        (alumnus.designation && alumnus.designation.toLowerCase().includes(query))
    );
  }

  return filtered;
}
