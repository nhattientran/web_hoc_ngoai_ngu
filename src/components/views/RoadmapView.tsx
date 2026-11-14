import React, { useEffect, useMemo, useState } from 'react';
import {
  BookOpen,
  CheckCircle2,
  Clock,
  Headphones,
  Lock,
  MessageSquare,
  PenLine,
  Play,
  Sparkles,
  Unlock,
} from 'lucide-react';
import { useLearning } from '../../context/LearningContext';
import { ENGLISH_LESSONS, ENGLISH_MODULES } from '../../data/englishCurriculum';
import { JAPANESE_LESSONS, JAPANESE_MODULES } from '../../data/japaneseCurriculum';
import { Language, LessonData, NavSection, SkillTag } from '../../types';
import { MascotAvatar } from '../common/MascotAvatar';
import { PASTEL_STYLES } from '../common/PastelTokens';
import { RightTodayPanel, useRightPanelCollapsed } from '../layout/RightTodayPanel';

interface Props {
  activeLanguage: Language;
  onStartLesson: (lesson: LessonData) => void;
  onNavigate: (nav: NavSection, subTab?: string) => void;
}

const ACTIVITY_ICON_MAP: Record<SkillTag, React.ComponentType<{ className?: string }>> = {
  listening: Headphones,
  speaking: MessageSquare,
  reading: BookOpen,
  writing: PenLine,
  grammar: Sparkles,
  vocabulary: BookOpen,
  kana: BookOpen,
  kanji: PenLine,
};

