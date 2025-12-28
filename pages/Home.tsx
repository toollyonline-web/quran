
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  const [lastRead, setLastRead] = useState<{ id: number; name: string; type: string } | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('quran_last_read');
    if (saved) {
      setLastRead(JSON.parse(saved));
    }
  }, []);

  const popularSurahs = [
    { id: 1, name: 'Al-Fatihah', arabic: 'الفاتحة' },
    { id: 18, name: 'Al-Kahf', arabic: 'الكهف' },
    { id: 36, name: 'Yaseen', arabic: 'يس' },
    { id: 55, name: 'Ar-Rahman', arabic: 'الرحمن' },
    { id: 56, name: 'Al-Waqi\'ah', arabic: 'الواقعة' },
    { id: 67, name: 'Al-Mulk', arabic: 'الملك' },
  ];

  return (
    <div className="flex flex-col gap-12 py-12">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-emerald-800 px-6 py-20 text-center text-white sm:px-12">
        <div className="absolute -left-10 -top-10 h-64 w-64 rounded-full bg-emerald-700 opacity-20 blur-3xl"></div>
        <div className="absolute -right-10 -bottom-10 h-64 w-64 rounded-full bg-emerald-900 opacity-30 blur-3xl"></div>
        
        <h1 className="relative z-10 text-4xl font-extrabold sm:text-6xl">
           Read, Reflect, <br/><span className="text-emerald-300">Understand</span>
        </h1>
        <p className="relative z-10 mx-auto mt-6 max-w-2xl text-lg text-emerald-100">
          Experience the Holy Quran with a clean, distraction-free interface. Explore 114 chapters and 30 parts with English and Urdu translations.
        </p>
        
        <div className="relative z-10 mt-10 flex flex-wrap justify-center gap-4">
          <Link to="/surahs" className="rounded-full bg-white px-8 py-3 font-bold text-emerald-800 transition-transform hover:scale-105">
            Browse Surahs
          </Link>
          <Link to="/juzs" className="rounded-full border-2 border-emerald-300 px-8 py-3 font-bold text-emerald-100 transition-colors hover:bg-emerald-300 hover:text-emerald-900">
            Browse Siparas
          </Link>
        </div>
      </section>

      {/* Continue Reading Section */}
      {lastRead && (
        <section className="animate-in fade-in slide-in-from-bottom-4 duration-700">
           <div className="relative overflow-hidden rounded-3xl border border-emerald-100 bg-emerald-50/50 p-8 dark:border-emerald-900/30 dark:bg-emerald-950/20">
              <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
                 <div className="flex items-center gap-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-600 text-white shadow-lg">
                       <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                       </svg>
                    </div>
                    <div>
                       <span className="text-xs font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400">Continue Reading</span>
                       <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Surah {lastRead.name}</h2>
                    </div>
                 </div>
                 <Link 
                   to={`/surah/${lastRead.id}`}
                   className="flex items-center gap-2 rounded-2xl bg-emerald-600 px-6 py-3 font-bold text-white transition-all hover:bg-emerald-700 hover:shadow-lg"
                 >
                    Resume Now
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                       <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                 </Link>
              </div>
           </div>
        </section>
      )}

      {/* Popular Surahs Section */}
      <section>
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Quick Access</h2>
          <Link to="/surahs" className="text-sm font-semibold text-emerald-600 hover:underline">View All Surahs</Link>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-6">
          {popularSurahs.map((surah) => (
            <Link
              key={surah.id}
              to={`/surah/${surah.id}`}
              className="group flex flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white p-6 transition-all hover:border-emerald-400 hover:shadow-md dark:border-slate-800 dark:bg-slate-900"
            >
              <div className="mb-2 font-arabic text-2xl text-emerald-700 transition-transform group-hover:scale-110 dark:text-emerald-400">
                {surah.arabic}
              </div>
              <div className="text-center">
                <div className="text-sm font-bold text-slate-800 dark:text-white">{surah.name}</div>
                <div className="text-[10px] text-slate-400">Chapter {surah.id}</div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Feature Section */}
      <section className="grid grid-cols-1 gap-8 md:grid-cols-3">
        {[
          {
            title: '114 Surahs',
            desc: 'Complete index of all chapters from Al-Fatihah to An-Nas.',
            icon: '📜',
            link: '/surahs'
          },
          {
            title: '30 Juz',
            desc: 'The Quran divided into 30 equal parts for easy daily recitation.',
            icon: '📖',
            link: '/juzs'
          },
          {
            title: 'Multilingual',
            desc: 'Deepen your understanding with translations in English and Urdu.',
            icon: '🌍',
            link: '/surahs'
          }
        ].map((item, idx) => (
          <div key={idx} className="rounded-2xl border border-slate-200 bg-white p-8 dark:border-slate-800 dark:bg-slate-900">
            <div className="mb-4 text-4xl">{item.icon}</div>
            <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100">{item.title}</h3>
            <p className="mt-2 text-slate-500 dark:text-slate-400">{item.desc}</p>
            <Link to={item.link} className="mt-4 inline-block font-semibold text-emerald-600 hover:underline">View more &rarr;</Link>
          </div>
        ))}
      </section>
    </div>
  );
};

export default Home;
