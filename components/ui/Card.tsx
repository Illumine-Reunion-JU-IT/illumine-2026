import React from 'react';

/**
 * TODO: Implement a reusable cyberpunk card container.
 */
export interface CardProps {
  className?: string;
  children: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({ children, className = '' }) => {
  return (
    <div className={`card-container ${className}`}>
      {children}
    </div>
  );
};

export default Card;
