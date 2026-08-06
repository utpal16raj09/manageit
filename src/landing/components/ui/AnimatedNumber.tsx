import React from 'react';
import { Container } from '../ui/Container';

export const AnimatedNumber: React.FC<{ value: string; label: string }> = ({ value, label }) => {
  return (
    <div className="space-y-2 transition-all duration-700 ease-out">
      <div className="font-display text-4xl sm:text-6xl text-[#14151A] tracking-tight">
        {value}
      </div>
      <div className="text-xs font-mono text-[#6B6D76] uppercase tracking-wider">
        {label}
      </div>
    </div>
  );
};
