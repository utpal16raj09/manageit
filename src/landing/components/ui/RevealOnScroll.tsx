import React from 'react';

export const RevealOnScroll: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = "" }) => {
  return (
    <div className={`transition-all duration-700 ease-out ${className}`}>
      {children}
    </div>
  );
};
