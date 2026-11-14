import React, { useEffect, useMemo, useState } from 'react';
import {
  AlertCircle,
  ArrowUpDown,
  BookOpen,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  FolderPlus,
  LayoutGrid,
  Layers,
  ListTree,
  Plus,
  RotateCw,
  Search,
  Sparkles,
  Volume2,
  X,
} from 'lucide-react';
import { useLearning } from '../../context/LearningContext';
import {
  getPosLabelVi,
  getWordFamilyFor,
  normalizePosCategory,
  POS_BADGE_STYLES,
  POS_SORT_ORDER,
  PosCategory,
} from '../../data/wordFamilies';
import { Language, SRSState, VocabItem } from '../../types';
import { speakText } from '../../utils/speech';
import { getSRSStateLabelVi, isDueForReview, SRSRating } from '../../utils/srs';

type FlashcardMode = 'word_to_meaning' | 'meaning_to_word' | 'listening_to_word' | 'jp_char_to_reading';
type SortMode = 'topic_pos' | 'due_first' | 'alpha' | 'level';

const POS_FILTER_OPTIONS: { id: 'all' | PosCategory; label: string }[] = [
  { id: 'all', label: 'Tất cả từ loại' },
  { id: 'noun', label: 'Danh từ' },
  { id: 'verb', label: 'Động từ' },
  { id: 'adjective', label: 'Tính từ' },
  { id: 'adverb', label: 'Trạng từ' },
  { id: 'phrase', label: 'Cụm từ & Thành ngữ' },
];

interface Props {
  activeLanguage: Language;
}

