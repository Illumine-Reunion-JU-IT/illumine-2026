'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { CommitteeMember } from '@/types/organisingCommittee';

export interface CommitteeCardProps {
  member: CommitteeMember;
}

const FallbackAvatar: React.FC = () => (
  <div 
    className="w-full h-full bg-[#0d1527] flex flex-col items-center justify-center relative"
    aria-hidden="true"
  >
    <svg 
      className="w-16 h-16 opacity-30 text-[#BEF3DF]" 
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
    <div className="absolute inset-0 bg-radial-gradient from-[#BEF3DF]/10 via-transparent to-transparent opacity-50" />
    <span className="text-[9px] font-mono text-gray-500 uppercase tracking-widest mt-2">NO_SIGNAL</span>
  </div>
);

export const CommitteeCard: React.FC<CommitteeCardProps> = ({ member }) => {
  const [imgError, setImgError] = useState(false);

  return (
    <div className="flex flex-col items-center text-center select-none w-full max-w-[272px] transition-all duration-300 group">
      
      {/* ── CARD PORTRAIT FRAME ── */}
      <div 
        className="relative w-full mb-4"
        style={{ aspectRatio: '272/383' }}
      >
        {/* Breathing backdrop glow under active hover */}
        <div 
          className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-lg pointer-events-none blur-2xl -z-10 bg-[#BEF3DF]" 
          aria-hidden="true"
        />

        {/* Outer overlay frame SVG from Goodwill featured card */}
        <svg
          className="absolute inset-0 w-full h-full z-10 pointer-events-none text-[#BEF3DF] opacity-80 group-hover:text-[#64ffda] group-hover:opacity-100 transition-all duration-300"
          viewBox="0 0 272 383"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <mask
            id="mask0_committee_card"
            style={{ maskType: 'luminance' }}
            maskUnits="userSpaceOnUse"
            x="0"
            y="21"
            width="253"
            height="362"
          >
            <path
              d="M1.67378e-05 382.917L9.18178e-07 21.0055L252.643 21.0055L252.643 382.917L1.67378e-05 382.917Z"
              fill="white"
            />
          </mask>
          <g mask="url(#mask0_committee_card)">
            <path
              d="M252.465 21.1929L252.465 104.88L227.29 125.189L227.29 275.031L252.465 296.506L252.465 382.888L179.838 382.888L170.588 373.317L102.265 373.317L93.136 382.888L19.7854 382.888L1.59099e-05 363.946L1.24117e-05 283.919L21.1933 270.205L21.1933 60.7248L65.0264 21.1929L252.465 21.1929ZM250.936 104.277L250.936 22.5999L65.6295 22.6L22.7208 61.287L22.7209 270.888L1.52759 284.642L1.5276 363.424L20.4694 381.521L92.452 381.521L101.581 371.949L171.272 371.949L180.521 381.521L250.896 381.521L250.896 297.149L225.722 275.674L225.722 124.626L250.936 104.277Z"
              fill="currentColor"
            />
          </g>
          <path
            d="M96.5945 382.888L104.395 375.046L168.94 375.046L176.861 382.888L96.5945 382.888Z"
            fill="currentColor"
          />
          <path
            d="M251.7 360.408L269.234 353.089L269.234 276.961L245.386 259.347L245.386 109.505L226.526 124.867L226.526 275.272L251.741 297.069L251.7 360.408Z"
            fill="currentColor"
          />
          <mask
            id="mask1_committee_card"
            style={{ maskType: 'luminance' }}
            maskUnits="userSpaceOnUse"
            x="164"
            y="4"
            width="108"
            height="83"
          >
            <path
              d="M164.952 86.0074L164.952 4.82576L271.566 4.82576L271.566 86.0074L164.952 86.0074Z"
              fill="white"
            />
          </mask>
          <g mask="url(#mask1_committee_card)">
            <path
              d="M165.079 21.8769L176.781 11.1393L211.646 11.1393L215.95 4.86571L263.282 4.86571L263.282 40.0944L271.566 46.6485L271.566 78.298L251.699 85.7779L251.699 21.8769L165.079 21.8769Z"
              fill="currentColor"
            />
          </g>
          <mask
            id="mask12_committee_card"
            style={{ maskType: 'luminance' }}
            maskUnits="userSpaceOnUse"
            x="0"
            y="0"
            width="146"
            height="154"
          >
            <path
              d="M1.67378e-05 153.848L1.00129e-05 2.71293e-05L145.938 2.07501e-05L145.938 153.848L1.67378e-05 153.848Z"
              fill="white"
            />
          </mask>
          <g mask="url(#mask12_committee_card)">
            <path
              d="M21.9571 138.902L1.67378e-05 153.822L1.23151e-05 52.6411L48.6188 8.76603L90.1595 8.76603L97.9215 0.240486L131.862 0.240485L145.816 21.9164L65.1872 21.8764L21.9571 61.1256L21.9571 138.902Z"
              fill="currentColor"
            />
          </g>
        </svg>

        {/* Clipped profile image wrapper */}
        <div 
          className="absolute overflow-hidden z-0 bg-[#070913]"
          style={{
            left: '0.368%',
            top: '5.744%',
            width: '92.279%',
            height: '93.994%',
            clipPath: 'polygon(99.58% 22.85%, 99.58% 0.17%, 25.75% 0.17%, 8.65% 10.91%, 8.65% 69.14%, 0.21% 72.96%, 0.21% 94.84%, 7.76% 99.87%, 36.44% 99.87%, 40.07% 97.21%, 67.84% 97.21%, 71.52% 99.87%, 99.56% 99.87%, 99.56% 76.43%, 89.53% 70.47%, 89.53% 28.51%)',
          }}
        >
          {!member.image || imgError ? (
            <FallbackAvatar />
          ) : (
            <Image
              src={member.image}
              alt={member.name}
              fill
              sizes="250px"
              className="object-cover transition-transform duration-500 group-hover:scale-105 group-hover:brightness-110"
              onError={() => setImgError(true)}
            />
          )}

          {/* Scrolling scanline overlay */}
          <div 
            className="absolute inset-0 pointer-events-none opacity-20 group-hover:opacity-35 transition-opacity duration-300 z-3"
            style={{
              backgroundImage: 'repeating-linear-gradient(to bottom, transparent 0px, transparent 3px, rgba(0, 0, 0, 0.25) 3px, rgba(0, 0, 0, 0.25) 4px)',
              backgroundSize: '100% 4px',
            }}
            aria-hidden="true"
          />

          {/* Vignette overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none z-2" />
        </div>
      </div>

      {/* ── CARD INFORMATION DETAILS ── */}
      <div className="flex flex-col items-center gap-1.5 mt-4 w-full">
        {/* Department tag */}
        <span className="text-[10px] font-mono tracking-[0.25em] text-[#7B61FF] uppercase border border-[#7B61FF]/30 px-2.5 py-0.5 bg-[#7B61FF]/5">
          {member.department}
        </span>
        
        {/* Name */}
        <h3 className="font-tt-lakes text-base md:text-lg font-bold text-[#BEF3DF] group-hover:text-white transition-colors tracking-wide mt-1">
          {member.name}
        </h3>

        {/* Designation */}
        <p className="font-tt-lakes text-xs md:text-sm text-gray-400 font-light uppercase">
          {member.designation}
        </p>

        {/* Social link buttons (rendered conditionally) */}
        {(member.linkedin || member.email) && (
          <div className="flex items-center gap-3 mt-2">
            {member.linkedin && (
              <a
                href={member.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Visit ${member.name}'s LinkedIn profile`}
                className="w-8 h-8 rounded-full border border-white/10 hover:border-[#64ffda] bg-black/40 text-gray-400 hover:text-[#64ffda] hover:shadow-[0_0_10px_rgba(100,255,218,0.4)] transition-all duration-300 flex items-center justify-center"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.8v8.37h2.8v-4.67c0-.25.015-.51.09-.69.2-.5.65-1 1.41-1 1 0 1.39.75 1.39 1.86v4.5h2.8M6.5 8.37a1.37 1.37 0 1 0 0-2.75 1.37 1.37 0 0 0 0 2.75M8 18.5V10.13H5.2v8.37H8z" />
                </svg>
              </a>
            )}

            {member.email && (
              <a
                href={`mailto:${member.email}`}
                aria-label={`Send an email to ${member.name}`}
                className="w-8 h-8 rounded-full border border-white/10 hover:border-[#ffe94d] bg-black/40 text-gray-400 hover:text-[#ffe94d] hover:shadow-[0_0_10px_rgba(255,233,77,0.4)] transition-all duration-300 flex items-center justify-center"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </a>
            )}
          </div>
        )}
      </div>

    </div>
  );
};

export default CommitteeCard;
