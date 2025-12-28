
export interface Surah {
  id: number;
  revelation_place: string;
  revelation_order: number;
  bismillah_pre: boolean;
  name_complex: string;
  name_arabic: string;
  name_simple: string;
  verses_count: number;
  pages: number[];
  translated_name: {
    language_name: string;
    name: string;
  };
}

export interface Juz {
  id: number;
  juz_number: number;
  verse_mapping: {
    [key: string]: string;
  };
}

export interface Verse {
  id: number;
  verse_number: number;
  verse_key: string;
  text_uthmani: string;
  translations?: Translation[];
}

export interface Translation {
  id: number;
  resource_id: number;
  text: string;
}

export interface Tafsir {
  id: number;
  resource_id: number;
  text: string;
  verse_id: number;
  verse_key: string;
}

export interface TafsirResource {
  id: number;
  name: string;
  author_name: string;
  language_name: string;
}

export interface AudioFile {
  id: number;
  chapter_id: number;
  file_size: number;
  format: string;
  audio_url: string;
}

export enum Language {
  ENGLISH = 'en',
  URDU = 'ur'
}

export interface Settings {
  showEnglish: boolean;
  showUrdu: boolean;
  showTafsir: boolean;
  selectedTafsirId: number;
  isDarkMode: boolean;
  fontSize: number;
}
