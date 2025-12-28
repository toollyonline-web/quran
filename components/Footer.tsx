
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
              <strong>Al-Quran Kareem</strong> is your digital sanctuary for spiritual growth. Read and listen to the Holy Quran online with multi-lingual translations, accurate recitations, and deep scholarly insights. Our mission is to make Islamic education accessible to everyone, everywhere.
            </p>
            <div className="mt-8 flex gap-3">
              <a href="https://github.com/quran" target="_blank" rel="noreferrer" className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-50 text-slate-400 transition-colors hover:bg-emerald-50 hover:text-emerald-600 dark:bg-slate-900 dark:hover:bg-emerald-950" title="Source Code">
                <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.042-1.416-4.042-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
              </a>
              <a href="https://twitter.com/quran" target="_blank" rel="noreferrer" className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-50 text-slate-400 transition-colors hover:bg-emerald-50 hover:text-emerald-600 dark:bg-slate-900 dark:hover:bg-emerald-950" title="Updates">
                <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.84 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
              </a>
            </div>
          </div>

          <div className="col-span-1">
            <h4 className="text-sm font-black uppercase tracking-widest text-slate-900 dark:text-white">Quran Explore</h4>
            <ul className="mt-6 space-y-3">
              <li><Link to="/surahs" className="group flex items-center gap-2 text-sm text-slate-500 transition-colors hover:text-emerald-600 dark:text-slate-400">
                <span className="h-1 w-1 rounded-full bg-emerald-500 opacity-0 transition-opacity group-hover:opacity-100"></span>
                Full Surah Index
              </Link></li>
              <li><Link to="/juzs" className="group flex items-center gap-2 text-sm text-slate-500 transition-colors hover:text-emerald-600 dark:text-slate-400">
                <span className="h-1 w-1 rounded-full bg-emerald-500 opacity-0 transition-opacity group-hover:opacity-100"></span>
                Sipara List (30 Parts)
              </Link></li>
              <li><Link to="/surah/18" className="group flex items-center gap-2 text-sm text-slate-500 transition-colors hover:text-emerald-600 dark:text-slate-400">
                <span className="h-1 w-1 rounded-full bg-emerald-500 opacity-0 transition-opacity group-hover:opacity-100"></span>
                Read Surah Al-Kahf
              </Link></li>
              <li><Link to="/surah/36" className="group flex items-center gap-2 text-sm text-slate-500 transition-colors hover:text-emerald-600 dark:text-slate-400">
                <span className="h-1 w-1 rounded-full bg-emerald-500 opacity-0 transition-opacity group-hover:opacity-100"></span>
                Study Surah Yaseen
              </Link></li>
            </ul>
          </div>

          <div className="col-span-1">
            <h4 className="text-sm font-black uppercase tracking-widest text-slate-900 dark:text-white">Learn More</h4>
            <ul className="mt-6 space-y-3">
              <li><Link to="/about" className="group flex items-center gap-2 text-sm text-slate-500 transition-colors hover:text-emerald-600 dark:text-slate-400">
                <span className="h-1 w-1 rounded-full bg-emerald-500 opacity-0 transition-opacity group-hover:opacity-100"></span>
                About Al-Quran Kareem
              </Link></li>
              <li><Link to="/disclaimer" className="group flex items-center gap-2 text-sm text-slate-500 transition-colors hover:text-emerald-600 dark:text-slate-400">
                <span className="h-1 w-1 rounded-full bg-emerald-500 opacity-0 transition-opacity group-hover:opacity-100"></span>
                Legal & Disclaimer
              </Link></li>
              <li><a href="https://api-docs.quran.com" target="_blank" rel="noreferrer" className="group flex items-center gap-2 text-sm text-slate-500 transition-colors hover:text-emerald-600 dark:text-slate-400">
                <span className="h-1 w-1 rounded-full bg-emerald-500 opacity-0 transition-opacity group-hover:opacity-100"></span>
                API Documentation
              </a></li>
            </ul>
          </div>

          <div className="col-span-1">
            <h4 className="text-sm font-black uppercase tracking-widest text-slate-900 dark:text-white">Islamic Study Tools</h4>
            <ul className="mt-6 space-y-3">
              <li><Link to="/99-names" className="group flex items-center gap-2 text-sm text-slate-500 transition-colors hover:text-emerald-600 dark:text-slate-400">
                <span className="h-1 w-1 rounded-full bg-emerald-500 opacity-0 transition-opacity group-hover:opacity-100"></span>
                99 Names of Allah
              </Link></li>
              <li><Link to="/zakat" className="group flex items-center gap-2 text-sm text-slate-500 transition-colors hover:text-emerald-600 dark:text-slate-400">
                <span className="h-1 w-1 rounded-full bg-emerald-500 opacity-0 transition-opacity group-hover:opacity-100"></span>
                Zakat Calculation
              </Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-16 border-t border-slate-100 pt-8 dark:border-slate-800">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-xs font-medium text-slate-400">
              &copy; {new Date().getFullYear()} <strong>Al-Quran Kareem</strong>. Data by Quran.com. Recitations by Mishary Rashid Alafasy.
            </p>
            <div className="flex gap-6">
              <Link to="/disclaimer" className="text-xs font-medium text-slate-400 hover:text-emerald-600">Privacy Policy</Link>
              <Link to="/about" className="text-xs font-medium text-slate-400 hover:text-emerald-600">Contact Us</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
