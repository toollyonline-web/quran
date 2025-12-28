
import React, { useState, useEffect, useRef } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { Verse, Surah, Settings, TafsirResource } from '../types';
import { fetchSurahVerses, fetchJuzVerses, fetchSurahDetails, getAudioUrl, fetchTafsirs, fetchTafsirResources } from '../services/quranApi';
import AyahItem from '../components/AyahItem';

const Reader: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const isJuz = location.pathname.includes('/juz/');
  
  const [verses, setVerses] = useState<Verse[]>([]);
  const [surah, setSurah] = useState<Surah | null>(null);
  const [tafsirs, setTafsirs] = useState<Record<string, string>>({});
  const [tafsirResources, setTafsirResources] = useState<TafsirResource[]>([]);
  const [loading, setLoading] = useState(true);
  const [tafsirLoading, setTafsirLoading] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [bookmarks, setBookmarks] = useState<string[]>([]);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const playPromiseRef = useRef<Promise<void> | null>(null);

  const [settings, setSettings] = useState<Settings>(() => {
    const saved = localStorage.getItem('quran_settings');
    return saved ? JSON.parse(saved) : {
      showEnglish: true,
      showUrdu: true,
      showTafsir: false,
      selectedTafsirId: 169, // Default: Ibn Kathir
      isDarkMode: false,
      fontSize: 1.125
    };
  });

  useEffect(() => {
    localStorage.setItem('quran_settings', JSON.stringify(settings));
  }, [settings]);

  useEffect(() => {
    const saved = localStorage.getItem('quran_bookmarks');
    if (saved) setBookmarks(JSON.parse(saved));
  }, []);

  // Audio Cleanup on unmount
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = "";
        audioRef.current.load();
        audioRef.current = null;
      }
    };
  }, []);

  const loadTafsirResources = async () => {
    try {
      const resources = await fetchTafsirResources('en');
      setTafsirResources(resources);
    } catch (e) {
      console.error("Failed to load tafsir resources", e);
    }
  };

  const loadTafsirContent = async (tafsirId: number = settings.selectedTafsirId) => {
    if (tafsirLoading) return;
    setTafsirLoading(true);
    try {
      const idNum = parseInt(id || '1');
      const data = await fetchTafsirs(idNum, isJuz, tafsirId);
      setTafsirs(data);
    } catch (e) {
      console.error("Failed to load tafsir", e);
    } finally {
      setTafsirLoading(false);
    }
  };

  const handleTafsirToggle = () => {
    const nextShowTafsir = !settings.showTafsir;
    setSettings(prev => ({ ...prev, showTafsir: nextShowTafsir }));
    
    if (nextShowTafsir && Object.keys(tafsirs).length === 0) {
      loadTafsirContent();
    }
  };

  const handleTafsirResourceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newId = parseInt(e.target.value);
    setSettings(prev => ({ ...prev, selectedTafsirId: newId }));
    if (settings.showTafsir) {
      loadTafsirContent(newId);
    }
  };

  useEffect(() => {
    setLoading(true);
    setTafsirs({}); // Reset tafsirs on page change
    
    // Reset audio when switching surahs
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = "";
      audioRef.current.load();
      audioRef.current = null;
      setIsPlaying(false);
    }

    const idNum = parseInt(id || '1');
    
    const loadContent = async () => {
      try {
        if (isJuz) {
          const data = await fetchJuzVerses(idNum);
          setVerses(data);
          setSurah(null);
        } else {
          const [vData, sData] = await Promise.all([
            fetchSurahVerses(idNum),
            fetchSurahDetails(idNum)
          ]);
          setVerses(vData);
          setSurah(sData);
          localStorage.setItem('quran_last_read', JSON.stringify({
            type: 'surah',
            id: idNum,
            name: sData.name_simple
          }));
        }
        
        if (tafsirResources.length === 0) {
            await loadTafsirResources();
        }

        if (settings.showTafsir) {
            await loadTafsirContent();
        }
      } catch (error) {
        console.error("Failed to fetch content", error);
      } finally {
        setLoading(false);
      }
    };

    loadContent();
    window.scrollTo(0, 0);
  }, [id, isJuz]);

  const toggleBookmark = (key: string) => {
    setBookmarks(prev => {
      const next = prev.includes(key) ? prev.filter(k => k !== key) : [...prev, key];
      localStorage.setItem('quran_bookmarks', JSON.stringify(next));
      return next;
    });
  };

  const toggleAudio = async () => {
    if (!audioRef.current) {
        if (!isJuz && surah) {
            const url = getAudioUrl(surah.id);
            const audio = new Audio();
            audio.preload = "auto";
            audio.src = url;
            audio.onended = () => setIsPlaying(false);
            // Handle audio error safely by referencing the audio element directly
            audio.onerror = (e) => {
              const audioErr = audio.error;
              console.error("Audio playback error:", audioErr?.message || "Source not supported or unreachable.", e);
              setIsPlaying(false);
              alert("Sorry, this audio recitation is currently unavailable from this server.");
            };
            audioRef.current = audio;
        }
    }
    
    const audio = audioRef.current;
    if (audio) {
        if (isPlaying) {
            if (playPromiseRef.current !== null) {
                try {
                    await playPromiseRef.current;
                } catch (e) { /* ignore interrupted play errors */ }
            }
            audio.pause();
            setIsPlaying(false);
        } else {
            try {
                // Ensure audio is ready or retry source
                if (audio.readyState === 0 && !isJuz && surah) {
                   audio.src = getAudioUrl(surah.id);
                   audio.load();
                }
                playPromiseRef.current = audio.play();
                setIsPlaying(true);
                await playPromiseRef.current;
            } catch (err) {
                console.error("Playback was prevented:", err);
                setIsPlaying(false);
            } finally {
                playPromiseRef.current = null;
            }
        }
    }
  };

  const selectedTafsirName = tafsirResources.find(r => r.id === settings.selectedTafsirId)?.name;

  if (loading) return (
    <div className="flex h-[80vh] items-center justify-center">
       <div className="h-12 w-12 animate-spin rounded-full border-4 border-emerald-500 border-t-transparent"></div>
    </div>
  );

  return (
    <div className="mx-auto max-w-4xl py-12">
      <div className="mb-12 rounded-3xl bg-white p-8 text-center shadow-sm dark:bg-slate-900">
        <div className="text-emerald-600 dark:text-emerald-400">
          {isJuz ? `Sipara ${id}` : `Surah ${surah?.id}`}
        </div>
        <h1 className="mt-2 text-4xl font-extrabold text-slate-900 dark:text-white">
          {isJuz ? `Juz ${id}` : surah?.name_simple}
        </h1>
        {!isJuz && surah && (
          <div className="mt-4 flex flex-wrap items-center justify-center gap-4 text-sm text-slate-500">
            <span>{surah.translated_name.name}</span>
            <span className="h-1 w-1 rounded-full bg-slate-300"></span>
            <span>{surah.verses_count} Verses</span>
            <span className="h-1 w-1 rounded-full bg-slate-300"></span>
            <span>{surah.revelation_place}</span>
          </div>
        )}

        <div className="mt-8 flex items-center justify-center gap-4">
          {!isJuz && (
            <button
              onClick={toggleAudio}
              className={`flex items-center gap-2 rounded-full px-6 py-2 font-bold transition-all ${
                isPlaying 
                  ? 'bg-rose-50 text-rose-600 hover:bg-rose-100' 
                  : 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-lg shadow-emerald-200 dark:shadow-none'
              }`}
            >
              {isPlaying ? (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  Pause Recitation
                </>
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                  </svg>
                  Play Full Surah
                </>
              )}
            </button>
          )}
        </div>
      </div>

      <div className="sticky top-[72px] z-40 mb-8 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-emerald-50 bg-white/90 p-3 shadow-sm backdrop-blur-sm dark:border-slate-800 dark:bg-slate-900/90">
        <div className="flex flex-wrap items-center gap-2">
            <button 
                onClick={() => setSettings(s => ({ ...s, showEnglish: !s.showEnglish }))}
                className={`rounded-lg px-3 py-1.5 text-xs font-bold transition-colors ${settings.showEnglish ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300' : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800'}`}
            >
                English
            </button>
            <button 
                onClick={() => setSettings(s => ({ ...s, showUrdu: !s.showUrdu }))}
                className={`rounded-lg px-3 py-1.5 text-xs font-bold transition-colors ${settings.showUrdu ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300' : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800'}`}
            >
                Urdu
            </button>
            <div className="flex items-center gap-2">
                <button 
                    onClick={handleTafsirToggle}
                    className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-bold transition-colors ${settings.showTafsir ? 'bg-emerald-600 text-white shadow-sm' : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800'}`}
                >
                    {tafsirLoading && <div className="h-3 w-3 animate-spin rounded-full border-2 border-white border-t-transparent"></div>}
                    Tafsir
                </button>
                {settings.showTafsir && tafsirResources.length > 0 && (
                    <select 
                        value={settings.selectedTafsirId}
                        onChange={handleTafsirResourceChange}
                        className="rounded-lg border border-slate-200 bg-white py-1 px-2 text-xs font-medium focus:border-emerald-500 focus:outline-none dark:border-slate-800 dark:bg-slate-900"
                    >
                        {tafsirResources.map(res => (
                            <option key={res.id} value={res.id}>{res.name} ({res.language_name})</option>
                        ))}
                    </select>
                )}
            </div>
        </div>
        <div className="flex items-center gap-3 ml-auto">
            <button 
                onClick={() => setSettings(s => ({ ...s, fontSize: Math.max(s.fontSize - 0.1, 0.8) }))}
                className="rounded-full p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
                title="Decrease font size"
            >
                A-
            </button>
            <button 
                onClick={() => setSettings(s => ({ ...s, fontSize: Math.min(s.fontSize + 0.1, 2) }))}
                className="rounded-full p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
                title="Increase font size"
            >
                A+
            </button>
        </div>
      </div>

      <div className="space-y-4">
        {surah?.bismillah_pre && (
            <div dir="rtl" className="font-arabic mb-12 py-8 text-center text-3xl text-emerald-800 dark:text-emerald-400">
                بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ
            </div>
        )}
        
        {verses.map(verse => (
          <AyahItem 
            key={verse.id} 
            verse={verse} 
            settings={settings} 
            onBookmark={toggleBookmark}
            isBookmarked={bookmarks.includes(verse.verse_key)}
            tafsir={tafsirs[verse.verse_key]}
            tafsirName={selectedTafsirName}
          />
        ))}
      </div>
    </div>
  );
};

export default Reader;
