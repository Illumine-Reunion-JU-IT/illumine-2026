import { Metadata } from 'next';
import React from 'react';
import EventsPageClient from '@/components/events/EventsPageClient';

export const metadata: Metadata = {
  title: 'Events | Illumine 2026',
  description: 'Explore the schedule modules, tournaments, and cultural events of the Jadavpur University IT Department Reunion.',
  openGraph: {
    title: 'Events | Illumine 2026',
    description: 'Explore the schedule modules, tournaments, and cultural events of the Jadavpur University IT Department Reunion.',
    url: 'https://illumine-reunion-ju-it.vercel.app/events',
    type: 'website',
    images: [
      {
        url: '/photos/Hero/logo.jpeg',
        width: 800,
        height: 800,
        alt: 'ILLUMINE 2026 Events Listing',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Events | Illumine 2026',
    description: 'Explore the schedule modules, tournaments, and cultural events of the Jadavpur University IT Department Reunion.',
    images: ['/photos/Hero/logo.jpeg'],
  },
};

export default function EventsListingPage() {
  return <EventsPageClient />;
}
