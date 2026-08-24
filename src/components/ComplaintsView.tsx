import React, { useState, useRef, useEffect } from 'react';
import { useProperty } from '../context/PropertyContext';
import { Complaint } from '../types/property';
import {
  ScribbleComplaint,
  ScribblePlus,
  ScribbleUsers,
  ScribbleClock
} from './ScribbleIcons';
import { X, ChevronDown, Check, Filter } from 'lucide-react';

export const ComplaintsView: React.FC = () => {
  const { complaints, addComplaint, updateComplaintStatus, properties, selectedPropertyId, activeRole } = useProperty();

  const [filterStatus, setFilterStatus] = useState<'All' | 'Open' | 'In Progress' | 'Resolved'>('All');
  const [isNewTicketOpen, setIsNewTicketOpen] = useState(false);
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);
  const [isFilterDropdownOpen, setIsFilterDropdownOpen] = useState(false);

  const filterRef = useRef<HTMLDivElement>(null);
  const cardDropdownRef = useRef<HTMLDivElement>(null);

  // New ticket state
  const [newPropId, setNewPropId] = useState(properties[0]?.id || '');
  const [newUnitNum, setNewUnitNum] = useState('');
  const [newCategory, setNewCategory] = useState<Complaint['category']>('Plumbing');
  const [newPriority, setNewPriority] = useState<Complaint['priority']>('Urgent');
  const [newDesc, setNewDesc] = useState('');
  const [newTenant, setNewTenant] = useState('');

  // Custom dropdown states for modal
  const [isModalPropOpen, setIsModalPropOpen] = useState(false);
  const [isModalCatOpen, setIsModalCatOpen] = useState(false);
  const [isModalPrioOpen, setIsModalPrioOpen] = useState(false);

  const modalPropRef = useRef<HTMLDivElement>(null);
  const modalCatRef = useRef<HTMLDivElement>(null);
  const modalPrioRef = useRef<HTMLDivElement>(null);

  // Click-outside listener
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
        setIsFilterDropdownOpen(false);
      }
      if (cardDropdownRef.current && !cardDropdownRef.current.contains(event.target as Node)) {
        setOpenDropdownId(null);
      }
      if (modalPropRef.current && !modalPropRef.current.contains(event.target as Node)) {
        setIsModalPropOpen(false);
      }
      if (modalCatRef.current && !modalCatRef.current.contains(event.target as Node)) {
        setIsModalCatOpen(false);
      }
      if (modalPrioRef.current && !modalPrioRef.current.contains(event.target as Node)) {
        setIsModalPrioOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, []);

  const filteredComplaints = complaints.filter(c => {
    if (selectedPropertyId !== 'all' && c.propertyId !== selectedPropertyId) return false;
    if (filterStatus !== 'All' && c.status !== filterStatus) return false;
    return true;
  });

  const handleCreateTicket = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDesc.trim()) return;

    const prop = properties.find(p => p.id === newPropId);

    addComplaint({
      propertyId: newPropId,
      propertyName: prop?.name || 'Property',
      unitNumber: newUnitNum || 'Room 101',
      category: newCategory,
      priority: newPriority,
      description: newDesc,
      reportedByTenant: newTenant || 'Resident',
      assignedTo: 'Unassigned'
    });

    setIsNewTicketOpen(false);
    setNewDesc('');
  };

  const statusColors = {
    'Open': 'bg-rose-50 text-rose-700 border-rose-200 hover:bg-rose-100',
    'In Progress': 'bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100',
    'Resolved': 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100'
  };

  return (
    <div className="space-y-6 font-sans">
      {/* Top Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <ScribbleComplaint className="w-8 h-8 text-[#003087] stroke-[2.4]" />
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#012169]">Operation Ticket Center</h2>
            <p className="text-xs sm:text-sm font-semibold text-slate-500">Urgent operational issues & maintenance tracking</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Filter Dropdown with Click-Outside Listener */}
          <div ref={filterRef} className="relative">
            <button
              onClick={() => setIsFilterDropdownOpen(!isFilterDropdownOpen)}
              className="px-4 py-2.5 rounded-xl bg-white border border-slate-200 hover:bg-[#f0f7ff] text-[#003087] font-extrabold text-xs sm:text-sm shadow-xs flex items-center gap-2 transition-all"
            >
              <Filter className="w-4 h-4 text-[#009cde]" />
              <span>Status: <strong className="text-[#012169]">{filterStatus}</strong></span>
              <span className="px-2 py-0.5 rounded-full text-xs font-black bg-[#e0f2fe] text-[#003087]">
                {filterStatus === 'All' ? complaints.length : complaints.filter(c => c.status === filterStatus).length}
              </span>
              <ChevronDown className="w-4 h-4 text-slate-400" />
            </button>

            {isFilterDropdownOpen && (
              <div className="absolute left-0 top-full mt-2 w-48 bg-white border border-slate-200 rounded-2xl shadow-2xl py-2 z-30 animate-in fade-in zoom-in-95 duration-150">
                {(['All', 'Open', 'In Progress', 'Resolved'] as const).map(st => {
                  const count = st === 'All'
                    ? complaints.length
                    : complaints.filter(c => c.status === st).length;
                  const isSelected = filterStatus === st;

                  return (
                    <button
                      key={st}
                      onClick={() => {
                        setFilterStatus(st);
                        setIsFilterDropdownOpen(false);
                      }}
                      className={`w-full px-4 py-2.5 text-xs sm:text-sm font-extrabold flex items-center justify-between transition-colors ${
                        isSelected ? 'bg-[#f0f7ff] text-[#003087]' : 'text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <span>{st}</span>
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded-full text-xs font-black bg-[#e0f2fe] text-[#003087]">
                          {count}
                        </span>
                        {isSelected && <Check className="w-4 h-4 text-[#009cde]" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

        </div>
      </div>

      {/* Ticket Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredComplaints.map(ticket => (
          <div
            key={ticket.id}
            className="mustard-screen-card p-5 sm:p-7 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4 hover:border-[#009cde] transition-colors relative"
          >
            {/* Header row */}
            <div className="flex items-center justify-between gap-3 border-b border-slate-100 pb-3">
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 whitespace-nowrap overflow-hidden">
                  <h3 className="text-base sm:text-lg font-extrabold text-[#012169] truncate">
                    {ticket.category} Issue
                  </h3>
                  <span className="text-slate-300 font-bold">•</span>
                  <span className={`text-xs font-black tracking-wider uppercase flex-shrink-0 ${
                    ticket.priority === 'Urgent'
                      ? 'text-rose-600'
                      : ticket.priority === 'Medium'
                      ? 'text-amber-600'
                      : 'text-slate-500'
                  }`}>
                    {ticket.priority}
                  </span>
                </div>
                <div className="text-xs sm:text-sm font-semibold text-slate-500 mt-0.5 truncate">
                  {ticket.propertyName} • {ticket.unitNumber}
                </div>
              </div>

              {/* Card Status Dropdown with Click-Outside Ref */}
              <div ref={openDropdownId === ticket.id ? cardDropdownRef : null} className="relative flex-shrink-0">
                {activeRole === 'manager' ? (
                  <>
                    <button
                      onClick={() => setOpenDropdownId(openDropdownId === ticket.id ? null : ticket.id)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-extrabold border transition-all flex items-center gap-1.5 shadow-2xs ${statusColors[ticket.status]}`}
                    >
                      <span>{ticket.status}</span>
                      <ChevronDown className="w-3.5 h-3.5" />
                    </button>

                    {openDropdownId === ticket.id && (
                      <div className="absolute right-0 top-full mt-2 w-44 bg-white border border-slate-200 rounded-2xl shadow-2xl py-1.5 z-30 animate-in fade-in zoom-in-95 duration-150">
                        {(['Open', 'In Progress', 'Resolved'] as const).map(st => (
                          <button
                            key={st}
                            onClick={() => {
                              updateComplaintStatus(ticket.id, st);
                              setOpenDropdownId(null);
                            }}
                            className={`w-full px-4 py-2.5 text-xs sm:text-sm font-bold flex items-center justify-between transition-colors ${
                              ticket.status === st ? 'bg-[#f0f7ff] text-[#003087]' : 'text-slate-700 hover:bg-slate-50'
                            }`}
                          >
                            <span>{st}</span>
                            {ticket.status === st && <Check className="w-4 h-4 text-[#009cde]" />}
                          </button>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <div className={`px-3 py-1.5 rounded-xl text-xs font-extrabold border flex items-center justify-center shadow-2xs ${statusColors[ticket.status].replace(/hover:bg-[a-z]+-[0-9]+/g, '')}`}>
                    <span>{ticket.status}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[#f8fafc] border border-slate-200 text-xs sm:text-sm font-medium text-[#012169] leading-relaxed">
              "{ticket.description}"
            </div>

            <div className="flex flex-wrap items-center justify-between text-xs font-semibold text-slate-500 pt-2 gap-2">
              <div className="flex items-center gap-2 text-[#003087]">
                <ScribbleUsers className="w-4 h-4 text-[#009cde]" />
                <span>Assigned: {ticket.assignedTo || 'Unassigned'}</span>
              </div>
              <div className="flex items-center gap-2">
                <ScribbleClock className="w-4 h-4 text-slate-400" />
                <span>Reported by {ticket.reportedByTenant}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* New Ticket Modal */}
      {isNewTicketOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#012169]/60 backdrop-blur-xs p-3 sm:p-4 font-sans overflow-y-auto">
          <div className="bg-white text-[#012169] border border-slate-200 rounded-3xl w-full max-w-lg p-5 sm:p-8 space-y-5 shadow-2xl my-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <h3 className="text-lg sm:text-xl font-extrabold text-[#012169]">Raise Maintenance Ticket</h3>
              <button onClick={() => setIsNewTicketOpen(false)} className="p-2 rounded-xl bg-slate-100 text-[#012169] hover:bg-slate-200">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateTicket} className="space-y-4 text-xs sm:text-sm">
              {/* Select Property Custom Popover */}
              <div className="relative" ref={modalPropRef}>
                <label className="block font-extrabold text-[#012169] mb-1">Select Property</label>
                <button
                  type="button"
                  onClick={() => setIsModalPropOpen(prev => !prev)}
                  className="w-full bg-[#f8fafc] border border-slate-300 rounded-xl p-3 font-bold text-left flex items-center justify-between text-[#012169] hover:bg-white focus:border-[#009cde]"
                >
                  <span className="truncate">{properties.find(p => p.id === newPropId)?.name || 'Select Property'}</span>
                  <ChevronDown className={`w-4 h-4 text-slate-400 flex-shrink-0 transition-transform ${isModalPropOpen ? 'rotate-180' : ''}`} />
                </button>

                {isModalPropOpen && (
                  <div className="absolute left-0 right-0 top-full mt-1.5 bg-white border border-slate-200 rounded-xl shadow-xl p-1 z-50 max-h-48 overflow-y-auto space-y-0.5 animate-in fade-in zoom-in-95 duration-100">
                    {properties.map(p => (
                      <button
                        key={p.id}
                        type="button"
                        onClick={() => {
                          setNewPropId(p.id);
                          setIsModalPropOpen(false);
                        }}
                        className={`w-full px-3 py-2 rounded-lg text-left text-xs sm:text-sm font-bold flex items-center justify-between transition-colors ${
                          newPropId === p.id ? 'bg-[#e0f2fe] text-[#003087]' : 'text-slate-700 hover:bg-[#f8fafc]'
                        }`}
                      >
                        <span className="truncate">{p.name}</span>
                        {newPropId === p.id && <Check className="w-4 h-4 text-[#009cde]" />}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-extrabold text-[#012169] mb-1">Unit Number</label>
                  <input
                    type="text"
                    placeholder="e.g. Room 101"
                    value={newUnitNum}
                    onChange={e => setNewUnitNum(e.target.value)}
                    className="w-full bg-[#f8fafc] border border-slate-300 rounded-xl p-3 font-bold focus:border-[#009cde]"
                  />
                </div>

                {/* Category Custom Popover */}
                <div className="relative" ref={modalCatRef}>
                  <label className="block font-extrabold text-[#012169] mb-1">Category</label>
                  <button
                    type="button"
                    onClick={() => setIsModalCatOpen(prev => !prev)}
                    className="w-full bg-[#f8fafc] border border-slate-300 rounded-xl p-3 font-bold text-left flex items-center justify-between text-[#012169] hover:bg-white focus:border-[#009cde]"
                  >
                    <span>{newCategory}</span>
                    <ChevronDown className={`w-4 h-4 text-slate-400 flex-shrink-0 transition-transform ${isModalCatOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {isModalCatOpen && (
                    <div className="absolute left-0 right-0 top-full mt-1.5 bg-white border border-slate-200 rounded-xl shadow-xl p-1 z-50 max-h-48 overflow-y-auto space-y-0.5 animate-in fade-in zoom-in-95 duration-100">
                      {(['Plumbing', 'Electrical', 'Carpentry', 'Appliance', 'Internet', 'Security'] as const).map(cat => (
                        <button
                          key={cat}
                          type="button"
                          onClick={() => {
                            setNewCategory(cat);
                            setIsModalCatOpen(false);
                          }}
                          className={`w-full px-3 py-2 rounded-lg text-left text-xs sm:text-sm font-bold flex items-center justify-between transition-colors ${
                            newCategory === cat ? 'bg-[#e0f2fe] text-[#003087]' : 'text-slate-700 hover:bg-[#f8fafc]'
                          }`}
                        >
                          <span>{cat}</span>
                          {newCategory === cat && <Check className="w-4 h-4 text-[#009cde]" />}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Priority Level Custom Popover */}
              <div className="relative" ref={modalPrioRef}>
                <label className="block font-extrabold text-[#012169] mb-1">Priority Level</label>
                <button
                  type="button"
                  onClick={() => setIsModalPrioOpen(prev => !prev)}
                  className="w-full bg-[#f8fafc] border border-slate-300 rounded-xl p-3 font-bold text-left flex items-center justify-between text-[#012169] hover:bg-white focus:border-[#009cde]"
                >
                  <span>{newPriority}</span>
                  <ChevronDown className={`w-4 h-4 text-slate-400 flex-shrink-0 transition-transform ${isModalPrioOpen ? 'rotate-180' : ''}`} />
                </button>

                {isModalPrioOpen && (
                  <div className="absolute left-0 right-0 top-full mt-1.5 bg-white border border-slate-200 rounded-xl shadow-xl p-1 z-50 space-y-0.5 animate-in fade-in zoom-in-95 duration-100">
                    {(['Urgent', 'Medium', 'Low'] as const).map(prio => (
                      <button
                        key={prio}
                        type="button"
                        onClick={() => {
                          setNewPriority(prio);
                          setIsModalPrioOpen(false);
                        }}
                        className={`w-full px-3 py-2 rounded-lg text-left text-xs sm:text-sm font-bold flex items-center justify-between transition-colors ${
                          newPriority === prio ? 'bg-[#e0f2fe] text-[#003087]' : 'text-slate-700 hover:bg-[#f8fafc]'
                        }`}
                      >
                        <span>{prio}</span>
                        {newPriority === prio && <Check className="w-4 h-4 text-[#009cde]" />}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div>
                <label className="block font-extrabold text-[#012169] mb-1">Issue Description</label>
                <textarea
                  rows={3}
                  placeholder="Describe the complaint in detail..."
                  value={newDesc}
                  onChange={e => setNewDesc(e.target.value)}
                  className="w-full bg-[#f8fafc] border border-slate-300 rounded-xl p-3 font-medium focus:border-[#009cde]"
                />
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsNewTicketOpen(false)}
                  className="px-5 py-2.5 rounded-xl bg-slate-100 text-slate-700 font-extrabold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-[#009cde] text-white font-extrabold hover:bg-[#0080b8] shadow-xs"
                >
                  Submit Ticket
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
