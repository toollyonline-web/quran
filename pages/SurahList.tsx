
import React, { useState, useEffect } from 'react';
import { Surah } from '../types';
import { fetchAllSurahs } from '../services/quranApi';
import SurahCard from '../components/SurahCard';

const SurahList: React.FC = () => {
  const [surahs, setSurahs] = useState<Surah[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchAllSurahs().then(data => {
      setSurahs(data);
      setLoading(false);
    });
  }, []);

  const filteredSurahs = surahs.filter(s => 
    s.name_simple.toLowerCase().includes(search.toLowerCase()) ||
    s.id.toString() === search
  );

  if (loading) return (
    <div className="flex h-64 items-center justify-center">
       <div className="h-12 w-12 animate-spin rounded-full border-4 border-emerald-500 border-t-transparent"></div>
    </div>
  );

  return (
    <div className="py-12">
      <div className="mb-10 flex flex-col items-center justify-between gap-6 md:flex-row">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-800 dark:text-white">All Surahs</h1>
          <p className="text-slate-500 dark:text-slate-400">Index of all 114 chapters of the Quran</p>
        </div>
        <div className="relative w-full max-w-md">
           <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
             </svg>
           </span>
           <input 
             type="text" 
             placeholder="Search Surah by name or number..."
             value={search}
             onChange={(e) => setSearch(e.target.value)}
             className="w-full rounded-full border border-slate-200 bg-white py-3 pl-12 pr-4 shadow-sm focus:border-emerald-500 focus:outline-none dark:border-slate-800 dark:bg-slate-900"
           />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredSurahs.map(surah => (
          <SurahCard key={surah.id} surah={surah} />
        ))}
      </div>
    </div>
  );
};

export default SurahList;