export const VocabularyView: React.FC<Props> = ({ activeLanguage }) => {
  const {
    state,
    reviewVocabCard,
    addVocabItem,
    toggleVocabDifficult,
    markVocabMastered,
    addCustomVocabList,
  } = useLearning();

  const speechRate = state.settings.speechRate;
  const activeLang = activeLanguage;
  const [search, setSearch] = useState('');
  const [topicFilter, setTopicFilter] = useState<string>('all');
  const [posFilter, setPosFilter] = useState<'all' | PosCategory>('all');
  const [stateFilter, setStateFilter] = useState<'all' | SRSState | 'difficult'>('all');
  const [listFilter, setListFilter] = useState<string>('all');
  const [sortMode, setSortMode] = useState<SortMode>('topic_pos');
  const [groupByTopic, setGroupByTopic] = useState<boolean>(true);
  const [selectedVocab, setSelectedVocab] = useState<VocabItem | null>(null);
  const [topicExpandOverride, setTopicExpandOverride] = useState<Record<string, boolean>>({});
  const [allExpanded, setAllExpanded] = useState<boolean | null>(null);
  const [flatVisibleCount, setFlatVisibleCount] = useState<number>(40);

  // Flashcard session state
  const [flashcardActive, setFlashcardActive] = useState(false);
  const [flashMode, setFlashMode] = useState<FlashcardMode>('word_to_meaning');
  const [cardIndex, setCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  // Add word / custom list modals
  const [showAddWord, setShowAddWord] = useState(false);
  const [newWord, setNewWord] = useState('');
  const [newReading, setNewReading] = useState('');
  const [newRomaji, setNewRomaji] = useState('');
  const [newPos, setNewPos] = useState('noun');
  const [newMeaning, setNewMeaning] = useState('');
  const [newTopic, setNewTopic] = useState('Personal');
  const [newExample, setNewExample] = useState('');
  const [newExampleVi, setNewExampleVi] = useState('');
  const [newListName, setNewListName] = useState('');
  const [showAddList, setShowAddList] = useState(false);

  useEffect(() => {
    setSearch('');
    setTopicFilter('all');
    setPosFilter('all');
    setStateFilter('all');
    setListFilter('all');
    setSelectedVocab(null);
    setTopicExpandOverride({});
    setAllExpanded(null);
    setFlatVisibleCount(40);
    setCardIndex(0);
    setIsFlipped(false);
    setFlashcardActive(false);
    setShowAddWord(false);
    setNewPos(activeLang === 'en' ? 'noun' : 'Danh từ');
    setFlashMode((prev) => (activeLang === 'en' && prev === 'jp_char_to_reading' ? 'word_to_meaning' : prev));
  }, [activeLang]);

  const langVocab = useMemo(
    () => state.vocabItems.filter((v) => v.language === activeLang),
    [state.vocabItems, activeLang]
  );

  const visibleLists = useMemo(() => {
    const otherLangVocab = state.vocabItems.filter((v) => v.language !== activeLang);
    return state.customVocabLists.filter(
      (listName) =>
        langVocab.some((v) => v.customLists.includes(listName)) ||
        !otherLangVocab.some((v) => v.customLists.includes(listName))
    );
  }, [state.customVocabLists, state.vocabItems, langVocab, activeLang]);

  const topics = useMemo(
    () => Array.from(new Set(langVocab.map((v) => v.topic))),
    [langVocab]
  );

  const posCounts = useMemo(() => {
    const map: Record<'all' | PosCategory, number> = {
      all: langVocab.length,
      noun: 0,
      verb: 0,
      adjective: 0,
      adverb: 0,
      phrase: 0,
    };
    for (const v of langVocab) {
      map[normalizePosCategory(v.partOfSpeech)] += 1;
    }
    return map;
  }, [langVocab]);

  const filteredVocab = useMemo(() => {
    const q = search.trim().toLowerCase();
    const list = langVocab.filter((v) => {
      if (topicFilter !== 'all' && v.topic !== topicFilter) return false;
      if (posFilter !== 'all' && normalizePosCategory(v.partOfSpeech) !== posFilter) return false;
      if (listFilter !== 'all' && !v.customLists.includes(listFilter)) return false;
      if (stateFilter === 'difficult' && !v.isDifficult) return false;
      if (stateFilter !== 'all' && stateFilter !== 'difficult' && v.srsState !== stateFilter) return false;
      if (q) {
        return (
          v.word.toLowerCase().includes(q) ||
          v.meaningVi.toLowerCase().includes(q) ||
          v.reading.toLowerCase().includes(q) ||
          (v.romaji || '').toLowerCase().includes(q) ||
          (v.partOfSpeech || '').toLowerCase().includes(q)
        );
      }
      return true;
    });

    const sorted = [...list];
    sorted.sort((a, b) => {
      if (sortMode === 'alpha') {
        return a.word.localeCompare(b.word);
      }
      if (sortMode === 'due_first') {
        const dueDiff = Number(isDueForReview(b)) - Number(isDueForReview(a));
        if (dueDiff !== 0) return dueDiff;
        return (a.nextReviewAt || 0) - (b.nextReviewAt || 0);
      }
      if (sortMode === 'level') {
        const lvlA = a.levelTag === 'B1+' ? 1 : a.levelTag === 'B2' ? 2 : 0;
        const lvlB = b.levelTag === 'B1+' ? 1 : b.levelTag === 'B2' ? 2 : 0;
        if (lvlA !== lvlB) return lvlA - lvlB;
        return a.topic.localeCompare(b.topic);
      }
      // Default 'topic_pos': Group by Topic, then Noun -> Verb -> Adj -> Adv -> Phrase, then word
      const topicCmp = a.topic.localeCompare(b.topic);
      if (topicCmp !== 0) return topicCmp;
      const posDiff =
        POS_SORT_ORDER[normalizePosCategory(a.partOfSpeech)] -
        POS_SORT_ORDER[normalizePosCategory(b.partOfSpeech)];
      if (posDiff !== 0) return posDiff;
      return a.word.localeCompare(b.word);
    });
    return sorted;
  }, [langVocab, search, topicFilter, posFilter, stateFilter, listFilter, sortMode]);

  const groupedByTopic = useMemo(() => {
    const groups = new Map<string, VocabItem[]>();
    for (const item of filteredVocab) {
      const existing = groups.get(item.topic);
      if (existing) {
        existing.push(item);
      } else {
        groups.set(item.topic, [item]);
      }
    }
    return Array.from(groups.entries()).map(([topic, items]) => ({ topic, items }));
  }, [filteredVocab]);

  const dueCards = useMemo(() => langVocab.filter((v) => isDueForReview(v)), [langVocab]);
  const sessionDeck: VocabItem[] = dueCards.length > 0 ? dueCards : langVocab;
  const activeCard = sessionDeck[cardIndex % Math.max(1, sessionDeck.length)];

  const counts = useMemo(
    () => ({
      new: langVocab.filter((v) => v.srsState === 'new').length,
      learning: langVocab.filter((v) => v.srsState === 'learning').length,
      reviewing: langVocab.filter((v) => v.srsState === 'reviewing').length,
      mastered: langVocab.filter((v) => v.srsState === 'mastered').length,
      due: dueCards.length,
    }),
    [langVocab, dueCards]
  );

  const handleGradeCard = (rating: SRSRating) => {
    if (!activeCard) return;
    reviewVocabCard(activeCard.id, rating);
    setIsFlipped(false);
    setCardIndex((i) => i + 1);
  };

  const handleCreateWord = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newWord.trim() || !newMeaning.trim()) return;
    addVocabItem({
      language: activeLang,
      word: newWord.trim(),
      reading: newReading.trim() || '-',
      romaji: activeLang === 'jp' ? newRomaji.trim() : undefined,
      partOfSpeech: newPos,
      meaningVi: newMeaning.trim(),
      topic: newTopic.trim() || 'Personal',
      levelTag: activeLang === 'en' ? 'B2' : 'N5',
      example: newExample.trim() || newWord.trim(),
      exampleVi: newExampleVi.trim() || newMeaning.trim(),
      customLists: listFilter !== 'all' ? [listFilter] : [],
    });
    setNewWord('');
    setNewReading('');
    setNewRomaji('');
    setNewMeaning('');
    setNewExample('');
    setNewExampleVi('');
    setShowAddWord(false);
  };

  const handleCreateList = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newListName.trim()) return;
    addCustomVocabList(newListName.trim());
    setNewListName('');
    setShowAddList(false);
  };

  return (
    <div className="space-y-5">
      <div className="rounded-[26px] border border-black/10 bg-white p-5 sm:p-7 shadow-soft space-y-6">
        {/* Header + Active Workspace Badge */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-extrabold text-[#08090D]">
              Kho từ vựng {activeLang === 'en' ? 'Tiếng Anh (B1→B2)' : 'Tiếng Nhật (N5)'} & Ôn SRS
            </h1>
            <p className="text-sm text-black/60">
              Hiển thị tách biệt kho từ vựng {activeLang === 'en' ? 'Tiếng Anh' : 'Tiếng Nhật'}, tự động lên lịch ôn theo trí nhớ.
            </p>
          </div>

          <span
            className={`rounded-full px-4 py-2 text-xs font-extrabold ${
              activeLang === 'en'
                ? 'bg-[#D7ECF9] text-[#1A4F73]'
                : 'bg-[#E5D9F7] text-[#4B2C7A]'
            }`}
          >
            {activeLang === 'en' ? '🇬🇧 Tiếng Anh' : '🇯🇵 Tiếng Nhật'} ({langVocab.length} từ)
          </span>
        </div>

        {/* SRS Status Summary Tiles */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
          <div className="rounded-2xl bg-[#F6E9B2]/75 p-3.5">
            <div className="text-xs font-semibold text-[#6B4F0A]">Cần ôn hôm nay</div>
            <div className="text-2xl font-extrabold text-[#08090D]">{counts.due}</div>
          </div>
          <div className="rounded-2xl bg-[#F6F6F4] p-3.5">
            <div className="text-xs font-semibold text-black/55">Từ mới</div>
            <div className="text-2xl font-extrabold text-[#08090D]">{counts.new}</div>
          </div>
          <div className="rounded-2xl bg-[#F7DCE1]/65 p-3.5">
            <div className="text-xs font-semibold text-[#7D233B]">Đang học</div>
            <div className="text-2xl font-extrabold text-[#08090D]">{counts.learning}</div>
          </div>
          <div className="rounded-2xl bg-[#D7ECF9]/70 p-3.5">
            <div className="text-xs font-semibold text-[#1A4F73]">Đang ôn</div>
            <div className="text-2xl font-extrabold text-[#08090D]">{counts.reviewing}</div>
          </div>
          <div className="col-span-2 sm:col-span-1 rounded-2xl bg-[#D2EED9]/75 p-3.5">
            <div className="text-xs font-semibold text-[#1B5C32]">Thành thạo</div>
            <div className="text-2xl font-extrabold text-[#08090D]">{counts.mastered}</div>
          </div>
        </div>

        {/* Flashcard Runner Banner / Panel */}
        <div className="rounded-[24px] border border-black/10 bg-[#F6F6F4] p-5 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F6E9B2] text-[#6B4F0A]">
                <Layers className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-base font-extrabold text-[#08090D]">
                  Phòng ôn Flashcards SRS ({dueCards.length} từ đến hạn)
                </h2>
                <p className="text-xs text-black/60">
                  Chọn 1 trong 4 chế độ ôn tập bên dưới rồi lật thẻ để tự chấm mức độ nhớ.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                setFlashcardActive((v) => !v);
                setIsFlipped(false);
              }}
              className="rounded-full bg-[#08090D] px-5 py-2.5 text-xs font-bold text-white hover:opacity-90"
            >
              {flashcardActive ? 'Đóng Flashcards' : 'Bắt đầu ôn ngay'}
            </button>
          </div>

          {flashcardActive && activeCard && (
            <div className="space-y-4 pt-2">
              {/* 4 Flashcard Modes */}
              <div className="flex flex-wrap gap-2">
                {[
                  { id: 'word_to_meaning', label: 'Nhìn từ → Đoán nghĩa' },
                  { id: 'meaning_to_word', label: 'Nhìn nghĩa → Đoán từ' },
                  { id: 'listening_to_word', label: 'Nghe âm → Nhận diện' },
                  ...(activeLang === 'jp'
                    ? [{ id: 'jp_char_to_reading', label: 'Chữ Nhật → Cách đọc & Nghĩa' }]
                    : []),
                ].map((m) => (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => {
                      setFlashMode(m.id as FlashcardMode);
                      setIsFlipped(false);
                    }}
                    className={`rounded-full px-3.5 py-1.5 text-xs font-bold transition ${
                      flashMode === m.id
                        ? 'bg-[#08090D] text-white'
                        : 'bg-white border border-black/10 text-black/70'
                    }`}
                  >
                    {m.label}
                  </button>
                ))}
              </div>

              {/* Flashcard Card */}
              <div className="mx-auto max-w-xl rounded-[24px] border border-black/10 bg-white p-6 sm:p-8 text-center shadow-card space-y-5">
                <div className="flex items-center justify-between text-xs text-black/50">
                  <span>
                    Thẻ {(cardIndex % sessionDeck.length) + 1} / {sessionDeck.length}
                  </span>
                  <span className="rounded-full bg-[#EEEEEB] px-2.5 py-0.5 font-semibold text-[#08090D]">
                    {getSRSStateLabelVi(activeCard.srsState)}
                  </span>
                </div>

                {/* Front */}
                <div className="min-h-[120px] flex flex-col items-center justify-center space-y-2">
                  {flashMode === 'word_to_meaning' && (
                    <>
                      <p className="font-jp text-3xl sm:text-4xl font-extrabold text-[#08090D]">
                        {activeCard.word}
                      </p>
                      <p className="text-sm text-black/50">{activeCard.reading}</p>
                    </>
                  )}
                  {flashMode === 'meaning_to_word' && (
                    <>
                      <p className="text-xl sm:text-2xl font-extrabold text-[#08090D]">
                        {activeCard.meaningVi}
                      </p>
                      <span className="rounded-full bg-[#EEEEEB] px-3 py-1 text-xs font-semibold text-black/60">
                        {activeCard.topic}
                      </span>
                    </>
                  )}
                  {flashMode === 'listening_to_word' && (
                    <button
                      type="button"
                      onClick={() =>
                        speakText(
                          activeCard.word,
                          activeLang === 'jp' ? 'ja-JP' : 'en-US',
                          speechRate
                        )
                      }
                      className="inline-flex items-center gap-2 rounded-full bg-[#F7DCE1] px-6 py-4 text-sm font-extrabold text-[#7D233B] hover:opacity-90"
                    >
                      <Volume2 className="h-5 w-5" />
                      Bấm để nghe phát âm & đoán từ
                    </button>
                  )}
                  {flashMode === 'jp_char_to_reading' && (
                    <>
                      <p className="font-jp text-4xl font-extrabold text-[#08090D]">
                        {activeCard.word}
                      </p>
                      <p className="text-xs text-black/50">Đọc là gì và có nghĩa là gì?</p>
                    </>
                  )}

                  <button
                    type="button"
                    onClick={() =>
                      speakText(
                        activeCard.word,
                        activeLang === 'jp' ? 'ja-JP' : 'en-US',
                        speechRate
                      )
                    }
                    className="inline-flex items-center gap-1 rounded-full bg-[#F6F6F4] px-3 py-1 text-xs font-semibold text-black/70 hover:bg-[#EEEEEB]"
                  >
                    <Volume2 className="h-3.5 w-3.5" /> Nghe
                  </button>
                </div>

                {/* Back (Revealed) */}
                {isFlipped ? (
                  <div className="space-y-4 border-t border-black/10 pt-5">
                    <div>
                      <p className="font-jp text-xl font-extrabold text-[#08090D]">
                        {activeCard.word}{' '}
                        <span className="text-sm font-semibold text-[#5A3A8C]">
                          {activeCard.reading} {activeCard.romaji ? `(${activeCard.romaji})` : ''}
                        </span>
                      </p>
                      <p className="mt-1 text-base font-bold text-[#1B5C32]">{activeCard.meaningVi}</p>
                      <p className="mt-2 font-jp text-xs text-black/70 italic">
                        &ldquo;{activeCard.example}&rdquo;
                      </p>
                      <p className="text-xs text-black/55">{activeCard.exampleVi}</p>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2">
                      <button
                        type="button"
                        onClick={() => handleGradeCard('again')}
                        className="rounded-2xl bg-[#F7DCE1] px-3 py-2.5 text-xs font-extrabold text-[#7D233B] hover:opacity-90"
                      >
                        Quên (10 phút)
                      </button>
                      <button
                        type="button"
                        onClick={() => handleGradeCard('hard')}
                        className="rounded-2xl bg-[#F6E9B2] px-3 py-2.5 text-xs font-extrabold text-[#6B4F0A] hover:opacity-90"
                      >
                        Khó (1 ngày)
                      </button>
                      <button
                        type="button"
                        onClick={() => handleGradeCard('good')}
                        className="rounded-2xl bg-[#D7ECF9] px-3 py-2.5 text-xs font-extrabold text-[#1A4F73] hover:opacity-90"
                      >
                        Nhớ tốt (+5 XP)
                      </button>
                      <button
                        type="button"
                        onClick={() => handleGradeCard('easy')}
                        className="rounded-2xl bg-[#D2EED9] px-3 py-2.5 text-xs font-extrabold text-[#1B5C32] hover:opacity-90"
                      >
                        Rất dễ (+5 XP)
                      </button>
                    </div>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => setIsFlipped(true)}
                    className="inline-flex items-center gap-2 rounded-full bg-[#08090D] px-6 py-2.5 text-sm font-bold text-white hover:opacity-90"
                  >
                    <RotateCw className="h-4 w-4" />
                    Lật xem đáp án
                  </button>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Search, Filter & Add Controls */}
        {/* Search, Filter, Sort, Group & Add Controls */}
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2 flex-1">
              <div className="flex items-center gap-2 rounded-full border border-black/10 bg-[#F6F6F4] px-4 py-2 min-w-[200px] flex-1 max-w-xs">
                <Search className="h-4 w-4 text-black/45" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Tìm từ, nghĩa, phiên âm..."
                  className="w-full bg-transparent text-xs sm:text-sm outline-none"
                />
              </div>

              <select
                value={topicFilter}
                onChange={(e) => setTopicFilter(e.target.value)}
                className="rounded-full border border-black/10 bg-white px-3.5 py-2 text-xs font-bold"
              >
                <option value="all">Mọi chủ đề</option>
                {topics.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>

              <select
                value={stateFilter}
                onChange={(e) => setStateFilter(e.target.value as any)}
                className="rounded-full border border-black/10 bg-white px-3.5 py-2 text-xs font-bold"
              >
                <option value="all">Mọi trạng thái</option>
                <option value="new">Từ mới</option>
                <option value="learning">Đang học</option>
                <option value="reviewing">Đang ôn</option>
                <option value="mastered">Thành thạo</option>
                <option value="difficult">Từ đánh dấu khó</option>
              </select>

              <select
                value={listFilter}
                onChange={(e) => setListFilter(e.target.value)}
                className="rounded-full border border-black/10 bg-white px-3.5 py-2 text-xs font-bold"
              >
                <option value="all">Tất cả bộ từ</option>
                {visibleLists.map((l) => (
                  <option key={l} value={l}>
                    📁 {l}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => setShowAddList((v) => !v)}
                className="inline-flex items-center gap-1.5 rounded-full border border-black/15 bg-white px-3.5 py-2 text-xs font-bold hover:bg-[#F6F6F4]"
              >
                <FolderPlus className="h-3.5 w-3.5" />
                Tạo bộ từ
              </button>
              <button
                type="button"
                onClick={() => setShowAddWord((v) => !v)}
                className="inline-flex items-center gap-1.5 rounded-full bg-[#08090D] px-4 py-2 text-xs font-bold text-white hover:opacity-90"
              >
                <Plus className="h-3.5 w-3.5" />
                Thêm từ mới
              </button>
            </div>
          </div>

          {/* Part-of-Speech Filter Pills + Smart Sort & Topic Grouping Bar */}
          <div className="flex flex-wrap items-center justify-between gap-2.5 rounded-2xl bg-[#F6F6F4] px-3.5 py-2.5 border border-black/5">
            <div className="flex flex-wrap items-center gap-1.5">
              {POS_FILTER_OPTIONS.map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setPosFilter(opt.id)}
                  className={`rounded-full px-3 py-1 text-xs font-bold transition ${
                    posFilter === opt.id
                      ? 'bg-[#08090D] text-white'
                      : 'bg-white border border-black/10 text-black/70 hover:bg-[#EEEEEB]'
                  }`}
                >
                  {opt.label} ({posCounts[opt.id]})
                </button>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <div className="inline-flex items-center gap-1.5 rounded-full border border-black/10 bg-white px-3 py-1">
                <ArrowUpDown className="h-3.5 w-3.5 text-black/55" />
                <select
                  value={sortMode}
                  onChange={(e) => setSortMode(e.target.value as SortMode)}
                  className="bg-transparent text-xs font-bold outline-none"
                >
                  <option value="topic_pos">Sắp xếp: Chủ đề + Từ loại (N→V→Adj)</option>
                  <option value="due_first">Sắp xếp: Đến hạn ôn SRS trước</option>
                  <option value="alpha">Sắp xếp: Bảng chữ cái A → Z</option>
                  <option value="level">Sắp xếp: Cấp độ dễ → nâng cao</option>
                </select>
              </div>

              <button
                type="button"
                onClick={() => setGroupByTopic((v) => !v)}
                className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold transition ${
                  groupByTopic
                    ? 'bg-[#D7ECF9] text-[#1A4F73]'
                    : 'bg-white border border-black/10 text-black/70 hover:bg-[#EEEEEB]'
                }`}
              >
                {groupByTopic ? <ListTree className="h-3.5 w-3.5" /> : <LayoutGrid className="h-3.5 w-3.5" />}
                {groupByTopic ? 'Đang nhóm theo chủ đề' : 'Hiển thị danh sách phẳng'}
              </button>
            </div>
          </div>
        </div>

        {/* Add Custom List Form */}
        {showAddList && (
          <form onSubmit={handleCreateList} className="flex flex-wrap items-center gap-2 rounded-2xl bg-[#F6F6F4] p-3">
            <input
              type="text"
              value={newListName}
              onChange={(e) => setNewListName(e.target.value)}
              placeholder="Tên bộ từ vựng tùy chỉnh..."
              className="flex-1 rounded-xl border border-black/10 bg-white px-3 py-2 text-xs outline-none"
            />
            <button type="submit" className="rounded-full bg-[#08090D] px-4 py-2 text-xs font-bold text-white">
              Tạo danh sách
            </button>
          </form>
        )}

        {/* Add Word Form */}
        {showAddWord && (
          <form
            onSubmit={handleCreateWord}
            className="rounded-2xl border border-black/10 bg-[#F6F6F4] p-4 space-y-3"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold uppercase tracking-wider text-black/60">
                Thêm từ vựng {activeLang === 'en' ? 'Tiếng Anh' : 'Tiếng Nhật'} mới
              </span>
              <button type="button" onClick={() => setShowAddWord(false)}>
                <X className="h-4 w-4 text-black/50" />
              </button>
            </div>
            <div className="grid gap-2.5 sm:grid-cols-4">
              <input
                type="text"
                required
                value={newWord}
                onChange={(e) => setNewWord(e.target.value)}
                placeholder={activeLang === 'en' ? 'Từ tiếng Anh (VD: resilient)' : 'Chữ Nhật (VD: 図書館)'}
                className="rounded-xl border border-black/10 bg-white px-3 py-2 text-xs outline-none"
              />
              <select
                value={newPos}
                onChange={(e) => setNewPos(e.target.value)}
                className="rounded-xl border border-black/10 bg-white px-3 py-2 text-xs font-bold outline-none"
              >
                <option value={activeLang === 'en' ? 'noun' : 'Danh từ'}>Danh từ</option>
                <option value={activeLang === 'en' ? 'verb' : 'Động từ'}>Động từ</option>
                <option value={activeLang === 'en' ? 'adjective' : 'Tính từ -い'}>Tính từ</option>
                <option value={activeLang === 'en' ? 'adverb' : 'Trạng từ'}>Trạng từ</option>
                <option value={activeLang === 'en' ? 'collocation' : 'Chào hỏi'}>Cụm từ / Mẫu câu</option>
              </select>
              <input
                type="text"
                value={newReading}
                onChange={(e) => setNewReading(e.target.value)}
                placeholder={activeLang === 'en' ? 'Phiên âm IPA' : 'Hiragana (VD: としょかん)'}
                className="rounded-xl border border-black/10 bg-white px-3 py-2 text-xs outline-none"
              />
              {activeLang === 'jp' ? (
                <input
                  type="text"
                  value={newRomaji}
                  onChange={(e) => setNewRomaji(e.target.value)}
                  placeholder="Romaji (VD: toshokan)"
                  className="rounded-xl border border-black/10 bg-white px-3 py-2 text-xs outline-none"
                />
              ) : (
                <input
                  type="text"
                  value={newTopic}
                  onChange={(e) => setNewTopic(e.target.value)}
                  placeholder="Chủ đề (VD: Work & AI)"
                  className="rounded-xl border border-black/10 bg-white px-3 py-2 text-xs outline-none"
                />
              )}
            </div>
            <div className="grid gap-2.5 sm:grid-cols-3">
              <input
                type="text"
                required
                value={newMeaning}
                onChange={(e) => setNewMeaning(e.target.value)}
                placeholder="Nghĩa tiếng Việt..."
                className="rounded-xl border border-black/10 bg-white px-3 py-2 text-xs outline-none"
              />
              <input
                type="text"
                value={newExample}
                onChange={(e) => setNewExample(e.target.value)}
                placeholder="Câu ví dụ..."
                className="rounded-xl border border-black/10 bg-white px-3 py-2 text-xs outline-none"
              />
              <input
                type="text"
                value={newExampleVi}
                onChange={(e) => setNewExampleVi(e.target.value)}
                placeholder="Nghĩa câu ví dụ..."
                className="rounded-xl border border-black/10 bg-white px-3 py-2 text-xs outline-none"
              />
            </div>
            <div className="flex justify-end">
              <button type="submit" className="rounded-full bg-[#08090D] px-5 py-2 text-xs font-bold text-white">
                Lưu vào kho từ vựng
              </button>
            </div>
          </form>
        )}

        {/* Tip Banner */}
        <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-black/60">
          <span>
            💡 Nhấn vào bất kỳ thẻ từ nào để xem <strong>họ từ (Danh từ / Động từ / Tính từ / Trạng từ)</strong> và các từ cùng chủ đề.
          </span>
          <span className="font-bold text-[#08090D]">Đang hiển thị: {filteredVocab.length} từ</span>
        </div>

        {/* Word Cards List (Grouped by Topic OR Flat List) */}
        {filteredVocab.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-black/15 p-8 text-center text-sm text-black/55">
            Không tìm thấy từ vựng nào phù hợp bộ lọc hiện tại.
          </div>
        ) : (() => {
          const renderVocabCard = (item: VocabItem) => {
            const posCat = normalizePosCategory(item.partOfSpeech);
            const familyCount = getWordFamilyFor(
              item.word,
              item.partOfSpeech,
              item.reading,
              item.meaningVi
            ).length;
            return (
              <div
                key={item.id}
                role="button"
                tabIndex={0}
                onClick={() => setSelectedVocab(item)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setSelectedVocab(item);
                  }
                }}
                className="flex flex-col justify-between rounded-[20px] border border-black/10 bg-[#FBFBFA] p-4 space-y-2.5 text-left cursor-pointer transition hover:border-black/25 hover:bg-white hover:shadow-sm"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-jp text-lg font-extrabold text-[#08090D]">{item.word}</span>
                      <span className={`rounded-full px-2 py-0.5 text-[10px] font-extrabold ${POS_BADGE_STYLES[posCat]}`}>
                        {getPosLabelVi(item.partOfSpeech)}
                      </span>
                      <span className="text-xs font-medium text-black/55">{item.reading}</span>
                      {item.romaji && (
                        <span className="text-xs font-semibold text-[#5A3A8C]">({item.romaji})</span>
                      )}
                    </div>
                    <p className="mt-0.5 text-sm font-bold text-[#1A4F73]">{item.meaningVi}</p>
                  </div>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      speakText(item.word, item.language === 'jp' ? 'ja-JP' : 'en-US', speechRate);
                    }}
                    className="rounded-full bg-white border border-black/10 p-2 hover:bg-[#EEEEEB]"
                    title="Nghe phát âm"
                  >
                    <Volume2 className="h-4 w-4" />
                  </button>
                </div>

                <div className="rounded-xl bg-white px-3 py-2 text-xs border border-black/5">
                  <p className="font-jp font-medium text-[#08090D]">{item.example}</p>
                  <p className="text-black/55 mt-0.5">{item.exampleVi}</p>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
                  <div className="flex flex-wrap items-center gap-1.5">
                    <span className="rounded-full bg-[#EEEEEB] px-2.5 py-0.5 text-[11px] font-semibold text-black/70">
                      {item.topic}
                    </span>
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-[11px] font-bold ${
                        item.srsState === 'mastered'
                          ? 'bg-[#D2EED9] text-[#1B5C32]'
                          : item.srsState === 'reviewing'
                          ? 'bg-[#D7ECF9] text-[#1A4F73]'
                          : item.srsState === 'learning'
                          ? 'bg-[#F7DCE1] text-[#7D233B]'
                          : 'bg-[#F6E9B2] text-[#6B4F0A]'
                      }`}
                    >
                      {getSRSStateLabelVi(item.srsState)}
                    </span>
                    {familyCount > 1 && (
                      <span className="rounded-full bg-black/5 px-2 py-0.5 text-[10px] font-bold text-black/65">
                        +{familyCount} dạng từ loại
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
                    <button
                      type="button"
                      onClick={() => toggleVocabDifficult(item.id)}
                      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-bold transition ${
                        item.isDifficult
                          ? 'bg-[#F7DCE1] text-[#7D233B]'
                          : 'bg-white border border-black/10 text-black/60 hover:bg-[#F7DCE1]/40'
                      }`}
                    >
                      <AlertCircle className="h-3 w-3" />
                      {item.isDifficult ? 'Từ khó' : 'Đánh dấu khó'}
                    </button>
                    {item.srsState !== 'mastered' && (
                      <button
                        type="button"
                        onClick={() => markVocabMastered(item.id)}
                        className="inline-flex items-center gap-1 rounded-full bg-white border border-black/10 px-2.5 py-1 text-[11px] font-bold text-[#1B5C32] hover:bg-[#D2EED9]/60"
                      >
                        <CheckCircle2 className="h-3 w-3" />
                        Đã thuộc
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          };

          if (!groupByTopic) {
            const visibleItems = filteredVocab.slice(0, flatVisibleCount);
            const remaining = filteredVocab.length - visibleItems.length;
            return (
              <div className="space-y-4">
                <div className="grid gap-3 md:grid-cols-2">{visibleItems.map(renderVocabCard)}</div>
                {remaining > 0 && (
                  <div className="flex justify-center gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setFlatVisibleCount((c) => c + 40)}
                      className="rounded-full border border-black/15 bg-white px-5 py-2 text-xs font-bold text-[#08090D] hover:bg-[#F6F6F4]"
                    >
                      Hiển thị thêm 40 từ (còn {remaining} từ)
                    </button>
                    <button
                      type="button"
                      onClick={() => setFlatVisibleCount(filteredVocab.length)}
                      className="rounded-full bg-[#08090D] px-5 py-2 text-xs font-bold text-white hover:opacity-90"
                    >
                      Hiện tất cả ({filteredVocab.length})
                    </button>
                  </div>
                )}
              </div>
            );
          }

          const hasActiveFilter =
            Boolean(search.trim()) ||
            topicFilter !== 'all' ||
            posFilter !== 'all' ||
            stateFilter !== 'all' ||
            listFilter !== 'all';

          const isGroupOpen = (topicName: string, idx: number): boolean => {
            if (topicName in topicExpandOverride) return topicExpandOverride[topicName];
            if (allExpanded !== null) return allExpanded;
            if (hasActiveFilter || groupedByTopic.length <= 3) return true;
            return idx < 2;
          };

          return (
            <div className="space-y-4">
              {groupedByTopic.length > 3 && (
                <div className="flex flex-wrap items-center justify-between gap-2 rounded-2xl bg-[#F6F6F4] px-3.5 py-2 text-xs">
                  <span className="font-semibold text-black/65">
                    Có <strong>{groupedByTopic.length}</strong> chủ đề ({filteredVocab.length} từ) — Bấm tên chủ đề để mở/thu gọn nhanh.
                  </span>
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => {
                        setAllExpanded(true);
                        setTopicExpandOverride({});
                      }}
                      className="rounded-full bg-white border border-black/10 px-3 py-1 font-bold text-[#08090D] hover:bg-[#EEEEEB]"
                    >
                      Mở tất cả chủ đề
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setAllExpanded(false);
                        setTopicExpandOverride({});
                      }}
                      className="rounded-full bg-white border border-black/10 px-3 py-1 font-bold text-black/65 hover:bg-[#EEEEEB]"
                    >
                      Thu gọn hết
                    </button>
                  </div>
                </div>
              )}

              {groupedByTopic.map((group, idx) => {
                const nCount = group.items.filter((i) => normalizePosCategory(i.partOfSpeech) === 'noun').length;
                const vCount = group.items.filter((i) => normalizePosCategory(i.partOfSpeech) === 'verb').length;
                const aCount = group.items.filter((i) => normalizePosCategory(i.partOfSpeech) === 'adjective').length;
                const open = isGroupOpen(group.topic, idx);
                return (
                  <div key={group.topic} className="space-y-3">
                    <button
                      type="button"
                      onClick={() =>
                        setTopicExpandOverride((prev) => ({ ...prev, [group.topic]: !open }))
                      }
                      className="flex w-full flex-wrap items-center justify-between gap-2 rounded-2xl bg-[#F6F6F4] px-4 py-3 border border-black/5 text-left transition hover:bg-[#EEEEEB]"
                    >
                      <div className="flex items-center gap-2">
                        {open ? (
                          <ChevronDown className="h-4 w-4 text-[#08090D]" />
                        ) : (
                          <ChevronRight className="h-4 w-4 text-black/55" />
                        )}
                        <BookOpen className="h-4 w-4 text-[#08090D]" />
                        <h3 className="text-sm sm:text-base font-extrabold text-[#08090D]">{group.topic}</h3>
                        <span className="rounded-full bg-white px-2.5 py-0.5 text-[11px] font-bold text-black/70">
                          {group.items.length} từ
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-1.5 text-[11px] font-semibold text-black/60">
                        {nCount > 0 && <span className="rounded-full bg-[#D7ECF9]/80 px-2 py-0.5 text-[#1A4F73]">{nCount} Danh từ</span>}
                        {vCount > 0 && <span className="rounded-full bg-[#D2EED9]/80 px-2 py-0.5 text-[#1B5C32]">{vCount} Động từ</span>}
                        {aCount > 0 && <span className="rounded-full bg-[#E5D9F7]/80 px-2 py-0.5 text-[#4B2C7A]">{aCount} Tính từ</span>}
                      </div>
                    </button>
                    {open && (
                      <div className="grid gap-3 md:grid-cols-2">{group.items.map(renderVocabCard)}</div>
                    )}
                  </div>
                );
              })}
            </div>
          );
        })()}
      </div>

      {/* Word Detail & Word Family Modal */}
      {selectedVocab && (() => {
        const familyForms = getWordFamilyFor(
          selectedVocab.word,
          selectedVocab.partOfSpeech,
          selectedVocab.reading,
          selectedVocab.meaningVi
        );
        const relatedInTopic = langVocab.filter(
          (v) => v.topic === selectedVocab.topic && v.id !== selectedVocab.id
        );
        const mainPos = normalizePosCategory(selectedVocab.partOfSpeech);

        return (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 p-4 backdrop-blur-xs"
            onClick={() => setSelectedVocab(null)}
          >
            <div
              className="w-full max-w-2xl max-h-[88vh] overflow-y-auto rounded-[28px] border border-black/10 bg-white p-6 shadow-xl space-y-5"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-jp text-2xl sm:text-3xl font-extrabold text-[#08090D]">
                      {selectedVocab.word}
                    </span>
                    <span className={`rounded-full px-3 py-1 text-xs font-extrabold ${POS_BADGE_STYLES[mainPos]}`}>
                      {getPosLabelVi(selectedVocab.partOfSpeech)}
                    </span>
                    <span className="rounded-full bg-[#EEEEEB] px-2.5 py-0.5 text-xs font-bold text-black/65">
                      {selectedVocab.levelTag}
                    </span>
                  </div>
                  <p className="mt-1 text-xs sm:text-sm font-medium text-black/55">
                    {selectedVocab.reading}
                    {selectedVocab.romaji ? ` • ${selectedVocab.romaji}` : ''}
                  </p>
                  <p className="mt-1.5 text-base font-extrabold text-[#1A4F73]">{selectedVocab.meaningVi}</p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() =>
                      speakText(
                        selectedVocab.word,
                        selectedVocab.language === 'jp' ? 'ja-JP' : 'en-US',
                        speechRate
                      )
                    }
                    className="rounded-full bg-[#08090D] p-2.5 text-white hover:opacity-90"
                    title="Nghe phát âm"
                  >
                    <Volume2 className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedVocab(null)}
                    className="rounded-full bg-[#EEEEEB] p-2 text-black/70 hover:bg-[#E2E2DE]"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="rounded-2xl bg-[#F6F6F4] p-4 space-y-1 text-xs sm:text-sm">
                <div className="text-[11px] font-bold uppercase tracking-wider text-black/50">Ví dụ ngữ cảnh</div>
                <p className="font-jp font-bold text-[#08090D]">{selectedVocab.example}</p>
                <p className="text-black/65">{selectedVocab.exampleVi}</p>
              </div>

              {/* Word Family / Derived POS Forms */}
              <div className="space-y-2.5">
                <h3 className="text-sm font-extrabold text-[#08090D]">
                  Các từ loại của &ldquo;{selectedVocab.word}&rdquo; (Danh từ / Động từ / Tính từ / Trạng từ)
                </h3>
                {familyForms.length > 0 ? (
                  <div className="grid gap-2 sm:grid-cols-2">
                    {familyForms.map((form) => (
                      <div
                        key={`${form.pos}-${form.word}`}
                        className="flex items-start justify-between gap-2 rounded-2xl border border-black/10 bg-[#FBFBFA] p-3"
                      >
                        <div className="space-y-0.5">
                          <span
                            className={`inline-block rounded-full px-2 py-0.5 text-[10px] font-extrabold ${
                              POS_BADGE_STYLES[form.pos]
                            }`}
                          >
                            {form.posLabelVi}
                          </span>
                          <div className="font-jp text-sm font-extrabold text-[#08090D]">{form.word}</div>
                          {form.reading && <div className="text-[11px] text-black/50">{form.reading}</div>}
                          <div className="text-xs font-semibold text-[#1A4F73]">{form.meaningVi}</div>
                        </div>
                        <button
                          type="button"
                          onClick={() =>
                            speakText(
                              form.word.split('(')[0].split('/')[0].trim(),
                              selectedVocab.language === 'jp' ? 'ja-JP' : 'en-US',
                              speechRate
                            )
                          }
                          className="rounded-full bg-white border border-black/10 p-1.5 hover:bg-[#EEEEEB]"
                          title="Nghe dạng từ này"
                        >
                          <Volume2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="rounded-2xl border border-dashed border-black/15 p-3.5 text-xs text-black/65">
                    Từ loại chính: <strong>{getPosLabelVi(selectedVocab.partOfSpeech)}</strong> ({selectedVocab.partOfSpeech || '—'}). Đây là cụm từ/thành ngữ cố định hoặc mục từ độc lập.
                  </div>
                )}
              </div>

              {/* Related words in the same Topic */}
              {relatedInTopic.length > 0 && (
                <div className="space-y-2">
                  <h3 className="text-sm font-extrabold text-[#08090D]">
                    Từ liên quan cùng chủ đề &ldquo;{selectedVocab.topic}&rdquo; ({relatedInTopic.length})
                  </h3>
                  <div className="flex flex-wrap gap-1.5">
                    {relatedInTopic.map((rel) => {
                      const relPos = normalizePosCategory(rel.partOfSpeech);
                      return (
                        <button
                          key={rel.id}
                          type="button"
                          onClick={() => setSelectedVocab(rel)}
                          className="inline-flex items-center gap-1.5 rounded-full border border-black/10 bg-[#F6F6F4] px-3 py-1.5 text-xs font-bold text-[#08090D] hover:bg-[#D7ECF9]/60"
                        >
                          <span className={`h-2 w-2 rounded-full ${POS_BADGE_STYLES[relPos].split(' ')[0]}`} />
                          <span className="font-jp">{rel.word}</span>
                          <span className="text-[11px] font-medium text-black/55">— {rel.meaningVi}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        );
      })()}
    </div>
  );
};
