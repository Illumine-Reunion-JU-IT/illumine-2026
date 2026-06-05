'use client';

import React, { useState, useMemo } from 'react';
import { AlumniProfile } from '@/types/alumni';
import { getFilteredAlumni } from '@/data/alumniData';
import AlumniCard from './AlumniCard';

export interface AlumniListProps {
  profiles: AlumniProfile[];
}

export const AlumniList: React.FC<AlumniListProps> = ({ profiles }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBatch, setSelectedBatch] = useState('all');

  // Extract unique batches dynamically
  const batchList = useMemo(() => {
    const unique = Array.from(new Set(profiles.map(p => p.batch)));
    return unique.sort((a, b) => b.localeCompare(a)); // Youngest first
  }, [profiles]);

  // Compute filtered list
  const filteredProfiles = useMemo(() => {
    return getFilteredAlumni(profiles, searchQuery, selectedBatch);
  }, [profiles, searchQuery, selectedBatch]);

  return (
    <div className="flex flex-col gap-10 w-full relative z-10 font-mono">
      
      {/* ── SEARCH + FILTERS ── */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 pb-6 border-b border-white/5 w-full">
        {/* Search bar */}
        <div className="relative w-full max-w-md">
          <div 
            className="relative bg-black/40 border border-white/10 hover:border-[#BEF3DF]/30 focus-within:border-[#BEF3DF] transition-all duration-300 shadow-[inset_0_0_10px_rgba(255,255,255,0.02)] focus-within:shadow-[0_0_15px_rgba(190,243,223,0.15)] w-full"
            style={{
              clipPath: 'polygon(0% 0%, 96% 0%, 100% 30%, 100% 100%, 4% 100%, 0% 70%)',
            }}
          >
            <div className="absolute top-0 right-0 w-2 h-[2px] bg-[#BEF3DF] pointer-events-none" aria-hidden="true" />
            <div className="absolute bottom-0 left-0 w-2 h-[2px] bg-[#BEF3DF] pointer-events-none" aria-hidden="true" />

            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="SEARCH // REGISTRY_"
              aria-label="Search alumni registry by name, company, or designation"
              className="w-full bg-transparent border-0 text-[#BEF3DF] placeholder-[#BEF3DF]/35 text-xs sm:text-sm font-extrabold tracking-widest px-5 py-3.5 focus:outline-none focus:ring-0 focus:border-0 border-transparent outline-none"
            />
          </div>
        </div>

        {/* Batch filter tabs */}
        <div className="flex flex-wrap items-center justify-center lg:justify-end gap-2 max-w-2xl">
          {['all', ...batchList].map((batch) => {
            const isActive = selectedBatch.toLowerCase() === batch.toLowerCase();
            const activeStyle = 'bg-[#64ffda] text-[#070707] border-[#64ffda] shadow-[0_0_12px_rgba(100,255,218,0.4)] font-extrabold';
            const inactiveStyle = 'bg-black/40 text-gray-400 hover:text-white border-white/10 hover:border-white/20 font-bold';

            return (
              <button
                key={batch}
                onClick={() => setSelectedBatch(batch)}
                aria-label={`Filter alumni by class of ${batch}`}
                aria-pressed={isActive}
                className={`
                  px-3.5 py-1.5 text-[9px] sm:text-[10px] tracking-[0.2em] transition-all duration-300 border uppercase cursor-pointer
                  ${isActive ? activeStyle : inactiveStyle}
                `}
                style={{
                  clipPath: 'polygon(6% 0%, 100% 0%, 94% 100%, 0% 100%)',
                }}
              >
                {batch === 'all' ? 'ALL_BATCHES' : `'${batch.slice(-2)}`}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── ALUMNI CARD GRID ── */}
      {filteredProfiles.length === 0 ? (
        <div 
          className="flex flex-col items-center justify-center py-16 border border-white/5 bg-black/40 text-center px-4 w-full"
          style={{
            clipPath: 'polygon(2% 0%, 100% 0%, 98% 100%, 0% 100%)',
          }}
        >
          <span className="text-[#ffe94d] text-lg mb-2 tracking-widest">REGISTRY_ALERT // NO_RECORDS_INDEXED</span>
          <p className="text-gray-500 text-xs tracking-wider uppercase">
            No alumni graduates found matching the active query parameters.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full justify-items-center items-start">
          {filteredProfiles.map((alumnus) => (
            <AlumniCard key={alumnus.id} profile={alumnus} />
          ))}
        </div>
      )}

    </div>
  );
};

export default AlumniList;
