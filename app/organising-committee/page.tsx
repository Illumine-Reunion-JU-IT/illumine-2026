import { Metadata } from 'next';
import React from 'react';
import { getCommitteeMembers, getDepartmentsFromMembers } from '@/data/organisingCommittee';
import CommitteeExplorer from '@/components/committee/CommitteeExplorer';
import ArcReactor from '@/components/arc-reactor';
import BigCircle from '@/components/ui/BigCircle';
import BlueCircle from '@/components/ui/BlueCircle';
import Plus from '@/components/ui/Plus';
import DecryptedText from '@/components/ui/DecryptedText';
import ComingSoon from '@/components/ui/ComingSoon';

export const metadata: Metadata = {
  title: 'Organising Committee | Illumine 2026',
  description: 'Meet the visionaries, coordinators, and leaders behind ILLUMINE 2026—the Silver Jubilee Reunion of Jadavpur University Information Technology Department.',
  openGraph: {
    title: 'Organising Committee | Illumine 2026',
    description: 'Meet the visionaries, coordinators, and leaders behind ILLUMINE 2026—the Silver Jubilee Reunion of Jadavpur University Information Technology Department.',
    url: 'https://illumine-reunion-ju-it.vercel.app/organising-committee',
    type: 'website',
    images: [
      {
        url: '/photos/Hero/logo.jpeg',
        width: 800,
        height: 800,
        alt: 'ILLUMINE 2026 Organising Committee',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Organising Committee | Illumine 2026',
    description: 'Meet the visionaries, coordinators, and leaders behind ILLUMINE 2026.',
  },
};

export default function OrganisingCommitteePage() {
  const members = getCommitteeMembers();
  const departments = getDepartmentsFromMembers(members);

  return (
    <ComingSoon></ComingSoon>
  );
     {/* <main className="relative min-h-screen bg-[#070707] text-[#d9fff6] pt-28 pb-20 overflow-x-hidden font-tt-lakes">
      
    
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      
      <div 
       className="absolute inset-0 opacity-10"
         style={{
          backgroundImage: 'linear-gradient(rgba(100,255,218,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(100,255,218,0.05) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
         }}
        />
        
        
        <div className="absolute top-[15%] left-[-120px] opacity-40">
          <ArcReactor size={350} accentColor="teal" className="opacity-35" />
        </div>
        <div className="absolute bottom-[20%] right-[-120px] opacity-40">
          <ArcReactor size={400} accentColor="purple" className="opacity-35" />
        </div>

        
        <Plus className="top-[18%] left-[12%]" delay={0.3} />
        <Plus className="top-[48%] right-[18%]" delay={0.7} />
        <Plus className="bottom-[22%] left-[28%]" delay={1.1} />

       
        <BigCircle className="right-[12%] top-[10%] scale-90 opacity-40" />
        <BlueCircle className="left-[6%] bottom-[12%] rotate-45 opacity-40" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        
        
        <div className="flex flex-col items-center text-center mb-16 relative">
          <p className="text-[10px] md:text-xs font-mono tracking-[0.4em] text-[#64ffda] uppercase mb-3">
            System // Live_Directory_Channels
          </p>
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-[0.1em] text-white font-mechsuit mb-4 leading-normal sm:leading-relaxed drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]">
            <DecryptedText 
              text="ORGANISING COMMITTEE" 
              animateOn="view" 
              speed={75} 
              sequential
            />
          </h1>

          <div className="w-24 h-[2px] bg-gradient-to-r from-transparent via-[#64ffda] to-transparent mb-6" />
          
          <p className="text-gray-400 text-xs sm:text-sm tracking-wider max-w-2xl leading-relaxed uppercase">
            Meet the faculty advisors, core coordinators, design, and technical teams driving the Silver Jubilee Reunion of Jadavpur University Department of Information Technology.
          </p>
        </div>

        {
        <CommitteeExplorer members={members} departments={departments} />

      </div>
    </main> 
  ); */}
}
