import React, { useState } from 'react';
import { ScribbleChevron } from '../../../components/ScribbleIcons';
import { AuthModal } from '../../../components/AuthModal';

export const FeaturesGrid: React.FC = () => {
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  return (
    <>
      <section id="features" className="py-20 sm:py-28 bg-[#FBFBFA] font-sans">
        <div className="max-w-7xl mx-auto px-6 sm:px-12">
          
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 sm:mb-20 text-left">
            <div className="space-y-3 max-w-2xl">
              <span className="text-xs font-mono font-bold tracking-[0.24em] text-[#003087] uppercase block">
                COMPREHENSIVE SUITE
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-normal text-[#012169] tracking-tight">
                Engineered for serious property managers.
              </h2>
              <p className="text-sm sm:text-base text-slate-500 font-medium">
                Replace fragmented spreadsheets, chat groups, and physical registers with a unified high-speed operations platform.
              </p>
            </div>

            <button
              onClick={() => setIsAuthOpen(true)}
              className="inline-flex items-center space-x-2 px-6 py-3 rounded-full border border-slate-300 bg-white hover:border-[#003087] hover:text-[#003087] text-[#012169] text-xs sm:text-sm font-bold shadow-2xs hover:shadow-xs transition-all cursor-pointer self-start md:self-auto active:scale-95"
            >
              <span>Explore All Tools</span>
              <ScribbleChevron className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Open Scribbly Architectural Grid (No rigid card boxes) */}
          <div className="space-y-16 sm:space-y-20 text-left">
            
            {/* ROW 1: Features 1 & 2 */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
              
              {/* FEATURE 1: Dues Radar (7 Col) */}
              <div 
                onClick={() => setIsAuthOpen(true)}
                className="lg:col-span-7 space-y-4 cursor-pointer group"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                  <div className="space-y-3 max-w-md">
                    <div className="inline-flex items-center space-x-1.5 text-[#003087] text-[11px] font-mono font-bold tracking-widest uppercase">
                      <span>• DUES RADAR</span>
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-display font-bold text-[#012169] tracking-tight leading-tight">
                      Never Chase Rent Manually Again.
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-500 font-medium leading-relaxed">
                      Automated payment alerts, chronological aging breakdowns, and instant settlement tracking keep your cash flow predictable.
                    </p>

                    <div className="pt-2 flex items-center space-x-2 text-xs font-bold text-[#003087] group-hover:text-[#009cde] transition-colors">
                      <span>View Dues Radar</span>
                      <ScribbleChevron className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>

                  {/* Hand-Drawn Radar Visual */}
                  <div className="relative flex items-center justify-center flex-shrink-0">
                    <svg viewBox="0 0 160 160" fill="none" className="w-40 h-40 overflow-visible">
                      {/* Radar Circles */}
                      <circle cx="80" cy="80" r="70" stroke="#003087" strokeWidth="1.8" />
                      <circle cx="80" cy="80" r="50" stroke="#009cde" strokeWidth="1.2" strokeDasharray="3 3" />
                      <circle cx="80" cy="80" r="28" stroke="#003087" strokeWidth="1" strokeDasharray="2 2" opacity="0.6" />
                      
                      {/* Radar Crosshairs */}
                      <line x1="10" y1="80" x2="150" y2="80" stroke="#003087" strokeWidth="0.8" strokeDasharray="2 2" opacity="0.4" />
                      <line x1="80" y1="10" x2="80" y2="150" stroke="#003087" strokeWidth="0.8" strokeDasharray="2 2" opacity="0.4" />
                      
                      {/* Sweep Beam */}
                      <path d="M80 80L130 35" stroke="#009cde" strokeWidth="2.8" strokeLinecap="round" />
                      <circle cx="80" cy="80" r="4" fill="#003087" />

                      {/* Property Blips */}
                      <circle cx="115" cy="48" r="5" fill="#009cde" />
                      <circle cx="115" cy="48" r="10" stroke="#009cde" strokeWidth="1.2" strokeDasharray="2 2" />
                      <circle cx="48" cy="105" r="4" fill="#003087" />
                      <circle cx="108" cy="115" r="3.5" fill="#003087" />
                      <circle cx="42" cy="55" r="4" fill="#009cde" />

                      {/* Hand-drawn Annotation Arrow */}
                      <path d="M125 15Q145 10 135 30" stroke="#003087" strokeWidth="1.6" strokeLinecap="round" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* FEATURE 2: Dynamic UPI Passes (5 Col) */}
              <div 
                onClick={() => setIsAuthOpen(true)}
                className="lg:col-span-5 space-y-4 cursor-pointer group lg:border-l lg:border-slate-200/80 lg:pl-12"
              >
                <div className="space-y-3">
                  <div className="inline-flex items-center space-x-1.5 text-[#003087] text-[11px] font-mono font-bold tracking-widest uppercase">
                    <span>• INSTANT SETTLEMENT</span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-display font-bold text-[#012169] tracking-tight leading-tight">
                    Dynamic UPI Passes.
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-500 font-medium leading-relaxed">
                    Generate instant passes for direct digital transfers with automated receipts sent straight upon payment confirmation.
                  </p>
                </div>

                {/* Hand-drawn phone + receipt stream */}
                <div className="py-2 flex items-center justify-start">
                  <svg viewBox="0 0 220 100" fill="none" className="w-full max-w-xs h-24 overflow-visible">
                    {/* Phone Mockup */}
                    <g transform="translate(10, 5)">
                      <rect x="0" y="0" width="60" height="88" rx="8" fill="#ffffff" stroke="#003087" strokeWidth="2" />
                      <line x1="22" y1="5" x2="38" y2="5" stroke="#003087" strokeWidth="1.6" strokeLinecap="round" />
                      
                      {/* QR Code */}
                      <rect x="8" y="12" width="44" height="44" rx="3" fill="#f0f7ff" stroke="#009cde" strokeWidth="1.2" />
                      <rect x="12" y="16" width="10" height="10" rx="1" stroke="#003087" strokeWidth="1.4" />
                      <rect x="15" y="19" width="4" height="4" fill="#003087" />
                      <rect x="38" y="16" width="10" height="10" rx="1" stroke="#003087" strokeWidth="1.4" />
                      <rect x="41" y="19" width="4" height="4" fill="#003087" />
                      <rect x="12" y="42" width="10" height="10" rx="1" stroke="#003087" strokeWidth="1.4" />
                      <rect x="15" y="45" width="4" height="4" fill="#003087" />
                      
                      <rect x="25" y="20" width="5" height="5" fill="#009cde" />
                      <rect x="25" y="32" width="7" height="7" fill="#003087" />
                      <rect x="38" y="32" width="5" height="5" fill="#009cde" />
                    </g>

                    {/* Flowing Receipt Slip */}
                    <g transform="translate(90, 12) rotate(5)">
                      <rect x="0" y="0" width="54" height="70" rx="4" fill="#ffffff" stroke="#003087" strokeWidth="1.8" />
                      <line x1="8" y1="12" x2="46" y2="12" stroke="#003087" strokeWidth="2" strokeLinecap="round" />
                      <line x1="8" y1="22" x2="38" y2="22" stroke="#009cde" strokeWidth="1.4" strokeDasharray="2 2" />
                      <line x1="8" y1="32" x2="42" y2="32" stroke="#009cde" strokeWidth="1.4" strokeDasharray="2 2" />
                      <line x1="8" y1="42" x2="30" y2="42" stroke="#009cde" strokeWidth="1.4" strokeDasharray="2 2" />
                      
                      <circle cx="38" cy="54" r="7" fill="#f0f7ff" stroke="#009cde" strokeWidth="1.4" />
                      <path d="M35 54L37 56L42 51" stroke="#003087" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </g>
                  </svg>
                </div>

                <div className="flex items-center space-x-1.5 text-xs font-bold text-[#003087] group-hover:text-[#009cde] transition-colors">
                  <span>Explore QR Passes</span>
                  <ScribbleChevron className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>

            </div>

            {/* Hand-drawn Subtle Organic Divider Line */}
            <div className="w-full py-2">
              <svg className="w-full h-3 overflow-visible" viewBox="0 0 1000 12" fill="none">
                <path 
                  d="M 0 6 Q 250 2, 500 7 T 1000 5" 
                  stroke="#003087" 
                  strokeWidth="1.2" 
                  strokeDasharray="6 6" 
                  opacity="0.25" 
                />
              </svg>
            </div>

            {/* ROW 2: Features 3 & 4 */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
              
              {/* FEATURE 3: Maintenance Dispatch (5 Col) */}
              <div 
                onClick={() => setIsAuthOpen(true)}
                className="lg:col-span-5 space-y-4 cursor-pointer group"
              >
                <div className="space-y-3">
                  <div className="inline-flex items-center space-x-1.5 text-[#003087] text-[11px] font-mono font-bold tracking-widest uppercase">
                    <span>• RAPID TICKETING</span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-display font-bold text-[#012169] tracking-tight leading-tight">
                    Maintenance Dispatch.
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-500 font-medium leading-relaxed">
                    Tenants report issues with photos; landlords assign trusted service vendors with live resolution tracking.
                  </p>
                </div>

                {/* Hand-drawn Tool & Building Dispatch Visual */}
                <div className="py-2 flex items-center justify-start">
                  <svg viewBox="0 0 220 100" fill="none" className="w-full max-w-xs h-24 overflow-visible">
                    {/* Building Elevation */}
                    <g transform="translate(15, 8)">
                      <rect x="0" y="0" width="65" height="78" rx="3" fill="#ffffff" stroke="#003087" strokeWidth="2" />
                      <path d="M-3 0H68" stroke="#003087" strokeWidth="2.2" strokeLinecap="round" />
                      <rect x="8" y="12" width="16" height="16" rx="2" fill="#f0f7ff" stroke="#003087" strokeWidth="1.2" />
                      <rect x="38" y="12" width="16" height="16" rx="2" fill="#f0f7ff" stroke="#003087" strokeWidth="1.2" />
                      <rect x="8" y="40" width="16" height="16" rx="2" fill="#f0f7ff" stroke="#003087" strokeWidth="1.2" />
                      <rect x="38" y="40" width="16" height="16" rx="2" fill="#f0f7ff" stroke="#003087" strokeWidth="1.2" />
                    </g>

                    {/* Circular Tool & Verification Badge */}
                    <g transform="translate(100, 8)">
                      <circle cx="38" cy="38" r="34" fill="#f0f7ff" stroke="#003087" strokeWidth="2" />
                      <circle cx="38" cy="38" r="28" stroke="#009cde" strokeWidth="1" strokeDasharray="2 3" />
                      
                      {/* Wrench */}
                      <path 
                        d="M26 26L48 48M24 22C21 24 21 28 24 31L28 35L34 29L30 25C27 22 22 22 20 25L24 29" 
                        stroke="#003087" 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                      />
                      {/* Screwdriver */}
                      <path 
                        d="M50 24L26 52M50 24L55 29M26 52L22 56" 
                        stroke="#009cde" 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                      />
                    </g>
                  </svg>
                </div>

                <div className="flex items-center space-x-1.5 text-xs font-bold text-[#003087] group-hover:text-[#009cde] transition-colors">
                  <span>Manage Tickets</span>
                  <ScribbleChevron className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>

              {/* FEATURE 4: Unit-Level Accounting (7 Col) */}
              <div 
                onClick={() => setIsAuthOpen(true)}
                className="lg:col-span-7 space-y-4 cursor-pointer group lg:border-l lg:border-slate-200/80 lg:pl-12"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                  <div className="space-y-3 max-w-md">
                    <div className="inline-flex items-center space-x-1.5 text-[#003087] text-[11px] font-mono font-bold tracking-widest uppercase">
                      <span>• FINANCIAL CLARITY</span>
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-display font-bold text-[#012169] tracking-tight leading-tight">
                      Unit-Level Accounting &amp; Expense Split.
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-500 font-medium leading-relaxed">
                      Organize electricity, water, and maintenance expenses across holdings with single-click reconciliation and tax-ready export summaries.
                    </p>

                    <div className="pt-2 flex items-center space-x-2 text-xs font-bold text-[#003087] group-hover:text-[#009cde] transition-colors">
                      <span>View Financial Ledger</span>
                      <ScribbleChevron className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>

                  {/* Hand-Drawn Ledger & Yield Wheel */}
                  <div className="relative flex items-center justify-center flex-shrink-0">
                    <svg viewBox="0 0 160 130" fill="none" className="w-40 h-32 overflow-visible">
                      {/* Ledger Stack */}
                      <g transform="translate(10, 10)">
                        <rect x="0" y="0" width="65" height="88" rx="4" fill="#ffffff" stroke="#003087" strokeWidth="1.8" />
                        <rect x="0" y="0" width="65" height="20" rx="4" fill="#f0f7ff" stroke="#003087" strokeWidth="1.8" />
                        <line x1="10" y1="10" x2="55" y2="10" stroke="#003087" strokeWidth="2" strokeLinecap="round" />
                        <line x1="8" y1="32" x2="44" y2="32" stroke="#009cde" strokeWidth="1.6" strokeDasharray="2 2" />
                        <line x1="8" y1="48" x2="56" y2="48" stroke="#009cde" strokeWidth="1.6" strokeDasharray="2 2" />
                        <line x1="8" y1="64" x2="40" y2="64" stroke="#009cde" strokeWidth="1.6" strokeDasharray="2 2" />
                        <line x1="8" y1="78" x2="54" y2="78" stroke="#003087" strokeWidth="2" strokeLinecap="round" />
                      </g>

                      {/* Sketched Yield Wheel */}
                      <g transform="translate(115, 55)">
                        <circle cx="0" cy="0" r="34" fill="#f0f7ff" stroke="#003087" strokeWidth="2" />
                        <path d="M0 0L0 -34A34 34 0 0 1 32 10Z" fill="#009cde" stroke="#003087" strokeWidth="1.8" />
                        <path d="M0 0L32 10L-22 26Z" fill="#003087" stroke="#003087" strokeWidth="1.8" />
                        <circle cx="0" cy="0" r="10" fill="#ffffff" stroke="#003087" strokeWidth="1.6" />
                      </g>
                    </svg>
                  </div>
                </div>
              </div>

            </div>

          </div>

        </div>
      </section>

      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
    </>
  );
};

