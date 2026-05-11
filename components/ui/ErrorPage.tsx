"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import ArcReactor from '@/components/arc-reactor';
import Group93Red from '@/assets/coming_soon_svgs/svg/Group93Red';
import Frame30 from '@/assets/coming_soon_svgs/svg/Frame30';
import Vector2 from '@/assets/coming_soon_svgs/svg/Vector2';
import BlueCircle from './BlueCircle';
// adjust path if needed

// ─── Reuse the same hook from ComingSoon ───────────────────────────────────────
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

// ─── Same cross component from ComingSoon ─────────────────────────────────────
const Cross = ({ style }: { style?: React.CSSProperties }) => (
  <div className="absolute aspect-square" style={{ width: '1.25vw', ...style }}>
    <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-white/20 -translate-x-1/2" />
    <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-white/20 -translate-y-1/2" />
  </div>
);

// ─── Warning triangle (matches reference image) ────────────────────────────────
const WarnTriangle = ({ style }: { style?: React.CSSProperties }) => (
  <div className="absolute z-20" style={style}>
    <svg width="42" height="42" viewBox="0 0 42 42" fill="none">
      <polygon
        points="21,4 39,36 3,36"
        stroke="#c83232"
        strokeWidth="1.5"
        fill="rgba(200,50,50,0.08)"
        strokeLinejoin="round"
      />
      <text
        x="21" y="30"
        textAnchor="middle"
        fill="#c83232"
        fontSize="16"
        fontWeight="bold"
        fontFamily="monospace"
      >!</text>
    </svg>
  </div>
);

