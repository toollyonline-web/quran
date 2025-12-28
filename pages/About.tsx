
import React from 'react';

const About: React.FC = () => {
  return (
    <div className="mx-auto max-w-4xl py-16">
      <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white">About Al-Quran Kareem</h1>
      
      <div className="mt-10 space-y-12">
        <section>
          <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200">Our Digital Mission</h2>
          <p className="mt-4 text-lg leading-relaxed text-slate-600 dark:text-slate-400">
            <strong>Al-Quran Kareem</strong> was established with a singular vision: to create the most accessible and distraction-free digital gateway to the Word of Allah. In a world where screens are often filled with noise and fragmentation, we believe that the <strong>Holy Quran</strong> deserves a dedicated space that honors its sanctity while leveraging the efficiency of modern web technologies. Our platform allows users to <strong>read, listen, and study the Holy Quran online</strong> seamlessly across desktops, tablets, and smartphones.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200">Why Digital Quranic Study Matters</h2>
          <p className="mt-4 text-lg leading-relaxed text-slate-600 dark:text-slate-400">
            For centuries, the study of the <strong>Holy Quran</strong> required physical proximity to scholars and handwritten or printed Mus'hafs. While these traditional methods remain superior for many, the digital age offers unique opportunities for <strong>online study</strong> that were previously impossible. Users can now search for specific keywords like "mercy" or "gratitude" instantly across thousands of verses, access world-renowned <strong>translations</strong> in multiple languages such as English and Urdu at a click, and toggle between detailed Tafsirs (exegesis) for deeper contextual understanding.
          </p>
          <p className="mt-4 text-lg leading-relaxed text-slate-600 dark:text-slate-400">
            Our integration of high-quality audio recitations serves a vital purpose: correct pronunciation and spiritual connection. <strong>Listening to the Quran</strong> while following the Uthmani script helps in the memorization (Hifz) process and ensures that the listener is captivated by the divine eloquence and Tajweed that has been preserved for over 1,400 years.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200">The Power of Translations</h2>
          <p className="mt-4 text-lg leading-relaxed text-slate-600 dark:text-slate-400">
            Language should never be a barrier to Divine Guidance. <strong>Al-Quran Kareem</strong> prioritizes multi-lingual accessibility by providing verified <strong>translations</strong>. We currently offer English and Urdu translations to serve a vast global audience, with plans to expand further. These translations are sourced from reputable Islamic institutions to ensure that the essence of the Arabic text is conveyed as accurately as possible in other tongues, facilitating a more inclusive <strong>Holy Quran study</strong> experience for Muslims and non-Muslims alike.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200">Open Source & Authentic Data</h2>
          <p className="mt-4 text-lg leading-relaxed text-slate-600 dark:text-slate-400">
            Transparency and authenticity are the cornerstones of our project. We utilize the industry-standard <strong>Quran.com API (v4)</strong>, an open-source initiative that provides verified Quranic data to millions. By building on this robust foundation, we ensure that every letter, vowel mark, and translation displayed on our site is consistent with the highest standards of Islamic scholarship. Our platform is a non-profit effort, designed solely to serve the Ummah and seekers of truth everywhere.
          </p>
        </section>

        <div className="mt-12 rounded-3xl bg-emerald-50 p-8 dark:bg-emerald-950/30">
           <h3 className="text-xl font-bold text-emerald-800 dark:text-emerald-200">Key Features of Al-Quran Kareem:</h3>
           <ul className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 text-emerald-700 dark:text-emerald-300">
              <li className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-emerald-500"></span>
                <span>Complete 114 Surah index with detailed information.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-emerald-500"></span>
                <span>30 Juz (Sipara) organization for structured reading.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-emerald-500"></span>
                <span>Authentic Uthmani script for classical readability.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-emerald-500"></span>
                <span>Synchronized audio recitation for listening while reading.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-emerald-500"></span>
                <span>Dark mode for comfortable night-time study sessions.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-emerald-500"></span>
                <span>Integrated Zakat calculator and Names of Allah list.</span>
              </li>
           </ul>
        </div>
      </div>
    </div>
  );
};

export default About;
