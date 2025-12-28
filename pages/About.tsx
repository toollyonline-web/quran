
import React from 'react';

const About: React.FC = () => {
  return (
    <div className="mx-auto max-w-3xl py-16">
      <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white">About the Project</h1>
      <div className="prose prose-emerald mt-8 dark:prose-invert">
        <p className="text-lg text-slate-600 dark:text-slate-300">
          Al-Quran Kareem is a digital gateway designed to provide an immersive and distraction-free experience for reading and reflecting upon the Holy Quran. 
        </p>
        
        <h3 className="mt-12 text-2xl font-bold text-slate-800 dark:text-slate-200">Our Vision</h3>
        <p className="mt-4 text-slate-600 dark:text-slate-300">
          In an era of constant digital noise, we believe the Word of Allah should be accessible in its purest form. Our goal is to blend modern web technology with classical Islamic scholarship to create a platform that is fast, beautiful, and easy to use on any device.
        </p>

        <h3 className="mt-12 text-2xl font-bold text-slate-800 dark:text-slate-200">Technical Details</h3>
        <p className="mt-4 text-slate-600 dark:text-slate-300">
          This application is built using React and TypeScript. We utilize the powerful <strong>Quran.com API (v4)</strong> to source authenticated Uthmani script and world-renowned translations. Recitations are graciously provided by Qari Mishary Rashid Alafasy.
        </p>

        <div className="mt-12 rounded-2xl bg-emerald-50 p-6 dark:bg-emerald-950">
           <h4 className="font-bold text-emerald-800 dark:text-emerald-200">Features at a Glance:</h4>
           <ul className="mt-4 list-inside list-disc space-y-2 text-emerald-700 dark:text-emerald-300">
              <li>Uthmani Script Quran Text</li>
              <li>114 Surahs and 30 Juz Organization</li>
              <li>English and Urdu Translations</li>
              <li>Mishary Rashid Alafasy Audio</li>
              <li>Responsive Modern UI with Dark Mode</li>
              <li>Bookmark and Social Sharing</li>
           </ul>
        </div>
      </div>
    </div>
  );
};

export default About;
