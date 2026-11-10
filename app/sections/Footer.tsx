'use client';

import React from 'react';
import { motion } from 'framer-motion';
import ContactForm from '@/components/contact/ContactForm';
import DecryptedText from '@/components/ui/DecryptedText';

export default function Footer() {
  return (
    <footer className="bg-[#070707] text-[#d9fff6] border-t border-[#6265fe]/20 py-20 px-6 md:px-12 font-sans relative z-10 overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col gap-12">
        {/* CONTACT US — Slides in from RIGHT as user scrolls and sits in middle of screen */}
        <motion.div
          initial={{ opacity: 0, x: 200, scale: 0.92 }}
          whileInView={{ opacity: 1, x: 0, scale: 1 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          className="w-full flex flex-col items-center justify-center text-center mb-6"
        >
          <h2 className="font-mechsuit text-2xl sm:text-3xl lg:text-4xl text-[#B6BBFF] drop-shadow-[0_0_14px_rgba(182,187,255,0.6)] uppercase tracking-[0.2em]">
            <DecryptedText
              text="CONTACT US"
              animateOn="view"
              speed={60}
              sequential={true}
              revealDirection="start"
            />
          </h2>
          <div className="h-[2px] w-32 sm:w-56 mt-3 bg-gradient-to-r from-transparent via-[#BEF3DF] to-transparent shadow-[0_0_8px_#BEF3DF]" />
        </motion.div>

        <ContactForm />
      </div>
    </footer>
  );
}