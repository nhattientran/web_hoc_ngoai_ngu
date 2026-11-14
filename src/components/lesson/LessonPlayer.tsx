import React, { useEffect, useMemo, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Award,
  BookOpen,
  CheckCircle2,
  ClipboardCheck,
  Eye,
  Headphones,
  MessageSquare,
  Mic,
  MicOff,
  PenLine,
  RotateCcw,
  Sparkles,
  Volume2,
} from 'lucide-react';
import { useLearning } from '../../context/LearningContext';
import { LessonCharTile, LessonData, SkillTag } from '../../types';
import { isSpeechRecognitionSupported, speakText, startSpeechRecognition } from '../../utils/speech';
import { InteractiveExerciseCard } from '../common/InteractiveExerciseCard';

interface Props {
  lesson: LessonData;
  onExit: () => void;
  onOpenVocabulary?: () => void;
  onNextLesson?: (nextLessonId: string) => void;
}

const STEP_ITEMS = [
  { id: 0, label: 'Làm quen', icon: Eye },
  { id: 1, label: 'Hiểu bài', icon: BookOpen },
  { id: 2, label: 'Luyện tập', icon: Headphones },
  { id: 3, label: 'Vận dụng', icon: MessageSquare },
  { id: 4, label: 'Đánh giá', icon: ClipboardCheck },
];

