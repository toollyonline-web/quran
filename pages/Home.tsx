
import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { fetchPrayerTimes, PrayerData, getNextPrayer } from '../services/prayerTimes';
import { NAMES_OF_ALLAH } from '../services/extraContent';

interface Dua {
  arabic: string;
  translation: string;
  reference: string;
  surahId: number;
}

const DUAS: Dua[] = [
  {
    arabic: "رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ",
    translation: "Our Lord, give us in this world [that which is] good and in the Hereafter [that which is] good and protect us from the punishment of the Fire.",
    reference: "Al-Baqarah 2:201",
    surahId: 2
  },
  {
    arabic: "رَبَّنَا لَا تُزِغْ قُلُوبَنَا بَعْدَ إِذْ هَدَيْتَنَا وَهَبْ لَنَا مِن لَّدُنكَ رَحْمَةً ۚ إِنَّكَ أَنتَ الْوَهَّابُ",
    translation: "Our Lord, let not our hearts deviate after You have guided us and grant us from Yourself mercy. Indeed, You are the Bestower.",
    reference: "Ali 'Imran 3:8",
    surahId: 3
  },
  {
    arabic: "رَبَّنَا هَبْ لَنَا مِنْ أَزْوَاجِنَا وَذُرِّيَّاتِنَا قُرَّةَ أَعْيُنٍ وَاجْعَلْنَا لِلْمُتَّقِينَ إِمَامًا",
    translation: "Our Lord, grant us from among our wives and offspring comfort to our eyes and make us an example for the righteous.",
    reference: "Al-Furqan 25:74",
    surahId: 25
  },
  {
    arabic: "رَبِّ اجْعَلْنِي مُقِيمَ الصَّلَاةِ وَمِن ذُرِّيَّتِي ۚ رَبَّنَا وَتَقَبَّلْ دُعَاءِ",
    translation: "My Lord, make me an establisher of prayer, and [many] from my descendants. Our Lord, and accept my supplication.",
    reference: "Ibrahim 14:40",
    surahId: 14
  },
  {
    arabic: "رَبِّ إِنِّي لِمَا أَنزَلْتَ إِلَيَّ مِنْ خَيْرٍ فَقِيرٌ",
    translation: "My Lord, indeed I am, for whatever good You would send down to me, in need.",
    reference: "Al-Qasas 28:24",
    surahId: 28
  },
  {
    arabic: "رَبَّنَا لَا تُؤَاخِذْنَا إِن نَّسِينَا أَوْ أَخْطَأْنَا",
    translation: "Our Lord, do not impose blame upon us if we have forgotten or erred.",
    reference: "Al-Baqarah 2:286",
    surahId: 2
  },
  {
    arabic: "رَبِّ اغْفِرْ وَارْحَمْ وَأَنتَ خَيْرُ الرَّاحِمِينَ",
    translation: "My Lord, forgive and have mercy, and You are the best of the merciful.",
    reference: "Al-Mu'minun 23:118",
    surahId: 23
  },
  {
    arabic: "رَبَّنَا تَقَبَّلْ مِنَّا ۖ إِنَّكَ أَنتَ السَّمِيعُ الْعَلِيمُ",
    translation: "Our Lord, accept [this] from us. Indeed You are the Hearing, the Knowing.",
    reference: "Al-Baqarah 2:127",
    surahId: 2
  }
];

