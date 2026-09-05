import React, { useState } from 'react';
import { useProperty } from '../../../context/PropertyContext';
import { ScribbleSearch, ScribbleBuilding } from '../../../components/ScribbleIcons';
import { AuthModal } from '../../../components/AuthModal';

export const Hero: React.FC = () => {
  const { setActiveTab } = useProperty();
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilters, setActiveFilters] = useState<string[]>(['Apartments', 'Villas', 'Commercial', 'Suites']);

  const filterOptions = ['Apartments', 'Villas', 'Commercial', 'Suites'];

  const toggleFilter = (filter: string) => {
    setActiveFilters(prev => 
      prev.includes(filter) ? prev.filter(f => f !== filter) : [...prev, filter]
    );
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setIsAuthOpen(true);
  };

  return (
    <>
      <section className="relative min-h-[calc(100svh-68px)] lg:min-h-[calc(100vh-76px)] flex items-center pt-6 sm:pt-8 lg:pt-10 pb-14 sm:pb-16 lg:pb-24 bg-[#FBFBFA] overflow-hidden font-sans">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 sm:gap-10 lg:gap-16 items-center">
            
            {/* HERO IMAGE CARD: Top on mobile (order-1), Right on desktop (lg:order-2) */}
            <div className="order-1 lg:order-2 lg:col-span-6 relative">
              <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl sm:shadow-2xl border border-slate-200/80 bg-white">
                <img
                  src="/assets/hero-building.jpg"
                  alt="Modern Luxury Architectural Building"
                  className="w-full h-[260px] sm:h-[380px] lg:h-[620px] object-cover object-center transform hover:scale-102 transition-transform duration-700"
                />

                {/* Top-right Handwritten Script Note */}
                <div className="absolute top-4 right-4 sm:top-6 sm:right-6 text-right pointer-events-none select-none drop-shadow-md">
                  <div className="font-serif italic text-base sm:text-2xl lg:text-3xl text-white font-bold leading-none tracking-wide [text-shadow:_0_2px_12px_rgba(0,0,0,0.6)]">
                    Better<br />spaces.<br />Better<br />returns.
                  </div>
                </div>

                {/* Bottom-right Verified Listings Badge with Scribble Building */}
                <div className="absolute bottom-3.5 right-3.5 sm:bottom-5 sm:right-5 bg-white/95 backdrop-blur-md px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-xl sm:rounded-2xl border border-slate-200/90 shadow-lg sm:shadow-xl flex items-center space-x-2.5 sm:space-x-3">
                  <div className="w-6 h-6 sm:w-9 sm:h-9 rounded-lg sm:rounded-xl bg-[#f0f7ff] border border-[#009cde]/30 flex items-center justify-center text-[#003087] flex-shrink-0">
                    <ScribbleBuilding className="w-3.5 h-3.5 sm:w-5 sm:h-5 stroke-[2.2]" />
                  </div>
                  <div className="text-left">
                    <div className="text-[10px] sm:text-xs font-black text-[#012169] tracking-tight">Verified Listings</div>
                    <div className="text-[8.5px] sm:text-[10px] font-semibold text-slate-500">Safe &amp; Trusted</div>
                  </div>
                </div>
              </div>
            </div>

            {/* EDITORIAL CONTENT & INTERACTIVE SEARCH: Below image on mobile (order-2), Left on desktop (lg:order-1) */}
            <div className="order-2 lg:order-1 lg:col-span-6 flex flex-col space-y-5 sm:space-y-6 lg:space-y-8 text-left">
              
              {/* Interactive Search Bar: First after image on mobile, below subtitle on desktop */}
              <form onSubmit={handleSearch} className="order-1 lg:order-4 relative max-w-lg pt-1">
                <div className="relative flex items-center bg-white rounded-full border border-slate-300 shadow-sm p-1.5 sm:p-2 pl-4 sm:pl-5 focus-within:border-[#003087] focus-within:ring-2 focus-within:ring-[#003087]/15 focus-within:shadow-md transition-all">
                  <ScribbleSearch className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-400 mr-2.5 sm:mr-3 flex-shrink-0" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by location, property or tenant..."
                    className="w-full bg-transparent text-xs sm:text-sm text-[#012169] placeholder:text-slate-400 font-medium focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-[#003087] hover:bg-[#012169] text-white flex items-center justify-center flex-shrink-0 transition-colors cursor-pointer shadow-xs active:scale-95"
                    title="Search"
                  >
                    <ScribbleSearch className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </button>
                </div>
              </form>

              {/* Quick Filter Checklist: Second on mobile, fifth on desktop */}
              <div className="order-2 lg:order-5 flex flex-wrap items-center gap-x-4 gap-y-2 sm:gap-6 lg:gap-7 pt-1 text-xs sm:text-sm font-semibold text-slate-700">
                {filterOptions.map(opt => {
                  const isChecked = activeFilters.includes(opt);
                  return (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => toggleFilter(opt)}
                      className="flex items-center space-x-1.5 hover:text-[#003087] cursor-pointer transition-colors select-none py-0.5"
                    >
                      <span className={`w-3.5 h-3.5 sm:w-4 sm:h-4 rounded flex items-center justify-center text-[10px] sm:text-[11px] font-black transition-colors ${
                        isChecked ? 'text-[#003087]' : 'text-slate-300'
                      }`}>
                        ✓
                      </span>
                      <span>{opt}</span>
                    </button>
                  );
                })}
              </div>

              {/* Category Lead Title & Main Headline: Third on mobile, first on desktop */}
              <div className="order-3 lg:order-1 space-y-2 sm:space-y-3 pt-1">
                <div className="text-[10px] sm:text-[11px] font-mono font-bold tracking-[0.2em] sm:tracking-[0.24em] text-[#003087] uppercase">
                  PROPERTY &amp; TENANT OPERATIONS
                </div>

                <h1 className="font-display font-normal text-[#012169] text-3xl sm:text-5xl lg:text-[72px] leading-[1.1] sm:leading-[1.06] lg:leading-[1.04] tracking-tight">
                  Find the right<br />
                  space, <span className="italic font-serif text-[#003087]">faster.</span>
                </h1>
              </div>

              {/* Subtitle Description: Fourth on mobile, second on desktop */}
              <div className="order-4 lg:order-2 pt-0.5">
                <p className="text-slate-600 text-xs sm:text-base lg:text-lg leading-relaxed max-w-lg font-medium">
                  Premium rental properties, built for long-term growth. Manage your tenants, track payments and more — all in one place.
                </p>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* Auth Modal Trigger */}
      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
    </>
  );
};