// ─── Glitching ERROR:404 heading ───────────────────────────────────────────────
const GlitchHeading = () => {
  const [glitch, setGlitch] = useState(false);
  useEffect(() => {
    const interval = setInterval(() => {
      setGlitch(true);
      setTimeout(() => setGlitch(false), 300);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  return (
    <h1
      className="font-black uppercase tracking-widest select-none relative"
      style={{
        fontFamily: "'TT Lakes Neue Trial', sans-serif",
        fontSize: 'clamp(28px, 6vw, 72px)',
        color: '#c83232',
        textShadow: glitch
          ? '-3px 0 #00ffff, 3px 0 #ff0066, 0 0 30px rgba(200,50,50,0.6)'
          : '0 0 30px rgba(200,50,50,0.45), 0 0 60px rgba(200,50,50,0.2)',
        transform: glitch ? `translateX(${Math.random() > 0.5 ? 2 : -2}px)` : 'none',
        transition: 'transform 0.05s, text-shadow 0.05s',
        letterSpacing: '0.06em',
      }}
    >
      ERROR:404
    </h1>
  );
};

// ─── Terminal log block ────────────────────────────────────────────────────────
const TerminalBlock = ({
  logs,
  align = 'left',
  style,
}: {
  logs: { text: string; level: 'info' | 'err' | 'warn' }[];
  align?: 'left' | 'right';
  style?: React.CSSProperties;
}) => (
  <div
    className="absolute z-30 leading-relaxed"
    style={{
      fontSize: 'max(0.5vw, 0.65vh)',
      fontFamily: "'TT Lakes Neue Trial', monospace",
      textAlign: align,
      ...style,
    }}
  >
    {logs.map((log, i) => (
      <p
        key={i}
        style={{
          color:
            log.level === 'err'
              ? '#c83232'
              : log.level === 'warn'
              ? 'rgba(200,120,50,0.85)'
              : 'rgba(200,50,50,0.7)',
          margin: 0,
        }}
      >
        {log.text}
      </p>
    ))}
  </div>
);

// ─── Blinking cursor dot ───────────────────────────────────────────────────────
const BlinkDot = () => {
  const [on, setOn] = useState(true);
  useEffect(() => {
    const t = setInterval(() => setOn(v => !v), 600);
    return () => clearInterval(t);
  }, []);
  return (
    <span
      style={{
        display: 'inline-block',
        width: 8,
        height: 8,
        borderRadius: '50%',
        background: on ? '#c83232' : 'transparent',
        border: '1px solid #c83232',
        marginLeft: 6,
        verticalAlign: 'middle',
        transition: 'background 0.1s',
      }}
    />
  );
};

// ─────────────────────────────────────────────────────────────────────────────
export default function NotFound() {
  const reactorSize = useReactorSize();

  const logsLeft = [
    { text: '[11:42:03 | INIT ] SYSTEM BOOT STARTED',       level: 'info' as const },
    { text: '[11:42:05 | LOAD ] CORE MODULES ONLINE',        level: 'info' as const },
    { text: '[11:42:06 | LOAD ] MODULE BBR-003 FAILED',      level: 'err'  as const },
    { text: '[11:42:07 | ERR  ] DEPENDENCY ERROR',           level: 'err'  as const },
    { text: '[11:42:09 | NET  ] SCANNING NODES...',          level: 'info' as const },
    { text: '[11:42:11 | NET  ] NODE 77AF91C2 FOUND',        level: 'info' as const },
    { text: '[11:42:12 | AUTH ] AUTHENTICATION FAILED',      level: 'err'  as const },
    { text: '[11:42:14 | RETRY] ATTEMPT 02 FAILED',          level: 'warn' as const },
    { text: '[11:42:16 | SYS  ] CPU LOAD: 99%',             level: 'err'  as const },
    { text: '[11:42:18 | MEM  ] MEMORY USAGE HIGH',          level: 'warn' as const },
    { text: '[11:42:20 | SYNC ] GRID LINK ATTEMPT',          level: 'info' as const },
    { text: '[11:42:21 | FAIL ] CONNECTION TIMEOUT',         level: 'err'  as const },
    { text: '[11:42:34 | TEMP ] THERMAL LIMIT EXCEEDED',     level: 'err'  as const },
    { text: '[11:42:38 | PANIC] KERNEL FAILURE',             level: 'err'  as const },
    { text: '[11:42:41 | HALT ] SHUTDOWN INITIATED',         level: 'err'  as const },
  ];

  const logsRight = [
    { text: '[03:17:08 | INIT ] BOOT SEQUENCE STARTED',      level: 'info' as const },
    { text: '[03:17:10 | LOAD ] MODULE 554-002 LOADED',       level: 'info' as const },
    { text: '[03:17:12 | LOAD ] MODULE 888-001 FAILED',       level: 'err'  as const },
    { text: '[03:17:15 | ERR  ] DEPENDENCY NOT FOUND',        level: 'err'  as const },
    { text: '[03:17:16 | WARN ] FALLBACK PROTOCOL ENABLED',   level: 'warn' as const },
    { text: '[03:17:17 | SYNC ] ATTEMPTING GRID LINK...',     level: 'info' as const },
    { text: '[03:17:19 | FAIL ] GRID CONNECTION TIMEOUT',     level: 'err'  as const },
    { text: '[03:17:21 | RETRY] RETRY COUNT: 03',             level: 'warn' as const },
    { text: '[03:17:24 | CRIT ] SYSTEM INSTABILITY DETECTED', level: 'err'  as const },
    { text: '[03:17:25 | SHUT ] EMERGENCY SHUTDOWN INITIATED',level: 'err'  as const },
  ];

  return (
    <div
      className="relative w-full h-[90vh] bg-[#0a0a0a] overflow-hidden"
      style={{ fontFamily: "'TT Lakes Neue Trial', sans-serif" }}
    >
      {/* ── Scanline overlay ── */}
      <div
        className="absolute inset-0 pointer-events-none z-40"
        style={{
          backgroundImage:
            'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.12) 2px, rgba(0,0,0,0.12) 4px)',
        }}
      />

      {/* ── Subtle grid ── */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          backgroundImage:
            'linear-gradient(rgba(200,50,50,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(200,50,50,0.04) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      {/* ── Vignette ── */}
      <div
        className="absolute inset-0 pointer-events-none z-10"
        style={{
          background:
            'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.65) 100%)',
        }}
      />

      <div className="relative w-full h-full">

        {/* ── ARC REACTOR — centered, red accent, dimmed ── */}
        <div
          className="absolute flex items-center justify-center"
          style={{
            left: '27.77vw',
            top: '5.18%',
            width: '44.44vw',
            height: '89.63%',
          }}
        >
          {/* Red glow bloom */}
          <div
            className="absolute rounded-full pointer-events-none"
            style={{
              width: '55%',
              height: '55%',
              background:
                'radial-gradient(circle, rgba(200,50,50,0.08) 0%, transparent 70%)',
            }}
          />

          {/* ArcReactor — red accent, same size logic as ComingSoon */}
          <div className="absolute inset-0 flex items-center justify-center z-0 pointer-events-none">
            <ArcReactor
              accentColor="red"
              size={reactorSize}
              className="opacity-45"
            />
          </div>

          {/* ── FOREGROUND: main error content ── */}
          <div className="absolute inset-0 z-50 flex flex-col items-center justify-center pointer-events-none">

            {/* Status chip */}
            <p
              className="uppercase tracking-[0.3em] text-[#c83232]"
              style={{ fontSize: 'max(0.55vw, 0.7vh)', marginBottom: '2%', opacity: 0.7 }}
            >
              SYSTEM STATUS: CRITICAL FAILURE <BlinkDot />
            </p>

            {/* Glitching ERROR:404 */}
            <GlitchHeading />

            {/* Sub-heading */}
            <h2
              className="font-bold tracking-[0.22em] text-white/80 uppercase"
              style={{ fontSize: 'max(1vw, 1.1vh)', marginTop: '2%' }}
            >
              — PAGE NOT FOUND —
            </h2>

            {/* Back button */}
            <Link
              href="/"
              className="pointer-events-auto text-white font-bold tracking-[0.15em] transition-all hover:brightness-110 active:scale-95"
              style={{
                marginTop: '5%',
                padding: '1.5% 3%',
                fontSize: 'max(0.7vw, 1vh)',
                background: '#4a4ccc',
                clipPath:
                  'polygon(8% 0, 100% 0, 100% 65%, 92% 100%, 0 100%, 0 35%)',
              }}
            >
              BACK TO HOME
            </Link>
          </div>
        </div>

        {/* ── Decorative side labels ── */}
        <div
          className="absolute text-[#c83232] font-bold uppercase tracking-[0.35em] z-40"
          style={{ left: '24.86vw', top: '14%', fontSize: 'max(0.8vw, 1vh)', opacity: 0.6 }}
        >
          404 PAGE NOT FOUND
        </div>
        <div
          className="absolute text-[#c83232] font-bold uppercase tracking-[0.35em] z-40"
          style={{ right: '6.25vw', bottom: '15%', fontSize: 'max(0.8vw, 1vh)', opacity: 0.6 }}
        >
          ERROR
        </div>

        {/* ── Terminal logs — left ── */}
        <TerminalBlock
          logs={logsLeft}
          align="left"
          style={{ left: '6.25vw', top: '36%', width: '20.13vw' }}
        />

        {/* ── Terminal logs — right ── */}
        <TerminalBlock
          logs={logsRight}
          align="right"
          style={{ right: '6.25vw', top: '28%', width: '20.13vw' }}
        />

        {/* ── Alignment Crosses (same positions as ComingSoon) ── */}
        <Cross style={{ left: '24.3vw',  top: '17.5%' }} />
        <Cross style={{ right: '24.3vw', top: '17.5%' }} />
        <Cross style={{ left: '24.3vw',  bottom: '11.9%' }} />
        <Cross style={{ right: '24.3vw', bottom: '11.9%' }} />

        {/* ── Warning triangles ── */}
        <WarnTriangle style={{ left: '6%',  top: '8%' }} />
        <WarnTriangle style={{ right: '8%', bottom: '25%' }} />

        {/* ── Vector2 diamonds ── */}
        <div
          className="absolute z-10 opacity-50"
          style={{ right: '27.08vw', top: '5.6%', width: '2.77vw' }}
        >
          <Vector2 />
        </div>
        <div
          className="absolute z-10"
          style={{ left: '27.08vw', bottom: '5.6%', width: '2.77vw', opacity: 1 }}
        >
          <Vector2 />
        </div>

        {/* ── Frame30 bottom-center ── */}
        <div
          className="absolute z-10"
          style={{ bottom: '0.5%', left: '44.93vw', width: '10.41vw' }}
        >
          <Frame30 />
        </div>

        {/* ── Group93 — bottom-left gauge, clockwise (same as ComingSoon) ── */}
        <div
          className="absolute z-10"
          style={{ bottom: '9%', left: '25.3vw', width: '15vw' }}
        >
          <div
            style={{
              animation: 'slow-spin 10s linear infinite',
              transformOrigin: '43% 38.5%',
            }}
          >
            <Group93Red />
          </div>
        </div>

        {/* ── Group93 — top-right gauge, counter-clockwise (same as ComingSoon) ── */}
        <div
          className="absolute z-10"
          style={{ top: '23.8%', right: '21.52vw', width: '8vw' }}
        >
          <div
            style={{
              animation: 'slow-spin 10s linear infinite reverse',
              transformOrigin: '43% 38.5%',
            }}
          >
            <Group93Red />
          </div>
        </div>

        {/* ── BlueCircle corners (same as ComingSoon) ── */}
        <BlueCircle className="hidden sm:block top-12 left-22" />
        <BlueCircle className="hidden sm:block bottom-8 right-22 rotate-180" />

      </div>

      {/* ── Global keyframe for spinning gauges ── */}
      <style>{`
        @keyframes slow-spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}