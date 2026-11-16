import React, { useEffect, useMemo, useState } from 'react';
import {
  BookmarkCheck,
  BookmarkPlus,
  BookOpen,
  CalendarDays,
  CheckCircle2,
  Clock,
  Languages,
  Mail,
  Newspaper,
  Search,
  Sparkles,
  Square,
  Volume2,
} from 'lucide-react';
import { useLearning } from '../../context/LearningContext';
import {
  JAPANESE_LONG_READINGS,
  JAPANESE_READING_CATEGORIES,
  JapaneseGlossaryItem,
  JapaneseLongReadingArticle,
  JapaneseReadingCategory,
} from '../../data/japaneseLongReadings';
import { speakText, stopSpeaking } from '../../utils/speech';
import { InteractiveExerciseCard } from '../common/InteractiveExerciseCard';

const COMPLETED_JP_READINGS_KEY = 'manabi_completed_jp_readings_v1';

function countJapaneseChars(article: JapaneseLongReadingArticle): number {
  return article.paragraphs
    .map((p) => p.jp.replace(/[\s。、「」！？（）]/g, ''))
    .join('').length;
}

function getCategoryStyle(category: JapaneseReadingCategory): {
  badge: string;
  label: string;
  Icon: React.ComponentType<{ className?: string }>;
} {
  if (category === 'mail') {
    return {
      badge: 'bg-[#E5D9F7] text-[#4B2C7A]',
      label: 'Email & Tin nhắn',
      Icon: Mail,
    };
  }
  if (category === 'event') {
    return {
      badge: 'bg-[#F6E9B2] text-[#6B4F0A]',
      label: 'Sự kiện & Thông báo',
      Icon: CalendarDays,
    };
  }
  return {
    badge: 'bg-[#D2EED9] text-[#1B5C32]',
    label: 'Nhật ký & Văn hóa',
    Icon: Newspaper,
  };
}

