import { Metadata } from 'next';
import React from 'react';
import EventsPageClient from '@/components/events/EventsPageClient';

export const metadata: Metadata = {
  title: 'Events | Illumine 2026',
  description: 'Explore the schedule modules, tournaments, and cultural events of the Jadavpur University IT Department Reunion.',
  alternates: {
    canonical: '/events',
  },
  openGraph: {
    title: 'Events | Illumine 2026',
    description: 'Explore the schedule modules, tournaments, and cultural events of the Jadavpur University IT Department Reunion.',
    url: '/events',
    type: 'website',
    images: [
      {
        url: '/photos/Hero/hero.png',
        width: 1440,
        height: 714,
        alt: 'ILLUMINE 2026 Events Listing',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Events | Illumine 2026',
    description: 'Explore the schedule modules, tournaments, and cultural events of the Jadavpur University IT Department Reunion.',
    images: ['/photos/Hero/hero.png'],
  },
};

export default function EventsListingPage() {
  return <EventsPageClient />;
}
