'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from "next/image";
import { usePathname } from 'next/navigation';
import { mechsuit, ttLakes } from './fonts'; 

const navLinks = [
  { label: 'HOME', href: '/' },
  { label: 'ABOUT', href: '/#about-illumine' },
  { label: 'MAGAZINE', href: '/magazine'},
  { label: 'ALUMNI', href: '/alumni' },
  { label: 'CONTACT US', href: '/#footer' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const polyClass = "[clip-path:polygon(8%_0,100%_0,100%_65%,92%_100%,0_100%,0_35%)]";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav
        className={`sticky top-0 left-0 right-0 z-[100] transition-all duration-500 ${
          scrolled 
            ? 'bg-black/80 backdrop-blur-xl border-b border-[#7B61FF]/30 shadow-[0_4px_30px_rgba(123,97,255,0.1)]' 
            : 'bg-black' 
        }`}
      >
        {/* Animated Gradient Scanline (Top) */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#7B61FF] to-transparent animate-pulse opacity-70" />

        <div className="max-w-[90rem] mx-auto px-4 sm:px-6 h-20 flex items-center justify-between relative">
          
          {/* 1. LOGO */}
         <div className="flex items-center gap-2">
  {/* JU Logo */}
  <img
    src="/photos/Hero/logo.jpeg"   // keep your actual path
    alt="Jadavpur University"
    className="h-20 w-20 object-contain translate-y-[1px]"
  />

  {/* Illumine Text (UNCHANGED styling) */}
  <span className="font-mechsuit text-xl tracking-[0.25em] text-white transition-all duration-300 ease-in-out hover:text-[#7B61FF] hover:[text-shadow:0_0_15px_#7B61FF]">
  ILLUMINE
</span>
</div>

          {/* 2. DESKTOP LINKS */}
          <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 items-center gap-2 w-max z-10">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`
                    relative px-5 py-2 text-[10px] font-bold tracking-[0.2em] transition-all duration-300
                    ${ttLakes.className} ${polyClass}
                    ${isActive 
                      ? 'bg-[#6265fe] text-white shadow-[0_0_20px_rgba(98,101,254,0.6)] border-t border-white/20' 
                      : 'text-white/60 hover:text-[#7B61FF] hover:bg-[#7B61FF]/10'
                    }
                  `}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

           {/* 3. ACTION BUTTONS (COMMENTED OUT) 
          <div className="hidden lg:flex flex-1 justify-end items-center gap-5 h-9 z-10">
            <Link
              href="/login"
              className={`
                relative h-full px-7 flex items-center justify-center bg-[#6265fe] 
                text-white text-[11px] font-bold tracking-[0.2em] 
                hover:shadow-[0_0_25px_rgba(123,97,255,0.5)] hover:scale-105 
                active:scale-95 transition-all duration-300 ${polyClass} ${ttLakes.className}
              `}
            >
              LOG IN
            </Link> 

            <div className={`relative h-full p-[1.5px] bg-gradient-to-r from-[#7B61FF] via-[#B6BBFF] to-[#7B61FF] animate-gradient-x ${polyClass}`}>
              <Link 
                href="/signup"
                className={`
                  h-full px-7 flex items-center justify-center bg-black text-white 
                  text-[11px] font-bold tracking-[0.2em] transition-all 
                  hover:bg-[#7B61FF]/20 hover:text-white ${polyClass} ${ttLakes.className}
                `}
              >
                SIGN UP
              </Link>
            </div>
          </div>
          */}

          {/* MOBILE TOGGLE */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden flex flex-col gap-1.5 p-2 z-10"
          >
            <div className={`h-[2px] w-6 bg-[#7B61FF] transition-all ${mobileOpen ? 'rotate-45 translate-y-2' : ''} shadow-[0_0_8px_#7B61FF]`} />
            <div className={`h-[2px] w-4 bg-[#7B61FF] transition-all ${mobileOpen ? 'opacity-0' : 'opacity-100'}`} />
            <div className={`h-[2px] w-6 bg-[#7B61FF] transition-all ${mobileOpen ? '-rotate-45 -translate-y-2' : ''} shadow-[0_0_8px_#7B61FF]`} />
          </button>

        </div>
      </nav>

      {/* MOBILE OVERLAY */} 
      <div className={`fixed inset-0 z-[90] lg:hidden transition-all duration-700 ${mobileOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="absolute inset-0 bg-black/95 backdrop-blur-3xl border-l border-[#7B61FF]/30" />
        
        <div className="absolute inset-0 opacity-10 pointer-events-none bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />

        <div className="relative h-full flex flex-col justify-center items-end pr-12 gap-8">
          
          {navLinks.map((link, i) => (
            <Link 
              key={link.label} 
              href={link.href} 
              onClick={() => setMobileOpen(false)}
              className="group text-right"
            >
              <span className="block text-[10px] text-[#7B61FF] font-mono tracking-widest opacity-50">SECTION_0{i+1}</span>
              <span className={`text-3xl font-bold tracking-tighter text-white group-hover:text-[#7B61FF] transition-colors ${ttLakes.className}`}>
                {link.label}
              </span>
            </Link>
          ))}

          {/* MOBILE AUTH BUTTONS & DIVIDER (COMMENTED OUT) 
          <div className="w-1/2 h-[1px] bg-gradient-to-l from-[#7B61FF]/50 to-transparent my-2" />

          <Link 
            href="/login" 
            onClick={() => setMobileOpen(false)}
            className="group text-right mt-2"
          >
            <span className="block text-[10px] text-[#7B61FF] font-mono tracking-widest opacity-50">AUTH_REQ</span>
            <span className={`text-2xl font-bold tracking-tighter text-white/70 group-hover:text-[#7B61FF] transition-colors ${ttLakes.className}`}>
              LOG IN
            </span>
          </Link>
          
          <Link 
            href="/signup" 
            onClick={() => setMobileOpen(false)}
            className="group text-right"
          >
            <span className="block text-[10px] text-[#7B61FF] font-mono tracking-widest opacity-50">SYS_ENTRY</span>
            <span className={`text-2xl font-bold tracking-tighter text-[#7B61FF] group-hover:text-white transition-colors ${ttLakes.className}`}>
              SIGN UP
            </span>
          </Link>
          */}

        </div>
      </div>

      <style jsx global>{`
        @keyframes gradient-x {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 3s linear infinite;
        }
      `}</style>
    </>
  );
}