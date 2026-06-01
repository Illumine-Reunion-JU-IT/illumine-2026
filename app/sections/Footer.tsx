'use client';

import React from 'react';
import ContactForm from '@/components/contact/ContactForm';

export default function Footer() {
  return (
    <footer className="bg-[#070707] text-[#d9fff6] border-t border-[#6265fe]/20 py-20 px-6 md:px-12 font-sans relative z-10">
      {/* Cyberpunk top neon accent pulse line */}
      {/* <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#6265fe]/50 to-transparent animate-pulse" /> */}
      
      <div className="max-w-7xl mx-auto flex flex-col gap-24">
        <ContactForm />
      </div>
    </footer>
  );
}