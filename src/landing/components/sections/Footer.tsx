import React, { useState } from 'react';
import { useProperty } from '../../../context/PropertyContext';
import { PropPulseLogo } from '../../../components/ScribbleIcons';
import { AuthModal } from '../../../components/AuthModal';

export const Footer: React.FC = () => {
  const { setActiveTab } = useProperty();
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  return (
    <>
      <footer className="bg-[#050914] text-white py-10 sm:py-12 font-sans border-t border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-6 sm:px-12">
          
          {/* Main Minimal Row */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pb-8 border-b border-white/[0.06]">
            
            {/* Logo & Tag */}
            <div 
              onClick={() => setActiveTab('landing')}
              className="cursor-pointer flex items-center space-x-3 group select-none"
            >
              <PropPulseLogo className="w-7 h-7 flex-shrink-0" isDarkBg={true} />
              <div>
                <span className="text-lg font-extrabold font-display tracking-tight text-white block leading-tight">PropPulse</span>
                <span className="text-slate-400 text-[8px] uppercase font-mono tracking-[0.2em] block font-bold">RENT • MANAGE • GROW</span>
              </div>
            </div>


            {/* Inline Navigation */}
            <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 text-xs font-semibold text-slate-400">
              <a href="#how-it-works" className="hover:text-white transition-colors">Workflow</a>
              <a href="#features" className="hover:text-white transition-colors">Features</a>
              <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
              <a href="#about" className="hover:text-white transition-colors">About</a>
              <button 
                onClick={() => setIsAuthOpen(true)}
                className="hover:text-white transition-colors cursor-pointer"
              >
                Login
              </button>
            </div>

          </div>

          {/* Bottom Copyright & Legal Row */}
          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] font-normal text-slate-500">
            <div>
              © 2026 PropPulse. All rights reserved.
            </div>
            <div className="flex items-center space-x-5 text-slate-500">
              <span className="hover:text-slate-300 cursor-pointer transition-colors">Privacy</span>
              <span className="hover:text-slate-300 cursor-pointer transition-colors">Terms</span>
              <span className="hover:text-slate-300 cursor-pointer transition-colors">Security</span>
            </div>
          </div>

        </div>
      </footer>

      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
    </>
  );
};

