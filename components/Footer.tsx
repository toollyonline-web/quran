
import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="mt-auto border-t border-slate-200 bg-white py-12 dark:border-slate-800 dark:bg-slate-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="col-span-1">
            <h3 className="text-lg font-bold text-emerald-700 dark:text-emerald-500">Al-Quran Kareem</h3>
            <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">
              Your digital companion for reading and reflecting upon the Words of Allah. Simple, beautiful, and distraction-free.
            </p>
          </div>
          <div className="col-span-1">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-900 dark:text-slate-100">Quick Links</h4>
            <ul className="mt-4 space-y-2">
              <li><Link to="/surahs" className="text-sm text-slate-500 hover:text-emerald-600 dark:text-slate-400">Surah List</Link></li>
              <li><Link to="/juzs" className="text-sm text-slate-500 hover:text-emerald-600 dark:text-slate-400">Sipara List</Link></li>
              <li><Link to="/about" className="text-sm text-slate-500 hover:text-emerald-600 dark:text-slate-400">About the Project</Link></li>
            </ul>
          </div>
          <div className="col-span-1">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-900 dark:text-slate-100">Legal</h4>
            <ul className="mt-4 space-y-2">
              <li><Link to="/disclaimer" className="text-sm text-slate-500 hover:text-emerald-600 dark:text-slate-400">Disclaimer</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t border-slate-200 pt-8 text-center dark:border-slate-800">
          <p className="text-xs text-slate-400">
            &copy; {new Date().getFullYear()} Al-Quran Kareem. Recitations by Mishary Rashid Alafasy.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
