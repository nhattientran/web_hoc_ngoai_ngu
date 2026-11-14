export type Language = 'en' | 'jp';

export type NavSection =
  | 'home'
  | 'roadmap'
  | 'english'
  | 'english_ipa'
  | 'english_reading'
  | 'japanese'
  | 'japanese_pronunciation'
  | 'japanese_reading'
  | 'vocabulary'
  | 'practice'
  | 'analytics'
  | 'notes'
  | 'settings';

export type LessonPastel = 'blue' | 'lavender' | 'green' | 'yellow' | 'pink' | 'neutral';

export type SkillTag = 'reading' | 'listening' | 'writing' | 'speaking' | 'grammar' | 'vocabulary' | 'kana' | 'kanji';

export type ExerciseType =
  | 'mcq'
  | 'fill_blank'
  | 'sentence_order'
  | 'match'
  | 'true_false'
  | 'listening'
  | 'translation'
  | 'drag_drop';

export interface ExerciseItem {
  id: string;
  type: ExerciseType;
  skill: SkillTag;
  prompt: string;
  promptVi?: string;
  audioText?: string;
  audioLang?: 'en-US' | 'en-GB' | 'ja-JP';
  // For mcq / true_false / listening
  options?: string[];
  correctAnswer?: string;
  // For fill_blank / translation (accepted answers)
  acceptedAnswers?: string[];
  hint?: string;
  // For sentence_order / drag_drop
  tokens?: string[];
  correctOrder?: string[];
  // For match
  pairs?: { left: string; right: string }[];
  // Feedback
  explanationVi: string;
  weaknessTag: string;
}

export interface LessonCharTile {
  char: string;
  reading: string;
  meaningOrNote: string;
  mnemonic?: string;
  audioText: string;
  strokeCount?: number;
}

export interface LessonExample {
  target: string;
  reading?: string; // Hiragana / IPA
  romaji?: string;
  meaningVi: string;
  audioLang: 'en-US' | 'ja-JP';
}

export interface LessonTheorySection {
  title: string;
  explanationVi: string;
  formula?: string;
  highlightTip?: string;
  commonMistakes?: string[];
  charTiles?: LessonCharTile[];
  examples?: LessonExample[];
}

export interface LessonApplyTask {
  mode: 'writing' | 'speaking' | 'roleplay' | 'reading';
  title: string;
  scenarioVi: string;
  promptTarget: string;
  usefulExpressions: { phrase: string; meaningVi: string }[];
  sampleAnswer: string;
  sampleAnswerVi: string;
  checklistCriteria: string[];
  keywordsToCheck: string[];
}

export interface LessonData {
  id: string;
  language: Language;
  moduleId: string;
  moduleTitle?: string;
  moduleOrder: number;
  lessonOrder: number;
  title: string;
  subtitle?: string;
  objectiveVi: string;
  descriptionVi: string;
  estimatedMinutes: number;
  pastel: LessonPastel;
  activityTags: SkillTag[];
  prerequisites: string[];
  xpReward: number;
  // 5-Step structure
  learnSections: LessonTheorySection[];
  understandExercises: ExerciseItem[];
  practiceExercises: ExerciseItem[];
  applyTask: LessonApplyTask;
  lessonVocabIds?: string[];
}

export interface ModuleMeta {
  id: string;
  language: Language;
  order: number;
  title: string;
  subtitleVi: string;
  objectiveVi: string;
  cefrOrJlpt: string;
  pastel: LessonPastel;
}

export type SRSState = 'new' | 'learning' | 'reviewing' | 'mastered';

export interface VocabItem {
  id: string;
  language: Language;
  word: string;
  reading: string; // IPA for EN, Hiragana for JP
  romaji?: string;
  partOfSpeech?: string;
  meaningVi: string;
  topic: string;
  levelTag: string;
  example: string;
  exampleVi: string;
  srsState: SRSState;
  easeFactor: number;
  intervalDays: number;
  repetitions: number;
  nextReviewAt: number; // timestamp
  lastReviewedAt?: number;
  isDifficult?: boolean;
  customLists: string[];
  sourceLessonId?: string;
}

export interface KanaChar {
  char: string;
  romaji: string;
  row: string;
  type: 'hiragana' | 'katakana';
  group: 'basic' | 'dakuten' | 'yoon';
  mnemonicVi: string;
  strokeHintVi: string;
  sampleWord: string;
  sampleMeaningVi: string;
}

export interface KanjiItem {
  char: string;
  sinoVi: string;
  meaningVi: string;
  onyomi: string;
  kunyomi: string;
  strokes: number;
  topic: string;
  vocab: { word: string; reading: string; meaningVi: string }[];
  example: string;
  exampleVi: string;
}

export interface LessonProgressRecord {
  lessonId: string;
  completedSteps: number[]; // e.g. [0,1,2,3,4]
  progressPct?: number; // 0-100 explicit/step progress percentage
  lastStep?: number; // 0-4 last visited step position
  status: 'available' | 'in_progress' | 'completed';
  bestScore: number; // 0-100
  lastScore: number;
  attempts: number;
  completedAt?: number;
  lastStudiedAt?: number;
  weakTags: string[];
}

export interface DailyTask {
  id: string;
  title: string;
  language: Language | 'both';
  category: 'lesson' | 'vocab' | 'listening' | 'quiz' | 'custom';
  targetMinutes: number;
  completed: boolean;
  date: string; // YYYY-MM-DD
  targetNav?: NavSection;
  lessonId?: string;
}

export interface StudyLogEntry {
  date: string; // YYYY-MM-DD
  englishMinutes: number;
  japaneseMinutes: number;
  vocabMinutes: number;
  xpEarned: number;
  quizzesTaken: number;
  quizCorrect: number;
  quizTotal: number;
}

export interface SkillStats {
  reading: { correct: number; total: number };
  listening: { correct: number; total: number };
  writing: { completed: number; avgScore: number };
  speaking: { completed: number; avgScore: number };
  grammar: { correct: number; total: number };
  vocabulary: { correct: number; total: number };
}

export interface NoteEntry {
  id: string;
  language: Language | 'general';
  title: string;
  content: string;
  tags: string[];
  lessonId?: string;
  updatedAt: number;
}

export interface AIConfig {
  provider: 'demo' | 'openai_compatible' | 'gemini';
  apiKey: string;
  model: string;
  endpoint: string;
}

export interface UserSettings {
  userName: string;
  dailyEnglishMinutes: number;
  dailyJapaneseMinutes: number;
  dailyVocabMinutes: number;
  dailyXpGoal: number;
  speechRate: number;
  unlockAllPreview: boolean;
  aiConfig: AIConfig;
}

export interface AssessmentAttempt {
  id: string;
  language: Language;
  title: string;
  score: number;
  maxScore: number;
  breakdown: Record<string, { correct: number; total: number }>;
  strengths: string[];
  weaknesses: string[];
  takenAt: number;
}

export interface UserState {
  xp: number;
  streakDays: number;
  lastActiveDate: string;
  lessonProgress: Record<string, LessonProgressRecord>;
  vocabItems: VocabItem[];
  customVocabLists: string[];
  dailyTasks: DailyTask[];
  studyLogs: Record<string, StudyLogEntry>;
  skillStats: {
    en: SkillStats;
    jp: SkillStats;
  };
  notes: NoteEntry[];
  unlockedBadges: string[];
  assessments: AssessmentAttempt[];
  settings: UserSettings;
  masteredKana: string[];
  masteredKanji: string[];
}
