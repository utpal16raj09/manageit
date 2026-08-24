import React, { useState } from 'react';
import { Home, CreditCard, MessageSquare, Bell, FileText, Settings, ArrowLeft, CheckCircle2, Clock, Check, Utensils, Gift, QrCode, X, ChevronDown, Download } from 'lucide-react';
import { useProperty } from '../context/PropertyContext';
import { ScribbleUsers, ScribbleClock } from './ScribbleIcons';
import { Complaint } from '../types/property';

export const TenantDashboardView: React.FC = () => {
  const { activeTab, setActiveTab, setIsNotificationsOpen, complaints, addComplaint, properties, payments, setSelectedReceiptPayment } = useProperty();

  const [isNewTicketOpen, setIsNewTicketOpen] = useState(false);
  const [newCategory, setNewCategory] = useState<Complaint['category']>('Plumbing');
  const [newPriority, setNewPriority] = useState<Complaint['priority']>('Medium');
  const [newDesc, setNewDesc] = useState('');

  const [isModalCatOpen, setIsModalCatOpen] = useState(false);
  const [isModalPrioOpen, setIsModalPrioOpen] = useState(false);

  const handleCreateTicket = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDesc.trim()) return;

    addComplaint({
      propertyId: properties[0]?.id || 'prop-1',
      propertyName: properties[0]?.name || 'Sunrise PG',
      unitNumber: 'Room 101A',
      category: newCategory,
      priority: newPriority,
      description: newDesc,
      reportedByTenant: 'John Doe',
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
    <div className="space-y-6 animate-in fade-in duration-300 pb-20 lg:pb-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {activeTab !== 'tenant-dashboard' && (
            <button
              onClick={() => setActiveTab('tenant-dashboard')}
              className="p-2 rounded-xl bg-slate-100 text-slate-600 hover:bg-[#003087] hover:text-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
          )}
          <div>
            <h2 className="text-2xl font-black text-[#012169] tracking-tight">
              {activeTab === 'tenant-dashboard' && 'Tenant Portal'}
              {activeTab === 'tenant-payments' && 'Payment History'}
              {activeTab === 'tenant-support' && 'Support Requests'}
              {activeTab === 'tenant-documents' && 'My Documents'}
              {activeTab === 'tenant-food' && 'Mess & Food Menu'}
              {activeTab === 'tenant-referrals' && 'Refer & Earn'}
              {activeTab === 'tenant-qr' && 'Digital Gate Pass'}
            </h2>
            <p className="text-sm text-slate-500 font-medium mt-1">Welcome back, John Doe</p>
          </div>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={() => setIsNotificationsOpen(true)}
            className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:text-[#003087] hover:border-[#003087] transition-colors shadow-sm relative cursor-pointer"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-rose-500 rounded-full border-2 border-white" />
          </button>
        </div>
      </div>

      {activeTab === 'tenant-dashboard' && (
        <>
          {/* Accommodation Details Card */}
          <div className="bg-gradient-to-br from-[#003087] to-[#012169] rounded-3xl p-6 text-white shadow-lg relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
            <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              <div>
                <p className="text-white/70 text-sm font-bold uppercase tracking-wider mb-1">Your Accommodation</p>
                <h3 className="text-3xl font-black mb-2">Sunrise PG - Room 101A</h3>
                <p className="text-white/90">Lease: Aug 2026 - Jul 2027</p>
              </div>
              <div className="bg-white/10 p-4 rounded-2xl backdrop-blur-md border border-white/20 min-w-[200px]">
                <p className="text-white/70 text-xs font-bold uppercase mb-1">Upcoming Due</p>
                <p className="text-2xl font-black mb-2">₹14,000</p>
                <button className="w-full py-2 bg-white text-[#003087] font-bold rounded-xl hover:bg-slate-100 transition-colors text-sm">
                  Pay Now
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Quick Links */}
            <div
              onClick={() => setActiveTab('tenant-payments')}
              className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex flex-col justify-center items-center text-center cursor-pointer hover:border-[#003087] transition-colors group"
            >
              <div className="w-12 h-12 rounded-full bg-slate-50 group-hover:bg-[#003087]/5 flex items-center justify-center mb-3 transition-colors">
                <CreditCard className="w-6 h-6 text-slate-400 group-hover:text-[#003087]" />
              </div>
              <h4 className="font-bold text-slate-800">Payment History</h4>
              <p className="text-xs text-slate-500 mt-1">View receipts and past dues</p>
            </div>

            <div
              onClick={() => setActiveTab('tenant-support')}
              className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex flex-col justify-center items-center text-center cursor-pointer hover:border-[#003087] transition-colors group"
            >
              <div className="w-12 h-12 rounded-full bg-slate-50 group-hover:bg-[#003087]/5 flex items-center justify-center mb-3 transition-colors">
                <MessageSquare className="w-6 h-6 text-slate-400 group-hover:text-[#003087]" />
              </div>
              <h4 className="font-bold text-slate-800">Support Requests</h4>
              <p className="text-xs text-slate-500 mt-1">Raise maintenance issues</p>
            </div>

            <div
              onClick={() => setActiveTab('tenant-documents')}
              className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex flex-col justify-center items-center text-center cursor-pointer hover:border-[#003087] transition-colors group"
            >
              <div className="w-12 h-12 rounded-full bg-slate-50 group-hover:bg-[#003087]/5 flex items-center justify-center mb-3 transition-colors">
                <FileText className="w-6 h-6 text-slate-400 group-hover:text-[#003087]" />
              </div>
              <h4 className="font-bold text-slate-800">Documents</h4>
              <p className="text-xs text-slate-500 mt-1">Lease agreement and KYC</p>
            </div>

            <div
              onClick={() => setActiveTab('tenant-food')}
              className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex flex-col justify-center items-center text-center cursor-pointer hover:border-[#003087] transition-colors group"
            >
              <div className="w-12 h-12 rounded-full bg-slate-50 group-hover:bg-[#003087]/5 flex items-center justify-center mb-3 transition-colors">
                <Utensils className="w-6 h-6 text-slate-400 group-hover:text-[#003087]" />
              </div>
              <h4 className="font-bold text-slate-800">Food Menu</h4>
              <p className="text-xs text-slate-500 mt-1">This week's mess meals</p>
            </div>

            <div
              onClick={() => setActiveTab('tenant-referrals')}
              className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex flex-col justify-center items-center text-center cursor-pointer hover:border-[#003087] transition-colors group"
            >
              <div className="w-12 h-12 rounded-full bg-slate-50 group-hover:bg-[#003087]/5 flex items-center justify-center mb-3 transition-colors">
                <Gift className="w-6 h-6 text-slate-400 group-hover:text-[#003087]" />
              </div>
              <h4 className="font-bold text-slate-800">Refer & Earn</h4>
              <p className="text-xs text-slate-500 mt-1">Invite friends, get ₹1000 off</p>
            </div>

            <div
              onClick={() => setActiveTab('tenant-qr')}
              className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex flex-col justify-center items-center text-center cursor-pointer hover:border-[#003087] transition-colors group"
            >
              <div className="w-12 h-12 rounded-full bg-slate-50 group-hover:bg-[#003087]/5 flex items-center justify-center mb-3 transition-colors">
                <QrCode className="w-6 h-6 text-slate-400 group-hover:text-[#003087]" />
              </div>
              <h4 className="font-bold text-slate-800">My QR Pass</h4>
              <p className="text-xs text-slate-500 mt-1">Digital entry gate pass</p>
            </div>
          </div>

          {/* Notice Board */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <h3 className="font-bold text-slate-800 flex items-center">
                <Bell className="w-4 h-4 mr-2 text-slate-400" />
                Important Updates
              </h3>
            </div>
            <div className="p-5 space-y-4">
              <div className="flex gap-4">
                <div className="w-2 h-2 mt-2 rounded-full bg-emerald-500 shrink-0" />
                <div>
                  <h4 className="font-bold text-slate-800 text-sm">Water Supply Maintenance</h4>
                  <p className="text-sm text-slate-600 mt-1">Water supply will be affected tomorrow between 2 PM to 4 PM due to municipal maintenance work.</p>
                  <p className="text-xs text-slate-400 mt-2">Posted 2 hours ago</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-2 h-2 mt-2 rounded-full bg-blue-500 shrink-0" />
                <div>
                  <h4 className="font-bold text-slate-800 text-sm">Rent Due Reminder</h4>
                  <p className="text-sm text-slate-600 mt-1">Please note that rent for September is due on the 1st. Avoid late fees by paying on time.</p>
                  <p className="text-xs text-slate-400 mt-2">Posted 1 day ago</p>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {activeTab === 'tenant-payments' && (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden animate-in slide-in-from-right-4 duration-300">
          <div className="p-6 border-b border-slate-100">
            <h3 className="text-lg font-extrabold text-[#012169]">Recent Payments</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[600px]">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-xs font-bold text-slate-500 uppercase tracking-wider">
                  <th className="p-4 pl-6">Receipt ID</th>
                  <th className="p-4">Month</th>
                  <th className="p-4">Amount</th>
                  <th className="p-4">Paid On</th>
                  <th className="p-4">Status</th>
                </tr>
              </thead>
              <tbody className="text-sm font-semibold text-[#012169]">
                {payments.map((payment) => (
                  <tr key={payment.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                    <td className="p-4 pl-6">
                      <button
                        onClick={() => setSelectedReceiptPayment(payment)}
                        className="text-[#009cde] hover:underline font-bold flex items-center gap-1.5 cursor-pointer"
                      >
                        {payment.receiptNumber}
                        <Download className="w-3.5 h-3.5" />
                      </button>
                    </td>
                    <td className="p-4">{new Date(payment.date).toLocaleString('default', { month: 'short', year: 'numeric' })}</td>
                    <td className="p-4 font-black">₹{payment.amount.toLocaleString('en-IN')}</td>
                    <td className="p-4 text-slate-500">{payment.date}</td>
                    <td className="p-4">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Paid
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'tenant-support' && (
        <div className="space-y-4 animate-in slide-in-from-right-4 duration-300">
          <div className="flex justify-end">
            <button
              onClick={() => setIsNewTicketOpen(true)}
              className="px-5 py-2.5 bg-[#009cde] hover:bg-[#0080b8] text-white font-extrabold rounded-xl shadow-xs transition-colors cursor-pointer"
            >
              + New Ticket
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {complaints.map(ticket => (
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
                      <span className={`text-xs font-black tracking-wider uppercase flex-shrink-0 ${ticket.priority === 'Urgent'
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

                  <div className="relative flex-shrink-0">
                    <div className={`px-3 py-1.5 rounded-xl text-xs font-extrabold border flex items-center justify-center shadow-2xs ${statusColors[ticket.status].replace(/hover:bg-[a-z]+-[0-9]+/g, '')}`}>
                      <span>{ticket.status}</span>
                    </div>
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
        </div>
      )}

      {activeTab === 'tenant-documents' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 animate-in slide-in-from-right-4 duration-300">
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex items-start gap-4 hover:border-[#009cde] transition-colors cursor-pointer group">
            <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center flex-shrink-0 group-hover:bg-[#003087]/5">
              <FileText className="w-6 h-6 text-[#003087]" />
            </div>
            <div>
              <h4 className="font-extrabold text-[#012169] mb-1">Lease Agreement</h4>
              <p className="text-xs text-slate-500 mb-3">Signed on 01 Aug 2026. Valid until 31 Jul 2027.</p>
              <span className="text-xs font-bold text-[#009cde] hover:underline">View PDF</span>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex items-start gap-4 hover:border-[#009cde] transition-colors cursor-pointer group">
            <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center flex-shrink-0 group-hover:bg-[#003087]/5">
              <CheckCircle2 className="w-6 h-6 text-[#003087]" />
            </div>
            <div>
              <h4 className="font-extrabold text-[#012169] mb-1">KYC Documents</h4>
              <p className="text-xs text-slate-500 mb-3">Aadhaar Card ending in 4567. Verified.</p>
              <span className="text-xs font-bold text-[#009cde] hover:underline">View Details</span>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'tenant-food' && (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden animate-in slide-in-from-right-4 duration-300">
          <div className="p-6 border-b border-slate-100 flex items-center justify-between">
            <h3 className="text-lg font-extrabold text-[#012169]">This Week's Menu</h3>
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">Active Subscription</span>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50">
                <h4 className="font-extrabold text-[#003087] mb-2">Breakfast (8:00 AM - 10:00 AM)</h4>
                <p className="text-sm text-slate-600 font-medium">Idli, Sambar, Coconut Chutney, Tea/Coffee</p>
              </div>
              <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50">
                <h4 className="font-extrabold text-[#003087] mb-2">Lunch (1:00 PM - 3:00 PM)</h4>
                <p className="text-sm text-slate-600 font-medium">Rice, Dal Tadka, Paneer Butter Masala, Roti, Salad</p>
              </div>
              <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50">
                <h4 className="font-extrabold text-[#003087] mb-2">Dinner (8:00 PM - 10:00 PM)</h4>
                <p className="text-sm text-slate-600 font-medium">Veg Pulao, Mix Veg Curry, Roti, Gulab Jamun</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'tenant-referrals' && (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden animate-in slide-in-from-right-4 duration-300 text-center p-8">
          <div className="w-16 h-16 rounded-full bg-blue-50 mx-auto flex items-center justify-center mb-4">
            <Gift className="w-8 h-8 text-[#009cde]" />
          </div>
          <h3 className="text-xl font-extrabold text-[#012169] mb-2">Refer a Friend, Earn ₹1,000</h3>
          <p className="text-slate-500 font-medium max-w-md mx-auto mb-6">
            Share your unique referral code with friends. When they move in, you get ₹1,000 off your next month's rent!
          </p>
          <div className="inline-flex items-center gap-3 p-3 bg-slate-50 border border-slate-200 rounded-xl mb-4">
            <span className="font-black text-lg tracking-widest text-[#003087]">JD-SUNRISE-26</span>
            <button className="px-4 py-1.5 bg-[#012169] text-white text-xs font-bold rounded-lg hover:bg-[#003087] transition-colors cursor-pointer">
              Copy Code
            </button>
          </div>
          <p className="text-xs text-slate-400 font-semibold">Total Earned: ₹2,000 (2 successful referrals)</p>
        </div>
      )}

      {activeTab === 'tenant-qr' && (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden animate-in slide-in-from-right-4 duration-300 flex flex-col items-center justify-center p-8">
          <h3 className="text-xl font-extrabold text-[#012169] mb-6">Digital Gate Pass</h3>
          <div className="p-4 bg-white border-4 border-[#012169] rounded-3xl shadow-xl mb-6">
            <QrCode className="w-48 h-48 text-[#012169]" />
          </div>
          <h4 className="font-black text-lg text-[#012169]">John Doe</h4>
          <p className="text-slate-500 font-bold mb-4">Sunrise PG • Room 101A</p>
          <div className="px-4 py-2 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-xl text-sm font-bold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" />
            Valid Identity
          </div>
        </div>
      )}

      {/* New Ticket Modal */}
      {isNewTicketOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#012169]/60 backdrop-blur-xs p-3 sm:p-4 font-sans overflow-y-auto">
          <div className="bg-white text-[#012169] border border-slate-200 rounded-3xl w-full max-w-lg p-5 sm:p-8 space-y-5 shadow-2xl my-auto relative">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <h3 className="text-lg sm:text-xl font-extrabold text-[#012169]">Raise Maintenance Ticket</h3>
              <button onClick={() => setIsNewTicketOpen(false)} className="p-2 rounded-xl bg-slate-100 text-[#012169] hover:bg-slate-200 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateTicket} className="space-y-4 text-xs sm:text-sm">
              <div className="grid grid-cols-2 gap-3">
                {/* Category Custom Popover */}
                <div className="relative">
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
                          className={`w-full px-3 py-2 rounded-lg text-left text-xs sm:text-sm font-bold flex items-center justify-between transition-colors ${newCategory === cat ? 'bg-[#e0f2fe] text-[#003087]' : 'text-slate-700 hover:bg-[#f8fafc]'
                            }`}
                        >
                          <span>{cat}</span>
                          {newCategory === cat && <Check className="w-4 h-4 text-[#009cde]" />}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Priority Level Custom Popover */}
                <div className="relative">
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
                          className={`w-full px-3 py-2 rounded-lg text-left text-xs sm:text-sm font-bold flex items-center justify-between transition-colors ${newPriority === prio ? 'bg-[#e0f2fe] text-[#003087]' : 'text-slate-700 hover:bg-[#f8fafc]'
                            }`}
                        >
                          <span>{prio}</span>
                          {newPriority === prio && <Check className="w-4 h-4 text-[#009cde]" />}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className="block font-extrabold text-[#012169] mb-1">Issue Description</label>
                <textarea
                  rows={3}
                  placeholder="Describe the complaint in detail..."
                  value={newDesc}
                  onChange={e => setNewDesc(e.target.value)}
                  className="w-full bg-[#f8fafc] border border-slate-300 rounded-xl p-3 font-medium focus:border-[#009cde] outline-none"
                />
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsNewTicketOpen(false)}
                  className="px-5 py-2.5 rounded-xl bg-slate-100 text-slate-700 font-extrabold cursor-pointer hover:bg-slate-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-[#009cde] text-white font-extrabold hover:bg-[#0080b8] shadow-xs cursor-pointer"
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
