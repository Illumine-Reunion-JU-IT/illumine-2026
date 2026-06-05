import { Metadata } from 'next';
import React from 'react';
import { getAlumni } from '@/data/alumniData';
import AlumniHero from '@/components/alumni/AlumniHero';
import AlumniList from '@/components/alumni/AlumniList';
import ComingSoon from '@/components/ui/ComingSoon';

export const metadata: Metadata = {
  title: 'Alumni Directory | Illumine 2026',
  description: 'Explore and reconnect with the distinguished graduates of Jadavpur University Department of Information Technology.',
  openGraph: {
    title: 'Alumni Directory | Illumine 2026',
    description: 'Explore and reconnect with the distinguished graduates of Jadavpur University Department of Information Technology.',
    url: 'https://illumine-reunion-ju-it.vercel.app/alumni',
    type: 'website',
    images: [
      {
        url: '/photos/Hero/logo.jpeg',
        width: 800,
        height: 800,
        alt: 'ILLUMINE 2026 Alumni Registry',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Alumni Directory | Illumine 2026',
    description: 'Explore and reconnect with the distinguished graduates of Jadavpur University Department of Information Technology.',
  },
};

export default function AlumniPage() {
  const profiles = getAlumni();

  return (
    // <main className="relative min-h-screen bg-[#070707] text-[#d9fff6] pt-28 pb-20 overflow-hidden font-tt-lakes">
    //   <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 flex flex-col gap-6">
    //     <AlumniHero />
    //     <AlumniList profiles={profiles} />
    //   </div>
    // </main>
    <ComingSoon></ComingSoon>
  );
}
