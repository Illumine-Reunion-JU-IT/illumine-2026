'use client';

import React from 'react';

export interface EventFiltersProps {
  currentCategory: string;
  onCategoryChange: (category: string) => void;
}

const CATEGORIES = [
  { value: 'all', label: 'ALL' },
  { value: 'academic', label: 'ACADEMIC' },
  { value: 'cultural', label: 'CULTURAL' },
  { value: 'sports', label: 'SPORTS' },
  { value: 'other', label: 'OTHER' },
];

export const EventFilters: React.FC<EventFiltersProps> = ({
  currentCategory,
  onCategoryChange,
}) => {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4 mb-10 w-full z-25 relative">
      {CATEGORIES.map((cat) => {
        const isActive = currentCategory === cat.value;

        // Custom borders/colors per tab
        const activeBg = 'bg-[#6265fe] text-white border-[#6265fe] shadow-[0_0_15px_rgba(98,101,254,0.5)]';
        const inactiveBg = 'bg-black/40 text-gray-400 hover:text-white border-white/10 hover:border-white/20';

        return (
          <button
            key={cat.value}
            onClick={() => onCategoryChange(cat.value)}
            className={`
              px-6 py-2 text-xs font-extrabold tracking-[0.25em] transition-all duration-300 border font-mono
              ${isActive ? activeBg : inactiveBg}
            `}
            style={{
              clipPath: 'polygon(8% 0%, 100% 0%, 92% 100%, 0% 100%)',
            }}
          >
            {cat.label}
          </button>
        );
      })}
    </div>
  );
};

export default EventFilters;
