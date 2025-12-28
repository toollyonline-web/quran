
import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { fetchPrayerTimes, PrayerData, getNextPrayer } from '../services/prayerTimes';
import { NAMES_OF_ALLAH } from '../services/extraContent';
import ShareButtons from '../components/ShareButtons';

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
  }
];

const Home: React.FC = () => {
  const [prayerData, setPrayerData] = useState<PrayerData | null>(null);
  const [isLocating, setIsLocating] = useState(false);

  useEffect(() => {
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
          } catch (err) {
            console.error(err);
          } finally {
            setIsLocating(false);
          }
        },
        () => setIsLocating(false)
      );
    } else {
      setIsLocating(false);
    }
  };

  const nextPrayer = useMemo(() => {
    if (!prayerData) return null;
    return getNextPrayer(prayerData.timings);
  }, [prayerData]);

  const dailyDua = useMemo(() => {
    const now = new Date();
    const dayOfYear = Math.floor((now.getTime() - new Date(now.getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24));
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
      <section className="relative overflow-hidden rounded-3xl bg-emerald-800 px-6 py-20 text-center text-white sm:px-12 shadow-2xl">
        <div className="absolute -left-10 -top-10 h-64 w-64 rounded-full bg-emerald-700 opacity-20 blur-3xl"></div>
        <div className="absolute -right-10 -bottom-10 h-64 w-64 rounded-full bg-emerald-900 opacity-30 blur-3xl"></div>
        
        <h1 className="relative z-10 text-4xl font-extrabold sm:text-6xl leading-tight">
           Al-Quran Kareem: <br/><span className="text-emerald-300 font-serif italic">Read, Listen & Study the Holy Quran Online with Translations</span>
        </h1>
        <p className="relative z-10 mx-auto mt-6 max-w-2xl text-lg text-emerald-100">
          Your comprehensive digital portal to access the Word of Allah. Features all 114 Surahs, multi-lingual translations, and soulful recitations for a deeper spiritual connection.
        </p>
        
        <div className="relative z-10 mt-10 flex flex-wrap justify-center gap-4">
          <Link to="/surahs" className="rounded-full bg-white px-10 py-4 font-bold text-emerald-800 transition-all hover:scale-105 hover:bg-emerald-50 active:scale-95 shadow-lg">
            Browse Surahs
          </Link>
          <Link to="/juzs" className="rounded-full border-2 border-emerald-300 px-10 py-4 font-bold text-emerald-100 transition-all hover:bg-emerald-300 hover:text-emerald-900 active:scale-95">
            Browse Siparas
          </Link>
        </div>

        <div className="relative z-10 mt-12 flex flex-col items-center border-t border-emerald-700/50 pt-8">
           <span className="mb-4 text-xs font-bold uppercase tracking-widest text-emerald-300">Spread the Eternal Message</span>
           <ShareButtons 
              url={window.location.origin} 
              title="Al-Quran Kareem Online" 
              text="Experience the Holy Quran with translations and audio recitations on Al-Quran Kareem." 
           />
        </div>
      </section>

      {/* Main Educational Content Section */}
      <section className="mx-auto max-w-5xl text-center">
        <h2 className="text-3xl font-bold text-slate-800 dark:text-white mb-8">Understanding the Significance of the Holy Quran</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
          <div className="space-y-4">
            <p className="text-lg leading-relaxed text-slate-600 dark:text-slate-400">
              The <strong>Holy Quran</strong> is the bedrock of Islamic faith, serving as the final and complete revelation from Allah (SWT) to Prophet Muhammad (PBUH). Our platform, <strong>Al-Quran Kareem</strong>, is designed to facilitate a deeper engagement with these divine verses. By choosing to <strong>read the Quran online</strong>, you gain access to an environment tailored for reflection, where you can toggle between original Arabic scripts and modern <strong>translations</strong> like English and Urdu at your convenience.
            </p>
            <p className="text-lg leading-relaxed text-slate-600 dark:text-slate-400">
              When you <strong>listen to the Quran online</strong> on our site, you are hearing recitations from world-class Qaris. This auditory experience is essential for improving one's Tajweed (pronunciation rules) and for feeling the profound emotional impact of the Quran's linguistic miracles. Whether you are a student of knowledge or a casual reader, our <strong>online study</strong> tools provide the context needed to understand the historical and spiritual depths of each Surah.
            </p>
          </div>
          <div className="space-y-4">
            <p className="text-lg leading-relaxed text-slate-600 dark:text-slate-400">
              Modern life is fast-paced, but your spiritual journey shouldn't suffer. <strong>Al-Quran Kareem</strong> bridges the gap between traditional worship and digital convenience. We provide tools for <strong>Juz-based reading</strong> (Siparas), specific verse searches, and Tafsir integration. This ensures that every time you visit, you can pick up exactly where you left off, whether you are on a desktop at home or using our PWA-enabled mobile experience while traveling.
            </p>
            <p className="text-lg leading-relaxed text-slate-600 dark:text-slate-400">
              Beyond reading, we invite you to explore the <strong>99 Names of Allah</strong> and utilize our <strong>Zakat Calculator</strong> to fulfill your religious obligations. Our mission is to host an all-in-one Islamic resource that is fast, reliable, and completely free of charge. We believe that everyone should have the ability to <strong>study the Holy Quran</strong> without barriers, fostering a global community of enlightened and spiritually grounded individuals.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Section: FAQ */}
      <section className="rounded-3xl bg-slate-100 p-8 dark:bg-slate-900/50">
        <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-8 text-center">Common Questions About Quran Study</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <div className="rounded-2xl bg-white p-6 shadow-sm dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
            <h3 className="font-bold text-emerald-700 dark:text-emerald-400 mb-2">Can I read the Quran without Wudu online?</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">While many scholars allow reading from a digital screen without Wudu, it is always recommended to be in a state of purity when engaging with the Holy Verses to show respect and prepare your heart for guidance.</p>
          </div>
          <div className="rounded-2xl bg-white p-6 shadow-sm dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
            <h3 className="font-bold text-emerald-700 dark:text-emerald-400 mb-2">What is the best way to memorize Surahs?</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">Consistency is key. Use our audio player to <strong>listen to the Quran</strong> repeatedly, and follow along with the <strong>Word-by-Word translation</strong> to understand the meaning while you memorize.</p>
          </div>
          <div className="rounded-2xl bg-white p-6 shadow-sm dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
            <h3 className="font-bold text-emerald-700 dark:text-emerald-400 mb-2">How do I find a specific Ayah?</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">Head over to our <strong>Surah Index</strong> and use the search bar. You can search by Surah name, number, or even keywords found within the English translations.</p>
          </div>
          <div className="rounded-2xl bg-white p-6 shadow-sm dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
            <h3 className="font-bold text-emerald-700 dark:text-emerald-400 mb-2">Are these translations authentic?</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">We use the Sahih International translation for English and the Fateh Muhammad Jalandhari translation for Urdu, both of which are highly regarded for their accuracy and clarity.</p>
          </div>
        </div>
      </section>

      {/* Prayer Times Section */}
      <section className="animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Local Prayer Timings</h2>
        </div>
        <div className="overflow-hidden rounded-3xl border border-stone-200 bg-white shadow-xl dark:border-slate-800 dark:bg-slate-900">
          <div className="flex flex-col md:flex-row">
            <div className="bg-emerald-600 p-8 text-white md:w-1/3">
              <div className="flex items-center gap-2 mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                </svg>
                <span className="text-sm font-semibold opacity-90">Current Location Timings</span>
              </div>
              {prayerData ? (
                <>
                  <div className="text-3xl font-bold mb-1">{nextPrayer?.name}</div>
                  <div className="text-5xl font-extrabold mb-4">{nextPrayer?.time}</div>
                  <div className="text-sm opacity-80">{prayerData.date.hijri.day} {prayerData.date.hijri.month.en} {prayerData.date.hijri.year} AH</div>
                </>
              ) : (
                <div className="py-4 animate-pulse">Detecting your location...</div>
              )}
            </div>
            <div className="flex-1 p-8">
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-5">
                {prayerData ? (
                  Object.entries(prayerData.timings)
                    .filter(([name]) => ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"].includes(name))
                    .map(([name, time]) => (
                      <div key={name} className={`rounded-2xl p-4 text-center border transition-all ${nextPrayer?.name === name ? 'bg-emerald-50 border-emerald-200 scale-105 shadow-md dark:bg-emerald-900/20 dark:border-emerald-800' : 'bg-stone-50 border-stone-100 dark:bg-slate-800 dark:border-slate-700'}`}>
                        <div className={`text-xs font-bold uppercase tracking-wider mb-1 ${nextPrayer?.name === name ? 'text-emerald-600' : 'text-slate-400'}`}>{name}</div>
                        <div className={`text-lg font-extrabold ${nextPrayer?.name === name ? 'text-emerald-700 dark:text-emerald-400' : 'text-slate-700 dark:text-slate-300'}`}>{time}</div>
                      </div>
                    ))
                ) : [1, 2, 3, 4, 5].map(i => <div key={i} className="h-20 rounded-2xl bg-stone-100 animate-pulse dark:bg-slate-800"></div>)}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Two Column Section: Dua and Name of Allah */}
      <section className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <div className="relative overflow-hidden rounded-3xl border border-stone-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-bold text-slate-800 dark:text-white">Daily Supplication</h2>
            <button onClick={handleShareDua} className="text-slate-400 hover:text-emerald-600 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
              </svg>
            </button>
          </div>
          <div className="text-center">
            <p dir="rtl" className="font-arabic text-3xl leading-relaxed text-slate-900 dark:text-white mb-6">{dailyDua.arabic}</p>
            <p className="text-lg italic text-slate-600 dark:text-slate-300 mb-4 px-4">"{dailyDua.translation}"</p>
            <Link to={`/surah/${dailyDua.surahId}`} className="text-xs font-bold text-emerald-600 hover:underline">{dailyDua.reference}</Link>
          </div>
        </div>
        <Link to="/99-names" className="group relative overflow-hidden rounded-3xl border border-stone-200 bg-white p-8 shadow-sm transition-all hover:border-amber-400/50 dark:border-slate-800 dark:bg-slate-900">
           <div className="flex items-center gap-2 mb-8">
              <h2 className="text-xl font-bold text-slate-800 dark:text-white">Divine Name of the Day</h2>
            </div>
            <div className="text-center">
              <p dir="rtl" className="font-arabic text-5xl leading-relaxed text-emerald-700 dark:text-emerald-400 mb-4 transition-transform group-hover:scale-110">{nameOfTheDay.name}</p>
              <h3 className="text-2xl font-black text-slate-900 dark:text-white">{nameOfTheDay.transliteration}</h3>
              <p className="text-lg font-medium text-amber-600 mb-2">{nameOfTheDay.en.meaning}</p>
            </div>
        </Link>
      </section>

      {/* Popular Surahs Section */}
      <section>
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Quick Access to Surahs</h2>
          <Link to="/surahs" className="text-sm font-semibold text-emerald-600 hover:underline">View All Surahs</Link>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-6">
          {popularSurahs.map((surah) => (
            <Link key={surah.id} to={`/surah/${surah.id}`} className="group flex flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white p-6 transition-all hover:border-emerald-400 hover:shadow-md dark:border-slate-800 dark:bg-slate-900">
              <div className="mb-2 font-arabic text-2xl text-emerald-700 transition-transform group-hover:scale-110 dark:text-emerald-400">{surah.arabic}</div>
              <div className="text-center">
                <div className="text-sm font-bold text-slate-800 dark:text-white">{surah.name}</div>
                <div className="text-[10px] text-slate-400">Chapter {surah.id}</div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
