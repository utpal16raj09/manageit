import React from 'react';

// Hand-drawn Architectural Time / Automation Art
const HandDrawnTimeArt: React.FC = () => (
  <svg viewBox="0 0 280 130" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-28 overflow-visible">
    {/* Sketched Stopwatch / Clock Body */}
    <circle cx="75" cy="65" r="38" stroke="#003087" strokeWidth="2.2" strokeLinecap="round" />
    <circle cx="75" cy="65" r="33" stroke="#009cde" strokeWidth="1" strokeDasharray="2 3" opacity="0.6" />
    
    {/* Clock Crown & Button */}
    <path d="M71 27V19H79V27" stroke="#003087" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M96 37L102 31" stroke="#003087" strokeWidth="2" strokeLinecap="round" />
    
    {/* Clock Hands with Arrowhead */}
    <path d="M75 65L75 41" stroke="#003087" strokeWidth="2.4" strokeLinecap="round" />
    <path d="M75 65L92 73" stroke="#009cde" strokeWidth="2.4" strokeLinecap="round" />
    <circle cx="75" cy="65" r="3.5" fill="#003087" />
    
    {/* Dynamic Organic Speed Swirls */}
    <path d="M125 40Q160 30 200 43T250 37" stroke="#009cde" strokeWidth="2" strokeLinecap="round" />
    <path d="M120 65Q165 55 210 68T260 61" stroke="#003087" strokeWidth="2.2" strokeLinecap="round" />
    <path d="M125 90Q155 82 195 94T245 87" stroke="#009cde" strokeWidth="1.6" strokeLinecap="round" strokeDasharray="4 3" />
    
    {/* Hand-drawn Floating Receipt Slip */}
    <g transform="translate(180, 20) rotate(6)">
      <rect x="0" y="0" width="56" height="72" rx="4" fill="#ffffff" stroke="#003087" strokeWidth="1.8" />
      <line x1="10" y1="14" x2="46" y2="14" stroke="#003087" strokeWidth="2" strokeLinecap="round" />
      <line x1="10" y1="26" x2="38" y2="26" stroke="#009cde" strokeWidth="1.6" strokeLinecap="round" strokeDasharray="2 2" />
      <line x1="10" y1="36" x2="42" y2="36" stroke="#009cde" strokeWidth="1.6" strokeLinecap="round" strokeDasharray="2 2" />
      <line x1="10" y1="46" x2="30" y2="46" stroke="#009cde" strokeWidth="1.6" strokeLinecap="round" strokeDasharray="2 2" />
      {/* Hand-sketched check seal */}
      <circle cx="40" cy="56" r="8" fill="#f0f7ff" stroke="#009cde" strokeWidth="1.4" />
      <path d="M36 56L39 59L45 53" stroke="#003087" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </g>
  </svg>
);

