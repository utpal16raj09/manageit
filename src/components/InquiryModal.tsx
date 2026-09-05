import React, { useState } from 'react';
import { useProperty } from '../context/PropertyContext';
import { Building, MapPin, Phone, User, CheckCircle2, Calendar } from 'lucide-react';

export const InquiryModal: React.FC = () => {
  const { isInquiryModalOpen, setIsInquiryModalOpen } = useProperty();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    location: '',
    sharingPreference: 'one',
    tentativeMoveInDate: ''
  });

  if (!isInquiryModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        setIsInquiryModalOpen(false);
        setFormData({ name: '', phone: '', location: '', sharingPreference: 'one', tentativeMoveInDate: '' });
      }, 2000);
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-[#012169]/40 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-md bg-white rounded-3xl border border-slate-200 shadow-[0_24px_64px_rgba(0,48,135,0.18)] p-8 text-left animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Close Button */}
        {!isSuccess && (
          <button
            onClick={() => setIsInquiryModalOpen(false)}
            className="absolute top-5 right-5 w-8 h-8 rounded-xl bg-slate-100 text-slate-400 hover:text-slate-700 hover:bg-slate-200 flex items-center justify-center text-sm font-bold transition-colors cursor-pointer"
          >
            ✕
          </button>
        )}

        {isSuccess ? (
          <div className="flex flex-col items-center justify-center py-10 space-y-4 text-center animate-in fade-in zoom-in duration-300">
            <div className="w-14 h-14 bg-emerald-50 text-emerald-600 border border-emerald-200 rounded-2xl flex items-center justify-center">
              <CheckCircle2 className="w-8 h-8 stroke-[2]" />
            </div>
            <div>
              <h3 className="text-2xl font-black text-[#012169]">Inquiry Sent</h3>
              <p className="text-slate-500 mt-2">Thank you! We will get back to you shortly.</p>
            </div>
          </div>
        ) : (
          <>
            {/* Header */}
            <div className="space-y-2 mb-6">
              <h3 className="text-2xl font-black text-[#012169] tracking-tight">Inquire Now</h3>
              <p className="text-sm text-slate-500">Fill out the form to find your perfect stay.</p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm text-[#012169] font-medium focus:outline-none focus:border-[#003087] focus:bg-white transition-all"
                    placeholder="Enter your name"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Phone Number</label>
                <div className="relative">
                  <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm text-[#012169] font-medium focus:outline-none focus:border-[#003087] focus:bg-white transition-all"
                    placeholder="+91 99999 99999"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Preferred Location</label>
                <div className="relative">
                  <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    required
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm text-[#012169] font-medium focus:outline-none focus:border-[#003087] focus:bg-white transition-all"
                    placeholder="e.g., Koramangala, Indiranagar"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Sharing Preference</label>
                <div className="relative">
                  <Building className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <select
                    value={formData.sharingPreference}
                    onChange={(e) => setFormData({ ...formData, sharingPreference: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm text-[#012169] font-medium focus:outline-none focus:border-[#003087] focus:bg-white transition-all appearance-none"
                  >
                    <option value="one">One Sharing</option>
                    <option value="two">Two Sharing</option>
                    <option value="three">Three Sharing</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Tentative Move-in Date</label>
                <div className="relative">
                  <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="date"
                    required
                    value={formData.tentativeMoveInDate}
                    onChange={(e) => setFormData({ ...formData, tentativeMoveInDate: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm text-[#012169] font-medium focus:outline-none focus:border-[#003087] focus:bg-white transition-all"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 rounded-xl bg-[#003087] hover:bg-[#012169] text-white font-bold text-sm transition-all duration-200 flex items-center justify-center space-x-2 shadow-md cursor-pointer active:scale-[0.98] mt-2"
              >
                {isSubmitting ? (
                  <span className="w-5 h-5 rounded-full border-2 border-white border-t-transparent animate-spin" />
                ) : (
                  <span>Send</span>
                )}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};
