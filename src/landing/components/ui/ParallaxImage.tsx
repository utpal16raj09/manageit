import React, { useState } from 'react';
import { useIsDesktop } from '../../hooks/useIsDesktop';

export const ParallaxImage: React.FC<{
  src?: string;
  alt?: string;
  restingTilt?: number;
  maxRotate?: number;
  className?: string;
  children?: React.ReactNode;
}> = ({ restingTilt = -3, maxRotate = 4, className = "", children }) => {
  const isDesktop = useIsDesktop();
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDesktop) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
  };

  const rotateX = isDesktop ? (mousePos.y / 200) * -maxRotate : 0;
  const rotateY = isDesktop ? (mousePos.x / 200) * maxRotate : 0;
  const currentTilt = isDesktop ? restingTilt : 0;

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative transition-transform duration-300 ease-out ${className}`}
      style={{
        perspective: 1200,
        transform: `rotate(${currentTilt}deg) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
      }}
    >
      {/* Depth shadow moving slower */}
      {isDesktop && (
        <div
          className="absolute inset-0 bg-[#14151A]/10 rounded-3xl blur-2xl pointer-events-none transition-transform duration-500"
          style={{
            transform: `translate(${mousePos.x * -0.005}px, ${16 + mousePos.y * -0.005}px)`
          }}
        />
      )}
      <div className="relative bg-white border border-[#E4E3DE] rounded-3xl p-6 shadow-xs">
        {children}
      </div>
    </div>
  );
};
