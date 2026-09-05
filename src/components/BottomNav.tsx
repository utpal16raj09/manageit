import React, { useState, useRef, useEffect } from 'react';
import { useProperty, TabType } from '../context/PropertyContext';
import {
  ScribbleBuilding,
  ScribbleMoney,
  ScribbleComplaint,
  ScribbleChart,
  ScribbleQR,
  ScribbleBell
} from './ScribbleIcons';
import { LayoutDashboard, HelpCircle, Settings, Menu, X, ChevronRight, LogOut, Sun, Moon, CreditCard, MessageSquare, Utensils } from 'lucide-react';

export const BottomNav: React.FC = () => {
  const {
    activeTab,
    setActiveTab,
    setIsTenantQROpen,
    setIsAgingModalOpen,
    setIsNotificationsOpen,
    filteredMetrics,
    activeRole,
    theme,
    toggleTheme
  } = useProperty();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('touchstart', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  let primaryNavItems: { id: TabType; label: string; icon: React.FC<{ className?: string; size?: number }>; badge?: number }[] = [];
  
  if (activeRole === 'tenant') {
    primaryNavItems = [
      { id: 'tenant-dashboard', label: 'Home', icon: LayoutDashboard },
      { id: 'tenant-payments', label: 'Payments', icon: CreditCard },
      { id: 'tenant-support', label: 'Support', icon: MessageSquare },
      { id: 'settings', label: 'Settings', icon: Settings }
    ];
  } else if (activeRole === 'manager') {
    primaryNavItems = [
      { id: 'manager-dashboard', label: 'Operations', icon: LayoutDashboard },
      { id: 'properties', label: 'Properties', icon: ScribbleBuilding },
      { id: 'complaints', label: 'Tickets', icon: ScribbleComplaint, badge: filteredMetrics.pendingComplaintsCount }
    ];
  } else {
    primaryNavItems = [
      { id: 'dashboard', label: 'Portfolio', icon: LayoutDashboard },
      { id: 'properties', label: 'Properties', icon: ScribbleBuilding },
      { id: 'complaints', label: 'Tickets', icon: ScribbleComplaint, badge: filteredMetrics.pendingComplaintsCount },
      { id: 'more', label: 'Financials', icon: ScribbleChart }
    ];
  }

  return (
    <>
      {/* Original Clean Bottom Nav Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200/80 px-4 py-2 shadow-lg font-sans">
        <div className="flex items-center justify-around max-w-md mx-auto">
          {primaryNavItems.map(item => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all relative cursor-pointer ${
                  isActive
                    ? 'text-[#003087] font-extrabold scale-105'
                    : 'text-slate-400 font-semibold hover:text-[#003087]'
                }`}
              >
                <div className="relative">
                  <Icon className={`w-5 h-5 ${isActive ? 'text-[#003087] stroke-[2.4]' : 'text-slate-400 stroke-[1.8]'}`} />
                  {item.badge !== undefined && item.badge > 0 && (
                    <span className="absolute -top-1 -right-2 bg-rose-500 text-white text-[9px] font-black w-4 h-4 rounded-md flex items-center justify-center border border-white">
                      {item.badge}
                    </span>
                  )}
                </div>
                <span className="text-[10px] mt-0.5 tracking-tight truncate font-bold">
                  {item.label}
                </span>
              </button>
            );
          })}

          {/* Hamburger Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="flex flex-col items-center justify-center py-1 px-3 rounded-xl text-slate-400 font-semibold hover:text-[#003087] transition-all cursor-pointer"
          >
            <Menu className="w-5 h-5 text-slate-500 stroke-[1.8]" />
            <span className="text-[10px] mt-0.5 tracking-tight font-bold">Menu</span>
          </button>
        </div>
      </div>

      {/* Hamburger Options Mobile Drawer */}
      {isMobileMenuOpen && (
        <div
          onClick={() => setIsMobileMenuOpen(false)}
          className="fixed inset-0 z-50 flex items-end justify-center bg-[#012169]/60 backdrop-blur-xs p-0 font-sans lg:hidden"
        >
          <div
            ref={menuRef}
            onClick={e => e.stopPropagation()}
            className="bg-white text-[#012169] rounded-t-3xl w-full p-6 space-y-4 shadow-2xl relative animate-in slide-in-from-bottom-8 duration-200"
          >
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-3">
                <ScribbleBuilding className="w-6 h-6 text-[#003087] stroke-[2.2]" />
                <span className="text-base font-extrabold text-[#003087]">Workspace Navigation</span>
              </div>

              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 rounded-xl bg-slate-100 text-[#012169] hover:bg-slate-200 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-2">
              {activeRole !== 'tenant' && (
                <>
                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      setIsTenantQROpen(true);
                    }}
                    className="w-full flex items-center justify-between p-3.5 rounded-2xl bg-[#f8fafc] border border-slate-200 hover:border-[#009cde] transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <ScribbleQR className="w-5 h-5 text-[#009cde]" />
                      <span className="text-sm font-extrabold text-[#012169]">Tenant QR Pass</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-400" />
                  </button>

                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      setIsAgingModalOpen(true);
                    }}
                    className="w-full flex items-center justify-between p-3.5 rounded-2xl bg-[#f8fafc] border border-slate-200 hover:border-[#009cde] transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <ScribbleMoney className="w-5 h-5 text-[#009cde]" />
                      <span className="text-sm font-extrabold text-[#012169]">Aging Dues Radar</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-400" />
                  </button>
                </>
              )}

              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsNotificationsOpen(true);
                }}
                className="w-full flex items-center justify-between p-3.5 rounded-2xl bg-[#f8fafc] border border-slate-200 hover:border-[#009cde] transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <ScribbleBell className="w-5 h-5 text-[#009cde]" />
                  <span className="text-sm font-extrabold text-[#012169]">Activity & Notifications</span>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </button>

              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setActiveTab('help');
                }}
                className="w-full flex items-center justify-between p-3.5 rounded-2xl bg-[#f8fafc] border border-slate-200 hover:border-[#009cde] transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <HelpCircle className="w-5 h-5 text-[#009cde] stroke-[2]" />
                  <span className="text-sm font-extrabold text-[#012169]">Help Center & FAQ</span>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </button>

              <button
                onClick={() => {
                  toggleTheme();
                }}
                className="w-full flex items-center justify-between p-3.5 rounded-2xl bg-[#f8fafc] border border-slate-200 hover:border-[#009cde] transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  {theme === 'dark' ? (
                    <Sun className="w-5 h-5 text-amber-500 stroke-[2]" />
                  ) : (
                    <Moon className="w-5 h-5 text-[#009cde] stroke-[2]" />
                  )}
                  <span className="text-sm font-extrabold text-[#012169]">
                    {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
                  </span>
                </div>
                <span className="text-xs font-bold text-slate-400">
                  {theme === 'dark' ? 'Active' : 'Off'}
                </span>
              </button>

              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setActiveTab('settings');
                }}
                className="w-full flex items-center justify-between p-3.5 rounded-2xl bg-[#f8fafc] border border-slate-200 hover:border-[#009cde] transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <Settings className="w-5 h-5 text-[#009cde] stroke-[2]" />
                  <span className="text-sm font-extrabold text-[#012169]">Account Settings</span>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </button>

              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setActiveTab('landing');
                }}
                className="w-full flex items-center justify-between p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 font-extrabold transition-colors mt-2 cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <LogOut className="w-5 h-5 text-rose-600 stroke-[2]" />
                  <span className="text-sm font-extrabold">Exit to Landing</span>
                </div>
                <ChevronRight className="w-4 h-4 text-rose-400" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
