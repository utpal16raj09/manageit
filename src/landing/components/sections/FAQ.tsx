import React, { useState } from 'react';
import { ScribbleChevron, ScribbleMessage } from '../../../components/ScribbleIcons';

export const FAQ: React.FC = () => {
  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  const faqs = [
    {
      q: "How does PropPulse track rent collections across multiple properties?",
      a: "PropPulse aggregates all your residential apartments, suites, villas, and commercial spaces in one real-time dashboard. You get individual property drill-downs as well as consolidated portfolio collection status and ledger reports."
    },
    {
      q: "Can tenants pay directly via digital UPI passes?",
      a: "Yes. Every tenant receives a dedicated digital payment pass with their exact dues. Upon payment, the system automatically reconciles the transaction and generates a digital receipt."
    },
    {
      q: "How does the dues aging radar work?",
      a: "The aging radar categorizes all rent statuses chronologically into clear brackets. It highlights pending follow-ups and allows 1-click reminders before dues accumulate."
    },
    {
      q: "Can property managers and tenants use PropPulse too?",
      a: "Yes. PropPulse provides role-based access for Landlords, Property Managers, and Tenants. Tenants can log maintenance requests with photos, while managers handle daily dispatches with controlled permissions."
    },
    {
      q: "Is property and tenant data secure?",
      a: "PropPulse employs bank-grade 256-bit encryption for all records, receipts, and tenant identity documents with continuous automatic backups."
    }
  ];

  return (
    <section id="faq" className="py-20 sm:py-24 bg-[#FBFBFA] font-sans">
      <div className="max-w-4xl mx-auto px-6 sm:px-12">
        
        {/* Section Header */}
        <div className="text-center space-y-3 mb-16">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#f0f7ff] border border-[#009cde]/30 text-[#003087] text-xs font-extrabold tracking-tight">
            <ScribbleMessage className="w-4 h-4 text-[#009cde]" />
            <span>COMMON QUESTIONS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-normal text-[#012169] tracking-tight">
            Frequently asked questions.
          </h2>
          <p className="text-slate-500 text-sm sm:text-base font-medium max-w-lg mx-auto">
            Everything you need to know about setting up and operating your properties on PropPulse.
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-4 text-left">
          {faqs.map((faq, idx) => {
            const isOpen = activeFaq === idx;
            return (
              <div 
                key={idx} 
                className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                  isOpen 
                    ? 'bg-white border-[#003087]/30 shadow-md ring-1 ring-[#003087]/15' 
                    : 'bg-white border-slate-200/90 shadow-2xs hover:border-slate-300'
                }`}
              >
                <button
                  onClick={() => setActiveFaq(isOpen ? null : idx)}
                  className="w-full px-6 py-5 text-left flex items-center justify-between font-bold text-base sm:text-lg text-[#012169] hover:text-[#003087] transition-colors cursor-pointer"
                >
                  <span className="pr-4">{faq.q}</span>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-all ${
                    isOpen ? 'bg-[#003087] text-white rotate-90' : 'bg-slate-100 text-slate-500'
                  }`}>
                    <ScribbleChevron className="w-4 h-4 stroke-[2.5]" />
                  </div>
                </button>
                
                {isOpen && (
                  <div className="px-6 pb-6 text-sm sm:text-base text-slate-600 font-medium leading-relaxed border-t border-slate-100 pt-4">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
