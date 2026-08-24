import React, { useState } from 'react';
import { useProperty } from '../context/PropertyContext';
import {
  ScribblePlus,
  ScribbleUsers,
  ScribbleMoney,
  ScribbleQR
} from './ScribbleIcons';
import { X, Receipt, CheckCircle2 } from 'lucide-react';
import { Expense, Unit } from '../types/property';
import { KYCUpload } from './KYCUpload';

export const QuickAddSheet: React.FC = () => {
  const {
    isQuickAddOpen,
    setIsQuickAddOpen,
    properties,
    addTenant,
    addBulkExpense,
    addBulkDues,
    setIsTenantQROpen,
    units
  } = useProperty();

  const [activeSubTab, setActiveSubTab] = useState<'tenant' | 'expense' | 'dues'>('tenant');

  // Form States - Add Tenant
  const [tenantPropId, setTenantPropId] = useState(properties[0]?.id || 'prop-1');
  const [tenantName, setTenantName] = useState('');
  const [tenantPhone, setTenantPhone] = useState('');
  const [tenantUnit, setTenantUnit] = useState('');
  const [tenantRent, setTenantRent] = useState('14000');
  const [tenantEmail, setTenantEmail] = useState('');
  const [emgName, setEmgName] = useState('');
  const [emgPhone, setEmgPhone] = useState('');
  const [kycDocUrl, setKycDocUrl] = useState('');

  // Form States - Bulk Expense
  const [expCategory, setExpCategory] = useState<Expense['category']>('Maintenance');
  const [expAmount, setExpAmount] = useState('');
  const [expNote, setExpNote] = useState('');
  const [selectedPropIds, setSelectedPropIds] = useState<string[]>(properties.map(p => p.id));

  // Form States - Bulk Dues
  const [dueName, setDueName] = useState('Monthly Maintenance');
  const [dueAmount, setDueAmount] = useState('1500');

  if (!isQuickAddOpen) return null;

  const handleAddTenantSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!tenantName.trim()) return;

    const targetProp = properties.find(p => p.id === tenantPropId);
    const rentNum = Number(tenantRent) || 12000;

    addTenant({
      propertyId: tenantPropId,
      propertyName: targetProp?.name || 'Sunrise PG',
      unitId: `u-${Date.now()}`,
      unitNumber: tenantUnit || 'Room 101',
      name: tenantName,
      phone: tenantPhone || '+91 9876543210',
      email: tenantEmail || `${tenantName.toLowerCase().replace(/\s+/g, '.')}@example.com`,
      monthlyRent: rentNum,
      depositAmount: rentNum * 2,
      leaseStart: new Date().toISOString().split('T')[0],
      leaseEnd: new Date(Date.now() + 365 * 24 * 3600 * 1000).toISOString().split('T')[0],
      joinedDate: new Date().toISOString().split('T')[0],
      kycVerified: !!kycDocUrl,
      avatarUrl: `https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80`,
      emergencyContactName: emgName || 'NA',
      emergencyContactPhone: emgPhone || 'NA',
      kycDocUrl: kycDocUrl || ''
    });

    setIsQuickAddOpen(false);
    setTenantName('');
    setKycDocUrl('');
  };

  const handleBulkExpenseSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!expAmount) return;

    addBulkExpense({
      propertyIds: selectedPropIds,
      category: expCategory,
      amount: Number(expAmount),
      note: expNote || 'General Expense'
    });

    setIsQuickAddOpen(false);
    setExpAmount('');
  };

  const handleBulkDuesSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!dueAmount) return;

    addBulkDues({
      propertyIds: selectedPropIds,
      dueName,
      amount: Number(dueAmount)
    });

    setIsQuickAddOpen(false);
  };

  const toggleSelectProp = (id: string) => {
    if (selectedPropIds.includes(id)) {
      setSelectedPropIds(selectedPropIds.filter(p => p !== id));
    } else {
      setSelectedPropIds([...selectedPropIds, id]);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-[#012169]/60 backdrop-blur-xs p-0 sm:p-4 font-sans">
      <div className="bg-white text-[#012169] border border-slate-200 rounded-t-3xl sm:rounded-3xl w-full max-w-lg p-6 sm:p-7 space-y-5 shadow-2xl relative animate-in slide-in-from-bottom-6 sm:zoom-in-95 duration-200">
        {/* Header - Unboxed Classy Scribbly Icon */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <ScribblePlus className="w-7 h-7 text-[#003087] stroke-[2.8]" />
            <div>
              <h3 className="text-lg font-extrabold text-[#012169]">Quick Action Center</h3>
              <p className="text-xs text-slate-500 font-semibold">Single-tap workflows for landlords</p>
            </div>
          </div>

          <button
            onClick={() => setIsQuickAddOpen(false)}
            className="p-2 rounded-xl bg-slate-100 text-[#012169] hover:bg-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Action Type Toggle */}
        <div className="grid grid-cols-3 gap-2 bg-[#f8fafc] p-1.5 rounded-2xl border border-slate-200">
          <button
            onClick={() => setActiveSubTab('tenant')}
            className={`py-2 rounded-xl text-xs font-extrabold flex items-center justify-center gap-1.5 transition-all ${
              activeSubTab === 'tenant'
                ? 'bg-[#003087] text-white shadow-xs'
                : 'text-slate-600 hover:text-[#003087]'
            }`}
          >
            <ScribbleUsers className="w-4 h-4" />
            <span>Add Tenant</span>
          </button>

          <button
            onClick={() => setActiveSubTab('expense')}
            className={`py-2 rounded-xl text-xs font-extrabold flex items-center justify-center gap-1.5 transition-all ${
              activeSubTab === 'expense'
                ? 'bg-[#003087] text-white shadow-xs'
                : 'text-slate-600 hover:text-[#003087]'
            }`}
          >
            <Receipt className="w-4 h-4" />
            <span>Expense (Bulk)</span>
          </button>

          <button
            onClick={() => setActiveSubTab('dues')}
            className={`py-2 rounded-xl text-xs font-extrabold flex items-center justify-center gap-1.5 transition-all ${
              activeSubTab === 'dues'
                ? 'bg-[#003087] text-white shadow-xs'
                : 'text-slate-600 hover:text-[#003087]'
            }`}
          >
            <ScribbleMoney className="w-4 h-4" />
            <span>Bulk Dues</span>
          </button>
        </div>

        {/* Tenant Self-Fill QR Banner */}
        {activeSubTab === 'tenant' && (
          <div className="p-4 rounded-2xl bg-[#e0f2fe]/60 border border-[#009cde]/30 flex items-center justify-between gap-3">
            <div>
              <div className="text-xs font-extrabold text-[#003087]">Tenant Self-Fill QR?</div>
              <div className="text-[11px] text-slate-600 font-semibold">Generate a QR so tenant fills details themselves.</div>
            </div>
            <button
              onClick={() => {
                setIsQuickAddOpen(false);
                setIsTenantQROpen(true);
              }}
              className="px-3 py-1.5 rounded-xl bg-[#009cde] hover:bg-[#0080b8] text-white text-xs font-extrabold flex items-center gap-1 shadow-xs flex-shrink-0"
            >
              <ScribbleQR className="w-3.5 h-3.5" />
              <span>Open QR</span>
            </button>
          </div>
        )}

        {/* Forms */}
        {activeSubTab === 'tenant' && (
          <form onSubmit={handleAddTenantSubmit} className="space-y-4 text-xs sm:text-sm">
            <div>
              <label className="block font-extrabold text-[#012169] mb-1">Select Property</label>
              <select
                value={tenantPropId}
                onChange={e => setTenantPropId(e.target.value)}
                className="w-full bg-[#f8fafc] border border-slate-300 rounded-xl p-2.5 font-bold focus:border-[#009cde]"
              >
                {properties.map(p => (
                  <option key={p.id} value={p.id}>{p.name}</option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-extrabold text-[#012169] mb-1">Tenant Name</label>
                <input
                  type="text"
                  placeholder="Full name"
                  value={tenantName}
                  onChange={e => setTenantName(e.target.value)}
                  className="w-full bg-[#f8fafc] border border-slate-300 rounded-xl p-2.5 font-bold focus:border-[#009cde]"
                />
              </div>
              <div>
                <label className="block font-extrabold text-[#012169] mb-1">WhatsApp Phone</label>
                <input
                  type="text"
                  placeholder="+91 98765..."
                  value={tenantPhone}
                  onChange={e => setTenantPhone(e.target.value)}
                  className="w-full bg-[#f8fafc] border border-slate-300 rounded-xl p-2.5 font-bold focus:border-[#009cde]"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-extrabold text-[#012169] mb-1">Select Unit / Bed</label>
                <select
                  value={tenantUnit}
                  onChange={e => setTenantUnit(e.target.value)}
                  className="w-full bg-[#f8fafc] border border-slate-300 rounded-xl p-2.5 font-bold focus:border-[#009cde]"
                >
                  <option value="">Select Bed...</option>
                  {units.filter(u => u.propertyId === tenantPropId && u.status === 'vacant').map(u => (
                    <option key={u.id} value={u.id}>{u.unitNumber}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block font-extrabold text-[#012169] mb-1">Monthly Rent (₹)</label>
                <input
                  type="number"
                  placeholder="14000"
                  value={tenantRent}
                  onChange={e => setTenantRent(e.target.value)}
                  className="w-full bg-[#f8fafc] border border-slate-300 rounded-xl p-2.5 font-bold focus:border-[#009cde]"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-extrabold text-[#012169] mb-1">Emergency Name</label>
                <input
                  type="text"
                  placeholder="Guardian Name"
                  value={emgName}
                  onChange={e => setEmgName(e.target.value)}
                  className="w-full bg-[#f8fafc] border border-slate-300 rounded-xl p-2.5 font-bold focus:border-[#009cde]"
                />
              </div>
              <div>
                <label className="block font-extrabold text-[#012169] mb-1">Emergency Phone</label>
                <input
                  type="text"
                  placeholder="+91..."
                  value={emgPhone}
                  onChange={e => setEmgPhone(e.target.value)}
                  className="w-full bg-[#f8fafc] border border-slate-300 rounded-xl p-2.5 font-bold focus:border-[#009cde]"
                />
              </div>
            </div>

            <div className="mt-2">
              <KYCUpload 
                onUploadSuccess={(url) => setKycDocUrl(url)} 
                tenantId="new" 
              />
              {kycDocUrl && <p className="text-emerald-600 text-[10px] mt-1 font-bold">Document attached successfully</p>}
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-[#009cde] hover:bg-[#0080b8] text-white font-extrabold text-xs sm:text-sm shadow-xs transition-transform active:scale-95 mt-2"
            >
              Add Tenant & Generate Digital Lease
            </button>
          </form>
        )}

        {activeSubTab === 'expense' && (
          <form onSubmit={handleBulkExpenseSubmit} className="space-y-4 text-xs sm:text-sm">
            <div>
              <label className="block font-extrabold text-[#012169] mb-1">Expense Category</label>
              <select
                value={expCategory}
                onChange={e => setExpCategory(e.target.value as any)}
                className="w-full bg-[#f8fafc] border border-slate-300 rounded-xl p-2.5 font-bold focus:border-[#009cde]"
              >
                <option value="Maintenance">Maintenance</option>
                <option value="Electricity & Diesel">Electricity & Diesel</option>
                <option value="Water & Plumbing">Water & Plumbing</option>
                <option value="Internet">Wi-Fi Fiber</option>
                <option value="Salaries">Staff Salaries</option>
                <option value="Other">Other Expenses</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-extrabold text-[#012169] mb-1">Total Amount (₹)</label>
                <input
                  type="number"
                  placeholder="e.g. 5000"
                  value={expAmount}
                  onChange={e => setExpAmount(e.target.value)}
                  className="w-full bg-[#f8fafc] border border-slate-300 rounded-xl p-2.5 font-bold focus:border-[#009cde]"
                />
              </div>
              <div>
                <label className="block font-extrabold text-[#012169] mb-1">Note / Voucher #</label>
                <input
                  type="text"
                  placeholder="e.g. Aug Water"
                  value={expNote}
                  onChange={e => setExpNote(e.target.value)}
                  className="w-full bg-[#f8fafc] border border-slate-300 rounded-xl p-2.5 font-medium focus:border-[#009cde]"
                />
              </div>
            </div>

            <div>
              <label className="block font-extrabold text-[#012169] mb-1.5">Apply & Split Across Properties</label>
              <div className="space-y-1.5 max-h-36 overflow-y-auto pr-1">
                {properties.map(p => {
                  const isChecked = selectedPropIds.includes(p.id);
                  return (
                    <div
                      key={p.id}
                      onClick={() => toggleSelectProp(p.id)}
                      className={`p-2.5 rounded-xl border flex items-center justify-between cursor-pointer transition-colors ${
                        isChecked ? 'bg-[#f0f7ff] border-[#009cde]' : 'bg-[#f8fafc] border-slate-200'
                      }`}
                    >
                      <span className="text-xs font-bold text-[#012169]">{p.name}</span>
                      {isChecked && <CheckCircle2 className="w-4 h-4 text-[#009cde]" />}
                    </div>
                  );
                })}
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-[#009cde] hover:bg-[#0080b8] text-white font-extrabold text-xs sm:text-sm shadow-xs transition-transform active:scale-95"
            >
              Post Split Expense Entry
            </button>
          </form>
        )}

        {activeSubTab === 'dues' && (
          <form onSubmit={handleBulkDuesSubmit} className="space-y-4 text-xs sm:text-sm">
            <div>
              <label className="block font-extrabold text-[#012169] mb-1">Due Description</label>
              <input
                type="text"
                value={dueName}
                onChange={e => setDueName(e.target.value)}
                className="w-full bg-[#f8fafc] border border-slate-300 rounded-xl p-2.5 font-bold focus:border-[#009cde]"
              />
            </div>

            <div>
              <label className="block font-extrabold text-[#012169] mb-1">Amount Per Tenant (₹)</label>
              <input
                type="number"
                value={dueAmount}
                onChange={e => setDueAmount(e.target.value)}
                className="w-full bg-[#f8fafc] border border-slate-300 rounded-xl p-2.5 font-bold focus:border-[#009cde]"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-[#009cde] hover:bg-[#0080b8] text-white font-extrabold text-xs sm:text-sm shadow-xs transition-transform active:scale-95"
            >
              Apply Dues to Active Tenants
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
