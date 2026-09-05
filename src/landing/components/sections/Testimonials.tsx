import React from 'react';
import { ScribbleShield } from '../../../components/ScribbleIcons';

export const Testimonials: React.FC = () => {
  const reviews = [
    {
      name: "Siddharth Rao",
      role: "Residential & Commercial Portfolio Landlord",
      city: "Bengaluru",
      comment: "PropPulse eliminated manual rent follow-ups completely. The unified aging radar gives me instant morning clarity on exact dues without awkward phone calls."
    },
    {
      name: "Ananya Deshmukh",
      role: "Owner, Prime City Residences",
      city: "Mumbai",
      comment: "Tenants appreciate the direct digital passes and automatic receipts. On-time collections improved immediately after switching from messy spreadsheets."
    },
    {
      name: "Rajeev Singhania",
      role: "Apartment Community Operator",
      city: "Delhi NCR",
      comment: "The maintenance ticketing workflow alone saved our team immense time. Tenant requests are logged with clarity and dispatched seamlessly to vendors."
    }
  ];

  return (
    <section className="py-20 sm:py-24 bg-white border-t border-b border-slate-200/80 font-sans">
      <div className="max-w-7xl mx-auto px-6 sm:px-12">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
          <span className="text-xs font-mono font-bold tracking-[0.2em] text-[#003087] uppercase block">
            OWNER PERSPECTIVES
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-normal text-[#012169] tracking-tight">
            Trusted by landlords across India.
          </h2>
          <p className="text-slate-500 text-sm sm:text-base font-medium">
            Real feedback from property owners who rely on PropPulse for day-to-day operations.
          </p>
        </div>

        {/* 3 Review Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          {reviews.map((r, idx) => (
            <div
              key={idx}
              className="bg-[#FBFBFA] rounded-3xl p-8 border border-slate-200/90 shadow-2xs hover:shadow-lg hover:border-[#003087]/30 transition-all duration-300 flex flex-col justify-between space-y-6"
            >
              <div className="space-y-4">
                {/* Hand-drawn Quote Mark */}
                <div className="text-3xl font-serif text-[#003087]/30 font-bold select-none">
                  “
                </div>

                {/* Comment */}
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-medium">
                  {r.comment}
                </p>
              </div>

              {/* Author Meta */}
              <div className="pt-4 border-t border-slate-200/70 flex items-center justify-between">
                <div>
                  <div className="flex items-center space-x-1.5 font-bold text-sm text-[#012169]">
                    <span>{r.name}</span>
                    <ScribbleShield className="w-3.5 h-3.5 text-[#009cde]" />
                  </div>
                  <div className="text-xs text-slate-500 font-medium">{r.role}</div>
                  <div className="text-[11px] font-mono text-slate-400 font-semibold">{r.city}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
