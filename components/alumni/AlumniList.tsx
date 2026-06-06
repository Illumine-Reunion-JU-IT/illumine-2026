'use client';

import React, { useState, useMemo } from 'react';
import { AlumniProfile } from '@/types/alumni';
import { getFilteredAlumni } from '@/data/alumniData';
import AlumniCard from './AlumniCard';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, FilterX, Users } from 'lucide-react';

export interface AlumniListProps {
  profiles: AlumniProfile[];
}

export const AlumniList: React.FC<AlumniListProps> = ({ profiles }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBatch, setSelectedBatch] = useState('all');

  // Extract unique batches dynamically
  const batchList = useMemo(() => {
    const unique = Array.from(new Set(profiles.map(p => p.batch).filter(Boolean)));
    return unique.sort((a, b) => String(b).localeCompare(String(a))); // Youngest first
  }, [profiles]);

  // Compute filtered list
  const filteredProfiles = useMemo(() => {
    return getFilteredAlumni(profiles, searchQuery, selectedBatch);
  }, [profiles, searchQuery, selectedBatch]);

  // Framer Motion variants for staggered grid
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  return (
    <div className="flex flex-col gap-10 w-full relative z-10 font-mono max-w-7xl mx-auto">
      
      {/* ── SEARCH + FILTERS ── */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 pb-8 border-b border-white/10 w-full relative">
        <div className="absolute bottom-0 left-0 w-1/3 h-[1px] bg-gradient-to-r from-[#BEF3DF] to-transparent pointer-events-none" />
        
        {/* Animated Search Bar */}
        <div className="relative w-full max-w-md group">
          <div className="absolute inset-0 bg-gradient-to-r from-[#BEF3DF]/20 to-[#7B61FF]/20 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
          
          <div className="relative bg-[#0c0f1d]/80 backdrop-blur-md border border-white/10 group-focus-within:border-[#BEF3DF]/50 transition-all duration-300 rounded-xl overflow-hidden flex items-center shadow-lg group-focus-within:shadow-[0_0_20px_rgba(190,243,223,0.15)]">
            <div className="pl-4 text-gray-400 group-focus-within:text-[#BEF3DF] transition-colors">
              <Search size={18} />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search alumni by name, role, or company..."
              aria-label="Search alumni registry"
              className="w-full bg-transparent border-0 text-white placeholder-gray-500 text-sm tracking-wide px-4 py-3.5 focus:outline-none focus:ring-0 font-tt-lakes"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="pr-4 text-gray-500 hover:text-white transition-colors"
              >
                <FilterX size={16} />
              </button>
            )}
          </div>
        </div>

        {/* Batch Filter Pills */}
        <div className="flex flex-wrap items-center justify-start lg:justify-end gap-2 max-w-2xl">
          <div className="flex items-center gap-2 mr-2 text-gray-500 text-xs uppercase tracking-widest font-bold">
            <Users size={14} /> Filter:
          </div>
          <div className="flex flex-wrap gap-2">
            {['all', ...batchList].map((batch) => {
              const isActive = selectedBatch.toLowerCase() === batch.toLowerCase();
              
              return (
                <button
                  key={batch}
                  onClick={() => setSelectedBatch(batch)}
                  aria-pressed={isActive}
                  className="relative px-4 py-1.5 rounded-full text-xs tracking-wider transition-all duration-300 uppercase font-bold overflow-hidden group"
                >
                  {/* Background indicator */}
                  {isActive ? (
                    <motion.div 
                      layoutId="activeBatchIndicator"
                      className="absolute inset-0 bg-[#BEF3DF] shadow-[0_0_15px_rgba(190,243,223,0.4)]"
                      initial={false}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  ) : (
                    <div className="absolute inset-0 bg-white/5 border border-white/10 group-hover:bg-white/10 transition-colors" />
                  )}
                  
                  {/* Text */}
                  <span className={`relative z-10 ${isActive ? 'text-black' : 'text-gray-400 group-hover:text-white'}`}>
                    {batch === 'all' ? 'All Batches' : batch}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── ALUMNI CARD GRID ── */}
      <AnimatePresence mode="wait">
        {filteredProfiles.length === 0 ? (
          <motion.div 
            key="empty-state"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="flex flex-col items-center justify-center py-24 px-4 w-full bg-[#0c0f1d]/30 backdrop-blur-sm border border-white/5 rounded-2xl relative overflow-hidden"
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-red-500/5 rounded-full blur-[80px]" />
            <FilterX size={48} className="text-gray-600 mb-4 animate-pulse" />
            <span className="text-white text-xl font-tt-lakes font-bold mb-2">No Profiles Found</span>
            <p className="text-gray-500 text-sm tracking-wider uppercase text-center max-w-md">
              Try adjusting your search terms or selecting a different batch filter to locate alumni.
            </p>
          </motion.div>
        ) : (
          <motion.div 
            key="grid-state"
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full justify-items-center"
          >
            {filteredProfiles.map((alumnus, i) => (
              <AlumniCard key={alumnus.id} profile={alumnus} index={i} />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default AlumniList;
