export interface VocabularyWord {
  word: string;
  pronunciation: string;
  definition: string;
  example: string;
  image?: string;
}

export interface StoryScene {
  id: number;
  text: string;
  image?: string;
  theme: string;
  description: string;
  highlightWords: string[];
  // 🔮 Izin resmi untuk Kacamata Sihir Dwibahasa:
  translation?: string;
  dialogue?: { speaker: string; text: string; translation?: string }[];
}

export type MiniGameType = 'matching' | 'fillBlank' | 'wordSearch' | 'quiz';

export type PageType = 'intro' | 'story' | 'review' | 'game' | 'reward' |'map' | 'unit-detail' | 'quiz';

export interface Unit {
  id: number;
  title: string;
  theme: string;
  description: string;
  vocabulary: VocabularyWord[];
  story: StoryScene[];
  miniGame: MiniGameType;
}

export type UnitScore = Record<number, number>;