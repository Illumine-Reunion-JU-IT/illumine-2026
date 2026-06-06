import React from 'react';
import { Users, FilterX, Search } from 'lucide-react';
import AlumniHero from '@/components/alumni/AlumniHero';

export default function Loading() {
  return (
    <main className="relative min-h-screen bg-[#070707] text-[#d9fff6] pt-28 pb-20 overflow-hidden font-tt-lakes">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 flex flex-col gap-6">
        <AlumniHero />
        
        <div className="flex flex-col gap-10 w-full relative z-10 font-mono max-w-7xl mx-auto mt-6 animate-pulse">
          
          {/* SKELETON SEARCH + FILTERS */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 pb-8 border-b border-white/10 w-full relative">
            <div className="absolute bottom-0 left-0 w-1/3 h-[1px] bg-gradient-to-r from-[#BEF3DF] to-transparent pointer-events-none" />
            
            <div className="relative w-full max-w-md">
              <div className="relative bg-[#0c0f1d]/80 border border-white/10 rounded-xl flex items-center h-12 w-full" />
            </div>

            <div className="flex flex-wrap items-center justify-start lg:justify-end gap-2 max-w-2xl">
              <div className="flex items-center gap-2 mr-2 text-gray-500 text-xs uppercase tracking-widest font-bold">
                <Users size={14} /> Filter:
              </div>
              <div className="flex flex-wrap gap-2">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="h-8 w-16 bg-white/5 rounded-full" />
                ))}
              </div>
            </div>
          </div>

          {/* SKELETON ALUMNI CARD GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full justify-items-center">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="w-full max-w-[300px] h-[360px] bg-[#0c0f1d]/50 backdrop-blur-sm border border-white/5 rounded-2xl flex flex-col p-6 gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-white/10 shrink-0" />
                  <div className="flex flex-col gap-2 w-full">
                    <div className="h-4 bg-white/10 rounded w-3/4" />
                    <div className="h-3 bg-white/5 rounded w-1/2" />
                  </div>
                </div>
                <div className="h-10 bg-white/5 rounded-lg mt-auto w-full" />
                <div className="h-10 bg-white/5 rounded-lg w-full" />
                <div className="h-10 bg-white/5 rounded-lg mt-2 w-full" />
              </div>
            ))}
          </div>

        </div>
      </div>
    </main>
  );
}
