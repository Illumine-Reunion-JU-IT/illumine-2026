'use client';

import React from 'react';
import ArcReactor from '@/components/arc-reactor';
import BigCircle from '@/components/ui/BigCircle';
import BlueCircle from '@/components/ui/BlueCircle';
import Plus from '@/components/ui/Plus';
import DecryptedText from '@/components/ui/DecryptedText';

export default function AboutHero() {
  return (
    <section className="relative w-full h-[60vh] flex flex-col items-center justify-center bg-[#070707] text-[#d9fff6] overflow-hidden font-tt-lakes pt-20">
      
      {/* ── BACKGROUND HUD ACCENTS ── */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
        {/* Subtle grid */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: 'linear-gradient(rgba(123,97,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(123,97,255,0.05) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />
        
        {/* Concentric rings */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-30">
          <ArcReactor size={450} accentColor="teal" className="opacity-45" />
        </div>

        <Plus className="top-[25%] left-[15%]" delay={0.2} />
        <Plus className="bottom-[25%] right-[15%]" delay={0.8} />
        <BigCircle className="left-[10%] top-[15%] scale-75 opacity-30" />
        <BlueCircle className="right-[8%] bottom-[10%] rotate-90 scale-90 opacity-35" />
      </div>

      {/* ── HERO TEXT CONTENT ── */}
      <div className="max-w-4xl mx-auto text-center px-6 relative z-10 flex flex-col items-center">
        <p className="text-[10px] sm:text-xs font-mono tracking-[0.4em] text-[#7B61FF] uppercase mb-4">
          SYSTEM // IDENTITY_CORE_DIRECTIVES
        </p>

        <h1 className="text-4xl sm:text-5xl md:text-7xl font-black uppercase tracking-[0.15em] text-white font-mechsuit mb-6 drop-shadow-[0_0_15px_rgba(255,255,255,0.15)]">
          <DecryptedText 
            text="ABOUT ILLUMINE" 
            animateOn="view" 
            speed={85} 
            sequential
          />
        </h1>

        <div className="w-32 h-[2px] bg-gradient-to-r from-transparent via-[#7B61FF] to-transparent mb-8" />
        
        <p className="text-gray-400 text-xs sm:text-sm md:text-base tracking-widest max-w-2xl leading-relaxed uppercase">
          Deciphering the history, legacy, and digital pathways of the Department of Information Technology at Jadavpur University on its Silver Jubilee.
        </p>
      </div>

    </section>
  );
}
