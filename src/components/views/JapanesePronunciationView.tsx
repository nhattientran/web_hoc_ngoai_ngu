import React, { useEffect, useMemo, useState } from 'react';
import {
  AlertTriangle,
  AudioLines,
  CheckCircle2,
  Ear,
  Mic,
  MicOff,
  RotateCcw,
  Sparkles,
  Volume2,
} from 'lucide-react';
import { useLearning } from '../../context/LearningContext';
import {
  JP_CONTRAST_DRILLS,
  JP_SOUND_CATEGORIES,
  JP_SOUND_ITEMS,
  JpSoundCategory,
  JpSoundItem,
} from '../../data/japanesePronunciationData';
import {
  isSpeechRecognitionSupported,
  speakText,
  startSpeechRecognition,
  stopSpeaking,
} from '../../utils/speech';

const MASTERED_JP_SOUNDS_KEY = 'manabi_mastered_jp_sounds_v1';

function getCategoryColors(item: JpSoundItem): {
  pill: string;
  tileBg: string;
} {
  if (item.category === 'vowel_tricky') {
    return {
      pill: 'bg-[#E5D9F7] text-[#4B2C7A]',
      tileBg: 'bg-[#E5D9F7]/45 border-[#4B2C7A]/15 hover:bg-[#E5D9F7]/80',
    };
  }
  if (item.category === 'dakuten') {
    return {
      pill: 'bg-[#D7ECF9] text-[#1A4F73]',
      tileBg: 'bg-[#D7ECF9]/45 border-[#1A4F73]/15 hover:bg-[#D7ECF9]/80',
    };
  }
  if (item.category === 'yoon') {
    return {
      pill: 'bg-[#D2EED9] text-[#1B5C32]',
      tileBg: 'bg-[#D2EED9]/45 border-[#1B5C32]/15 hover:bg-[#D2EED9]/80',
    };
  }
  return {
    pill: 'bg-[#F6E9B2] text-[#6B4F0A]',
    tileBg: 'bg-[#F6E9B2]/45 border-[#6B4F0A]/15 hover:bg-[#F6E9B2]/80',
  };
}

