import React, { useState } from 'react';
import { useProperty } from '../context/PropertyContext';
import { PropPulseLogo } from './ScribbleIcons';
import { ArrowRight, Lock, Mail, Shield, CheckCircle2 } from 'lucide-react';

export const AuthModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const { setActiveTab } = useProperty();
  const [email, setEmail] = useState('owner@proppulse.com');
  const [password, setPassword] = useState('••••••••••••');
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onClose();
      setActiveTab('dashboard');
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#012169]/40 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-md bg-white rounded-3xl border border-slate-200 shadow-[0_24px_64px_rgba(0,48,135,0.18)] p-8 space-y-6 text-left animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-100 text-slate-400 hover:text-slate-700 flex items-center justify-center text-sm font-bold transition-colors"
        >
          ✕
        </button>

        {/* Brand Header */}
        <div className="space-y-2">
          <div className="flex items-center space-x-3">
            <PropPulseLogo className="w-9 h-9" />
            <div>
              <h3 className="text-2xl font-black text-[#012169] tracking-tight">Sign In to PropPulse</h3>
              <p className="text-xs text-slate-400 font-mono">Institutional Landlord Portal</p>
            </div>
          </div>
        </div>

        {/* Form Inputs */}
        <form onSubmit={handleLogin} className="space-y-4 pt-2">
          <div className="space-y-1.5">
            <label className="text-xs font-mono font-bold text-slate-500 uppercase tracking-wider block">
              Landlord Email Address
            </label>
            <div className="relative flex items-center">
              <Mail className="absolute left-3.5 w-4 h-4 text-slate-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm text-[#012169] font-medium focus:outline-none focus:border-[#003087] focus:bg-white transition-all"
                placeholder="owner@proppulse.com"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-mono font-bold text-slate-500 uppercase tracking-wider block">
                Password
              </label>
              <a href="#forgot" onClick={(e) => e.preventDefault()} className="text-[11px] font-mono text-[#003087] font-bold hover:underline">
                Forgot password?
              </a>
            </div>
            <div className="relative flex items-center">
              <Lock className="absolute left-3.5 w-4 h-4 text-slate-400" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm text-[#012169] font-medium focus:outline-none focus:border-[#003087] focus:bg-white transition-all"
                placeholder="••••••••••••"
              />
            </div>
          </div>

          {/* Institutional Trust Badge */}
          <div className="flex items-center space-x-2 text-[11px] font-mono text-emerald-600 bg-emerald-50 px-3 py-2 rounded-lg border border-emerald-200/60 font-semibold">
            <Shield className="w-3.5 h-3.5 flex-shrink-0" />
            <span>256-bit Encrypted Portfolio Telemetry</span>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3.5 rounded-xl bg-[#003087] hover:bg-[#012169] text-white font-bold text-sm transition-all duration-200 flex items-center justify-center space-x-2 shadow-md cursor-pointer active:scale-[0.98]"
          >
            {isLoading ? (
              <span className="inline-flex items-center space-x-2">
                <span className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                <span>Authenticating...</span>
              </span>
            ) : (
              <>
                <span>Access Executive Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Demo Quick Access Hint */}
        <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] font-mono text-slate-400">
          <span>Demo Account Pre-filled</span>
          <span className="text-[#003087] font-bold">Press Enter to Login</span>
        </div>
      </div>
    </div>
  );
};
