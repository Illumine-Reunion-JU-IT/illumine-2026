'use client';

import React from 'react';
import { CommitteeMember } from '@/types/organisingCommittee';
import CommitteeCard from './CommitteeCard';

export interface CommitteeGridProps {
  members: CommitteeMember[];
}

export const CommitteeGrid: React.FC<CommitteeGridProps> = ({ members }) => {
  if (members.length === 0) {
    return (
      <div 
        className="flex flex-col items-center justify-center py-16 border border-white/5 bg-black/40 text-center px-4 w-full"
        style={{
          clipPath: 'polygon(2% 0%, 100% 0%, 98% 100%, 0% 100%)',
        }}
      >
        <span className="text-[#ffe94d] text-lg mb-2 font-mono tracking-widest">SYSTEM_WARNING // NO_DATA_CHANNELS_OPEN</span>
        <p className="text-gray-500 text-xs tracking-wider uppercase font-mono">
          No committee members matched the active filter or search queries.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 md:gap-10 w-full justify-items-center items-start z-10 relative">
      {members.map((member) => (
        <CommitteeCard key={member.id} member={member} />
      ))}
    </div>
  );
};

export default CommitteeGrid;
