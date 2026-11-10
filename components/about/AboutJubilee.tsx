'use client';

import React from 'react';
import DecryptedText from '@/components/ui/DecryptedText';

export default function AboutJubilee() {
  return (
    <section className="relative w-full py-24 bg-[#0a0a0a] border-t border-b border-white/5 overflow-hidden flex items-center justify-center font-mono">
      
      {/* ── BACKGROUND GLOW ACCENTS ── */}
      <div className="absolute inset-0 pointer-events-none z-0" aria-hidden="true">
        <div className="absolute top-1/2 left-[-150px] -translate-y-1/2 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-[-150px] w-96 h-96 bg-teal-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 w-full max-w-5xl px-6 flex flex-col items-center">
        
        {/* Section Title */}
        <div className="flex flex-col items-center text-center mb-16">
          <p className="text-[10px] sm:text-xs font-mono tracking-[0.4em] text-indigo-400 uppercase mb-3">
            ANNIVERSARY // INDEX_2001_2026
          </p>
          <h2 className="font-mechsuit text-2xl sm:text-3xl text-white tracking-[0.2em] drop-shadow-[0_0_10px_rgba(165,180,252,0.3)]">
            <DecryptedText
              text="SILVER JUBILEE CELEBRATION"
              animateOn="view"
              speed={60}
              sequential
            />
          </h2>
          <div className="w-16 h-[1px] bg-indigo-500/40 mt-4" />
        </div>

        {/* Content Box with Cyberpunk styling */}
        <div 
          className="relative w-full bg-black/60 border border-indigo-500/20 p-8 sm:p-12 flex flex-col md:flex-row items-center gap-10 shadow-[0_0_35px_rgba(99,102,241,0.06)]"
          style={{
            clipPath: 'polygon(0% 0%, 94% 0%, 100% 6%, 100% 100%, 6% 100%, 0% 94%)',
          }}
        >
          {/* Tech outline highlights */}
          <div className="absolute top-0 left-0 w-8 h-[2px] bg-indigo-400 pointer-events-none" aria-hidden="true" />
          <div className="absolute top-0 left-0 w-[2px] h-8 bg-indigo-400 pointer-events-none" aria-hidden="true" />
          <div className="absolute bottom-0 right-0 w-8 h-[2px] bg-indigo-400 pointer-events-none" aria-hidden="true" />
          <div className="absolute bottom-0 right-0 w-[2px] h-8 bg-indigo-400 pointer-events-none" aria-hidden="true" />

          {/* Left - 25 Badge Indicator */}
          <div 
            className="flex flex-col items-center justify-center shrink-0 w-40 h-40 border border-white/10 bg-[#0c0e18] relative rounded-sm shadow-[inset_0_0_15px_rgba(255,255,255,0.02)]"
            aria-hidden="true"
          >
            {/* Spinning loops */}
            <div className="absolute inset-2 border border-dashed border-indigo-400/20 rounded-full animate-[spin_20s_linear_infinite]" />
            <div className="absolute inset-4 border border-indigo-400/10 rounded-full animate-[spin_10s_linear_infinite_reverse]" />
            
            <span className="text-5xl font-black tracking-tighter text-white drop-shadow-[0_0_10px_#818cf8] font-mono select-none">25</span>
            <span className="text-[10px] font-bold text-indigo-300 tracking-[0.25em] mt-1 font-mono">YEARS_IT</span>
          </div>

          {/* Right - Narrative */}
          <div className="flex flex-col gap-4 text-justify">
            <h3 className="text-sm font-bold uppercase tracking-[0.3em] text-[#64ffda] font-mono">
              {"// SYNERGY_AND_EVOLUTION"}
            </h3>
            <p className="text-gray-300 text-xs sm:text-sm leading-relaxed font-light font-tt-lakes">
              Established in the year 2001, the Department of Information Technology at Jadavpur University commemorates a quarter-century of technical distinction, pioneering research, and academic breakthrough in 2026. This Silver Jubilee Reunion—ILLUMINE 2026—serves as a milestone connection bridging initial foundations with the dynamic development pathways of the current student cohorts.
            </p>
            <div className="flex items-center gap-2 mt-2">
              <span className="w-1.5 h-1.5 bg-[#64ffda] rounded-full animate-ping" aria-hidden="true" />
              <span className="text-[10px] font-mono tracking-widest text-gray-500 uppercase">CELEBRATING LEGACY. SHAPING HORIZONS.</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
