'use client';

import React from 'react';
import { useScroll, motion } from 'framer-motion';
import { timelineData } from '@/data/aboutTimeline';
import DecryptedText from '@/components/ui/DecryptedText';

export default function AboutLegacy() {
  const containerRef = React.useRef<HTMLDivElement>(null);
  
  // Track scroll progress of the timeline container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 65%", "end 50%"]
  });

  return (
    <section className="relative w-full py-24 bg-[#070707] overflow-hidden flex flex-col items-center justify-center font-mono">
      
      {/* ── SECTION TITLE ── */}
      <div className="flex flex-col items-center text-center mb-20 px-6">
        <p className="text-[10px] sm:text-xs font-mono tracking-[0.4em] text-indigo-400 uppercase mb-3">
          CHRONOLOGY // LOG_DATABASE_SECTOR
        </p>
        <h2 className="font-mechsuit text-2xl sm:text-3xl text-white tracking-[0.2em] drop-shadow-[0_0_10px_rgba(255,255,255,0.15)]">
          <DecryptedText
            text="LEGACY & IMPACT"
            animateOn="view"
            speed={60}
            sequential
          />
        </h2>
        <div className="w-16 h-[1px] bg-white/20 mt-4" />
      </div>

      {/* ── TIMELINE CONTAINER ── */}
      <div ref={containerRef} className="relative w-full max-w-4xl px-6 flex flex-col">
        
        {/* Central timeline background line */}
        <div 
          className="absolute left-6 md:left-1/2 top-0 bottom-0 w-[2px] bg-white/5 -translate-x-1/2" 
          aria-hidden="true"
        />

        {/* Central timeline neon highlighted overlay */}
        <motion.div 
          style={{ scaleY: scrollYProgress, transformOrigin: "top" }}
          className="absolute left-6 md:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#7B61FF] via-[#64ffda] to-[#7B61FF] -translate-x-1/2 origin-top shadow-[0_0_10px_#7B61FF,0_0_20px_#64ffda]" 
          aria-hidden="true"
        />

        <div className="flex flex-col gap-16 md:gap-20">
          {timelineData.map((node, index) => (
            <TimelineItem key={node.year} node={node} index={index} />
          ))}
        </div>

      </div>
    </section>
  );
}

// ── TIMELINE ITEM SUB-COMPONENT WITH INTERSECTION OBSERVER ──
const TimelineItem = ({ node, index }: { node: typeof timelineData[0]; index: number }) => {
  const itemRef = React.useRef<HTMLDivElement>(null);
  const [isActive, setIsActive] = React.useState(false);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsActive(entry.isIntersecting);
      },
      {
        rootMargin: '-30% 0px -40% 0px', // Active when the node is in the middle section of the viewport
        threshold: 0,
      }
    );

    if (itemRef.current) {
      observer.observe(itemRef.current);
    }

    return () => {
      if (itemRef.current) {
        observer.unobserve(itemRef.current);
      }
    };
  }, []);

  const isLeft = index % 2 === 0;

  return (
    <div 
      ref={itemRef}
      className="relative flex flex-col md:flex-row items-start justify-between w-full md:even:flex-row-reverse"
    >
      {/* Timeline node connector dot */}
      <div 
        className={`absolute left-[24px] md:left-1/2 top-3 w-3.5 h-3.5 rounded-full -translate-x-1/2 z-10 transition-all duration-500
          ${isActive 
            ? 'bg-[#64ffda] border-2 border-[#64ffda] scale-125 shadow-[0_0_15px_#64ffda]' 
            : 'bg-[#070707] border-2 border-[#64ffda]/30 scale-100'
          }`}
        aria-hidden="true"
      />

      {/* Content Block */}
      <div className={`w-full md:w-[45%] pl-10 md:pl-0 ${isLeft ? 'md:text-right' : 'md:text-left'}`}>
        {/* Year tag */}
        <span 
          className={`inline-block text-xl font-black tracking-widest font-mono mb-2 transition-all duration-500
            ${isActive 
              ? 'text-[#64ffda] scale-105 drop-shadow-[0_0_8px_rgba(100,255,218,0.4)]' 
              : 'text-[#64ffda]/40'
            }`}
        >
          [{node.year}]
        </span>

        {/* Cyberpunk card layout */}
        <div 
          className={`relative bg-[#0c0f1d]/75 border p-6 transition-all duration-500
            ${isActive 
              ? 'border-[#7B61FF]/60 shadow-[0_0_20px_rgba(123,97,255,0.15)] bg-[#0c0f1d]/90' 
              : 'border-white/5 hover:border-indigo-500/25'
            }`}
          style={{
            clipPath: isLeft 
              ? 'polygon(0% 0%, 96% 0%, 100% 12%, 100% 100%, 4% 100%, 0% 88%)'
              : 'polygon(0% 12%, 4% 0%, 100% 0%, 100% 88%, 96% 100%, 0% 100%)',
          }}
        >
          {/* Glowing corners */}
          <div 
            className={`absolute top-0 right-0 w-3 h-[1.5px] pointer-events-none transition-all duration-500
              ${isActive ? 'bg-[#64ffda]' : 'bg-indigo-500/40'}`} 
            aria-hidden="true" 
          />
          <div 
            className={`absolute bottom-0 left-0 w-3 h-[1.5px] pointer-events-none transition-all duration-500
              ${isActive ? 'bg-[#64ffda]' : 'bg-indigo-500/40'}`} 
            aria-hidden="true" 
          />

          <h3 
            className={`text-xs font-bold uppercase tracking-[0.25em] font-mono mb-3 transition-colors duration-500
              ${isActive ? 'text-white' : 'text-gray-400'}`}
          >
            {node.title}
          </h3>
          <p 
            className={`text-xs sm:text-sm leading-relaxed font-light font-tt-lakes transition-colors duration-500
              ${isActive ? 'text-white/95' : 'text-[#BEF3DF]/75'}`}
          >
            {node.description}
          </p>
        </div>
      </div>

      {/* Balancing spacer */}
      <div className="hidden md:block w-[45%]" aria-hidden="true" />
    </div>
  );
};
