import React from 'react';
import { useProperty } from '../../../context/PropertyContext';
import { ScribbleChevron } from '../../../components/ScribbleIcons';
import { InquiryModal } from '../../../components/InquiryModal';

export const LandlordCTA: React.FC = () => {
  const { setIsInquiryModalOpen } = useProperty();

  return (
    <>
      <section id="about" className="py-12 sm:py-16 lg:py-20 bg-[#FBFBFA] font-sans">
        <div className="max-w-5xl mx-auto px-4 sm:px-8">
          
          {/* Ultra-Minimal Dark Slate Container */}
          <div className="relative rounded-3xl sm:rounded-[36px] bg-[#060B18] text-white overflow-hidden shadow-2xl p-8 sm:p-12 lg:p-16 border border-white/[0.08] text-center flex flex-col items-center justify-center">
            
            {/* Subtle Deep Ambient Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#003087]/25 rounded-full blur-[120px] pointer-events-none" />

            {/* Creative Bespoke Scribbly Architectural Art */}
            <div className="relative z-10 w-full max-w-md mx-auto mb-6 sm:mb-8 text-[#009cde]">
              <svg 
                viewBox="0 0 420 120" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-auto overflow-visible drop-shadow-[0_4px_16px_rgba(0,156,222,0.25)]"
              >
                {/* Ground horizon base scribble */}
                <path 
                  d="M 10 105 Q 80 107, 150 104 T 290 106 T 410 104" 
                  stroke="#1E293B" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                />

                {/* Single Continuous Hand-drawn Architectural Horizon */}
                {/* Left Small Villa */}
                <path 
                  d="M 30 104 L 30 72 L 54 50 L 78 72 L 78 104" 
                  stroke="#38BDF8" 
                  strokeWidth="2.2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                />
                {/* Villa Roof Overhang & Chimney Scribble */}
                <path d="M 24 74 L 54 46 L 84 74" stroke="#7DD3FC" strokeWidth="2.4" strokeLinecap="round" />
                <path d="M 68 56 L 68 42 L 74 42 L 74 61" stroke="#38BDF8" strokeWidth="2" strokeLinecap="round" />
                <rect x="46" y="78" width="14" height="26" rx="2" stroke="#0284C7" strokeWidth="1.8" />
                <circle cx="56" cy="91" r="1" fill="#7DD3FC" />

                {/* Middle Tower (Modern Skyscraper / Apartment block) */}
                <path 
                  d="M 94 104 L 94 30 L 170 30 L 170 104" 
                  stroke="#60A5FA" 
                  strokeWidth="2.4" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                />
                {/* Tower Crown Spire */}
                <path d="M 132 30 L 132 14 M 126 14 L 138 14" stroke="#93C5FD" strokeWidth="2" strokeLinecap="round" />
                {/* Architectural Grid Windows */}
                <path d="M 108 42 H 122 M 142 42 H 156" stroke="#38BDF8" strokeWidth="2" strokeLinecap="round" />
                <path d="M 108 58 H 122 M 142 58 H 156" stroke="#38BDF8" strokeWidth="2" strokeLinecap="round" />
                <path d="M 108 74 H 122 M 142 74 H 156" stroke="#38BDF8" strokeWidth="2" strokeLinecap="round" />
                <path d="M 108 90 H 122 M 142 90 H 156" stroke="#38BDF8" strokeWidth="2" strokeLinecap="round" />

                {/* Contemporary Stepped Residence */}
                <path 
                  d="M 186 104 L 186 48 L 246 48 L 246 104" 
                  stroke="#38BDF8" 
                  strokeWidth="2.2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                />
                {/* Terrace & Planter Pergola */}
                <path d="M 180 48 H 252" stroke="#7DD3FC" strokeWidth="2.4" strokeLinecap="round" />
                <path d="M 200 48 L 200 36 M 216 48 L 216 36 M 232 48 L 232 36 M 196 36 H 236" stroke="#60A5FA" strokeWidth="1.8" strokeLinecap="round" />
                <circle cx="216" cy="74" r="12" stroke="#0284C7" strokeWidth="1.8" strokeDasharray="3 3" />

                {/* Right Urban Townhouse */}
                <path 
                  d="M 262 104 L 262 62 L 296 38 L 330 62 L 330 104" 
                  stroke="#60A5FA" 
                  strokeWidth="2.2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                />
                <path d="M 256 64 L 296 34 L 336 64" stroke="#93C5FD" strokeWidth="2.4" strokeLinecap="round" />
                <rect x="282" y="70" width="28" height="34" rx="2" stroke="#38BDF8" strokeWidth="1.8" />
                <path d="M 296 70 V 104" stroke="#38BDF8" strokeWidth="1.5" strokeLinecap="round" />

                {/* Far Right Minimalist Studio */}
                <path 
                  d="M 346 104 L 346 76 L 390 76 L 390 104" 
                  stroke="#38BDF8" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                />
                <path d="M 358 88 H 378" stroke="#7DD3FC" strokeWidth="2" strokeLinecap="round" />

                {/* Scribbly Pulse Wave Connecting Everything */}
                <path 
                  d="M 16 104 Q 70 96, 120 102 T 220 98 T 320 102 T 404 100" 
                  stroke="#009cde" 
                  strokeWidth="2.5" 
                  strokeLinecap="round" 
                />
              </svg>
            </div>

            {/* Minimal Editorial Tagline */}
            <div className="relative z-10 space-y-3 max-w-xl mx-auto">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-medium text-white tracking-tight leading-tight">
                Better spaces. <span className="italic font-serif text-[#7dd3fc]">Effortless living.</span>
              </h2>
              <p className="text-slate-400 text-xs sm:text-sm font-normal max-w-md mx-auto leading-relaxed">
                Connect with curated residences or streamline your portfolio with intelligent property operations.
              </p>
            </div>

            {/* Minimal Inquire Button */}
            <div className="relative z-10 pt-6 sm:pt-8 flex justify-center items-center">
              <button
                onClick={() => setIsInquiryModalOpen(true)}
                className="group inline-flex items-center space-x-2.5 px-7 py-3 rounded-full bg-white hover:bg-slate-100 text-[#060B18] text-xs sm:text-sm font-bold shadow-lg hover:shadow-xl hover:scale-102 transition-all cursor-pointer active:scale-95"
              >
                <span>Inquire Now</span>
                <ScribbleChevron className="w-3.5 h-3.5 text-[#003087] group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>

          </div>

        </div>
      </section>

      {/* Inquiry Modal */}
      <InquiryModal />
    </>
  );
};



