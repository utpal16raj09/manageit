import React, { useState } from 'react';
import { ScribbleChevron } from '../../../components/ScribbleIcons';
import { AuthModal } from '../../../components/AuthModal';

// Hand-drawn Architectural Floorplan / Setup Art
const HandDrawnSetupArt: React.FC = () => (
  <svg viewBox="0 0 280 130" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-28 overflow-visible">
    {/* Hand-sketched Architectural Blueprint Floorplan */}
    <g transform="translate(30, 15)">
      {/* Outer Walls */}
      <rect x="0" y="0" width="130" height="95" rx="3" fill="#ffffff" stroke="#003087" strokeWidth="2.4" />
      
      {/* Internal Partition Walls */}
      <path d="M0 50H75V95" stroke="#003087" strokeWidth="2" />
      <path d="M75 50H130" stroke="#003087" strokeWidth="2" />
      
      {/* Doorway Arcs */}
      <path d="M45 50 A 18 18 0 0 1 63 32" stroke="#009cde" strokeWidth="1.4" strokeDasharray="2 2" />
      <line x1="45" y1="50" x2="63" y2="50" stroke="#003087" strokeWidth="1.6" />
      
      {/* Balcony / Window Mark */}
      <line x1="10" y1="0" x2="40" y2="0" stroke="#009cde" strokeWidth="3" strokeLinecap="round" />
      <line x1="85" y1="0" x2="120" y2="0" stroke="#009cde" strokeWidth="3" strokeLinecap="round" />
      
      {/* Drafting Dimension Arrows */}
      <line x1="-12" y1="4" x2="-12" y2="91" stroke="#009cde" strokeWidth="1.2" />
      <path d="M-15 10L-12 4L-9 10" stroke="#009cde" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M-15 85L-12 91L-9 85" stroke="#009cde" strokeWidth="1.2" strokeLinecap="round" />
    </g>

    {/* Hand-drawn Brass Key & Identity Tag */}
    <g transform="translate(180, 22) rotate(-8)">
      {/* ID Badge Card */}
      <rect x="0" y="0" width="65" height="85" rx="5" fill="#f0f7ff" stroke="#003087" strokeWidth="1.8" />
      <rect x="22" y="-4" width="20" height="8" rx="2" fill="#ffffff" stroke="#003087" strokeWidth="1.4" />
      
      {/* Tenant Avatar Sketch */}
      <circle cx="32" cy="28" r="12" fill="#ffffff" stroke="#003087" strokeWidth="1.6" />
      <path d="M20 54C20 44 26 42 32 42C38 42 44 44 44 54" stroke="#003087" strokeWidth="1.6" strokeLinecap="round" />
      
      {/* Status Checked Line */}
      <line x1="12" y1="64" x2="52" y2="64" stroke="#009cde" strokeWidth="1.8" strokeDasharray="3 2" />
      <line x1="12" y1="72" x2="38" y2="72" stroke="#009cde" strokeWidth="1.8" strokeDasharray="3 2" />
    </g>
  </svg>
);

