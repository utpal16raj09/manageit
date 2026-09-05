import React from 'react';
import { useProperty } from '../context/PropertyContext';
import { Building2, ChevronRight } from 'lucide-react';

export const MultiPropertyComparisonWidget: React.FC = () => {
  const { properties, setSelectedPropertyId, setActiveTab } = useProperty();

  const formatCurrency = (val: number) => '₹' + val.toLocaleString('en-IN');

  return (
    <div className="mustard-screen-card p-4.5 sm:p-5 rounded-2xl space-y-4.5 bg-white border border-slate-200 font-sans shadow-2xs">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="p-2.5 rounded-xl bg-[#e0f2fe] text-[#009cde] border border-[#009cde]/30 shadow-xs">
            <Building2 className="w-5 h-5 stroke-[2]" />
          </div>
          <div>
            <h3 className="text-sm sm:text-base font-extrabold text-[#012169] font-display">Multi-Property Portfolio Matrix</h3>
            <p className="text-xs font-semibold text-slate-500">Side-by-side comparative performance</p>
          </div>
        </div>

        <button
          onClick={() => setActiveTab('properties')}
          className="px-3 py-1.5 rounded-lg bg-[#009cde] text-white font-extrabold text-xs hover:bg-[#0080b8] flex items-center gap-1 transition-colors shadow-xs cursor-pointer"
        >
          <span>View Directory</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Responsive Comparison Table */}
      <div className="overflow-x-auto no-scrollbar pt-1">
        <table className="w-full text-left text-xs sm:text-sm">
          <thead>
            <tr className="border-b border-slate-200 text-[#003087] uppercase font-extrabold text-[11px] tracking-wider">
              <th className="py-2.5 px-3">Property Name</th>
              <th className="py-2.5 px-3">Occupancy Rate</th>
              <th className="py-2.5 px-3">Expected Rent</th>
              <th className="py-2.5 px-3">Collected Rent</th>
              <th className="py-2.5 px-3">Outstanding Dues</th>
              <th className="py-2.5 px-3 text-center">Open Tickets</th>
              <th className="py-2.5 px-3 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {properties.map(p => {
              const occPct = Math.round((p.occupiedUnitsCount / p.unitsCount) * 100);
              const colPct = p.expectedRent > 0 ? Math.round((p.collectedThisMonth / p.expectedRent) * 100) : 0;

              return (
                <tr key={p.id} className="hover:bg-[#f0f7ff] transition-colors group">
                  <td className="py-3 px-3 font-extrabold text-[#012169] flex items-center gap-2.5">
                    <img src={p.photo} alt={p.name} className="w-8 h-8 rounded-xl object-cover border border-slate-200 shadow-xs flex-shrink-0" />
                    <div>
                      <div className="font-extrabold text-xs sm:text-sm text-[#012169] group-hover:text-[#009cde] transition-colors">{p.name}</div>
                      <div className="text-[11px] text-slate-500 font-medium">{p.address}</div>
                    </div>
                  </td>

                  <td className="py-3 px-3">
                    <div className="font-extrabold text-xs sm:text-sm text-[#012169]">{p.occupiedUnitsCount}/{p.unitsCount} ({occPct}%)</div>
                    <div className="w-24 h-1.5 rounded-full bg-slate-100 overflow-hidden mt-1 border border-slate-200">
                      <div className="h-full bg-[#009cde] rounded-full" style={{ width: `${occPct}%` }} />
                    </div>
                  </td>

                  <td className="py-3 px-3 font-extrabold text-xs sm:text-sm text-[#012169] font-mono-amount">
                    {formatCurrency(p.expectedRent)}
                  </td>

                  <td className="py-3 px-3">
                    <div className="font-extrabold text-xs sm:text-sm text-[#003087] font-mono-amount">{formatCurrency(p.collectedThisMonth)}</div>
                    <div className="text-[10px] text-[#009cde] font-extrabold">{colPct}% collected</div>
                  </td>

                  <td className="py-3 px-3 font-extrabold text-xs sm:text-sm text-[#003087] font-mono-amount">
                    {formatCurrency(p.duesThisMonth)}
                  </td>

                  <td className="py-3 px-3 text-center">
                    {p.pendingComplaintsCount > 0 ? (
                      <span className="px-2 py-0.5 rounded-md text-[11px] font-extrabold bg-[#f0f7ff] text-[#003087] border border-[#009cde]/30">
                        {p.pendingComplaintsCount} Pending
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded-md text-[11px] font-extrabold bg-slate-100 text-slate-600 border border-slate-200">
                        All Resolved
                      </span>
                    )}
                  </td>

                  <td className="py-3 px-3 text-right">
                    <button
                      onClick={() => {
                        setSelectedPropertyId(p.id);
                        setActiveTab('properties');
                      }}
                      className="px-3 py-1 rounded-lg bg-[#003087] text-white font-extrabold text-xs hover:bg-[#012169] shadow-xs transition-transform active:scale-95 cursor-pointer"
                    >
                      Scope
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
