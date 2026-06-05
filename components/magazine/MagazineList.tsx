'use client';

import React from 'react';
import { MagazineIssue } from '@/types/magazine';
import MagazineCard from './MagazineCard';

export interface MagazineListProps {
  issues: MagazineIssue[];
}

export const MagazineList: React.FC<MagazineListProps> = ({ issues }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full justify-items-center items-start z-10 relative">
      {issues.map((issue) => (
        <MagazineCard key={issue.id} issue={issue} />
      ))}
    </div>
  );
};

export default MagazineList;
