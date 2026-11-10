import { CommitteeMember } from '@/types/organisingCommittee';

export const committeeMembers: CommitteeMember[] = [
  {
    id: 'mem-1',
    name: 'Prof. Bhaskar Sardar',
    designation: 'Faculty Advisor',
    department: 'Faculty',
    image: '',
    email: 'bhaskar.sardar@jadavpuruniversity.in',
    priority: 100,
  },
  {
    id: 'mem-2',
    name: 'Dr. Parama Bhaumik',
    designation: 'Faculty Co-Advisor',
    department: 'Faculty',
    image: '',
    priority: 95,
  },
  {
    id: 'mem-3',
    name: 'Rohan Sen',
    designation: 'Student Convener',
    department: 'Core Team',
    image: '/photos/committee/rohan-sen.png',
    email: 'rohan.sen@gmail.com',
    linkedin: 'https://linkedin.com/in/rohan-sen',
    priority: 90,
  },
  {
    id: 'mem-4',
    name: 'Anushka Roy',
    designation: 'Co-Convener',
    department: 'Core Team',
    image: '/photos/committee/anushka-roy.png',
    email: 'anushka.it.ju@gmail.com',
    linkedin: 'https://linkedin.com/in/anushka-roy',
    priority: 85,
  },
  {
    id: 'mem-5',
    name: 'Arijit Ghosh',
    designation: 'Technical Lead',
    department: 'Technical',
    image: '/photos/committee/arijit-ghosh.png',
    linkedin: 'https://linkedin.com/in/arijit-ghosh',
    priority: 80,
  },
  {
    id: 'mem-6',
    name: 'Sourav Datta',
    designation: 'Sponsorship Head',
    department: 'Sponsorship',
    image: '/photos/committee/sourav-datta.png',
    linkedin: 'https://linkedin.com/in/sourav-datta',
    priority: 75,
  },
  {
    id: 'mem-7',
    name: 'Tanya Sharma',
    designation: 'Lead UI/UX Designer',
    department: 'Design',
    image: '/photos/committee/tanya-sharma.png',
    linkedin: 'https://linkedin.com/in/tanya-sharma',
    priority: 70,
  },
  {
    id: 'mem-8',
    name: 'Kabir Verma',
    designation: 'Full Stack Developer',
    department: 'Technical',
    image: '/photos/committee/kabir-verma.png',
    linkedin: 'https://linkedin.com/in/kabir-verma',
    priority: 65,
  },
  {
    id: 'mem-9',
    name: 'Riya Sen',
    designation: 'Public Relations Head',
    department: 'Sponsorship',
    image: '/photos/committee/riya-sen.png',
    linkedin: 'https://linkedin.com/in/riya-sen',
    priority: 60,
  },
  {
    id: 'mem-10',
    name: 'Aditya Das',
    designation: 'Graphic Designer',
    department: 'Design',
    image: '/photos/committee/aditya-das.png',
    linkedin: 'https://linkedin.com/in/aditya-das',
    priority: 55,
  },
  {
    id: 'mem-11',
    name: 'Sneha Paul',
    designation: 'Event Operations Lead',
    department: 'Core Team',
    image: '/photos/committee/sneha-paul.png',
    linkedin: 'https://linkedin.com/in/sneha-paul',
    priority: 50,
  },
];

export function getCommitteeMembers(): CommitteeMember[] {
  return [...committeeMembers].sort((a, b) => b.priority - a.priority);
}

export function getCommitteeMemberById(id: string): CommitteeMember | undefined {
  return committeeMembers.find(member => member.id === id);
}

export function getDepartmentsFromMembers(members: CommitteeMember[]): string[] {
  const departments = members.map(m => m.department);
  return Array.from(new Set(departments)).sort();
}

export function getFilteredCommittee(
  members: CommitteeMember[],
  search: string,
  department: string
): CommitteeMember[] {
  let filtered = [...members];

  // Apply department filter
  if (department && department.toLowerCase() !== 'all') {
    filtered = filtered.filter(
      member => member.department.toLowerCase() === department.toLowerCase()
    );
  }

  // Apply search query (name, designation, department)
  if (search) {
    const query = search.toLowerCase().trim();
    filtered = filtered.filter(
      member =>
        member.name.toLowerCase().includes(query) ||
        member.designation.toLowerCase().includes(query) ||
        member.department.toLowerCase().includes(query)
    );
  }

  // Ensure output is sorted by priority
  return filtered.sort((a, b) => b.priority - a.priority);
}
