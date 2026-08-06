import React from 'react';
import { Nav } from '../components/layout/Nav';
import { Hero } from '../components/sections/Hero';
import { ProofStrip } from '../components/sections/ProofStrip';
import { FeaturesList } from '../components/sections/FeaturesList';
import { StatsSection } from '../components/sections/StatsSection';
import { HowItWorks } from '../components/sections/HowItWorks';
import { Testimonial } from '../components/sections/Testimonial';
import { FinalCTA } from '../components/sections/FinalCTA';
import { FAQ } from '../components/sections/FAQ';
import { Footer } from '../components/sections/Footer';

export const LandingPage: React.FC = () => {
  return (
    <div className="relative min-h-screen bg-[#FAFAF8] text-[#14151A] font-sans selection:bg-[#2454FF] selection:text-white">
      <Nav />
      <main>
        <Hero />
        <ProofStrip />
        <FeaturesList />
        <StatsSection />
        <HowItWorks />
        <Testimonial />
        <FinalCTA />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
};
