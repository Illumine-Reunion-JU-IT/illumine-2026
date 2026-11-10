'use client';

import React from 'react';
import ArcReactor from '@/components/arc-reactor';
import BigCircle from '@/components/ui/BigCircle';
import BlueCircle from '@/components/ui/BlueCircle';
import Plus from '@/components/ui/Plus';
import DecryptedText from '@/components/ui/DecryptedText';

export default function MagazineHero() {
  return (
    <section className="relative w-full py-16 flex flex-col items-center justify-center bg-[#070707] text-[#d9fff6] overflow-hidden font-tt-lakes">
      
      {/* ── BACKGROUND HUD ACCENTS ── */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: 'linear-gradient(rgba(123,97,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(123,97,255,0.05) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />
        
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-25">
          <ArcReactor size={400} accentColor="purple" className="opacity-35" />
        </div>

        <Plus className="top-[20%] left-[10%]" delay={0.1} />
        <Plus className="bottom-[10%] right-[10%]" delay={0.7} />
        <BigCircle className="right-[12%] top-[12%] scale-75 opacity-30" />
        <BlueCircle className="left-[10%] bottom-[12%] rotate-45 opacity-35" />
      </div>

      {/* ── HERO TEXT CONTENT ── */}
      <div className="max-w-4xl mx-auto text-center px-6 relative z-10 flex flex-col items-center">
        <p className="text-[10px] sm:text-xs font-mono tracking-[0.4em] text-[#7B61FF] uppercase mb-4">
          ARCHIVE // PUBLICATIONS_LOG_FILE
        </p>

        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-[0.15em] text-white font-mechsuit mb-6 drop-shadow-[0_0_15px_rgba(255,255,255,0.15)]">
          <DecryptedText 
            text="REUNION MAGAZINE" 
            animateOn="view" 
            speed={75} 
            sequential
          />
        </h1>

        <div className="w-24 h-[2px] bg-gradient-to-r from-transparent via-[#7B61FF] to-transparent mb-6" />
        
        <p className="text-gray-400 text-xs sm:text-sm tracking-wider max-w-xl leading-relaxed uppercase">
          Access publications. Download technical newsletters, reunion magazines, and editorial issues published by the Jadavpur University IT Department.
        </p>
      </div>

    </section>
  );
}