// Hand-drawn Dynamic QR Pass / Collect Art
const HandDrawnPassArt: React.FC = () => (
  <svg viewBox="0 0 280 130" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-28 overflow-visible">
    {/* Sketched Handheld Phone with QR Pass */}
    <g transform="translate(100, 10)">
      {/* Phone Shell */}
      <rect x="0" y="0" width="80" height="110" rx="14" fill="#ffffff" stroke="#003087" strokeWidth="2.2" />
      {/* Top Speaker Pill */}
      <line x1="30" y1="8" x2="50" y2="8" stroke="#003087" strokeWidth="2" strokeLinecap="round" />
      
      {/* QR Code Canvas */}
      <g transform="translate(14, 18)">
        <rect x="0" y="0" width="52" height="52" rx="4" fill="#f0f7ff" stroke="#009cde" strokeWidth="1.4" />
        
        {/* QR Corner Markers */}
        <rect x="5" y="5" width="12" height="12" rx="2" stroke="#003087" strokeWidth="1.8" />
        <rect x="8" y="8" width="6" height="6" fill="#003087" />
        
        <rect x="35" y="5" width="12" height="12" rx="2" stroke="#003087" strokeWidth="1.8" />
        <rect x="38" y="8" width="6" height="6" fill="#003087" />
        
        <rect x="5" y="35" width="12" height="12" rx="2" stroke="#003087" strokeWidth="1.8" />
        <rect x="8" y="38" width="6" height="6" fill="#003087" />
        
        {/* QR Pixel matrix dots */}
        <rect x="23" y="10" width="4" height="4" fill="#009cde" />
        <rect x="23" y="24" width="6" height="6" fill="#003087" />
        <rect x="36" y="24" width="4" height="4" fill="#009cde" />
        <rect x="23" y="38" width="5" height="5" fill="#009cde" />
        <rect x="36" y="36" width="6" height="6" fill="#003087" />
      </g>

      {/* Verified Status Bar */}
      <g transform="translate(14, 78)">
        <rect x="0" y="0" width="52" height="20" rx="6" fill="#f0fdf4" stroke="#86efac" strokeWidth="1.2" />
        <circle cx="10" cy="10" r="5" fill="#22c55e" />
        <path d="M8 10L9.5 11.5L12 8.5" stroke="#ffffff" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
        <line x1="20" y1="10" x2="44" y2="10" stroke="#15803d" strokeWidth="1.6" strokeLinecap="round" />
      </g>
    </g>

    {/* Radiating Signal Waves */}
    <path d="M60 45Q75 60 60 75" stroke="#009cde" strokeWidth="2" strokeLinecap="round" />
    <path d="M45 35Q70 60 45 85" stroke="#003087" strokeWidth="2" strokeLinecap="round" strokeDasharray="3 3" />
    
    <path d="M220 45Q205 60 220 75" stroke="#009cde" strokeWidth="2" strokeLinecap="round" />
    <path d="M235 35Q210 60 235 85" stroke="#003087" strokeWidth="2" strokeLinecap="round" strokeDasharray="3 3" />
  </svg>
);

// Hand-drawn Command Hub / Oversee Art
const HandDrawnOverseeArt: React.FC = () => (
  <svg viewBox="0 0 280 130" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-28 overflow-visible">
    {/* Sketched Command Board & Checklist */}
    <g transform="translate(35, 20)">
      <rect x="0" y="0" width="105" height="90" rx="6" fill="#ffffff" stroke="#003087" strokeWidth="2.2" />
      <rect x="35" y="-5" width="35" height="10" rx="3" fill="#f0f7ff" stroke="#003087" strokeWidth="1.6" />
      
      {/* Checklist items with hand-drawn checkmarks */}
      <circle cx="16" cy="24" r="6" fill="#f0f7ff" stroke="#009cde" strokeWidth="1.4" />
      <path d="M13 24L15 26L19 22" stroke="#003087" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="28" y1="24" x2="88" y2="24" stroke="#003087" strokeWidth="2" strokeLinecap="round" />
      
      <circle cx="16" cy="46" r="6" fill="#f0f7ff" stroke="#009cde" strokeWidth="1.4" />
      <path d="M13 46L15 48L19 44" stroke="#003087" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="28" y1="46" x2="75" y2="46" stroke="#003087" strokeWidth="2" strokeLinecap="round" />
      
      <circle cx="16" cy="68" r="6" fill="#f0f7ff" stroke="#009cde" strokeWidth="1.4" />
      <path d="M13 68L15 70L19 66" stroke="#003087" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="28" y1="68" x2="82" y2="68" stroke="#003087" strokeWidth="2" strokeLinecap="round" />
    </g>

    {/* Sketched Maintenance & Repair Cross-Tools */}
    <g transform="translate(170, 27)">
      {/* Circular Tool Badge */}
      <circle cx="45" cy="45" r="38" fill="#f0f7ff" stroke="#003087" strokeWidth="2" />
      <circle cx="45" cy="45" r="32" stroke="#009cde" strokeWidth="1" strokeDasharray="3 3" />
      
      {/* Hand-drawn Wrench */}
      <path 
        d="M32 30L55 53M30 26C27 28 27 33 30 36L34 40L40 34L36 30C33 27 28 27 26 30L30 34" 
        stroke="#003087" 
        strokeWidth="2.2" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      {/* Hand-drawn Ruler / Screwdriver */}
      <path 
        d="M58 28L32 58M58 28L63 33M32 58L28 62" 
        stroke="#009cde" 
        strokeWidth="2.2" 
        strokeLinecap="round" 
      />
    </g>
  </svg>
);

