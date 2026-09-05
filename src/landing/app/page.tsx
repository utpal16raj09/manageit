import React from 'react';
import { Nav } from '../components/layout/Nav';
import { Hero } from '../components/sections/Hero';
import { ValueStrip } from '../components/sections/ValueStrip';
import { HowItWorks } from '../components/sections/HowItWorks';
import { FeaturesGrid } from '../components/sections/FeaturesGrid';
import { Testimonials } from '../components/sections/Testimonials';
import { FAQ } from '../components/sections/FAQ';
import { LandlordCTA } from '../components/sections/LandlordCTA';
import { Footer } from '../components/sections/Footer';

export const LandingPage: React.FC = () => {
  return (
    <div className="relative min-h-screen bg-[#FBFBFA] text-[#012169] font-sans selection:bg-[#003087] selection:text-white">
      <Nav />
      <main>
        <Hero />
        <ValueStrip />
        <HowItWorks />
        <FeaturesGrid />
        <Testimonials />
        <FAQ />
        <LandlordCTA />
      </main>
      <Footer />
    </div>
  );
};
