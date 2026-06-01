'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { AlumniProfile } from '@/types/alumni';

export interface AlumniCardProps {
  profile: AlumniProfile;
}

const FallbackAvatar: React.FC = () => (
  <div 
    className="w-full h-full bg-[#121626] flex items-center justify-center relative"
    aria-hidden="true"
  >
    <svg 
      className="w-8 h-8 opacity-25 text-[#BEF3DF]" 
      fill="none" 
      viewBox="0 0 24 24" 
      stroke="currentColor"
    >
      <path 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        strokeWidth={1} 
        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" 
      />
    </svg>
  </div>
);

export const AlumniCard: React.FC<AlumniCardProps> = ({ profile }) => {
  const [imgError, setImgError] = useState(false);

  return (
    <div 
      className="relative flex items-center gap-5 p-5 bg-[#0c0f1d]/75 border border-white/10 hover:border-indigo-500/30 transition-all duration-300 w-full max-w-sm hover:-translate-y-0.5 group shadow-[inset_0_0_10px_rgba(255,255,255,0.01)]"
      style={{
        clipPath: 'polygon(0% 0%, 93% 0%, 100% 12%, 100% 100%, 7% 100%, 0% 88%)',
      }}
    >
      {/* Dynamic theme corner borders */}
      <div className="absolute top-0 right-0 w-3 h-[1px] bg-indigo-500/50 pointer-events-none" aria-hidden="true" />
      <div className="absolute bottom-0 left-0 w-3 h-[1px] bg-indigo-500/50 pointer-events-none" aria-hidden="true" />

      {/* Portrait Box */}
      <div 
        className="w-16 h-16 shrink-0 border border-white/15 bg-black/40 overflow-hidden relative"
        style={{
          clipPath: 'polygon(15% 0%, 100% 0%, 100% 85%, 85% 100%, 0% 100%, 0% 15%)',
        }}
      >
        {!profile.image || imgError ? (
          <FallbackAvatar />
        ) : (
          <Image
            src={profile.image}
            alt={profile.name}
            fill
            sizes="64px"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            onError={() => setImgError(true)}
          />
        )}
      </div>

      {/* Details Box */}
      <div className="flex flex-col flex-grow min-w-0 justify-center">
        
        {/* Name & Batch */}
        <div className="flex items-baseline justify-between gap-2 w-full mb-1">
          <h3 className="font-tt-lakes text-sm sm:text-base font-bold text-[#BEF3DF] group-hover:text-white transition-colors truncate">
            {profile.name}
          </h3>
          <span className="text-[9px] font-mono font-bold tracking-wider text-indigo-400 border border-indigo-400/30 px-1.5 py-0.5 bg-indigo-400/5 shrink-0 uppercase">
            {profile.batch}
          </span>
        </div>

        {/* Designation / Company */}
        {(profile.designation || profile.company) ? (
          <p className="font-tt-lakes text-[11px] sm:text-xs text-gray-400 leading-tight truncate mb-2">
            {profile.designation ? profile.designation : 'Developer'}
            {profile.company && <span className="text-gray-500"> @ {profile.company}</span>}
          </p>
        ) : (
          <p className="font-tt-lakes text-[11px] sm:text-xs text-gray-500 leading-tight mb-2">
            JU IT Alumni Member
          </p>
        )}

        {/* LinkedIn Connection Link */}
        {profile.linkedin && (
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Visit ${profile.name}'s LinkedIn profile`}
            className="text-[10px] font-mono font-extrabold tracking-widest text-[#64ffda] hover:text-white transition-colors duration-300 w-fit flex items-center gap-1.5"
          >
            <span>CONNECT_PROTOCOL</span>
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.8v8.37h2.8v-4.67c0-.25.015-.51.09-.69.2-.5.65-1 1.41-1 1 0 1.39.75 1.39 1.86v4.5h2.8M6.5 8.37a1.37 1.37 0 1 0 0-2.75 1.37 1.37 0 0 0 0 2.75M8 18.5V10.13H5.2v8.37H8z" />
            </svg>
          </a>
        )}
      </div>

    </div>
  );
};

export default AlumniCard;
