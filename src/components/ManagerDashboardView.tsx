import React from 'react';
import { useProperty } from '../context/PropertyContext';
import { Users, Building, ClipboardList, Settings, Bell, ChevronRight, Activity } from 'lucide-react';

export const ManagerDashboardView: React.FC = () => {
  const { filteredMetrics, properties } = useProperty();

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black text-[#012169] tracking-tight">Manager Dashboard</h2>
          <p className="text-sm text-slate-500 font-medium mt-1">Property Operations & Tenant Management</p>
        </div>
        <div className="flex space-x-3">
          <button className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:text-[#003087] hover:border-[#003087] transition-colors shadow-sm">
            <Bell className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Occupancy', value: `${filteredMetrics.occupancyRatePct}%`, icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: 'Active Issues', value: filteredMetrics.pendingComplaintsCount, icon: Activity, color: 'text-amber-600', bg: 'bg-amber-50' },
          { label: 'Vacant Units', value: filteredMetrics.vacantUnitsCount, icon: Building, color: 'text-emerald-600', bg: 'bg-emerald-50' },
          { label: 'Pending Dues', value: `₹${filteredMetrics.totalDuesAllTime.toLocaleString('en-IN')}`, icon: ClipboardList, color: 'text-rose-600', bg: 'bg-rose-50' },
        ].map((stat, i) => (
          <div key={i} className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">{stat.label}</p>
              <p className="text-2xl font-black text-slate-800">{stat.value}</p>
            </div>
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.bg} ${stat.color}`}>
              <stat.icon className="w-6 h-6" />
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Properties Overview */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col h-[400px]">
          <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
            <h3 className="font-bold text-slate-800 flex items-center">
              <Building className="w-4 h-4 mr-2 text-slate-400" />
              Properties Overview
            </h3>
            <button className="text-xs font-bold text-[#003087] hover:underline">View All</button>
          </div>
          <div className="p-2 overflow-y-auto flex-1">
            {properties.map(prop => (
              <div key={prop.id} className="flex items-center justify-between p-3 hover:bg-slate-50 rounded-xl transition-colors cursor-pointer group">
                <div>
                  <h4 className="font-bold text-slate-800">{prop.name}</h4>
                  <p className="text-xs text-slate-500 mt-0.5">{prop.occupiedUnitsCount} Occupied · {prop.vacantUnitsCount} Vacant</p>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-[#003087] transition-colors" />
              </div>
            ))}
          </div>
        </div>

        {/* Operational Tasks */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col h-[400px]">
          <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
            <h3 className="font-bold text-slate-800 flex items-center">
              <Settings className="w-4 h-4 mr-2 text-slate-400" />
              Quick Actions
            </h3>
          </div>
          <div className="p-5 grid grid-cols-2 gap-4">
            <button className="flex flex-col items-center justify-center p-4 border border-slate-200 rounded-xl hover:border-[#003087] hover:bg-[#003087]/5 transition-all group">
              <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center group-hover:bg-white mb-3">
                <Users className="w-5 h-5 text-slate-600 group-hover:text-[#003087]" />
              </div>
              <span className="text-sm font-bold text-slate-700 group-hover:text-[#003087]">Add Tenant</span>
            </button>
            <button className="flex flex-col items-center justify-center p-4 border border-slate-200 rounded-xl hover:border-[#003087] hover:bg-[#003087]/5 transition-all group">
              <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center group-hover:bg-white mb-3">
                <Activity className="w-5 h-5 text-slate-600 group-hover:text-[#003087]" />
              </div>
              <span className="text-sm font-bold text-slate-700 group-hover:text-[#003087]">Log Issue</span>
            </button>
            <button className="flex flex-col items-center justify-center p-4 border border-slate-200 rounded-xl hover:border-[#003087] hover:bg-[#003087]/5 transition-all group">
              <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center group-hover:bg-white mb-3">
                <ClipboardList className="w-5 h-5 text-slate-600 group-hover:text-[#003087]" />
              </div>
              <span className="text-sm font-bold text-slate-700 group-hover:text-[#003087]">Collect Rent</span>
            </button>
            <button className="flex flex-col items-center justify-center p-4 border border-slate-200 rounded-xl hover:border-[#003087] hover:bg-[#003087]/5 transition-all group">
              <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center group-hover:bg-white mb-3">
                <Building className="w-5 h-5 text-slate-600 group-hover:text-[#003087]" />
              </div>
              <span className="text-sm font-bold text-slate-700 group-hover:text-[#003087]">Unit Status</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
