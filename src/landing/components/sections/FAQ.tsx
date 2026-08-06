import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { Container } from '../ui/Container';

export const FAQ: React.FC = () => {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const faqs = [
    {
      q: "How does PropPulse aggregate data across multiple properties?",
      a: "PropPulse unifies all your buildings, apartments, and PG accommodations into a single clean dashboard with individual property isolation and aggregate portfolio metrics."
    },
    {
      q: "Can tenants pay rent directly via UPI QR codes?",
      a: "Yes! PropPulse generates individual tenant QR codes for GPay, PhonePe, or PayTM, automatically logging payments and generating digital receipts."
    },
    {
      q: "Is there offline support for logging payments?",
      a: "Yes, PropPulse includes an offline simulator mode allowing landlords to record payments and updates without active internet access."
    }
  ];

  return (
    <section id="faq" className="py-20 border-b border-[#E4E3DE] bg-[#FAFAF8]">
      <Container className="max-w-3xl">
        <div className="text-center space-y-2 mb-10">
          <span className="text-xs font-mono text-[#2454FF] tracking-widest uppercase block">QUESTIONS</span>
          <h2 className="font-display text-3xl sm:text-4xl text-[#14151A]">Frequently Asked</h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div key={idx} className="card-clean rounded-2xl overflow-hidden bg-white border border-[#E4E3DE]">
              <button
                onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                className="w-full px-6 py-5 text-left flex items-center justify-between font-display text-base text-[#14151A] hover:text-[#2454FF] transition-colors cursor-pointer"
              >
                <span>{faq.q}</span>
                <ChevronDown className={`w-4 h-4 text-[#6B6D76] transition-transform duration-200 ${activeFaq === idx ? 'rotate-180 text-[#2454FF]' : ''}`} />
              </button>
              {activeFaq === idx && (
                <div className="px-6 pb-6 text-sm text-[#6B6D76] leading-relaxed border-t border-[#E4E3DE] pt-4">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};
