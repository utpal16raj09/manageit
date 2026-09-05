import React, { useState } from 'react';
import { useProperty } from '../context/PropertyContext';
import {
  ScribbleChart,
  ScribbleMoney,
  ScribbleChevron
} from './ScribbleIcons';
import { ArrowUpRight, X } from 'lucide-react';

export const MoneyStrip: React.FC = () => {
  const { filteredMetrics, payments, tenants, setSelectedReceiptPayment } = useProperty();

  const [activeModal, setActiveModal] = useState<'today' | 'dues' | null>(null);

  const formatCurrency = (val: number) => '₹' + val.toLocaleString('en-IN');

  const todayPayments = payments.filter(p => p.date === new Date().toISOString().split('T')[0]);
  const overdueTenants = tenants.filter(t => t.duesStatus !== 'paid');

  return (
    <div className="space-y-3.5 font-sans">
      <div className="flex items-center justify-between">
        <h2 className="text-sm sm:text-base font-extrabold text-[#012169] dark:text-[#f8fafc] flex items-center gap-2">
          <ScribbleMoney className="w-4.5 h-4.5 text-[#009cde]" />
          <span>Financial Collection Engine</span>
        </h2>
        <div className="flex items-center gap-1.5 text-xs font-extrabold text-[#003087] dark:text-[#93c5fd] bg-[#f0f7ff] dark:bg-white/[0.05] border border-blue-100/60 dark:border-white/[0.06] px-2.5 py-0.5 rounded-lg shadow-2xs">
          <ScribbleChart className="w-3.5 h-3.5 text-[#009cde]" />
          <span>Efficiency: {filteredMetrics.collectionEfficiencyPct}%</span>
        </div>
      </div>

      {/* 3 Executive Cards - 4x Spacing for Compact Card Widths */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-14 lg:gap-20 xl:gap-24 w-full">
        {/* Today's Collection Card */}
        <div
          onClick={() => setActiveModal('today')}
          className="mustard-screen-card p-3.5 sm:p-4 rounded-xl cursor-pointer relative overflow-hidden group bg-transparent dark:bg-transparent shadow-none hover:border-slate-300 dark:hover:border-white/[0.16] transition-all duration-200 w-full flex flex-col justify-between items-center text-center min-h-[120px] sm:min-h-[128px]"
        >
          <div className="w-full flex flex-col items-center">
            <div className="text-[10px] font-extrabold text-[#012169] dark:text-slate-400 uppercase tracking-wider truncate mb-1 text-center w-full">
              Today's Collection
            </div>
            <div className="text-lg sm:text-xl font-extrabold text-[#003087] dark:text-[#f8fafc] font-mono-amount tracking-tight text-center w-full">
              {formatCurrency(filteredMetrics.todayCollection)}
            </div>
            <div className="mt-1.5 flex justify-center w-full">
              <span className="inline-flex items-center gap-1 text-[#003087] dark:text-[#93c5fd] font-extrabold bg-[#e0f2fe] dark:bg-white/[0.06] px-2 py-0.5 rounded-md text-[10px] whitespace-nowrap">
                <ArrowUpRight className="w-2.5 h-2.5 text-[#009cde]" /> +14.2% today
              </span>
            </div>
          </div>
          <div className="pt-2 flex items-center justify-center text-xs border-t border-slate-100 dark:border-white/[0.06] mt-2 w-full">
            <span className="text-[11px] font-extrabold text-[#009cde] group-hover:translate-x-0.5 transition-transform flex items-center justify-center gap-1 whitespace-nowrap">
              View ({todayPayments.length}) <ScribbleChevron className="w-3 h-3" />
            </span>
          </div>
        </div>

        {/* This Month's Dues Card */}
        <div
          onClick={() => setActiveModal('dues')}
          className="mustard-screen-card p-3.5 sm:p-4 rounded-xl cursor-pointer relative overflow-hidden group bg-transparent dark:bg-transparent shadow-none hover:border-slate-300 dark:hover:border-white/[0.16] transition-all duration-200 w-full flex flex-col justify-between items-center text-center min-h-[120px] sm:min-h-[128px]"
        >
          <div className="w-full flex flex-col items-center">
            <div className="text-[10px] font-extrabold text-[#012169] dark:text-slate-400 uppercase tracking-wider truncate mb-1 text-center w-full">
              This Month's Dues
            </div>
            <div className="text-lg sm:text-xl font-extrabold text-[#003087] dark:text-[#f8fafc] font-mono-amount tracking-tight text-center w-full">
              {formatCurrency(filteredMetrics.duesThisMonth)}
            </div>
            <div className="mt-1.5 flex justify-center w-full">
              <span className="inline-flex items-center text-[#003087] dark:text-slate-300 font-extrabold bg-[#f1f5f9] dark:bg-white/[0.06] px-2 py-0.5 rounded-md text-[10px] whitespace-nowrap">
                {overdueTenants.length} tenants pending
              </span>
            </div>
          </div>
          <div className="pt-2 flex items-center justify-center text-xs border-t border-slate-100 dark:border-white/[0.06] mt-2 w-full">
            <span className="text-[11px] font-extrabold text-[#009cde] group-hover:translate-x-0.5 transition-transform flex items-center justify-center gap-1 whitespace-nowrap">
              Collect Now <ScribbleChevron className="w-3 h-3" />
            </span>
          </div>
        </div>

        {/* Monthly Target Progress Card */}
        <div className="mustard-screen-card p-3.5 sm:p-4 rounded-xl relative overflow-hidden bg-transparent dark:bg-transparent shadow-none hover:border-slate-300 dark:hover:border-white/[0.16] transition-all duration-200 w-full flex flex-col justify-between items-center text-center min-h-[120px] sm:min-h-[128px]">
          <div className="w-full flex flex-col items-center">
            <div className="text-[10px] font-extrabold text-[#012169] dark:text-slate-400 uppercase tracking-wider truncate mb-1 text-center w-full">
              Monthly Rent Target
            </div>

            <div className="flex items-baseline justify-center gap-1.5 flex-wrap w-full text-center">
              <span className="text-base sm:text-lg font-extrabold text-[#003087] dark:text-[#f8fafc] font-mono-amount tracking-tight">
                {formatCurrency(filteredMetrics.collectedThisMonth)}
              </span>
              <span className="text-[10px] text-slate-500 dark:text-slate-400 font-mono-amount font-bold">
                / {formatCurrency(filteredMetrics.expectedRent)}
              </span>
            </div>

            <div className="mt-1.5 space-y-1 w-full max-w-xs mx-auto">
              <div className="w-full h-1.5 rounded-full bg-slate-100 dark:bg-white/[0.06] overflow-hidden p-0.5">
                <div
                  className="h-full rounded-full bg-[#009cde] transition-all duration-700 shadow-xs"
                  style={{ width: `${Math.min(100, filteredMetrics.collectionEfficiencyPct)}%` }}
                />
              </div>
            </div>
          </div>
          <div className="pt-2 flex items-center justify-center gap-2.5 text-[10px] text-[#012169] dark:text-slate-300 font-extrabold border-t border-slate-100 dark:border-white/[0.06] mt-2 w-full">
            <span className="text-[#009cde]">{filteredMetrics.collectionEfficiencyPct}% collected</span>
            <span className="text-slate-300 dark:text-white/20">•</span>
            <span className="text-slate-400 dark:text-slate-500">Target: {formatCurrency(filteredMetrics.expectedRent)}</span>
          </div>
        </div>
      </div>

      {/* Modals */}
      {activeModal === 'today' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#012169]/60 backdrop-blur-xs p-4 font-sans">
          <div className="bg-white text-[#012169] border border-slate-200 rounded-3xl w-full max-w-lg p-6 sm:p-7 space-y-5 max-h-[80vh] overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h3 className="text-lg font-extrabold text-[#012169]">Today's Rent Receipts</h3>
                <p className="text-xs text-slate-500 font-semibold">Total collected today: <span className="font-extrabold text-[#009cde] font-mono-amount text-sm">{formatCurrency(filteredMetrics.todayCollection)}</span></p>
              </div>
              <button onClick={() => setActiveModal(null)} className="p-2.5 rounded-xl bg-slate-100 text-[#012169] hover:bg-slate-200">
                <X className="w-5 h-5" />
              </button>
            </div>

            {todayPayments.length === 0 ? (
              <div className="text-center py-10 text-slate-500 text-sm font-medium">
                No rent recorded today yet.
              </div>
            ) : (
              <div className="space-y-3">
                {todayPayments.map(p => (
                  <div
                    key={p.id}
                    onClick={() => {
                      setSelectedReceiptPayment(p);
                      setActiveModal(null);
                    }}
                    className="p-4 rounded-2xl bg-[#f8fafc] border border-slate-200 flex items-center justify-between cursor-pointer hover:border-[#009cde] transition-all shadow-xs"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-11 h-11 rounded-xl bg-[#003087] text-white flex items-center justify-center font-extrabold text-xs shadow-xs">
                        {p.method}
                      </div>
                      <div>
                        <div className="text-sm font-extrabold text-[#012169]">{p.tenantName}</div>
                        <div className="text-xs text-slate-500 font-semibold">{p.propertyName} • {p.unitNumber}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-base font-extrabold text-[#009cde] font-mono-amount">+{formatCurrency(p.amount)}</div>
                      <div className="text-xs text-slate-500 font-mono font-bold">{p.receiptNumber}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
