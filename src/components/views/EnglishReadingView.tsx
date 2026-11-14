import React, { useEffect, useMemo, useState } from 'react';
import {
  BookmarkCheck,
  BookmarkPlus,
  BookOpen,
  CalendarDays,
  CheckCircle2,
  Clock,
  FileText,
  Languages,
  Layers,
  Mail,
  Newspaper,
  Search,
  Sparkles,
  Square,
  Volume2,
} from 'lucide-react';
import { useLearning } from '../../context/LearningContext';
import {
  ENGLISH_LONG_READINGS,
  LONG_READING_CATEGORIES,
  LongReadingArticle,
  LongReadingCategory,
} from '../../data/englishLongReadings';
import { ReadingGlossaryItem } from '../../data/englishLongReadings';
import { speakText, stopSpeaking } from '../../utils/speech';
import { InteractiveExerciseCard } from '../common/InteractiveExerciseCard';

const COMPLETED_READINGS_KEY = 'manabi_completed_long_readings_v1';

function countWords(article: LongReadingArticle): number {
  return article.paragraphs
    .map((p) => p.en)
    .join(' ')
    .trim()
    .split(/\s+/).length;
}

function getCategoryStyle(category: LongReadingCategory): {
  badge: string;
  label: string;
  Icon: React.ComponentType<{ className?: string }>;
} {
  if (category === 'mail') {
    return {
      badge: 'bg-[#D7ECF9] text-[#1A4F73]',
      label: 'Email & Công sở',
      Icon: Mail,
    };
  }
  if (category === 'event') {
    return {
      badge: 'bg-[#F6E9B2] text-[#6B4F0A]',
      label: 'Sự kiện & Tin tức',
      Icon: CalendarDays,
    };
  }
  return {
    badge: 'bg-[#D2EED9] text-[#1B5C32]',
    label: 'Chủ đề chuyên sâu',
    Icon: Newspaper,
  };
}

