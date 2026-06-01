'use client';

import React from 'react';
import { MagazineIssue } from '@/types/magazine';

export interface MagazineCardProps {
  issue: MagazineIssue;
}

export const MagazineCard: React.FC<MagazineCardProps> = ({ issue }) => {
  return (
    <div 
      className="relative flex flex-col p-6 min-h-[220px] bg-[#0c0f1d]/75 border border-white/10 hover:border-[#7B61FF]/30 transition-all duration-300 hover:-translate-y-1 w-full max-w-sm group shadow-[inset_0_0_10px_rgba(255,255,255,0.01)]"
      style={{
        clipPath: 'polygon(0% 0%, 93% 0%, 100% 8%, 100% 100%, 7% 100%, 0% 92%)',
      }}
    >
      {/* Decorative cyber corner ticks */}
      <div className="absolute top-0 right-0 w-3 h-[2px] bg-[#7B61FF] pointer-events-none" aria-hidden="true" />
      <div className="absolute bottom-0 left-0 w-3 h-[2px] bg-[#7B61FF] pointer-events-none" aria-hidden="true" />

      {/* Top Volume / Date Row */}
      <div className="flex items-center justify-between mb-4 font-mono text-[9px] tracking-wider">
        <span className="text-[#64ffda] border border-[#64ffda]/30 px-1.5 py-0.5 bg-[#64ffda]/5 uppercase">
          VOL.0{issue.volume} {"//"} ISSUE.0{issue.issueNumber}
        </span>
        <span className="text-gray-500 uppercase">{issue.publishDate}</span>
      </div>

      {/* Title */}
      <h3 className="font-tt-lakes text-base sm:text-lg font-bold text-[#BEF3DF] group-hover:text-white transition-colors tracking-wide mb-2 line-clamp-2">
        {issue.title}
      </h3>

      {/* Description */}
      <p className="font-tt-lakes text-xs text-gray-400 font-light leading-relaxed mb-6 flex-grow line-clamp-3">
        {issue.description}
      </p>

      {/* Bottom Action Redirect */}
      <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between">
        <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">FORMAT // PDF_DOC</span>
        
        <a
          href={issue.pdfUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs font-mono font-extrabold tracking-widest text-[#7B61FF] hover:text-white transition-colors duration-300 flex items-center gap-1.5 cursor-pointer"
        >
          <span>DOWNLOAD_SYS</span>
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
        </a>
      </div>

    </div>
  );
};

export default MagazineCard;
