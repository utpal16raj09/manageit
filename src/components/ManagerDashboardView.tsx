import React from 'react';
import { useProperty } from '../context/PropertyContext';
import { Users, Building2, ClipboardList, Settings, Bell, ChevronRight, Activity, UserPlus, AlertCircle, CreditCard, Building } from 'lucide-react';
import { ScribbleBuilding, ScribbleComplaint } from './ScribbleIcons';

export const ManagerDashboardView: React.FC = () => {
  const { filteredMetrics, properties, setActiveTab, setIsQuickAddOpen } = useProperty();

  return (
    <div className="space-y-4 sm:space-y-5 animate-in fade-in duration-300 font-sans pb-20 lg:pb-6">
      {/* Operations Header */}
      <div className="pb-1">
        <h1 className="text-xl sm:text-2xl font-black text-[#012169] dark:text-[#f8fafc] tracking-tight">
          Operations Overview
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5">
          Real-time telemetry and dispatch controls for facility staff.
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-3.5">
        {[
          { label: 'Total Occupancy', value: `${filteredMetrics.occupancyRatePct}%`, icon: Users, color: 'text-[#003087]', bg: 'bg-[#f0f7ff] border-[#009cde]/30' },
          { label: 'Active Issues', value: `${filteredMetrics.pendingComplaintsCount} Tickets`, icon: AlertCircle, color: 'text-amber-600', bg: 'bg-amber-50 border-amber-200' },
          { label: 'Vacant Units', value: `${filteredMetrics.vacantUnitsCount} Available`, icon: Building2, color: 'text-emerald-700', bg: 'bg-emerald-50 border-emerald-200' },
          { label: 'Pending Dues', value: `₹${filteredMetrics.totalDuesAllTime.toLocaleString('en-IN')}`, icon: ClipboardList, color: 'text-rose-600', bg: 'bg-rose-50 border-rose-200' },
        ].map((stat, i) => {
          const StatIcon = stat.icon;
          return (
            <div key={i} className="bg-white rounded-2xl p-3.5 sm:p-4 border border-slate-200/90 shadow-2xs flex items-center justify-between">
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">{stat.label}</p>
                <p className="text-base sm:text-lg font-black text-[#012169]">{stat.value}</p>
              </div>
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center border ${stat.bg} ${stat.color} shadow-2xs`}>
                <StatIcon className="w-4 h-4 stroke-[2]" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5">
        {/* Properties Overview */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden flex flex-col h-[340px]">
          <div className="p-3.5 sm:p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
            <h3 className="font-extrabold text-xs sm:text-sm text-slate-800 flex items-center gap-2">
              <Building className="w-4 h-4 text-[#009cde]" />
              <span>Assigned Properties</span>
            </h3>
            <button 
              onClick={() => setActiveTab('properties')}
              className="text-xs font-extrabold text-[#003087] hover:underline cursor-pointer"
            >
              View All
            </button>
          </div>
          <div className="p-2.5 overflow-y-auto flex-1 space-y-1.5">
            {properties.map(prop => (
              <div 
                key={prop.id} 
                onClick={() => setActiveTab('properties')}
                className="flex items-center justify-between p-3 hover:bg-[#f0f7ff] border border-transparent hover:border-slate-200 rounded-xl transition-all cursor-pointer group"
              >
                <div>
                  <h4 className="font-extrabold text-xs sm:text-sm text-[#012169] group-hover:text-[#003087] transition-colors">{prop.name}</h4>
                  <p className="text-[11px] text-slate-500 font-medium mt-0.5">{prop.occupiedUnitsCount} Occupied · {prop.vacantUnitsCount} Vacant</p>
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-[#003087] group-hover:translate-x-0.5 transition-all" />
              </div>
            ))}
          </div>
        </div>

        {/* Operational Quick Actions */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden flex flex-col h-[340px]">
          <div className="p-3.5 sm:p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
            <h3 className="font-extrabold text-xs sm:text-sm text-slate-800 flex items-center gap-2">
              <Settings className="w-4 h-4 text-[#009cde]" />
              <span>Operational Quick Actions</span>
            </h3>
          </div>
          <div className="p-4 grid grid-cols-2 gap-3 flex-1">
            <button 
              onClick={() => setIsQuickAddOpen(true)}
              className="flex flex-col items-center justify-center p-3 border border-slate-200 rounded-xl hover:border-[#003087] hover:bg-[#f8fafc] transition-all group cursor-pointer"
            >
              <div className="w-9 h-9 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center group-hover:bg-[#003087] group-hover:text-white group-hover:border-[#003087] mb-2 transition-all text-[#003087]">
                <UserPlus className="w-4.5 h-4.5 stroke-[2]" />
              </div>
              <span className="text-xs font-extrabold text-slate-700 group-hover:text-[#003087]">Add Tenant</span>
            </button>

            <button 
              onClick={() => setActiveTab('complaints')}
              className="flex flex-col items-center justify-center p-3 border border-slate-200 rounded-xl hover:border-[#003087] hover:bg-[#f8fafc] transition-all group cursor-pointer"
            >
              <div className="w-9 h-9 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center group-hover:bg-[#003087] group-hover:text-white group-hover:border-[#003087] mb-2 transition-all text-[#003087]">
                <AlertCircle className="w-4.5 h-4.5 stroke-[2]" />
              </div>
              <span className="text-xs font-extrabold text-slate-700 group-hover:text-[#003087]">Tickets Hub</span>
            </button>

            <button 
              onClick={() => setActiveTab('properties')}
              className="flex flex-col items-center justify-center p-3 border border-slate-200 rounded-xl hover:border-[#003087] hover:bg-[#f8fafc] transition-all group cursor-pointer"
            >
              <div className="w-9 h-9 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center group-hover:bg-[#003087] group-hover:text-white group-hover:border-[#003087] mb-2 transition-all text-[#003087]">
                <Building2 className="w-4.5 h-4.5 stroke-[2]" />
              </div>
              <span className="text-xs font-extrabold text-slate-700 group-hover:text-[#003087]">Unit Roster</span>
            </button>

            <button 
              onClick={() => setIsQuickAddOpen(true)}
              className="flex flex-col items-center justify-center p-3 border border-slate-200 rounded-xl hover:border-[#003087] hover:bg-[#f8fafc] transition-all group cursor-pointer"
            >
              <div className="w-9 h-9 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center group-hover:bg-[#003087] group-hover:text-white group-hover:border-[#003087] mb-2 transition-all text-[#003087]">
                <ClipboardList className="w-4.5 h-4.5 stroke-[2]" />
              </div>
              <span className="text-xs font-extrabold text-slate-700 group-hover:text-[#003087]">Log Expense</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
