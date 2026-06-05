import { Metadata } from 'next';
import React from 'react';
import ContactForm from '@/components/contact/ContactForm';
import ArcReactor from '@/components/arc-reactor';
import BigCircle from '@/components/ui/BigCircle';
import BlueCircle from '@/components/ui/BlueCircle';
import Plus from '@/components/ui/Plus';
import DecryptedText from '@/components/ui/DecryptedText';

export const metadata: Metadata = {
  title: 'Contact Us | Illumine 2026',
  description: 'Reach out to Jadavpur University IT Department for queries, coordination, or support regarding the ILLUMINE 2026 Silver Jubilee Reunion.',
  openGraph: {
    title: 'Contact Us | Illumine 2026',
    description: 'Reach out to Jadavpur University IT Department for queries, coordination, or support regarding the ILLUMINE 2026 Silver Jubilee Reunion.',
    url: 'https://illumine-reunion-ju-it.vercel.app/contact-us',
    type: 'website',
    images: [
      {
        url: '/photos/Hero/logo.jpeg',
        width: 800,
        height: 800,
        alt: 'ILLUMINE 2026 Contact Channels',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact Us | Illumine 2026',
    description: 'Reach out to Jadavpur University IT Department for queries, coordination, or support regarding the ILLUMINE 2026 Silver Jubilee Reunion.',
  },
};

export default function ContactUsPage() {
  return (
    <main className="relative min-h-screen bg-[#070707] text-[#d9fff6] pt-32 pb-24 overflow-x-hidden font-tt-lakes flex flex-col items-center justify-center">
      
      {/* ── BACKGROUND HUD DECORATIONS ── */}
      <div className="absolute inset-0 pointer-events-none z-0 h-full overflow-hidden" aria-hidden="true">
        {/* Subtle grid */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: 'linear-gradient(rgba(123,97,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(123,97,255,0.05) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />
        
        {/* Concentric rings */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-30">
          <ArcReactor size={400} accentColor="purple" className="opacity-35" />
        </div>

        <Plus className="top-[20%] left-[10%]" delay={0.1} />
        <Plus className="bottom-[10%] right-[15%]" delay={0.6} />
        <BigCircle className="right-[15%] top-[15%] scale-75 opacity-30" />
        <BlueCircle className="left-[5%] bottom-[15%] rotate-45 opacity-35" />
      </div>

      {/* ── MAIN CONTACT CONTENT ── */}
      <div className="max-w-7xl w-full px-6 md:px-12 relative z-10 mt-auto mb-auto">
        <ContactForm />
      </div>

    </main>
  );
}
