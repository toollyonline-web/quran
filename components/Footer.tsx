
import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="relative mt-20 overflow-hidden border-t border-slate-200 bg-white py-16 dark:border-slate-800 dark:bg-slate-950">
      {/* Background Decoration */}
      <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-emerald-500/5 blur-3xl"></div>
      <div className="absolute -right-20 -bottom-20 h-64 w-64 rounded-full bg-amber-500/5 blur-3xl"></div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-4">
          <div className="col-span-1 lg:col-span-1">
            <Link to="/" className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-600 text-white shadow-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-black leading-none tracking-tight text-emerald-800 dark:text-emerald-400">Quran</span>
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-amber-600 dark:text-amber-500">Kareem</span>
              </div>
            </Link>
            <p className="mt-6 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
              Your digital gateway to the Divine Message. Explore the Holy Quran with beautiful recitations and multi-lingual translations in a clean, distraction-free interface.
            </p>
            <div className="mt-8 flex gap-3">
              {[1, 2, 3].map(i => (
                <div key={i} className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-50 text-slate-400 transition-colors hover:bg-emerald-50 hover:text-emerald-600 dark:bg-slate-900 dark:hover:bg-emerald-950">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                  </svg>
                </div>
              ))}
            </div>
          </div>

          <div className="col-span-1">
            <h4 className="text-sm font-black uppercase tracking-widest text-slate-900 dark:text-white">Quran Explore</h4>
            <ul className="mt-6 space-y-3">
              <li><Link to="/surahs" className="group flex items-center gap-2 text-sm text-slate-500 transition-colors hover:text-emerald-600 dark:text-slate-400">
                <span className="h-1 w-1 rounded-full bg-emerald-500 opacity-0 transition-opacity group-hover:opacity-100"></span>
                Surah Index
              </Link></li>
              <li><Link to="/juzs" className="group flex items-center gap-2 text-sm text-slate-500 transition-colors hover:text-emerald-600 dark:text-slate-400">
                <span className="h-1 w-1 rounded-full bg-emerald-500 opacity-0 transition-opacity group-hover:opacity-100"></span>
                Sipara List
              </Link></li>
              <li><Link to="/surah/18" className="group flex items-center gap-2 text-sm text-slate-500 transition-colors hover:text-emerald-600 dark:text-slate-400">
                <span className="h-1 w-1 rounded-full bg-emerald-500 opacity-0 transition-opacity group-hover:opacity-100"></span>
                Surah Al-Kahf
              </Link></li>
              <li><Link to="/surah/36" className="group flex items-center gap-2 text-sm text-slate-500 transition-colors hover:text-emerald-600 dark:text-slate-400">
                <span className="h-1 w-1 rounded-full bg-emerald-500 opacity-0 transition-opacity group-hover:opacity-100"></span>
                Surah Yaseen
              </Link></li>
            </ul>
          </div>

          <div className="col-span-1">
            <h4 className="text-sm font-black uppercase tracking-widest text-slate-900 dark:text-white">Learn More</h4>
            <ul className="mt-6 space-y-3">
              <li><Link to="/about" className="group flex items-center gap-2 text-sm text-slate-500 transition-colors hover:text-emerald-600 dark:text-slate-400">
                <span className="h-1 w-1 rounded-full bg-emerald-500 opacity-0 transition-opacity group-hover:opacity-100"></span>
                About Project
              </Link></li>
              <li><Link to="/disclaimer" className="group flex items-center gap-2 text-sm text-slate-500 transition-colors hover:text-emerald-600 dark:text-slate-400">
                <span className="h-1 w-1 rounded-full bg-emerald-500 opacity-0 transition-opacity group-hover:opacity-100"></span>
                Legal Disclaimer
              </Link></li>
              <li><a href="https://quran.com" target="_blank" rel="noreferrer" className="group flex items-center gap-2 text-sm text-slate-500 transition-colors hover:text-emerald-600 dark:text-slate-400">
                <span className="h-1 w-1 rounded-full bg-emerald-500 opacity-0 transition-opacity group-hover:opacity-100"></span>
                Quran.com API
              </a></li>
            </ul>
          </div>

          <div className="col-span-1">
            <h4 className="text-sm font-black uppercase tracking-widest text-slate-900 dark:text-white">Stay Connected</h4>
            <p className="mt-6 text-sm text-slate-500 dark:text-slate-400">Subscribe for weekly Quranic insights and app updates.</p>
            <form className="mt-4 flex flex-col gap-2" onSubmit={e => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Your email address" 
                className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm focus:border-emerald-500 focus:outline-none dark:border-slate-800 dark:bg-slate-900"
              />
              <button className="rounded-xl bg-emerald-600 py-2 text-sm font-bold text-white shadow-md transition-all hover:bg-emerald-700">
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="mt-16 border-t border-slate-100 pt-8 dark:border-slate-800">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-xs font-medium text-slate-400">
              &copy; {new Date().getFullYear()} Quran Kareem. Recitations by Mishary Rashid Alafasy.
            </p>
            <div className="flex gap-6">
              <Link to="/disclaimer" className="text-xs font-medium text-slate-400 hover:text-emerald-600">Privacy</Link>
              <Link to="/about" className="text-xs font-medium text-slate-400 hover:text-emerald-600">Contact</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
