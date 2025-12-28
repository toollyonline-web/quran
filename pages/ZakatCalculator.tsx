
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
    <div className="mx-auto max-w-5xl py-12">
      <header className="mb-12 text-center">
        <h1 className="text-4xl font-black text-slate-800 dark:text-white">Zakat Calculator Online</h1>
        <p className="mt-4 text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">Calculate your annual charity contributions accurately using our secure Islamic wealth assessment tool.</p>
      </header>

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
        <div className="space-y-8">
          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-6">Enter Your Financial Details</h2>
            <form onSubmit={handleCalc} className="space-y-6">
              {[
                { id: 'cash', label: 'Cash in Hand & Bank Accounts', icon: '💰', help: 'Include savings and current accounts.' },
                { id: 'gold', label: 'Value of Gold (Market Price)', icon: '✨', help: 'Current market value of your gold jewelry/bullion.' },
                { id: 'silver', label: 'Value of Silver (Market Price)', icon: '🥈', help: 'Current market value of your silver assets.' },
                { id: 'business', label: 'Business Assets & Stock', icon: '💼', help: 'The net value of goods for sale and business funds.' },
                { id: 'debts', label: 'Debts & Immediate Liabilities', icon: '📉', help: 'Include bills and loans due for payment.' },
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
                  <p className="mt-1 text-[10px] text-slate-400">{field.help}</p>
                </div>
              ))}
              <button className="w-full rounded-2xl bg-emerald-600 py-4 font-bold text-white shadow-lg shadow-emerald-200 transition-all hover:bg-emerald-700 hover:shadow-emerald-300 dark:shadow-none">
                Calculate My Zakat
              </button>
            </form>
          </div>
        </div>

        <div className="space-y-8">
          {result ? (
            <div className="animate-in fade-in zoom-in duration-300 rounded-3xl bg-emerald-600 p-8 text-white shadow-xl">
              <h2 className="text-lg font-bold opacity-80">Your Calculation Result</h2>
              {result.payable ? (
                <>
                  <div className="mt-4 text-sm font-medium">Your Total Payable Zakat (2.5%):</div>
                  <div className="mt-2 text-5xl font-black">${result.amount.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</div>
                  <div className="mt-6 border-t border-emerald-500/50 pt-6">
                    <p className="text-sm opacity-90">Total Net Wealth: <strong>${result.totalWealth.toLocaleString()}</strong></p>
                  </div>
                </>
              ) : (
                <div className="mt-4">
                  <p className="text-2xl font-bold">No Zakat Due at This Time</p>
                  <p className="mt-2 text-sm opacity-80">{result.message}</p>
                </div>
              )}
            </div>
          ) : (
            <div className="flex h-64 items-center justify-center rounded-3xl border-2 border-dashed border-slate-200 p-8 text-center text-slate-400 dark:border-slate-800">
              <p>Enter your financial details in the form to see your calculated Zakat here.</p>
            </div>
          )}
          
          <div className="rounded-3xl bg-stone-100 p-8 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
            <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-4">A Comprehensive Guide to Zakat</h2>
            <div className="space-y-4 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
              <p>
                <strong>Zakat</strong> is one of the Five Pillars of Islam, representing a compulsory form of almsgiving that purifies a Muslim's wealth. It is mandatory for every adult, sane Muslim who possesses wealth above a certain threshold, known as the <strong>Nisab</strong>, for a continuous lunar year (Hawl).
              </p>
              <p>
                <strong>How to Determine Nisab:</strong> The Nisab threshold is traditionally equivalent to the value of 87.48 grams of gold or 612.36 grams of silver. Since market prices fluctuate, it is recommended to check the current rates before finalizing your calculation. If your net assets (wealth minus debt) exceed the lower of these two values, Zakat is due at a rate of <strong>2.5%</strong>.
              </p>
              <p>
                <strong>What Wealth is Zakatable?</strong> Zakat applies to liquid assets, including cash in bank accounts, cash at home, gold and silver jewelry (beyond personal use according to some schools), business inventory, and tradable stocks. It does not apply to personal residences, vehicles used for transportation, or furniture.
              </p>
              <p>
                <strong>Purifying Your Soul:</strong> Giving Zakat is not merely a financial transaction; it is a spiritual act of obedience to Allah (SWT). It fosters social justice by redistributing wealth to the needy, orphans, and those in debt, ensuring that the entire Ummah can flourish together.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ZakatCalculator;
