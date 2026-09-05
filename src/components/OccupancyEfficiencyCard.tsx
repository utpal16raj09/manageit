import React from 'react';
import { useProperty } from '../context/PropertyContext';
import {
  ScribblePie,
  ScribbleShield,
  ScribbleBuilding,
  ScribbleCheck
} from './ScribbleIcons';

export const OccupancyEfficiencyCard: React.FC = () => {
  const { filteredMetrics } = useProperty();

  const occRate = filteredMetrics.occupancyRatePct;
  const colRate = filteredMetrics.collectionEfficiencyPct;

  return (
    <div className="mustard-screen-card p-4 sm:p-5 rounded-2xl space-y-4 bg-white/90 dark:bg-white/[0.04] backdrop-blur-md font-sans shadow-2xs w-full">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <ScribblePie className="w-6 h-6 text-[#003087] stroke-[2.2] flex-shrink-0" />
          <div>
            <h3 className="text-sm sm:text-base font-extrabold text-[#012169] dark:text-[#f8fafc]">Portfolio Occupancy & Financial Health</h3>
            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">Aggregated performance indicators</p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 text-xs font-extrabold text-[#003087] dark:text-[#93c5fd] bg-[#f0f7ff] dark:bg-white/[0.05] border border-blue-100/60 dark:border-white/[0.06] px-3 py-1 rounded-lg shadow-2xs">
          <ScribbleShield className="w-3.5 h-3.5 text-[#009cde]" />
          <span>Optimal Portfolio Health</span>
        </div>
      </div>

      {/* Modern Clean Progress Meters - Balanced Spacing */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 lg:gap-6">
        {/* Occupancy Metric Box */}
        <div className="p-3.5 sm:p-4 rounded-xl bg-[#f8fafc] dark:bg-white/[0.04] space-y-2.5 shadow-2xs transition-all duration-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ScribbleBuilding className="w-3.5 h-3.5 text-[#009cde]" />
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#009cde]">Physical Occupancy</span>
            </div>
            <span className="text-lg sm:text-xl font-extrabold text-[#009cde] font-mono-amount">{occRate}%</span>
          </div>

          <div>
            <div className="text-sm sm:text-base font-extrabold text-[#012169] dark:text-[#f8fafc]">
              {filteredMetrics.occupiedUnitsCount} of {filteredMetrics.totalUnitsCount} Units Leased
            </div>
            <p className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 mt-0.5">
              {filteredMetrics.vacantUnitsCount} vacant units ready for immediate onboarding
            </p>
          </div>

          {/* Clean Linear Progress Bar */}
          <div className="space-y-1 pt-0.5">
            <div className="w-full h-1.5 rounded-full bg-slate-200 dark:bg-white/[0.06] overflow-hidden p-0.5">
              <div
                className="h-full rounded-full bg-[#009cde] transition-all duration-700 shadow-xs"
                style={{ width: `${occRate}%` }}
              />
            </div>
            <div className="flex justify-between text-[10px] font-extrabold text-slate-500 dark:text-slate-400">
              <span>0%</span>
              <span className="text-[#009cde]">{filteredMetrics.occupiedUnitsCount} Occupied</span>
              <span>100%</span>
            </div>
          </div>
        </div>

        {/* Collection Metric Box */}
        <div className="p-3.5 sm:p-4 rounded-xl bg-[#f8fafc] dark:bg-white/[0.04] space-y-2.5 shadow-2xs transition-all duration-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ScribbleCheck className="w-3.5 h-3.5 text-[#003087]" />
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#003087] dark:text-[#93c5fd]">Financial Collection</span>
            </div>
            <span className="text-lg sm:text-xl font-extrabold text-[#003087] dark:text-[#f8fafc] font-mono-amount">{colRate}%</span>
          </div>

          <div>
            <div className="text-sm sm:text-base font-extrabold text-[#012169] dark:text-[#f8fafc]">
              ₹{(filteredMetrics.collectedThisMonth / 1000).toFixed(0)}k of ₹{(filteredMetrics.expectedRent / 1000).toFixed(0)}k Rent
            </div>
            <p className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 mt-0.5">
              ₹{(filteredMetrics.duesThisMonth / 1000).toFixed(0)}k outstanding for current billing cycle
            </p>
          </div>

          {/* Clean Linear Progress Bar */}
          <div className="space-y-1 pt-0.5">
            <div className="w-full h-1.5 rounded-full bg-slate-200 dark:bg-white/[0.06] overflow-hidden p-0.5">
              <div
                className="h-full rounded-full bg-[#003087] dark:bg-[#009cde] transition-all duration-700 shadow-xs"
                style={{ width: `${colRate}%` }}
              />
            </div>
            <div className="flex justify-between text-[10px] font-extrabold text-slate-500 dark:text-slate-400">
              <span>0%</span>
              <span className="text-[#003087] dark:text-[#93c5fd]">{colRate}% Collected</span>
              <span>100% Target</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
