"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import ArcReactor from '@/components/arc-reactor';
import Dot from '@/assets/coming_soon_svgs/svg/Dot';
import Group93 from '@/assets/coming_soon_svgs/svg/Group93';
import Frame30 from '@/assets/coming_soon_svgs/svg/Frame30';
import Vector2 from '@/assets/coming_soon_svgs/svg/Vector2';
import ComingSoonText from '@/assets/coming_soon_svgs/svg/ComingSoonText';
import BlueCircle from './BlueCircle';

const Cross = ({ style }: { style?: React.CSSProperties }) => (
  <div className="absolute aspect-square" style={{ width: '1.25vw', ...style }}>
    <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-white/20 -translate-x-1/2"></div>
    <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-white/20 -translate-y-1/2"></div>
  </div>
);

function useReactorSize() {
  const [size, setSize] = useState(440);
  useEffect(() => {
    const calc = () => {
      const w = window.innerWidth  * 0.4444;
      const h = window.innerHeight * 0.8963;
      setSize(Math.round(Math.min(w, h)));
    };
    calc();
    window.addEventListener('resize', calc);
    return () => window.removeEventListener('resize', calc);
  }, []);
  return size;
}

export default function ComingSoon() {
  const reactorSize = useReactorSize();
  return (
    <div className="relative w-full h-[90vh] bg-[#0f0f0f] overflow-hidden" style={{ fontFamily: "'TT Lakes Neue Trial', sans-serif" }}>

      <div className="relative w-full h-full">

        {/* ── ARC REACTOR centered in background ── */}
        <div
          className="absolute flex items-center justify-center"
          style={{
            left: '27.77vw',
            top: '5.18%',
            width: '44.44vw',
            height: '89.63%',
          }}
        >
          {/* Outer glow bloom behind the reactor */}
          <div
            className="absolute rounded-full pointer-events-none"
            style={{
              width: '55%',
              height: '55%',
              background: 'radial-gradient(circle, rgba(255,243,77,0.06) 0%, transparent 70%)',
            }}
          />

          {/* The reactor itself — fills the container, scales with viewport */}
          <div className="absolute inset-0 flex items-center justify-center z-0 pointer-events-none">
            <ArcReactor
              accentColor="yellow"
              size={reactorSize}
              className="opacity-50"
            />
          </div>

          {/* Foreground text overlay */}
          <div className="absolute inset-0 z-50 flex flex-col items-center justify-center pointer-events-none">
            <div className="drop-shadow-[0_0_20px_rgba(255,243,77,0.3)] scale-110" style={{ marginTop: '5%' }}>
              <ComingSoonText />
            </div>
            <h2
              className="text-[#fff34d] font-bold tracking-[0.2em] opacity-90"
              style={{ fontSize: 'max(1vw, 1.2vh)', marginTop: '3%' }}
            >
              — UNDER CONSTRUCTION —
            </h2>
            <Link
              href="/"
              className="pointer-events-auto bg-[#6265fe] text-white font-bold tracking-[0.15em] hover:brightness-110 transition-all"
              style={{
                marginTop: '4%',
                padding: '1.5% 3%',
                fontSize: 'max(0.7vw, 1vh)',
                clipPath: 'polygon(8% 0, 100% 0, 100% 65%, 92% 100%, 0 100%, 0 35%)',
              }}
            >
              BACK TO HOME
            </Link>
          </div>
        </div>

        {/* Decorative Text Layers */}
        <div
          className="absolute text-[#fff34d] font-bold uppercase tracking-[0.35em] blur-[0.5px] z-40"
          style={{ left: '24.86vw', top: '26.61%', fontSize: 'max(0.8vw, 1vh)' }}
        >
          IN PROGRESS
        </div>
        <div
          className="absolute text-[#fff34d] font-bold uppercase tracking-[0.35em] blur-[0.5px] z-40"
          style={{ left: '68.4vw', top: '73.52%', fontSize: 'max(0.8vw, 1vh)' }}
        >
          UNDER CONSTRUCTION
        </div>

        {/* Terminal Logs — left */}
        <div
          className="absolute z-30 leading-[1.6] text-[#fff34d] blur-[0.5px] opacity-90"
          style={{ left: '6.25vw', top: '46.91%', width: '20.13vw', fontSize: 'max(0.5vw, 0.7vh)' }}
        >
          <p>[11:42:03 | INIT ] SYSTEM BOOT STARTED</p>
          <p>[11:42:05 | LOAD ] CORE MODULES ONLINE</p>
          <p>[11:42:06 | LOAD ] AUX MODULE BBR-003 FAILED</p>
          <p>[11:42:07 | ERR  ] DEPENDENCY ERROR</p>
          <p style={{ marginTop: '1.5%' }}>[11:42:09 | NET  ] SCANNING NODES...</p>
          <p>[11:42:11 | NET  ] NODE 77AF91C2 FOUND</p>
          <p>[11:42:12 | AUTH ] AUTHENTICATION FAILED</p>
          <p>[11:42:14 | RETRY] ATTEMPT 02 FAILED</p>
        </div>

        {/* Terminal Logs — right */}
        <div
          className="absolute z-30 leading-[1.6] text-[#fff34d] blur-[0.5px] opacity-90 text-right"
          style={{ right: '6.25vw', top: '31.51%', width: '20.13vw', fontSize: 'max(0.5vw, 0.7vh)' }}
        >
          <p>[03:17:08 | INIT ] BOOT SEQUENCE STARTED</p>
          <p>[03:17:10 | LOAD ] MODULE 554-002 LOADED</p>
          <p>[03:17:12 | LOAD ] MODULE 888-001 FAILED</p>
          <p>[03:17:15 | ERR  ] DEPENDENCY NOT FOUND</p>
          <p>[03:17:16 | WARN ] FALLBACK PROTOCOL ENABLED</p>
          <p>[03:17:17 | SYNC ] ATTEMPTING GRID LINK...</p>
          <p>[03:17:19 | FAIL ] GRID CONNECTION TIMEOUT</p>
          <p>[03:17:21 | RETRY] RETRY COUNT: 03</p>
        </div>

        {/* Alignment Crosses */}
        <Cross style={{ left: '24.3vw',  top: '17.5%' }} />
        <Cross style={{ right: '24.3vw', top: '17.5%' }} />
        <Cross style={{ left: '24.3vw',  bottom: '11.9%' }} />
        <Cross style={{ right: '24.3vw', bottom: '11.9%' }} />

    


        {/* Vector2 — top-right, slow clockwise */}
        <div className="absolute z-10 opacity-50" style={{ right: '27.08vw', top: '5.6%', width: '2.77vw' }}>
          {/* <div style={{ animation: 'slow-spin 8s linear infinite' }}> */}
            <Vector2 />
          {/* </div> */}
        </div>

        {/* Vector2 — bottom-left, slow counter-clockwise */}
        <div className="absolute z-10" style={{ left: '27.08vw', bottom: '5.6%', width: '2.77vw', opacity: 1 }}>
          {/* <div style={{ animation: 'slow-spin 8s linear infinite reverse' }}> */}
            <Vector2 />
          {/* </div> */}
        </div>
        
        {/* Frame30 — bottom-center, gentle pulse + slow spin */}
        <div className="absolute z-10" style={{ bottom: '0.5%', left: '44.93vw', width: '10.41vw' }}>
          {/* <div style={{ animation: 'slow-spin 20s linear infinite' }}> */}
            <Frame30 />
          {/* </div> */}
        </div>

        {/* Group93 — bottom-left gauge, clockwise */}
        <div className="absolute z-10" style={{ bottom: '9%', left: '25.3vw', width: '15vw' }}>
          <div style={{ animation: 'slow-spin 10s linear infinite', transformOrigin: '43% 38.5%' }}>
            <Group93 />
          </div>
        </div>
               <BlueCircle className='hidden sm:block top-12 left-22' />
                <BlueCircle className='hidden sm:block bottom-8 right-22 rotate-180' />
        {/* Group93 — top-right gauge, counter-clockwise */}
        <div className="absolute z-10" style={{ top: '23.8%', right: '21.52vw', width: '8vw' }}>
          <div style={{ animation: 'slow-spin 10s linear infinite reverse', transformOrigin: '43% 38.5%' }}>
            <Group93 />
          </div>
        </div>

      </div>
    </div>
  );
}
