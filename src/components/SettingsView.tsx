import React, { useState } from 'react';
import { useProperty } from '../context/PropertyContext';
import { Settings, CheckCircle2, Bell, DollarSign, Database } from 'lucide-react';

export const SettingsView: React.FC = () => {
  const { isOffline, toggleOffline } = useProperty();

  const [currency, setCurrency] = useState<'INR' | 'USD'>('INR');
  const [autoNudge, setAutoNudge] = useState(true);
  const [smsAlerts, setSmsAlerts] = useState(true);
  const [taxRate, setTaxRate] = useState(10);
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-8 font-sans max-w-4xl">
      {/* Top Banner */}
      <div className="flex items-center gap-3.5">
        <Settings className="w-6 h-6 text-[#003087] stroke-[2.4]" />
        <div>
          <h2 className="text-xl font-extrabold text-[#012169]">System & Portfolio Preferences</h2>
          <p className="text-xs sm:text-sm font-semibold text-slate-500">Configure currency, notifications, tax rules, and offline data</p>
        </div>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Financial Preferences */}
        <div className="p-6 sm:p-7 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-5">
          <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
            <DollarSign className="w-5 h-5 text-[#009cde]" />
            <h3 className="text-base font-extrabold text-[#012169]">Financial & Currency Settings</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-start">
            <div className="space-y-1.5">
              <label className="block text-xs font-extrabold text-[#012169]">Primary Currency Format</label>
              <select
                value={currency}
                onChange={e => setCurrency(e.target.value as any)}
                className="w-full h-11 px-4 bg-[#f8fafc] border border-slate-300 rounded-xl text-xs sm:text-sm font-bold text-[#003087] leading-none outline-none focus:border-[#009cde] focus:bg-white transition-all cursor-pointer"
              >
                <option value="INR">₹ INR (Indian Rupee)</option>
                <option value="USD">$ USD (US Dollar)</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-extrabold text-[#012169]">Est. TDS Tax Calculation Rate (%)</label>
              <input
                type="number"
                value={taxRate}
                onChange={e => setTaxRate(Number(e.target.value))}
                className="w-full h-11 px-4 bg-[#f8fafc] border border-slate-300 rounded-xl text-xs sm:text-sm font-bold text-[#003087] leading-none outline-none focus:border-[#009cde] focus:bg-white transition-all"
              />
            </div>
          </div>
        </div>

        {/* Notifications & Nudges */}
        <div className="p-6 sm:p-7 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-5">
          <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
            <Bell className="w-5 h-5 text-[#009cde]" />
            <h3 className="text-base font-extrabold text-[#012169]">Notification & Reminders</h3>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-2xl bg-[#f8fafc] border border-slate-200 gap-4">
              <div>
                <div className="text-sm font-extrabold text-[#012169]">Automated WhatsApp Reminders</div>
                <div className="text-xs text-slate-500">Auto-generate monthly rent payment links on the 1st of every month</div>
              </div>
              <input
                type="checkbox"
                checked={autoNudge}
                onChange={e => setAutoNudge(e.target.checked)}
                className="w-5 h-5 accent-[#009cde] rounded cursor-pointer flex-shrink-0"
              />
            </div>

            <div className="flex items-center justify-between p-4 rounded-2xl bg-[#f8fafc] border border-slate-200 gap-4">
              <div>
                <div className="text-sm font-extrabold text-[#012169]">Emergency Complaint SMS Alerts</div>
                <div className="text-xs text-slate-500">Receive instant SMS notification when an Urgent maintenance ticket is raised</div>
              </div>
              <input
                type="checkbox"
                checked={smsAlerts}
                onChange={e => setSmsAlerts(e.target.checked)}
                className="w-5 h-5 accent-[#009cde] rounded cursor-pointer flex-shrink-0"
              />
            </div>
          </div>
        </div>

        {/* Database & Offline Sync */}
        <div className="p-6 sm:p-7 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-5">
          <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
            <Database className="w-5 h-5 text-[#009cde]" />
            <h3 className="text-base font-extrabold text-[#012169]">Offline Vault & Database Controls</h3>
          </div>

          <div className="flex items-center justify-between p-4 rounded-2xl bg-[#f8fafc] border border-slate-200 gap-4">
            <div>
              <div className="text-sm font-extrabold text-[#012169]">Offline Mode Simulator</div>
              <div className="text-xs text-slate-500">Test how PropPulse stores logs locally when cellular network is lost</div>
            </div>
            <button
              type="button"
              onClick={toggleOffline}
              className={`px-3.5 py-1.5 rounded-full text-xs font-extrabold shadow-xs transition-all flex-shrink-0 ${
                isOffline ? 'bg-amber-100 text-amber-900 border border-amber-300' : 'bg-[#e0f2fe] text-[#003087] border border-[#009cde]/30'
              }`}
            >
              {isOffline ? 'Simulating Offline' : 'Online Mode'}
            </button>
          </div>
        </div>

        {/* Submit */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-6 py-3 rounded-xl bg-[#009cde] hover:bg-[#0080b8] text-white font-extrabold text-sm shadow-xs flex items-center gap-2 transition-transform active:scale-95"
          >
            {saved ? <CheckCircle2 className="w-4 h-4" /> : null}
            <span>{saved ? 'Preferences Saved!' : 'Save System Settings'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};
