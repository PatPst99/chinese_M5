export type SectionId =
  | 'overview'
  | 'pinyin'
  | 'rules'
  | 'hanzi'
  | 'numbers'
  | 'vocab'
  | 'lesson'
  | 'culture'
  | 'flashcards'
  | 'studio'
  | 'quiz';

export type VocabCategory =
  | 'lesson1'
  | 'pronouns'
  | 'classroom'
  | 'family'
  | 'colors'
  | 'general'
  | 'names'
  | 'surnames';

export interface VocabItem {
  id: string;
  hanzi: string;
  pinyin: string;
  thai: string;
  category: VocabCategory;
  note?: string;
  source?: string;
  colorHex?: string;
  gender?: 'ช.' | 'ญ.' | 'ช./ญ.';
  teochew?: string;
}

export interface ToneInfo {
  id: number;
  nameCN: string;
  nameTH: string;
  mark: string;
  pitchCode: string;
  thaiCompare: string;
  exampleSyllable: string;
  exampleScene: string;
  maHanzi: string;
  maPinyin: string;
  maThai: string;
  description: string;
  color: string;
}

export interface SimpleVowel {
  letter: string;
  thaiSound: string;
  mnemonic: string;
  mouthTip: string;
  speakText: string;
  tones: [string, string, string, string];
}

export interface CompoundVowel {
  final: string;
  group: 'a' | 'o' | 'e' | 'i' | 'u' | 'ü';
  thaiSound: string;
  speakSample: string;
  isCircledSpecial?: boolean;
  isBookRedHighlight?: boolean;
  note?: string;
}

export interface InitialConsonant {
  letter: string;
  thaiSound: string;
  group: string;
  groupTH: string;
  speakSample: string;
  isSemiVowel?: boolean;
  changesItoUe?: boolean;
  dropsUmlaut?: boolean;
  keepsUmlaut?: boolean;
}

export interface SandhiExample {
  hanzi: string;
  writtenPinyin: string;
  spokenPinyin: string;
  thai: string;
  followingTone?: 1 | 2 | 3 | 4;
  note?: string;
}

export interface StrokeBasic {
  id: string;
  symbol: string;
  nameCN: string;
  pinyin: string;
  nameTH: string;
  directionTH: string;
  svgPath: string;
  exampleChar: string;
}

export interface StrokeDerived {
  id: string;
  col: 'left' | 'right';
  symbol: string;
  nameCN: string;
  pinyin: string;
  nameTH: string;
  examples: string[];
  svgPath: string;
}

export interface StrokeOrderRule {
  id: number;
  ruleCN: string;
  ruleTH: string;
  exampleChar: string;
  examplePinyin: string;
  exampleThai: string;
  stepText: string;
}

export interface NumberItem {
  num: number;
  hanzi: string;
  pinyin: string;
  thai: string;
  gestureTitle: string;
  gestureDesc: string;
}

export interface DialogueLine {
  speaker: string;
  speakerPinyin?: string;
  side: 'left' | 'right';
  hanzi: string;
  pinyin: string;
  thai: string;
  alertNote?: string;
}

export interface DialogueScene {
  id: string;
  title: string;
  subtitle: string;
  badge?: string;
  lines: DialogueLine[];
}

export interface QuizQuestion {
  id: string;
  mode: 'matching' | 'dialogue' | 'listening' | 'rules' | 'structure' | 'gestures';
  promptTH: string;
  promptCN?: string;
  promptPinyin?: string;
  speakText?: string;
  gestureNum?: number;
  options: { label: string; sub?: string; value: string }[];
  correctValue: string;
  explanationTH: string;
  sourceTag: string;
}
