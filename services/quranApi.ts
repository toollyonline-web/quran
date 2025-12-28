
import { Surah, Verse, Juz, Tafsir, TafsirResource } from '../types';

const BASE_URL = 'https://api.quran.com/api/v4';

export const fetchAllSurahs = async (): Promise<Surah[]> => {
  const response = await fetch(`${BASE_URL}/chapters`);
  const data = await response.json();
  return data.chapters;
};

export const fetchAllJuzs = async (): Promise<Juz[]> => {
  const response = await fetch(`${BASE_URL}/juzs`);
  const data = await response.json();
  return data.juzs;
};

export const fetchSurahDetails = async (id: number): Promise<Surah> => {
  const response = await fetch(`${BASE_URL}/chapters/${id}`);
  const data = await response.json();
  return data.chapter;
};

export const fetchSurahVerses = async (
  surahId: number, 
  translations: string = '131,158' // 131: Muhsin Khan, 158: Bayan-ul-Quran (Urdu)
): Promise<Verse[]> => {
  const [arabicRes, transRes] = await Promise.all([
    fetch(`${BASE_URL}/quran/verses/uthmani?chapter_number=${surahId}`),
    fetch(`${BASE_URL}/verses/by_chapter/${surahId}?translations=${translations}&per_page=286`)
  ]);

  const arabicData = await arabicRes.json();
  const transData = await transRes.json();

  return arabicData.verses.map((v: any, index: number) => ({
    ...v,
    translations: transData.verses[index]?.translations || []
  }));
};

export const fetchJuzVerses = async (
  juzId: number,
  translations: string = '131,158'
): Promise<Verse[]> => {
  const [arabicRes, transRes] = await Promise.all([
    fetch(`${BASE_URL}/quran/verses/uthmani?juz_number=${juzId}`),
    fetch(`${BASE_URL}/verses/by_juz/${juzId}?translations=${translations}&per_page=286`)
  ]);

  const arabicData = await arabicRes.json();
  const transData = await transRes.json();

  return arabicData.verses.map((v: any, index: number) => ({
    ...v,
    translations: transData.verses[index]?.translations || []
  }));
};

export const fetchTafsirResources = async (language: string = 'en'): Promise<TafsirResource[]> => {
  const response = await fetch(`${BASE_URL}/resources/tafsirs?language=${language}`);
  const data = await response.json();
  return data.tafsirs;
};

export const fetchTafsirs = async (
  id: number,
  isJuz: boolean = false,
  tafsirId: number = 169 // 169: Ibn Kathir (English)
): Promise<Record<string, string>> => {
  const endpoint = isJuz 
    ? `${BASE_URL}/tafsirs/${tafsirId}/by_juz/${id}`
    : `${BASE_URL}/tafsirs/${tafsirId}/by_chapter/${id}`;
  
  const response = await fetch(endpoint);
  const data = await response.json();
  
  // Create a map for quick lookup by verse_key
  const tafsirMap: Record<string, string> = {};
  if (data.tafsirs) {
    data.tafsirs.forEach((t: Tafsir) => {
      tafsirMap[t.verse_key] = t.text;
    });
  }
  
  return tafsirMap;
};

export const getAudioUrl = (surahId: number): string => {
  const paddedId = surahId.toString().padStart(3, '0');
  // Switching to a more stable CDN (EveryAyah or Quran.com CDN)
  return `https://everyayah.com/data/Alafasy_128kbps/${paddedId}.mp3`;
};
