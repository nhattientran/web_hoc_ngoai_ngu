import React, { useEffect, useMemo, useState } from 'react';
import { CheckCircle2, RotateCcw, Sparkles } from 'lucide-react';
import { ALL_LESSONS, useLearning } from '../../context/LearningContext';
import { ExerciseItem, Language } from '../../types';
import { InteractiveExerciseCard } from '../common/InteractiveExerciseCard';

interface Props {
  activeLanguage: Language;
}

export const PracticeHubView: React.FC<Props> = ({ activeLanguage }) => {
  const { state, recordPracticeResult } = useLearning();
  const speechRate = state.settings.speechRate;
  const isEn = activeLanguage === 'en';

  const [skillFilter, setSkillFilter] = useState<string>('all');
  const [results, setResults] = useState<Record<string, boolean>>({});
  const [sessionSaved, setSessionSaved] = useState(false);

  useEffect(() => {
    setSkillFilter('all');
    setResults({});
    setSessionSaved(false);
  }, [activeLanguage]);

  const exercisePool = useMemo(() => {
    const items: (ExerciseItem & { language: Language; lessonTitle: string })[] = [];
    for (const lesson of ALL_LESSONS) {
      if (lesson.language !== activeLanguage) continue;
      for (const ex of [...lesson.understandExercises, ...lesson.practiceExercises]) {
        if (skillFilter !== 'all' && ex.skill !== skillFilter) continue;
        items.push({ ...ex, language: lesson.language, lessonTitle: lesson.title });
      }
    }
    return items.slice(0, 8);
  }, [activeLanguage, skillFilter]);

  const answeredCount = exercisePool.filter((e) => results[e.id] !== undefined).length;
  const correctCount = exercisePool.filter((e) => results[e.id] === true).length;

  const handleSaveSession = () => {
    if (answeredCount === 0) return;
    recordPracticeResult({
      language: activeLanguage,
      skill: skillFilter === 'all' ? 'grammar' : (skillFilter as any),
      correct: correctCount,
      total: answeredCount,
      minutes: Math.max(5, answeredCount * 2),
      xp: Math.max(10, correctCount * 8),
    });
    setSessionSaved(true);
  };

  return (
    <div className="space-y-5">
      <div className="rounded-[26px] border border-black/10 bg-white p-5 sm:p-7 shadow-soft space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="mb-1.5 flex items-center gap-2">
              <span
                className={`rounded-full px-3 py-1 text-xs font-extrabold ${
                  isEn ? 'bg-[#D7ECF9] text-[#1A4F73]' : 'bg-[#E5D9F7] text-[#4B2C7A]'
                }`}
              >
                {isEn ? '🇬🇧 Luyện tập Tiếng Anh (B1 → B2)' : '🇯🇵 Luyện tập Tiếng Nhật (0 → N5)'}
              </span>
            </div>
            <h1 className="text-2xl font-extrabold text-[#08090D]">
              Phòng luyện tập {isEn ? 'Tiếng Anh' : 'Tiếng Nhật'}
            </h1>
            <p className="text-sm text-black/60">
              Luyện nhanh Trắc nghiệm, Điền từ, Sắp xếp câu, Ghép cặp, Nghe hiểu & Dịch câu — hoàn toàn tách biệt cho{' '}
              {isEn ? 'Tiếng Anh B1→B2' : 'Tiếng Nhật 0→N5'}.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <select
              value={skillFilter}
              onChange={(e) => {
                setSkillFilter(e.target.value);
                setResults({});
                setSessionSaved(false);
              }}
              className="rounded-full border border-black/10 bg-[#F6F6F4] px-4 py-2 text-xs font-bold"
            >
              <option value="all">Mọi kỹ năng</option>
              <option value="grammar">Ngữ pháp</option>
              <option value="vocabulary">Từ vựng</option>
              <option value="listening">Nghe hiểu</option>
              <option value="reading">Đọc hiểu</option>
              <option value="writing">Viết / Dịch</option>
              {!isEn && <option value="kana">Kana</option>}
              {!isEn && <option value="kanji">Kanji</option>}
            </select>
          </div>
        </div>

        {/* Live score bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-[#F6F6F4] px-4 py-3">
          <div className="text-xs sm:text-sm font-bold text-[#08090D]">
            Tiến độ phiên luyện tập: {answeredCount}/{exercisePool.length} câu • Đúng{' '}
            <span className="text-[#1B5C32]">{correctCount}</span> câu
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                setResults({});
                setSessionSaved(false);
              }}
              className="inline-flex items-center gap-1 rounded-full bg-white border border-black/10 px-3 py-1.5 text-xs font-bold"
            >
              <RotateCcw className="h-3.5 w-3.5" /> Làm mới
            </button>
            {!sessionSaved ? (
              <button
                type="button"
                disabled={answeredCount === 0}
                onClick={handleSaveSession}
                className="inline-flex items-center gap-1.5 rounded-full bg-[#08090D] px-4 py-1.5 text-xs font-bold text-white disabled:opacity-40"
              >
                <Sparkles className="h-3.5 w-3.5" /> Lưu kết quả & Nhận XP
              </button>
            ) : (
              <span className="inline-flex items-center gap-1 rounded-full bg-[#D2EED9] px-3.5 py-1.5 text-xs font-bold text-[#1B5C32]">
                <CheckCircle2 className="h-3.5 w-3.5" /> Đã lưu vào thống kê!
              </span>
            )}
          </div>
        </div>

        {exercisePool.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-black/15 p-8 text-center text-sm text-black/55">
            Không có bài tập nào khớp bộ lọc kỹ năng hiện tại. Hãy chọn kỹ năng khác!
          </div>
        ) : (
          <div className="space-y-4">
            {exercisePool.map((ex) => (
              <div key={ex.id} className="space-y-1.5">
                <div className="flex items-center gap-2 px-1 text-[11px] font-bold text-black/50">
                  <span>{ex.language === 'en' ? '🇬🇧 Tiếng Anh' : '🇯🇵 Tiếng Nhật'}</span>
                  <span>•</span>
                  <span>{ex.lessonTitle}</span>
                </div>
                <InteractiveExerciseCard
                  exercise={ex}
                  speechRate={speechRate}
                  onAnswered={(id, ok) => setResults((p) => ({ ...p, [id]: ok }))}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
