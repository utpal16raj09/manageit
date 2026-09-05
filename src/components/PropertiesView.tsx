import React from 'react';
import { useProperty } from '../context/PropertyContext';
import {
  ScribbleBuilding,
  ScribblePlus,
  ScribbleQR,
  ScribblePropertyIllustration
} from './ScribbleIcons';
import { ChevronDown, ChevronUp, MapPin, UserPlus, PhoneCall, CreditCard } from 'lucide-react';

export const PropertiesView: React.FC = () => {
  const {
    properties,
    units,
    tenants,
    selectedPropertyId,
    setIsQuickAddOpen,
    setIsTenantQROpen,
    setSelectedReceiptPayment,
    payments
  } = useProperty();

  const [expandedPropId, setExpandedPropId] = React.useState<string | null>(properties[0]?.id || null);

  const displayedProperties = selectedPropertyId === 'all'
    ? properties
    : properties.filter(p => p.id === selectedPropertyId);

  const formatCurrency = (val: number) => '₹' + val.toLocaleString('en-IN');

  const handleRecordPayment = (tenantId: string) => {
    const tenantPayment = payments.find(p => p.tenantId === tenantId) || payments[0];
    if (tenantPayment) {
      setSelectedReceiptPayment(tenantPayment);
    }
  };

  return (
    <div className="space-y-8 font-sans">
      {/* Top Title & Centered Actions */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
        <div className="flex items-center gap-3.5 justify-center sm:justify-start">
          <ScribblePropertyIllustration className="w-10 h-10 text-[#003087] dark:text-[#f8fafc] flex-shrink-0" />
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#012169] dark:text-[#f8fafc] tracking-tight">Properties & Units Directory</h2>
            <p className="text-xs sm:text-sm font-semibold text-slate-500 dark:text-slate-400">Portfolio buildings, floors, rooms, and tenant allocations</p>
          </div>
        </div>

        <div className="flex items-center justify-center gap-2.5 w-full sm:w-auto">
          <button
            onClick={() => setIsTenantQROpen(true)}
            className="flex-1 sm:flex-none justify-center px-4 py-2.5 rounded-xl bg-white border border-slate-200 hover:bg-[#f0f7ff] text-[#003087] font-extrabold text-xs sm:text-sm shadow-xs flex items-center gap-2 transition-all"
          >
            <ScribbleQR className="w-4 h-4 text-[#009cde]" />
            <span>Tenant QR</span>
          </button>
          <button
            onClick={() => setIsQuickAddOpen(true)}
            className="flex-1 sm:flex-none justify-center px-5 py-2.5 rounded-xl bg-[#009cde] hover:bg-[#0080b8] text-white font-extrabold text-xs sm:text-sm shadow-xs flex items-center gap-2 transition-transform active:scale-95"
          >
            <ScribblePlus className="w-4 h-4 stroke-[3]" />
            <span>Add Property / Unit</span>
          </button>
        </div>
      </div>

      {/* Property Cards */}
      <div className="space-y-6">
        {displayedProperties.map(property => {
          const isExpanded = expandedPropId === property.id;
          const propUnits = units.filter(u => u.propertyId === property.id);
          const occupancyRate = property.unitsCount > 0
            ? Math.round((property.occupiedUnitsCount / property.unitsCount) * 100)
            : 0;

          return (
            <div
              key={property.id}
              className="rounded-3xl bg-white border border-slate-200/90 shadow-xs overflow-hidden transition-all hover:border-[#009cde]"
            >
              {/* Card Body */}
              <div className="p-5 sm:p-7 space-y-5">
                {/* Header Row with ScribbleBuilding Icon */}
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3.5">
                    <div className="p-2.5 rounded-2xl bg-[#f0f7ff] border border-[#009cde]/30 text-[#003087] flex items-center justify-center flex-shrink-0">
                      <ScribbleBuilding className="w-6 h-6 text-[#003087] stroke-[2.2]" />
                    </div>
                    <div>
                      <h3 className="text-lg sm:text-xl font-extrabold text-[#012169] leading-tight">{property.name}</h3>
                      <div className="flex items-center gap-1.5 text-xs text-slate-500 font-semibold mt-1">
                        <MapPin className="w-3.5 h-3.5 text-[#009cde]" />
                        <span>{property.address}, {property.city}</span>
                      </div>
                    </div>
                  </div>

                  <span className="px-2.5 py-1 rounded-lg text-xs font-extrabold bg-[#f0f7ff] text-[#003087] border border-[#009cde]/30 flex-shrink-0">
                    Active Property
                  </span>
                </div>

                {/* Key Metrics Strip */}
                <div className="grid grid-cols-2 gap-4 p-4 rounded-2xl bg-[#f8fafc] border border-slate-100">
                  <div>
                    <div className="text-[10px] sm:text-xs font-extrabold uppercase tracking-wider text-slate-400">Occupancy</div>
                    <div className="text-base sm:text-lg font-extrabold text-[#003087] font-mono-amount mt-0.5">
                      {property.occupiedUnitsCount} / {property.unitsCount} <span className="text-xs font-bold text-[#009cde]">({occupancyRate}%)</span>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-[10px] sm:text-xs font-extrabold uppercase tracking-wider text-slate-400">Monthly Collected</div>
                    <div className="text-base sm:text-lg font-extrabold text-[#012169] font-mono-amount mt-0.5">
                      {formatCurrency(property.collectedThisMonth)}
                    </div>
                  </div>
                </div>
              </div>

              {/* Integrated Bottom Accordion Bar */}
              <button
                onClick={() => setExpandedPropId(isExpanded ? null : property.id)}
                className="w-full py-3.5 px-6 bg-slate-50 hover:bg-[#f0f7ff] border-t border-slate-100 flex items-center justify-between transition-colors text-xs sm:text-sm font-extrabold text-[#003087] cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <ScribbleBuilding className="w-4 h-4 text-[#009cde] stroke-[2.2]" />
                  <span>View Units & Resident Roster ({propUnits.length} Units)</span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-500">
                  <span className="text-xs font-bold">{isExpanded ? 'Hide' : 'Expand'}</span>
                  {isExpanded ? <ChevronUp className="w-4 h-4 text-[#009cde]" /> : <ChevronDown className="w-4 h-4 text-[#009cde]" />}
                </div>
              </button>

              {/* Expanded Units Grid */}
              {isExpanded && (
                <div className="p-5 sm:p-7 bg-[#fcfcfd] border-t border-slate-200 space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {propUnits.map(unit => {
                      const tenant = tenants.find(t => t.id === unit.tenantId || t.unitId === unit.id);
                      const isVacant = unit.status === 'vacant' || !tenant;

                      return (
                        <div
                          key={unit.id}
                          className={`p-4 rounded-2xl border transition-all space-y-3 ${
                            isVacant
                              ? 'bg-amber-50/50 border-amber-200/80 hover:border-amber-400'
                              : 'bg-white border-slate-200 shadow-2xs hover:border-[#009cde]'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-sm sm:text-base font-extrabold text-[#012169]">{unit.unitNumber}</span>
                            <span className={`px-2 py-0.5 rounded-md text-[10px] font-extrabold ${
                              isVacant ? 'bg-amber-100 text-amber-900 border border-amber-300' : 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                            }`}>
                              {isVacant ? 'VACANT' : 'OCCUPIED'}
                            </span>
                          </div>

                          {!isVacant && tenant ? (
                            <div className="p-3 rounded-xl bg-[#f8fafc] border border-slate-200 space-y-2.5">
                              <div className="flex items-center gap-3">
                                <img src={tenant.avatarUrl} alt={tenant.name} className="w-9 h-9 rounded-full object-cover border border-slate-200 shadow-xs flex-shrink-0" />
                                <div className="min-w-0 flex-1">
                                  <div className="text-xs sm:text-sm font-extrabold text-[#012169] truncate">{tenant.name}</div>
                                  <div className="text-xs text-[#009cde] font-mono-amount font-extrabold">{formatCurrency(tenant.monthlyRent)} /mo</div>
                                </div>
                              </div>

                              <div className="flex items-center gap-2 pt-1 border-t border-slate-100">
                                <a
                                  href={`tel:${tenant.phone}`}
                                  className="flex-1 py-1.5 px-2 rounded-lg bg-white border border-slate-200 text-[11px] font-extrabold text-slate-700 hover:bg-[#f0f7ff] hover:text-[#003087] flex items-center justify-center gap-1 transition-colors"
                                >
                                  <PhoneCall className="w-3 h-3 text-[#009cde]" />
                                  <span>Call</span>
                                </a>
                                <button
                                  onClick={() => handleRecordPayment(tenant.id)}
                                  className="flex-1 py-1.5 px-2 rounded-lg bg-[#009cde] text-white text-[11px] font-extrabold hover:bg-[#0080b8] flex items-center justify-center gap-1 transition-colors"
                                >
                                  <CreditCard className="w-3 h-3" />
                                  <span>Receipt</span>
                                </button>
                              </div>
                            </div>
                          ) : (
                            <button
                              onClick={() => setIsQuickAddOpen(true)}
                              className="w-full p-3 rounded-xl bg-white hover:bg-amber-100/50 border border-dashed border-amber-300 text-center transition-all group space-y-1 block"
                            >
                              <div className="text-xs font-extrabold text-amber-900 flex items-center justify-center gap-1.5">
                                <UserPlus className="w-3.5 h-3.5 text-amber-600 group-hover:scale-110 transition-transform" />
                                <span>+ Onboard New Tenant</span>
                              </div>
                              <div className="text-[11px] font-bold text-amber-700 font-mono-amount">
                                Market Rent: {formatCurrency(unit.rentAmount)} /mo
                              </div>
                            </button>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