export const RoadmapView: React.FC<Props> = ({ activeLanguage, onStartLesson, onNavigate }) => {
  const { state, getLessonStatus, getLanguageStats, updateSettings, setLessonProgressPct } =
    useLearning();
  const [showAllModules, setShowAllModules] = useState<boolean>(true);
  const [selectedModuleFilter, setSelectedModuleFilter] = useState<string>('all');
  const isFreeMode = state.settings.unlockAllPreview;

  useEffect(() => {
    setSelectedModuleFilter('all');
  }, [activeLanguage]);

  const selectedLang = activeLanguage;
  const modules = selectedLang === 'en' ? ENGLISH_MODULES : JAPANESE_MODULES;
  const lessons = selectedLang === 'en' ? ENGLISH_LESSONS : JAPANESE_LESSONS;
  const stats = getLanguageStats(selectedLang);

  const mostRecentLessonId = useMemo(() => {
    let latestId: string | null = null;
    let latestTime = 0;
    for (const l of lessons) {
      const t = state.lessonProgress[l.id]?.lastStudiedAt || 0;
      if (t > latestTime) {
        latestTime = t;
        latestId = l.id;
      }
    }
    return latestId;
  }, [lessons, state.lessonProgress]);

  const filteredModules = useMemo(() => {
    if (selectedModuleFilter === 'all') return modules;
    return modules.filter((m) => m.id === selectedModuleFilter);
  }, [modules, selectedModuleFilter]);

  const currentLessonTitle = stats.currentLesson?.title || lessons[0]?.title;
  const [rightCollapsed, toggleRightCollapsed] = useRightPanelCollapsed();

  return (
    <div className="flex flex-col xl:flex-row xl:items-start gap-5">
      <div className="flex-1 space-y-5 min-w-0">
        {/* Coach Pill + Workspace Badge */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="inline-flex items-center gap-2.5 rounded-full border border-black/10 bg-white py-1.5 pl-2 pr-4 shadow-sm">
            <MascotAvatar size={28} />
            <span className="text-xs sm:text-sm font-medium text-[#08090D]">
              Hôm nay mình học bài <strong className="font-bold">{currentLessonTitle}</strong> nha!
            </span>
          </div>

          <span
            className={`rounded-full px-4 py-1.5 text-xs font-extrabold ${
              selectedLang === 'en'
                ? 'bg-[#D7ECF9] text-[#1A4F73]'
                : 'bg-[#E5D9F7] text-[#4B2C7A]'
            }`}
          >
            {selectedLang === 'en' ? '🇬🇧 Lộ trình Tiếng Anh (B1 → B2)' : '🇯🇵 Lộ trình Tiếng Nhật (0 → JLPT N5)'}
          </span>
        </div>

        {/* Heading + Stat Pills (Screenshot 1 composition!) */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#08090D]">
              Lộ trình của tôi
            </h1>
            <span className="rounded-full bg-white border border-black/10 px-3 py-1 text-xs font-bold">
              {selectedLang === 'en' ? '🇬🇧 B1 → B2' : '🇯🇵 0 → N5'}
            </span>
          </div>

          <button
            type="button"
            onClick={() => setShowAllModules((v) => !v)}
            className="text-xs font-bold text-black/65 hover:text-[#08090D]"
          >
            {showAllModules ? 'Thu gọn mục tiêu chặng' : 'Xem mục tiêu các chặng →'}
          </button>
        </div>

        {/* Unlock Mode Switcher: Sequential Lock vs Open All + Percentage Logging */}
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-[20px] border border-black/10 bg-white px-4 py-3 shadow-sm">
          <div className="space-y-0.5">
            <div className="text-xs font-extrabold text-[#08090D]">Chế độ mở khóa bài học</div>
            <p className="text-[11px] text-black/60">
              {isFreeMode
                ? 'Đang mở tự do tất cả bài — chọn bất kỳ bài nào để học và ghi log % tiến độ ngay tại vị trí đó.'
                : 'Đang khóa theo trình tự từ trên xuống — hoàn thành bài trước để mở khóa bài tiếp theo.'}
            </p>
          </div>

          <div className="inline-flex rounded-full bg-[#F6F6F4] p-1 border border-black/10">
            <button
              type="button"
              onClick={() => updateSettings({ unlockAllPreview: false })}
              className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-extrabold transition ${
                !isFreeMode
                  ? 'bg-[#08090D] text-white shadow-sm'
                  : 'text-black/60 hover:text-[#08090D]'
              }`}
            >
              <Lock className="h-3 w-3" />
              Học tuần tự
            </button>
            <button
              type="button"
              onClick={() => updateSettings({ unlockAllPreview: true })}
              className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-extrabold transition ${
                isFreeMode
                  ? 'bg-[#1A4F73] text-white shadow-sm'
                  : 'text-black/60 hover:text-[#08090D]'
              }`}
            >
              <Unlock className="h-3 w-3" />
              Mở tất cả & Log %
            </button>
          </div>
        </div>

        {/* 3 Stat Tiles like Screenshot 1 */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="rounded-2xl bg-[#D7ECF9] px-5 py-3 text-center min-w-[120px]">
            <div className="text-lg font-extrabold text-[#1A4F73]">{stats.totalLessons}</div>
            <div className="text-xs font-semibold text-[#1A4F73]/80">Bài trong lộ trình</div>
          </div>
          <div className="rounded-2xl bg-[#D2EED9] px-5 py-3 text-center min-w-[110px]">
            <div className="text-lg font-extrabold text-[#1B5C32]">{stats.completedLessons}</div>
            <div className="text-xs font-semibold text-[#1B5C32]/80">Đã xong</div>
          </div>
          <div className="rounded-2xl border-2 border-dashed border-black/15 bg-white/60 px-5 py-3 text-center min-w-[110px]">
            <div className="text-lg font-extrabold text-[#08090D]">
              {stats.totalLessons - stats.completedLessons}
            </div>
            <div className="text-xs font-semibold text-black/60">Còn lại</div>
          </div>

          {/* Module Filter Pills */}
          <div className="flex flex-wrap gap-1.5 ml-auto">
            <button
              type="button"
              onClick={() => setSelectedModuleFilter('all')}
              className={`rounded-full px-3 py-1.5 text-xs font-bold transition ${
                selectedModuleFilter === 'all'
                  ? 'bg-[#08090D] text-white'
                  : 'bg-white border border-black/10 text-black/65 hover:bg-[#EEEEEB]'
              }`}
            >
              Tất cả {modules.length} chặng
            </button>
            {modules.map((m) => (
              <button
                key={m.id}
                type="button"
                onClick={() => setSelectedModuleFilter(m.id)}
                className={`rounded-full px-3 py-1.5 text-xs font-bold transition ${
                  selectedModuleFilter === m.id
                    ? 'bg-[#08090D] text-white'
                    : 'bg-white border border-black/10 text-black/65 hover:bg-[#EEEEEB]'
                }`}
              >
                M{m.order}
              </button>
            ))}
          </div>
        </div>

        {/* Connected Progression Path */}
        <div className="space-y-8">
          {filteredModules.map((mod) => {
            const modLessons = lessons.filter((l) => l.moduleId === mod.id);
            const modStyle = PASTEL_STYLES[mod.pastel];

            return (
              <section key={mod.id} className="space-y-4">
                {/* Module Header Banner */}
                <div className="flex flex-wrap items-center justify-between gap-2 rounded-[20px] border border-black/10 bg-white px-4 py-3.5">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className={`rounded-full px-2.5 py-0.5 text-[11px] font-extrabold ${modStyle.pill}`}>
                        {mod.cefrOrJlpt}
                      </span>
                      <h2 className="text-sm sm:text-base font-extrabold text-[#08090D]">{mod.title}</h2>
                    </div>
                    {showAllModules && (
                      <p className="mt-1 text-xs text-black/60">{mod.objectiveVi}</p>
                    )}
                  </div>
                  <span className="text-xs font-semibold text-black/50">
                    {modLessons.filter((l) => getLessonStatus(l) === 'completed').length}/{modLessons.length} bài
                  </span>
                </div>

                {/* Connected Zig-Zag Lesson Cards like Screenshot 1 */}
                <div className="relative space-y-5 pl-2 sm:pl-4">
                  {modLessons.map((lesson, idx) => {
                    const status = getLessonStatus(lesson);
                    const rec = state.lessonProgress[lesson.id];
                    const isCompleted = status === 'completed';
                    const isLocked = status === 'locked';
                    const isAvailableOrProgress = status === 'available' || status === 'in_progress';
                    const loggedPct = isCompleted
                      ? 100
                      : typeof rec?.progressPct === 'number'
                      ? rec.progressPct
                      : Math.min(90, (rec?.completedSteps?.length || 0) * 20);
                    const isRecentSpot = mostRecentLessonId === lesson.id;
                    const pastel = isCompleted
                      ? PASTEL_STYLES.green
                      : isLocked
                      ? PASTEL_STYLES.neutral
                      : PASTEL_STYLES[lesson.pastel];

                    const offsetClass = idx % 2 === 1 ? 'sm:ml-14 lg:ml-20' : 'sm:mr-10';

                    return (
                      <div key={lesson.id} className="relative">
                        {/* Dotted vertical connector */}
                        {idx < modLessons.length - 1 && (
                          <div
                            className="pointer-events-none absolute left-8 top-full h-5 w-0.5 border-l-2 border-dashed border-[#3BA962]/50"
                            aria-hidden="true"
                          />
                        )}

                        <div
                          onClick={() => {
                            if (!isLocked) onStartLesson(lesson);
                          }}
                          className={`group relative flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-[24px] border p-5 transition ${
                            pastel.bg
                          } ${pastel.border} ${offsetClass} ${
                            isLocked
                              ? 'opacity-75 cursor-not-allowed'
                              : 'cursor-pointer hover:shadow-card hover:-translate-y-0.5'
                          }`}
                        >
                          {/* Connector dot */}
                          <span
                            className={`hidden sm:block absolute -left-3 top-1/2 h-3 w-3 -translate-y-1/2 rounded-full border-2 border-white ${
                              isCompleted ? 'bg-[#3BA962]' : isLocked ? 'bg-black/25' : pastel.dot
                            }`}
                          />

                          <div className="space-y-2 flex-1">
                            <div className="flex flex-wrap items-center gap-2">
                              <span className="rounded-full bg-white/80 px-2.5 py-0.5 text-[11px] font-bold text-[#08090D]">
                                {isCompleted
                                  ? `✓ Hoàn thành • 100% (Điểm ${rec?.bestScore || 100}%)`
                                  : status === 'in_progress'
                                  ? `Đang học • ${loggedPct}% (Bước ${(rec?.lastStep ?? Math.max(0, (rec?.completedSteps?.length || 1) - 1)) + 1}/5)`
                                  : isLocked
                                  ? '🔒 Đã khóa'
                                  : 'Sẵn sàng học • 0%'}
                              </span>
                              {isRecentSpot && (
                                <span className="rounded-full bg-[#08090D] px-2.5 py-0.5 text-[10px] font-extrabold text-white">
                                  📍 Vị trí gần nhất
                                </span>
                              )}
                              <span className="inline-flex items-center gap-1 text-xs font-semibold text-black/60">
                                <Clock className="h-3.5 w-3.5" />~{lesson.estimatedMinutes} phút
                              </span>
                            </div>

                            <div>
                              <h3 className="font-jp text-lg sm:text-xl font-extrabold text-[#08090D]">
                                {lesson.title}
                              </h3>
                              {lesson.subtitle && (
                                <p className="font-jp text-xs font-medium text-black/60">{lesson.subtitle}</p>
                              )}
                            </div>

                            <p className="text-xs sm:text-sm text-black/75 leading-relaxed">
                              {lesson.objectiveVi}
                            </p>

                            {/* Per-lesson logged % progress bar */}
                            {!isLocked && (
                              <div className="space-y-1.5 pt-0.5">
                                <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/75">
                                  <div
                                    className={`h-full rounded-full transition-all duration-300 ${
                                      isCompleted ? 'bg-[#1B5C32]' : 'bg-[#08090D]'
                                    }`}
                                    style={{ width: `${loggedPct}%` }}
                                  />
                                </div>
                                {isFreeMode && (
                                  <div
                                    className="flex flex-wrap items-center gap-1"
                                    onClick={(e) => e.stopPropagation()}
                                  >
                                    <span className="text-[10px] font-bold text-black/55 mr-0.5">
                                      Ghi log % tại bài này:
                                    </span>
                                    {[0, 25, 50, 75, 100].map((pct) => (
                                      <button
                                        key={pct}
                                        type="button"
                                        onClick={() => setLessonProgressPct(lesson.id, pct)}
                                        className={`rounded-full px-2 py-0.5 text-[10px] font-extrabold transition ${
                                          loggedPct === pct
                                            ? 'bg-[#08090D] text-white'
                                            : 'bg-white/75 text-black/65 hover:bg-white'
                                        }`}
                                      >
                                        {pct}%
                                      </button>
                                    ))}
                                  </div>
                                )}
                              </div>
                            )}

                            {/* Footer row: CTA pill + activity icons (Screenshot 1) */}
                            <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
                              {!isLocked ? (
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    onStartLesson(lesson);
                                  }}
                                  className="inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-xs font-extrabold text-[#08090D] shadow-sm transition group-hover:bg-[#08090D] group-hover:text-white"
                                >
                                  <Clock className="h-3.5 w-3.5" />
                                  {isCompleted
                                    ? 'Ôn lại bài'
                                    : status === 'in_progress'
                                    ? 'Học tiếp'
                                    : 'Bắt đầu học'}
                                </button>
                              ) : (
                                <span className="inline-flex items-center gap-1.5 rounded-full bg-white/75 px-3.5 py-1.5 text-xs font-bold text-black/55">
                                  Sắp tới • Hoàn thành bài trước để mở
                                </span>
                              )}

                              <div className="flex items-center gap-1.5">
                                {lesson.activityTags.map((tag) => {
                                  const TagIcon = ACTIVITY_ICON_MAP[tag] || BookOpen;
                                  return (
                                    <span
                                      key={tag}
                                      className="flex h-7 w-7 items-center justify-center rounded-full bg-white/65 text-black/60"
                                      title={tag}
                                    >
                                      <TagIcon className="h-3.5 w-3.5" />
                                    </span>
                                  );
                                })}
                              </div>
                            </div>
                          </div>

                          {/* Big circular Play / Lock / Done icon on the right (Screenshot 1) */}
                          <div className="shrink-0 self-end sm:self-center">
                            {isAvailableOrProgress ? (
                              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-sm transition group-hover:scale-105">
                                <Play className="h-6 w-6 fill-[#08090D] text-[#08090D] ml-0.5" />
                              </div>
                            ) : isCompleted ? (
                              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-[#1B5C32] shadow-sm">
                                <CheckCircle2 className="h-6 w-6" />
                              </div>
                            ) : (
                              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/70 text-black/45">
                                <Lock className="h-4 w-4" />
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>
            );
          })}
        </div>
      </div>

      {/* Right Panel */}
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
