import React, { useState } from 'react';
import { 
  Home, 
  CreditCard, 
  MessageSquare, 
  Bell, 
  FileText, 
  Settings, 
  ArrowLeft, 
  CheckCircle2, 
  Clock, 
  Check, 
  Utensils, 
  Gift, 
  QrCode, 
  X, 
  ChevronDown, 
  Download,
  Calendar,
  Sparkles,
  Info,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';
import { useProperty } from '../context/PropertyContext';
import { ScribbleUsers, ScribbleClock, ScribbleTenantIllustration } from './ScribbleIcons';
import { Complaint } from '../types/property';

export const TenantDashboardView: React.FC = () => {
  const { activeTab, setActiveTab, setIsNotificationsOpen, complaints, addComplaint, properties, payments, setSelectedReceiptPayment } = useProperty();

  const [isNewTicketOpen, setIsNewTicketOpen] = useState(false);
  const [newCategory, setNewCategory] = useState<Complaint['category']>('Plumbing');
  const [newPriority, setNewPriority] = useState<Complaint['priority']>('Medium');
  const [newDesc, setNewDesc] = useState('');

  const [isModalCatOpen, setIsModalCatOpen] = useState(false);
  const [isModalPrioOpen, setIsModalPrioOpen] = useState(false);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

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
    <div className="space-y-6 max-w-7xl mx-auto font-sans pb-16">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-white/[0.08]">
        <div className="flex items-center space-x-3">
          {activeTab !== 'tenant-dashboard' && (
            <button
              onClick={() => setActiveTab('tenant-dashboard')}
              className="p-2 rounded-xl bg-white dark:bg-[#121722] border border-slate-200 dark:border-white/[0.08] text-slate-600 dark:text-slate-300 hover:text-[#003087] hover:border-[#003087] transition-colors shadow-2xs"
            >
              <ArrowLeft className="w-5 h-5 stroke-[2.2]" />
            </button>
          )}
          <ScribbleTenantIllustration className="w-10 h-10 text-[#003087] dark:text-[#f8fafc] flex-shrink-0" />
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#012169] dark:text-[#f8fafc] tracking-tight">
              {activeTab === 'tenant-dashboard' && `${getGreeting()}, John!`}
              {activeTab === 'tenant-payments' && 'Payment History'}
              {activeTab === 'tenant-support' && 'Support Requests'}
              {activeTab === 'tenant-documents' && 'My Documents'}
              {activeTab === 'tenant-food' && 'Mess & Food Menu'}
              {activeTab === 'tenant-referrals' && 'Refer & Earn'}
              {activeTab === 'tenant-qr' && 'Digital Gate Pass'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium">
              {activeTab === 'tenant-dashboard' ? 'Welcome back to your resident portal' : 'Sunrise PG • Room 101A'}
            </p>
          </div>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={() => setIsNotificationsOpen(true)}
            className="w-10 h-10 rounded-xl bg-white dark:bg-[#121722] border border-slate-200 dark:border-white/[0.08] flex items-center justify-center text-slate-600 dark:text-slate-300 hover:text-[#003087] hover:border-[#003087] transition-colors shadow-2xs relative cursor-pointer"
          >
            <Bell className="w-5 h-5 stroke-[2]" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full" />
          </button>
        </div>
      </div>

      {activeTab === 'tenant-dashboard' && (
        <div className="space-y-5 sm:space-y-6">
          {/* Accommodation Details Card - Solid Minimal Luxury (No Gradients) */}
          <div className="bg-[#003087] dark:bg-[#121722] rounded-2xl p-4 sm:p-5 text-white border border-[#003087]/30 dark:border-white/[0.08] shadow-2xs relative overflow-hidden">
            <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div className="space-y-0.5">
                <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-white/10 text-white/90 text-[10px] font-extrabold uppercase tracking-wider mb-0.5 border border-white/15">
                  <Home className="w-3 h-3" />
                  <span>Your Accommodation</span>
                </div>
                <h3 className="text-lg sm:text-xl font-black tracking-tight">Sunrise PG - Room 101A</h3>
                <div className="flex items-center gap-1.5 text-white/80 text-xs font-medium">
                  <Calendar className="w-3 h-3 text-[#7dd3fc]" />
                  <span>Lease Term: Aug 2026 - Jul 2027</span>
                </div>
              </div>
              <div className="bg-white/10 dark:bg-white/[0.04] p-3.5 rounded-xl backdrop-blur-md border border-white/20 dark:border-white/[0.08] min-w-[180px]">
                <div className="flex items-center justify-between text-white/70 text-[10px] font-bold uppercase mb-0.5">
                  <span>Upcoming Due</span>
                  <span className="text-[10px] font-mono text-amber-300">Due in 5 days</span>
                </div>
                <p className="text-lg sm:text-xl font-black mb-2">₹14,000</p>
                <button className="w-full py-1.5 bg-white text-[#003087] font-extrabold rounded-lg hover:bg-slate-100 transition-colors text-xs shadow-xs cursor-pointer active:scale-95 flex items-center justify-center gap-1.5">
                  <CreditCard className="w-3 h-3" />
                  <span>Pay Now</span>
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-5">
            {/* Quick Links */}
            {[
              { id: 'tenant-payments', label: 'Payment History', desc: 'Receipts & past dues', icon: CreditCard },
              { id: 'tenant-support', label: 'Support Requests', desc: 'Maintenance issues', icon: MessageSquare },
              { id: 'tenant-documents', label: 'Documents', desc: 'Lease & KYC files', icon: FileText },
              { id: 'tenant-food', label: 'Food Menu', desc: "This week's meals", icon: Utensils },
              { id: 'tenant-referrals', label: 'Refer & Earn', desc: 'Get ₹1000 off rent', icon: Gift },
              { id: 'tenant-qr', label: 'My QR Pass', desc: 'Entry gate pass', icon: QrCode },
            ].map((card) => {
              const Icon = card.icon;
              return (
                <div
                  key={card.id}
                  onClick={() => setActiveTab(card.id as any)}
                  className="bg-white rounded-2xl p-3.5 border border-slate-200/90 shadow-2xs flex flex-col justify-center items-center text-center cursor-pointer hover:border-[#003087] hover:shadow-xs transition-all group"
                >
                  <div className="w-9 h-9 rounded-xl bg-slate-50 border border-slate-100/80 group-hover:bg-[#003087] group-hover:text-white group-hover:border-[#003087] flex items-center justify-center mb-2 transition-all duration-200 text-[#003087]">
                    <Icon className="w-4 h-4 stroke-[2]" />
                  </div>
                  <h4 className="font-extrabold text-xs text-[#012169] group-hover:text-[#003087] transition-colors">{card.label}</h4>
                  <p className="text-[10px] text-slate-400 font-medium mt-0.5">{card.desc}</p>
                </div>
              );
            })}
          </div>

          {/* Notice Board */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
            <div className="p-3.5 sm:p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <h3 className="font-extrabold text-xs sm:text-sm text-slate-800 flex items-center gap-2">
                <Info className="w-4 h-4 text-[#009cde]" />
                <span>Notice Board & Important Updates</span>
              </h3>
            </div>
            <div className="p-4 space-y-3">
              <div className="flex gap-3 items-start">
                <div className="p-1.5 rounded-lg bg-emerald-50 text-emerald-600 border border-emerald-200/60 shrink-0">
                  <Clock className="w-3.5 h-3.5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 text-xs sm:text-sm">Water Supply Maintenance</h4>
                  <p className="text-xs text-slate-600 mt-0.5">Water supply will be affected tomorrow between 2 PM to 4 PM due to municipal pipe servicing.</p>
                  <p className="text-[10px] font-semibold text-slate-400 mt-1">Posted 2 hours ago</p>
                </div>
              </div>
              <div className="flex gap-3 items-start">
                <div className="p-1.5 rounded-lg bg-blue-50 text-blue-600 border border-blue-200/60 shrink-0">
                  <CreditCard className="w-3.5 h-3.5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 text-xs sm:text-sm">Rent Due Reminder</h4>
                  <p className="text-xs text-slate-600 mt-0.5">Please note that rent for September is due on the 1st. Avoid late fees by transferring on time.</p>
                  <p className="text-[10px] font-semibold text-slate-400 mt-1">Posted 1 day ago</p>                </div>
              </div>
            </div>
          </div>
        </div>
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
            <div className="w-11 h-11 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center flex-shrink-0 group-hover:bg-[#003087] group-hover:text-white transition-all">
              <FileText className="w-5 h-5 text-[#003087] group-hover:text-white" />
            </div>
            <div>
              <h4 className="font-extrabold text-[#012169] mb-1">Lease Agreement</h4>
              <p className="text-xs text-slate-500 mb-3">Signed on 01 Aug 2026. Valid until 31 Jul 2027.</p>
              <span className="text-xs font-bold text-[#009cde] hover:underline">View PDF</span>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex items-start gap-4 hover:border-[#009cde] transition-colors cursor-pointer group">
            <div className="w-11 h-11 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center flex-shrink-0 group-hover:bg-[#003087] group-hover:text-white transition-all">
              <CheckCircle2 className="w-5 h-5 text-[#003087] group-hover:text-white" />
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
            <span className="px-3 py-1 rounded-lg text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200/80">Active Subscription</span>
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
          <div className="w-14 h-14 rounded-2xl bg-[#f0f7ff] border border-[#009cde]/30 mx-auto flex items-center justify-center mb-4">
            <Gift className="w-7 h-7 text-[#009cde]" />
          </div>
          <h3 className="text-xl font-extrabold text-[#012169] mb-2">Refer a Friend, Earn ₹1,000</h3>
          <p className="text-slate-500 font-medium max-w-md mx-auto mb-6 text-sm">
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
          <div className="p-4 bg-white border-2 border-slate-200 rounded-2xl shadow-md mb-6">
            <QrCode className="w-48 h-48 text-[#003087]" />
          </div>
          <h4 className="font-black text-lg text-[#012169]">John Doe</h4>
          <p className="text-slate-500 font-bold mb-4">Sunrise PG • Room 101A</p>
          <div className="px-4 py-2 bg-emerald-50 text-emerald-700 border border-emerald-200/80 rounded-xl text-xs font-bold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" />
            <span>Valid Resident Gate Pass</span>
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