export const EnglishReadingView: React.FC = () => {
  const { state, addVocabItem, recordPracticeResult, saveNote } = useLearning();

  const [categoryFilter, setCategoryFilter] = useState<'all' | LongReadingCategory>('all');
  const [levelFilter, setLevelFilter] = useState<'all' | 'B1+' | 'B2'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedId, setSelectedId] = useState<string>(ENGLISH_LONG_READINGS[0].id);

  // Reading UX controls
  const [showAllVi, setShowAllVi] = useState(false);
  const [revealedParagraphs, setRevealedParagraphs] = useState<Record<string, boolean>>({});
  const [largeText, setLargeText] = useState(false);
  const [speechRate, setSpeechRate] = useState<number>(0.95);
  const [speakingKey, setSpeakingKey] = useState<string | null>(null);

  // Per-article comprehension answers & completion tracking
  const [answersByArticle, setAnswersByArticle] = useState<Record<string, Record<string, boolean>>>({});
  const [completedReadings, setCompletedReadings] = useState<Record<string, { scorePct: number; completedAt: string }>>(
    () => {
      try {
        const raw = localStorage.getItem(COMPLETED_READINGS_KEY);
        return raw ? JSON.parse(raw) : {};
      } catch {
        return {};
      }
    }
  );
  const [savedNotice, setSavedNotice] = useState<string | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem(COMPLETED_READINGS_KEY, JSON.stringify(completedReadings));
    } catch {
      // Ignore storage quota errors
    }
  }, [completedReadings]);

  useEffect(() => {
    return () => {
      stopSpeaking();
    };
  }, []);

  const filteredArticles = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();
    return ENGLISH_LONG_READINGS.filter((item) => {
      if (categoryFilter !== 'all' && item.category !== categoryFilter) return false;
      if (levelFilter !== 'all' && item.level !== levelFilter) return false;
      if (!q) return true;
      return (
        item.title.toLowerCase().includes(q) ||
        item.subtitleVi.toLowerCase().includes(q) ||
        item.tags.some((t) => t.toLowerCase().includes(q))
      );
    });
  }, [categoryFilter, levelFilter, searchTerm]);

  const activeArticle = useMemo(() => {
    return (
      filteredArticles.find((a) => a.id === selectedId) ||
      filteredArticles[0] ||
      ENGLISH_LONG_READINGS[0]
    );
  }, [filteredArticles, selectedId]);

  const totalLibraryWords = useMemo(
    () => ENGLISH_LONG_READINGS.reduce((sum, a) => sum + countWords(a), 0),
    []
  );

  const completedCount = Object.keys(completedReadings).length;
  const activeWordCount = countWords(activeArticle);
  const activeAnswers = answersByArticle[activeArticle.id] || {};
  const answeredCount = Object.keys(activeAnswers).length;
  const correctCount = Object.values(activeAnswers).filter(Boolean).length;
  const totalQuestions = activeArticle.questions.length;
  const existingVocabSet = useMemo(
    () =>
      new Set(
        state.vocabItems
          .filter((v) => v.language === 'en')
          .map((v) => v.word.trim().toLowerCase())
      ),
    [state.vocabItems]
  );

  const handleSelectArticle = (id: string) => {
    stopSpeaking();
    setSpeakingKey(null);
    setSelectedId(id);
    setRevealedParagraphs({});
  };

  const handlePlayAudio = async (key: string, text: string) => {
    if (speakingKey === key) {
      stopSpeaking();
      setSpeakingKey(null);
      return;
    }
    setSpeakingKey(key);
    await speakText(text, 'en-US', speechRate, () => {
      setSpeakingKey((prev) => (prev === key ? null : prev));
    });
  };

  const handleStopAudio = () => {
    stopSpeaking();
    setSpeakingKey(null);
  };

  const toggleParagraphVi = (idx: number) => {
    const key = `${activeArticle.id}-${idx}`;
    setRevealedParagraphs((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleAnsweredQuestion = (questionId: string, isCorrect: boolean) => {
    setAnswersByArticle((prev) => {
      const nextArticleAnswers = {
        ...(prev[activeArticle.id] || {}),
        [questionId]: isCorrect,
      };
      return {
        ...prev,
        [activeArticle.id]: nextArticleAnswers,
      };
    });
  };

  const handleFinishReading = () => {
    const scorePct =
      totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 100;
    const isFirstTime = !completedReadings[activeArticle.id];

    setCompletedReadings((prev) => ({
      ...prev,
      [activeArticle.id]: {
        scorePct,
        completedAt: new Date().toISOString(),
      },
    }));

    recordPracticeResult({
      language: 'en',
      skill: 'reading',
      correct: Math.max(1, correctCount),
      total: Math.max(1, totalQuestions),
      minutes: activeArticle.readMinutes,
      xp: isFirstTime ? 30 : 12,
    });

    setSavedNotice(
      isFirstTime
        ? `Đã hoàn thành bài đọc "${activeArticle.title}" (+30 XP Reading)!`
        : `Đã cập nhật điểm đọc hiểu (${scorePct}%) và cộng +12 XP ôn tập!`
    );
    setTimeout(() => setSavedNotice(null), 4000);
  };

  const handleAddGlossaryToVocab = (g: ReadingGlossaryItem) => {
    if (existingVocabSet.has(g.word.trim().toLowerCase())) return;
    addVocabItem({
      language: 'en',
      word: g.word,
      reading: g.ipa,
      partOfSpeech: g.pos,
      meaningVi: g.meaningVi,
      topic: 'Reading B2',
      levelTag: activeArticle.level,
      example: g.example,
      exampleVi: `Từ vựng trích từ bài đọc (${activeArticle.categoryLabelVi}): ${activeArticle.title}`,
      customLists: ['Reading B2'],
    });
    setSavedNotice(`Đã thêm "${g.word}" vào bộ Flashcards Tiếng Anh!`);
    setTimeout(() => setSavedNotice(null), 3000);
  };

  const handleSaveTakeawayNote = () => {
    const summaryWords = activeArticle.glossary
      .map((g) => `- **${g.word}** (${g.pos}, ${g.ipa}): ${g.meaningVi}`)
      .join('\n');
    saveNote({
      language: 'en',
      title: `[Reading ${activeArticle.level}] ${activeArticle.title}`,
      content: `${activeArticle.subtitleVi}\n\nTừ vựng B2 đáng nhớ:\n${summaryWords}`,
      tags: ['Reading', activeArticle.categoryLabelVi, activeArticle.level],
    });
    setSavedNotice('Đã lưu tóm tắt & từ vựng bài đọc vào mục Ghi chú!');
    setTimeout(() => setSavedNotice(null), 3000);
  };

  const catStyle = getCategoryStyle(activeArticle.category);
  const CatIcon = catStyle.Icon;

  return (
    <div className="space-y-5">
      {/* Header Banner */}
      <div className="rounded-[24px] border border-black/8 bg-white p-6 shadow-card">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#D7ECF9] px-3 py-1 text-xs font-extrabold text-[#1A4F73]">
                <FileText className="h-3.5 w-3.5" /> Đọc hiểu dài Tiếng Anh (B1+ → B2)
              </span>
              <span className="rounded-full bg-[#EEEEEB] px-3 py-1 text-xs font-bold text-[#08090D]">
                {ENGLISH_LONG_READINGS.length} bài • ~{totalLibraryWords.toLocaleString()} từ
              </span>
            </div>
            <h1 className="mt-2 text-2xl font-extrabold tracking-tight text-[#08090D]">
              Thư viện Reading chuyên sâu: Email, Sự kiện & Chủ đề
            </h1>
            <p className="mt-1 text-sm text-black/65">
              Luyện đọc đoạn văn dài chuẩn B1+ → B2 (~260–325 từ/bài), kèm dịch song ngữ từng đoạn, nghe giọng đọc tự nhiên, bảng từ vựng và câu hỏi đọc hiểu.
            </p>
          </div>

          <div className="flex shrink-0 items-center gap-3 rounded-2xl bg-[#F6F6F4] px-4 py-3 border border-black/5">
            <div className="text-right">
              <div className="text-[11px] font-bold uppercase tracking-wider text-black/50">
                Tiến độ đọc
              </div>
              <div className="text-lg font-extrabold text-[#08090D]">
                {completedCount}/{ENGLISH_LONG_READINGS.length} bài
              </div>
            </div>
            <div className="h-10 w-10 rounded-xl bg-[#D2EED9] text-[#1B5C32] flex items-center justify-center font-extrabold text-sm">
              {Math.round((completedCount / ENGLISH_LONG_READINGS.length) * 100)}%
            </div>
          </div>
        </div>

        {/* Category Filter Tabs + Level + Search */}
        <div className="mt-5 flex flex-col gap-3 border-t border-black/8 pt-4 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap gap-2">
            {LONG_READING_CATEGORIES.map((cat) => {
              const active = categoryFilter === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setCategoryFilter(cat.id)}
                  className={`rounded-full px-3.5 py-1.5 text-xs font-bold transition ${
                    active
                      ? 'bg-[#08090D] text-white'
                      : 'bg-[#F6F6F4] text-black/70 hover:bg-[#EEEEEB]'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <div className="inline-flex rounded-full bg-[#F6F6F4] p-1">
              {(['all', 'B1+', 'B2'] as const).map((lvl) => (
                <button
                  key={lvl}
                  type="button"
                  onClick={() => setLevelFilter(lvl)}
                  className={`rounded-full px-2.5 py-1 text-[11px] font-bold transition ${
                    levelFilter === lvl ? 'bg-white text-[#08090D] shadow-sm' : 'text-black/55'
                  }`}
                >
                  {lvl === 'all' ? 'Mọi cấp độ' : lvl}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2 rounded-full border border-black/10 bg-[#F6F6F4] px-3 py-1.5">
              <Search className="h-3.5 w-3.5 text-black/45" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Tìm tiêu đề, chủ đề..."
                className="w-40 bg-transparent text-xs outline-none placeholder:text-black/40"
              />
            </div>
          </div>
        </div>
      </div>

      {savedNotice && (
        <div className="rounded-2xl border border-[#1B5C32]/20 bg-[#D2EED9] px-4 py-3 text-xs font-bold text-[#1B5C32] flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4 shrink-0" />
          <span>{savedNotice}</span>
        </div>
      )}

      {/* Main Split Layout: Article Selector Left + Full Reader Right */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-12 items-start">
        {/* Left List */}
        <div className="lg:col-span-4 space-y-2.5">
          <div className="flex items-center justify-between px-1">
            <span className="text-xs font-extrabold uppercase tracking-wider text-black/50">
              Danh sách bài đọc ({filteredArticles.length})
            </span>
          </div>

          {filteredArticles.length === 0 ? (
            <div className="rounded-2xl border border-black/8 bg-white p-6 text-center text-xs text-black/55">
              Không có bài đọc nào khớp bộ lọc hiện tại.
            </div>
          ) : (
            <div className="space-y-2.5">
              {filteredArticles.map((article) => {
                const isSelected = article.id === activeArticle.id;
                const done = completedReadings[article.id];
                const meta = getCategoryStyle(article.category);
                const ItemIcon = meta.Icon;
                const words = countWords(article);

                return (
                  <button
                    key={article.id}
                    type="button"
                    onClick={() => handleSelectArticle(article.id)}
                    className={`w-full text-left rounded-[20px] border p-4 transition ${
                      isSelected
                        ? 'border-[#08090D] bg-[#08090D] text-white shadow-card'
                        : 'border-black/8 bg-white text-[#08090D] hover:border-black/25'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span
                        className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[10px] font-extrabold ${
                          isSelected ? 'bg-white/15 text-white' : meta.badge
                        }`}
                      >
                        <ItemIcon className="h-3 w-3" />
                        {meta.label}
                      </span>
                      <div className="flex items-center gap-1.5">
                        <span
                          className={`rounded-full px-2 py-0.5 text-[10px] font-extrabold ${
                            isSelected
                              ? 'bg-white/15 text-white'
                              : 'bg-[#E5D9F7] text-[#4B2C7A]'
                          }`}
                        >
                          {article.level}
                        </span>
                        {done && (
                          <span
                            className={`inline-flex items-center gap-0.5 rounded-full px-2 py-0.5 text-[10px] font-bold ${
                              isSelected
                                ? 'bg-[#D2EED9] text-[#1B5C32]'
                                : 'bg-[#D2EED9] text-[#1B5C32]'
                            }`}
                          >
                            <CheckCircle2 className="h-3 w-3" />
                            {done.scorePct}%
                          </span>
                        )}
                      </div>
                    </div>

                    <h3 className="mt-2.5 text-sm font-extrabold leading-snug">
                      {article.title}
                    </h3>
                    <p
                      className={`mt-1 text-xs line-clamp-2 ${
                        isSelected ? 'text-white/75' : 'text-black/60'
                      }`}
                    >
                      {article.subtitleVi}
                    </p>

                    <div
                      className={`mt-3 flex items-center gap-3 text-[11px] font-semibold ${
                        isSelected ? 'text-white/70' : 'text-black/45'
                      }`}
                    >
                      <span className="inline-flex items-center gap-1">
                        <Clock className="h-3 w-3" /> ~{article.readMinutes} phút
                      </span>
                      <span>• {words} từ</span>
                      <span>• {article.questions.length} câu hỏi</span>
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Right Full Reading Canvas */}
        <div className="lg:col-span-8 space-y-5">
          <article className="rounded-[24px] border border-black/8 bg-white p-6 sm:p-7 shadow-card">
            {/* Article Meta Header */}
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex flex-wrap items-center gap-2">
                <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-extrabold ${catStyle.badge}`}>
                  <CatIcon className="h-3.5 w-3.5" />
                  {activeArticle.categoryLabelVi}
                </span>
                <span className="rounded-full bg-[#E5D9F7] px-3 py-1 text-xs font-extrabold text-[#4B2C7A]">
                  CEFR {activeArticle.level}
                </span>
                <span className="rounded-full bg-[#F6F6F4] px-3 py-1 text-xs font-semibold text-black/65">
                  {activeWordCount} từ • ~{activeArticle.readMinutes} phút đọc
                </span>
              </div>

              <button
                type="button"
                onClick={handleSaveTakeawayNote}
                className="inline-flex items-center gap-1.5 rounded-full border border-black/10 bg-[#F6F6F4] px-3 py-1.5 text-xs font-bold text-[#08090D] hover:bg-[#EEEEEB]"
              >
                <BookmarkPlus className="h-3.5 w-3.5" /> Lưu vào Ghi chú
              </button>
            </div>

            <h2 className="mt-4 text-xl sm:text-2xl font-extrabold tracking-tight text-[#08090D]">
              {activeArticle.title}
            </h2>
            <p className="mt-1.5 text-sm text-black/60">{activeArticle.subtitleVi}</p>

            {/* Reader Toolbar */}
            <div className="mt-4 flex flex-wrap items-center justify-between gap-2 rounded-2xl bg-[#F6F6F4] p-3 border border-black/5">
              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() =>
                    handlePlayAudio(
                      `full-${activeArticle.id}`,
                      activeArticle.paragraphs.map((p) => p.en).join(' ')
                    )
                  }
                  className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-bold transition ${
                    speakingKey === `full-${activeArticle.id}`
                      ? 'bg-[#08090D] text-white'
                      : 'bg-white text-[#08090D] border border-black/10 hover:bg-[#D7ECF9]'
                  }`}
                >
                  <Volume2 className="h-3.5 w-3.5" />
                  {speakingKey === `full-${activeArticle.id}` ? 'Đang đọc toàn bài...' : 'Nghe toàn bài'}
                </button>

                {speakingKey && (
                  <button
                    type="button"
                    onClick={handleStopAudio}
                    className="inline-flex items-center gap-1 rounded-full bg-[#F7DCE1] px-3 py-1.5 text-xs font-bold text-[#7D233B]"
                  >
                    <Square className="h-3 w-3 fill-current" /> Dừng
                  </button>
                )}

                <div className="inline-flex items-center rounded-full bg-white border border-black/10 p-0.5 text-[11px] font-bold">
                  {[0.85, 0.95, 1.1].map((rate) => (
                    <button
                      key={rate}
                      type="button"
                      onClick={() => setSpeechRate(rate)}
                      className={`rounded-full px-2 py-1 transition ${
                        speechRate === rate ? 'bg-[#08090D] text-white' : 'text-black/60'
                      }`}
                    >
                      {rate}x
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => setLargeText((v) => !v)}
                  className="rounded-full border border-black/10 bg-white px-3 py-1.5 text-xs font-bold text-black/75 hover:bg-[#EEEEEB]"
                >
                  Cỡ chữ: {largeText ? 'Lớn' : 'Chuẩn'}
                </button>
                <button
                  type="button"
                  onClick={() => setShowAllVi((v) => !v)}
                  className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold transition ${
                    showAllVi
                      ? 'bg-[#D2EED9] text-[#1B5C32]'
                      : 'border border-black/10 bg-white text-black/75 hover:bg-[#EEEEEB]'
                  }`}
                >
                  <Languages className="h-3.5 w-3.5" />
                  {showAllVi ? 'Ẩn dịch toàn bài' : 'Dịch song ngữ'}
                </button>
              </div>
            </div>

            {/* Authentic Email Headers for Mail Category */}
            {activeArticle.emailMeta && (
              <div className="mt-5 rounded-2xl border border-[#1A4F73]/15 bg-[#D7ECF9]/35 p-4 text-xs space-y-1.5">
                <div className="flex flex-wrap gap-x-2">
                  <span className="font-extrabold text-[#1A4F73] w-16">From:</span>
                  <span className="font-semibold text-[#08090D]">{activeArticle.emailMeta.from}</span>
                </div>
                <div className="flex flex-wrap gap-x-2">
                  <span className="font-extrabold text-[#1A4F73] w-16">To:</span>
                  <span className="text-black/80">{activeArticle.emailMeta.to}</span>
                </div>
                <div className="flex flex-wrap gap-x-2">
                  <span className="font-extrabold text-[#1A4F73] w-16">Subject:</span>
                  <span className="font-bold text-[#08090D]">{activeArticle.emailMeta.subject}</span>
                </div>
                <div className="flex flex-wrap gap-x-2">
                  <span className="font-extrabold text-[#1A4F73] w-16">Date:</span>
                  <span className="text-black/60">{activeArticle.emailMeta.date}</span>
                </div>
              </div>
            )}

            {/* Long-form Paragraphs */}
            <div className="mt-6 space-y-5">
              {activeArticle.paragraphs.map((para, idx) => {
                const paraKey = `${activeArticle.id}-${idx}`;
                const isViShown = showAllVi || !!revealedParagraphs[paraKey];
                const isSpeakingPara = speakingKey === paraKey;

                return (
                  <div
                    key={paraKey}
                    className="rounded-2xl border border-black/6 bg-[#FAFAF8] p-4 sm:p-5 transition hover:border-black/15"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                      <span className="text-[11px] font-extrabold uppercase tracking-wider text-black/45">
                        Đoạn {idx + 1}
                        {para.heading ? ` • ${para.heading}` : ''}
                      </span>
                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => handlePlayAudio(paraKey, para.en)}
                          className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-bold transition ${
                            isSpeakingPara
                              ? 'bg-[#08090D] text-white'
                              : 'bg-white border border-black/10 text-black/70 hover:bg-[#D7ECF9]'
                          }`}
                        >
                          <Volume2 className="h-3 w-3" />
                          {isSpeakingPara ? 'Đang đọc' : 'Nghe đoạn'}
                        </button>
                        {!showAllVi && (
                          <button
                            type="button"
                            onClick={() => toggleParagraphVi(idx)}
                            className="rounded-full bg-white border border-black/10 px-2.5 py-1 text-[11px] font-bold text-black/65 hover:bg-[#D2EED9]"
                          >
                            {isViShown ? 'Ẩn dịch' : 'Dịch đoạn này'}
                          </button>
                        )}
                      </div>
                    </div>

                    <p
                      className={`text-[#08090D] leading-relaxed ${
                        largeText ? 'text-[17px]' : 'text-[15px]'
                      }`}
                    >
                      {para.en}
                    </p>

                    {isViShown && (
                      <div className="mt-3 rounded-xl bg-white border border-black/8 px-3.5 py-2.5 text-sm leading-relaxed text-black/75">
                        <span className="font-bold text-[#1B5C32] mr-1.5">Bản dịch:</span>
                        {para.vi}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Key Vocabulary B2 Glossary */}
            <div className="mt-7 border-t border-black/8 pt-6">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                <h3 className="flex items-center gap-2 text-base font-extrabold text-[#08090D]">
                  <Layers className="h-4 w-4 text-[#4B2C7A]" />
                  Từ vựng & Cụm từ B2 nổi bật trong bài ({activeArticle.glossary.length})
                </h3>
                <span className="text-xs text-black/50">
                  Nhấn &quot;+ Flashcard&quot; để lưu vào kho ôn tập SRS
                </span>
              </div>

              <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                {activeArticle.glossary.map((g) => {
                  const alreadyInDeck = existingVocabSet.has(g.word.trim().toLowerCase());
                  return (
                    <div
                      key={g.word}
                      className="rounded-2xl border border-black/8 bg-[#F6F6F4] p-3.5 flex flex-col justify-between gap-2"
                    >
                      <div>
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <span className="text-sm font-extrabold text-[#08090D]">{g.word}</span>
                            <span className="ml-2 text-xs text-black/50">{g.ipa}</span>
                          </div>
                          <span className="rounded-full bg-[#E5D9F7] px-2 py-0.5 text-[10px] font-bold text-[#4B2C7A] shrink-0">
                            {g.pos}
                          </span>
                        </div>
                        <p className="mt-1 text-xs font-bold text-[#1A4F73]">{g.meaningVi}</p>
                        <p className="mt-1 text-xs italic text-black/65">&ldquo;{g.example}&rdquo;</p>
                      </div>

                      <div className="flex items-center justify-between gap-2 pt-1">
                        <button
                          type="button"
                          onClick={() => speakText(g.word, 'en-US', 0.9)}
                          className="inline-flex items-center gap-1 rounded-full bg-white px-2.5 py-1 text-[11px] font-bold text-[#08090D] border border-black/10 hover:bg-[#D7ECF9]"
                        >
                          <Volume2 className="h-3 w-3" /> Nghe từ
                        </button>

                        <button
                          type="button"
                          disabled={alreadyInDeck}
                          onClick={() => handleAddGlossaryToVocab(g)}
                          className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-bold transition ${
                            alreadyInDeck
                              ? 'bg-[#D2EED9] text-[#1B5C32] cursor-default'
                              : 'bg-[#08090D] text-white hover:opacity-90'
                          }`}
                        >
                          {alreadyInDeck ? (
                            <>
                              <BookmarkCheck className="h-3 w-3" /> Đã có trong Flashcard
                            </>
                          ) : (
                            <>
                              <Sparkles className="h-3 w-3" /> + Flashcard
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </article>

          {/* Comprehension Questions */}
          <section className="rounded-[24px] border border-black/8 bg-white p-6 sm:p-7 shadow-card space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <h3 className="flex items-center gap-2 text-lg font-extrabold text-[#08090D]">
                  <BookOpen className="h-5 w-5 text-[#1A4F73]" />
                  Kiểm tra Đọc hiểu (Reading Comprehension)
                </h3>
                <p className="text-xs text-black/55 mt-0.5">
                  Trả lời đủ {totalQuestions} câu hỏi bên dưới để kiểm tra khả năng nắm ý chính, chi tiết, suy luận và từ vựng ngữ cảnh.
                </p>
              </div>
              <span className="rounded-full bg-[#EEEEEB] px-3 py-1 text-xs font-extrabold text-[#08090D]">
                Đã trả lời {answeredCount}/{totalQuestions} • Đúng {correctCount}
              </span>
            </div>

            <div className="space-y-3">
              {activeArticle.questions.map((q) => (
                <InteractiveExerciseCard
                  key={q.id}
                  exercise={q}
                  speechRate={speechRate}
                  onAnswered={handleAnsweredQuestion}
                />
              ))}
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-[#F6F6F4] p-4 border border-black/5">
              <div className="text-xs text-black/70">
                {answeredCount < totalQuestions
                  ? `Hãy trả lời thêm ${totalQuestions - answeredCount} câu hỏi hoặc đánh dấu hoàn thành sau khi đọc xong.`
                  : `Bạn trả lời đúng ${correctCount}/${totalQuestions} câu (${Math.round(
                      (correctCount / totalQuestions) * 100
                    )}%).`}
              </div>
              <button
                type="button"
                onClick={handleFinishReading}
                className="inline-flex items-center gap-2 rounded-full bg-[#08090D] px-5 py-2.5 text-xs font-extrabold text-white transition hover:opacity-90"
              >
                <CheckCircle2 className="h-4 w-4" />
                {completedReadings[activeArticle.id]
                  ? 'Cập nhật kết quả (+12 XP)'
                  : 'Hoàn thành bài đọc (+30 XP)'}
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
