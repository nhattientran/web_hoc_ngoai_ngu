import React, { useState } from 'react';
import {
  ArrowLeftRight,
  ArrowRight,
  BarChart2,
  BookOpen,
  CheckCircle2,
  Circle,
  Clock,
  Flame,
  Plus,
  RefreshCw,
  Sparkles,
  Trash2,
} from 'lucide-react';
import { useLearning } from '../../context/LearningContext';
import { Language, LessonData, NavSection } from '../../types';
import { formatMinutesLabel, getPastNDaysISO } from '../../utils/date';
import { MascotAvatar } from '../common/MascotAvatar';
import { RightTodayPanel, useRightPanelCollapsed } from '../layout/RightTodayPanel';

interface Props {
  activeLanguage: Language;
  onSwitchLanguage: (lang: Language) => void;
  onNavigate: (nav: NavSection, subTab?: string) => void;
  onStartLesson: (lesson: LessonData) => void;
}

export const HomeDashboardView: React.FC<Props> = ({
  activeLanguage,
  onSwitchLanguage,
  onNavigate,
  onStartLesson,
}) => {
  const {
    state,
    todayISO,
    toggleDailyTask,
    addDailyTask,
    deleteDailyTask,
    rescheduleUnfinishedTasks,
    getLanguageStats,
  } = useLearning();

  const isEn = activeLanguage === 'en';
  const stats = getLanguageStats(activeLanguage);

  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskMin, setNewTaskMin] = useState(15);
  const [showAddTask, setShowAddTask] = useState(false);

  const todayTasks = state.dailyTasks.filter(
    (t) => t.date === todayISO && (t.language === activeLanguage || t.language === 'both')
  );
  const unfinishedPastCount = state.dailyTasks.filter(
    (t) => t.date !== todayISO && !t.completed && (t.language === activeLanguage || t.language === 'both')
  ).length;

  const totalMinutesLang = Object.values(state.studyLogs).reduce(
    (sum, l) => sum + (isEn ? l.englishMinutes : l.japaneseMinutes),
    0
  );
  const totalLessonsCompleted = stats.completedLessons;
  const totalVocabLearned = state.vocabItems.filter(
    (v) => v.language === activeLanguage && (v.srsState === 'reviewing' || v.srsState === 'mastered')
  ).length;

  const totalQuizAttempted = Object.values(state.studyLogs).reduce((s, l) => s + l.quizTotal, 0);
  const totalQuizCorrect = Object.values(state.studyLogs).reduce((s, l) => s + l.quizCorrect, 0);
  const quizAccuracy = totalQuizAttempted > 0 ? Math.round((totalQuizCorrect / totalQuizAttempted) * 100) : 0;

  const last7Days = getPastNDaysISO(7);
  const activeDaysInWeek = last7Days.filter((d) => {
    const log = state.studyLogs[d];
    return log && (log.xpEarned > 0 || (isEn ? log.englishMinutes : log.japaneseMinutes) > 0);
  }).length;

  const recommendedLesson = stats.currentLesson;
  const dailyLangMin = isEn ? state.settings.dailyEnglishMinutes : state.settings.dailyJapaneseMinutes;
  const [rightCollapsed, toggleRightCollapsed] = useRightPanelCollapsed();

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;
    addDailyTask({
      title: newTaskTitle.trim(),
      language: activeLanguage,
      category: 'custom',
      targetMinutes: newTaskMin,
    });
    setNewTaskTitle('');
    setShowAddTask(false);
  };

  return (
    <div className="flex flex-col xl:flex-row xl:items-start gap-5">
      {/* Left / Main Dashboard Column */}
      <div className="flex-1 space-y-5 min-w-0">
        {/* Coach Greeting Pill (Manae Screenshot 1 style) */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="inline-flex items-center gap-2.5 rounded-full border border-black/10 bg-white py-1.5 pl-2 pr-4 shadow-sm">
            <MascotAvatar size={28} />
            <span className="text-xs sm:text-sm font-medium text-[#08090D]">
              Chào {state.settings.userName}! Hôm nay mình học{' '}
              <strong className="font-bold">
                {recommendedLesson?.title || (isEn ? 'lộ trình Tiếng Anh B1→B2' : 'lộ trình Tiếng Nhật N5')}
              </strong>{' '}
              nha!
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {recommendedLesson && (
              <button
                type="button"
                onClick={() => onStartLesson(recommendedLesson)}
                className="inline-flex items-center gap-1.5 rounded-full bg-[#08090D] px-4 py-2 text-xs font-bold text-white transition hover:opacity-90"
              >
                <Sparkles className="h-3.5 w-3.5" />
                Học bài gợi ý ngay
              </button>
            )}
          </div>
        </div>

        {/* Welcome & Isolated Active Language Card */}
        <section className="rounded-[26px] border border-black/10 bg-white p-5 sm:p-6 shadow-soft">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="space-y-1.5">
              <div className="flex flex-wrap items-center gap-2">
                <span
                  className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-extrabold ${
                    isEn ? 'bg-[#D7ECF9] text-[#1A4F73]' : 'bg-[#E5D9F7] text-[#4B2C7A]'
                  }`}
                >
                  {isEn ? '🇬🇧 Không gian Tiếng Anh (B1 → B2)' : '🇯🇵 Không gian Tiếng Nhật (0 → JLPT N5)'}
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#08090D]">
                {isEn ? 'Tổng quan Tiếng Anh B1 → B2' : 'Tổng quan Tiếng Nhật 0 → N5'}
              </h1>
              <p className="text-sm text-black/65">
                Mục tiêu hôm nay:{' '}
                <span className="font-bold text-[#08090D]">
                  {dailyLangMin}p {isEn ? 'Tiếng Anh' : 'Tiếng Nhật'} + {state.settings.dailyVocabMinutes}p Ôn từ vựng SRS
                </span>
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <div className="flex items-center gap-2 rounded-full bg-[#F6E9B2]/75 px-4 py-2 text-xs font-bold text-[#6B4F0A]">
                <Flame className="h-4 w-4 text-orange-500" />
                <span>Chuỗi {state.streakDays} ngày • {state.xp} XP</span>
              </div>
              <button
                type="button"
                onClick={() => onSwitchLanguage(isEn ? 'jp' : 'en')}
                className="inline-flex items-center gap-1.5 rounded-full border border-black/10 bg-[#F6F6F4] px-3.5 py-2 text-xs font-bold text-[#08090D] transition hover:bg-[#EEEEEB]"
                title="Chuyển sang không gian học ngôn ngữ còn lại"
              >
                <ArrowLeftRight className="h-3.5 w-3.5" />
                {isEn ? 'Sang Tiếng Nhật 🇯🇵' : 'Sang Tiếng Anh 🇬🇧'}
              </button>
            </div>
          </div>

          {/* Single Prominent Active Language Card (100% separated stream) */}
          <div
            className={`mt-6 rounded-[24px] border p-5 sm:p-6 transition ${
              isEn
                ? 'border-[#BBDDF2] bg-[#D7ECF9]'
                : 'border-[#D2BEF2] bg-[#E5D9F7]'
            }`}
          >
            <div className="space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span
                  className={`inline-flex items-center gap-1.5 rounded-full bg-white/85 px-3 py-1 text-xs font-extrabold ${
                    isEn ? 'text-[#1A4F73]' : 'text-[#4B2C7A]'
                  }`}
                >
                  {isEn ? '🇬🇧 TIẾNG ANH HỌC THUẬT & CÔNG SỞ' : '🇯🇵 TIẾNG NHẬT CĂN BẢN'}
                </span>
                <span
                  className={`rounded-full px-3 py-1 text-xs font-bold text-white ${
                    isEn ? 'bg-[#1A4F73]' : 'bg-[#4B2C7A]'
                  }`}
                >
                  {isEn ? 'B1 → B2' : '0 → JLPT N5'}
                </span>
              </div>

              <div className="flex flex-wrap items-end justify-between gap-4">
                <div>
                  <div className="text-4xl font-extrabold text-[#08090D]">{stats.completionPct}%</div>
                  <div className={`text-xs font-semibold ${isEn ? 'text-[#1A4F73]/85' : 'text-[#4B2C7A]/85'}`}>
                    Hoàn thành {stats.completedLessons}/{stats.totalLessons} bài • Còn{' '}
                    {stats.totalLessons - stats.completedLessons} bài
                  </div>
                </div>
                <div className="text-right">
                  <div className={`text-xs font-bold ${isEn ? 'text-[#1A4F73]' : 'text-[#4B2C7A]'}`}>
                    Năng lực ước tính
                  </div>
                  <div className="text-base font-extrabold text-[#08090D]">
                    {stats.estimatedProficiencyPct > 0
                      ? `${stats.estimatedProficiencyPct}% ${isEn ? 'B2' : 'N5'}`
                      : 'Chưa đánh giá'}
                  </div>
                </div>
              </div>

              <div className="h-3 w-full overflow-hidden rounded-full bg-white/65">
                <div
                  className={`h-full rounded-full transition-all duration-300 ${
                    isEn ? 'bg-[#1A4F73]' : 'bg-[#4B2C7A]'
                  }`}
                  style={{ width: `${stats.completionPct}%` }}
                />
              </div>

              <div className="rounded-2xl bg-white/75 px-4 py-3 text-xs flex flex-wrap items-center justify-between gap-2">
                <div>
                  <span className="font-semibold text-black/55">Chặng hiện tại: </span>
                  <span className="font-bold text-[#08090D]">
                    {stats.currentLesson?.moduleTitle || (isEn ? 'Module 1: Giao tiếp & Phản xạ' : 'Module 1: Hiragana')}
                  </span>
                  {stats.currentLesson && (
                    <span className="ml-2 text-black/60">— {stats.currentLesson.title}</span>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {stats.currentLesson && (
                <button
                  type="button"
                  onClick={() => onStartLesson(stats.currentLesson!)}
                  className="inline-flex items-center justify-center gap-1.5 rounded-full bg-[#08090D] px-5 py-2.5 text-xs font-bold text-white transition hover:opacity-90"
                >
                  Tiếp tục học bài hiện tại
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              )}
              <button
                type="button"
                onClick={() => onNavigate('roadmap')}
                className={`rounded-full bg-white/85 px-4 py-2.5 text-xs font-bold hover:bg-white ${
                  isEn ? 'text-[#1A4F73]' : 'text-[#4B2C7A]'
                }`}
              >
                Xem lộ trình {isEn ? 'Tiếng Anh' : 'Tiếng Nhật'}
              </button>
              <button
                type="button"
                onClick={() => onNavigate(isEn ? 'english' : 'japanese')}
                className={`rounded-full bg-white/85 px-4 py-2.5 text-xs font-bold hover:bg-white ${
                  isEn ? 'text-[#1A4F73]' : 'text-[#4B2C7A]'
                }`}
              >
                {isEn ? 'Mở Trung tâm B2' : 'Mở Trung tâm Kana & N5'}
              </button>
            </div>
          </div>
        </section>

        {/* Today's Learning Plan (Editable Checklist) */}
        <section className="rounded-[26px] border border-black/10 bg-white p-5 sm:p-6 shadow-soft space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <h2 className="text-lg font-extrabold text-[#08090D]">
                Kế hoạch {isEn ? 'Tiếng Anh' : 'Tiếng Nhật'} hôm nay
              </h2>
              <p className="text-xs text-black/55">
                Chỉ hiển thị nhiệm vụ thuộc luồng {isEn ? 'Tiếng Anh' : 'Tiếng Nhật'} để tránh nhầm lẫn.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              {unfinishedPastCount > 0 && (
                <button
                  type="button"
                  onClick={rescheduleUnfinishedTasks}
                  className="inline-flex items-center gap-1 rounded-full bg-[#F6E9B2] px-3 py-1.5 text-xs font-bold text-[#6B4F0A] hover:bg-[#F3E29B]"
                >
                  <RefreshCw className="h-3 w-3" />
                  Dời {unfinishedPastCount} việc cũ sang hôm nay
                </button>
              )}
              <button
                type="button"
                onClick={() => setShowAddTask((v) => !v)}
                className="inline-flex items-center gap-1 rounded-full bg-[#EEEEEB] px-3.5 py-1.5 text-xs font-bold text-[#08090D] hover:bg-[#E2E2DE]"
              >
                <Plus className="h-3.5 w-3.5" />
                Thêm nhiệm vụ
              </button>
            </div>
          </div>

          {showAddTask && (
            <form
              onSubmit={handleAddTask}
              className="flex flex-wrap items-center gap-2 rounded-2xl border border-black/10 bg-[#F6F6F4] p-3"
            >
              <input
                type="text"
                value={newTaskTitle}
                onChange={(e) => setNewTaskTitle(e.target.value)}
                placeholder={
                  isEn
                    ? 'VD: Nghe 15 phút English Listening & chép từ mới B2...'
                    : 'VD: Ôn lại 15 chữ Kanji số đếm N5...'
                }
                className="flex-1 min-w-[180px] rounded-xl border border-black/10 bg-white px-3 py-2 text-xs font-medium outline-none"
              />
              <span
                className={`rounded-xl px-2.5 py-2 text-xs font-bold ${
                  isEn ? 'bg-[#D7ECF9] text-[#1A4F73]' : 'bg-[#E5D9F7] text-[#4B2C7A]'
                }`}
              >
                {isEn ? '🇬🇧 Tiếng Anh' : '🇯🇵 Tiếng Nhật'}
              </span>
              <input
                type="number"
                min={5}
                max={120}
                value={newTaskMin}
                onChange={(e) => setNewTaskMin(Number(e.target.value) || 10)}
                className="w-16 rounded-xl border border-black/10 bg-white px-2.5 py-2 text-xs font-semibold"
              />
              <span className="text-xs text-black/55">phút</span>
              <button
                type="submit"
                className="rounded-full bg-[#08090D] px-4 py-2 text-xs font-bold text-white"
              >
                Lưu
              </button>
            </form>
          )}

          <div className="space-y-2">
            {todayTasks.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-black/15 p-5 text-center text-xs text-black/55">
                Chưa có nhiệm vụ {isEn ? 'Tiếng Anh' : 'Tiếng Nhật'} nào cho hôm nay. Nhấn &ldquo;Thêm nhiệm vụ&rdquo; để tạo mới!
              </div>
            ) : (
              todayTasks.map((task) => (
                <div
                  key={task.id}
                  className={`flex items-center justify-between gap-3 rounded-2xl border px-4 py-3 transition ${
                    task.completed
                      ? 'border-[#B6E0C1] bg-[#D2EED9]/45'
                      : 'border-black/10 bg-[#FBFBFA] hover:bg-[#F6F6F4]'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => toggleDailyTask(task.id)}
                    className="flex flex-1 items-center gap-3 text-left"
                  >
                    {task.completed ? (
                      <CheckCircle2 className="h-5 w-5 shrink-0 text-[#1B5C32]" />
                    ) : (
                      <Circle className="h-5 w-5 shrink-0 text-black/30" />
                    )}
                    <div>
                      <p
                        className={`text-sm font-bold ${
                          task.completed ? 'line-through text-black/45' : 'text-[#08090D]'
                        }`}
                      >
                        {task.title}
                      </p>
                      <div className="mt-0.5 flex items-center gap-2 text-[11px] text-black/55">
                        <span
                          className={`rounded-full px-2 py-0.5 font-semibold ${
                            task.language === 'en'
                              ? 'bg-[#D7ECF9] text-[#1A4F73]'
                              : task.language === 'jp'
                              ? 'bg-[#E5D9F7] text-[#4B2C7A]'
                              : 'bg-[#F6E9B2] text-[#6B4F0A]'
                          }`}
                        >
                          {task.language === 'en' ? 'Tiếng Anh' : task.language === 'jp' ? 'Tiếng Nhật' : 'SRS Chung'}
                        </span>
                        <span>• {task.targetMinutes} phút</span>
                      </div>
                    </div>
                  </button>

                  <div className="flex items-center gap-1.5">
                    {task.targetNav && !task.completed && (
                      <button
                        type="button"
                        onClick={() => onNavigate(task.targetNav!)}
                        className="rounded-full bg-white border border-black/10 px-3 py-1.5 text-xs font-bold text-[#08090D] hover:bg-[#EEEEEB]"
                      >
                        Làm ngay
                      </button>
                    )}
                    {task.category === 'custom' && (
                      <button
                        type="button"
                        onClick={() => deleteDailyTask(task.id)}
                        className="rounded-full p-1.5 text-black/40 hover:bg-black/5 hover:text-red-600"
                        title="Xóa nhiệm vụ"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </section>

        {/* Learning Statistics Row (Scoped to Active Language) */}
        <section className="rounded-[26px] border border-black/10 bg-white p-5 sm:p-6 shadow-soft space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-extrabold text-[#08090D]">
              Thống kê {isEn ? 'Tiếng Anh' : 'Tiếng Nhật'} thực tế
            </h2>
            <button
              type="button"
              onClick={() => onNavigate('analytics')}
              className="inline-flex items-center gap-1 text-xs font-bold text-[#08090D] hover:underline"
            >
              Xem biểu đồ chi tiết <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
            <div className="rounded-2xl bg-[#F6F6F4] p-3.5">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-black/55">
                <Clock className="h-3.5 w-3.5" /> Thời gian học
              </div>
              <div className="mt-1 text-lg font-extrabold text-[#08090D]">
                {formatMinutesLabel(totalMinutesLang)}
              </div>
            </div>
            <div className="rounded-2xl bg-[#D2EED9]/55 p-3.5">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-[#1B5C32]">
                <BookOpen className="h-3.5 w-3.5" /> Bài đã xong
              </div>
              <div className="mt-1 text-lg font-extrabold text-[#08090D]">{totalLessonsCompleted}</div>
            </div>
            <div className="rounded-2xl bg-[#F6E9B2]/65 p-3.5">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-[#6B4F0A]">
                <Sparkles className="h-3.5 w-3.5" /> Từ đã nhớ
              </div>
              <div className="mt-1 text-lg font-extrabold text-[#08090D]">{totalVocabLearned}</div>
            </div>
            <div className="rounded-2xl bg-[#D7ECF9]/65 p-3.5">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-[#1A4F73]">
                <BarChart2 className="h-3.5 w-3.5" /> Độ chính xác
              </div>
              <div className="mt-1 text-lg font-extrabold text-[#08090D]">
                {totalQuizAttempted > 0 ? `${quizAccuracy}%` : '—'}
              </div>
            </div>
            <div className="col-span-2 sm:col-span-1 rounded-2xl bg-[#E5D9F7]/65 p-3.5">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-[#4B2C7A]">
                <Flame className="h-3.5 w-3.5" /> Đều đặn tuần
              </div>
              <div className="mt-1 text-lg font-extrabold text-[#08090D]">{activeDaysInWeek}/7 ngày</div>
            </div>
          </div>
        </section>
      </div>

      {/* Right Panel ("Hôm nay") */}
      <RightTodayPanel
        activeLanguage={activeLanguage}
        onStartLesson={onStartLesson}
        onNavigate={onNavigate}
        collapsed={rightCollapsed}
        onToggleCollapse={toggleRightCollapsed}
      />
    </div>
  );
};
