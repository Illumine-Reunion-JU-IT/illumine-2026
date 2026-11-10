import type { Metadata } from 'next';
import CommitteeDirectory from '@/components/committee/CommitteeDirectory';
import { leadershipMembers, responsibilityMembers } from '@/data/organisingCommittee';

export const metadata: Metadata = {
  title: 'Core Committee | Illumine 2026',
  description: 'Meet the people shaping Illumine 2026, the Silver Jubilee Reunion of Jadavpur University Information Technology Department.',
};

export default function OrganisingCommitteePage() {
  return <CommitteeDirectory leadership={leadershipMembers} responsibility={responsibilityMembers} />;
}