// Hand-drawn Architectural Shield / Oversight Art
const HandDrawnControlArt: React.FC = () => (
  <svg viewBox="0 0 280 130" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-28 overflow-visible">
    {/* Hand-drawn Protective Architectural Shield */}
    <path 
      d="M140 12C175 12 215 22 215 59C215 96 165 119 140 126C115 119 65 96 65 59C65 22 105 12 140 12Z" 
      fill="#f0f7ff" 
      stroke="#003087" 
      strokeWidth="2.2" 
      strokeLinejoin="round" 
    />
    
    {/* Inner Sketched Radar Arc */}
    <path 
      d="M140 24C165 24 198 32 198 62C198 89 158 108 140 114C122 108 82 89 82 62C82 32 115 24 140 24Z" 
      stroke="#009cde" 
      strokeWidth="1.2" 
      strokeDasharray="3 3" 
    />
    
    {/* Sketched Multi-story Apartment Elevation inside */}
    <g transform="translate(108, 36)">
      {/* Main Tower Frame */}
      <rect x="12" y="6" width="40" height="60" rx="2" fill="#ffffff" stroke="#003087" strokeWidth="2" />
      {/* Roof Parapet */}
      <path d="M8 6H56" stroke="#003087" strokeWidth="2.4" strokeLinecap="round" />
      
      {/* Architectural Window Matrix */}
      <rect x="18" y="14" width="7" height="8" rx="1" fill="#f0f7ff" stroke="#003087" strokeWidth="1.4" />
      <rect x="39" y="14" width="7" height="8" rx="1" fill="#f0f7ff" stroke="#003087" strokeWidth="1.4" />
      
      <rect x="18" y="28" width="7" height="8" rx="1" fill="#f0f7ff" stroke="#003087" strokeWidth="1.4" />
      <rect x="39" y="28" width="7" height="8" rx="1" fill="#f0f7ff" stroke="#003087" strokeWidth="1.4" />
      
      <rect x="18" y="42" width="7" height="8" rx="1" fill="#f0f7ff" stroke="#003087" strokeWidth="1.4" />
      <rect x="39" y="42" width="7" height="8" rx="1" fill="#f0f7ff" stroke="#003087" strokeWidth="1.4" />
      
      {/* Ground Entryway */}
      <path d="M27 66V56H37V66" stroke="#003087" strokeWidth="1.8" />
    </g>

    {/* Hand-drawn Radar Orbit Lines */}
    <path d="M35 42Q60 24 85 39" stroke="#009cde" strokeWidth="1.8" strokeLinecap="round" strokeDasharray="2 3" />
    <path d="M195 89Q225 104 250 84" stroke="#009cde" strokeWidth="1.8" strokeLinecap="round" strokeDasharray="2 3" />
  </svg>
);

