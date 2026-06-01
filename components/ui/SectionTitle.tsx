import React from 'react';

/**
 * TODO: Implement a reusable cyberpunk section title element.
 */
export interface SectionTitleProps {
  title: string;
  subtitle?: string;
}

export const SectionTitle: React.FC<SectionTitleProps> = ({ title, subtitle }) => {
  return (
    <div className="section-title-container">
      <h2 className="text-2xl font-bold tracking-widest text-[#B6BBFF] uppercase">{title}</h2>
      {subtitle && <p className="text-xs text-white/50 tracking-wider mt-1">{subtitle}</p>}
    </div>
  );
};

export default SectionTitle;