export const JapanesePronunciationView: React.FC = () => {
  const { recordPracticeResult } = useLearning();

  const [mode, setMode] = useState<'chart' | 'drills'>('chart');
  const [catFilter, setCatFilter] = useState<'all' | JpSoundCategory>('all');
  const [selected, setSelected] = useState<JpSoundItem>(JP_SOUND_ITEMS[0]);
  const [slowMode, setSlowMode] = useState(false);

  const [masteredIds, setMasteredIds] = useState<string[]>(() => {
    try {
      const raw = localStorage.getItem(MASTERED_JP_SOUNDS_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  // Mic practice
  const [micActive, setMicActive] = useState(false);
  const [micTranscript, setMicTranscript] = useState('');
  const [micError, setMicError] = useState('');
  const [stopMic, setStopMic] = useState<(() => void) | null>(null);
  const [practiceWord, setPracticeWord] = useState<string>(JP_SOUND_ITEMS[0].examples[0].word);

  // Contrast listening drills
  const [drillAnswers, setDrillAnswers] = useState<Record<string, string>>({});
  const [drillRewarded, setDrillRewarded] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(MASTERED_JP_SOUNDS_KEY, JSON.stringify(masteredIds));
    } catch {
      // Ignore storage error
    }
  }, [masteredIds]);

  useEffect(() => {
    setPracticeWord(selected.examples[0]?.word || '');
    setMicTranscript('');
    setMicError('');
  }, [selected]);

  useEffect(() => {
    return () => {
      stopSpeaking();
      if (stopMic) stopMic();
    };
  }, [stopMic]);

  const filteredSounds = useMemo(() => {
    if (catFilter === 'all') return JP_SOUND_ITEMS;
    return JP_SOUND_ITEMS.filter((item) => item.category === catFilter);
  }, [catFilter]);

  const rate = slowMode ? 0.65 : 0.95;

  const toggleMastered = (id: string) => {
    setMasteredIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleToggleMic = () => {
    if (micActive && stopMic) {
      stopMic();
      setMicActive(false);
      setStopMic(null);
      return;
    }
    setMicError('');
    setMicTranscript('');
    const stopper = startSpeechRecognition(
      'ja-JP',
      (text) => {
        setMicTranscript(text);
        setMicActive(false);
      },
      (err) => {
        setMicError(err);
        setMicActive(false);
      },
      () => setMicActive(false)
    );
    if (stopper) {
      setStopMic(() => stopper);
      setMicActive(true);
    }
  };

  const drillAnswered = JP_CONTRAST_DRILLS.filter((d) => drillAnswers[d.id]).length;
  const drillCorrect = JP_CONTRAST_DRILLS.filter((d) => drillAnswers[d.id] === d.targetWord).length;

  const handleSaveDrillResult = () => {
    if (drillAnswered === 0) return;
    recordPracticeResult({
      language: 'jp',
      skill: 'listening',
      correct: drillCorrect,
      total: drillAnswered,
      minutes: 5,
      xp: Math.max(15, drillCorrect * 10),
    });
    setDrillRewarded(true);
  };

  const masteredPct = Math.round((masteredIds.length / JP_SOUND_ITEMS.length) * 100);
  const selectedColors = getCategoryColors(selected);

  return (
    <div className="space-y-5">
      {/* Header Hero */}
      <section className="rounded-[26px] border border-black/10 bg-white p-5 sm:p-7 shadow-soft space-y-4">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="space-y-1.5">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#E5D9F7] px-3 py-1 text-xs font-extrabold text-[#4B2C7A]">
              <AudioLines className="h-3.5 w-3.5" /> Phòng Luyện Phát âm & Nhịp phách Tiếng Nhật (Mora)
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#08090D]">
              Phát âm chuẩn Kana, Biến âm (゛゜), Yōon & Trường âm / Âm ngắt
            </h1>
            <p className="max-w-2xl text-xs sm:text-sm text-black/65">
              Làm chủ các âm hay phát âm sai ở người Việt (つ・ふ・ら・う・ん), quy tắc nhịp phách{' '}
              <strong className="text-[#08090D]">trường âm</strong> và{' '}
              <strong className="text-[#08090D]">âm ngắt っ</strong> để nghe – nói tiếng Nhật rõ nét ngay từ N5.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <div className="rounded-2xl bg-[#D2EED9] px-4 py-2.5 text-xs font-extrabold text-[#1B5C32]">
              Đã nắm vững: {masteredIds.length}/{JP_SOUND_ITEMS.length} nhóm ({masteredPct}%)
            </div>
          </div>
        </div>

        {/* Mode & Category Filters */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-black/8 pt-4">
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => setMode('chart')}
              className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-extrabold transition ${
                mode === 'chart'
                  ? 'bg-[#08090D] text-white'
                  : 'bg-[#F6F6F4] text-black/70 hover:bg-[#EEEEEB]'
              }`}
            >
              <AudioLines className="h-3.5 w-3.5" /> Bảng Phát âm & Khẩu hình
            </button>
            <button
              type="button"
              onClick={() => setMode('drills')}
              className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-extrabold transition ${
                mode === 'drills'
                  ? 'bg-[#08090D] text-white'
                  : 'bg-[#F6F6F4] text-black/70 hover:bg-[#EEEEEB]'
              }`}
            >
              <Ear className="h-3.5 w-3.5" /> Luyện nghe phân biệt ({JP_CONTRAST_DRILLS.length} cặp)
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {mode === 'chart' &&
              JP_SOUND_CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setCatFilter(cat.id)}
                  className={`rounded-full px-3 py-1.5 text-xs font-bold transition ${
                    catFilter === cat.id
                      ? 'bg-[#E5D9F7] text-[#4B2C7A]'
                      : 'bg-[#F6F6F4] text-black/60 hover:bg-[#EEEEEB]'
                  }`}
                >
                  {cat.label}
                </button>
              ))}

            <button
              type="button"
              onClick={() => setSlowMode((v) => !v)}
              className={`rounded-full px-3.5 py-1.5 text-xs font-extrabold transition ${
                slowMode ? 'bg-[#F6E9B2] text-[#6B4F0A]' : 'bg-[#F6F6F4] text-black/65'
              }`}
            >
              {slowMode ? '🐢 Đọc chậm 0.65x' : '🔊 Tốc độ chuẩn'}
            </button>
          </div>
        </div>
      </section>

      {mode === 'chart' ? (
        <div className="grid gap-5 lg:grid-cols-[1.2fr_0.9fr] items-start">
          {/* Left Tile Grid */}
          <div className="rounded-[26px] border border-black/10 bg-white p-5 shadow-soft space-y-4">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {filteredSounds.map((item) => {
                const isSelected = item.id === selected.id;
                const isMastered = masteredIds.includes(item.id);
                const colors = getCategoryColors(item);
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      setSelected(item);
                      speakText(item.examples[0]?.word || item.symbol, 'ja-JP', rate);
                    }}
                    className={`relative rounded-[20px] border p-3.5 text-left transition ${
                      isSelected
                        ? 'border-[#08090D] bg-white ring-2 ring-[#08090D]/15 shadow-sm'
                        : colors.tileBg
                    }`}
                  >
                    <div className="flex items-start justify-between gap-1">
                      <span className={`rounded-full px-2 py-0.5 text-[10px] font-extrabold ${colors.pill}`}>
                        {item.categoryVi}
                      </span>
                      {isMastered && <CheckCircle2 className="h-4 w-4 text-[#1B5C32] shrink-0" />}
                    </div>
                    <div className="mt-2 font-jp text-xl sm:text-2xl font-extrabold text-[#08090D]">
                      {item.symbol}
                    </div>
                    <div className="mt-1 text-xs font-bold text-black/65">{item.romaji}</div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Inspector Card */}
          <aside className="rounded-[26px] border border-black/10 bg-white p-5 sm:p-6 shadow-soft space-y-4 lg:sticky lg:top-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <span className={`inline-flex rounded-full px-3 py-1 text-[11px] font-extrabold ${selectedColors.pill}`}>
                  {selected.categoryVi}
                </span>
                <h2 className="mt-2 font-jp text-3xl font-extrabold text-[#08090D]">
                  {selected.symbol}
                </h2>
                <p className="text-sm font-bold text-[#4B2C7A]">{selected.romaji}</p>
              </div>

              <button
                type="button"
                onClick={() => toggleMastered(selected.id)}
                className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-2 text-xs font-extrabold transition ${
                  masteredIds.includes(selected.id)
                    ? 'bg-[#D2EED9] text-[#1B5C32]'
                    : 'bg-[#F6F6F4] text-[#08090D] hover:bg-[#EEEEEB]'
                }`}
              >
                <CheckCircle2 className="h-4 w-4" />
                {masteredIds.includes(selected.id) ? 'Đã nắm vững' : 'Đánh dấu đã thuộc'}
              </button>
            </div>

            <div className="rounded-2xl bg-[#F6F6F4] p-4 space-y-2">
              <div className="text-xs font-extrabold text-[#08090D]">Cách đặt khẩu hình & phát âm:</div>
              <p className="text-xs sm:text-sm leading-relaxed text-black/75">{selected.mouthGuideVi}</p>
            </div>

            <div className="rounded-2xl bg-[#F6E9B2]/65 p-4 space-y-1">
              <div className="flex items-center gap-1.5 text-xs font-extrabold text-[#6B4F0A]">
                <AlertTriangle className="h-3.5 w-3.5" /> Mẹo cho người Việt
              </div>
              <p className="text-xs leading-relaxed text-[#6B4F0A]">{selected.vietnameseTip}</p>
            </div>

            {selected.contrastPair && (
              <div className="rounded-2xl border border-[#D2BEF2] bg-[#E5D9F7]/40 p-3.5 space-y-2">
                <div className="text-xs font-extrabold text-[#4B2C7A]">Cặp từ đối chiếu cực dễ nhầm:</div>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => speakText(selected.contrastPair!.wordA, 'ja-JP', rate)}
                    className="rounded-xl bg-white p-2.5 text-left border border-black/8 hover:bg-[#E5D9F7]/40"
                  >
                    <div className="font-jp text-sm font-extrabold text-[#08090D]">
                      {selected.contrastPair.wordA} 🔊
                    </div>
                    <div className="text-[11px] text-black/60">{selected.contrastPair.meaningA}</div>
                  </button>
                  <button
                    type="button"
                    onClick={() => speakText(selected.contrastPair!.wordB, 'ja-JP', rate)}
                    className="rounded-xl bg-white p-2.5 text-left border border-black/8 hover:bg-[#E5D9F7]/40"
                  >
                    <div className="font-jp text-sm font-extrabold text-[#08090D]">
                      {selected.contrastPair.wordB} 🔊
                    </div>
                    <div className="text-[11px] text-black/60">{selected.contrastPair.meaningB}</div>
                  </button>
                </div>
              </div>
            )}

            <div className="space-y-2">
              <div className="text-xs font-extrabold text-[#08090D]">Từ mẫu luyện đọc:</div>
              {selected.examples.map((ex) => (
                <div
                  key={ex.word}
                  className="flex items-center justify-between gap-2 rounded-2xl border border-black/10 p-3"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-jp text-base font-extrabold text-[#08090D]">{ex.word}</span>
                      <span className="text-xs text-[#4B2C7A] font-semibold">({ex.romaji})</span>
                    </div>
                    <div className="text-xs text-black/60">{ex.meaningVi}</div>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => {
                        setPracticeWord(ex.word);
                        speakText(ex.word, 'ja-JP', rate);
                      }}
                      className="rounded-full bg-[#E5D9F7] p-2 text-[#4B2C7A] hover:opacity-85"
                      aria-label={`Nghe ${ex.word}`}
                    >
                      <Volume2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {isSpeechRecognitionSupported() && (
              <div className="rounded-2xl border border-black/10 bg-[#F6F6F4] p-3.5 space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-extrabold text-[#08090D]">
                    Thử đọc từ: <span className="font-jp text-[#4B2C7A]">{practiceWord}</span>
                  </span>
                  <button
                    type="button"
                    onClick={handleToggleMic}
                    className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-extrabold transition ${
                      micActive ? 'bg-[#F7DCE1] text-[#7D233B]' : 'bg-[#08090D] text-white'
                    }`}
                  >
                    {micActive ? <MicOff className="h-3.5 w-3.5" /> : <Mic className="h-3.5 w-3.5" />}
                    {micActive ? 'Dừng thu' : 'Nói thử'}
                  </button>
                </div>
                {micTranscript && (
                  <p className="text-xs font-semibold text-[#1B5C32]">
                    Hệ thống nghe được: <strong className="font-jp">{micTranscript}</strong>
                  </p>
                )}
                {micError && <p className="text-xs text-[#7D233B]">{micError}</p>}
              </div>
            )}
          </aside>
        </div>
      ) : (
        /* Contrast Drills Tab */
        <section className="rounded-[26px] border border-black/10 bg-white p-5 sm:p-7 shadow-soft space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-extrabold text-[#08090D]">
                Bài tập Nghe phân biệt Trường âm & Âm ngắt ({drillCorrect}/{JP_CONTRAST_DRILLS.length} đúng)
              </h2>
              <p className="text-xs text-black/55">
                Bấm nút loa để nghe phát âm tiếng Nhật rồi chọn đúng từ bạn nghe được.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  setDrillAnswers({});
                  setDrillRewarded(false);
                }}
                className="inline-flex items-center gap-1 rounded-full bg-[#F6F6F4] px-3.5 py-2 text-xs font-bold"
              >
                <RotateCcw className="h-3.5 w-3.5" /> Làm lại
              </button>
              {!drillRewarded ? (
                <button
                  type="button"
                  disabled={drillAnswered === 0}
                  onClick={handleSaveDrillResult}
                  className="inline-flex items-center gap-1.5 rounded-full bg-[#08090D] px-4 py-2 text-xs font-extrabold text-white disabled:opacity-40"
                >
                  <Sparkles className="h-3.5 w-3.5" /> Lưu kết quả & Nhận XP
                </button>
              ) : (
                <span className="inline-flex items-center gap-1 rounded-full bg-[#D2EED9] px-3.5 py-2 text-xs font-extrabold text-[#1B5C32]">
                  <CheckCircle2 className="h-3.5 w-3.5" /> Đã cộng XP!
                </span>
              )}
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {JP_CONTRAST_DRILLS.map((drill, idx) => {
              const picked = drillAnswers[drill.id];
              const isCorrect = picked === drill.targetWord;
              return (
                <div
                  key={drill.id}
                  className="rounded-[22px] border border-black/10 bg-[#F6F6F4]/60 p-4 space-y-3"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="rounded-full bg-[#E5D9F7] px-2.5 py-0.5 text-[11px] font-extrabold text-[#4B2C7A]">
                      Câu {idx + 1} • {drill.focusLabel}
                    </span>
                    <button
                      type="button"
                      onClick={() => speakText(drill.targetWord, 'ja-JP', rate)}
                      className="inline-flex items-center gap-1.5 rounded-full bg-[#08090D] px-3.5 py-1.5 text-xs font-bold text-white hover:opacity-90"
                    >
                      <Volume2 className="h-3.5 w-3.5" /> Nghe mẫu
                    </button>
                  </div>

                  <div className="grid gap-2">
                    {drill.options.map((opt) => {
                      const active = picked === opt.word;
                      const rightChoice = opt.word === drill.targetWord;
                      return (
                        <button
                          key={opt.word}
                          type="button"
                          onClick={() =>
                            setDrillAnswers((prev) => ({ ...prev, [drill.id]: opt.word }))
                          }
                          className={`rounded-2xl border px-3.5 py-2.5 text-left font-jp text-sm font-bold transition ${
                            !picked
                              ? 'border-black/10 bg-white hover:bg-[#E5D9F7]/35'
                              : rightChoice
                              ? 'border-[#1B5C32] bg-[#D2EED9] text-[#1B5C32]'
                              : active
                              ? 'border-[#7D233B] bg-[#F7DCE1] text-[#7D233B]'
                              : 'border-black/10 bg-white/70 text-black/55'
                          }`}
                        >
                          {opt.label}
                        </button>
                      );
                    })}
                  </div>

                  {picked && (
                    <div
                      className={`rounded-xl px-3 py-2 text-xs font-medium ${
                        isCorrect ? 'bg-[#D2EED9]/70 text-[#1B5C32]' : 'bg-[#F7DCE1]/70 text-[#7D233B]'
                      }`}
                    >
                      <strong>{isCorrect ? 'Chính xác!' : 'Chưa đúng.'}</strong> {drill.explanationVi}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
};
