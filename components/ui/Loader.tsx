import React from 'react';

/**
 * TODO: Implement a reusable cyberpunk system loader/spinner.
 */
export const Loader: React.FC = () => {
  return (
    <div className="loader-container">
      <span className="text-xs tracking-widest uppercase text-white/50 animate-pulse">
        System Loading...
      </span>
    </div>
  );
};

export default Loader;
