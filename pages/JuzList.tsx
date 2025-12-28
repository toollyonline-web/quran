
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Juz } from '../types';
import { fetchAllJuzs } from '../services/quranApi';

const JuzList: React.FC = () => {
  const [juzs, setJuzs] = useState<Juz[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAllJuzs().then(data => {
      setJuzs(data);
      setLoading(false);
    });
  }, []);

  if (loading) return (
    <div className="flex h-64 items-center justify-center">
       <div className="h-12 w-12 animate-spin rounded-full border-4 border-emerald-500 border-t-transparent"></div>
    </div>
  );

  return (
    <div className="py-12">
      <div className="mb-10">
        <h1 className="text-4xl font-extrabold text-slate-800 dark:text-white">All Siparas (Juz)</h1>
        <p className="text-slate-500 dark:text-slate-400">Navigate the Holy Quran through its 30 traditional parts</p>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6">
        {juzs.map(juz => (
          <Link
            key={juz.id}
            to={`/juz/${juz.juz_number}`}
            className="flex flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:border-emerald-400 hover:shadow-md dark:border-slate-800 dark:bg-slate-900"
          >
            <div className="mb-2 text-2xl font-bold text-emerald-600">Para {juz.juz_number}</div>
            <div className="text-xs text-slate-400">View Verses</div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default JuzList;
