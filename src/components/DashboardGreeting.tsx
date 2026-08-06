import React from 'react';
import { useProperty } from '../context/PropertyContext';

export const DashboardGreeting: React.FC = () => {
  const { users, properties, filteredMetrics } = useProperty();

  const currentUser = users[0] || { name: 'Utpal' };
  const firstName = currentUser.name.split(' ')[0];

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  const todayDateStr = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 py-1 font-sans bg-transparent">
      {/* Unboxed Greeting Title */}
      <div className="space-y-0.5">
        <div className="text-xs font-extrabold text-[#009cde] uppercase tracking-wider">
          Landlord Executive Dashboard
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#012169] tracking-tight">
          {getGreeting()}, {firstName}
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 font-bold">
          {todayDateStr}
        </p>
      </div>

      {/* Unboxed Minimal Pill Badges */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="px-3.5 py-1.5 rounded-full bg-white border border-slate-200 text-xs font-extrabold text-[#012169] shadow-2xs">
          {properties.length} Properties
        </span>

        <span className="px-3.5 py-1.5 rounded-full bg-[#e0f2fe] border border-[#009cde]/30 text-xs font-extrabold text-[#003087]">
          {filteredMetrics.occupiedUnitsCount}/{filteredMetrics.totalUnitsCount} Units Occupied
        </span>

        <span className="px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-300 text-xs font-extrabold text-emerald-900">
          {filteredMetrics.occupancyRatePct}% Occupancy
        </span>
      </div>
    </div>
  );
};