// Hand-drawn Architectural Growth / Yield Art
const HandDrawnGrowthArt: React.FC = () => (
  <svg viewBox="0 0 280 130" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-28 overflow-visible">
    {/* Rising Architectural Building Blocks (Bar-chart buildings) */}
    {/* Block 1 (Shortest) */}
    <g transform="translate(45, 72)">
      <rect x="0" y="0" width="36" height="42" rx="2" fill="#ffffff" stroke="#003087" strokeWidth="2" />
      <line x1="8" y1="12" x2="28" y2="12" stroke="#009cde" strokeWidth="1.4" strokeDasharray="2 2" />
      <line x1="8" y1="22" x2="28" y2="22" stroke="#009cde" strokeWidth="1.4" strokeDasharray="2 2" />
      <line x1="8" y1="32" x2="28" y2="32" stroke="#009cde" strokeWidth="1.4" strokeDasharray="2 2" />
    </g>
    
    {/* Block 2 (Medium) */}
    <g transform="translate(100, 46)">
      <rect x="0" y="0" width="42" height="68" rx="2" fill="#ffffff" stroke="#003087" strokeWidth="2" />
      <rect x="8" y="10" width="8" height="10" rx="1" fill="#f0f7ff" stroke="#003087" strokeWidth="1.2" />
      <rect x="26" y="10" width="8" height="10" rx="1" fill="#f0f7ff" stroke="#003087" strokeWidth="1.2" />
      
      <rect x="8" y="28" width="8" height="10" rx="1" fill="#f0f7ff" stroke="#003087" strokeWidth="1.2" />
      <rect x="26" y="28" width="8" height="10" rx="1" fill="#f0f7ff" stroke="#003087" strokeWidth="1.2" />
      
      <rect x="8" y="46" width="8" height="10" rx="1" fill="#f0f7ff" stroke="#003087" strokeWidth="1.2" />
      <rect x="26" y="46" width="8" height="10" rx="1" fill="#f0f7ff" stroke="#003087" strokeWidth="1.2" />
    </g>

    {/* Block 3 (Tallest Premium Tower) */}
    <g transform="translate(162, 18)">
      <rect x="0" y="0" width="48" height="96" rx="3" fill="#f0f7ff" stroke="#003087" strokeWidth="2.2" />
      <path d="M-3 0H51" stroke="#003087" strokeWidth="2.4" strokeLinecap="round" />
      
      {/* Tower Windows */}
      <rect x="8" y="12" width="9" height="11" rx="1" fill="#ffffff" stroke="#003087" strokeWidth="1.2" />
      <rect x="31" y="12" width="9" height="11" rx="1" fill="#ffffff" stroke="#003087" strokeWidth="1.2" />
      
      <rect x="8" y="32" width="9" height="11" rx="1" fill="#ffffff" stroke="#003087" strokeWidth="1.2" />
      <rect x="31" y="32" width="9" height="11" rx="1" fill="#ffffff" stroke="#003087" strokeWidth="1.2" />
      
      <rect x="8" y="52" width="9" height="11" rx="1" fill="#ffffff" stroke="#003087" strokeWidth="1.2" />
      <rect x="31" y="52" width="9" height="11" rx="1" fill="#ffffff" stroke="#003087" strokeWidth="1.2" />
      
      <rect x="8" y="72" width="9" height="11" rx="1" fill="#ffffff" stroke="#003087" strokeWidth="1.2" />
      <rect x="31" y="72" width="9" height="11" rx="1" fill="#ffffff" stroke="#003087" strokeWidth="1.2" />
    </g>

    {/* Dynamic Hand-Drawn Upward Vector Arrow */}
    <path 
      d="M30 104 C 80 94, 130 64, 235 14" 
      stroke="#009cde" 
      strokeWidth="2.8" 
      strokeLinecap="round" 
    />
    <path 
      d="M218 12 L 240 12 L 238 34" 
      stroke="#003087" 
      strokeWidth="2.6" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
    />
    
    {/* Sunburst Hatching at the Peak */}
    <path d="M246 6L254 0" stroke="#009cde" strokeWidth="1.8" strokeLinecap="round" />
    <path d="M258 18L266 20" stroke="#009cde" strokeWidth="1.8" strokeLinecap="round" />
    <path d="M252 30L260 36" stroke="#009cde" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

export const ValueStrip: React.FC = () => {
  return (
    <section className="py-14 sm:py-20 bg-white border-t border-b border-slate-200/80 font-sans">
      <div className="max-w-7xl mx-auto px-6 sm:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 sm:gap-14 items-start">
          
          {/* Value 1: Art on TOP, Text BELOW */}
          <div className="text-left flex flex-col space-y-5 group">
            <div className="pb-2 flex items-center justify-start">
              <HandDrawnTimeArt />
            </div>

            <div className="space-y-2">
              <h3 className="text-xl sm:text-2xl font-display font-bold text-[#012169] tracking-tight">
                Save Time
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 font-medium leading-relaxed">
                Automated payment reminders and digital passes so you never have to chase rent manually.
              </p>
            </div>
          </div>

          {/* Value 2: Text on TOP, Art BELOW */}
          <div className="text-left flex flex-col justify-between space-y-6 group">
            <div className="space-y-2">
              <h3 className="text-xl sm:text-2xl font-display font-bold text-[#012169] tracking-tight">
                Stay in Control
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 font-medium leading-relaxed">
                Instant dues tracking, tenant records, and maintenance requests unified in one place.
              </p>
            </div>

            <div className="pt-2 flex items-center justify-start">
              <HandDrawnControlArt />
            </div>
          </div>

          {/* Value 3: Title on TOP, Ascending Art in Middle, Desc BELOW */}
          <div className="text-left flex flex-col space-y-4 group">
            <div className="space-y-1">
              <h3 className="text-xl sm:text-2xl font-display font-bold text-[#012169] tracking-tight">
                Maximize Returns
              </h3>
            </div>

            <div className="py-1 flex items-center justify-start">
              <HandDrawnGrowthArt />
            </div>

            <p className="text-xs sm:text-sm text-slate-500 font-medium leading-relaxed">
              Less operational friction, organized multi-property records, and long-term rental growth.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};



