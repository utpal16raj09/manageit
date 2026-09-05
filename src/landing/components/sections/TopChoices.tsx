import React, { useState } from 'react';
import { useProperty } from '../../../context/PropertyContext';
import { ScribbleBuilding, ScribbleShield, ScribbleChevron } from '../../../components/ScribbleIcons';
import { AuthModal } from '../../../components/AuthModal';

export const TopChoices: React.FC = () => {
  const { setActiveTab } = useProperty();
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  const propertiesList = [
    {
      id: 'prop-1',
      title: 'Sunrise Suites & Living',
      location: 'Koramangala, Bengaluru',
      type: 'Residential Suites',
      status: 'Verified Listing',
      image: '/assets/property-sunrise.jpg'
    },
    {
      id: 'prop-2',
      title: 'Green Villa Residences',
      location: 'Indiranagar, Bengaluru',
      type: 'Private Residences',
      status: 'Verified Listing',
      image: '/assets/property-green-villa.jpg'
    },
    {
      id: 'prop-3',
      title: 'Royal Heights Towers',
      location: 'HSR Layout, Bengaluru',
      type: 'Executive Apartments',
      status: 'Verified Listing',
      image: '/assets/property-royal-heights.jpg'
    }
  ];

  return (
    <>
      <section id="properties" className="py-16 sm:py-20 bg-[#FBFBFA] font-sans">
        <div className="max-w-7xl mx-auto px-6 sm:px-12">
          
          {/* Header row */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 text-left">
            <div className="space-y-2">
              <span className="text-[11px] font-mono font-bold tracking-[0.2em] text-[#003087] uppercase block">
                FEATURED SPACES
              </span>
              <h2 className="text-3xl sm:text-4xl font-display font-normal text-[#012169] tracking-tight">
                Top choices for you.
              </h2>
              <p className="text-sm text-slate-500 font-medium">
                Verified residential spaces across prime urban neighborhoods.
              </p>
            </div>

            <button
              onClick={() => setIsAuthOpen(true)}
              className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-full border border-slate-300 bg-white hover:border-[#003087] hover:text-[#003087] text-[#012169] text-xs sm:text-sm font-bold shadow-2xs hover:shadow-xs transition-all cursor-pointer self-start md:self-auto active:scale-95"
            >
              <span>Explore Spaces</span>
              <ScribbleChevron className="w-4 h-4" />
            </button>
          </div>

          {/* 3 Property Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {propertiesList.map(item => (
              <div
                key={item.id}
                onClick={() => setIsAuthOpen(true)}
                className="group bg-white rounded-3xl p-3.5 border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-[#003087]/30 transition-all duration-300 cursor-pointer text-left space-y-4 flex flex-col justify-between"
              >
                {/* Property Image Container */}
                <div className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-slate-100">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-[#012169]/85 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1 rounded-full flex items-center gap-1.5">
                    <ScribbleShield className="w-3.5 h-3.5 text-[#009cde]" />
                    <span>{item.status}</span>
                  </div>
                </div>

                {/* Property Meta Details */}
                <div className="px-2 space-y-2.5 pb-2">
                  <div className="text-xs text-slate-500 font-semibold truncate">
                    {item.location}
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-[#012169] group-hover:text-[#003087] transition-colors line-clamp-1">
                    {item.title}
                  </h3>

                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-600">
                    <span>{item.type}</span>
                    <span className="text-[#003087] font-bold group-hover:underline flex items-center gap-1">
                      View Details <ScribbleChevron className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
    </>
  );
};
