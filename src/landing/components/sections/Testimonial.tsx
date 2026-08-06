import React from 'react';
import { Container } from '../ui/Container';

export const Testimonial: React.FC = () => {
  return (
    <section className="py-20 border-b border-[#E4E3DE] bg-white text-center">
      <Container>
        <div className="max-w-2xl mx-auto space-y-6">
          <p className="font-display text-xl sm:text-3xl text-[#14151A] leading-snug">
            "PropPulse eliminated our manual rent chasing completely. The aging dues radar gives us immediate clarity every morning."
          </p>
          <div className="text-xs font-mono text-[#6B6D76]">
            UTPAL ROY &nbsp;·&nbsp; OWNER, 14 PORTFOLIO UNITS
          </div>
        </div>
      </Container>
    </section>
  );
};
