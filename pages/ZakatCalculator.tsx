
import React, { useState } from 'react';
import { calculateZakat } from '../services/extraContent';

const ZakatCalculator: React.FC = () => {
  const [form, setForm] = useState({ cash: 0, gold: 0, silver: 0, business: 0, debts: 0 });
  const [result, setResult] = useState<any>(null);

  const handleCalc = (e: React.FormEvent) => {
    e.preventDefault();
    const res = calculateZakat(form.cash, form.gold, form.silver, form.business, form.debts);
    setResult(res);
  };

  return (
    <div className="mx-auto max-w-4xl py-12">
      <header className="mb-12 text-center">
        <h1 className="text-4xl font-black text-slate-800 dark:text-white">Zakat Calculator</h1>
        <p className="mt-4 text-slate-500 dark:text-slate-400">Calculate your annual charity contributions accurately.</p>
      </header>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <div className="rounded-3xl border border-slate-200 bg-white p-8 dark:border-slate-800 dark:bg-slate-900">
          <form onSubmit={handleCalc} className="space-y-6">
            {[
              { id: 'cash', label: 'Cash in Hand & Bank', icon: '💰' },
              { id: 'gold', label: 'Value of Gold', icon: '✨' },
              { id: 'silver', label: 'Value of Silver', icon: '🥈' },
              { id: 'business', label: 'Business Assets', icon: '💼' },
              { id: 'debts', label: 'Debts & Liabilities', icon: '📉' },
            ].map(field => (
              <div key={field.id}>
                <label className="mb-2 block text-xs font-bold uppercase tracking-widest text-slate-400">{field.label}</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg">{field.icon}</span>
                  <input 
                    type="number"
                    value={(form as any)[field.id] || ''}
                    onChange={e => setForm({ ...form, [field.id]: Number(e.target.value) })}
                    placeholder="0.00"
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-3 pl-12 pr-4 focus:border-emerald-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800"
                  />
                </div>
              </div>
            ))}
            <button className="w-full rounded-2xl bg-emerald-600 py-4 font-bold text-white shadow-lg shadow-emerald-200 transition-all hover:bg-emerald-700 dark:shadow-none">
              Calculate Zakat
            </button>
          </form>
        </div>

        <div className="flex flex-col gap-6">
          {result ? (
            <div className="animate-in fade-in zoom-in duration-300 rounded-3xl bg-emerald-600 p-8 text-white shadow-xl">
              <h2 className="text-lg font-bold opacity-80">Calculation Result</h2>
              {result.payable ? (
                <>
                  <div className="mt-4 text-sm font-medium">Your Payable Zakat (2.5%):</div>
                  <div className="mt-2 text-5xl font-black">${result.amount.toFixed(2)}</div>
                  <div className="mt-6 border-t border-emerald-500/50 pt-6">
                    <p className="text-sm opacity-90">Total Net Wealth: <strong>${result.totalWealth.toFixed(2)}</strong></p>
                  </div>
                </>
              ) : (
                <div className="mt-4">
                  <p className="text-2xl font-bold">No Zakat Due</p>
                  <p className="mt-2 text-sm opacity-80">{result.message}</p>
                </div>
              )}
            </div>
          ) : (
            <div className="flex h-full items-center justify-center rounded-3xl border-2 border-dashed border-slate-200 p-8 text-center text-slate-400 dark:border-slate-800">
              <p>Enter your financial details to see the calculation result here.</p>
            </div>
          )}
          
          <div className="rounded-3xl bg-stone-100 p-8 dark:bg-slate-900">
            <h3 className="font-bold text-slate-800 dark:text-white">Note on Zakat</h3>
            <p className="mt-4 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
              Zakat is mandatory for every adult, sane Muslim whose wealth exceeds the Nisab threshold for a full lunar year. The rate is 2.5% of the total net wealth.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ZakatCalculator;
