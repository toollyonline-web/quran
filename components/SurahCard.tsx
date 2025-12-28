
import React from 'react';
import { Link } from 'react-router-dom';
import { Surah } from '../types';

interface SurahCardProps {
  surah: Surah;
}

const SurahCard: React.FC<SurahCardProps> = ({ surah }) => {
  return (
    <Link
      to={`/surah/${surah.id}`}
      className="group relative flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:border-emerald-300 hover:shadow-md dark:border-slate-800 dark:bg-slate-900 dark:hover:border-emerald-800"
    >
      <div className="flex items-center gap-4">
        <div className="relative flex h-12 w-12 items-center justify-center text-emerald-600 transition-colors group-hover:text-emerald-500">
          <svg viewBox="0 0 24 24" className="absolute inset-0 h-full w-full rotate-45 fill-emerald-50 opacity-100 transition-opacity group-hover:fill-emerald-100 dark:fill-emerald-950 dark:opacity-50">
             <rect x="3" y="3" width="18" height="18" rx="4" />
          </svg>
          <span className="relative z-10 font-bold">{surah.id}</span>
        </div>
        <div>
          <h3 className="font-bold text-slate-800 dark:text-slate-100">{surah.name_simple}</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">{surah.translated_name.name} • {surah.verses_count} Ayahs</p>
        </div>
      </div>
      <div className="text-right">
        <div className="font-arabic text-xl font-bold text-emerald-700 dark:text-emerald-400">{surah.name_arabic}</div>
        <div className="mt-1 text-[10px] uppercase tracking-widest text-slate-400">{surah.revelation_place}</div>
      </div>
    </Link>
  );
};

export default SurahCard;
