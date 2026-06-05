import { Metadata } from 'next';
import React from 'react';
import { getMagazineIssues } from '@/data/magazineData';
import MagazineHero from '@/components/magazine/MagazineHero';
import MagazineList from '@/components/magazine/MagazineList';
import ComingSoon from '@/components/ui/ComingSoon';

export const metadata: Metadata = {
  title: 'Magazine Archives | Illumine 2026',
  description: 'Browse and download technical newsletters, reunion magazines, and editorial issues published by the JU IT Department.',
  openGraph: {
    title: 'Magazine Archives | Illumine 2026',
    description: 'Browse and download technical newsletters, reunion magazines, and editorial issues published by the JU IT Department.',
    url: 'https://illumine-reunion-ju-it.vercel.app/magazine',
    type: 'website',
    images: [
      {
        url: '/photos/Hero/logo.jpeg',
        width: 800,
        height: 800,
        alt: 'ILLUMINE 2026 Magazine Collection',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Magazine Archives | Illumine 2026',
    description: 'Browse and download technical newsletters, reunion magazines, and editorial issues published by the JU IT Department.',
  },
};

export default function MagazinePage() {
  const issues = getMagazineIssues();

  return (
    // <main className="relative min-h-screen bg-[#070707] text-[#d9fff6] pt-28 pb-20 overflow-hidden font-tt-lakes">
    //   <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 flex flex-col gap-6">
    //     <MagazineHero />
    //     <MagazineList issues={issues} />
    //   </div>
    // </main>
    <ComingSoon></ComingSoon>
  );
}
