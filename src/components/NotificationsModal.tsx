import React, { useState, useEffect } from 'react';
import { useProperty } from '../context/PropertyContext';
import { ScribbleBell } from './ScribbleIcons';
import { X, CheckCheck } from 'lucide-react';

interface NotificationItem {
  id: string;
  title: string;
  desc: string;
  time: string;
  type: string;
  unread: boolean;
}

export const NotificationsModal: React.FC = () => {
  const { isNotificationsOpen, setIsNotificationsOpen, activeRole } = useProperty();

  const [filter, setFilter] = useState<'all' | 'unread'>('all');

  const initialOwnerNotifications: NotificationItem[] = [
    { id: '1', title: 'Payment Received', desc: `₹14,000 via UPI from Aarav Sharma (Room 101-A)`, time: '10 mins ago', type: 'payment', unread: true },
    { id: '2', title: 'New Ticket Raised', desc: `Plumbing issue reported by Rohan Verma in Sunrise PG`, time: '1 hour ago', type: 'complaint', unread: true },
    { id: '3', title: 'Payment Received', desc: `₹40,000 via NEFT from Siddharth Rao (Flat 101)`, time: '3 hours ago', type: 'payment', unread: false },
    { id: '4', title: 'System Backup', desc: `Local offline vault database encrypted & synced successfully`, time: 'Yesterday', type: 'system', unread: false }
  ];

  const initialTenantNotifications: NotificationItem[] = [
    { id: '1', title: 'Rent Due Reminder', desc: `Your rent for September is due on the 1st. Avoid late fees.`, time: '1 day ago', type: 'payment', unread: true },
    { id: '2', title: 'Water Supply Maintenance', desc: `Water supply will be affected tomorrow between 2 PM to 4 PM.`, time: '2 hours ago', type: 'system', unread: true },
    { id: '3', title: 'Ticket Updated', desc: `Your ticket "AC not cooling properly" is now In Progress.`, time: '10 mins ago', type: 'complaint', unread: false },
  ];

  const [notifications, setNotifications] = useState<NotificationItem[]>(
    activeRole === 'tenant' ? initialTenantNotifications : initialOwnerNotifications
  );

  useEffect(() => {
    setNotifications(activeRole === 'tenant' ? initialTenantNotifications : initialOwnerNotifications);
  }, [activeRole]);

  if (!isNotificationsOpen) return null;

  const unreadCount = notifications.filter(n => n.unread).length;

  const handleMarkAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, unread: false })));
  };

  const handleToggleRead = (id: string) => {
    setNotifications(prev =>
      prev.map(n => (n.id === id ? { ...n, unread: false } : n))
    );
  };

  const displayedList = filter === 'unread' ? notifications.filter(n => n.unread) : notifications;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 font-sans">
      <div className="bg-white text-[#012169] border border-slate-200 rounded-3xl w-full max-w-lg p-6 sm:p-7 space-y-5 shadow-2xl relative">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-[#e0f2fe] text-[#009cde] border border-[#009cde]/30 shadow-xs">
              <ScribbleBell className="w-6 h-6 stroke-[2.2]" />
            </div>
            <div>
              <h3 className="text-lg font-extrabold text-[#012169]">Activity Center</h3>
              <p className="text-xs text-slate-500 font-semibold">Real-time payment & ticket updates</p>
            </div>
          </div>

          <button
            onClick={() => setIsNotificationsOpen(false)}
            className="p-2 rounded-xl bg-slate-100 text-[#012169] hover:bg-slate-200 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-3 py-1 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
                filter === 'all' ? 'bg-[#003087] text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              All Activity
            </button>
            <button
              onClick={() => setFilter('unread')}
              className={`px-3 py-1 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
                filter === 'unread' ? 'bg-[#003087] text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Unread {unreadCount > 0 ? `(${unreadCount})` : '(0)'}
            </button>
          </div>

          <button
            onClick={handleMarkAllRead}
            disabled={unreadCount === 0}
            className={`text-xs font-extrabold flex items-center gap-1 transition-all ${
              unreadCount > 0
                ? 'text-[#009cde] hover:underline cursor-pointer'
                : 'text-slate-400 opacity-60 cursor-default'
            }`}
          >
            <CheckCheck className="w-3.5 h-3.5" />
            Mark all read
          </button>
        </div>

        <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
          {displayedList.length === 0 ? (
            <div className="text-center py-8 text-slate-400 text-xs font-semibold">
              No unread notifications
            </div>
          ) : (
            displayedList.map(n => (
              <div
                key={n.id}
                onClick={() => handleToggleRead(n.id)}
                className={`p-4 rounded-2xl border transition-all flex items-start gap-3 cursor-pointer ${
                  n.unread
                    ? 'bg-[#f0f7ff] border-[#009cde]/40 shadow-xs hover:border-[#009cde]/70'
                    : 'bg-[#f8fafc] border-slate-200 opacity-80 hover:opacity-100'
                }`}
              >
                <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${n.unread ? 'bg-[#009cde]' : 'bg-transparent'}`} />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-extrabold text-[#012169]">{n.title}</span>
                    <span className="text-[11px] font-semibold text-slate-400">{n.time}</span>
                  </div>
                  <p className="text-xs text-slate-600 font-medium mt-0.5">{n.desc}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
