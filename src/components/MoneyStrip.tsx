import React, { useState } from 'react';
import { useProperty } from '../context/PropertyContext';
import {
  ScribbleWallet,
  ScribbleClock,
  ScribbleCheck,
  ScribbleChart,
  ScribbleMoney
} from './ScribbleIcons';
import { ArrowUpRight, ChevronRight, X } from 'lucide-react';

export const MoneyStrip: React.FC = () => {
  const { filteredMetrics, payments, tenants, setSelectedReceiptPayment } = useProperty();

  const [activeModal, setActiveModal] = useState<'today' | 'dues' | null>(null);

  const formatCurrency = (val: number) => '₹' + val.toLocaleString('en-IN');

  const todayPayments = payments.filter(p => p.date === new Date().toISOString().split('T')[0]);
  const overdueTenants = tenants.filter(t => t.duesStatus !== 'paid');

  return (
    <div className="space-y-4 font-sans">
      <div className="flex items-center justify-between">
        <h2 className="text-base sm:text-lg font-extrabold text-[#012169] flex items-center gap-2">
          <ScribbleMoney className="w-5 h-5 text-[#009cde]" />
          <span>Financial Collection Engine</span>
        </h2>
        <div className="flex items-center gap-1.5 text-xs sm:text-sm font-extrabold text-[#003087] bg-[#e0f2fe] px-3.5 py-1 rounded-full border border-[#009cde]/30 shadow-xs">
          <ScribbleChart className="w-3.5 h-3.5 text-[#009cde]" />
          <span>Efficiency: {filteredMetrics.collectionEfficiencyPct}%</span>
        </div>
      </div>

      {/* 3 Executive Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Today's Collection Card */}
        <div
          onClick={() => setActiveModal('today')}
          className="mustard-screen-card p-6 sm:p-7 rounded-3xl cursor-pointer relative overflow-hidden group border-slate-200 bg-white shadow-sm hover:shadow-md transition-all"
        >
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs sm:text-sm font-extrabold text-[#012169] uppercase tracking-wider">Today's Collection</span>
            <ScribbleWallet className="w-5 h-5 text-[#003087] stroke-[2.4] group-hover:scale-110 transition-transform" />
          </div>
          <div className="text-3xl sm:text-4xl font-extrabold text-[#003087] font-mono-amount tracking-tight">
            {formatCurrency(filteredMetrics.todayCollection)}
          </div>
          <div className="mt-5 flex items-center justify-between text-xs sm:text-sm border-t border-slate-100 pt-4">
            <span className="flex items-center gap-1 text-[#003087] font-extrabold bg-[#e0f2fe] px-3 py-1 rounded-lg border border-[#009cde]/30">
              <ArrowUpRight className="w-3.5 h-3.5 text-[#009cde]" /> +14.2% today
            </span>
            <span className="text-[#009cde] font-extrabold group-hover:translate-x-1 transition-transform flex items-center">
              View ({todayPayments.length}) <ChevronRight className="w-4 h-4 ml-0.5" />
            </span>
          </div>
        </div>

        {/* This Month's Dues Card */}
        <div
          onClick={() => setActiveModal('dues')}
          className="mustard-screen-card p-6 sm:p-7 rounded-3xl cursor-pointer relative overflow-hidden group border-slate-200 bg-white shadow-sm hover:shadow-md transition-all"
        >
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs sm:text-sm font-extrabold text-[#012169] uppercase tracking-wider">This Month's Dues</span>
            <ScribbleClock className="w-5 h-5 text-[#003087] stroke-[2.4] group-hover:scale-110 transition-transform" />
          </div>
          <div className="text-3xl sm:text-4xl font-extrabold text-[#003087] font-mono-amount tracking-tight">
            {formatCurrency(filteredMetrics.duesThisMonth)}
          </div>
          <div className="mt-5 flex items-center justify-between text-xs sm:text-sm border-t border-slate-100 pt-4">
            <span className="text-[#003087] font-extrabold bg-[#f1f5f9] px-3 py-1 rounded-lg border border-slate-200">
              {overdueTenants.length} tenants pending
            </span>
            <span className="text-[#009cde] font-extrabold group-hover:translate-x-1 transition-transform flex items-center">
              Collect Now <ChevronRight className="w-4 h-4 ml-0.5" />
            </span>
          </div>
        </div>

        {/* Monthly Target Progress Card */}
        <div className="mustard-screen-card p-6 sm:p-7 rounded-3xl relative overflow-hidden border-slate-200 bg-white shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs sm:text-sm font-extrabold text-[#012169] uppercase tracking-wider">Monthly Rent Target</span>
            <ScribbleCheck className="w-5 h-5 text-[#003087] stroke-[2.4]" />
          </div>

          <div className="flex items-baseline justify-between gap-2 flex-wrap">
            <span className="text-2xl sm:text-3xl font-extrabold text-[#003087] font-mono-amount tracking-tight">
              {formatCurrency(filteredMetrics.collectedThisMonth)}
            </span>
            <span className="text-xs sm:text-sm text-slate-500 font-mono-amount font-bold">
              / {formatCurrency(filteredMetrics.expectedRent)}
            </span>
          </div>

          <div className="mt-4 space-y-2">
            <div className="w-full h-3 rounded-full bg-slate-100 overflow-hidden p-0.5 border border-slate-200">
              <div
                className="h-full rounded-full bg-[#009cde] transition-all duration-700 shadow-xs"
                style={{ width: `${Math.min(100, filteredMetrics.collectionEfficiencyPct)}%` }}
              />
            </div>
            <div className="flex justify-between text-xs sm:text-sm text-[#012169] font-extrabold">
              <span className="text-[#009cde]">{filteredMetrics.collectionEfficiencyPct}% collected</span>
              <span>Target: {formatCurrency(filteredMetrics.expectedRent)}</span>
            </div>
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
