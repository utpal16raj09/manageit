import React, { useState, useMemo, useCallback } from 'react';
import { useProperty } from '../context/PropertyContext';
import {
  ScribbleBuilding,
  ScribbleChevron
} from './ScribbleIcons';
import { X, PhoneCall } from 'lucide-react';

const formatCurrency = (val: number) => '₹' + val.toLocaleString('en-IN');

export const StatusStrip: React.FC = React.memo(() => {
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

  const activeUnits = useMemo(() => {
    return selectedPropertyId === 'all'
      ? units
      : units.filter(u => u.propertyId === selectedPropertyId);
  }, [units, selectedPropertyId]);

  const vacantUnitsList = useMemo(() => {
    return activeUnits.filter(u => u.status === 'vacant');
  }, [activeUnits]);

  const handleOpenAging = useCallback(() => setIsAgingModalOpen(true), [setIsAgingModalOpen]);
  const handleOpenVacant = useCallback(() => setActiveModal('vacant'), []);
  const handleOpenOccupied = useCallback(() => setActiveModal('occupied'), []);
  const handleOpenComplaints = useCallback(() => setActiveTab('complaints'), [setActiveTab]);
  const handleCloseModal = useCallback(() => setActiveModal(null), []);

  const totalDuesFormatted = useMemo(() => formatCurrency(filteredMetrics.totalDuesAllTime), [filteredMetrics.totalDuesAllTime]);

  return (
    <div className="space-y-3.5 font-sans">
      <div className="flex items-center justify-between">
        <h2 className="text-sm sm:text-base font-extrabold text-[#012169] dark:text-[#f8fafc] flex items-center gap-2">
          <ScribbleBuilding className="w-4 h-4 text-[#009cde]" />
          <span>Operational Status Overview</span>
        </h2>
        <span className="text-[11px] font-bold text-slate-400 dark:text-slate-500">Real-time Telemetry</span>
      </div>

      {/* 4 Minimal, Bespoke Stat Tiles - 4x Spacing for Compact Card Widths */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-10 lg:gap-14 xl:gap-16 w-full">
        {/* All-Time Dues Tile */}
        <div
          onClick={handleOpenAging}
          className="bg-transparent dark:bg-transparent rounded-xl p-3.5 sm:p-4 cursor-pointer group status-stat-card shadow-none hover:border-slate-300 dark:hover:border-white/[0.16] transition-all duration-200 w-full min-h-[108px] sm:min-h-[116px] flex flex-col justify-between items-center text-center"
        >
          <div className="text-[10px] font-extrabold text-slate-500 dark:text-slate-400 uppercase tracking-wider text-center w-full">
            All-Time Dues
          </div>

          <div className="text-base sm:text-lg lg:text-xl font-extrabold text-[#012169] dark:text-[#f8fafc] font-mono-amount tracking-tight my-1 text-center w-full">
            {totalDuesFormatted}
          </div>

          <div className="flex items-center justify-center gap-1 text-[10px] font-extrabold text-[#009cde] pt-0.5 w-full">
            <span>Aging Report</span>
            <ScribbleChevron className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
          </div>
        </div>

        {/* Vacant Units Tile */}
        <div
          onClick={handleOpenVacant}
          className="bg-transparent dark:bg-transparent rounded-xl p-3.5 sm:p-4 cursor-pointer group status-stat-card shadow-none hover:border-slate-300 dark:hover:border-white/[0.16] transition-all duration-200 w-full min-h-[108px] sm:min-h-[116px] flex flex-col justify-between items-center text-center"
        >
          <div className="text-[10px] font-extrabold text-slate-500 dark:text-slate-400 uppercase tracking-wider text-center w-full">
            Vacant Units
          </div>

          <div className="text-base sm:text-lg lg:text-xl font-extrabold text-[#012169] dark:text-[#f8fafc] font-mono-amount tracking-tight my-1 text-center w-full">
            {filteredMetrics.vacantUnitsCount} <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500">/ {filteredMetrics.totalUnitsCount}</span>
          </div>

          <div className="flex items-center justify-center gap-1 text-[10px] font-extrabold text-[#009cde] pt-0.5 w-full">
            <span>Fill Units</span>
            <ScribbleChevron className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
          </div>
        </div>

        {/* Occupied Units Tile */}
        <div
          onClick={handleOpenOccupied}
          className="bg-transparent dark:bg-transparent rounded-xl p-3.5 sm:p-4 cursor-pointer group status-stat-card shadow-none hover:border-slate-300 dark:hover:border-white/[0.16] transition-all duration-200 w-full min-h-[108px] sm:min-h-[116px] flex flex-col justify-between items-center text-center"
        >
          <div className="text-[10px] font-extrabold text-slate-500 dark:text-slate-400 uppercase tracking-wider text-center w-full">
            Occupied Units
          </div>

          <div className="text-base sm:text-lg lg:text-xl font-extrabold text-[#012169] dark:text-[#f8fafc] font-mono-amount tracking-tight my-1 text-center w-full">
            {filteredMetrics.occupiedUnitsCount} <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500">({filteredMetrics.occupancyRatePct}%)</span>
          </div>

          <div className="flex items-center justify-center gap-1 text-[10px] font-extrabold text-[#009cde] pt-0.5 w-full">
            <span>View Tenants</span>
            <ScribbleChevron className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
          </div>
        </div>

        {/* Pending Issues Tile */}
        <div
          onClick={handleOpenComplaints}
          className="bg-transparent dark:bg-transparent rounded-xl p-3.5 sm:p-4 cursor-pointer group status-stat-card shadow-none hover:border-slate-300 dark:hover:border-white/[0.16] transition-all duration-200 w-full min-h-[108px] sm:min-h-[116px] flex flex-col justify-between items-center text-center"
        >
          <div className="text-[10px] font-extrabold text-slate-500 dark:text-slate-400 uppercase tracking-wider text-center w-full">
            Pending Issues
          </div>

          <div className="text-base sm:text-lg lg:text-xl font-extrabold text-[#012169] dark:text-[#f8fafc] font-mono-amount tracking-tight my-1 text-center w-full">
            {filteredMetrics.pendingComplaintsCount} <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500">tickets</span>
          </div>

          <div className="flex items-center justify-center gap-1 text-[10px] font-extrabold text-[#009cde] pt-0.5 w-full">
            <span>Complaints Tab</span>
            <ScribbleChevron className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
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
              <button onClick={handleCloseModal} className="p-2.5 rounded-xl bg-slate-100 text-[#012169] hover:bg-slate-200">
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
                            handleCloseModal();
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
              <button onClick={handleCloseModal} className="p-2.5 rounded-xl bg-slate-100 text-[#012169] hover:bg-slate-200">
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
});

