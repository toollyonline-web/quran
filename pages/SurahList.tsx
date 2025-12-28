
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Surah } from '../types';
import { fetchAllSurahs } from '../services/quranApi';
import SurahCard from '../components/SurahCard';

const SurahList: React.FC = () => {
  const [surahs, setSurahs] = useState<Surah[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedSurah, setSelectedSurah] = useState<Surah | null>(null);
  const navigate = useNavigate();

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

  const handleCardClick = (surah: Surah) => {
    setSelectedSurah(surah);
  };

  const closeModal = () => {
    setSelectedSurah(null);
  };

  const startReading = () => {
    if (selectedSurah) {
      navigate(`/surah/${selectedSurah.id}`);
      closeModal();
    }
  };

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
          <SurahCard key={surah.id} surah={surah} onClick={handleCardClick} />
        ))}
      </div>

      {/* Surah Detail Modal */}
      {selectedSurah && (
        <div 
          className="fixed inset-0 z-[60] flex items-center justify-center p-4"
          onClick={closeModal}
        >
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"></div>
          
          <div 
            className="relative w-full max-w-lg overflow-hidden rounded-3xl bg-white shadow-2xl dark:bg-slate-900"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header Decoration */}
            <div className="h-24 bg-emerald-600 dark:bg-emerald-800"></div>
            
            <div className="relative -mt-12 flex justify-center">
              <div className="flex h-24 w-24 items-center justify-center rounded-2xl bg-white p-2 shadow-xl dark:bg-slate-900">
                <div className="flex h-full w-full items-center justify-center rounded-xl bg-emerald-50 text-3xl font-bold text-emerald-600 dark:bg-emerald-950">
                  {selectedSurah.id}
                </div>
              </div>
            </div>

            <div className="p-8 pt-6">
              <div className="text-center">
                <div className="font-arabic text-5xl text-emerald-700 dark:text-emerald-400">{selectedSurah.name_arabic}</div>
                <h2 className="mt-4 text-3xl font-extrabold text-slate-900 dark:text-white">{selectedSurah.name_simple}</h2>
                <p className="text-lg text-slate-500 dark:text-slate-400">{selectedSurah.translated_name.name}</p>
              </div>

              <div className="mt-10 grid grid-cols-2 gap-4">
                <div className="rounded-2xl bg-slate-50 p-4 text-center dark:bg-slate-800">
                  <span className="text-xs uppercase tracking-widest text-slate-400">Revelation</span>
                  <p className="mt-1 font-bold text-slate-800 dark:text-slate-200">{selectedSurah.revelation_place}</p>
                </div>
                <div className="rounded-2xl bg-slate-50 p-4 text-center dark:bg-slate-800">
                  <span className="text-xs uppercase tracking-widest text-slate-400">Ayahs</span>
                  <p className="mt-1 font-bold text-slate-800 dark:text-slate-200">{selectedSurah.verses_count}</p>
                </div>
                <div className="rounded-2xl bg-slate-50 p-4 text-center dark:bg-slate-800">
                  <span className="text-xs uppercase tracking-widest text-slate-400">Order</span>
                  <p className="mt-1 font-bold text-slate-800 dark:text-slate-200">{selectedSurah.revelation_order}</p>
                </div>
                <div className="rounded-2xl bg-slate-50 p-4 text-center dark:bg-slate-800">
                  <span className="text-xs uppercase tracking-widest text-slate-400">Pages</span>
                  <p className="mt-1 font-bold text-slate-800 dark:text-slate-200">
                    {selectedSurah.pages[0]} - {selectedSurah.pages[selectedSurah.pages.length - 1]}
                  </p>
                </div>
              </div>

              <div className="mt-10 flex gap-4">
                <button
                  onClick={closeModal}
                  className="flex-1 rounded-2xl border border-slate-200 py-4 font-bold text-slate-600 transition-colors hover:bg-slate-50 dark:border-slate-700 dark:text-slate-400 dark:hover:bg-slate-800"
                >
                  Close
                </button>
                <button
                  onClick={startReading}
                  className="flex-[2] rounded-2xl bg-emerald-600 py-4 font-bold text-white shadow-lg shadow-emerald-200 transition-all hover:bg-emerald-700 hover:shadow-emerald-300 dark:shadow-none"
                >
                  Start Reading
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SurahList;
