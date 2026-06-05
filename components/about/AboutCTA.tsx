'use client';

import React from 'react';
import Link from 'next/link';
import DecryptedText from '@/components/ui/DecryptedText';

export default function AboutCTA() {
  return (
    <section className="relative w-full py-24 bg-[#0a0a0a] border-t border-white/5 overflow-hidden flex flex-col items-center justify-center font-mono">
      
      {/* Background radial glow */}
      <div 
        className="absolute inset-0 pointer-events-none z-0 bg-gradient-to-b from-indigo-500/5 via-transparent to-transparent opacity-45" 
        aria-hidden="true" 
      />

      <div className="relative z-10 w-full max-w-4xl px-6 flex flex-col items-center text-center">
        <p className="text-[10px] sm:text-xs font-mono tracking-[0.4em] text-indigo-400 uppercase mb-3">
          REDIRECT // SECURE_ACCESS_TERMINALS
        </p>
        <h2 className="font-mechsuit text-xl sm:text-2xl text-white tracking-[0.2em] mb-4">
          <DecryptedText
            text="LOCK IN CREDENTIALS"
            animateOn="view"
            speed={60}
            sequential
          />
        </h2>
        <p className="text-gray-400 text-xs sm:text-sm tracking-wider max-w-md uppercase mb-10">
          Access schedule nodes, locate organising coordinators, or communicate queries directly via live terminals.
        </p>

        {/* Cohesive Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 w-full max-w-2xl font-mono">
          <Link
            href="/events"
            className="px-8 py-3.5 bg-[#6265fe] hover:bg-[#7b7efe] text-white font-extrabold tracking-[0.2em] text-xs transition-all duration-300 w-full sm:w-auto text-center shadow-[0_0_15px_rgba(98,101,254,0.35)] hover:shadow-[0_0_20px_rgba(98,101,254,0.55)]"
            style={{
              clipPath: 'polygon(8% 0%, 100% 0%, 92% 100%, 0% 100%)',
            }}
          >
            VIEW_EVENTS &gt;&gt;
          </Link>

          <Link
            href="/organising-committee"
            className="px-8 py-3.5 bg-transparent hover:bg-white/5 text-[#BEF3DF] border border-white/10 hover:border-white/30 font-extrabold tracking-[0.2em] text-xs transition-all duration-300 w-full sm:w-auto text-center"
            style={{
              clipPath: 'polygon(8% 0%, 100% 0%, 92% 100%, 0% 100%)',
            }}
          >
            OC_DIRECTORY &gt;&gt;
          </Link>

          <Link
            href="/contact-us"
            className="px-8 py-3.5 bg-transparent hover:bg-[#ffe94d]/10 text-[#ffe94d] border border-[#ffe94d]/20 hover:border-[#ffe94d]/45 font-extrabold tracking-[0.2em] text-xs transition-all duration-300 w-full sm:w-auto text-center"
            style={{
              clipPath: 'polygon(8% 0%, 100% 0%, 92% 100%, 0% 100%)',
            }}
          >
            CONTACT_US &gt;&gt;
          </Link>
        </div>
      </div>

    </section>
  );
}
