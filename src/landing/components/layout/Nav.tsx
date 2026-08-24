import React, { useState } from 'react';
import { useProperty } from '../../../context/PropertyContext';
import { Menu, X, ArrowRight } from 'lucide-react';
import { PropPulseLogo } from '../../../components/ScribbleIcons';
import { AuthModal } from '../../../components/AuthModal';
import { InquiryModal } from '../../../components/InquiryModal';

export const Nav: React.FC = () => {
  const { setActiveTab, setIsInquiryModalOpen } = useProperty();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  return (
    <>
      <nav className="sticky top-0 z-50 bg-[#FAFAFA]/90 backdrop-blur-md border-b border-slate-200/80 px-6 sm:px-10 py-3.5 flex items-center justify-between">
        {/* Brand Logo & Monospace Subtitle */}
        <div 
          onClick={() => setActiveTab('landing')}
          className="cursor-pointer flex items-center space-x-3 group"
        >
          <PropPulseLogo className="w-8 h-8 flex-shrink-0" />
          <div>
            <span className="text-xl font-bold font-display tracking-tight text-[#012169] block">PropPulse</span>
            <span className="text-slate-400 text-[9px] uppercase font-mono tracking-[0.2em] block font-semibold">PROPERTY OPERATIONS</span>
          </div>
        </div>

        {/* Center Nav Links */}
        <div className="hidden lg:flex items-center space-x-8 text-sm font-bold text-slate-500">
          <a href="#overview" className="text-[#003087] font-extrabold border-b-2 border-[#003087] pb-1">Overview</a>
          <a href="#features" className="hover:text-[#012169] transition-colors">Capabilities</a>
          <a href="#how-it-works" className="hover:text-[#012169] transition-colors">How It Works</a>
          <a href="#faq" className="hover:text-[#012169] transition-colors">FAQ</a>
        </div>

        {/* Launch Dashboard Pill Button -> Triggers Auth Modal */}
        <div className="hidden lg:flex items-center space-x-3">
          <button
            onClick={() => setIsInquiryModalOpen(true)}
            className="px-6 py-2.5 rounded-full border-2 border-[#003087] text-[#003087] hover:bg-[#003087]/5 font-bold text-sm transition-all duration-200 inline-flex items-center shadow-xs cursor-pointer active:scale-95"
          >
            Inquire
          </button>
          <button
            onClick={() => setIsAuthOpen(true)}
            className="px-6 py-2.5 rounded-full bg-[#003087] hover:bg-[#012169] text-white font-bold text-sm transition-all duration-200 inline-flex items-center space-x-2 shadow-xs cursor-pointer active:scale-95"
          >
            <span>Login</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 rounded-lg border border-slate-200 text-[#012169]"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>

        {/* Mobile Overlay Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden fixed inset-x-0 top-[65px] bg-[#FAFAFA] border-b border-slate-200 p-6 space-y-4 z-50 shadow-xl">
            <a href="#overview" onClick={() => setMobileMenuOpen(false)} className="block text-sm font-bold text-[#003087]">Overview</a>
            <a href="#features" onClick={() => setMobileMenuOpen(false)} className="block text-sm font-bold text-[#012169]">Capabilities</a>
            <a href="#how-it-works" onClick={() => setMobileMenuOpen(false)} className="block text-sm font-bold text-[#012169]">How It Works</a>
            <a href="#faq" onClick={() => setMobileMenuOpen(false)} className="block text-sm font-bold text-[#012169]">FAQ</a>
            <div className="flex flex-col space-y-3 pt-2">
              <button
                onClick={() => { setIsInquiryModalOpen(true); setMobileMenuOpen(false); }}
                className="w-full py-3 rounded-full border-2 border-[#003087] text-[#003087] hover:bg-[#003087]/5 font-bold text-sm flex items-center justify-center transition-all"
              >
                Inquire
              </button>
              <button
                onClick={() => { setIsAuthOpen(true); setMobileMenuOpen(false); }}
                className="w-full py-3 rounded-full bg-[#003087] text-white font-bold text-sm flex items-center justify-center space-x-2 transition-all"
              >
                <span>Login</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Login Authentication Modal */}
      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
      <InquiryModal />
    </>
  );
};
