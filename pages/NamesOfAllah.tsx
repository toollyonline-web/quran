
import React, { useState } from 'react';
import { NAMES_OF_ALLAH, AllahName } from '../services/extraContent';

const NamesOfAllah: React.FC = () => {
  const [selectedName, setSelectedName] = useState<AllahName | null>(null);

  return (
    <div className="py-12">
      <header className="mb-12 text-center">
        <h1 className="text-4xl font-black text-slate-800 dark:text-white">Asma-ul-Husna</h1>
        <p className="mt-4 text-slate-500 dark:text-slate-400">The 99 Beautiful Names of Allah (SWT)</p>
      </header>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {NAMES_OF_ALLAH.map((item) => (
          <button
            key={item.number}
            onClick={() => setSelectedName(item)}
            className="group flex flex-col items-center justify-center rounded-3xl border border-slate-200 bg-white p-6 transition-all hover:border-emerald-400 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900"
          >
            <span className="mb-2 text-[10px] font-bold text-slate-400">#{item.number}</span>
            <span className="font-arabic text-3xl text-emerald-700 transition-transform group-hover:scale-110 dark:text-emerald-400">
              {item.name}
            </span>
            <span className="mt-2 text-xs font-bold text-slate-800 dark:text-slate-200">{item.transliteration}</span>
            <span className="text-[10px] text-slate-500">{item.en.meaning}</span>
          </button>
        ))}
      </div>

      {selectedName && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4" onClick={() => setSelectedName(null)}>
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"></div>
          <div 
            className="relative w-full max-w-md overflow-hidden rounded-3xl bg-white shadow-2xl dark:bg-slate-900"
            onClick={e => e.stopPropagation()}
          >
            <div className="h-32 bg-emerald-600"></div>
            <div className="relative -mt-16 flex justify-center">
              <div className="flex h-32 w-32 items-center justify-center rounded-full bg-white p-2 shadow-xl dark:bg-slate-900">
                <div className="flex h-full w-full items-center justify-center rounded-full bg-emerald-50 font-arabic text-5xl text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400">
                  {selectedName.name}
                </div>
              </div>
            </div>
            <div className="p-8 text-center">
              <h2 className="text-2xl font-black text-slate-800 dark:text-white">{selectedName.transliteration}</h2>
              <p className="font-bold text-emerald-600">{selectedName.en.meaning}</p>
              <div className="mt-6 rounded-2xl bg-slate-50 p-6 text-sm leading-relaxed text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                {selectedName.en.description}
              </div>
              <button 
                onClick={() => setSelectedName(null)}
                className="mt-8 w-full rounded-2xl bg-emerald-600 py-3 font-bold text-white transition-colors hover:bg-emerald-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NamesOfAllah;
