import React, { useState } from 'react';
import { useProperty } from '../context/PropertyContext';
import { ChevronRight, X, PhoneCall } from 'lucide-react';

export const StatusStrip: React.FC = () => {
  const {
    filteredMetrics,
    setIsAgingModalOpen,
    setActiveTab,
    units,
    tenants,
    properties,
    selectedPropertyId
  } = useProperty();

  const [activeModal, setActiveModal] = useState<'vacant' | 'occupied' | null>(null);

  const formatCurrency = (val: number) => '₹' + val.toLocaleString('en-IN');

  const activeUnits = selectedPropertyId === 'all'
    ? units
    : units.filter(u => u.propertyId === selectedPropertyId);

  const vacantUnitsList = activeUnits.filter(u => u.status === 'vacant');

  return (
    <div className="space-y-4 font-sans">
      <div className="flex items-center justify-between">
        <h2 className="text-base sm:text-lg font-extrabold text-[#012169]">
          Operational Status Overview
        </h2>
        <span className="text-xs font-bold text-slate-400">Real-time Telemetry</span>
      </div>

      {/* 4 Minimal, Bespoke Stat Tiles */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
        {/* All-Time Dues Tile */}
        <div
          onClick={() => setIsAgingModalOpen(true)}
          className="bg-white border border-slate-200/80 rounded-2xl p-5 cursor-pointer group hover:border-[#009cde] hover:shadow-md transition-all space-y-3"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold text-slate-500 uppercase tracking-wider">All-Time Dues</span>
            <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
          </div>

          <div className="text-2xl sm:text-3xl font-extrabold text-[#012169] font-mono-amount tracking-tight">
            {formatCurrency(filteredMetrics.totalDuesAllTime)}
          </div>

          <div className="flex items-center justify-between text-xs font-extrabold text-[#009cde] pt-2 border-t border-slate-100">
            <span>Aging Report</span>
            <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

        {/* Vacant Units Tile */}
        <div
          onClick={() => setActiveModal('vacant')}
          className="bg-white border border-slate-200/80 rounded-2xl p-5 cursor-pointer group hover:border-[#009cde] hover:shadow-md transition-all space-y-3"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold text-slate-500 uppercase tracking-wider">Vacant Units</span>
            <span className="w-2 h-2 rounded-full bg-amber-500" />
          </div>

          <div className="text-2xl sm:text-3xl font-extrabold text-[#012169] font-mono-amount tracking-tight">
            {filteredMetrics.vacantUnitsCount} <span className="text-xs font-bold text-slate-400">/ {filteredMetrics.totalUnitsCount}</span>
          </div>

          <div className="flex items-center justify-between text-xs font-extrabold text-[#009cde] pt-2 border-t border-slate-100">
            <span>Fill Units</span>
            <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

        {/* Occupied Units Tile */}
        <div
          onClick={() => setActiveModal('occupied')}
          className="bg-white border border-slate-200/80 rounded-2xl p-5 cursor-pointer group hover:border-[#009cde] hover:shadow-md transition-all space-y-3"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold text-slate-500 uppercase tracking-wider">Occupied Units</span>
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
          </div>

          <div className="text-2xl sm:text-3xl font-extrabold text-[#012169] font-mono-amount tracking-tight">
            {filteredMetrics.occupiedUnitsCount} <span className="text-xs font-bold text-slate-400">({filteredMetrics.occupancyRatePct}%)</span>
          </div>

          <div className="flex items-center justify-between text-xs font-extrabold text-[#009cde] pt-2 border-t border-slate-100">
            <span>View Tenants</span>
            <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

        {/* Pending Issues Tile */}
        <div
          onClick={() => setActiveTab('complaints')}
          className="bg-white border border-slate-200/80 rounded-2xl p-5 cursor-pointer group hover:border-[#009cde] hover:shadow-md transition-all space-y-3"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold text-slate-500 uppercase tracking-wider">Pending Issues</span>
            <span className="w-2 h-2 rounded-full bg-[#009cde]" />
          </div>

          <div className="text-2xl sm:text-3xl font-extrabold text-[#012169] font-mono-amount tracking-tight">
            {filteredMetrics.pendingComplaintsCount} <span className="text-xs font-bold text-slate-400">tickets</span>
          </div>

          <div className="flex items-center justify-between text-xs font-extrabold text-[#009cde] pt-2 border-t border-slate-100">
            <span>Complaints Tab</span>
            <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </div>

      {/* Vacant Units Modal */}
      {activeModal === 'vacant' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#012169]/60 backdrop-blur-xs p-4">
          <div className="bg-white text-[#012169] border border-slate-200 rounded-3xl w-full max-w-lg p-6 sm:p-7 space-y-5 max-h-[80vh] overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h3 className="text-lg font-extrabold text-[#012169]">Vacant Rooms & Flats</h3>
                <p className="text-xs sm:text-sm text-slate-500 font-semibold">{vacantUnitsList.length} units available to rent</p>
              </div>
              <button onClick={() => setActiveModal(null)} className="p-2.5 rounded-xl bg-slate-100 text-[#012169] hover:bg-slate-200">
                <X className="w-5 h-5" />
              </button>
            </div>

            {vacantUnitsList.length === 0 ? (
              <div className="text-center py-8 text-[#012169] text-sm font-bold">
                Full Occupancy! All units in this selection are occupied.
              </div>
            ) : (
              <div className="space-y-3">
                {vacantUnitsList.map(unit => {
                  const prop = properties.find(p => p.id === unit.propertyId);
                  return (
                    <div key={unit.id} className="p-4 rounded-2xl bg-[#f8fafc] border border-slate-200 flex items-center justify-between shadow-xs">
                      <div>
                        <div className="text-base font-extrabold text-[#012169]">{unit.unitNumber}</div>
                        <div className="text-xs sm:text-sm text-slate-500 font-semibold">{prop?.name}</div>
                        <div className="flex items-center gap-2 mt-1.5 text-xs">
                          <span className="px-2.5 py-0.5 rounded-md bg-[#e0f2fe] text-[#003087] border border-[#009cde]/30 font-extrabold">
                            Vacant for {unit.daysVacant || 12} days
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-base font-extrabold text-[#003087] font-mono-amount">{formatCurrency(unit.rentAmount)} /mo</div>
                        <button
                          onClick={() => {
                            setActiveModal(null);
                            setActiveTab('properties');
                          }}
                          className="mt-2 px-4 py-1.5 rounded-xl bg-[#009cde] text-white font-extrabold text-xs hover:bg-[#0080b8] shadow-sm"
                        >
                          List & Add Tenant
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Occupied Units Modal */}
      {activeModal === 'occupied' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#012169]/60 backdrop-blur-xs p-4">
          <div className="bg-white text-[#012169] border border-slate-200 rounded-3xl w-full max-w-lg p-6 sm:p-7 space-y-5 max-h-[80vh] overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h3 className="text-lg font-extrabold text-[#012169]">Active Tenants & Occupancy</h3>
                <p className="text-xs sm:text-sm text-[#009cde] font-semibold">{tenants.length} tenants currently residing</p>
              </div>
              <button onClick={() => setActiveModal(null)} className="p-2.5 rounded-xl bg-slate-100 text-[#012169] hover:bg-slate-200">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3">
              {tenants.map(tenant => (
                <div key={tenant.id} className="p-4 rounded-2xl bg-[#f8fafc] border border-slate-200 flex items-center justify-between shadow-xs">
                  <div className="flex items-center gap-3.5">
                    <img src={tenant.avatarUrl} alt={tenant.name} className="w-11 h-11 rounded-full object-cover border border-slate-200 shadow-xs" />
                    <div>
                      <div className="text-sm font-extrabold text-[#012169]">{tenant.name}</div>
                      <div className="text-xs sm:text-sm text-slate-500 font-semibold">{tenant.propertyName} • {tenant.unitNumber}</div>
                      <div className="text-xs text-[#009cde] font-semibold flex items-center gap-1 mt-0.5">
                        <PhoneCall className="w-3.5 h-3.5 text-[#009cde]" />
                        <span>{tenant.phone}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="px-2.5 py-0.5 rounded-md text-xs font-extrabold bg-[#e0f2fe] text-[#003087] border border-[#009cde]/30">
                      {tenant.duesStatus.toUpperCase()}
                    </span>
                    <div className="text-xs sm:text-sm font-mono-amount text-[#012169] font-extrabold mt-1">
                      {formatCurrency(tenant.monthlyRent)} /mo
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
