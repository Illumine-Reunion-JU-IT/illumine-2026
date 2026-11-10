import { Metadata } from 'next';
import React from 'react';
import AboutHero from '@/components/about/AboutHero';
import AboutIllumine from '@/components/about/AboutIllumine';
import AboutDepartment from '@/components/about/AboutDepartment';
import AboutJubilee from '@/components/about/AboutJubilee';
import AboutLegacy from '@/components/about/AboutLegacy';
import AboutCTA from '@/components/about/AboutCTA';

export const metadata: Metadata = {
  title: 'About | Illumine 2026',
  description: 'Understand the mission, department updates, Silver Jubilee details, and historical legacy of Jadavpur University IT Department Reunion.',
  alternates: {
    canonical: '/about',
  },
  openGraph: {
    title: 'About | Illumine 2026',
    description: 'Understand the mission, department updates, Silver Jubilee details, and historical legacy of Jadavpur University IT Department Reunion.',
    url: '/about',
    type: 'website',
    images: [
      {
        url: '/photos/Hero/hero.png',
        width: 1440,
        height: 714,
        alt: 'ILLUMINE 2026 About Details',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About | Illumine 2026',
    description: 'Understand the mission, department updates, Silver Jubilee details, and historical legacy of Jadavpur University IT Department Reunion.',
    images: ['/photos/Hero/hero.png'],
  },
};

export default function AboutPage() {
  return (
    <main className="flex flex-col bg-[#070707] text-[#d9fff6]">
      {/* <AboutHero /> */}
      <AboutIllumine />
      <AboutDepartment />
      <AboutJubilee />
      <AboutLegacy />
      <AboutCTA />
    </main>
  );
}
