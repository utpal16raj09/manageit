import React from 'react';
import { Container } from '../ui/Container';

export const HowItWorks: React.FC = () => {
  const steps = [
    { num: "01", title: "Add Your Properties", desc: "Import units, rooms, and tenant leases in under two minutes." },
    { num: "02", title: "Automate Dues & QR Passes", desc: "Tenants receive automatic payment links and dynamic QR receipts." },
    { num: "03", title: "Track Real-Time P&L", desc: "Monitor daily income, aging balances, and maintenance tickets." }
  ];

  return (
    <section id="how-it-works" className="py-20 sm:py-28 border-b border-[#E4E3DE]">
      <Container className="text-center space-y-16">
        <div className="space-y-3">
          <span className="text-xs font-mono text-[#2454FF] tracking-widest uppercase block">WORKFLOW</span>
          <h2 className="font-display text-[var(--text-h2)] text-[#14151A]">Three Steps To Total Control</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-left">
          {steps.map((st) => (
            <div key={st.num} className="card-clean rounded-3xl p-8 space-y-4 bg-white border border-[#E4E3DE]">
              <span className="text-xs font-mono text-[#2454FF] font-semibold">{st.num}</span>
              <h3 className="font-display text-xl text-[#14151A]">{st.title}</h3>
              <p className="text-sm text-[#6B6D76] leading-relaxed">{st.desc}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};
