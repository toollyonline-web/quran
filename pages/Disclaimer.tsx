
import React from 'react';

const Disclaimer: React.FC = () => {
  return (
    <div className="mx-auto max-w-4xl py-16">
      <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white">Legal Disclaimer & Usage Policy</h1>
      <div className="mt-10 space-y-8">
        <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-4">Educational Purpose</h2>
          <p className="text-lg leading-relaxed text-slate-600 dark:text-slate-400">
            <strong>Al-Quran Kareem</strong> is a non-profit, digital platform created solely for educational and personal reflection purposes. We aim to provide a high-quality, accessible environment for users to <strong>read, listen, and study the Holy Quran online</strong>. The content provided on this website, including translations, audio recitations, and scholarly Tafsir, is intended to assist in understanding the Divine Message but should not be considered a substitute for direct consultation with qualified Islamic scholars for complex legal or theological rulings.
          </p>
        </section>

        <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-4">Accuracy and Data Integrity</h2>
          <p className="text-lg leading-relaxed text-slate-600 dark:text-slate-400">
            While we strive for absolute accuracy in every letter and vowel mark (Harakat), the nature of digital presentation can sometimes lead to rendering issues across different browsers and devices. All Quranic text is sourced from the highly respected <strong>Quran.com API (v4)</strong>, which is maintained by dedicated developers and scholars. We encourage our users to cross-reference their digital reading with a physical Mus'haf, especially when engaged in Hifz (memorization). If you detect any discrepancy, typographical error, or technical glitch, we request you to contact us immediately so we can investigate and correct it.
          </p>
        </section>

        <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-4">Translation and Tafsir Resources</h2>
          <p className="text-lg leading-relaxed text-slate-600 dark:text-slate-400">
            The <strong>translations</strong> provided on this site (such as English by Sahih International and Urdu by Fateh Muhammad Jalandhari) are interpretations of the meanings of the Holy Quran and are not the Quran itself. No translation can capture the full depth and miraculous nature of the original Arabic text. Similarly, the <strong>Tafsir</strong> summaries (e.g., Tafsir Ibn Kathir) represent historical scholarly efforts to explain the context and wisdom of the verses. Users are encouraged to study multiple perspectives to gain a holistic understanding of Islamic teachings.
          </p>
        </section>

        <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-4">Privacy and External Links</h2>
          <p className="text-lg leading-relaxed text-slate-600 dark:text-slate-400">
            This platform uses browser storage (localStorage) to remember your preferences, such as your last read Surah, bookmarks, and theme settings. We do not sell or share your personal data with third parties. Links to external resources (such as social media sharing plugins or API documentation) are provided for convenience, and Al-Quran Kareem is not responsible for the privacy practices or content of those external websites. By using this service, you agree to this disclaimer and our commitment to preserving the sanctity of the Holy Quran in the digital space.
          </p>
        </section>
      </div>
    </div>
  );
};

export default Disclaimer;
