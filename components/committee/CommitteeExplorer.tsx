'use client';

import React, { useState, useMemo } from 'react';
import { CommitteeMember } from '@/types/organisingCommittee';
import { getFilteredCommittee } from '@/data/organisingCommittee';
import CommitteeSearch from './CommitteeSearch';
import CommitteeFilters from './CommitteeFilters';
import CommitteeGrid from './CommitteeGrid';

export interface CommitteeExplorerProps {
  members: CommitteeMember[];
  departments: string[];
}

export const CommitteeExplorer: React.FC<CommitteeExplorerProps> = ({
  members,
  departments,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('all');

  // Compute memoized filtered list using the helper function from data source
  const filteredMembers = useMemo(() => {
    return getFilteredCommittee(members, searchQuery, selectedDepartment);
  }, [members, searchQuery, selectedDepartment]);

  return (
    <div className="flex flex-col gap-10 w-full relative z-10">
      
      {/* ── SECTION 2: SEARCH + FILTERS ── */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 pb-6 border-b border-white/5 w-full">
        <div className="w-full md:w-auto flex justify-center md:justify-start">
          <CommitteeSearch 
            value={searchQuery} 
            onChange={setSearchQuery} 
          />
        </div>
        <div className="w-full md:w-auto flex justify-center md:justify-end">
          <CommitteeFilters
            departments={departments}
            currentDepartment={selectedDepartment}
            onDepartmentChange={setSelectedDepartment}
          />
        </div>
      </div>

      {/* ── SECTION 3: COMMITTEE GRID ── */}
      <CommitteeGrid members={filteredMembers} />
      
    </div>
  );
};

export default CommitteeExplorer;
