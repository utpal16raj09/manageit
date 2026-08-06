import React, { useState } from 'react';
import { useProperty } from '../context/PropertyContext';
import { ScribbleQR } from './ScribbleIcons';
import { X, Copy, Check, ExternalLink } from 'lucide-react';

export const TenantQRModal: React.FC = () => {
  const { isTenantQROpen, setIsTenantQROpen, properties } = useProperty();
  const [selectedPropId, setSelectedPropId] = useState(properties[0]?.id || 'prop-1');
  const [copied, setCopied] = useState(false);

  if (!isTenantQROpen) return null;

  const currentProp = properties.find(p => p.id === selectedPropId);
  const onboardUrl = `https://proppulse.app/onboard?prop=${selectedPropId}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(onboardUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#012169]/60 backdrop-blur-xs p-4 font-sans">
      <div className="bg-white text-[#012169] border border-slate-200 rounded-3xl w-full max-w-md p-6 sm:p-7 space-y-6 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-[#e0f2fe] text-[#009cde] border border-[#009cde]/30 shadow-xs">
              <ScribbleQR className="w-6 h-6 stroke-[2.2]" />
            </div>
            <div>
              <h3 className="text-lg font-extrabold text-[#012169]">Tenant Self-Onboarding QR</h3>
              <p className="text-xs text-slate-500 font-semibold">Tenant fills details & submits KYC</p>
            </div>
          </div>

          <button
            onClick={() => setIsTenantQROpen(false)}
            className="p-2 rounded-xl bg-slate-100 text-[#012169] hover:bg-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Property Selector */}
        <div className="space-y-1.5">
          <label className="block text-xs font-extrabold uppercase tracking-wider text-[#012169]">Target Property</label>
          <select
            value={selectedPropId}
            onChange={e => setSelectedPropId(e.target.value)}
            className="w-full bg-[#f8fafc] border border-slate-300 text-[#012169] text-sm font-bold rounded-xl p-3 focus:outline-none focus:border-[#009cde]"
          >
            {properties.map(p => (
              <option key={p.id} value={p.id}>{p.name} ({p.city})</option>
            ))}
          </select>
        </div>

        {/* QR Code Container */}
        <div className="flex flex-col items-center justify-center p-6 rounded-2xl bg-[#f8fafc] border border-slate-200 space-y-3">
          <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-md">
            <ScribbleQR className="w-44 h-44 text-[#003087]" />
          </div>
          <span className="text-xs font-extrabold text-[#003087]">Scan to open Tenant Onboarding Form</span>
        </div>

        {/* Copy Link Input */}
        <div className="flex items-center gap-2 bg-[#f8fafc] p-2 rounded-xl border border-slate-300">
          <input
            type="text"
            readOnly
            value={onboardUrl}
            className="bg-transparent text-xs font-mono text-slate-600 px-2 flex-1 focus:outline-none truncate"
          />
          <button
            onClick={handleCopy}
            className="px-3 py-1.5 rounded-lg bg-[#009cde] hover:bg-[#0080b8] text-white text-xs font-extrabold flex items-center gap-1 shadow-xs transition-transform active:scale-95"
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied' : 'Copy'}</span>
          </button>
        </div>

        {/* Action Button */}
        <button
          onClick={() => {
            window.open(onboardUrl, '_blank');
          }}
          className="w-full py-3 px-4 rounded-xl bg-[#009cde] hover:bg-[#0080b8] text-white font-extrabold text-xs sm:text-sm shadow-xs flex items-center justify-center gap-2 transition-transform active:scale-95"
        >
          <ExternalLink className="w-4 h-4" />
          <span>Simulate Tenant Form</span>
        </button>
      </div>
    </div>
  );
};