export const JapaneseReadingView: React.FC = () => {
  const { state, addVocabItem, recordPracticeResult, saveNote } = useLearning();

  const [categoryFilter, setCategoryFilter] = useState<'all' | JapaneseReadingCategory>('all');
  const [levelFilter, setLevelFilter] = useState<'all' | 'N5' | 'N5+'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedId, setSelectedId] = useState<string>(JAPANESE_LONG_READINGS[0].id);

  // Reading UX controls tailored for Japanese
  const [showKana, setShowKana] = useState(true);
  const [showRomaji, setShowRomaji] = useState(false);
  const [showAllVi, setShowAllVi] = useState(false);
  const [revealedParagraphs, setRevealedParagraphs] = useState<Record<string, boolean>>({});
  const [largeText, setLargeText] = useState(false);
  const [speechRate, setSpeechRate] = useState<number>(0.9);
  const [speakingKey, setSpeakingKey] = useState<string | null>(null);

  const [answersByArticle, setAnswersByArticle] = useState<Record<string, Record<string, boolean>>>({});
  const [completedReadings, setCompletedReadings] = useState<
    Record<string, { scorePct: number; completedAt: string }>
  >(() => {
    try {
      const raw = localStorage.getItem(COMPLETED_JP_READINGS_KEY);
      return raw ? JSON.parse(raw) : {};
    } catch {
      return {};
    }
  });
  const [savedNotice, setSavedNotice] = useState<string | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem(COMPLETED_JP_READINGS_KEY, JSON.stringify(completedReadings));
    } catch {
      // Ignore storage error
    }
  }, [completedReadings]);

  useEffect(() => {
    return () => {
      stopSpeaking();
    };
  }, []);

  const filteredArticles = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();
    return JAPANESE_LONG_READINGS.filter((a) => {
      if (categoryFilter !== 'all' && a.category !== categoryFilter) return false;
      if (levelFilter !== 'all' && a.level !== levelFilter) return false;
      if (!q) return true;
      return (
        a.title.toLowerCase().includes(q) ||
        a.titleVi.toLowerCase().includes(q) ||
        a.subtitleVi.toLowerCase().includes(q) ||
        a.glossary.some((g) => g.word.includes(q) || g.meaningVi.toLowerCase().includes(q))
      );
    });
  }, [categoryFilter, levelFilter, searchTerm]);

  const activeArticle = useMemo(
    () =>
      JAPANESE_LONG_READINGS.find((a) => a.id === selectedId) ||
      filteredArticles[0] ||
      JAPANESE_LONG_READINGS[0],
    [selectedId, filteredArticles]
  );

  const existingVocabSet = useMemo(() => {
    return new Set(
      state.vocabItems.filter((v) => v.language === 'jp').map((v) => v.word.trim().toLowerCase())
    );
  }, [state.vocabItems]);

  const articleAnswers = answersByArticle[activeArticle.id] || {};
  const answeredCount = activeArticle.questions.filter((q) => articleAnswers[q.id] !== undefined).length;
  const correctCount = activeArticle.questions.filter((q) => articleAnswers[q.id] === true).length;
  const completedRecord = completedReadings[activeArticle.id];

  const handleSelectArticle = (articleId: string) => {
    stopSpeaking();
    setSpeakingKey(null);
    setSelectedId(articleId);
    setRevealedParagraphs({});
    setSavedNotice(null);
  };

  const handleToggleAudio = (key: string, text: string) => {
    if (speakingKey === key) {
      stopSpeaking();
      setSpeakingKey(null);
      return;
    }
    setSpeakingKey(key);
    speakText(text, 'ja-JP', speechRate);
  };

  const handleSaveGlossaryWord = (item: JapaneseGlossaryItem) => {
    if (existingVocabSet.has(item.word.toLowerCase())) return;
    addVocabItem({
      language: 'jp',
      word: item.word,
      reading: item.reading,
      romaji: item.romaji,
      partOfSpeech: item.partOfSpeech,
      meaningVi: item.meaningVi,
      topic: `Reading: ${activeArticle.categoryLabelVi}`,
      levelTag: activeArticle.level,
      example: activeArticle.paragraphs[0]?.jp || item.word,
      exampleVi: activeArticle.paragraphs[0]?.vi || item.meaningVi,
      customLists: ['Đọc hiểu N5'],
    });
    setSavedNotice(`Đã lưu "${item.word}" vào kho Từ vựng SRS!`);
    setTimeout(() => setSavedNotice(null), 2600);
  };

  const handleSaveToNotes = () => {
    saveNote({
      language: 'jp',
      title: `Đọc hiểu N5: ${activeArticle.titleVi}`,
      content: `${activeArticle.summaryVi}\n\nTừ vựng mới:\n${activeArticle.glossary
        .map((g) => `- ${g.word} (${g.reading}): ${g.meaningVi}`)
        .join('\n')}`,
      tags: ['reading', activeArticle.level, activeArticle.category],
    });
    setSavedNotice('Đã lưu tóm tắt bài đọc & từ mới vào Sổ tay Ghi chú!');
    setTimeout(() => setSavedNotice(null), 2600);
  };

  const handleCompleteReading = () => {
    if (answeredCount === 0) return;
    const scorePct = Math.round((correctCount / activeArticle.questions.length) * 100);
    recordPracticeResult({
      language: 'jp',
      skill: 'reading',
      correct: correctCount,
      total: activeArticle.questions.length,
      minutes: activeArticle.readMinutes + 3,
      xp: Math.max(20, correctCount * 15),
    });
    setCompletedReadings((prev) => ({
      ...prev,
      [activeArticle.id]: {
        scorePct,
        completedAt: new Date().toISOString().slice(0, 10),
      },
    }));
    setSavedNotice(`Hoàn thành bài đọc! Điểm: ${scorePct}% • Đã cộng XP!`);
    setTimeout(() => setSavedNotice(null), 3200);
  };

  const completedTotal = Object.keys(completedReadings).length;
  const catStyle = getCategoryStyle(activeArticle.category);
  const CatIcon = catStyle.Icon;

  return (
    <div className="space-y-5">
      {/* Header Hero */}
      <section className="rounded-[26px] border border-black/10 bg-white p-5 sm:p-7 shadow-soft space-y-4">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="space-y-1.5">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#E5D9F7] px-3 py-1 text-xs font-extrabold text-[#4B2C7A]">
              🇯🇵 Phòng Đọc hiểu dài N5 → N5+ (長文読解)
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#08090D]">
              Bài đọc dài Tiếng Nhật theo Chủ đề, Tin nhắn & Thông báo
            </h1>
            <p className="max-w-2xl text-xs sm:text-sm text-black/65">
              Luyện đọc các văn bản thực tế dài như tin nhắn LINE, email xin nghỉ, lịch trình Shinkansen, thông báo sự kiện và văn hóa Nhật. Có bật/tắt{' '}
              <strong className="text-[#08090D]">Kana (Furigana)</strong>, <strong className="text-[#08090D]">Romaji</strong>, nghe đọc <code className="font-mono">ja-JP</code> và lưu từ mới thẳng vào SRS.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <div className="rounded-2xl bg-[#D2EED9] px-4 py-2.5 text-xs font-extrabold text-[#1B5C32]">
              Đã hoàn thành: {completedTotal}/{JAPANESE_LONG_READINGS.length} bài
            </div>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-black/8 pt-4">
          <div className="flex flex-wrap items-center gap-1.5">
            {JAPANESE_READING_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setCategoryFilter(cat.id)}
                className={`rounded-full px-3.5 py-1.5 text-xs font-extrabold transition ${
                  categoryFilter === cat.id
                    ? 'bg-[#08090D] text-white'
                    : 'bg-[#F6F6F4] text-black/70 hover:bg-[#EEEEEB]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <div className="inline-flex rounded-full bg-[#F6F6F4] p-1">
              {(['all', 'N5', 'N5+'] as const).map((lv) => (
                <button
                  key={lv}
                  type="button"
                  onClick={() => setLevelFilter(lv)}
                  className={`rounded-full px-3 py-1 text-xs font-extrabold transition ${
                    levelFilter === lv ? 'bg-white text-[#08090D] shadow-sm' : 'text-black/55'
                  }`}
                >
                  {lv === 'all' ? 'Mọi cấp' : lv}
                </button>
              ))}
            </div>

            <div className="flex w-full sm:w-auto items-center gap-2 rounded-full border border-black/12 bg-[#F6F6F4] px-3.5 py-1.5 focus-within:border-[#08090D] focus-within:bg-white focus-within:ring-2 focus-within:ring-[#08090D]/10 transition">
              <Search className="h-3.5 w-3.5 text-black/45 shrink-0" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Tìm bài đọc, từ mới..."
                className="w-full sm:w-40 bg-transparent text-xs font-medium text-[#08090D] outline-none"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Main Split Layout: Article Selector + Reader */}
      <div className="grid gap-5 lg:grid-cols-[310px_1fr] items-start">
        {/* Left List */}
        <aside className="rounded-[26px] border border-black/10 bg-[#EEEEEC] p-3.5 space-y-2.5">
          <div className="px-2 pt-1 text-xs font-extrabold uppercase tracking-wider text-black/50">
            Danh sách {filteredArticles.length} bài đọc
          </div>

          {filteredArticles.length === 0 ? (
            <div className="rounded-2xl bg-white p-5 text-center text-xs text-black/55">
              Không có bài đọc nào khớp bộ lọc.
            </div>
          ) : (
            <div className="space-y-2 max-h-[68vh] overflow-y-auto pr-0.5">
              {filteredArticles.map((art) => {
                const isSelected = art.id === activeArticle.id;
                const style = getCategoryStyle(art.category);
                const done = completedReadings[art.id];
                return (
                  <button
                    key={art.id}
                    type="button"
                    onClick={() => handleSelectArticle(art.id)}
                    className={`w-full rounded-[20px] border p-3.5 text-left transition ${
                      isSelected
                        ? 'border-[#08090D] bg-white shadow-sm'
                        : 'border-black/8 bg-white/75 hover:bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-1.5">
                      <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-extrabold ${style.badge}`}>
                        {style.label}
                      </span>
                      <span className="rounded-full bg-[#F6F6F4] px-2 py-0.5 text-[10px] font-bold text-black/65">
                        {art.level}
                      </span>
                    </div>
                    <h3 className="mt-2 font-jp text-sm font-extrabold text-[#08090D] leading-snug">
                      {art.titleVi}
                    </h3>
                    <p className="mt-1 text-[11px] text-black/55 line-clamp-2">{art.subtitleVi}</p>
                    <div className="mt-2 flex items-center justify-between text-[11px] font-semibold text-black/50">
                      <span className="inline-flex items-center gap-1">
                        <Clock className="h-3 w-3" /> ~{art.readMinutes}p • {countJapaneseChars(art)} ký tự
                      </span>
                      {done && (
                        <span className="inline-flex items-center gap-1 text-[#1B5C32] font-bold">
                          <CheckCircle2 className="h-3.5 w-3.5" /> {done.scorePct}%
                        </span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </aside>

        {/* Right Reader Pane */}
        <div className="space-y-5 min-w-0">
          <article className="rounded-[26px] border border-black/10 bg-white p-5 sm:p-7 shadow-soft space-y-5">
            {/* Article Meta + Toolbar */}
            <div className="space-y-3 border-b border-black/8 pb-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex flex-wrap items-center gap-2">
                  <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-extrabold ${catStyle.badge}`}>
                    <CatIcon className="h-3.5 w-3.5" /> {catStyle.label}
                  </span>
                  <span className="rounded-full bg-[#F6F6F4] px-3 py-1 text-xs font-extrabold text-[#08090D]">
                    {activeArticle.level}
                  </span>
                  <span className="text-xs font-semibold text-black/50">{activeArticle.sourceMeta}</span>
                </div>

                {completedRecord && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-[#D2EED9] px-3 py-1 text-xs font-extrabold text-[#1B5C32]">
                    <CheckCircle2 className="h-3.5 w-3.5" /> Đã xong ({completedRecord.scorePct}%)
                  </span>
                )}
              </div>

              <div>
                <h2 className="font-jp text-xl sm:text-2xl font-extrabold text-[#08090D]">
                  {activeArticle.title}
                </h2>
                <p className="mt-1 text-xs sm:text-sm text-black/60">{activeArticle.summaryVi}</p>
              </div>

              {/* Reader Controls */}
              <div className="flex flex-wrap items-center gap-2 pt-1">
                <button
                  type="button"
                  onClick={() =>
                    handleToggleAudio(
                      `full-${activeArticle.id}`,
                      activeArticle.paragraphs.map((p) => p.jp).join(' ')
                    )
                  }
                  className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-extrabold transition ${
                    speakingKey === `full-${activeArticle.id}`
                      ? 'bg-[#F7DCE1] text-[#7D233B]'
                      : 'bg-[#08090D] text-white hover:opacity-90'
                  }`}
                >
                  {speakingKey === `full-${activeArticle.id}` ? (
                    <>
                      <Square className="h-3 w-3 fill-current" /> Dừng đọc
                    </>
                  ) : (
                    <>
                      <Volume2 className="h-3.5 w-3.5" /> Nghe toàn bài
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => setShowKana((v) => !v)}
                  className={`rounded-full px-3 py-1.5 text-xs font-bold transition ${
                    showKana ? 'bg-[#E5D9F7] text-[#4B2C7A]' : 'bg-[#F6F6F4] text-black/65'
                  }`}
                >
                  {showKana ? 'Ẩn cách đọc Kana' : 'Hiện cách đọc Kana'}
                </button>

                <button
                  type="button"
                  onClick={() => setShowRomaji((v) => !v)}
                  className={`rounded-full px-3 py-1.5 text-xs font-bold transition ${
                    showRomaji ? 'bg-[#D7ECF9] text-[#1A4F73]' : 'bg-[#F6F6F4] text-black/65'
                  }`}
                >
                  {showRomaji ? 'Ẩn Romaji' : 'Hiện Romaji'}
                </button>

                <button
                  type="button"
                  onClick={() => setShowAllVi((v) => !v)}
                  className={`inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-xs font-bold transition ${
                    showAllVi ? 'bg-[#D2EED9] text-[#1B5C32]' : 'bg-[#F6F6F4] text-black/65'
                  }`}
                >
                  <Languages className="h-3.5 w-3.5" />
                  {showAllVi ? 'Ẩn dịch tiếng Việt' : 'Dịch cả bài'}
                </button>

                <button
                  type="button"
                  onClick={() => setLargeText((v) => !v)}
                  className={`rounded-full px-3 py-1.5 text-xs font-bold transition ${
                    largeText ? 'bg-[#08090D] text-white' : 'bg-[#F6F6F4] text-black/65'
                  }`}
                >
                  Cỡ chữ {largeText ? 'Lớn' : 'Vừa'}
                </button>

                <select
                  value={speechRate}
                  onChange={(e) => setSpeechRate(Number(e.target.value))}
                  aria-label="Tốc độ đọc"
                  className="rounded-full bg-[#F6F6F4] px-3 py-1.5 text-xs font-bold text-[#08090D] outline-none"
                >
                  <option value={0.75}>0.75x Chậm</option>
                  <option value={0.9}>0.9x Vừa</option>
                  <option value={1.05}>1.05x Tự nhiên</option>
                </select>

                <button
                  type="button"
                  onClick={handleSaveToNotes}
                  className="inline-flex items-center gap-1 rounded-full bg-[#F6E9B2] px-3 py-1.5 text-xs font-bold text-[#6B4F0A] hover:opacity-90"
                >
                  <BookOpen className="h-3.5 w-3.5" /> Lưu Sổ tay
                </button>
              </div>
            </div>

            {savedNotice && (
              <div className="rounded-2xl bg-[#D2EED9] px-4 py-2.5 text-xs font-bold text-[#1B5C32]">
                {savedNotice}
              </div>
            )}

            {/* Paragraphs */}
            <div className="space-y-4">
              {activeArticle.paragraphs.map((p, idx) => {
                const isViVisible = showAllVi || !!revealedParagraphs[p.id];
                const audioKey = `${activeArticle.id}-${p.id}`;
                return (
                  <div
                    key={p.id}
                    className="rounded-[20px] border border-black/8 bg-[#F6F6F4]/60 p-4 space-y-2"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <span className="mt-1 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white text-[11px] font-extrabold text-black/60 border border-black/8">
                        {idx + 1}
                      </span>
                      <div className="flex-1 space-y-1.5">
                        <p
                          className={`font-jp font-semibold leading-relaxed text-[#08090D] ${
                            largeText ? 'text-lg sm:text-xl' : 'text-base sm:text-[17px]'
                          }`}
                        >
                          {p.jp}
                        </p>
                        {showKana && (
                          <p className="font-jp text-xs sm:text-sm leading-relaxed text-[#4B2C7A]">
                            {p.kana}
                          </p>
                        )}
                        {showRomaji && (
                          <p className="text-xs italic text-[#1A4F73]">{p.romaji}</p>
                        )}
                      </div>

                      <div className="flex items-center gap-1 shrink-0">
                        <button
                          type="button"
                          onClick={() => handleToggleAudio(audioKey, p.jp)}
                          title="Nghe đoạn này"
                          className={`rounded-full p-2 transition ${
                            speakingKey === audioKey
                              ? 'bg-[#08090D] text-white'
                              : 'bg-white text-black/70 hover:bg-[#E5D9F7]'
                          }`}
                        >
                          <Volume2 className="h-3.5 w-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            setRevealedParagraphs((prev) => ({ ...prev, [p.id]: !prev[p.id] }))
                          }
                          title="Hiện/ẩn nghĩa tiếng Việt"
                          className={`rounded-full px-2.5 py-1.5 text-[11px] font-bold transition ${
                            isViVisible
                              ? 'bg-[#D2EED9] text-[#1B5C32]'
                              : 'bg-white text-black/60 hover:bg-black/5'
                          }`}
                        >
                          Dịch
                        </button>
                      </div>
                    </div>

                    {isViVisible && (
                      <div className="ml-9 rounded-xl bg-white px-3.5 py-2 text-xs sm:text-sm text-black/75 border border-black/6">
                        {p.vi}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Glossary */}
            <div className="rounded-[22px] border border-[#D2BEF2] bg-[#E5D9F7]/35 p-4 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-extrabold text-[#4B2C7A]">
                  Từ vựng trọng tâm trong bài ({activeArticle.glossary.length} từ)
                </h3>
                <span className="text-[11px] font-semibold text-[#4B2C7A]/80">
                  Bấm Lưu SRS để thêm vào bộ ôn tập
                </span>
              </div>
              <div className="grid gap-2.5 sm:grid-cols-2">
                {activeArticle.glossary.map((item) => {
                  const alreadySaved = existingVocabSet.has(item.word.toLowerCase());
                  return (
                    <div
                      key={item.word}
                      className="flex items-center justify-between gap-2 rounded-2xl bg-white p-3 border border-black/8"
                    >
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-1.5">
                          <span className="font-jp text-base font-extrabold text-[#08090D]">
                            {item.word}
                          </span>
                          <span className="font-jp text-xs font-semibold text-[#4B2C7A]">
                            ({item.reading})
                          </span>
                          <span className="rounded-full bg-[#F6F6F4] px-2 py-0.5 text-[10px] font-bold text-black/55">
                            {item.partOfSpeech}
                          </span>
                        </div>
                        <p className="text-xs font-medium text-black/70">{item.meaningVi}</p>
                      </div>
                      <div className="flex items-center gap-1 shrink-0">
                        <button
                          type="button"
                          onClick={() => speakText(item.word, 'ja-JP', speechRate)}
                          className="rounded-full bg-[#F6F6F4] p-2 hover:bg-[#EEEEEB]"
                          aria-label={`Nghe từ ${item.word}`}
                        >
                          <Volume2 className="h-3.5 w-3.5" />
                        </button>
                        <button
                          type="button"
                          disabled={alreadySaved}
                          onClick={() => handleSaveGlossaryWord(item)}
                          className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1.5 text-[11px] font-bold transition ${
                            alreadySaved
                              ? 'bg-[#D2EED9] text-[#1B5C32]'
                              : 'bg-[#08090D] text-white hover:opacity-90'
                          }`}
                        >
                          {alreadySaved ? (
                            <>
                              <BookmarkCheck className="h-3 w-3" /> Đã lưu
                            </>
                          ) : (
                            <>
                              <BookmarkPlus className="h-3 w-3" /> Lưu SRS
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
          <section className="rounded-[26px] border border-black/10 bg-white p-5 sm:p-7 shadow-soft space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h3 className="text-lg font-extrabold text-[#08090D]">
                  Kiểm tra Đọc hiểu ({answeredCount}/{activeArticle.questions.length} câu)
                </h3>
                <p className="text-xs text-black/55">
                  Trả lời xong để ghi nhận kết quả và nhận điểm XP vào tiến độ Tiếng Nhật.
                </p>
              </div>
              <button
                type="button"
                disabled={answeredCount === 0}
                onClick={handleCompleteReading}
                className="inline-flex items-center gap-1.5 rounded-full bg-[#08090D] px-4 py-2 text-xs font-extrabold text-white disabled:opacity-40 hover:opacity-90 transition"
              >
                <Sparkles className="h-3.5 w-3.5" /> Lưu kết quả ({correctCount}/{activeArticle.questions.length})
              </button>
            </div>

            <div className="space-y-4">
              {activeArticle.questions.map((q) => (
                <InteractiveExerciseCard
                  key={q.id}
                  exercise={q}
                  speechRate={speechRate}
                  onAnswered={(id, ok) =>
                    setAnswersByArticle((prev) => ({
                      ...prev,
                      [activeArticle.id]: {
                        ...(prev[activeArticle.id] || {}),
                        [id]: ok,
                      },
                    }))
                  }
                />
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
