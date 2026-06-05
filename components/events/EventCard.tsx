'use client';

import React from 'react';
import Link from 'next/link';
import { Event } from '@/types/event';

export interface EventCardProps {
  event: Event;
}

export const EventCard: React.FC<EventCardProps> = ({ event }) => {
  const isSports = event.category === 'sports';
  const isCultural = event.category === 'cultural';
  const isAcademic = event.category === 'academic';

  // Cyberpunk border/glow styling based on category
  let accentColor = '#7B61FF'; // Default purple
  if (isSports) accentColor = '#ffe94d'; // Yellow
  if (isCultural) accentColor = '#ff4d6d'; // Pinkish-Red
  if (isAcademic) accentColor = '#64ffda'; // Teal

  return (
    <Link href={`/events/${event.slug}`} className="group block relative">
      {/* Glow Backdrop */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-lg pointer-events-none blur-xl -z-10"
        style={{ background: accentColor }}
      />

      <div 
        className="relative flex flex-col p-6 min-h-[220px] bg-[#0c0f1d]/80 border border-white/10 hover:border-white/20 transition-all duration-300 hover:-translate-y-1 w-full"
        style={{
          clipPath: 'polygon(0% 0%, 92% 0%, 100% 8%, 100% 100%, 8% 100%, 0% 92%)',
          boxShadow: event.featured ? `0 0 15px ${accentColor}1c` : 'none',
        }}
      >
        {/* Futuristic accent borders */}
        <div 
          className="absolute top-0 right-0 h-[2px] w-12 transition-all duration-300"
          style={{ background: accentColor }}
        />
        <div 
          className="absolute bottom-0 left-0 h-[2px] w-12 transition-all duration-300"
          style={{ background: accentColor }}
        />

        {/* Top bar with category & featured badge */}
        <div className="flex items-center justify-between mb-4">
          <span 
            className="text-[10px] font-bold tracking-[0.2em] uppercase px-2.5 py-0.5"
            style={{ 
              border: `1px solid ${accentColor}`, 
              color: accentColor,
              clipPath: 'polygon(10% 0%, 100% 0%, 90% 100%, 0% 100%)'
            }}
          >
            {event.category}
          </span>

          {event.featured && (
            <span 
              className="text-[9px] font-extrabold tracking-[0.15em] bg-[#6265fe]/20 text-[#6265fe] border border-[#6265fe]/40 px-2 py-0.5 uppercase flex items-center gap-1 shadow-[0_0_8px_rgba(98,101,254,0.4)]"
              style={{
                clipPath: 'polygon(0% 0%, 90% 0%, 100% 100%, 10% 100%)'
              }}
            >
              <span className="w-1 h-1 bg-[#6265fe] rounded-full animate-ping" />
              FEATURED
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className="text-white font-bold text-lg tracking-wider group-hover:text-[#B6BBFF] transition-colors mb-2 font-tt-lakes">
          {event.title}
        </h3>

        {/* Short description */}
        <p className="text-gray-400 text-xs sm:text-sm leading-relaxed mb-6 font-light flex-grow">
          {event.shortDescription}
        </p>

        {/* Date/Time indicator */}
        {event.eventDate && (
          <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between text-[11px] text-gray-500 font-mono">
            <span>DATE // TIME</span>
            <span className="text-[#BEF3DF]">{event.eventDate}</span>
          </div>
        )}
      </div>
    </Link>
  );
};

export default EventCard;
