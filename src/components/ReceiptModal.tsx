import React from 'react';
import { useProperty } from '../context/PropertyContext';
import { ScribbleBuilding } from './ScribbleIcons';
import { X, CheckCircle2, Share2, Printer } from 'lucide-react';

export const ReceiptModal: React.FC = () => {
  const { selectedReceiptPayment, setSelectedReceiptPayment } = useProperty();

  if (!selectedReceiptPayment) return null;

  const payment = selectedReceiptPayment;
  const formatCurrency = (val: number) => '₹' + val.toLocaleString('en-IN');

  const handlePrint = () => {
    window.print();
  };

  const handleShareWhatsApp = () => {
    const text = encodeURIComponent(
      `*RENT PAYMENT RECEIPT*\n` +
      `Receipt No: ${payment.receiptNumber}\n` +
      `Tenant: ${payment.tenantName}\n` +
      `Property: ${payment.propertyName} (${payment.unitNumber})\n` +
      `Amount Paid: ${formatCurrency(payment.amount)}\n` +
      `Payment Method: ${payment.method}\n` +
      `Date: ${payment.date}\n` +
      `Status: SUCCESSFUL (PAID)\n\n` +
      `Thank you for paying via PropPulse!`
    );
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#012169]/60 backdrop-blur-xs p-4 font-sans">
      <div className="bg-white border border-slate-200 rounded-3xl w-full max-w-md p-6 space-y-6 shadow-2xl relative overflow-hidden">
        {/* Top PropPulse Accent Line */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#012169] via-[#003087] to-[#009cde]" />

        <button
          onClick={() => setSelectedReceiptPayment(null)}
          className="absolute top-4 right-4 p-2 rounded-xl bg-slate-100 text-slate-500 hover:text-[#012169] hover:bg-slate-200 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="text-center pt-2 space-y-1">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-[#f0f7ff] border border-[#009cde]/30 text-[#003087] flex items-center justify-center mb-3 shadow-2xs">
            <CheckCircle2 className="w-7 h-7 text-[#009cde] stroke-[2.2]" />
          </div>
          <h3 className="text-xl font-extrabold text-[#012169]">Payment Received</h3>
          <p className="text-xs text-[#009cde] font-extrabold">Receipt {payment.receiptNumber}</p>
        </div>

        {/* Receipt Details Box */}
        <div className="bg-[#f8fafc] border border-slate-200 rounded-2xl p-4 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-200/80 pb-3">
            <div className="flex items-center gap-2">
              <ScribbleBuilding className="w-4 h-4 text-[#003087] stroke-[2.2]" />
              <span className="text-xs font-extrabold text-[#012169] uppercase tracking-wider">{payment.propertyName}</span>
            </div>
            <span className="text-[11px] text-slate-400 font-bold">{payment.date}</span>
          </div>

          <div className="space-y-2.5">
            <div className="flex justify-between text-xs">
              <span className="text-slate-500 font-semibold">Tenant Name</span>
              <span className="font-extrabold text-[#012169]">{payment.tenantName}</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-slate-500 font-semibold">Unit / Flat</span>
              <span className="font-extrabold text-[#003087]">{payment.unitNumber}</span>
            </div>
            <div className="flex justify-between text-xs items-center">
              <span className="text-slate-500 font-semibold">Payment Mode</span>
              <span className="px-2.5 py-0.5 rounded-md bg-[#f0f7ff] text-[#003087] border border-[#009cde]/30 text-[10px] font-extrabold">
                {payment.method}
              </span>
            </div>
            {payment.notes && (
              <div className="flex justify-between text-xs">
                <span className="text-slate-500 font-semibold">Note</span>
                <span className="text-slate-600 font-semibold italic">{payment.notes}</span>
              </div>
            )}
          </div>

          <div className="border-t border-slate-200/80 pt-3 flex items-center justify-between">
            <span className="text-xs font-extrabold text-slate-500 uppercase tracking-wider">Amount Paid</span>
            <span className="text-xl font-extrabold text-[#003087] font-mono-amount">
              {formatCurrency(payment.amount)}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 pt-1">
          <button
            onClick={handleShareWhatsApp}
            className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#009cde] hover:bg-[#0080b8] text-white font-extrabold text-xs shadow-xs transition-transform active:scale-95"
          >
            <Share2 className="w-4 h-4 stroke-[2.4]" />
            <span>Share WhatsApp</span>
          </button>
          <button
            onClick={handlePrint}
            className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-slate-100 text-[#012169] font-extrabold text-xs border border-slate-200 hover:bg-slate-200 transition-colors"
          >
            <Printer className="w-4 h-4 stroke-[2.4]" />
            <span>Print Receipt</span>
          </button>
        </div>
      </div>
    </div>
  );
};
