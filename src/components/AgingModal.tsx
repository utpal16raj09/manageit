import React from 'react';
import { useProperty } from '../context/PropertyContext';
import { ScribbleAlert, ScribbleMoney } from './ScribbleIcons';
import { X, MessageCircle } from 'lucide-react';

export const AgingModal: React.FC = () => {
  const { isAgingModalOpen, setIsAgingModalOpen, filteredMetrics, tenants } = useProperty();

  if (!isAgingModalOpen) return null;

  const formatCurrency = (val: number) => '₹' + val.toLocaleString('en-IN');

  const sendWhatsAppNudge = (tenantName: string, phone: string, amount: number) => {
    const cleanPhone = phone.replace(/[^0-9]/g, '');
    const msg = encodeURIComponent(
      `Hi ${tenantName}, polite reminder for outstanding rent of ${formatCurrency(amount)}. Please transfer at your earliest convenience. Thank you!`
    );
    window.open(`https://wa.me/${cleanPhone}?text=${msg}`, '_blank');
  };

  const overdueTenants = tenants.filter(t => t.duesStatus !== 'paid');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#012169]/60 backdrop-blur-xs p-4 font-sans">
      <div className="bg-white text-[#012169] border border-slate-200 rounded-3xl w-full max-w-2xl p-6 sm:p-7 space-y-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3.5">
            <div className="p-3 rounded-2xl bg-[#e0f2fe] text-[#009cde] border border-[#009cde]/30 shadow-xs">
              <ScribbleAlert className="w-6 h-6 stroke-[2.2]" />
            </div>
            <div>
              <h3 className="text-lg font-extrabold text-[#012169]">Aging Dues Analysis Radar</h3>
              <p className="text-xs sm:text-sm font-semibold text-slate-500">Breakdown of outstanding rent by overdue period</p>
            </div>
          </div>

          <button
            onClick={() => setIsAgingModalOpen(false)}
            className="p-2.5 rounded-xl bg-slate-100 text-[#012169] hover:bg-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 3 Bucket Tiles */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-2xl bg-[#f8fafc] border border-slate-200 space-y-1">
            <div className="text-xs font-extrabold text-slate-500 uppercase">0 - 30 Days Overdue</div>
            <div className="text-xl sm:text-2xl font-extrabold text-[#003087] font-mono-amount">{formatCurrency(filteredMetrics.agingBreakdown.d0_30)}</div>
          </div>
          <div className="p-4 rounded-2xl bg-[#f8fafc] border border-slate-200 space-y-1">
            <div className="text-xs font-extrabold text-slate-500 uppercase">30 - 60 Days Overdue</div>
            <div className="text-xl sm:text-2xl font-extrabold text-[#003087] font-mono-amount">{formatCurrency(filteredMetrics.agingBreakdown.d30_60)}</div>
          </div>
          <div className="p-4 rounded-2xl bg-[#f8fafc] border border-slate-200 space-y-1">
            <div className="text-xs font-extrabold text-slate-500 uppercase">60+ Days Critical</div>
            <div className="text-xl sm:text-2xl font-extrabold text-rose-600 font-mono-amount">{formatCurrency(filteredMetrics.agingBreakdown.d60_plus)}</div>
          </div>
        </div>

        {/* Overdue Tenants Directory */}
        <div className="space-y-3">
          <h4 className="text-sm font-extrabold text-[#012169] flex items-center gap-2">
            <ScribbleMoney className="w-4 h-4 text-[#009cde]" />
            <span>Overdue Tenant Roster ({overdueTenants.length})</span>
          </h4>

          <div className="space-y-2.5">
            {overdueTenants.map(t => (
              <div key={t.id} className="p-4 rounded-2xl bg-[#f8fafc] border border-slate-200 flex items-center justify-between gap-3 shadow-2xs hover:border-[#009cde] transition-colors">
                <div className="flex items-center gap-3">
                  <img src={t.avatarUrl} alt={t.name} className="w-10 h-10 rounded-full object-cover border border-slate-200" />
                  <div>
                    <div className="text-sm font-extrabold text-[#012169]">{t.name}</div>
                    <div className="text-xs text-slate-500 font-semibold">{t.propertyName} • {t.unitNumber}</div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className="text-sm font-extrabold text-[#003087] font-mono-amount">{formatCurrency(t.outstandingDueAmount)}</div>
                    <span className="px-2 py-0.5 rounded-md text-[10px] font-extrabold bg-amber-50 text-amber-800 border border-amber-200">
                      OVERDUE
                    </span>
                  </div>

                  <button
                    onClick={() => sendWhatsAppNudge(t.name, t.phone, t.outstandingDueAmount)}
                    className="p-2.5 rounded-xl bg-[#009cde] hover:bg-[#0080b8] text-white shadow-xs cursor-pointer active:scale-95 transition-transform"
                    title="Send WhatsApp Nudge"
                  >
                    <MessageCircle className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
