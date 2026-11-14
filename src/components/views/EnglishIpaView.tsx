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
  IPA_CATEGORIES,
  IPA_MINIMAL_DRILLS,
  IPA_SOUNDS,
  IpaCategory,
  IpaSoundItem,
} from '../../data/ipaData';
import {
  isSpeechRecognitionSupported,
  speakText,
  startSpeechRecognition,
  stopSpeaking,
} from '../../utils/speech';

const MASTERED_IPA_KEY = 'manabi_mastered_ipa_v1';

function getCategoryColors(item: IpaSoundItem): {
  pill: string;
  tileBg: string;
} {
  if (item.category === 'monophthong') {
    return {
      pill: 'bg-[#D7ECF9] text-[#1A4F73]',
      tileBg: 'bg-[#D7ECF9]/45 border-[#1A4F73]/15 hover:bg-[#D7ECF9]/80',
    };
  }
  if (item.category === 'diphthong') {
    return {
      pill: 'bg-[#E5D9F7] text-[#4B2C7A]',
      tileBg: 'bg-[#E5D9F7]/45 border-[#4B2C7A]/15 hover:bg-[#E5D9F7]/80',
    };
  }
  if (item.voicing === 'voiceless') {
    return {
      pill: 'bg-[#F6E9B2] text-[#6B4F0A]',
      tileBg: 'bg-[#F6E9B2]/45 border-[#6B4F0A]/15 hover:bg-[#F6E9B2]/80',
    };
  }
  return {
    pill: 'bg-[#D2EED9] text-[#1B5C32]',
    tileBg: 'bg-[#D2EED9]/45 border-[#1B5C32]/15 hover:bg-[#D2EED9]/80',
  };
}

