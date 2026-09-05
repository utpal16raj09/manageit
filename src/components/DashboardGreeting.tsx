import React from 'react';
import { useProperty } from '../context/PropertyContext';
import {
  ScribbleBuilding,
  ScribbleUsers,
  ScribbleCheck,
  ScribbleSparkle
} from './ScribbleIcons';

export const DashboardGreeting: React.FC = () => {
  const { users, properties, filteredMetrics, activeRole } = useProperty();

  let userName = 'Utpal';
  if (users[0]?.name) {
    userName = users[0].name.split(' ')[0];
  }

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <div className="space-y-3.5 sm:space-y-4 font-sans w-full">
      {/* Panoramic Greeting Banner - Solid Minimal Luxury (No Gradients) */}
      <div className="banner-panoramic relative rounded-2xl overflow-hidden bg-white dark:bg-[#121722] border border-slate-200 dark:border-white/[0.08] shadow-2xs dark:shadow-xl text-[#012169] dark:text-white transition-all duration-300 ease-out">
        {/* Background Architecture Image - Seamless Alpha Feather Mask (Zero Visible Line) */}
        <div
          className="absolute top-0 right-0 w-full sm:w-2/3 md:w-3/5 h-full pointer-events-none overflow-hidden select-none"
          style={{
            maskImage: 'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.3) 25%, rgba(0,0,0,0.85) 60%, rgba(0,0,0,1) 100%)',
            WebkitMaskImage: 'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.3) 25%, rgba(0,0,0,0.85) 60%, rgba(0,0,0,1) 100%)'
          }}
        >
          <img
            src="/assets/hero-building.jpg"
            alt="Property Architecture"
            className="w-full h-full object-cover object-right opacity-50 dark:opacity-40 transform scale-105 transition-opacity duration-300"
          />
        </div>

        {/* Content Container - Minimal & Refined */}
        <div className="relative z-10 p-5 sm:p-6 md:p-7 flex items-center justify-between min-h-[110px] sm:min-h-[180px]">
          <div className="max-w-xl space-y-1">
            <h1 className="text-2xl sm:text-3xl font-black text-[#012169] dark:text-white tracking-tight leading-none font-display">
              {getGreeting()}, {userName}!
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium">
              Here's what's happening across your portfolio today.
            </p>
          </div>
        </div>
      </div>

      {/* Bespoke Hand-Crafted Overview Telemetry (Owner Only) - Solid, Minimal & Adaptive */}
      {activeRole === 'owner' && (
        <div className="flex flex-wrap items-center justify-between gap-2 pt-1 pb-0.5">
          <div className="text-[11px] font-bold text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
            <ScribbleSparkle className="w-3.5 h-3.5 text-[#003087] dark:text-[#94a3b8]" />
            <span>Real-time portfolio overview</span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* 1. Properties Telemetry Badge */}
            <div className="overview-badge-default inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white dark:bg-[#121722] text-xs font-black text-[#012169] dark:text-[#f8fafc] border border-slate-200 dark:border-white/[0.08] shadow-2xs">
              <ScribbleBuilding className="w-4 h-4 text-[#003087] dark:text-[#94a3b8] stroke-[2.2]" />
              <span className="font-black text-[#012169] dark:text-[#f8fafc]">{properties.length} Properties</span>
            </div>

            {/* 2. Units Leased Telemetry Badge */}
            <div className="overview-badge-default inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white dark:bg-[#121722] text-xs font-black text-[#012169] dark:text-[#f8fafc] border border-slate-200 dark:border-white/[0.08] shadow-2xs">
              <ScribbleUsers className="w-4 h-4 text-[#003087] dark:text-[#94a3b8] stroke-[2.2]" />
              <span className="font-black text-[#012169] dark:text-[#f8fafc]">{filteredMetrics.occupiedUnitsCount}/{filteredMetrics.totalUnitsCount} Units Leased</span>
            </div>

            {/* 3. Soft Sage-Mint Occupancy Telemetry Badge */}
            <div className="overview-badge-emerald inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#f0fdf4] dark:bg-[#064e3b33] text-xs font-black text-[#065f46] dark:text-[#6ee7b7] border border-emerald-200/90 dark:border-emerald-500/20 shadow-2xs">
              <ScribbleCheck className="w-4 h-4 text-[#047857] dark:text-[#6ee7b7] stroke-[2.5]" />
              <span className="font-black text-[#065f46] dark:text-[#6ee7b7]">{filteredMetrics.occupancyRatePct}% Occupancy</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
