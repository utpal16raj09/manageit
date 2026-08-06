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
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 font-sans">
      {/* Live Rent Roll Stream */}
      <div className="lg:col-span-2 mustard-screen-card p-6 sm:p-7 rounded-3xl space-y-6 bg-white border border-slate-200 shadow-sm">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <CreditCard className="w-5 h-5 text-[#003087] stroke-[2.4] flex-shrink-0" />
            <div>
              <h3 className="text-base sm:text-lg font-extrabold text-[#012169] leading-tight">Live Rent Collection Feed</h3>
            </div>
          </div>

          <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-[#e0f2fe] text-[#003087] border border-[#009cde]/40 flex items-center gap-1.5 shadow-xs whitespace-nowrap">
            <span className="w-2 h-2 rounded-full bg-[#009cde] animate-pulse" />
            Live Sync
          </span>
        </div>

        <div className="space-y-4 pt-1">
          {recentPayments.map((p, idx) => (
            <div
              key={p.id}
              onClick={() => setSelectedReceiptPayment(p)}
              className="p-5 rounded-2xl bg-[#f8fafc] border border-slate-200 space-y-3 cursor-pointer hover:border-[#009cde] hover:bg-[#f0f7ff] transition-all group shadow-2xs"
            >
              {/* Row 1: Tenant Name & Formatted Date */}
              <div className="flex items-center justify-between gap-2">
                <span className="text-base font-extrabold text-[#012169] group-hover:text-[#009cde] transition-colors truncate">
                  {p.tenantName}
                </span>
                <span className="px-2.5 py-1 rounded-md bg-[#e0f2fe] text-[#003087] border border-[#009cde]/30 text-xs font-bold flex items-center gap-1.5 whitespace-nowrap flex-shrink-0">
                  <Calendar className="w-3.5 h-3.5 text-[#009cde]" />
                  {idx === 0 ? 'Today, 2:15 PM' : idx === 1 ? 'Yesterday, 5:40 PM' : formatDate(p.date)}
                </span>
              </div>

              {/* Row 2: Property Context & Dedicated Payment Option Pill */}
              <div className="flex items-center justify-between gap-3 text-xs">
                <span className="font-semibold text-slate-500 truncate">
                  {p.propertyName} • Unit {p.unitNumber}
                </span>

                <span className="px-3 py-1 rounded-lg bg-[#003087] text-white font-extrabold text-[11px] shadow-xs flex-shrink-0 tracking-wide">
                  {p.method}
                </span>
              </div>

              {/* Row 3: Amount & Receipt Status Badge with Clear Separation */}
              <div className="flex items-center justify-between border-t border-slate-200/80 pt-3 mt-1">
                <div className="flex items-center gap-2">
                  <span className="text-base sm:text-lg font-extrabold text-[#009cde] font-mono-amount">
                    +{formatCurrency(p.amount)}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-mono font-bold text-slate-400 flex items-center gap-1">
                    <Receipt className="w-3 h-3 text-slate-400" />
                    {p.receiptNumber}
                  </span>
                  <span className="text-[10px] font-extrabold text-white bg-[#003087] px-3 py-0.5 rounded-full shadow-xs whitespace-nowrap">
                    PAID
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Action Rent Nudge Panel */}
      <div className="mustard-screen-card p-6 sm:p-7 rounded-3xl space-y-6 bg-white border border-slate-200 shadow-sm">
        <div className="flex items-center gap-2.5 mb-2">
          <ScribbleBell className="w-5 h-5 text-[#003087] stroke-[2.4] flex-shrink-0" />
          <div>
            <h3 className="text-base font-extrabold text-[#012169] leading-tight">Rent Reminders</h3>
          </div>
        </div>

        <div className="space-y-3">
          {tenants.filter(t => t.duesStatus !== 'paid').slice(0, 3).map(t => (
            <div key={t.id} className="p-4 rounded-2xl bg-[#f8fafc] border border-slate-200 flex items-center justify-between gap-3 shadow-2xs hover:border-[#009cde] transition-colors">
              <div className="min-w-0">
                <div className="text-xs sm:text-sm font-extrabold text-[#012169] truncate">{t.name}</div>
                <div className="text-[11px] font-semibold text-slate-500 truncate">{t.propertyName} ({t.unitNumber})</div>
                <div className="text-xs sm:text-sm font-extrabold text-[#009cde] font-mono-amount mt-0.5">{formatCurrency(t.outstandingDueAmount)}</div>
              </div>

              <button
                onClick={() => sendWhatsAppNudge(t.name, t.phone, t.outstandingDueAmount)}
                className="px-3.5 py-2 rounded-xl bg-[#009cde] hover:bg-[#0080b8] text-white font-extrabold text-xs flex items-center gap-1 shadow-xs transition-transform active:scale-95 flex-shrink-0"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>Nudge</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
