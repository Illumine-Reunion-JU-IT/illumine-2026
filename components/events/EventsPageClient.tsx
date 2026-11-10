'use client';

import React, { useState, useMemo } from 'react';
import { getEvents } from '@/data/events';
import ArcReactor from '@/components/arc-reactor';
import BigCircle from '@/components/ui/BigCircle';
import BlueCircle from '@/components/ui/BlueCircle';
import Plus from '@/components/ui/Plus';
import DecryptedText from '@/components/ui/DecryptedText';
import EventFilters from '@/components/events/EventFilters';
import EventGrid from '@/components/events/EventGrid';
import EventCard from '@/components/events/EventCard';

export default function EventsPageClient() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const allEvents = useMemo(() => getEvents(), []);
  
  // Filter events based on selected category tab
  const filteredEvents = useMemo(() => {
    if (selectedCategory === 'all') return allEvents;
    return allEvents.filter(evt => evt.category === selectedCategory);
  }, [selectedCategory, allEvents]);

  // Featured Events
  const featuredEvents = useMemo(() => {
    return allEvents.filter(evt => evt.featured);
  }, [allEvents]);

  return (
    <div className="relative min-h-screen bg-[#070707] text-[#d9fff6] pt-28 pb-20 overflow-x-hidden font-tt-lakes">
      
      {/* ── BACKGROUND HUD DECORATIONS ── */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Subtle grid */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: 'linear-gradient(rgba(123,97,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(123,97,255,0.05) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />
        
        {/* Glowing concentric HUD elements */}
        <div className="absolute top-[20%] left-[-100px] opacity-40">
          <ArcReactor size={320} accentColor="teal" className="opacity-30" />
        </div>
        <div className="absolute bottom-[10%] right-[-100px] opacity-40">
          <ArcReactor size={380} accentColor="purple" className="opacity-30" />
        </div>

        {/* Plus indicators */}
        <Plus className="top-[15%] left-[10%]" delay={0.2} />
        <Plus className="top-[45%] right-[15%]" delay={0.6} />
        <Plus className="bottom-[20%] left-[25%]" delay={1.0} />

        {/* HUD circles */}
        <BigCircle className="right-[15%] top-[12%] scale-90" />
        <BlueCircle className="left-[5%] bottom-[15%] rotate-45" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* ── HEADER ── */}
        <div className="flex flex-col items-center text-center mb-16 relative">
          <p className="text-[10px] md:text-xs font-mono tracking-[0.4em] text-[#7B61FF] uppercase mb-3">
            System // Live_Timetable_Timelines
          </p>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-[0.1em] text-white font-mechsuit mb-4 drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]">
            <DecryptedText 
              text="ILLUMINE EVENTS" 
              animateOn="view" 
              speed={70} 
              sequential
            />
          </h1>

          <div className="w-24 h-[2px] bg-gradient-to-r from-transparent via-[#7B61FF] to-transparent mb-6" />
          
          <p className="text-gray-400 text-xs sm:text-sm tracking-wider max-w-xl leading-relaxed uppercase">
            Explore schedule modules, tournaments, and cultural events. Register via terminal links to lock in entry credentials.
          </p>
        </div>

        {/* ── FEATURED SECTION ── */}
        {/* {featuredEvents.length > 0 && selectedCategory === 'all' && (
          <div className="mb-20">
            <div className="flex items-center gap-4 mb-8">
              <span className="w-2 h-2 bg-[#ffe94d] rounded-full animate-ping" />
              <h2 className="text-lg md:text-xl font-bold tracking-[0.3em] uppercase text-white font-mono">
                {"// FEATURED_SYS_CHANNELS"}
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              {featuredEvents.map(evt => (
                <div key={evt.id} className="relative p-[1.5px] bg-gradient-to-br from-[#ffe94d]/40 via-[#7B61FF]/20 to-transparent">
                  <EventCard event={evt} />
                </div>
              ))}
            </div>
          </div>
        )} */}

        {/* ── TIMETABLE / LISTING ── */}
        <div className="mt-12">
          <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-8">
            <h2 className="text-lg md:text-xl font-bold tracking-[0.3em] uppercase text-white font-mono flex items-center gap-2">
              <span>{"// SCHEDULE_LOG"}</span>
              {/* <span className="text-xs text-gray-500 font-normal">({filteredEvents.length} items loaded)</span> */}
            </h2>
          </div>

          {/* Filtering tabs */}
          <EventFilters 
            currentCategory={selectedCategory} 
            onCategoryChange={setSelectedCategory} 
          />

          {/* Listing grid */}
          <EventGrid events={filteredEvents} />
        </div>

      </div>
    </div>
  );
}
