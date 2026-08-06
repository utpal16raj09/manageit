import React from 'react';
import { RevealOnScroll } from '../ui/RevealOnScroll';

export const FeatureRow: React.FC<{
  num: string;
  subtitle: string;
  title: string;
  desc: string;
  stat: string;
  index: number;
}> = ({ num, subtitle, title, desc, stat, index }) => {
  const isEven = index % 2 === 0;

  return (
    <RevealOnScroll>
      <div className={`flex flex-col lg:flex-row items-center gap-12 ${isEven ? '' : 'lg:flex-row-reverse'}`}>
        {/* Text Side */}
        <div className="w-full lg:w-1/2 space-y-4 text-left">
          <span className="text-xs font-mono text-[#2454FF] font-semibold tracking-widest block">
            {num} — {subtitle}
          </span>

          <h2 className="font-display text-[var(--text-h2)] leading-tight text-[#14151A]">
            {title}
          </h2>

          <p className="text-[#6B6D76] text-base leading-relaxed font-normal">
            {desc}
          </p>

          <div className="pt-2">
            <span className="inline-block px-3 py-1 rounded-full bg-[#FAFAF8] border border-[#E4E3DE] text-xs font-mono text-[#14151A]">
              {stat}
            </span>
          </div>
        </div>

        {/* Product Card Side */}
        <div className="w-full lg:w-1/2">
          <div className="bg-white border border-[#E4E3DE] rounded-3xl p-6 space-y-4 shadow-xs">
            <div className="flex items-center justify-between text-xs font-mono text-[#6B6D76] border-b border-[#E4E3DE] pb-3">
              <span>PRODUCT MODULE</span>
              <span>SYS 0{index + 1}</span>
            </div>
            <div className="h-48 sm:h-64 rounded-2xl bg-[#FAFAF8] border border-[#E4E3DE] flex items-center justify-center p-6 text-center">
              <div className="space-y-2">
                <span className="font-display text-xl text-[#14151A]">{title}</span>
                <p className="text-xs text-[#6B6D76] font-mono max-w-xs">{desc}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </RevealOnScroll>
  );
};
