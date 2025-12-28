
import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div className="flex flex-col gap-12 py-12">
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
