'use client';

import React from 'react';

export interface CommitteeFiltersProps {
  departments: string[];
  currentDepartment: string;
  onDepartmentChange: (dept: string) => void;
}

export const CommitteeFilters: React.FC<CommitteeFiltersProps> = ({
  departments,
  currentDepartment,
  onDepartmentChange,
}) => {
  // Include 'all' dynamically as the starting filter option
  const filterList = ['all', ...departments];

  return (
    <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4 mb-6 w-full z-10 relative">
      {filterList.map((dept) => {
        const isActive = currentDepartment.toLowerCase() === dept.toLowerCase();

        // High-tech cyberpunk category tab stylings
        const activeStyle = 'bg-[#64ffda] text-[#070707] border-[#64ffda] shadow-[0_0_15px_rgba(100,255,218,0.45)] font-extrabold';
        const inactiveStyle = 'bg-black/40 text-gray-400 hover:text-white border-white/10 hover:border-white/20 font-bold';

        return (
          <button
            key={dept}
            onClick={() => onDepartmentChange(dept)}
            aria-label={`Filter committee by ${dept} department`}
            aria-pressed={isActive}
            className={`
              px-5 py-2 text-[10px] md:text-xs tracking-[0.25em] transition-all duration-300 border font-mono uppercase
              ${isActive ? activeStyle : inactiveStyle}
            `}
            style={{
              clipPath: 'polygon(8% 0%, 100% 0%, 92% 100%, 0% 100%)',
            }}
          >
            {dept}
          </button>
        );
      })}
    </div>
  );
};

export default CommitteeFilters;
