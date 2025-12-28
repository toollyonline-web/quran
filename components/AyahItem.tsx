
import React from 'react';
import { Verse, Settings } from '../types';

interface AyahItemProps {
  verse: Verse;
  settings: Settings;
  onBookmark: (key: string) => void;
  isBookmarked: boolean;
  tafsir?: string;
  tafsirName?: string;
}

const AyahItem: React.FC<AyahItemProps> = ({ verse, settings, onBookmark, isBookmarked, tafsir, tafsirName }) => {
  const englishTrans = verse.translations?.find(t => t.resource_id === 131)?.text;
  const urduTrans = verse.translations?.find(t => t.resource_id === 158)?.text;

  const handleShare = () => {
    const cleanEnglish = englishTrans?.replace(/<[^>]*>?/gm, '') || '';
    const cleanUrdu = urduTrans?.replace(/<[^>]*>?/gm, '') || '';
    
    let shareText = `Quran [${verse.verse_key}]:\n${verse.text_uthmani}\n\n`;
    
    if (settings.showEnglish && cleanEnglish) {
      shareText += `English Translation: ${cleanEnglish}\n\n`;
    }
    
    if (settings.showUrdu && cleanUrdu) {
      shareText += `Urdu Translation: ${cleanUrdu}\n\n`;
    }
    
    shareText += `Read and reflect at Al-Quran Kareem: ${window.location.href}`;

    if (navigator.share) {
      navigator.share({
        title: `Ayah ${verse.verse_key}`,
        text: shareText,
        url: window.location.href
      }).catch(err => {
        console.error("Error sharing:", err);
      });
    } else {
      navigator.clipboard.writeText(shareText).then(() => {
        alert('Ayah text and translations copied to clipboard!');
      }).catch(err => {
        console.error("Error copying to clipboard:", err);
      });
    }
  };

  return (
    <div className="group border-b border-slate-100 py-8 last:border-0 dark:border-slate-800">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-50 text-xs font-bold text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400">
            {verse.verse_key}
          </div>
          <span className="text-[10px] font-medium uppercase tracking-wider text-slate-400 dark:text-slate-500">
            Page {verse.page_number}
          </span>
        </div>
        <div className="flex gap-2">
           <button 
            onClick={() => onBookmark(verse.verse_key)}
            className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold transition-colors ${isBookmarked ? 'text-emerald-600 bg-emerald-50' : 'text-slate-400 hover:bg-slate-100 hover:text-emerald-600'} dark:${isBookmarked ? 'bg-emerald-900/30' : 'hover:bg-slate-800'}`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill={isBookmarked ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
            </svg>
            {isBookmarked ? "Bookmarked" : "Bookmark"}
          </button>
          <button 
            onClick={handleShare}
            className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold text-slate-400 transition-colors hover:bg-slate-100 hover:text-emerald-600 dark:hover:bg-slate-800"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
            </svg>
            Share
          </button>
        </div>
      </div>

      {settings.showWordByWord && verse.words ? (
        <div dir="rtl" className="flex flex-wrap items-start justify-start gap-4 mb-8">
          {verse.words.map((word) => (
            <div key={word.id} className="flex flex-col items-center">
              <span className="font-arabic text-3xl text-slate-900 dark:text-white mb-1">
                {word.text_uthmani}
              </span>
              <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-medium">
                {word.translation.text}
              </span>
            </div>
          ))}
        </div>
      ) : (
        <div dir="rtl" className="font-arabic mb-8 text-right text-3xl leading-relaxed text-slate-900 dark:text-white" style={{ fontSize: `${settings.fontSize * 1.5}rem` }}>
          {verse.text_uthmani}
        </div>
      )}

      {settings.showEnglish && englishTrans && (
        <div className="mb-4 text-slate-600 dark:text-slate-300" dangerouslySetInnerHTML={{ __html: englishTrans }} style={{ fontSize: `${settings.fontSize}rem` }} />
      )}

      {settings.showUrdu && urduTrans && (
        <div dir="rtl" className="font-urdu text-right text-emerald-800 dark:text-emerald-200" dangerouslySetInnerHTML={{ __html: urduTrans }} style={{ fontSize: `${settings.fontSize * 1.2}rem` }} />
      )}

      {settings.showTafsir && tafsir && (
        <div className="mt-6 rounded-2xl bg-stone-100 p-6 dark:bg-slate-800/50">
          <h4 className="mb-3 text-xs font-bold uppercase tracking-widest text-emerald-700 dark:text-emerald-400">Tafsir: {tafsirName || "Ibn Kathir"}</h4>
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
