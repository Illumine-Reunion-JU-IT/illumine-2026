'use client';

import React from 'react';
import { Event } from '@/types/event';
import EventCard from './EventCard';

export interface EventGridProps {
  events: Event[];
}

export const EventGrid: React.FC<EventGridProps> = ({ events }) => {
  if (events.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 border border-white/5 bg-black/40 rounded-lg text-center px-4 w-full">
        <span className="text-[#ffe94d] text-2xl mb-2 font-mono">WARNING: EMPTY_QUERY</span>
        <p className="text-gray-500 text-xs tracking-wider uppercase font-mono">
          No events found matching this filter set.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 w-full z-10">
      {events.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  );
};

export default EventGrid;
