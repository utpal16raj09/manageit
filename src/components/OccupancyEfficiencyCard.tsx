import React from 'react';
import { useProperty } from '../context/PropertyContext';
import { ShieldCheck, Building, CheckCircle2 } from 'lucide-react';
import { ScribblePie } from './ScribbleIcons';

export const OccupancyEfficiencyCard: React.FC = () => {
  const { filteredMetrics } = useProperty();

  const occRate = filteredMetrics.occupancyRatePct;
  const colRate = filteredMetrics.collectionEfficiencyPct;

  return (
    <div className="mustard-screen-card p-6 sm:p-7 rounded-3xl space-y-6 bg-white border border-slate-200 font-sans shadow-sm">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <ScribblePie className="w-7 h-7 text-[#003087] stroke-[2.4] flex-shrink-0" />
          <div>
            <h3 className="text-base sm:text-lg font-extrabold text-[#012169]">Portfolio Occupancy & Financial Health</h3>
            <p className="text-xs sm:text-sm font-semibold text-slate-500">Aggregated performance indicators</p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs sm:text-sm font-extrabold text-[#003087] bg-[#e0f2fe] px-4 py-1.5 rounded-full border border-[#009cde]/30 shadow-xs">
          <ShieldCheck className="w-4 h-4 text-[#009cde]" />
          <span>Optimal Portfolio Health</span>
        </div>
      </div>

      {/* Modern Clean Progress Meters */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Occupancy Metric Box */}
        <div className="p-6 rounded-3xl bg-[#f8fafc] border border-slate-200 space-y-4 shadow-2xs hover:border-[#009cde] transition-colors">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <Building className="w-5 h-5 text-[#009cde]" />
              <span className="text-xs font-extrabold uppercase tracking-wider text-[#009cde]">Physical Occupancy</span>
            </div>
            <span className="text-2xl font-extrabold text-[#009cde] font-mono-amount">{occRate}%</span>
          </div>

          <div>
            <div className="text-lg sm:text-xl font-extrabold text-[#012169]">
              {filteredMetrics.occupiedUnitsCount} of {filteredMetrics.totalUnitsCount} Units Leased
            </div>
            <p className="text-xs sm:text-sm font-semibold text-slate-500 mt-1">
              {filteredMetrics.vacantUnitsCount} vacant units ready for immediate onboarding
            </p>
          </div>

          {/* Clean Linear Progress Bar */}
          <div className="space-y-1.5 pt-1">
            <div className="w-full h-3 rounded-full bg-slate-200 overflow-hidden p-0.5 border border-slate-200">
              <div
                className="h-full rounded-full bg-[#009cde] transition-all duration-700 shadow-xs"
                style={{ width: `${occRate}%` }}
              />
            </div>
            <div className="flex justify-between text-xs font-extrabold text-slate-500">
              <span>0%</span>
              <span className="text-[#009cde]">{filteredMetrics.occupiedUnitsCount} Occupied</span>
              <span>100%</span>
            </div>
          </div>
        </div>

        {/* Collection Metric Box */}
        <div className="p-6 rounded-3xl bg-[#f8fafc] border border-slate-200 space-y-4 shadow-2xs hover:border-[#003087] transition-colors">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="w-5 h-5 text-[#003087]" />
              <span className="text-xs font-extrabold uppercase tracking-wider text-[#003087]">Financial Collection</span>
            </div>
            <span className="text-2xl font-extrabold text-[#003087] font-mono-amount">{colRate}%</span>
          </div>

          <div>
            <div className="text-lg sm:text-xl font-extrabold text-[#012169]">
              ₹{(filteredMetrics.collectedThisMonth / 1000).toFixed(0)}k of ₹{(filteredMetrics.expectedRent / 1000).toFixed(0)}k Rent
            </div>
            <p className="text-xs sm:text-sm font-semibold text-slate-500 mt-1">
              ₹{(filteredMetrics.duesThisMonth / 1000).toFixed(0)}k outstanding for current billing cycle
            </p>
          </div>

          {/* Clean Linear Progress Bar */}
          <div className="space-y-1.5 pt-1">
            <div className="w-full h-3 rounded-full bg-slate-200 overflow-hidden p-0.5 border border-slate-200">
              <div
                className="h-full rounded-full bg-[#003087] transition-all duration-700 shadow-xs"
                style={{ width: `${colRate}%` }}
              />
            </div>
            <div className="flex justify-between text-xs font-extrabold text-slate-500">
              <span>0%</span>
              <span className="text-[#003087]">{colRate}% Collected</span>
              <span>100% Target</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