export const HowItWorks: React.FC = () => {
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  return (
    <>
      <section id="how-it-works" className="py-20 sm:py-28 bg-white border-t border-b border-slate-200/80 font-sans">
        <div className="max-w-7xl mx-auto px-6 sm:px-12">
          
          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-16 sm:mb-20">
            <span className="text-xs font-mono font-bold tracking-[0.24em] text-[#003087] uppercase block">
              OPERATING WORKFLOW
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-normal text-[#012169] tracking-tight">
              A clean workflow for total clarity.
            </h2>
            <p className="text-slate-500 text-sm sm:text-base font-medium">
              Designed specifically for property owners and managers who value calm, organized operations.
            </p>
          </div>

          {/* 3 Process Steps with Diverse Dynamic Arrangements */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 sm:gap-14 text-left items-start">
            
            {/* PHASE 01: Art on TOP, Phase Tag & Text BELOW */}
            <div className="flex flex-col space-y-5 group">
              <div className="pb-2 flex items-center justify-start">
                <HandDrawnSetupArt />
              </div>

              <div className="space-y-2.5">
                <span className="text-[11px] font-mono font-bold tracking-[0.2em] text-[#003087] uppercase block">
                  PHASE 01
                </span>

                <h3 className="text-xl sm:text-2xl font-display font-bold text-[#012169] tracking-tight">
                  Add Units &amp; Tenants
                </h3>

                <p className="text-xs sm:text-sm text-slate-500 font-medium leading-relaxed">
                  Organize your buildings, apartments, and private suites with customized lease terms and verified tenant records.
                </p>
              </div>

              <div 
                onClick={() => setIsAuthOpen(true)}
                className="pt-2 flex items-center space-x-1.5 text-xs font-bold text-[#003087] cursor-pointer hover:text-[#009cde] transition-colors"
              >
                <span>Explore unit setup</span>
                <ScribbleChevron className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* PHASE 02: Phase & Title on TOP, Phone Pass in MIDDLE, Description & Link BELOW */}
            <div className="flex flex-col space-y-5 group">
              <div className="space-y-2">
                <span className="text-[11px] font-mono font-bold tracking-[0.2em] text-[#003087] uppercase block">
                  PHASE 02
                </span>

                <h3 className="text-xl sm:text-2xl font-display font-bold text-[#012169] tracking-tight">
                  Automate Rent Passes
                </h3>
              </div>

              <div className="py-1 flex items-center justify-start">
                <HandDrawnPassArt />
              </div>

              <div className="space-y-3">
                <p className="text-xs sm:text-sm text-slate-500 font-medium leading-relaxed">
                  Tenants receive clear digital payment passes. Every incoming payment is automatically reconciled.
                </p>

                <div 
                  onClick={() => setIsAuthOpen(true)}
                  className="flex items-center space-x-1.5 text-xs font-bold text-[#003087] cursor-pointer hover:text-[#009cde] transition-colors"
                >
                  <span>Explore digital passes</span>
                  <ScribbleChevron className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>

            {/* PHASE 03: Header & Description on TOP, Toolmark Art on BOTTOM */}
            <div className="flex flex-col justify-between space-y-6 group">
              <div className="space-y-2.5">
                <span className="text-[11px] font-mono font-bold tracking-[0.2em] text-[#003087] uppercase block">
                  PHASE 03
                </span>

                <h3 className="text-xl sm:text-2xl font-display font-bold text-[#012169] tracking-tight">
                  Track &amp; Maintain
                </h3>

                <p className="text-xs sm:text-sm text-slate-500 font-medium leading-relaxed">
                  Monitor dues across all properties, manage maintenance dispatches, and oversee overall operations.
                </p>
              </div>

              <div className="pt-2 flex items-center justify-start">
                <HandDrawnOverseeArt />
              </div>

              <div 
                onClick={() => setIsAuthOpen(true)}
                className="pt-1 flex items-center space-x-1.5 text-xs font-bold text-[#003087] cursor-pointer hover:text-[#009cde] transition-colors"
              >
                <span>Explore dispatch hub</span>
                <ScribbleChevron className="w-3.5 h-3.5" />
              </div>
            </div>

          </div>

        </div>
      </section>

      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
    </>
  );
};


