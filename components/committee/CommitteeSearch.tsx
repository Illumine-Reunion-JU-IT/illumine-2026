'use client';

import React from 'react';

export interface CommitteeSearchProps {
  value: string;
  onChange: (value: string) => void;
}

export const CommitteeSearch: React.FC<CommitteeSearchProps> = ({ value, onChange }) => {
  return (
    <div className="relative w-full max-w-md z-10 font-mono">
      {/* High-tech border container with clip-path */}
      <div 
        className="relative bg-black/40 border border-white/10 hover:border-[#BEF3DF]/30 focus-within:border-[#BEF3DF] transition-all duration-300 shadow-[inset_0_0_10px_rgba(255,255,255,0.02)] focus-within:shadow-[0_0_15px_rgba(190,243,223,0.15)] w-full"
        style={{
          clipPath: 'polygon(0% 0%, 96% 0%, 100% 30%, 100% 100%, 4% 100%, 0% 70%)',
        }}
      >
        {/* High-tech corner highlights */}
        <div className="absolute top-0 right-0 w-2 h-[2px] bg-[#BEF3DF] pointer-events-none" aria-hidden="true" />
        <div className="absolute bottom-0 left-0 w-2 h-[2px] bg-[#BEF3DF] pointer-events-none" aria-hidden="true" />

        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="SEARCH // DIRECTORY_"
          aria-label="Search committee members by name, designation, or department"
          className="w-full bg-transparent border-0 text-[#BEF3DF] placeholder-[#BEF3DF]/35 text-xs sm:text-sm font-extrabold tracking-widest px-5 py-3.5 focus:outline-none focus:ring-0 focus:border-0 border-transparent outline-none"
        />
      </div>
    </div>
  );
};

export default CommitteeSearch;
