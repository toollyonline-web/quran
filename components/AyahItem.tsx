
import React from 'react';
import { Verse, Settings } from '../types';

interface AyahItemProps {
  verse: Verse;
  settings: Settings;
  onBookmark: (key: string) => void;
  isBookmarked: boolean;
  tafsir?: string;
}

const AyahItem: React.FC<AyahItemProps> = ({ verse, settings, onBookmark, isBookmarked, tafsir }) => {
  const englishTrans = verse.translations?.find(t => t.resource_id === 131)?.text;
  const urduTrans = verse.translations?.find(t => t.resource_id === 158)?.text;

  const handleShare = () => {
    const text = `Quran [${verse.verse_key}]: ${verse.text_uthmani}\n\nTranslation: ${englishTrans}\n\nRead more at Al-Quran Kareem`;
    if (navigator.share) {
      navigator.share({
        title: `Ayah ${verse.verse_key}`,
        text: text,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(text);
      alert('Ayah copied to clipboard!');
    }
  };

  return (
    <div className="group border-b border-slate-100 py-8 last:border-0 dark:border-slate-800">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-50 text-xs font-bold text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400">
          {verse.verse_key}
        </div>
        <div className="flex gap-2">
           <button 
            onClick={() => onBookmark(verse.verse_key)}
            className={`rounded-full p-2 transition-colors ${isBookmarked ? 'text-emerald-600 bg-emerald-50' : 'text-slate-400 hover:bg-slate-100 hover:text-emerald-600'} dark:${isBookmarked ? 'bg-emerald-900' : 'hover:bg-slate-800'}`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill={isBookmarked ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
            </svg>
          </button>
          <button 
            onClick={handleShare}
            className="rounded-full p-2 text-slate-400 transition-colors hover:bg-slate-100 hover:text-emerald-600 dark:hover:bg-slate-800"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
            </svg>
          </button>
        </div>
      </div>

      <div dir="rtl" className="font-arabic mb-8 text-right text-3xl leading-relaxed text-slate-900 dark:text-white" style={{ fontSize: `${settings.fontSize * 1.5}rem` }}>
        {verse.text_uthmani}
      </div>

      {settings.showEnglish && englishTrans && (
        <div className="mb-4 text-slate-600 dark:text-slate-300" dangerouslySetInnerHTML={{ __html: englishTrans }} style={{ fontSize: `${settings.fontSize}rem` }} />
      )}

      {settings.showUrdu && urduTrans && (
        <div dir="rtl" className="font-urdu text-right text-emerald-800 dark:text-emerald-200" dangerouslySetInnerHTML={{ __html: urduTrans }} style={{ fontSize: `${settings.fontSize * 1.2}rem` }} />
      )}

      {settings.showTafsir && tafsir && (
        <div className="mt-6 rounded-2xl bg-stone-100 p-6 dark:bg-slate-800/50">
          <h4 className="mb-3 text-xs font-bold uppercase tracking-widest text-emerald-700 dark:text-emerald-400">Tafsir Ibn Kathir</h4>
          <div 
            className="font-serif text-sm leading-relaxed text-slate-700 dark:text-slate-300 [&_a]:text-emerald-600 [&_a]:underline" 
            dangerouslySetInnerHTML={{ __html: tafsir }} 
          />
        </div>
      )}
    </div>
  );
};

export default AyahItem;