export const EnglishIpaView: React.FC = () => {
  const { recordPracticeResult } = useLearning();

  const [mode, setMode] = useState<'chart' | 'drills'>('chart');
  const [catFilter, setCatFilter] = useState<'all' | IpaCategory>('all');
  const [selected, setSelected] = useState<IpaSoundItem>(IPA_SOUNDS[0]);
  const [slowMode, setSlowMode] = useState(false);

  const [masteredIds, setMasteredIds] = useState<string[]>(() => {
    try {
      const raw = localStorage.getItem(MASTERED_IPA_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  // Mic practice inside IPA chart
  const [micActive, setMicActive] = useState(false);
  const [micTranscript, setMicTranscript] = useState('');
  const [micError, setMicError] = useState('');
  const [stopMic, setStopMic] = useState<(() => void) | null>(null);
  const [practiceWord, setPracticeWord] = useState<string>(IPA_SOUNDS[0].examples[0].word);

  // Minimal-pair listening quiz state
  const [drillAnswers, setDrillAnswers] = useState<Record<string, string>>({});
  const [drillRewarded, setDrillRewarded] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(MASTERED_IPA_KEY, JSON.stringify(masteredIds));
    } catch {
      // Ignore storage quota errors
    }
  }, [masteredIds]);

  useEffect(() => {
    return () => {
      stopSpeaking();
      stopMic?.();
    };
  }, [stopMic]);

  const filteredSounds = useMemo(() => {
    if (catFilter === 'all') return IPA_SOUNDS;
    return IPA_SOUNDS.filter((s) => s.category === catFilter);
  }, [catFilter]);

  const audioRate = slowMode ? 0.72 : 0.92;

  const handleSelectSound = (item: IpaSoundItem) => {
    setSelected(item);
    setPracticeWord(item.examples[0].word);
    setMicTranscript('');
    setMicError('');
    speakText(item.examples[0].word, 'en-US', audioRate);
  };

  const toggleMastered = (id: string) => {
    setMasteredIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const handleToggleMic = () => {
    if (micActive) {
      stopMic?.();
      setMicActive(false);
      return;
    }
    setMicError('');
    setMicTranscript('');
    setMicActive(true);
    const cancel = startSpeechRecognition(
      'en-US',
      (text) => setMicTranscript(text),
      (err) => setMicError(err),
      () => setMicActive(false)
    );
    if (cancel) setStopMic(() => cancel);
  };

  const micMatchesTarget = useMemo(() => {
    const cleanSpoken = micTranscript.trim().toLowerCase().replace(/[^a-z\s]/g, '');
    const cleanTarget = practiceWord.trim().toLowerCase();
    return Boolean(cleanSpoken && cleanSpoken.split(/\s+/).includes(cleanTarget));
  }, [micTranscript, practiceWord]);

  const drillCorrectCount = useMemo(
    () =>
      IPA_MINIMAL_DRILLS.filter(
        (d) => drillAnswers[d.id] && drillAnswers[d.id] === d.targetWord
      ).length,
    [drillAnswers]
  );

  const drillAnsweredCount = Object.keys(drillAnswers).length;

  const handleCompleteDrills = () => {
    if (drillRewarded) return;
    recordPracticeResult({
      language: 'en',
      skill: 'listening',
      correct: Math.max(1, drillCorrectCount),
      total: IPA_MINIMAL_DRILLS.length,
      minutes: 5,
      xp: 20,
    });
    setDrillRewarded(true);
  };

  const handleResetDrills = () => {
    setDrillAnswers({});
    setDrillRewarded(false);
  };

  const selectedStyle = getCategoryColors(selected);
  const isSelectedMastered = masteredIds.includes(selected.id);

  return (
    <div className="space-y-5">
      {/* Header Card */}
      <div className="rounded-[24px] border border-black/8 bg-white p-6 shadow-card">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#E5D9F7] px-3 py-1 text-xs font-extrabold text-[#4B2C7A]">
                <AudioLines className="h-3.5 w-3.5" /> Phiên âm quốc tế IPA (44 âm chuẩn)
              </span>
              <span className="rounded-full bg-[#EEEEEB] px-3 py-1 text-xs font-bold text-[#08090D]">
                12 Nguyên âm đơn • 8 Nguyên âm đôi • 24 Phụ âm
              </span>
            </div>
            <h1 className="mt-2 text-2xl font-extrabold tracking-tight text-[#08090D]">
              Phòng luyện phát âm & Phiên âm IPA Tiếng Anh
            </h1>
            <p className="mt-1 text-sm text-black/65">
              Chạm từng ký hiệu IPA để nghe phát âm mẫu, xem hướng dẫn đặt lưỡi & khẩu hình, khắc phục lỗi người Việt hay mắc và luyện nghe cặp âm dễ nhầm.
            </p>
          </div>

          <div className="flex shrink-0 items-center gap-3 rounded-2xl bg-[#F6F6F4] px-4 py-3 border border-black/5">
            <div className="text-right">
              <div className="text-[11px] font-bold uppercase tracking-wider text-black/50">
                Đã thuộc IPA
              </div>
              <div className="text-lg font-extrabold text-[#08090D]">
                {masteredIds.length}/{IPA_SOUNDS.length} âm
              </div>
            </div>
            <div className="h-10 w-10 rounded-xl bg-[#D2EED9] text-[#1B5C32] flex items-center justify-center font-extrabold text-sm">
              {Math.round((masteredIds.length / IPA_SOUNDS.length) * 100)}%
            </div>
          </div>
        </div>

        {/* Mode Switch & Filters */}
        <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-black/8 pt-4">
          <div className="inline-flex rounded-full bg-[#F6F6F4] p-1 border border-black/5">
            <button
              type="button"
              onClick={() => setMode('chart')}
              className={`inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-extrabold transition ${
                mode === 'chart' ? 'bg-[#08090D] text-white' : 'text-black/65 hover:text-[#08090D]'
              }`}
            >
              <AudioLines className="h-3.5 w-3.5" /> Bảng IPA 44 âm
            </button>
            <button
              type="button"
              onClick={() => setMode('drills')}
              className={`inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-extrabold transition ${
                mode === 'drills' ? 'bg-[#08090D] text-white' : 'text-black/65 hover:text-[#08090D]'
              }`}
            >
              <Ear className="h-3.5 w-3.5" /> Luyện nghe Minimal Pairs ({IPA_MINIMAL_DRILLS.length})
            </button>
          </div>

          {mode === 'chart' && (
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => setSlowMode((v) => !v)}
                className={`rounded-full px-3 py-1.5 text-xs font-bold border transition ${
                  slowMode
                    ? 'border-[#1A4F73]/25 bg-[#D7ECF9] text-[#1A4F73]'
                    : 'border-black/10 bg-[#F6F6F4] text-black/70'
                }`}
              >
                Tốc độ đọc: {slowMode ? 'Chậm 0.72x' : 'Chuẩn 0.92x'}
              </button>
            </div>
          )}
        </div>
      </div>

      {mode === 'chart' ? (
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-12 items-start">
          {/* Left: 44-Sound Interactive Grid */}
          <div className="lg:col-span-7 rounded-[24px] border border-black/8 bg-white p-5 shadow-card space-y-4">
            <div className="flex flex-wrap gap-1.5">
              {IPA_CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setCatFilter(cat.id)}
                  className={`rounded-full px-3 py-1.5 text-xs font-bold transition ${
                    catFilter === cat.id
                      ? 'bg-[#08090D] text-white'
                      : 'bg-[#F6F6F4] text-black/65 hover:bg-[#EEEEEB]'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Color Legend */}
            <div className="flex flex-wrap gap-2 text-[11px] font-bold text-black/60">
              <span className="inline-flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-[#D7ECF9] border border-[#1A4F73]/30" />
                Nguyên âm đơn
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-[#E5D9F7] border border-[#4B2C7A]/30" />
                Nguyên âm đôi
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-[#F6E9B2] border border-[#6B4F0A]/30" />
                Phụ âm vô thanh (không rung cổ)
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-[#D2EED9] border border-[#1B5C32]/30" />
                Phụ âm hữu thanh (rung cổ)
              </span>
            </div>

            <div className="grid grid-cols-3 sm:grid-cols-4 gap-2.5">
              {filteredSounds.map((item) => {
                const isActive = selected.id === item.id;
                const isMastered = masteredIds.includes(item.id);
                const colors = getCategoryColors(item);

                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleSelectSound(item)}
                    className={`relative rounded-2xl border p-3 text-left transition ${
                      isActive
                        ? 'border-[#08090D] bg-[#08090D] text-white shadow-card scale-[1.01]'
                        : colors.tileBg
                    }`}
                  >
                    {isMastered && (
                      <CheckCircle2
                        className={`absolute right-2.5 top-2.5 h-3.5 w-3.5 ${
                          isActive ? 'text-[#D2EED9]' : 'text-[#1B5C32]'
                        }`}
                      />
                    )}
                    <div className="text-xl font-extrabold tracking-tight">/{item.symbol}/</div>
                    <div
                      className={`mt-1 text-xs font-bold truncate ${
                        isActive ? 'text-white/90' : 'text-[#08090D]'
                      }`}
                    >
                      {item.examples[0].word}
                    </div>
                    <div
                      className={`text-[10px] truncate ${
                        isActive ? 'text-white/65' : 'text-black/55'
                      }`}
                    >
                      {item.examples[0].ipa}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right: Detailed Phonetic Inspector */}
          <div className="lg:col-span-5 rounded-[24px] border border-black/8 bg-white p-6 shadow-card space-y-4 lg:sticky lg:top-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className={`rounded-full px-3 py-0.5 text-[11px] font-extrabold ${selectedStyle.pill}`}>
                    {selected.categoryLabelVi}
                  </span>
                  {selected.voicing !== 'vowel' && (
                    <span className="rounded-full bg-[#F6F6F4] px-2.5 py-0.5 text-[11px] font-bold text-black/65">
                      {selected.voicing === 'voiceless' ? 'Vô thanh' : 'Hữu thanh'}
                    </span>
                  )}
                </div>
                <div className="mt-2 flex items-baseline gap-3">
                  <span className="text-4xl font-extrabold text-[#08090D]">/{selected.symbol}/</span>
                  <span className="text-xs font-semibold text-black/60">{selected.mannerVi}</span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => toggleMastered(selected.id)}
                className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-2 text-xs font-extrabold transition shrink-0 ${
                  isSelectedMastered
                    ? 'bg-[#D2EED9] text-[#1B5C32]'
                    : 'bg-[#EEEEEB] text-[#08090D] hover:bg-[#D2EED9]/70'
                }`}
              >
                <CheckCircle2 className="h-3.5 w-3.5" />
                {isSelectedMastered ? 'Đã thuộc' : 'Đánh dấu thuộc'}
              </button>
            </div>

            <div className="rounded-2xl bg-[#F6F6F4] p-3.5 text-xs space-y-2">
              <div>
                <span className="font-extrabold text-[#08090D]">Gần âm tương đương: </span>
                <span className="text-black/75">{selected.approxVi}</span>
              </div>
              <div>
                <span className="font-extrabold text-[#1A4F73]">Khẩu hình & Đặt lưỡi: </span>
                <span className="text-black/75 leading-relaxed">{selected.mouthShapeVi}</span>
              </div>
            </div>

            <div className="rounded-2xl border border-amber-500/20 bg-[#F6E9B2]/45 p-3.5 text-xs">
              <div className="flex items-center gap-1.5 font-extrabold text-[#6B4F0A]">
                <AlertTriangle className="h-3.5 w-3.5 shrink-0" />
                Lỗi người Việt hay mắc
              </div>
              <p className="mt-1 text-black/75 leading-relaxed">{selected.commonMistakeVi}</p>
            </div>

            {/* 3 B1->B2 Example Words */}
            <div className="space-y-2">
              <p className="text-xs font-extrabold uppercase tracking-wider text-black/50">
                Từ vựng B1 → B2 chứa âm /{selected.symbol}/
              </p>
              <div className="space-y-1.5">
                {selected.examples.map((ex) => (
                  <div
                    key={ex.word}
                    className="flex items-center justify-between rounded-xl border border-black/8 px-3.5 py-2"
                  >
                    <div>
                      <span className="text-sm font-extrabold text-[#08090D]">{ex.word}</span>
                      <span className="ml-2 text-xs font-semibold text-[#4B2C7A]">{ex.ipa}</span>
                      <p className="text-xs text-black/60">{ex.meaningVi}</p>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => setPracticeWord(ex.word)}
                        className={`rounded-full px-2.5 py-1 text-[10px] font-bold ${
                          practiceWord === ex.word
                            ? 'bg-[#08090D] text-white'
                            : 'bg-[#F6F6F4] text-black/60 hover:bg-[#EEEEEB]'
                        }`}
                      >
                        Chọn nói
                      </button>
                      <button
                        type="button"
                        onClick={() => speakText(ex.word, 'en-US', audioRate)}
                        className="rounded-full bg-[#D7ECF9] p-2 text-[#1A4F73] hover:opacity-85"
                        title={`Nghe ${ex.word}`}
                      >
                        <Volume2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Minimal Pair Comparison */}
            <div className="rounded-2xl border border-black/8 bg-[#FAFAF8] p-3.5 space-y-2">
              <p className="text-[11px] font-extrabold uppercase tracking-wider text-black/50">
                Nghe so sánh cặp âm dễ nhầm
              </p>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => speakText(selected.minimalPair.wordA, 'en-US', audioRate)}
                  className="rounded-xl bg-white border border-black/10 p-2.5 text-left hover:bg-[#D7ECF9]/45 transition"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-extrabold text-[#08090D]">
                      {selected.minimalPair.wordA}
                    </span>
                    <Volume2 className="h-3.5 w-3.5 text-[#1A4F73]" />
                  </div>
                  <div className="text-[11px] font-bold text-[#4B2C7A]">{selected.minimalPair.ipaA}</div>
                  <div className="text-[11px] text-black/55">{selected.minimalPair.meaningA}</div>
                </button>

                <button
                  type="button"
                  onClick={() => speakText(selected.minimalPair.wordB, 'en-US', audioRate)}
                  className="rounded-xl bg-white border border-black/10 p-2.5 text-left hover:bg-[#F6E9B2]/45 transition"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-extrabold text-[#08090D]">
                      {selected.minimalPair.wordB}
                    </span>
                    <Volume2 className="h-3.5 w-3.5 text-[#6B4F0A]" />
                  </div>
                  <div className="text-[11px] font-bold text-[#4B2C7A]">{selected.minimalPair.ipaB}</div>
                  <div className="text-[11px] text-black/55">{selected.minimalPair.meaningB}</div>
                </button>
              </div>
            </div>

            {/* Sentence Shadowing + Optional Mic */}
            <div className="rounded-2xl bg-[#08090D] p-4 text-white space-y-2.5">
              <div className="flex items-center justify-between gap-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-white/60">
                  Câu luyện ngữ điệu
                </span>
                <button
                  type="button"
                  onClick={() => speakText(selected.sampleSentence, 'en-US', audioRate)}
                  className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1 text-[11px] font-extrabold text-[#08090D] hover:bg-[#D7ECF9]"
                >
                  <Volume2 className="h-3 w-3" /> Nghe câu
                </button>
              </div>
              <p className="text-xs leading-relaxed text-white/90">{selected.sampleSentence}</p>

              {isSpeechRecognitionSupported() && (
                <div className="border-t border-white/15 pt-2.5 flex flex-wrap items-center justify-between gap-2">
                  <div className="text-[11px] text-white/75">
                    Thử đọc từ: <strong className="text-white">{practiceWord}</strong>
                  </div>
                  <button
                    type="button"
                    onClick={handleToggleMic}
                    className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-bold ${
                      micActive ? 'bg-[#F7DCE1] text-[#7D233B]' : 'bg-white/15 text-white hover:bg-white/25'
                    }`}
                  >
                    {micActive ? <MicOff className="h-3 w-3" /> : <Mic className="h-3 w-3" />}
                    {micActive ? 'Đang nghe... Dừng' : 'Thu âm kiểm tra'}
                  </button>
                </div>
              )}

              {micTranscript && (
                <div
                  className={`rounded-xl px-3 py-2 text-xs font-semibold ${
                    micMatchesTarget
                      ? 'bg-[#D2EED9] text-[#1B5C32]'
                      : 'bg-white/10 text-white/90'
                  }`}
                >
                  Nhận diện: &ldquo;{micTranscript}&rdquo;{' '}
                  {micMatchesTarget ? '— Chuẩn xác!' : '— Hãy nghe lại mẫu và thử nhấn mạnh âm này.'}
                </div>
              )}
              {micError && <p className="text-[11px] text-amber-300">{micError}</p>}
            </div>
          </div>
        </div>
      ) : (
        /* MINIMAL PAIRS LISTENING DRILLS */
        <div className="rounded-[24px] border border-black/8 bg-white p-6 shadow-card space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-extrabold text-[#08090D]">
                Luyện nghe phân biệt cặp âm dễ nhầm (Minimal Pairs)
              </h2>
              <p className="text-xs text-black/60 mt-0.5">
                Bấm nút loa để nghe từ mục tiêu, sau đó chọn đúng từ và phiên âm IPA bạn vừa nghe được.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-[#EEEEEB] px-3 py-1 text-xs font-extrabold text-[#08090D]">
                Đúng {drillCorrectCount}/{IPA_MINIMAL_DRILLS.length}
              </span>
              <button
                type="button"
                onClick={handleResetDrills}
                className="inline-flex items-center gap-1 rounded-full border border-black/10 bg-[#F6F6F4] px-3 py-1.5 text-xs font-bold text-black/70 hover:bg-[#EEEEEB]"
              >
                <RotateCcw className="h-3.5 w-3.5" /> Làm lại
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {IPA_MINIMAL_DRILLS.map((drill, idx) => {
              const picked = drillAnswers[drill.id];
              const isCorrect = picked === drill.targetWord;

              return (
                <div
                  key={drill.id}
                  className="rounded-2xl border border-black/8 bg-[#FAFAF8] p-4 space-y-3"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="rounded-full bg-[#E5D9F7] px-2.5 py-0.5 text-[11px] font-extrabold text-[#4B2C7A]">
                      Câu {idx + 1} • Cặp {drill.pairLabel}
                    </span>
                    <button
                      type="button"
                      onClick={() => speakText(drill.targetWord, 'en-US', 0.88)}
                      className="inline-flex items-center gap-1.5 rounded-full bg-[#08090D] px-3.5 py-1.5 text-xs font-extrabold text-white hover:opacity-90"
                    >
                      <Volume2 className="h-3.5 w-3.5" /> Nghe từ mẫu
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    {drill.options.map((opt) => {
                      const isPicked = picked === opt.word;
                      const isTarget = opt.word === drill.targetWord;
                      let btnStyle = 'border-black/10 bg-white hover:bg-[#D7ECF9]/40';
                      if (picked) {
                        if (isTarget) {
                          btnStyle = 'border-[#1B5C32] bg-[#D2EED9] text-[#1B5C32]';
                        } else if (isPicked) {
                          btnStyle = 'border-[#7D233B] bg-[#F7DCE1] text-[#7D233B]';
                        } else {
                          btnStyle = 'border-black/5 bg-white/60 opacity-60';
                        }
                      }

                      return (
                        <button
                          key={opt.word}
                          type="button"
                          disabled={Boolean(picked)}
                          onClick={() =>
                            setDrillAnswers((prev) => ({ ...prev, [drill.id]: opt.word }))
                          }
                          className={`rounded-xl border p-3 text-left transition ${btnStyle}`}
                        >
                          <div className="text-sm font-extrabold">{opt.word}</div>
                          <div className="text-xs font-bold opacity-80">{opt.ipa}</div>
                          <div className="text-[11px] opacity-70">{opt.meaningVi}</div>
                        </button>
                      );
                    })}
                  </div>

                  {picked && (
                    <div
                      className={`rounded-xl px-3 py-2 text-xs ${
                        isCorrect
                          ? 'bg-[#D2EED9]/60 text-[#1B5C32]'
                          : 'bg-[#F7DCE1]/60 text-[#7D233B]'
                      }`}
                    >
                      <span className="font-extrabold">
                        {isCorrect ? 'Chính xác! ' : `Chưa đúng (đáp án: ${drill.targetWord} ${drill.targetIpa}). `}
                      </span>
                      <span className="text-black/80">{drill.explanationVi}</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-[#F6F6F4] p-4 border border-black/5">
            <div className="text-xs text-black/70">
              Đã hoàn thành {drillAnsweredCount}/{IPA_MINIMAL_DRILLS.length} cặp âm đối chiếu.
            </div>
            <button
              type="button"
              disabled={drillRewarded || drillAnsweredCount < IPA_MINIMAL_DRILLS.length}
              onClick={handleCompleteDrills}
              className={`inline-flex items-center gap-1.5 rounded-full px-5 py-2.5 text-xs font-extrabold transition ${
                drillRewarded
                  ? 'bg-[#D2EED9] text-[#1B5C32]'
                  : drillAnsweredCount < IPA_MINIMAL_DRILLS.length
                    ? 'bg-black/10 text-black/40 cursor-not-allowed'
                    : 'bg-[#08090D] text-white hover:opacity-90'
              }`}
            >
              <Sparkles className="h-4 w-4" />
              {drillRewarded ? 'Đã cộng +20 XP Nghe phân biệt IPA!' : 'Nhận +20 XP hoàn thành bài luyện'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
