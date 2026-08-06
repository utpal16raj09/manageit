import React from 'react';
import { FeatureRow } from './FeatureRow';
import { Container } from '../ui/Container';

export const FeaturesList: React.FC = () => {
  const featureRows = [
    {
      num: "01",
      title: "Never chase rent again",
      subtitle: "Dues Radar & 30-60-90 Aging",
      desc: "Instant tracking of monthly rental collections, overdue balances, and categorized aging metrics across all holdings.",
      stat: "98.8% Collection Efficiency"
    },
    {
      num: "02",
      title: "Instant QR tenant payments",
      subtitle: "Digital Onboarding & Receipts",
      desc: "Dynamic payment QR code generation for instant UPI settlements with automated receipt issuance sent directly to tenants.",
      stat: "Instant Receipt Generation"
    },
    {
      num: "03",
      title: "Direct maintenance ticketing",
      subtitle: "Complaints & Dispatch Hub",
      desc: "Direct tenant maintenance ticket logging with real-time status updates, priority tags, and resolution timeline tracking.",
      stat: "< 2.5 Hr Response Time"
    },
    {
      num: "04",
      title: "Portfolio P&L analytics",
      subtitle: "Financials & Bulk Expense Split",
      desc: "Comprehensive profit & loss summaries, bulk expense splitting across multiple properties, and occupancy efficiency metrics.",
      stat: "Full Unit Isolation"
    }
  ];

  return (
    <section id="features" className="py-16 sm:py-24 border-b border-[#E4E3DE]">
      <Container className="space-y-24">
        {featureRows.map((feat, idx) => (
          <FeatureRow
            key={feat.num}
            num={feat.num}
            subtitle={feat.subtitle}
            title={feat.title}
            desc={feat.desc}
            stat={feat.stat}
            index={idx}
          />
        ))}
      </Container>
    </section>
  );
};
