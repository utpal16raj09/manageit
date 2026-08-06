import React from 'react';
import { LaunchButton } from '../ui/LaunchButton';
import { Container } from '../ui/Container';

export const FinalCTA: React.FC = () => {
  return (
    <section className="py-20 sm:py-28 bg-[#14151A] text-white text-center">
      <Container className="space-y-8">
        <div className="max-w-2xl mx-auto space-y-6">
          <h2 className="font-display text-3xl sm:text-5xl tracking-tight leading-tight">
            Ready to stop chasing rent?
          </h2>
          <p className="text-sm sm:text-base text-slate-300 font-normal">
            Take full operational control of your rental portfolio in minutes.
          </p>

          <LaunchButton />
        </div>
      </Container>
    </section>
  );
};
