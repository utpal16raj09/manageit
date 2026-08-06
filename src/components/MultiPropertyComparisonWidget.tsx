import React from 'react';
import { useProperty } from '../context/PropertyContext';
import { Building2, ChevronRight } from 'lucide-react';

export const MultiPropertyComparisonWidget: React.FC = () => {
  const { properties, setSelectedPropertyId, setActiveTab } = useProperty();

  const formatCurrency = (val: number) => '₹' + val.toLocaleString('en-IN');

  return (
    <div className="mustard-screen-card p-6 sm:p-7 rounded-3xl space-y-6 bg-white border border-slate-200 font-sans shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3.5">
          <div className="p-3 rounded-2xl bg-[#e0f2fe] text-[#009cde] border border-[#009cde]/30 shadow-xs">
            <Building2 className="w-6 h-6 stroke-[2.2]" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-extrabold text-[#012169] font-display">Multi-Property Portfolio Matrix</h3>
            <p className="text-xs sm:text-sm font-semibold text-slate-500">Side-by-side comparative performance</p>
          </div>
        </div>

        <button
          onClick={() => setActiveTab('properties')}
          className="px-4 py-2 rounded-xl bg-[#009cde] text-white font-extrabold text-xs sm:text-sm hover:bg-[#0080b8] flex items-center gap-1.5 transition-colors shadow-xs"
        >
          <span>View Directory</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Responsive Comparison Table */}
      <div className="overflow-x-auto no-scrollbar pt-2">
        <table className="w-full text-left text-xs sm:text-sm">
          <thead>
            <tr className="border-b border-slate-200 text-[#003087] uppercase font-extrabold text-xs tracking-wider">
              <th className="py-3.5 px-4">Property Name</th>
              <th className="py-3.5 px-4">Occupancy Rate</th>
              <th className="py-3.5 px-4">Expected Rent</th>
              <th className="py-3.5 px-4">Collected Rent</th>
              <th className="py-3.5 px-4">Outstanding Dues</th>
              <th className="py-3.5 px-4 text-center">Open Tickets</th>
              <th className="py-3.5 px-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {properties.map(p => {
              const occPct = Math.round((p.occupiedUnitsCount / p.unitsCount) * 100);
              const colPct = p.expectedRent > 0 ? Math.round((p.collectedThisMonth / p.expectedRent) * 100) : 0;

              return (
                <tr key={p.id} className="hover:bg-[#f0f7ff] transition-colors group">
                  <td className="py-4 px-4 font-extrabold text-[#012169] flex items-center gap-3.5">
                    <img src={p.photo} alt={p.name} className="w-10 h-10 rounded-2xl object-cover border border-slate-200 shadow-xs flex-shrink-0" />
                    <div>
                      <div className="font-extrabold text-sm sm:text-base text-[#012169] group-hover:text-[#009cde] transition-colors">{p.name}</div>
                      <div className="text-xs text-slate-500 font-semibold">{p.address}</div>
                    </div>
                  </td>

                  <td className="py-4 px-4">
                    <div className="font-extrabold text-sm sm:text-base text-[#012169]">{p.occupiedUnitsCount}/{p.unitsCount} ({occPct}%)</div>
                    <div className="w-28 h-2 rounded-full bg-slate-100 overflow-hidden mt-1.5 border border-slate-200">
                      <div className="h-full bg-[#009cde] rounded-full" style={{ width: `${occPct}%` }} />
                    </div>
                  </td>

                  <td className="py-4 px-4 font-extrabold text-sm sm:text-base text-[#012169] font-mono-amount">
                    {formatCurrency(p.expectedRent)}
                  </td>

                  <td className="py-4 px-4">
                    <div className="font-extrabold text-sm sm:text-base text-[#003087] font-mono-amount">{formatCurrency(p.collectedThisMonth)}</div>
                    <div className="text-xs text-[#009cde] font-extrabold">{colPct}% collected</div>
                  </td>

                  <td className="py-4 px-4 font-extrabold text-sm sm:text-base text-[#003087] font-mono-amount">
                    {formatCurrency(p.duesThisMonth)}
                  </td>

                  <td className="py-4 px-4 text-center">
                    {p.pendingComplaintsCount > 0 ? (
                      <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-[#e0f2fe] text-[#003087] border border-[#009cde]/30">
                        {p.pendingComplaintsCount} Pending
                      </span>
                    ) : (
                      <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-slate-100 text-slate-600 border border-slate-200">
                        All Resolved
                      </span>
                    )}
                  </td>

                  <td className="py-4 px-4 text-right">
                    <button
                      onClick={() => {
                        setSelectedPropertyId(p.id);
                        setActiveTab('properties');
                      }}
                      className="px-4 py-1.5 rounded-xl bg-[#003087] text-white font-extrabold text-xs sm:text-sm hover:bg-[#012169] shadow-xs transition-transform active:scale-95"
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
