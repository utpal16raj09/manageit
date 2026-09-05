import React from 'react';
import { useProperty } from '../context/PropertyContext';
import { CreditCard, MessageCircle, Calendar, Receipt } from 'lucide-react';
import { ScribbleBell } from './ScribbleIcons';

export const LiveRentRollWidget: React.FC = () => {
  const { payments, tenants, setSelectedReceiptPayment } = useProperty();

  const formatCurrency = (val: number) => '₹' + val.toLocaleString('en-IN');

  const formatDate = (dateStr: string) => {
    if (!dateStr) return '01 Aug 2026';
    try {
      const d = new Date(dateStr);
      if (isNaN(d.getTime())) return '01 Aug 2026';
      return d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
    } catch {
      return '01 Aug 2026';
    }
  };

  const recentPayments = payments.slice(0, 4);

  const sendWhatsAppNudge = (tenantName: string, phone: string, amount: number) => {
    const cleanPhone = phone.replace(/[^0-9]/g, '');
    const msg = encodeURIComponent(
      `Hi ${tenantName}, friendly reminder regarding your outstanding rent of ${formatCurrency(amount)}. Please share the payment screenshot once transferred. Thanks!`
    );
    window.open(`https://wa.me/${cleanPhone}?text=${msg}`, '_blank');
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-5 font-sans w-full">
      {/* Live Rent Roll Stream */}
      <div className="lg:col-span-2 mustard-screen-card p-3.5 sm:p-4 rounded-xl space-y-3.5 bg-white shadow-2xs">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <CreditCard className="w-4 h-4 text-[#003087] stroke-[2.2] flex-shrink-0" />
            <div>
              <h3 className="text-sm sm:text-base font-extrabold text-[#012169] leading-tight">Live Rent Collection Feed</h3>
            </div>
          </div>

          <span className="px-2 py-0.5 rounded-lg text-xs font-extrabold bg-[#f0f7ff] text-[#003087] border border-[#009cde]/30 flex items-center gap-1.5 shadow-2xs whitespace-nowrap">
            <span className="w-1.5 h-1.5 rounded-full bg-[#009cde] animate-pulse" />
            Live Sync
          </span>
        </div>

        <div className="space-y-2.5 pt-0.5">
          {recentPayments.map((p, idx) => (
            <div
              key={p.id}
              onClick={() => setSelectedReceiptPayment(p)}
              className="p-3 sm:p-3.5 rounded-xl bg-[#f8fafc] border border-slate-200 space-y-2 cursor-pointer hover:border-[#009cde] hover:bg-[#f0f7ff] transition-all group shadow-2xs"
            >
              {/* Row 1: Tenant Name & Formatted Date */}
              <div className="flex items-center justify-between gap-2">
                <span className="text-sm font-extrabold text-[#012169] group-hover:text-[#009cde] transition-colors truncate">
                  {p.tenantName}
                </span>
                <span className="px-2 py-0.5 rounded-md bg-[#f0f7ff] text-[#003087] border border-[#009cde]/30 text-[11px] font-bold flex items-center gap-1 whitespace-nowrap flex-shrink-0">
                  <Calendar className="w-3 h-3 text-[#009cde]" />
                  {idx === 0 ? 'Today, 2:15 PM' : idx === 1 ? 'Yesterday, 5:40 PM' : formatDate(p.date)}
                </span>
              </div>

              {/* Row 2: Property Context & Dedicated Payment Option Pill */}
              <div className="flex items-center justify-between gap-3 text-xs">
                <span className="font-semibold text-slate-500 truncate text-[11px]">
                  {p.propertyName} • Unit {p.unitNumber}
                </span>

                <span className="px-2 py-0.5 rounded-md bg-slate-100 text-[#003087] border border-slate-200 font-extrabold text-[10px] shadow-2xs flex-shrink-0 tracking-wide">
                  {p.method}
                </span>
              </div>

              {/* Row 3: Amount & Receipt Status Badge */}
              <div className="flex items-center justify-between border-t border-slate-200/80 pt-2 mt-0.5">
                <div className="flex items-center gap-2">
                  <span className="text-sm sm:text-base font-extrabold text-[#009cde] font-mono-amount">
                    +{formatCurrency(p.amount)}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono font-bold text-slate-400 flex items-center gap-1">
                    <Receipt className="w-2.5 h-2.5 text-slate-400" />
                    {p.receiptNumber}
                  </span>
                  <span className="text-[10px] font-extrabold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-md shadow-2xs whitespace-nowrap">
                    PAID
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Action Rent Nudge Panel */}
      <div className="mustard-screen-card p-3.5 sm:p-4 rounded-xl space-y-3 bg-white shadow-2xs">
        <div className="flex items-center gap-2 mb-1">
          <ScribbleBell className="w-4 h-4 text-[#003087] stroke-[2.2] flex-shrink-0" />
          <div>
            <h3 className="text-sm sm:text-base font-extrabold text-[#012169] leading-tight">Rent Reminders</h3>
          </div>
        </div>

        <div className="space-y-2.5">
          {tenants.filter(t => t.duesStatus !== 'paid').slice(0, 3).map(t => (
            <div key={t.id} className="p-3 sm:p-3.5 rounded-xl bg-[#f8fafc] flex items-center justify-between gap-2.5 shadow-2xs transition-all duration-200">
              <div className="min-w-0">
                <div className="text-xs sm:text-sm font-extrabold text-[#012169] truncate">{t.name}</div>
                <div className="text-[10px] font-semibold text-slate-500 truncate">{t.propertyName} ({t.unitNumber})</div>
                <div className="text-xs font-extrabold text-[#009cde] font-mono-amount mt-0.5">{formatCurrency(t.outstandingDueAmount)}</div>
              </div>

              <button
                onClick={() => sendWhatsAppNudge(t.name, t.phone, t.outstandingDueAmount)}
                className="px-3 py-1.5 rounded-lg bg-[#009cde] hover:bg-[#0080b8] text-white font-extrabold text-xs flex items-center gap-1 shadow-xs transition-transform active:scale-95 flex-shrink-0 cursor-pointer"
              >
                <MessageCircle className="w-3 h-3" />
                <span>Nudge</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
