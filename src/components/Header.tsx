import React, { useState, useRef, useEffect } from 'react';
import { useProperty } from '../context/PropertyContext';
import {
  PropPulseLogo,
  ScribbleBuilding,
  ScribblePlus,
  ScribbleSync,
  ScribbleBell,
  ScribbleSearch
} from './ScribbleIcons';
import { ChevronDown, Check, Building2, LogOut, Sun, Moon } from 'lucide-react';

export const Header: React.FC = () => {
  const {
    selectedPropertyId,
    setSelectedPropertyId,
    properties,
    isOffline,
    toggleOffline,
    filteredMetrics,
    setIsQuickAddOpen,
    setIsNotificationsOpen,
    tenants,
    activeTab,
    setActiveTab,
    activeRole,
    theme,
    toggleTheme
  } = useProperty();

  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);
  const [isPropSelectOpen, setIsPropSelectOpen] = useState(false);

  const searchRef = useRef<HTMLDivElement>(null);
  const propDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSearchDropdown(false);
      }
      if (propDropdownRef.current && !propDropdownRef.current.contains(event.target as Node)) {
        setIsPropSelectOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, []);

  const filteredSearchTenants = searchQuery.trim()
    ? tenants.filter(t =>
        t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.unitNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.propertyName.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  const currentProperty = properties.find(p => p.id === selectedPropertyId);

  return (
    <header className="bg-white sticky top-0 z-50 font-sans">
      <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 xl:px-20 py-3 flex items-center justify-between gap-2">
        {/* Left Side: Mobile Logo & Context Title */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <div className="lg:hidden flex items-center gap-2 cursor-pointer" onClick={() => setActiveTab('dashboard')}>
            <PropPulseLogo className="w-7 h-7 flex-shrink-0" />
            <span className="text-base font-extrabold tracking-tight text-[#003087]">PropPulse</span>
          </div>

          <div className="hidden lg:flex items-center gap-2.5 text-[#012169]">
            {activeRole === 'tenant' ? (
              <span className="text-base font-extrabold text-[#003087]">Tenant Portal</span>
            ) : (
              <>
                <ScribbleBuilding className="w-6 h-6 text-[#009cde]" />
                <span className="text-base font-extrabold">
                  {selectedPropertyId === 'all' ? 'All Portfolio Properties' : currentProperty?.name}
                </span>
              </>
            )}
          </div>
        </div>

        {/* Center: Search Bar (Desktop) - Hidden for Tenants */}
        {activeRole !== 'tenant' && (
          <div ref={searchRef} className="relative flex-1 max-w-md hidden md:block">
            <div className="relative">
              <input
                type="text"
                placeholder="Search tenant, flat, unit..."
                value={searchQuery}
                onFocus={() => setShowSearchDropdown(true)}
                onChange={e => {
                  setSearchQuery(e.target.value);
                  setShowSearchDropdown(true);
                }}
                className="w-full bg-[#f8fafc] dark:bg-white/[0.05] rounded-xl pl-10 pr-4 py-2 text-sm text-[#012169] dark:text-[#f8fafc] placeholder:text-slate-400 focus:outline-none border-0 border-transparent transition-all font-bold"
              />
              <ScribbleSearch className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            </div>

            {/* Search Dropdown */}
            {showSearchDropdown && searchQuery.trim().length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-[#121722] rounded-xl shadow-xl p-2 z-50 max-h-72 overflow-y-auto border-0">
                <div className="flex items-center justify-between text-xs font-extrabold text-[#003087] dark:text-[#f8fafc] px-3 py-1.5 border-b border-slate-100 dark:border-white/[0.06]">
                  <span>Matching Tenants</span>
                  <button onClick={() => setShowSearchDropdown(false)} className="text-[#009cde] hover:underline cursor-pointer border-0">Close</button>
                </div>
                {filteredSearchTenants.length === 0 ? (
                  <div className="text-sm text-slate-500 dark:text-slate-400 p-4 text-center">No results for "{searchQuery}"</div>
                ) : (
                  filteredSearchTenants.map(t => (
                    <div
                      key={t.id}
                      onClick={() => {
                        setShowSearchDropdown(false);
                        setSearchQuery('');
                        setActiveTab('properties');
                      }}
                      className="p-2.5 hover:bg-[#f0f7ff] dark:hover:bg-white/[0.06] rounded-lg cursor-pointer flex items-center justify-between text-sm transition-colors border-0"
                    >
                      <div>
                        <div className="font-extrabold text-[#012169] dark:text-[#f8fafc]">{t.name}</div>
                        <div className="text-xs text-[#003087] dark:text-[#94a3b8] font-semibold">{t.propertyName} • {t.unitNumber}</div>
                      </div>
                      <span className="text-sm font-extrabold text-[#009cde] font-mono-amount">₹{t.monthlyRent}</span>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        )}

        {/* Right Side Contextual Controls with Minimal Property Dropdown */}
        <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
          {activeRole !== 'tenant' && (
            <>
              {['dashboard', 'manager-dashboard', 'properties', 'complaints', 'more'].includes(activeTab) && (
                <div ref={propDropdownRef} className="relative">
                <button
                  onClick={() => setIsPropSelectOpen(prev => !prev)}
                  className="flex items-center gap-2 px-3 py-2 rounded-xl bg-[#f8fafc] dark:bg-white/[0.05] hover:bg-white dark:hover:bg-white/[0.08] text-[#003087] dark:text-[#f8fafc] text-xs font-extrabold transition-all cursor-pointer max-w-[160px] sm:max-w-[200px] truncate border-0 border-transparent shadow-none"
                >
                  <Building2 className="w-3.5 h-3.5 text-[#009cde] flex-shrink-0" />
                  <span className="truncate">
                    {selectedPropertyId === 'all' ? `All Properties (${properties.length})` : currentProperty?.name}
                  </span>
                  <ChevronDown className={`w-3.5 h-3.5 text-[#003087] dark:text-[#f8fafc] flex-shrink-0 transition-transform ${isPropSelectOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Minimal Property Popover Menu */}
                {isPropSelectOpen && (
                  <div className="absolute right-0 top-full mt-1.5 w-48 sm:w-56 max-w-[calc(100vw-24px)] bg-white dark:bg-[#121722] rounded-xl shadow-lg p-1 z-50 space-y-0.5 animate-in fade-in zoom-in-95 duration-100 border-0">
                    <button
                      onClick={() => {
                        setSelectedPropertyId('all');
                        setIsPropSelectOpen(false);
                      }}
                      className={`w-full px-2.5 py-2 rounded-lg text-left text-xs font-extrabold flex items-center justify-between transition-colors border-0 ${
                        selectedPropertyId === 'all'
                          ? 'bg-[#e0f2fe] dark:bg-white/[0.08] text-[#003087] dark:text-[#f8fafc]'
                          : 'text-[#012169] dark:text-[#cbd5e1] hover:bg-[#f8fafc] dark:hover:bg-white/[0.05]'
                      }`}
                    >
                      <span className="truncate pr-2">All Properties ({properties.length})</span>
                      {selectedPropertyId === 'all' && <Check className="w-3.5 h-3.5 text-[#003087] dark:text-[#f8fafc] stroke-[3] flex-shrink-0" />}
                    </button>

                    <div className="border-t border-slate-100 dark:border-white/[0.06] my-0.5" />

                    {properties.map(p => {
                      const isSelected = selectedPropertyId === p.id;
                      return (
                        <button
                          key={p.id}
                          onClick={() => {
                            setSelectedPropertyId(p.id);
                            setIsPropSelectOpen(false);
                          }}
                          className={`w-full px-2.5 py-2 rounded-lg text-left text-xs font-extrabold flex items-center justify-between transition-colors border-0 ${
                            isSelected
                              ? 'bg-[#e0f2fe] dark:bg-white/[0.08] text-[#003087] dark:text-[#f8fafc]'
                              : 'text-[#012169] dark:text-[#cbd5e1] hover:bg-[#f8fafc] dark:hover:bg-white/[0.05]'
                          }`}
                        >
                          <span className="truncate pr-2">{p.name}</span>
                          {isSelected && <Check className="w-3.5 h-3.5 text-[#003087] dark:text-[#f8fafc] stroke-[3] flex-shrink-0" />}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
              )}

              <button
                onClick={() => setIsQuickAddOpen(true)}
                className="flex items-center gap-1 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-xl bg-[#009cde] hover:bg-[#0080b8] text-white font-extrabold text-xs transition-all duration-200 active:scale-95 flex-shrink-0 cursor-pointer border-0 border-transparent shadow-none"
              >
                <ScribblePlus className="w-3.5 h-3.5 stroke-[3]" />
                <span className="hidden sm:inline">Add</span>
              </button>

              <button
                onClick={toggleOffline}
                title={isOffline ? "Offline Queue Active" : "Live Sync Active"}
                className={`p-1.5 sm:p-2 rounded-xl text-xs font-bold transition-all duration-200 flex-shrink-0 cursor-pointer border-0 border-transparent shadow-none ${
                  isOffline ? 'bg-amber-100 dark:bg-amber-500/20 text-amber-900 dark:text-amber-200' : 'bg-[#f0f7ff] dark:bg-white/[0.05] text-[#003087] dark:text-[#f8fafc]'
                }`}
              >
                <ScribbleSync className="w-3.5 h-3.5 text-[#009cde]" />
              </button>
            </>
          )}

          {activeRole !== 'tenant' && (
            <button
              onClick={() => setIsNotificationsOpen(true)}
              className="relative p-1.5 sm:p-2 rounded-xl bg-[#f8fafc] dark:bg-white/[0.05] text-[#003087] dark:text-[#f8fafc] hover:bg-white dark:hover:bg-white/[0.08] flex-shrink-0 transition-all duration-200 cursor-pointer border-0 border-transparent shadow-none"
              title="Notifications"
            >
              <ScribbleBell className="w-3.5 h-3.5 text-[#009cde]" />
              {filteredMetrics.pendingComplaintsCount > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-rose-500" />
              )}
            </button>
          )}

          {/* Minimal Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            aria-label="Toggle theme"
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-[#f8fafc] dark:bg-white/[0.05] text-[#003087] dark:text-[#f8fafc] hover:bg-white dark:hover:bg-white/[0.08] flex items-center justify-center flex-shrink-0 transition-all duration-200 active:scale-95 cursor-pointer border-0 border-transparent shadow-none"
          >
            {theme === 'dark' ? (
              <Sun className="w-3.5 h-3.5 text-amber-400" />
            ) : (
              <Moon className="w-3.5 h-3.5 text-[#009cde]" />
            )}
          </button>

          {/* Log Out Button (PC & Mobile) */}
          <button
            onClick={() => setActiveTab('landing')}
            title="Log Out to Landing Page"
            className="px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-xl bg-rose-50 dark:bg-rose-500/15 hover:bg-rose-100 dark:hover:bg-rose-500/25 text-rose-700 dark:text-rose-300 font-extrabold text-xs flex items-center gap-1.5 transition-all duration-200 flex-shrink-0 cursor-pointer border-0 border-transparent shadow-none"
          >
            <LogOut className="w-3.5 h-3.5 text-rose-600 dark:text-rose-300" />
            <span className="hidden sm:inline">Log Out</span>
          </button>
        </div>
      </div>
    </header>
  );
};
