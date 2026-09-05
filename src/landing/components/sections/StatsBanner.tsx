import React from 'react';

export const StatsBanner: React.FC = () => {
  const stats = [
    { value: "₹18.5 Cr+", label: "Monthly Rent Processed", sub: "Across 14 Cities" },
    { value: "12,400+", label: "Active Rental Units", sub: "PGs, Flats & Villas" },
    { value: "99.4%", label: "On-Time Collection Rate", sub: "With Smart WhatsApp Passes" },
    { value: "< 2.5 Hrs", label: "Avg Ticket Resolution", sub: "Rapid Maintenance Hub" }
  ];

  return (
    <section className="bg-[#012169] text-white py-16 sm:py-20 font-sans relative overflow-hidden">
      {/* Background Accent Gradient */}
      <div className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-[#009cde]/15 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-[#003087]/50 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-12 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12 divide-y-0 text-left">
          {stats.map((s, idx) => (
            <div key={idx} className="space-y-2">
              <div className="text-3xl sm:text-4xl lg:text-5xl font-black font-mono-amount tracking-tight text-white">
                {s.value}
              </div>
              <div className="text-sm font-extrabold text-[#a5d8ff]">
                {s.label}
              </div>
              <div className="text-xs text-slate-300 font-medium">
                {s.sub}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
