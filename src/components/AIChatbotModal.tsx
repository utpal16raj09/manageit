import React, { useState, useRef, useEffect } from 'react';
import { useProperty } from '../context/PropertyContext';
import { X, Send, Bot, User, Sparkles, ChevronRight, TrendingUp } from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  timestamp: string;
  structuredData?: {
    type: 'dues' | 'occupancy' | 'complaints' | 'expenses';
    items?: { label: string; value: string; extra?: string }[];
  };
}

export const AIChatbotModal: React.FC = () => {
  const {
    isAIChatOpen,
    setIsAIChatOpen,
    tenants,
    complaints,
    filteredMetrics,
    expenses,
    properties
  } = useProperty();

  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-1',
      sender: 'ai',
      text: "Welcome back! I am your PropPulse Portfolio AI Assistant. How can I assist with your properties today?",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  if (!isAIChatOpen) {
    return (
      <button
        onClick={() => setIsAIChatOpen(true)}
        title="Ask PropPulse AI"
        className="fixed bottom-20 right-4 sm:bottom-6 sm:right-6 z-40 w-12 h-12 rounded-full bg-[#012169] hover:bg-[#003087] text-white shadow-xl flex items-center justify-center border border-[#009cde]/40 transition-all hover:scale-105 active:scale-95 group"
      >
        <div className="relative flex items-center justify-center">
          <Bot className="w-5.5 h-5.5 text-[#009cde] group-hover:rotate-12 transition-transform stroke-[2.2]" />
          <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-[#012169]" />
        </div>
      </button>
    );
  }

  const formatCurrency = (val: number) => '₹' + val.toLocaleString('en-IN');

  const handleSend = (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim()) return;

    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInput('');

    setTimeout(() => {
      let replyText = '';
      let structured: ChatMessage['structuredData'] = undefined;
      const lower = query.toLowerCase();

      if (lower.includes('due') || lower.includes('pending') || lower.includes('overdue') || lower.includes('unpaid')) {
        const overdueTenants = tenants.filter(t => t.duesStatus !== 'paid');
        if (overdueTenants.length === 0) {
          replyText = "Great news! All tenants have paid their rent in full this month.";
        } else {
          replyText = `Found ${overdueTenants.length} tenants with pending dues totaling ${formatCurrency(filteredMetrics.duesThisMonth)}:`;
          structured = {
            type: 'dues',
            items: overdueTenants.map(t => ({
              label: t.name,
              value: formatCurrency(t.outstandingDueAmount),
              extra: `${t.propertyName} • ${t.unitNumber}`
            }))
          };
        }
      } else if (lower.includes('occupancy') || lower.includes('vacant') || lower.includes('unit')) {
        replyText = `Portfolio Occupancy telemetry for your ${properties.length} properties:`;
        structured = {
          type: 'occupancy',
          items: [
            { label: 'Total Units', value: `${filteredMetrics.totalUnitsCount}` },
            { label: 'Occupied Units', value: `${filteredMetrics.occupiedUnitsCount}`, extra: `${filteredMetrics.occupancyRatePct}% Rate` },
            { label: 'Vacant Units', value: `${filteredMetrics.vacantUnitsCount}`, extra: 'Ready for Onboarding' }
          ]
        };
      } else if (lower.includes('complaint') || lower.includes('issue') || lower.includes('repair')) {
        const activeComps = complaints.filter(c => c.status !== 'Resolved');
        if (activeComps.length === 0) {
          replyText = "All maintenance tickets across all properties are resolved!";
        } else {
          replyText = `Currently tracking ${activeComps.length} active maintenance tickets:`;
          structured = {
            type: 'complaints',
            items: activeComps.map(c => ({
              label: c.category,
              value: c.priority,
              extra: `${c.propertyName} • ${c.unitNumber} (${c.reportedByTenant})`
            }))
          };
        }
      } else if (lower.includes('expense') || lower.includes('cost') || lower.includes('spent')) {
        const totalExp = expenses.reduce((sum, e) => sum + e.amount, 0);
        replyText = `Total portfolio operating expenses: ${formatCurrency(totalExp)} across ${expenses.length} ledger records.`;
      } else if (lower.includes('property') || lower.includes('building')) {
        replyText = `Managing ${properties.length} active property assets:`;
        structured = {
          type: 'occupancy',
          items: properties.map(p => ({
            label: p.name,
            value: `${p.occupiedUnitsCount}/${p.unitsCount}`,
            extra: p.city
          }))
        };
      } else {
        replyText = `Portfolio telemetry analyzed: Collection efficiency is at ${filteredMetrics.collectionEfficiencyPct}%, with ${filteredMetrics.occupiedUnitsCount}/${filteredMetrics.totalUnitsCount} occupied units. What details would you like to inspect?`;
      }

      const aiMsg: ChatMessage = {
        id: `msg-ai-${Date.now()}`,
        sender: 'ai',
        text: replyText,
        structuredData: structured,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, aiMsg]);
    }, 350);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-900/30 backdrop-blur-none font-sans">
      {/* Backdrop Dismiss (Desktop) */}
      <div className="hidden sm:block absolute inset-0" onClick={() => setIsAIChatOpen(false)} />

      {/* Main Panel */}
      <div className="relative z-10 w-full h-full sm:w-[410px] bg-[#f8fafc] flex flex-col shadow-2xl overflow-hidden animate-in slide-in-from-right duration-250">
        
        {/* Sleek Minimal Header */}
        <div className="p-4 bg-[#012169] text-white flex items-center justify-between border-b border-[#003087]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#003087] border border-[#009cde]/30 flex items-center justify-center text-[#009cde]">
              <Sparkles className="w-4.5 h-4.5 stroke-[2.2]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-extrabold text-white tracking-tight">PropPulse AI Studio</h3>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              </div>
              <p className="text-[10px] text-[#009cde] font-semibold">Instant Telemetry & Ledger Insights</p>
            </div>
          </div>

          <button
            onClick={() => setIsAIChatOpen(false)}
            className="p-2 rounded-xl bg-white/10 text-white hover:bg-white/20 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Minimal Luxury Prompt Chips */}
        <div className="px-4 py-2.5 bg-white border-b border-slate-200/80 flex items-center gap-2 overflow-x-auto no-scrollbar flex-shrink-0">
          <button
            onClick={() => handleSend("Who has overdue rent?")}
            className="px-3 py-1.5 rounded-full bg-[#f0f7ff] border border-[#009cde]/30 hover:bg-[#009cde] hover:text-white text-[11px] font-extrabold text-[#003087] flex-shrink-0 flex items-center gap-1 transition-all"
          >
            <span>Overdue Dues</span>
            <ChevronRight className="w-3 h-3 opacity-60" />
          </button>

          <button
            onClick={() => handleSend("Show occupancy summary")}
            className="px-3 py-1.5 rounded-full bg-[#f0f7ff] border border-[#009cde]/30 hover:bg-[#009cde] hover:text-white text-[11px] font-extrabold text-[#003087] flex-shrink-0 flex items-center gap-1 transition-all"
          >
            <span>Occupancy</span>
            <ChevronRight className="w-3 h-3 opacity-60" />
          </button>

          <button
            onClick={() => handleSend("List active complaints")}
            className="px-3 py-1.5 rounded-full bg-[#f0f7ff] border border-[#009cde]/30 hover:bg-[#009cde] hover:text-white text-[11px] font-extrabold text-[#003087] flex-shrink-0 flex items-center gap-1 transition-all"
          >
            <span>Complaints</span>
            <ChevronRight className="w-3 h-3 opacity-60" />
          </button>
        </div>

        {/* Messages Stream */}
        <div className="flex-1 p-4 space-y-4 overflow-y-auto">
          {messages.map(m => (
            <div
              key={m.id}
              className={`flex gap-2.5 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {m.sender === 'ai' && (
                <div className="w-7 h-7 rounded-xl bg-[#012169] text-[#009cde] flex items-center justify-center flex-shrink-0 mt-0.5 shadow-2xs">
                  <Bot className="w-4 h-4 stroke-[2.2]" />
                </div>
              )}

              <div className="max-w-[85%] space-y-2">
                <div
                  className={`p-3.5 rounded-2xl text-xs font-medium leading-relaxed ${
                    m.sender === 'user'
                      ? 'bg-[#009cde] text-white rounded-br-xs font-extrabold shadow-2xs'
                      : 'bg-white text-[#012169] border border-slate-200/90 rounded-bl-xs shadow-2xs'
                  }`}
                >
                  {m.text}
                </div>

                {/* Structured Insights Card */}
                {m.structuredData && (
                  <div className="bg-white border border-slate-200 rounded-2xl p-3 space-y-2 shadow-2xs">
                    {m.structuredData.items?.map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between p-2 rounded-xl bg-[#f8fafc] border border-slate-100 text-xs">
                        <div>
                          <div className="font-extrabold text-[#012169]">{item.label}</div>
                          {item.extra && <div className="text-[10px] text-slate-500 font-semibold">{item.extra}</div>}
                        </div>
                        <span className="font-mono-amount font-extrabold text-[#009cde] text-xs bg-[#e0f2fe] px-2 py-0.5 rounded-lg border border-[#009cde]/20">
                          {item.value}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                <div
                  className={`text-[9px] font-bold px-1 ${
                    m.sender === 'user' ? 'text-right text-slate-400' : 'text-slate-400'
                  }`}
                >
                  {m.timestamp}
                </div>
              </div>

              {m.sender === 'user' && (
                <div className="w-7 h-7 rounded-xl bg-[#009cde] text-white flex items-center justify-center flex-shrink-0 mt-0.5 shadow-2xs">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Floating Input Dock */}
        <div className="p-3 bg-white border-t border-slate-200 flex-shrink-0">
          <form
            onSubmit={e => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2 bg-[#f8fafc] border border-slate-300 rounded-2xl p-1.5 focus-within:border-[#009cde] focus-within:bg-white transition-all shadow-inner"
          >
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Ask about rent, tenants, complaints..."
              className="flex-1 px-3 text-xs font-extrabold text-[#012169] bg-transparent outline-none placeholder:text-slate-400"
            />
            <button
              type="submit"
              className="h-9 w-9 rounded-xl bg-[#009cde] hover:bg-[#0080b8] text-white flex items-center justify-center flex-shrink-0 shadow-xs transition-transform active:scale-95"
            >
              <Send className="w-3.5 h-3.5 stroke-[2.4]" />
            </button>
          </form>
        </div>

      </div>
    </div>
  );
};
