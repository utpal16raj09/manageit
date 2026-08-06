import React from 'react';

export const Container: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = "" }) => {
  return (
    <div className={`w-full max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-12 ${className}`}>
      {children}
    </div>
  );
};
