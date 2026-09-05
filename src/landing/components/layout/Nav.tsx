import React, { useState } from 'react';
import { useProperty } from '../../../context/PropertyContext';
import { PropPulseLogo, ScribbleChevron } from '../../../components/ScribbleIcons';
import { AuthModal } from '../../../components/AuthModal';
import { InquiryModal } from '../../../components/InquiryModal';

export const Nav: React.FC = () => {
  const { setActiveTab } = useProperty();
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  return (
    <>
      <nav className="sticky top-0 z-50 bg-[#FBFBFA]/90 backdrop-blur-md border-b border-slate-200/80 px-4 sm:px-8 lg:px-12 py-3 sm:py-4 flex items-center justify-between font-sans">
        {/* Brand Logo & Subtitle */}
        <div 
          onClick={() => setActiveTab('landing')}
          className="cursor-pointer flex items-center space-x-2.5 sm:space-x-3 group"
        >
          <PropPulseLogo className="w-7 h-7 sm:w-8 sm:h-8 flex-shrink-0" />
          <div>
            <span className="text-lg sm:text-xl font-extrabold font-display tracking-tight text-[#012169] block leading-tight">PropPulse</span>
            <span className="text-slate-400 text-[8px] sm:text-[8.5px] uppercase font-mono tracking-[0.2em] sm:tracking-[0.22em] block font-bold">RENT • MANAGE • GROW</span>
          </div>
        </div>

        {/* Center/Right Nav Links & Login */}
        <div className="flex items-center space-x-6 sm:space-x-8">
          <div className="hidden md:flex items-center space-x-7 text-sm font-bold text-slate-600">
            <a href="#how-it-works" className="hover:text-[#003087] transition-colors">Workflow</a>
            <a href="#features" className="hover:text-[#003087] transition-colors">Features</a>
            <a href="#faq" className="hover:text-[#003087] transition-colors">FAQ</a>
            <a href="#about" className="hover:text-[#003087] transition-colors">About</a>
          </div>

          <button
            onClick={() => setIsAuthOpen(true)}
            className="px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-[#003087] hover:bg-[#012169] text-white font-bold text-xs sm:text-sm transition-all duration-200 inline-flex items-center space-x-1.5 shadow-xs cursor-pointer active:scale-95"
          >
            <span>Login</span>
            <ScribbleChevron className="w-3.5 h-3.5" />
          </button>
        </div>
      </nav>

      {/* Login Authentication Modal */}
      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
      <InquiryModal />
    </>
  );
};

