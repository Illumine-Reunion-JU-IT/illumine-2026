import type { Metadata } from 'next';
import CommitteeDirectory from '@/components/committee/CommitteeDirectory';
import { leadershipMembers, responsibilityMembers } from '@/data/organisingCommittee';

export const metadata: Metadata = {
  title: 'Core Committee | Illumine 2026',
  description: 'Meet the people shaping Illumine 2026, the Silver Jubilee Reunion of Jadavpur University Information Technology Department.',
  alternates: { canonical: '/organising-committee' },
  openGraph: {
    title: 'Core Committee | Illumine 2026',
    description: 'Meet the people shaping Illumine 2026, the Silver Jubilee Reunion of Jadavpur University Information Technology Department.',
    url: '/organising-committee',
    type: 'website',
    images: [{ url: '/photos/Hero/hero.png', width: 1440, height: 714, alt: 'ILLUMINE 2026 Core Committee' }],
  },
  twitter: { card: 'summary_large_image', title: 'Core Committee | Illumine 2026', description: 'Meet the people shaping Illumine 2026.', images: ['/photos/Hero/hero.png'] },
};

export default function OrganisingCommitteePage() {
  return <CommitteeDirectory leadership={leadershipMembers} responsibility={responsibilityMembers} />;
}
