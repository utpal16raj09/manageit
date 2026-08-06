import React from 'react';
import { motion } from 'framer-motion';
import { AnimatedNumber } from '../ui/AnimatedNumber';
import { Container } from '../ui/Container';

export const StatsSection: React.FC = () => {
  const stats = [
    { label: "Total Rent Collected", value: "₹12.4 Cr" },
    { label: "Active Properties Managed", value: "340+" },
    { label: "Collection Efficiency", value: "98.8%" }
  ];

  return (
    <section className="py-20 border-b border-[#E4E3DE] bg-white text-center">
      <Container>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10">
          {stats.map((s, idx) => (
            <AnimatedNumber key={idx} value={s.value} label={s.label} />
          ))}
        </div>
      </Container>
    </section>
  );
};
