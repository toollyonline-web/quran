
import React from 'react';

const Disclaimer: React.FC = () => {
  return (
    <div className="mx-auto max-w-3xl py-16">
      <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white">Disclaimer</h1>
      <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-12 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <p className="text-xl leading-relaxed text-slate-700 dark:text-slate-300">
          This website is created for educational and personal use. All Quran text is sourced from authentic public-domain Islamic resources. If any correction is needed, please contact us.
        </p>
        <div className="mt-8 border-t border-slate-100 pt-8 dark:border-slate-800">
          <p className="text-sm text-slate-500">
            While we strive for 100% accuracy, we encourage users to cross-reference with printed Mus'hafs for serious study. Our data relies on the Quran.com API, which is a reputable open-source project used by millions worldwide.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Disclaimer;