const Home: React.FC = () => {
  const [lastRead, setLastRead] = useState<{ id: number; name: string; type: string } | null>(null);
  const [prayerData, setPrayerData] = useState<PrayerData | null>(null);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [isLocating, setIsLocating] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('quran_last_read');
    if (saved) {
      setLastRead(JSON.parse(saved));
    }
    
    handleGetLocation();
  }, []);

  const handleGetLocation = () => {
    setIsLocating(true);
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const data = await fetchPrayerTimes(position.coords.latitude, position.coords.longitude);
            setPrayerData(data);
            setLocationError(null);
          } catch (err) {
            setLocationError("Could not fetch timings");
          } finally {
            setIsLocating(false);
          }
        },
        (err) => {
          setLocationError("Location access denied");
          setIsLocating(false);
        }
      );
    } else {
      setLocationError("Geolocation not supported");
      setIsLocating(false);
    }
  };

  const nextPrayer = useMemo(() => {
    if (!prayerData) return null;
    return getNextPrayer(prayerData.timings);
  }, [prayerData]);

  const dailyDua = useMemo(() => {
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 0);
    const diff = now.getTime() - start.getTime();
    const oneDay = 1000 * 60 * 60 * 24;
    const dayOfYear = Math.floor(diff / oneDay);
    return DUAS[dayOfYear % DUAS.length];
  }, []);

  const nameOfTheDay = useMemo(() => {
    const now = new Date();
    const dayOfYear = Math.floor((now.getTime() - new Date(now.getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24));
    return NAMES_OF_ALLAH[dayOfYear % NAMES_OF_ALLAH.length];
  }, []);

  const popularSurahs = [
    { id: 1, name: 'Al-Fatihah', arabic: 'الفاتحة' },
    { id: 18, name: 'Al-Kahf', arabic: 'الكهف' },
    { id: 36, name: 'Yaseen', arabic: 'يس' },
    { id: 55, name: 'Ar-Rahman', arabic: 'الرحمن' },
    { id: 56, name: 'Al-Waqi\'ah', arabic: 'الواقعة' },
    { id: 67, name: 'Al-Mulk', arabic: 'الملك' },
  ];

  const handleShareDua = () => {
    const text = `Dua of the Day:\n${dailyDua.arabic}\n\n"${dailyDua.translation}"\n\nReference: ${dailyDua.reference}\nRead more at Al-Quran Kareem`;
    if (navigator.share) {
      navigator.share({ title: 'Daily Supplication', text }).catch(() => {});
    } else {
      navigator.clipboard.writeText(text);
      alert('Dua copied to clipboard!');
    }
  };

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

      {/* Prayer Times Section */}
      <section className="animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="overflow-hidden rounded-3xl border border-stone-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex flex-col md:flex-row">
            <div className="bg-emerald-600 p-8 text-white md:w-1/3">
              <div className="flex items-center gap-2 mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="text-sm font-semibold opacity-90">Local Prayer Times</span>
              </div>
              
              {prayerData ? (
                <>
                  <div className="text-3xl font-bold mb-1">{nextPrayer?.name}</div>
                  <div className="text-5xl font-extrabold mb-4">{nextPrayer?.time}</div>
                  <div className="text-sm opacity-80">{prayerData.date.hijri.day} {prayerData.date.hijri.month.en} {prayerData.date.hijri.year} AH</div>
                </>
              ) : locationError ? (
                <div className="py-4">
                  <p className="text-sm mb-4">{locationError}</p>
                  <button onClick={handleGetLocation} className="rounded-lg bg-emerald-500 px-4 py-2 text-sm font-bold transition-colors hover:bg-emerald-400">
                    Retry Location
                  </button>
                </div>
              ) : (
                <div className="py-4 animate-pulse">Detecting Location...</div>
              )}
            </div>

            <div className="flex-1 p-8">
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-5">
                {prayerData ? (
                  Object.entries(prayerData.timings)
                    .filter(([name]) => ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"].includes(name))
                    .map(([name, time]) => (
                      <div 
                        key={name} 
                        className={`rounded-2xl p-4 text-center transition-all ${nextPrayer?.name === name ? 'bg-emerald-50 border-emerald-200 dark:bg-emerald-900/20 dark:border-emerald-800' : 'bg-stone-50 border-stone-100 dark:bg-slate-800 dark:border-slate-700'} border`}
                      >
                        <div className={`text-xs font-bold uppercase tracking-wider mb-1 ${nextPrayer?.name === name ? 'text-emerald-600' : 'text-slate-400'}`}>
                          {name}
                        </div>
                        <div className={`text-lg font-extrabold ${nextPrayer?.name === name ? 'text-emerald-700 dark:text-emerald-400' : 'text-slate-700 dark:text-slate-300'}`}>
                          {time}
                        </div>
                      </div>
                    ))
                ) : (
                  [1, 2, 3, 4, 5].map(i => (
                    <div key={i} className="h-20 rounded-2xl bg-stone-100 animate-pulse dark:bg-slate-800"></div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Two Column Section: Dua and Name of Allah */}
      <section className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* Daily Dua */}
        <div className="relative overflow-hidden rounded-3xl border border-stone-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                </svg>
              </span>
              <h2 className="text-sm font-bold uppercase tracking-widest text-emerald-700 dark:text-emerald-500">Daily Supplication</h2>
            </div>
            <button onClick={handleShareDua} className="text-slate-400 hover:text-emerald-600 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
              </svg>
            </button>
          </div>
          <div className="text-center">
            <p dir="rtl" className="font-arabic text-3xl leading-relaxed text-slate-900 dark:text-white mb-6">
              {dailyDua.arabic}
            </p>
            <p className="text-lg italic text-slate-600 dark:text-slate-300 mb-4 px-4">
              "{dailyDua.translation}"
            </p>
            <Link to={`/surah/${dailyDua.surahId}`} className="text-xs font-bold text-emerald-600 hover:underline">
              {dailyDua.reference}
            </Link>
          </div>
        </div>

        {/* Name of the Day */}
        <Link to="/99-names" className="group relative overflow-hidden rounded-3xl border border-stone-200 bg-white p-8 shadow-sm transition-all hover:border-amber-400/50 dark:border-slate-800 dark:bg-slate-900">
           <div className="absolute -right-6 -top-6 h-32 w-32 rounded-full bg-amber-500/5 blur-2xl group-hover:bg-amber-500/10 transition-colors"></div>
           <div className="flex items-center gap-2 mb-8">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400">
                ✨
              </span>
              <h2 className="text-sm font-bold uppercase tracking-widest text-amber-700 dark:text-amber-500">Name of the Day</h2>
            </div>
            <div className="text-center">
              <p dir="rtl" className="font-arabic text-5xl leading-relaxed text-emerald-700 dark:text-emerald-400 mb-4 transition-transform group-hover:scale-110">
                {nameOfTheDay.name}
              </p>
              <h3 className="text-2xl font-black text-slate-900 dark:text-white">{nameOfTheDay.transliteration}</h3>
              <p className="text-lg font-medium text-amber-600 mb-2">{nameOfTheDay.en.meaning}</p>
              <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2">{nameOfTheDay.en.description}</p>
            </div>
        </Link>
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
                   to={`/${lastRead.type}/${lastRead.id}`}
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

      {/* Spiritual Tools Section */}
      <section>
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Spiritual Tools</h2>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <Link to="/zakat" className="flex items-center gap-6 rounded-3xl border border-slate-200 bg-white p-8 transition-all hover:border-emerald-400 hover:shadow-md dark:border-slate-800 dark:bg-slate-900">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-100 text-3xl dark:bg-emerald-900/30">💰</div>
            <div>
              <h3 className="text-xl font-bold text-slate-800 dark:text-white">Zakat Calculator</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">Calculate your annual charity contributions easily.</p>
            </div>
          </Link>
          <Link to="/99-names" className="flex items-center gap-6 rounded-3xl border border-slate-200 bg-white p-8 transition-all hover:border-emerald-400 hover:shadow-md dark:border-slate-800 dark:bg-slate-900">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-100 text-3xl dark:bg-amber-900/30">✨</div>
            <div>
              <h3 className="text-xl font-bold text-slate-800 dark:text-white">99 Names of Allah</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">Explore the beautiful attributes of the Creator.</p>
            </div>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
