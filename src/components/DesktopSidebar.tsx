import React from 'react';
import { useProperty, TabType } from '../context/PropertyContext';
import {
  PropPulseLogo,
  ScribbleBuilding,
  ScribbleMoney,
  ScribbleComplaint,
  ScribbleChart,
  ScribbleQR,
  ScribbleBell
} from './ScribbleIcons';
import { LayoutDashboard, HelpCircle, Settings, ChevronRight, User, Sparkles, LogOut, CreditCard, MessageSquare, FileText, Utensils, Gift, QrCode } from 'lucide-react';

export const DesktopSidebar: React.FC = () => {
  const {
    activeTab,
    setActiveTab,
    setIsTenantQROpen,
    setIsAgingModalOpen,
    setIsNotificationsOpen,
    filteredMetrics,
    users,
    activeRole
  } = useProperty();

  let currentUser = users[0] || { name: 'Utpal Roy', email: 'owner@proppulse.com', role: 'owner' };
  
  if (activeRole === 'tenant') {
    currentUser = { name: 'John Doe', email: 'tenant@example.com', role: 'tenant' } as any;
  } else if (activeRole === 'manager') {
    currentUser = { name: 'Operations Manager', email: 'manager@proppulse.com', role: 'manager' } as any;
  }

  let navItems: { id: TabType; label: string; icon: React.FC<{ className?: string; size?: number }>; badge?: number }[] = [];
  
  if (activeRole === 'tenant') {
    navItems = [
      { id: 'tenant-dashboard', label: 'My Dashboard', icon: LayoutDashboard },
      { id: 'tenant-payments', label: 'Payment History', icon: CreditCard },
      { id: 'tenant-support', label: 'Support Requests', icon: MessageSquare },
      { id: 'tenant-documents', label: 'Documents', icon: FileText },
      { id: 'tenant-food', label: 'Food Menu', icon: Utensils },
      { id: 'tenant-referrals', label: 'Refer & Earn', icon: Gift },
      { id: 'tenant-qr', label: 'My QR Pass', icon: QrCode },
      { id: 'settings', label: 'Settings', icon: Settings }
    ];
  } else if (activeRole === 'manager') {
    navItems = [
      { id: 'manager-dashboard', label: 'Operations Dashboard', icon: LayoutDashboard },
      { id: 'properties', label: 'Properties & Units', icon: ScribbleBuilding },
      { id: 'complaints', label: 'Tickets & Complaints', icon: ScribbleComplaint, badge: filteredMetrics.pendingComplaintsCount },
      { id: 'help', label: 'Help Center', icon: HelpCircle },
      { id: 'settings', label: 'Settings', icon: Settings }
    ];
  } else {
    // Default to owner
    navItems = [
      { id: 'dashboard', label: 'Portfolio Dashboard', icon: LayoutDashboard },
      { id: 'properties', label: 'Properties & Units', icon: ScribbleBuilding },
      { id: 'complaints', label: 'Tickets & Complaints', icon: ScribbleComplaint, badge: filteredMetrics.pendingComplaintsCount },
      { id: 'more', label: 'Financials & P&L', icon: ScribbleChart },
      { id: 'help', label: 'Help Center', icon: HelpCircle },
      { id: 'settings', label: 'Settings', icon: Settings }
    ];
  }

  return (
    <aside className="hidden lg:flex flex-col w-64 bg-white text-[#012169] border-r border-slate-200 fixed top-0 bottom-0 left-0 z-40 font-sans shadow-xs">
      {/* Clean Brand Header */}
      <div className="p-6 border-b border-slate-100 flex items-center justify-between">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('dashboard')}>
          <PropPulseLogo className="w-8 h-8 flex-shrink-0" />
          <h1 className="text-xl font-extrabold tracking-tight text-[#012169] leading-tight">PropPulse</h1>
        </div>
      </div>

      {/* Main Navigation Links */}
      <div className="flex-1 px-3 py-6 space-y-1.5 overflow-y-auto">
        <div className="px-3 text-[10px] font-extrabold uppercase tracking-widest text-slate-400 mb-2">
          {activeRole === 'tenant' ? 'Tenant Portal' : activeRole === 'manager' ? 'Property Operations' : 'Operations Hub'}
        </div>

        {navItems.map(item => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center justify-between px-3.5 py-3 rounded-2xl font-extrabold text-sm transition-all duration-150 gap-2 ${
                isActive
                  ? 'bg-[#003087] text-white shadow-xs'
                  : 'text-slate-600 hover:bg-[#f0f7ff] hover:text-[#003087]'
              }`}
            >
              <div className="flex items-center gap-3 min-w-0">
                <Icon className={`w-5 h-5 flex-shrink-0 ${isActive ? 'text-white' : 'text-[#009cde]'}`} />
                <span className="truncate">{item.label}</span>
              </div>

              {item.badge !== undefined && item.badge > 0 && (
                <span className={`px-2 py-0.5 rounded-full text-xs font-black flex-shrink-0 ${
                  isActive ? 'bg-white text-[#003087]' : 'bg-rose-500 text-white'
                }`}>
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}

        {activeRole !== 'tenant' && (
          <>
            <div className="pt-6 px-3 text-[10px] font-extrabold uppercase tracking-widest text-slate-400 mb-2">
              Landlord Utilities
            </div>

            <button
              onClick={() => setIsTenantQROpen(true)}
              className="w-full flex items-center justify-between px-3.5 py-3 rounded-2xl font-extrabold text-sm text-slate-600 hover:bg-[#f0f7ff] hover:text-[#003087] transition-all gap-2"
            >
              <div className="flex items-center gap-3 min-w-0">
                <ScribbleQR className="w-5 h-5 text-[#009cde] flex-shrink-0" />
                <span className="truncate">Tenant QR Onboard</span>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400 flex-shrink-0" />
            </button>

            <button
              onClick={() => setIsAgingModalOpen(true)}
              className="w-full flex items-center justify-between px-3.5 py-3 rounded-2xl font-extrabold text-sm text-slate-600 hover:bg-[#f0f7ff] hover:text-[#003087] transition-all gap-2"
            >
              <div className="flex items-center gap-3 min-w-0">
                <ScribbleMoney className="w-5 h-5 text-[#009cde] flex-shrink-0" />
                <span className="truncate">Aging Dues Radar</span>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400 flex-shrink-0" />
            </button>

            <button
              onClick={() => setIsNotificationsOpen(true)}
              className="w-full flex items-center justify-between px-3.5 py-3 rounded-2xl font-extrabold text-sm text-slate-600 hover:bg-[#f0f7ff] hover:text-[#003087] transition-all gap-2"
            >
              <div className="flex items-center gap-3 min-w-0">
                <ScribbleBell className="w-5 h-5 text-[#009cde] flex-shrink-0" />
                <span className="truncate">Notifications</span>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400 flex-shrink-0" />
            </button>
          </>
        )}
      </div>

      {/* Dedicated User Account Footer Card */}
      <div className="p-3.5 border-t border-slate-100 bg-[#f8fafc] space-y-2">
        <div
          onClick={() => setActiveTab('settings')}
          className="flex items-center justify-between p-2.5 rounded-2xl cursor-pointer hover:bg-white hover:shadow-xs transition-all border border-transparent hover:border-slate-200 group"
        >
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-9 h-9 rounded-full bg-[#003087] text-white flex items-center justify-center font-extrabold text-xs flex-shrink-0 shadow-xs">
              {currentUser.name.substring(0, 2).toUpperCase()}
            </div>
            <div className="min-w-0">
              <div className="text-xs font-extrabold text-[#012169] truncate group-hover:text-[#009cde] transition-colors">
                {currentUser.name}
              </div>
              <div className="text-[11px] font-semibold text-slate-400 truncate capitalize">
                {activeRole ? (activeRole === 'owner' ? 'Property Owner' : activeRole) : (currentUser.role === 'owner' ? 'Property Owner' : currentUser.role)}
              </div>
            </div>
          </div>
          <Settings className="w-4 h-4 text-slate-400 group-hover:text-[#009cde] transition-colors flex-shrink-0" />
        </div>

        <button
          onClick={() => setActiveTab('landing')}
          className="w-full flex items-center justify-center gap-2 p-2.5 rounded-xl bg-rose-50 hover:bg-rose-100 border border-rose-200 text-rose-700 font-extrabold text-xs transition-all shadow-2xs cursor-pointer"
        >
          <LogOut className="w-4 h-4 text-rose-600" />
          <span>Log Out</span>
        </button>
      </div>
    </aside>
  );
};