export const LessonPlayer: React.FC<Props> = ({
  lesson,
  onExit,
  onOpenVocabulary,
}) => {
  const { state, markLessonStep, setLessonProgressPct, completeLesson } = useLearning();
  const speechRate = state.settings.speechRate;
  const existingProgress = state.lessonProgress[lesson.id];

  const initialStep =
    existingProgress?.status === 'in_progress' && typeof existingProgress.lastStep === 'number'
      ? Math.max(0, Math.min(4, existingProgress.lastStep))
      : 0;

  const [step, setStep] = useState<number>(initialStep);
  const [selectedTile, setSelectedTile] = useState<LessonCharTile | null>(
    lesson.learnSections[0]?.charTiles?.[0] || null
  );
  const [exerciseResults, setExerciseResults] = useState<Record<string, boolean>>({});
  const [applyText, setApplyText] = useState<string>('');
  const [applySubmitted, setApplySubmitted] = useState<boolean>(false);
  const [checkedCriteria, setCheckedCriteria] = useState<Record<number, boolean>>({});
  const [showSample, setShowSample] = useState<boolean>(false);
  const [listeningMic, setListeningMic] = useState<boolean>(false);
  const [micNote, setMicNote] = useState<string>('');
  const [stopMicFn, setStopMicFn] = useState<(() => void) | null>(null);
  const [completionAward, setCompletionAward] = useState<{ xp: number; badges: string[] } | null>(null);

  useEffect(() => {
    markLessonStep(lesson.id, step);
  }, [lesson.id, step]);

  const loggedPct =
    existingProgress?.status === 'completed'
      ? 100
      : typeof existingProgress?.progressPct === 'number'
      ? existingProgress.progressPct
      : Math.min(95, Math.round(((existingProgress?.completedSteps?.length || 1) / 5) * 100));

  const allExercises = useMemo(
    () => [...lesson.understandExercises, ...lesson.practiceExercises],
    [lesson]
  );

  const goToStep = (nextStep: number) => {
    markLessonStep(lesson.id, step);
    setStep(nextStep);
  };

  const handleExerciseAnswer = (exId: string, isCorrect: boolean) => {
    setExerciseResults((prev) => ({ ...prev, [exId]: isCorrect }));
  };

  const handleToggleMic = () => {
    if (listeningMic) {
      stopMicFn?.();
      setListeningMic(false);
      return;
    }
    setMicNote('');
    setListeningMic(true);
    const stop = startSpeechRecognition(
      lesson.language === 'jp' ? 'ja-JP' : 'en-US',
      (transcript) => {
        setApplyText((prev) => (prev ? `${prev} ${transcript}` : transcript));
      },
      (err) => setMicNote(err),
      () => setListeningMic(false)
    );
    if (stop) setStopMicFn(() => stop);
  };

  const evaluateMetrics = useMemo(() => {
    const totalQ = allExercises.length;
    const correctQ = allExercises.filter((ex) => exerciseResults[ex.id] === true).length;
    const answeredQ = allExercises.filter((ex) => exerciseResults[ex.id] !== undefined).length;

    const applyLower = applyText.toLowerCase();
    const matchedKeywords = lesson.applyTask.keywordsToCheck.filter((kw) =>
      applyLower.includes(kw.toLowerCase())
    );
    const applyBonus =
      applySubmitted && applyText.trim().length >= 8
        ? Math.min(100, 60 + Math.round((matchedKeywords.length / Math.max(1, lesson.applyTask.keywordsToCheck.length)) * 40))
        : 0;

    const quizPct = totalQ > 0 ? Math.round((correctQ / totalQ) * 100) : 100;
    const overallScore = applySubmitted
      ? Math.round(quizPct * 0.75 + applyBonus * 0.25)
      : quizPct;

    const weakTags = Array.from(
      new Set(
        allExercises
          .filter((ex) => exerciseResults[ex.id] === false)
          .map((ex) => ex.weaknessTag)
      )
    );

    return {
      totalQ,
      correctQ,
      answeredQ,
      quizPct,
      applyBonus,
      overallScore,
      weakTags,
      matchedKeywords,
    };
  }, [allExercises, exerciseResults, applyText, applySubmitted, lesson.applyTask.keywordsToCheck]);

  const handleFinishLesson = () => {
    const skillResults: { skill: SkillTag; correct: boolean }[] = allExercises.map((ex) => ({
      skill: ex.skill,
      correct: exerciseResults[ex.id] === true,
    }));

    const res = completeLesson({
      lesson,
      scorePercent: evaluateMetrics.overallScore,
      skillResults,
      weakTags: evaluateMetrics.weakTags,
      minutesSpent: lesson.estimatedMinutes,
    });

    setCompletionAward({ xp: res.xpAwarded, badges: res.newlyUnlockedBadges });
    setStep(4);
  };

  const handleRestart = () => {
    setStep(0);
    setExerciseResults({});
    setApplyText('');
    setApplySubmitted(false);
    setCheckedCriteria({});
    setShowSample(false);
    setCompletionAward(null);
  };

  return (
    <div className="mx-auto max-w-4xl space-y-5">
      {/* Main white/warm container inspired by Screenshot 3 */}
      <div className="rounded-[26px] border border-black/10 bg-white p-5 sm:p-7 shadow-soft">
        {/* Top lesson header */}
        <div className="mb-5 flex flex-wrap items-start justify-between gap-3">
          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={onExit}
              className="inline-flex items-center gap-1.5 rounded-full bg-[#EEEEEB] px-3.5 py-2 text-xs font-semibold text-[#08090D] transition hover:bg-[#E2E2DE]"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Lộ trình
            </button>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-[#08090D]">
                  {lesson.title}
                </h1>
                {existingProgress?.status === 'completed' && (
                  <span className="rounded-full bg-[#D2EED9] px-2.5 py-0.5 text-xs font-bold text-[#1B5C32]">
                    Đã xong ({existingProgress.bestScore}%)
                  </span>
                )}
              </div>
              {lesson.subtitle && (
                <p className="font-jp text-sm text-black/55">{lesson.subtitle}</p>
              )}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-[#D7ECF9] px-3 py-1 text-xs font-extrabold text-[#1A4F73]">
              Đã log: {loggedPct}% • Bước {step + 1}/5
            </span>
            <span className="rounded-full bg-[#F6F6F4] border border-black/10 px-3 py-1 text-xs font-semibold text-black/65">
              +{lesson.xpReward} XP • ~{lesson.estimatedMinutes} phút
            </span>
          </div>
        </div>

        {/* Live Position & Percentage Progress Bar */}
        <div className="mb-5 rounded-2xl border border-black/10 bg-[#F6F6F4] px-4 py-3 space-y-2">
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
            <span className="font-bold text-[#08090D]">
              Vị trí hiện tại: Bước {step + 1}/5 ({STEP_ITEMS[step]?.label}) — Tự động lưu {loggedPct}%
            </span>
            <div className="flex flex-wrap items-center gap-1">
              <span className="text-[11px] font-semibold text-black/55 mr-1">Chỉnh nhanh %:</span>
              {[20, 40, 60, 80, 100].map((pct) => (
                <button
                  key={pct}
                  type="button"
                  onClick={() => setLessonProgressPct(lesson.id, pct, step)}
                  className={`rounded-full px-2.5 py-0.5 text-[11px] font-bold transition ${
                    loggedPct === pct
                      ? 'bg-[#08090D] text-white'
                      : 'bg-white border border-black/10 text-black/65 hover:bg-[#EEEEEB]'
                  }`}
                >
                  {pct}%
                </button>
              ))}
            </div>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-white">
            <div
              className="h-full rounded-full bg-[#1A4F73] transition-all duration-300"
              style={{ width: `${loggedPct}%` }}
            />
          </div>
        </div>

        {/* 5-step pill navigation matching Screenshot 3 */}
        <div className="mb-6 flex flex-wrap gap-2">
          {STEP_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = step === item.id;
            const isDone = existingProgress?.completedSteps?.includes(item.id) || step > item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => goToStep(item.id)}
                className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs sm:text-sm font-semibold transition ${
                  isActive
                    ? 'bg-[#08090D] text-white shadow-sm'
                    : isDone
                    ? 'bg-[#D2EED9]/75 text-[#1B5C32] hover:bg-[#D2EED9]'
                    : 'bg-[#EEEEEB] text-[#08090D]/75 hover:bg-[#E2E2DE]'
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
                {item.label}
              </button>
            );
          })}
        </div>

        {/* STEP 1: LEARN */}
        {step === 0 && (
          <div className="space-y-6">
            <div className="rounded-2xl bg-[#F6F6F4] p-4 sm:p-5 border border-black/5">
              <div className="mb-1 flex items-center gap-2">
                <Eye className="h-4 w-4 text-[#08090D]" />
                <h2 className="text-base font-bold text-[#08090D]">Làm quen & Lý thuyết trọng tâm</h2>
                <span className="rounded-full bg-[#D2EED9] px-2.5 py-0.5 text-[11px] font-bold text-[#1B5C32]">
                  Đọc & Nghe
                </span>
              </div>
              <p className="text-sm text-black/70">{lesson.objectiveVi}</p>
            </div>

            {lesson.learnSections.map((sec, idx) => (
              <div key={idx} className="space-y-4 rounded-[22px] border border-black/10 bg-[#FBFBFA] p-5">
                <h3 className="text-base font-bold text-[#08090D]">{sec.title}</h3>
                <p className="text-sm leading-relaxed text-black/80">{sec.explanationVi}</p>

                {sec.formula && (
                  <div className="rounded-2xl bg-[#D7ECF9]/60 border border-[#BBDDF2] px-4 py-3 text-xs sm:text-sm font-semibold text-[#1A4F73]">
                    📐 Cấu trúc: {sec.formula}
                  </div>
                )}

                {/* Interactive Character / Collocation Tiles (Screenshot 3 style) */}
                {sec.charTiles && sec.charTiles.length > 0 && (
                  <div className="space-y-3">
                    <p className="text-xs font-medium text-black/55">
                      Bấm vào từng thẻ để nghe phát âm và xem mẹo ghi nhớ:
                    </p>
                    <div className="flex flex-wrap gap-2.5">
                      {sec.charTiles.map((tile) => {
                        const isChosen = selectedTile?.char === tile.char;
                        return (
                          <button
                            key={tile.char}
                            type="button"
                            onClick={() => {
                              setSelectedTile(tile);
                              speakText(
                                tile.audioText,
                                lesson.language === 'jp' ? 'ja-JP' : 'en-US',
                                speechRate
                              );
                            }}
                            className={`min-w-[66px] rounded-2xl border px-3.5 py-3 text-center transition ${
                              isChosen
                                ? 'border-[#08090D] bg-[#E5D9F7] shadow-sm scale-[1.03]'
                                : 'border-black/15 bg-white hover:bg-[#F6F6F4]'
                            }`}
                          >
                            <div className="font-jp text-xl sm:text-2xl font-bold text-[#08090D]">
                              {tile.char}
                            </div>
                            <div className="mt-1 text-xs font-semibold text-black/60">{tile.reading}</div>
                          </button>
                        );
                      })}
                    </div>

                    {selectedTile && (
                      <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-black/10 bg-white p-4">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-jp text-2xl font-extrabold text-[#08090D]">
                              {selectedTile.char}
                            </span>
                            <span className="rounded-full bg-[#E5D9F7] px-2.5 py-0.5 text-xs font-bold text-[#4B2C7A]">
                              {selectedTile.reading}
                            </span>
                            <span className="text-xs text-black/50">{selectedTile.meaningOrNote}</span>
                          </div>
                          {selectedTile.mnemonic && (
                            <p className="mt-1 text-xs sm:text-sm text-black/75">
                              💡 Mẹo nhớ: {selectedTile.mnemonic}
                            </p>
                          )}
                        </div>
                        <button
                          type="button"
                          onClick={() =>
                            speakText(
                              selectedTile.audioText,
                              lesson.language === 'jp' ? 'ja-JP' : 'en-US',
                              speechRate
                            )
                          }
                          className="inline-flex items-center gap-1.5 rounded-full bg-[#08090D] px-3.5 py-2 text-xs font-semibold text-white hover:opacity-90"
                        >
                          <Volume2 className="h-3.5 w-3.5" />
                          Nghe lại
                        </button>
                      </div>
                    )}
                  </div>
                )}

                {/* Examples with Audio */}
                {sec.examples && sec.examples.length > 0 && (
                  <div className="space-y-2.5">
                    <p className="text-xs font-bold uppercase tracking-wider text-black/45">Ví dụ minh họa</p>
                    {sec.examples.map((ex, i) => (
                      <div
                        key={i}
                        className="flex flex-wrap items-start justify-between gap-3 rounded-2xl border border-black/10 bg-white p-4"
                      >
                        <div className="space-y-1 flex-1 min-w-[200px]">
                          <p className="font-jp text-sm sm:text-base font-bold text-[#08090D] leading-relaxed">
                            {ex.target}
                          </p>
                          {(ex.reading || ex.romaji) && (
                            <p className="text-xs font-medium text-[#5A3A8C]">
                              {ex.reading && <span>{ex.reading}</span>}
                              {ex.reading && ex.romaji && <span> • </span>}
                              {ex.romaji && <span>{ex.romaji}</span>}
                            </p>
                          )}
                          <p className="text-xs sm:text-sm text-black/70">{ex.meaningVi}</p>
                        </div>
                        <button
                          type="button"
                          onClick={() => speakText(ex.target, ex.audioLang, speechRate)}
                          className="inline-flex items-center gap-1.5 rounded-full bg-[#EEEEEB] px-3 py-1.5 text-xs font-semibold text-[#08090D] hover:bg-[#E2E2DE]"
                        >
                          <Volume2 className="h-3.5 w-3.5" />
                          Nghe
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {sec.highlightTip && (
                  <div className="rounded-2xl bg-[#F6E9B2]/65 px-4 py-3 text-xs sm:text-sm font-medium text-[#6B4F0A]">
                    ✨ Mẹo ghi nhớ: {sec.highlightTip}
                  </div>
                )}

                {sec.commonMistakes && sec.commonMistakes.length > 0 && (
                  <div className="rounded-2xl bg-[#F7DCE1]/60 px-4 py-3 text-xs sm:text-sm text-[#7D233B] space-y-1">
                    <p className="font-bold">⚠️ Lỗi thường gặp cần tránh:</p>
                    {sec.commonMistakes.map((m, i) => (
                      <p key={i}>• {m}</p>
                    ))}
                  </div>
                )}
              </div>
            ))}

            <div className="flex justify-start">
              <button
                type="button"
                onClick={() => goToStep(1)}
                className="inline-flex items-center gap-2 rounded-full bg-[#08090D] px-6 py-3 text-sm font-bold text-white transition hover:opacity-90"
              >
                Đã xem xong
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: UNDERSTAND */}
        {step === 1 && (
          <div className="space-y-5">
            <div className="rounded-2xl bg-[#D7ECF9]/50 p-4 border border-[#BBDDF2]">
              <h2 className="text-base font-bold text-[#1A4F73]">Bước 2: Kiểm tra độ hiểu bài</h2>
              <p className="text-xs sm:text-sm text-[#1A4F73]/80">
                Làm nhanh các câu hỏi nhận diện khái niệm và ghép nghĩa để chắc chắn bạn đã nắm quy tắc.
              </p>
            </div>

            {lesson.understandExercises.map((ex) => (
              <InteractiveExerciseCard
                key={ex.id}
                exercise={ex}
                speechRate={speechRate}
                onAnswered={handleExerciseAnswer}
              />
            ))}

            <div className="flex items-center justify-between pt-2">
              <button
                type="button"
                onClick={() => setStep(0)}
                className="inline-flex items-center gap-1.5 rounded-full bg-[#EEEEEB] px-5 py-2.5 text-sm font-semibold text-[#08090D] hover:bg-[#E2E2DE]"
              >
                <ArrowLeft className="h-4 w-4" />
                Bước trước
              </button>
              <button
                type="button"
                onClick={() => goToStep(2)}
                className="inline-flex items-center gap-2 rounded-full bg-[#08090D] px-6 py-2.5 text-sm font-bold text-white hover:opacity-90"
              >
                Sang Luyện tập
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: PRACTICE */}
        {step === 2 && (
          <div className="space-y-5">
            <div className="rounded-2xl bg-[#E5D9F7]/55 p-4 border border-[#D2BEF2]">
              <h2 className="text-base font-bold text-[#4B2C7A]">Bước 3: Luyện tập tổng hợp</h2>
              <p className="text-xs sm:text-sm text-[#4B2C7A]/80">
                Điền từ, sắp xếp câu, nghe hiểu hoặc dịch câu để biến kiến thức thành phản xạ.
              </p>
            </div>

            {lesson.practiceExercises.map((ex) => (
              <InteractiveExerciseCard
                key={ex.id}
                exercise={ex}
                speechRate={speechRate}
                onAnswered={handleExerciseAnswer}
              />
            ))}

            <div className="flex items-center justify-between pt-2">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="inline-flex items-center gap-1.5 rounded-full bg-[#EEEEEB] px-5 py-2.5 text-sm font-semibold text-[#08090D] hover:bg-[#E2E2DE]"
              >
                <ArrowLeft className="h-4 w-4" />
                Bước trước
              </button>
              <button
                type="button"
                onClick={() => goToStep(3)}
                className="inline-flex items-center gap-2 rounded-full bg-[#08090D] px-6 py-2.5 text-sm font-bold text-white hover:opacity-90"
              >
                Sang Vận dụng
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: APPLY */}
        {step === 3 && (
          <div className="space-y-5">
            <div className="rounded-2xl bg-[#F7DCE1]/55 p-5 border border-[#ECC0C9] space-y-2">
              <div className="flex items-center gap-2">
                <PenLine className="h-4 w-4 text-[#7D233B]" />
                <h2 className="text-base font-bold text-[#7D233B]">
                  Bước 4: Vận dụng thực tế — {lesson.applyTask.title}
                </h2>
              </div>
              <p className="text-sm text-[#08090D]/85 leading-relaxed">{lesson.applyTask.scenarioVi}</p>
              <p className="text-xs font-semibold text-[#7D233B]">🎯 Yêu cầu: {lesson.applyTask.promptTarget}</p>
            </div>

            {/* Useful expressions */}
            <div className="rounded-2xl border border-black/10 bg-[#FBFBFA] p-4 space-y-2">
              <p className="text-xs font-bold uppercase tracking-wider text-black/50">Mẫu câu gợi ý hữu ích</p>
              <div className="flex flex-wrap gap-2">
                {lesson.applyTask.usefulExpressions.map((u, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setApplyText((prev) => (prev ? `${prev} ${u.phrase}` : u.phrase))}
                    className="rounded-2xl border border-black/10 bg-white px-3 py-2 text-left text-xs hover:bg-[#F6E9B2]/45 transition"
                    title="Bấm để chèn nhanh mẫu câu"
                  >
                    <div className="font-bold text-[#08090D]">{u.phrase}</div>
                    <div className="text-black/55">{u.meaningVi}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Textarea + Optional Mic */}
            <div className="space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <label className="text-xs font-bold uppercase tracking-wider text-black/55">
                  Bài làm của bạn
                </label>
                {lesson.applyTask.mode === 'speaking' && isSpeechRecognitionSupported() && (
                  <button
                    type="button"
                    onClick={handleToggleMic}
                    className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-semibold transition ${
                      listeningMic
                        ? 'bg-[#DC5F80] text-white animate-pulse'
                        : 'bg-[#08090D] text-white hover:opacity-90'
                    }`}
                  >
                    {listeningMic ? <MicOff className="h-3.5 w-3.5" /> : <Mic className="h-3.5 w-3.5" />}
                    {listeningMic ? 'Đang nghe... Bấm dừng' : 'Nói qua Micro'}
                  </button>
                )}
              </div>

              {micNote && <p className="text-xs text-[#7D233B]">{micNote}</p>}

              <textarea
                rows={4}
                value={applyText}
                onChange={(e) => setApplyText(e.target.value)}
                placeholder="Nhập câu trả lời viết hoặc kịch bản nói của bạn tại đây..."
                className="w-full rounded-2xl border border-black/15 bg-[#F6F6F4] p-4 text-sm text-[#08090D] outline-none focus:border-[#08090D] focus:bg-white"
              />

              {/* Self-assessment checklist */}
              <div className="rounded-2xl border border-black/10 bg-white p-4 space-y-2">
                <p className="text-xs font-bold text-black/60">Tiêu chí tự kiểm tra:</p>
                {lesson.applyTask.checklistCriteria.map((c, i) => (
                  <label key={i} className="flex items-center gap-2.5 text-sm text-[#08090D] cursor-pointer">
                    <input
                      type="checkbox"
                      checked={Boolean(checkedCriteria[i])}
                      onChange={() =>
                        setCheckedCriteria((prev) => ({ ...prev, [i]: !prev[i] }))
                      }
                      className="h-4 w-4 rounded accent-[#08090D]"
                    />
                    <span>{c}</span>
                  </label>
                ))}
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => setApplySubmitted(true)}
                  disabled={applyText.trim().length < 4}
                  className="rounded-full bg-[#08090D] px-5 py-2.5 text-xs sm:text-sm font-bold text-white hover:opacity-90 disabled:opacity-40"
                >
                  Kiểm tra bài vận dụng
                </button>
                <button
                  type="button"
                  onClick={() => setShowSample((v) => !v)}
                  className="rounded-full border border-black/15 bg-white px-4 py-2.5 text-xs sm:text-sm font-semibold text-[#08090D] hover:bg-[#F6F6F4]"
                >
                  {showSample ? 'Ẩn bài mẫu' : 'Xem đáp án mẫu'}
                </button>
              </div>

              {applySubmitted && (
                <div className="rounded-2xl border border-[#B6E0C1] bg-[#D2EED9]/65 p-4 text-sm text-[#1B5C32] space-y-1">
                  <p className="font-bold">
                    ✓ Đã ghi nhận bài vận dụng! (Điểm từ khóa mục tiêu: {evaluateMetrics.applyBonus}%)
                  </p>
                  <p className="text-xs">
                    Từ khóa đạt được:{' '}
                    {evaluateMetrics.matchedKeywords.length > 0
                      ? evaluateMetrics.matchedKeywords.join(', ')
                      : 'Chưa khớp từ khóa gợi ý — hãy đối chiếu thêm với bài mẫu bên dưới nhé.'}
                  </p>
                </div>
              )}

              {showSample && (
                <div className="rounded-2xl border border-black/10 bg-[#F6F6F4] p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-black/55">Bài mẫu tham khảo</span>
                    <button
                      type="button"
                      onClick={() =>
                        speakText(
                          lesson.applyTask.sampleAnswer,
                          lesson.language === 'jp' ? 'ja-JP' : 'en-US',
                          speechRate
                        )
                      }
                      className="inline-flex items-center gap-1 rounded-full bg-white px-3 py-1 text-xs font-semibold shadow-sm"
                    >
                      <Volume2 className="h-3.5 w-3.5" />
                      Nghe mẫu
                    </button>
                  </div>
                  <p className="font-jp text-sm font-semibold text-[#08090D] whitespace-pre-line">
                    {lesson.applyTask.sampleAnswer}
                  </p>
                  <p className="text-xs text-black/65">{lesson.applyTask.sampleAnswerVi}</p>
                </div>
              )}
            </div>

            <div className="flex items-center justify-between pt-2">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="inline-flex items-center gap-1.5 rounded-full bg-[#EEEEEB] px-5 py-2.5 text-sm font-semibold text-[#08090D] hover:bg-[#E2E2DE]"
              >
                <ArrowLeft className="h-4 w-4" />
                Bước trước
              </button>
              <button
                type="button"
                onClick={handleFinishLesson}
                className="inline-flex items-center gap-2 rounded-full bg-[#08090D] px-6 py-2.5 text-sm font-bold text-white hover:opacity-90"
              >
                Chấm điểm & Đánh giá
                <Sparkles className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 5: EVALUATE */}
        {step === 4 && (
          <div className="space-y-6">
            <div className="rounded-[24px] bg-[#D2EED9]/70 border border-[#B6E0C1] p-6 text-center space-y-2">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-sm">
                <Award className="h-6 w-6 text-[#1B5C32]" />
              </div>
              <h2 className="text-xl font-extrabold text-[#08090D]">
                Kết quả bài học: {evaluateMetrics.overallScore}%
              </h2>
              <p className="text-sm text-black/75">
                Trả lời đúng {evaluateMetrics.correctQ}/{evaluateMetrics.totalQ} câu hỏi trắc nghiệm & thực hành
                {applySubmitted ? ` • Điểm vận dụng: ${evaluateMetrics.applyBonus}%` : ' • (Chưa nộp phần Vận dụng)'}
              </p>
              {completionAward && (
                <div className="inline-flex items-center gap-2 rounded-full bg-[#08090D] px-4 py-1.5 text-xs font-bold text-white">
                  +{completionAward.xp} XP đã được cộng vào hồ sơ!
                </div>
              )}
            </div>

            {/* Detailed Question Review */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold uppercase tracking-wider text-black/55">
                Phân tích chi tiết từng câu
              </h3>
              {allExercises.map((ex, i) => {
                const res = exerciseResults[ex.id];
                return (
                  <div
                    key={ex.id}
                    className={`rounded-2xl border p-4 text-sm ${
                      res === true
                        ? 'border-[#B6E0C1] bg-[#D2EED9]/35'
                        : 'border-[#ECC0C9] bg-[#F7DCE1]/35'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <p className="font-semibold text-[#08090D]">
                        Câu {i + 1}: {ex.prompt}
                      </p>
                      <span
                        className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-bold ${
                          res === true
                            ? 'bg-[#D2EED9] text-[#1B5C32]'
                            : 'bg-[#F7DCE1] text-[#7D233B]'
                        }`}
                      >
                        {res === true ? 'Đúng' : res === false ? 'Sai' : 'Chưa làm'}
                      </span>
                    </div>
                    <p className="mt-1.5 text-xs text-black/75">{ex.explanationVi}</p>
                  </div>
                );
              })}
            </div>

            {/* Weak Areas & Revision Recommendations */}
            <div className="rounded-2xl border border-black/10 bg-[#F6F6F4] p-5 space-y-2">
              <h3 className="text-sm font-bold text-[#08090D]">💡 Nhận xét & Gợi ý ôn tập cá nhân hóa</h3>
              {evaluateMetrics.weakTags.length === 0 && evaluateMetrics.overallScore >= 80 ? (
                <p className="text-sm text-[#1B5C32]">
                  Tuyệt vời! Bạn nắm rất chắc nội dung bài này và đã mở khóa chặng tiếp theo trên lộ trình.
                </p>
              ) : (
                <div className="space-y-1.5 text-sm text-black/75">
                  <p>
                    Bạn nên ôn kỹ lại các mảng sau:{' '}
                    <span className="font-semibold text-[#08090D]">
                      {evaluateMetrics.weakTags.length > 0
                        ? evaluateMetrics.weakTags.join(', ')
                        : 'Thực hành thêm phần Vận dụng'}
                    </span>
                    .
                  </p>
                  <p className="text-xs">
                    Gợi ý: Ôn lại thẻ từ vựng thuộc bài học này trong mục Từ vựng SRS hoặc thử làm lại các câu chưa đạt.
                  </p>
                </div>
              )}
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={handleRestart}
                  className="inline-flex items-center gap-1.5 rounded-full border border-black/15 bg-white px-4 py-2.5 text-xs font-semibold text-[#08090D] hover:bg-[#F6F6F4]"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                  Làm lại bài này
                </button>
                {onOpenVocabulary && (
                  <button
                    type="button"
                    onClick={onOpenVocabulary}
                    className="inline-flex items-center gap-1.5 rounded-full bg-[#F6E9B2] px-4 py-2.5 text-xs font-bold text-[#6B4F0A] hover:bg-[#F3E29B]"
                  >
                    Ôn từ vựng liên quan
                  </button>
                )}
              </div>
              <button
                type="button"
                onClick={onExit}
                className="inline-flex items-center gap-2 rounded-full bg-[#08090D] px-6 py-2.5 text-sm font-bold text-white hover:opacity-90"
              >
                Quay về Lộ trình
                <CheckCircle2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}

        {/* Footer like Screenshot 3 */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-2 border-t border-black/10 pt-4 text-xs text-black/50">
          <span>Tiến độ được lưu tự động trên trình duyệt của bạn.</span>
          <button
            type="button"
            onClick={handleRestart}
            className="underline hover:text-[#08090D]"
          >
            Học lại từ đầu
          </button>
        </div>
      </div>
    </div>
  );
};
