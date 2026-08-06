import React, { useState } from 'react';
import { useProperty } from '../../../context/PropertyContext';
import { LaunchButton } from '../ui/LaunchButton';
import { Container } from '../ui/Container';
import { AuthModal } from '../../../components/AuthModal';
import { 
  Play, 
  ArrowRight,
  Home,
  Building,
  Building2
} from 'lucide-react';

export const Hero: React.FC = () => {
  const { setActiveTab } = useProperty();
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  return (
    <>
      <section id="overview" className="relative flex flex-col justify-between pt-16 sm:pt-28 pb-12 sm:pb-16 bg-[#FAFAFA] overflow-hidden">
        
        {/* Soft Blue Diffuse Radial Glow */}
        <div className="absolute top-1/4 -right-20 w-[350px] sm:w-[700px] h-[350px] sm:h-[700px] bg-[#003087]/10 rounded-full blur-[100px] sm:blur-[140px] pointer-events-none" />

        <Container className="relative z-10 my-auto w-full max-w-[1550px] px-4 sm:px-6">
          
          {/* Main Hero Layout Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center pt-6 sm:pt-14">
            
            {/* LEFT COLUMN — Editorial Content */}
            <div className="lg:col-span-5 space-y-5 sm:space-y-6 text-center sm:text-left flex flex-col items-center sm:items-start">
              
              {/* Display Headline */}
              <h1 className="font-display font-normal text-slate-900 text-4xl sm:text-6xl lg:text-[72px] leading-[1.02] sm:leading-[0.98] tracking-tight">
                Rent collection<br className="hidden sm:inline" />
                {' '}that <span className="italic font-serif text-[#003087]">runs</span> itself.
              </h1>

              {/* Subhead Paragraph */}
              <p className="text-slate-500 text-sm sm:text-lg leading-relaxed font-normal max-w-md mx-auto sm:mx-0">
                Real-time rent roll tracking, automated dues radar, dynamic QR onboarding, and instant P&amp;L — built for landlords managing more than one roof.
              </p>

              {/* MOBILE ONLY: PROPORTIONATELY COMPACT DUAL MOCKUPS */}
              <div className="block lg:hidden w-full my-3">
                <div className="relative w-full max-w-[290px] sm:max-w-[420px] mx-auto py-1">
                  <div className="absolute inset-0 bg-[#003087]/10 rounded-full blur-lg pointer-events-none" />
                  
                  {/* Laptop Mockup */}
                  <div className="relative ml-auto w-[85%] z-10">
                    <img
                      src="/assets/imhlap-clean.png"
                      alt="PropPulse Laptop Dashboard"
                      className="w-full h-auto block select-none drop-shadow-[0_8px_20px_rgba(0,48,135,0.14)]"
                      draggable={false}
                    />
                  </div>

                  {/* Phone Mockup */}
                  <div className="absolute left-0 bottom-[-4px] w-[34%] z-30">
                    <img
                      src="/assets/photoroom-phone-clean.png"
                      alt="PropPulse Mobile Phone App"
                      className="w-full h-auto block select-none drop-shadow-[0_10px_22px_rgba(0,48,135,0.22)]"
                      draggable={false}
                    />
                  </div>
                </div>
              </div>

              {/* Action Buttons — SIDE BY SIDE */}
              <div className="flex flex-row items-center justify-center sm:justify-start gap-2.5 sm:gap-4 w-full sm:w-auto pt-1">
                <button
                  onClick={() => setIsAuthOpen(true)}
                  className="flex-1 sm:flex-none bg-[#003087] hover:bg-[#012169] text-white px-5 sm:px-7 py-3.5 sm:py-4 rounded-full font-bold text-xs sm:text-sm transition-all duration-200 shadow-md flex items-center justify-center space-x-1.5 sm:space-x-2 cursor-pointer active:scale-95 whitespace-nowrap"
                >
                  <span>Join the Waitlist</span>
                  <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </button>
                
                <a
                  href="#how-it-works"
                  className="flex-1 sm:flex-none px-4 sm:px-6 py-3.5 sm:py-4 rounded-full border border-slate-200 bg-white text-[#012169] font-bold text-xs sm:text-sm flex items-center justify-center space-x-1.5 sm:space-x-2.5 hover:border-[#003087] transition-all shadow-2xs whitespace-nowrap"
                >
                  <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#009cde]/10 flex items-center justify-center text-[#003087] shrink-0">
                    <Play className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-current ml-0.5" />
                  </div>
                  <span>See how it works</span>
                </a>
              </div>

              {/* Text Below Buttons */}
              <p className="text-xs sm:text-sm font-mono text-slate-400 font-medium">
                Launching soon · Be first to know when we launch — no spam, just a heads-up.
              </p>

            </div>

            {/* DESKTOP ONLY: DUAL MOCKUPS IN RIGHT COLUMN */}
            <div className="hidden lg:flex lg:col-span-7 justify-end">
              <div className="relative w-full max-w-[660px] py-4">
                
                {/* Soft Backdrop Diffuse Glow */}
                <div className="absolute inset-0 bg-[#003087]/12 rounded-full blur-3xl pointer-events-none" />

                {/* 1. LAPTOP MOCKUP (IMHLAP.png) */}
                <div className="relative ml-auto w-[88%] z-10">
                  <img
                    src="/assets/imhlap-clean.png"
                    alt="PropPulse Laptop Executive Dashboard"
                    className="w-full h-auto block select-none drop-shadow-[0_25px_50px_rgba(0,48,135,0.16)]"
                    draggable={false}
                  />
                </div>

                {/* 2. PHONE MOCKUP (image-Photoroom.png) */}
                <div className="absolute left-0 bottom-[-10px] w-[34%] z-30">
                  <img
                    src="/assets/photoroom-phone-clean.png"
                    alt="PropPulse Mobile Phone App"
                    className="w-full h-auto block select-none drop-shadow-[0_30px_60px_rgba(0,48,135,0.28)]"
                    draggable={false}
                  />
                </div>

              </div>
            </div>

          </div>

          {/* UNBOXED DESKTOP UNITS SECTION & MOBILE 'BUILT FOR LANDLORDS' STATEMENT */}
          <div className="mt-16 sm:mt-32 pt-4 sm:pt-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 sm:gap-8">
              
              {/* Main Statement */}
              <div className="text-center sm:text-left">
                <p className="text-lg sm:text-2xl font-display font-semibold text-slate-800 leading-snug">
                  Built for landlords managing <span className="font-bold text-[#003087]">2</span>, <span className="font-bold text-[#003087]">10</span>, or <span className="font-bold text-[#003087]">50+</span> properties.
                </p>
              </div>

              {/* Seamless Unboxed Tier Indicators — DESKTOP ONLY */}
              <div className="hidden sm:flex flex-row items-center justify-end gap-8 sm:gap-12">
                
                {/* 2-10 Units */}
                <div className="flex items-center space-x-3.5">
                  <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#009cde]/10 flex items-center justify-center text-[#003087] shrink-0">
                    <Home className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <div className="text-left">
                    <div className="text-sm sm:text-base font-extrabold text-[#012169]">2–10 Units</div>
                    <div className="text-[10px] sm:text-xs font-mono text-slate-400">Independent Landlords</div>
                  </div>
                </div>

                {/* 10-50 Units */}
                <div className="flex items-center space-x-3.5">
                  <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#003087]/10 flex items-center justify-center text-[#003087] shrink-0">
                    <Building className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <div className="text-left">
                    <div className="text-sm sm:text-base font-extrabold text-[#012169]">10–50 Units</div>
                    <div className="text-[10px] sm:text-xs font-mono text-slate-400">Multi-Roof Portfolios</div>
                  </div>
                </div>

                {/* 50+ Units */}
                <div className="flex items-center space-x-3.5">
                  <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-600 shrink-0">
                    <Building2 className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <div className="text-left">
                    <div className="text-sm sm:text-base font-extrabold text-[#012169]">50+ Units</div>
                    <div className="text-[10px] sm:text-xs font-mono text-slate-400">Commercial &amp; Residential</div>
                  </div>
                </div>

              </div>

            </div>
          </div>

        </Container>
      </section>

      {/* Login Authentication Modal */}
      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
    </>
  );
};
