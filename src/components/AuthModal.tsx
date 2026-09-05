import React, { useState } from 'react';
import { useProperty } from '../context/PropertyContext';
import { PropPulseLogo } from './ScribbleIcons';
import { ArrowRight, Lock, Mail, Shield, Building2, Briefcase, KeyRound, ChevronRight } from 'lucide-react';

export const AuthModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const { setActiveTab, setActiveRole } = useProperty();
  const [selectedRole, setSelectedRole] = useState<'manager' | 'owner' | 'tenant' | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('••••••••••••');
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleRoleSelection = (role: 'manager' | 'owner' | 'tenant') => {
    setSelectedRole(role);
    setEmail(`${role}@proppulse.com`);
    setPassword('••••••••••••');
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRole) return;
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onClose();
      setActiveRole(selectedRole);
      if (selectedRole === 'owner') setActiveTab('dashboard');
      if (selectedRole === 'manager') setActiveTab('manager-dashboard');
      if (selectedRole === 'tenant') setActiveTab('tenant-dashboard');
      // Reset for next time
      setSelectedRole(null);
    }, 600);
  };

  const roles = [
    {
      id: 'owner' as const,
      title: 'Property Owner',
      desc: 'Full portfolio oversight, analytics & financials',
      icon: Building2,
    },
    {
      id: 'manager' as const,
      title: 'Operations Manager',
      desc: 'Property operations, maintenance & onboarding',
      icon: Briefcase,
    },
    {
      id: 'tenant' as const,
      title: 'Resident / Tenant',
      desc: 'Rent payments, maintenance tickets & gate pass',
      icon: KeyRound,
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#012169]/40 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-md bg-white rounded-3xl border border-slate-200/90 shadow-[0_24px_64px_rgba(0,48,135,0.14)] p-7 sm:p-8 space-y-6 text-left animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-xl bg-slate-100 text-slate-400 hover:text-slate-700 hover:bg-slate-200 flex items-center justify-center text-sm font-bold transition-colors cursor-pointer"
        >
          ✕
        </button>

        {/* Brand Header */}
        <div className="space-y-2">
          <div className="flex items-center space-x-3">
            <PropPulseLogo className="w-9 h-9" />
            <div>
              <h3 className="text-2xl font-black text-[#012169] tracking-tight">Portal Access</h3>
              <p className="text-xs text-slate-400 font-mono">Select your workspace account</p>
            </div>
          </div>
        </div>

        {/* Role Selection or Login Form */}
        {!selectedRole ? (
          <div className="space-y-3 pt-1">
            {roles.map((role) => {
              const RoleIcon = role.icon;
              return (
                <button
                  key={role.id}
                  onClick={() => handleRoleSelection(role.id)}
                  className="w-full p-4 rounded-2xl bg-white border border-slate-200/90 hover:border-[#003087] hover:bg-[#f8fafc] text-left transition-all duration-200 flex items-center justify-between group shadow-xs cursor-pointer active:scale-[0.99]"
                >
                  <div className="flex items-center space-x-3.5 min-w-0">
                    <div className="w-11 h-11 rounded-xl bg-slate-50 border border-slate-100 text-[#003087] flex items-center justify-center flex-shrink-0 group-hover:bg-[#003087] group-hover:text-white group-hover:border-[#003087] transition-all duration-200 shadow-2xs">
                      <RoleIcon className="w-5 h-5 stroke-[2]" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-sm font-extrabold text-[#012169] group-hover:text-[#003087] transition-colors">
                        {role.title}
                      </div>
                      <div className="text-xs text-slate-400 font-medium truncate mt-0.5">
                        {role.desc}
                      </div>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-[#003087] group-hover:translate-x-0.5 transition-all flex-shrink-0 ml-2" />
                </button>
              );
            })}
          </div>
        ) : (
          <form onSubmit={handleLogin} className="space-y-4 pt-1 animate-in fade-in duration-200">
            <div className="flex items-center justify-between mb-1 pb-2 border-b border-slate-100">
              <span className="text-xs font-bold text-[#003087] uppercase tracking-wider bg-[#f0f7ff] border border-[#009cde]/30 px-2.5 py-1 rounded-lg">
                {selectedRole} Mode
              </span>
              <button 
                type="button" 
                onClick={() => setSelectedRole(null)}
                className="text-xs font-bold text-slate-400 hover:text-[#012169] transition-colors cursor-pointer"
              >
                Change Role
              </button>
            </div>
            
            <div className="space-y-1.5">
              <label className="text-xs font-mono font-bold text-slate-500 uppercase tracking-wider block">
                Email Address
              </label>
              <div className="relative flex items-center">
                <Mail className="absolute left-3.5 w-4 h-4 text-slate-400 stroke-[2]" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm text-[#012169] font-medium focus:outline-none focus:border-[#003087] focus:bg-white transition-all"
                  placeholder="name@proppulse.com"
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
                <Lock className="absolute left-3.5 w-4 h-4 text-slate-400 stroke-[2]" />
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

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 rounded-xl bg-[#003087] hover:bg-[#012169] text-white font-bold text-sm transition-all duration-200 flex items-center justify-center space-x-2 shadow-sm cursor-pointer active:scale-[0.98] mt-2"
            >
              <span>Access {selectedRole.charAt(0).toUpperCase() + selectedRole.slice(1)} Workspace</span>
              <ArrowRight className="w-4 h-4 stroke-[2.2]" />
            </button>
          </form>
        )}

        {/* Institutional Trust Badge */}
        <div className="flex items-center justify-center space-x-2 text-[11px] font-mono text-slate-500 bg-slate-50 px-3 py-2 rounded-xl border border-slate-200/70 font-medium">
          <Shield className="w-3.5 h-3.5 text-[#009cde] flex-shrink-0" />
          <span>Encrypted Session Telemetry</span>
        </div>
        
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/80 backdrop-blur-sm rounded-3xl z-10">
            <span className="inline-flex items-center space-x-2 text-[#003087] font-bold">
              <span className="w-5 h-5 rounded-full border-2 border-[#003087] border-t-transparent animate-spin" />
              <span>Authenticating...</span>
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
