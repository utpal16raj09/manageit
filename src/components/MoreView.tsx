import React from 'react';
import { useProperty } from '../context/PropertyContext';
import {
  ScribbleChart,
  ScribbleUsers,
  ScribbleFinanceIllustration
} from './ScribbleIcons';
import { Download, Receipt, Building, ArrowUpRight, TrendingUp } from 'lucide-react';

export const MoreView: React.FC = () => {
  const { filteredMetrics, properties, expenses, users } = useProperty();

  const formatCurrency = (val: number) => '₹' + val.toLocaleString('en-IN');

  const totalCollected = filteredMetrics.collectedThisMonth;
  const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0);
  const netIncome = totalCollected - totalExpenses;
  const estTdsTax = Math.round(netIncome * 0.1);

  const handleDownloadPDF = () => {
    window.print();
  };

  return (
    <div className="space-y-8 font-sans">
      {/* Centered Top Header Block */}
      <div className="text-center space-y-3.5 max-w-2xl mx-auto py-2">
        <div className="flex justify-center">
          <ScribbleFinanceIllustration className="w-12 h-12 text-[#003087] dark:text-[#f8fafc]" />
        </div>

        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#012169] dark:text-[#f8fafc] tracking-tight">Financial Accounting & P&L</h2>
        <p className="text-xs sm:text-sm font-semibold text-slate-500 dark:text-slate-400">
          Real-time rent roll ledgers, operating expense tracking, and tax statement generation
        </p>

        {/* Centered Export Button */}
        <div className="flex justify-center pt-2">
          <button
            onClick={handleDownloadPDF}
            className="px-6 py-3 rounded-xl bg-[#009cde] hover:bg-[#0080b8] text-white font-extrabold text-xs sm:text-sm shadow-md flex items-center justify-center gap-2.5 transition-transform active:scale-95 cursor-pointer"
          >
            <Download className="w-4 h-4 stroke-[2.5]" />
            <span>Export P&L Statement (PDF)</span>
          </button>
        </div>
      </div>

      {/* 3 Key Financial Highlights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Gross Collection */}
        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-xs font-extrabold uppercase text-slate-400">
            <span>Gross Rent Collected</span>
            <ArrowUpRight className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-[#003087] font-mono-amount">
            {formatCurrency(totalCollected)}
          </div>
          <div className="text-xs font-semibold text-slate-500 pt-1">
            Current billing period rent income
          </div>
        </div>

        {/* Total Expenses */}
        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-xs font-extrabold uppercase text-slate-400">
            <span>Operating Expenses</span>
            <Receipt className="w-4 h-4 text-rose-500" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-[#012169] font-mono-amount">
            {formatCurrency(totalExpenses)}
          </div>
          <div className="text-xs font-semibold text-slate-500 pt-1">
            Utilities, maintenance & staff salaries
          </div>
        </div>

        {/* Net Operating Income (NOI) */}
        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-xs font-extrabold uppercase text-slate-400">
            <span>Net Operating Income (NOI)</span>
            <TrendingUp className="w-4 h-4 text-[#009cde]" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-[#009cde] font-mono-amount">
            {formatCurrency(netIncome)}
          </div>
          <div className="text-xs font-bold text-slate-500 pt-1 flex justify-between">
            <span>Est. TDS (10%): {formatCurrency(estTdsTax)}</span>
          </div>
        </div>
      </div>

      {/* Property-wise P&L Breakdown & Expense Ledger */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Property Revenue Performance */}
        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-5">
          <div className="flex items-center gap-2.5">
            <Building className="w-5 h-5 text-[#003087]" />
            <h3 className="text-base sm:text-lg font-extrabold text-[#012169]">Property Portfolio Revenue</h3>
          </div>

          <div className="space-y-3">
            {properties.map(p => {
              const propExpenses = expenses.filter(e => e.propertyId === p.id).reduce((sum, e) => sum + e.amount, 0);
              const propNet = p.collectedThisMonth - propExpenses;
              return (
                <div key={p.id} className="p-4 rounded-2xl bg-[#f8fafc] border border-slate-200 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-extrabold text-[#012169]">{p.name}</span>
                    <span className="text-sm font-extrabold text-[#003087] font-mono-amount">{formatCurrency(p.collectedThisMonth)}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
                    <span>Expenses: {formatCurrency(propExpenses)}</span>
                    <span className="text-[#009cde] font-extrabold">Net: {formatCurrency(propNet)}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Operating Expenses Ledger */}
        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <Receipt className="w-5 h-5 text-[#003087]" />
              <h3 className="text-base sm:text-lg font-extrabold text-[#012169]">Recent Expenses Ledger</h3>
            </div>
            <span className="text-xs font-extrabold text-[#003087] bg-[#f0f7ff] px-3 py-1 rounded-xl border border-[#009cde]/30">
              {expenses.length} Records
            </span>
          </div>

          <div className="space-y-3">
            {expenses.map(e => (
              <div key={e.id} className="p-4 rounded-2xl bg-[#f8fafc] border border-slate-200 flex items-center justify-between gap-3 shadow-2xs">
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-extrabold text-[#012169] truncate">{e.propertyName}</span>
                    <span className="px-2 py-0.5 rounded-md bg-slate-200 text-slate-700 text-[10px] font-bold">
                      {e.category}
                    </span>
                  </div>
                  <div className="text-xs font-semibold text-slate-500 mt-1 truncate">{e.note}</div>
                </div>
                <div className="text-right flex-shrink-0">
                  <div className="text-sm font-extrabold text-rose-600 font-mono-amount">-{formatCurrency(e.amount)}</div>
                  <div className="text-[10px] font-bold text-slate-400 mt-0.5">{e.date}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Team Access & Scoping */}
      <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-5">
        <div className="flex items-center gap-2.5">
          <ScribbleUsers className="w-5 h-5 text-[#003087]" />
          <div>
            <h3 className="text-base sm:text-lg font-extrabold text-[#012169]">Team Roles & Permissions</h3>
            <p className="text-xs text-slate-500 font-semibold">Authorized staff and financial access levels</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {users.map(u => (
            <div key={u.id} className="p-4 rounded-2xl bg-[#f8fafc] border border-slate-200 flex items-center justify-between shadow-2xs">
              <div>
                <div className="text-sm font-extrabold text-[#012169]">{u.name}</div>
                <div className="text-xs font-semibold text-slate-400">{u.email}</div>
              </div>
              <span className="px-2.5 py-0.5 rounded-lg text-[10px] font-extrabold uppercase bg-[#f0f7ff] text-[#003087] border border-[#009cde]/30 flex-shrink-0">
                {u.role}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
