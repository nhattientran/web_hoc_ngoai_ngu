import React, { useMemo, useState } from 'react';
import { CheckCircle2, HelpCircle, RotateCcw, XCircle } from 'lucide-react';
import { ExerciseItem } from '../../types';
import { AudioPlayerBar } from './AudioPlayerBar';

interface Props {
  exercise: ExerciseItem;
  speechRate?: number;
  onAnswered?: (exerciseId: string, isCorrect: boolean) => void;
  existingResult?: { isCorrect: boolean; userAnswerSummary: string };
}

function normalizeAnswer(str: string): string {
  return str
    .trim()
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .replace(/[.!?。、]+$/g, '');
}

export const InteractiveExerciseCard: React.FC<Props> = ({
  exercise,
  speechRate = 0.95,
  onAnswered,
  existingResult,
}) => {
  const [selectedOption, setSelectedOption] = useState<string>('');
  const [textInput, setTextInput] = useState<string>('');
  const [orderedTokens, setOrderedTokens] = useState<string[]>([]);
  const [selectedLeft, setSelectedLeft] = useState<string | null>(null);
  const [matchedPairs, setMatchedPairs] = useState<Record<string, string>>({});
  const [showHint, setShowHint] = useState(false);
  const [submitted, setSubmitted] = useState<{ isCorrect: boolean; summary: string } | null>(
    existingResult ? { isCorrect: existingResult.isCorrect, summary: existingResult.userAnswerSummary } : null
  );

  // Shuffled right items for match exercises
  const shuffledRight = useMemo(() => {
    if (!exercise.pairs) return [];
    const arr = exercise.pairs.map((p) => p.right);
    // Deterministic stable shuffle based on id length
    return [...arr].sort((a, b) => a.localeCompare(b));
  }, [exercise.pairs]);

  const availableTokens = useMemo(() => {
    if (!exercise.tokens) return [];
    const remaining = [...exercise.tokens];
    for (const used of orderedTokens) {
      const idx = remaining.indexOf(used);
      if (idx >= 0) remaining.splice(idx, 1);
    }
    return remaining;
  }, [exercise.tokens, orderedTokens]);

  const handleCheck = () => {
    let isCorrect = false;
    let summary = '';

    if (exercise.type === 'mcq' || exercise.type === 'true_false' || exercise.type === 'listening') {
      if (!selectedOption) return;
      isCorrect = selectedOption === exercise.correctAnswer;
      summary = selectedOption;
    } else if (exercise.type === 'fill_blank' || exercise.type === 'translation') {
      if (!textInput.trim()) return;
      const norm = normalizeAnswer(textInput);
      isCorrect = (exercise.acceptedAnswers || []).some((ans) => normalizeAnswer(ans) === norm);
      summary = textInput.trim();
    } else if (exercise.type === 'sentence_order' || exercise.type === 'drag_drop') {
      if (orderedTokens.length === 0) return;
      const joinedUser = orderedTokens.join(' ');
      const joinedCorrect = (exercise.correctOrder || []).join(' ');
      isCorrect = joinedUser === joinedCorrect;
      summary = joinedUser;
    } else if (exercise.type === 'match') {
      if (!exercise.pairs || Object.keys(matchedPairs).length < exercise.pairs.length) return;
      isCorrect = exercise.pairs.every((p) => matchedPairs[p.left] === p.right);
      summary = Object.entries(matchedPairs)
        .map(([l, r]) => `${l} → ${r}`)
        .join(', ');
    }

    setSubmitted({ isCorrect, summary });
    onAnswered?.(exercise.id, isCorrect);
  };

  const handleReset = () => {
    setSelectedOption('');
    setTextInput('');
    setOrderedTokens([]);
    setSelectedLeft(null);
    setMatchedPairs({});
    setSubmitted(null);
  };

  const handleMatchRightClick = (rightVal: string) => {
    if (submitted || !selectedLeft) return;
    setMatchedPairs((prev) => ({ ...prev, [selectedLeft]: rightVal }));
    setSelectedLeft(null);
  };

  const typeLabelMap: Record<ExerciseItem['type'], string> = {
    mcq: 'Trắc nghiệm',
    fill_blank: 'Điền vào chỗ trống',
    sentence_order: 'Sắp xếp câu',
    drag_drop: 'Kéo thả thẻ từ',
    match: 'Ghép cặp từ',
    true_false: 'Đúng / Sai',
    listening: 'Nghe hiểu',
    translation: 'Dịch câu',
  };

  return (
    <div className="rounded-[20px] border border-black/10 bg-white p-5 shadow-card transition-all">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <span className="inline-flex items-center rounded-full bg-[#EEEEEB] px-3 py-1 text-xs font-semibold text-[#08090D]">
          {typeLabelMap[exercise.type]}
        </span>
        <div className="flex items-center gap-2">
          {exercise.hint && !submitted && (
            <button
              type="button"
              onClick={() => setShowHint((v) => !v)}
              className="inline-flex items-center gap-1 rounded-full border border-black/10 px-2.5 py-1 text-xs font-medium text-black/70 hover:bg-black/5"
            >
              <HelpCircle className="h-3.5 w-3.5" />
              Gợi ý
            </button>
          )}
          {submitted && (
            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center gap-1 rounded-full border border-black/10 px-2.5 py-1 text-xs font-medium text-black/70 hover:bg-black/5"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              Làm lại
            </button>
          )}
        </div>
      </div>

      <p className="mb-3 text-[15px] font-semibold leading-relaxed text-[#08090D]">{exercise.prompt}</p>

      {exercise.audioText && (
        <div className="mb-4">
          <AudioPlayerBar
            text={exercise.audioText}
            lang={exercise.audioLang || 'en-US'}
            defaultRate={speechRate}
            allowTranscriptToggle={true}
          />
        </div>
      )}

      {showHint && exercise.hint && (
        <div className="mb-3 rounded-xl bg-[#F6E9B2]/60 px-3.5 py-2 text-xs font-medium text-[#6B4F0A]">
          💡 Gợi ý: {exercise.hint}
        </div>
      )}

      {/* MCQ / True-False / Listening */}
      {(exercise.type === 'mcq' || exercise.type === 'true_false' || exercise.type === 'listening') && (
        <div className="grid gap-2.5">
          {(exercise.options || []).map((opt) => {
            const isSelected = selectedOption === opt;
            const isCorrectOpt = submitted && opt === exercise.correctAnswer;
            const isWrongSelected = submitted && isSelected && opt !== exercise.correctAnswer;
            return (
              <button
                key={opt}
                type="button"
                disabled={Boolean(submitted)}
                onClick={() => setSelectedOption(opt)}
                className={`flex items-center justify-between rounded-2xl border px-4 py-3 text-left text-sm font-medium transition ${
                  isCorrectOpt
                    ? 'border-[#3BA962] bg-[#D2EED9] text-[#1B5C32]'
                    : isWrongSelected
                    ? 'border-[#DC5F80] bg-[#F7DCE1] text-[#7D233B]'
                    : isSelected
                    ? 'border-[#08090D] bg-[#08090D] text-white'
                    : 'border-black/10 bg-[#F6F6F4] text-[#08090D] hover:bg-[#EEEEEB]'
                }`}
              >
                <span>{opt}</span>
                {isCorrectOpt && <CheckCircle2 className="h-4 w-4 shrink-0" />}
                {isWrongSelected && <XCircle className="h-4 w-4 shrink-0" />}
              </button>
            );
          })}
        </div>
      )}

      {/* Fill blank / Translation */}
      {(exercise.type === 'fill_blank' || exercise.type === 'translation') && (
        <div className="space-y-2">
          <input
            type="text"
            value={textInput}
            disabled={Boolean(submitted)}
            onChange={(e) => setTextInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !submitted) handleCheck();
            }}
            placeholder="Nhập câu trả lời của bạn..."
            className="w-full rounded-2xl border border-black/15 bg-[#F6F6F4] px-4 py-3 text-sm font-medium text-[#08090D] outline-none focus:border-[#08090D] focus:bg-white"
          />
          {submitted && !submitted.isCorrect && exercise.acceptedAnswers?.[0] && (
            <p className="text-xs font-semibold text-[#1B5C32]">
              Đáp án chuẩn: <span className="underline">{exercise.acceptedAnswers[0]}</span>
            </p>
          )}
        </div>
      )}

      {/* Sentence Order / Drag Drop */}
      {(exercise.type === 'sentence_order' || exercise.type === 'drag_drop') && (
        <div className="space-y-3">
          <div className="min-h-[54px] rounded-2xl border-2 border-dashed border-black/15 bg-[#F6F6F4] p-3 flex flex-wrap gap-2">
            {orderedTokens.length === 0 ? (
              <span className="text-xs text-black/45 self-center">Bấm vào các thẻ từ bên dưới theo đúng thứ tự...</span>
            ) : (
              orderedTokens.map((tok, i) => (
                <button
                  key={`${tok}-${i}`}
                  type="button"
                  disabled={Boolean(submitted)}
                  onClick={() => setOrderedTokens((prev) => prev.filter((_, idx) => idx !== i))}
                  className="rounded-full bg-[#08090D] px-3.5 py-1.5 text-sm font-semibold text-white transition hover:opacity-85"
                >
                  {tok}
                </button>
              ))
            )}
          </div>
          <div className="flex flex-wrap gap-2">
            {availableTokens.map((tok, i) => (
              <button
                key={`${tok}-avail-${i}`}
                type="button"
                disabled={Boolean(submitted)}
                onClick={() => setOrderedTokens((prev) => [...prev, tok])}
                className="rounded-full border border-black/15 bg-white px-3.5 py-1.5 text-sm font-semibold text-[#08090D] shadow-sm transition hover:bg-[#E5D9F7]"
              >
                {tok}
              </button>
            ))}
          </div>
          {submitted && !submitted.isCorrect && exercise.correctOrder && (
            <p className="text-xs font-semibold text-[#1B5C32]">
              Thứ tự đúng: {exercise.correctOrder.join(' ')}
            </p>
          )}
        </div>
      )}

      {/* Word Matching */}
      {exercise.type === 'match' && exercise.pairs && (
        <div className="grid gap-3 md:grid-cols-2">
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-wide text-black/50">1. Chọn vế trái</p>
            {exercise.pairs.map((p) => {
              const matched = matchedPairs[p.left];
              const isActive = selectedLeft === p.left;
              const isPairRight = submitted ? matched === p.right : false;
              return (
                <button
                  key={p.left}
                  type="button"
                  disabled={Boolean(submitted)}
                  onClick={() => setSelectedLeft(p.left)}
                  className={`flex w-full items-center justify-between rounded-2xl border px-3.5 py-2.5 text-left text-sm font-semibold transition ${
                    submitted
                      ? isPairRight
                        ? 'border-[#3BA962] bg-[#D2EED9] text-[#1B5C32]'
                        : 'border-[#DC5F80] bg-[#F7DCE1] text-[#7D233B]'
                      : isActive
                      ? 'border-[#08090D] bg-[#08090D] text-white'
                      : matched
                      ? 'border-[#BBDDF2] bg-[#D7ECF9] text-[#1A4F73]'
                      : 'border-black/10 bg-[#F6F6F4] hover:bg-[#EEEEEB]'
                  }`}
                >
                  <span>{p.left}</span>
                  {matched && <span className="text-xs opacity-80">→ {matched}</span>}
                </button>
              );
            })}
          </div>
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-wide text-black/50">2. Ghép nghĩa bên phải</p>
            {shuffledRight.map((rightVal) => {
              const alreadyUsed = Object.values(matchedPairs).includes(rightVal);
              return (
                <button
                  key={rightVal}
                  type="button"
                  disabled={Boolean(submitted) || !selectedLeft}
                  onClick={() => handleMatchRightClick(rightVal)}
                  className={`w-full rounded-2xl border px-3.5 py-2.5 text-left text-sm font-medium transition ${
                    alreadyUsed
                      ? 'border-black/10 bg-[#EEEEEB] text-black/55'
                      : selectedLeft
                      ? 'border-[#8E62D9] bg-[#E5D9F7]/50 text-[#08090D] hover:bg-[#E5D9F7]'
                      : 'border-black/10 bg-[#F6F6F4] text-black/70'
                  }`}
                >
                  {rightVal}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Submit button & Immediate feedback */}
      {!submitted ? (
        <div className="mt-4 flex justify-end">
          <button
            type="button"
            onClick={handleCheck}
            className="rounded-full bg-[#08090D] px-5 py-2.5 text-sm font-semibold text-white transition hover:opacity-90 disabled:opacity-40"
            disabled={
              ((exercise.type === 'mcq' || exercise.type === 'true_false' || exercise.type === 'listening') &&
                !selectedOption) ||
              ((exercise.type === 'fill_blank' || exercise.type === 'translation') && !textInput.trim()) ||
              ((exercise.type === 'sentence_order' || exercise.type === 'drag_drop') && orderedTokens.length === 0) ||
              (exercise.type === 'match' &&
                Object.keys(matchedPairs).length < (exercise.pairs?.length || 0))
            }
          >
            Kiểm tra đáp án
          </button>
        </div>
      ) : (
        <div
          className={`mt-4 rounded-2xl border p-4 text-sm ${
            submitted.isCorrect
              ? 'border-[#B6E0C1] bg-[#D2EED9]/70 text-[#1B5C32]'
              : 'border-[#ECC0C9] bg-[#F7DCE1]/70 text-[#7D233B]'
          }`}
        >
          <div className="mb-1 flex items-center gap-2 font-bold">
            {submitted.isCorrect ? (
              <>
                <CheckCircle2 className="h-4 w-4" />
                Chính xác!
              </>
            ) : (
              <>
                <XCircle className="h-4 w-4" />
                Chưa chính xác lắm — cùng xem giải thích nhé:
              </>
            )}
          </div>
          <p className="leading-relaxed">{exercise.explanationVi}</p>
        </div>
      )}
    </div>
  );
};
