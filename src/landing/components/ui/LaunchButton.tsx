import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useProperty } from '../../../context/PropertyContext';
import { ArrowRight } from 'lucide-react';

export const LaunchButton: React.FC<{ 
  children?: React.ReactNode; 
  className?: string;
  onClick?: () => void;
}> = ({ children = "Login", className = "", onClick }) => {
  const { setActiveTab } = useProperty();
  const ref = useRef<HTMLButtonElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 15, mass: 0.3 });
  const sy = useSpring(y, { stiffness: 200, damping: 15, mass: 0.3 });

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - r.left - r.width / 2) * 0.35);
    y.set((e.clientY - r.top - r.height / 2) * 0.35);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      setActiveTab('dashboard');
    }
  };

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      style={{ x: sx, y: sy }}
      className={`px-6 py-3.5 rounded-full bg-[#2454FF] hover:bg-[#14151A] text-white font-medium text-sm transition-all duration-200 inline-flex items-center justify-center space-x-2 active:scale-95 shadow-xs cursor-pointer ${className}`}
    >
      <span>{children}</span>
      <ArrowRight className="w-4 h-4" />
    </motion.button>
  );
};
