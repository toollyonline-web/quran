
import { Surah, Verse, Juz, Tafsir, TafsirResource, SearchResult } from '../types';

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
  translations: string = '131,158'
): Promise<Verse[]> => {
  // Explicitly requesting text_uthmani and page_number fields
  const response = await fetch(`${BASE_URL}/verses/by_chapter/${surahId}?translations=${translations}&words=true&fields=text_uthmani,page_number&per_page=286`);
  const data = await response.json();
  return data.verses;
};

export const fetchJuzVerses = async (
  juzId: number,
  translations: string = '131,158'
): Promise<Verse[]> => {
  // Explicitly requesting text_uthmani and page_number fields
  const response = await fetch(`${BASE_URL}/verses/by_juz/${juzId}?translations=${translations}&words=true&fields=text_uthmani,page_number&per_page=500`);
  const data = await response.json();
  return data.verses;
};

export const fetchTafsirResources = async (language: string = 'en'): Promise<TafsirResource[]> => {
  const response = await fetch(`${BASE_URL}/resources/tafsirs?language=${language}`);
  const data = await response.json();
  return data.tafsirs;
};

export const fetchTafsirs = async (
  id: number,
  isJuz: boolean = false,
  tafsirId: number = 169
): Promise<Record<string, string>> => {
  const endpoint = isJuz 
    ? `${BASE_URL}/tafsirs/${tafsirId}/by_juz/${id}`
    : `${BASE_URL}/tafsirs/${tafsirId}/by_chapter/${id}`;
  
  const response = await fetch(endpoint);
  const data = await response.json();
  
  const tafsirMap: Record<string, string> = {};
  if (data.tafsirs) {
    data.tafsirs.forEach((t: Tafsir) => {
      tafsirMap[t.verse_key] = t.text;
    });
  }
  
  return tafsirMap;
};

export const searchQuran = async (query: string): Promise<SearchResult[]> => {
  if (query.length < 3) return [];
  const response = await fetch(`${BASE_URL}/search?q=${encodeURIComponent(query)}&language=en&size=20`);
  const data = await response.json();
  return data.search.results.map((r: any) => ({
    verse_key: r.verse_key,
    text: r.text,
    translations: r.translations || []
  }));
};

export const fetchAudioUrl = async (chapterId: number, reciterId: number): Promise<string> => {
  const response = await fetch(`${BASE_URL}/chapter_recitations/${reciterId}/${chapterId}`);
  const data = await response.json();
  return data.audio_file.audio_url;
};

// Fallback logic for reciters if the API endpoint is unavailable
export const getReciterName = (id: number): string => {
  switch (id) {
    case 7: return 'Mishary Rashid Alafasy';
    case 6: return 'Khalil Al-Husary';
    case 1: return 'AbdulBaset AbdulSamad';
    default: return 'Reciter';
  }
};
