import React, { useState } from 'react';
import { ScribbleSearch, ScribbleSync } from './ScribbleIcons';
import { HelpCircle, MessageCircle, BookOpen, ChevronRight, FileText, ShieldCheck } from 'lucide-react';

export const HelpCenterView: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const faqs = [
    {
      cat: 'Getting Started',
      q: 'How do I add properties, floors, and units?',
      a: 'Navigate to Properties & Units tab or click "+ Quick Action" -> "Add Unit". Fill in the unit details, assigned rent, and property scope.'
    },
    {
      cat: 'Rent & Payments',
      q: 'How does digital rent collection & receipting work?',
      a: 'When a tenant pays via UPI or NEFT, click "Record Payment". PropPulse generates an instant digital PDF receipt with custom invoice numbers and updates tenant balance.'
    },
    {
      cat: 'WhatsApp Nudging',
      q: 'How do I send automated overdue reminders?',
      a: 'Go to Aging Dues Radar or Status Overview, click the WhatsApp Nudge button. PropPulse prepares a personalized message with exact pending amounts.'
    },
    {
      cat: 'Offline Operations',
      q: 'Can I log payments when internet is disconnected in basements?',
      a: 'Yes! PropPulse features a PWA offline sync engine. All offline logs are stored locally and automatically synced once a network connection is detected.'
    }
  ];

  const filteredFaqs = faqs.filter(f =>
    f.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
    f.a.toLowerCase().includes(searchQuery.toLowerCase()) ||
    f.cat.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8 font-sans">
      {/* Top Banner - Unboxed Classy Icon */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <HelpCircle className="w-8 h-8 text-[#003087] stroke-[2.4]" />
          <div>
            <h2 className="text-xl font-extrabold text-[#012169]">Help Center & Landlord Guides</h2>
            <p className="text-xs sm:text-sm font-semibold text-slate-500">Knowledge base, video tutorials, and live support</p>
          </div>
        </div>

        <button
          onClick={() => window.open('https://wa.me/919876543210?text=Hi%20PropPulse%20Support', '_blank')}
          className="px-4 py-2.5 rounded-xl bg-[#009cde] hover:bg-[#0080b8] text-white font-extrabold text-xs sm:text-sm shadow-xs flex items-center gap-2 transition-transform active:scale-95"
        >
          <MessageCircle className="w-4 h-4" />
          <span>Contact 24/7 WhatsApp Support</span>
        </button>
      </div>

      {/* Search Input */}
      <div className="relative max-w-xl">
        <input
          type="text"
          placeholder="Search articles, guides, topics..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          className="w-full bg-white border border-slate-300 rounded-2xl pl-11 pr-4 py-3 text-sm text-[#012169] focus:outline-none focus:border-[#009cde] shadow-xs font-medium"
        />
        <ScribbleSearch className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
      </div>

      {/* 3 Quick Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-2 hover:border-[#009cde] transition-colors cursor-pointer">
          <BookOpen className="w-6 h-6 text-[#003087]" />
          <h3 className="text-base font-extrabold text-[#012169]">Landlord Manual</h3>
          <p className="text-xs text-slate-500 leading-relaxed">Comprehensive guides on lease management, tenant onboarding, and tax compliance.</p>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-2 hover:border-[#009cde] transition-colors cursor-pointer">
          <ShieldCheck className="w-6 h-6 text-[#003087]" />
          <h3 className="text-base font-extrabold text-[#012169]">Data Security & Vault</h3>
          <p className="text-xs text-slate-500 leading-relaxed">Learn about 256-bit encryption for stored agreements and tenant KYC documents.</p>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-2 hover:border-[#009cde] transition-colors cursor-pointer">
          <ScribbleSync className="w-6 h-6 text-[#003087]" />
          <h3 className="text-base font-extrabold text-[#012169]">Offline Sync Engine</h3>
          <p className="text-xs text-slate-500 leading-relaxed">Troubleshoot local browser database syncing and offline transaction queues.</p>
        </div>
      </div>

      {/* FAQ Directory */}
      <div className="space-y-4">
        <h3 className="text-lg font-extrabold text-[#012169]">Frequently Asked Questions</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredFaqs.map((item, index) => (
            <div key={index} className="p-6 rounded-3xl bg-[#f8fafc] border border-slate-200 shadow-sm space-y-2">
              <span className="px-2.5 py-0.5 rounded-md text-[10px] font-extrabold bg-[#f0f7ff] text-[#003087] border border-[#009cde]/30">
                {item.cat}
              </span>
              <h4 className="text-base font-extrabold text-[#012169] mt-2">{item.q}</h4>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{item.a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
