import React, { useEffect, useState } from 'react';
import {
  ArrowRight,
  BookOpen,
  Calendar,
  ChevronsLeft,
  ChevronsRight,
  Flame,
  Layers,
  Sparkles,
  Trophy,
} from 'lucide-react';
import { useLearning } from '../../context/LearningContext';
import { BADGE_DEFINITIONS } from '../../data/badges';
import { Language, LessonData, NavSection } from '../../types';
import { formatShortViDate } from '../../utils/date';
import { isDueForReview } from '../../utils/srs';
import { HoverTooltip } from '../common/HoverTooltip';

const RIGHT_PANEL_COLLAPSED_KEY = 'manabi_right_panel_collapsed_v1';

export function useRightPanelCollapsed(): [boolean, () => void] {
  const [collapsed, setCollapsed] = useState<boolean>(() => {
    try {
      return localStorage.getItem(RIGHT_PANEL_COLLAPSED_KEY) === 'true';
    } catch {
      return false;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(RIGHT_PANEL_COLLAPSED_KEY, String(collapsed));
    } catch {
      // ignore storage failure
    }
  }, [collapsed]);

  const toggle = () => setCollapsed((prev) => !prev);
  return [collapsed, toggle];
}

interface Props {
  activeLanguage: Language;
  onStartLesson: (lesson: LessonData) => void;
  onNavigate: (nav: NavSection, subTab?: string) => void;
  collapsed?: boolean;
  onToggleCollapse?: () => void;
}

export const RightTodayPanel: React.FC<Props> = ({
  activeLanguage,
  onStartLesson,
  onNavigate,
  collapsed = false,
  onToggleCollapse,
}) => {
  const { state, todayISO, todayXP, getLanguageStats } = useLearning();
  const isEn = activeLanguage === 'en';
  const stats = getLanguageStats(activeLanguage);

  const dueVocabCount = state.vocabItems.filter(
    (v) => v.language === activeLanguage && isDueForReview(v)
  ).length;
  const todayTasks = state.dailyTasks.filter(
    (t) => t.date === todayISO && (t.language === activeLanguage || t.language === 'both')
  );
  const completedTasksCount = todayTasks.filter((t) => t.completed).length;

  const featuredLesson = stats.currentLesson;
  const featuredProgress = featuredLesson ? state.lessonProgress[featuredLesson.id] : undefined;
  const stepsDone = featuredProgress?.completedSteps?.length || 0;

  const totalKanaCount = 92; // 46 Hiragana + 46 Katakana
  const masteredKanaCount = state.masteredKana.length;
  const langMinutes = isEn ? state.settings.dailyEnglishMinutes : state.settings.dailyJapaneseMinutes;
  const totalGoalMin = langMinutes + state.settings.dailyVocabMinutes;

  const unlockedBadgeObjs = BADGE_DEFINITIONS.filter((b) => state.unlockedBadges.includes(b.id));

  return (
    <aside
      className={`xl:sticky xl:top-5 shrink-0 w-full rounded-[26px] border border-black/10 bg-[#EEEEEC] p-3.5 transition-[width] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
        collapsed ? 'xl:w-[64px]' : 'xl:w-[330px]'
      }`}
    >
      {/* Unified Header Row (constant padding + height so toggle never shifts) */}
      <div
        className={`flex items-center min-h-[32px] ${
          collapsed ? 'justify-between xl:justify-center gap-0' : 'justify-between gap-2'
        }`}
      >
        <div
          className={`flex items-center gap-1.5 overflow-hidden whitespace-nowrap transition-opacity duration-200 ${
            collapsed ? 'w-0 max-w-0 opacity-0 xl:hidden' : 'max-w-[180px] opacity-100'
          }`}
        >
          <h2 className="pl-1 text-xl font-extrabold tracking-tight text-[#08090D]">Hôm nay</h2>
          <HoverTooltip
            label="Lịch học hằng ngày"
            description="Theo dõi nhiệm vụ, thẻ đến hạn và mục tiêu XP trong ngày"
            placement="left"
          >
            <span className="inline-flex rounded-full p-1 hover:bg-white/70 cursor-help">
              <Calendar className="h-4 w-4 text-black/55" />
            </span>
          </HoverTooltip>
        </div>

        <div
          className={`flex items-center ${
            collapsed ? 'w-full justify-between xl:justify-center gap-0' : 'gap-1.5 ml-auto'
          }`}
        >
          <span
            className={`rounded-full bg-white text-xs font-semibold text-black/65 overflow-hidden whitespace-nowrap ${
              collapsed ? 'hidden' : 'px-2.5 py-1'
            }`}
          >
            {formatShortViDate(todayISO)}
          </span>
          {onToggleCollapse && (
            <HoverTooltip
              label={collapsed ? 'Mở bảng Hôm nay (<<)' : 'Thu gọn bảng Hôm nay (>>)'}
              description={
                collapsed
                  ? 'Mở lại mục tiêu ngày, từ đến hạn SRS và chuỗi ngày học'
                  : 'Đóng sang phải để mở rộng không gian học'
              }
              placement="left"
            >
              <button
                type="button"
                onClick={onToggleCollapse}
                aria-label={collapsed ? 'Mở bảng Hôm nay' : 'Thu gọn bảng Hôm nay'}
                className={`flex h-8 items-center justify-center rounded-full bg-white text-black/75 border border-black/10 shadow-sm hover:bg-[#08090D] hover:text-white transition-colors ${
                  collapsed ? 'px-2.5 xl:w-8 xl:px-0 gap-1.5' : 'w-8'
                }`}
              >
                {collapsed ? (
                  <>
                    <ChevronsLeft className="h-3.5 w-3.5 shrink-0" />
                    <span className="xl:hidden text-xs font-extrabold">Mở Hôm nay</span>
                  </>
                ) : (
                  <ChevronsRight className="h-3.5 w-3.5 shrink-0" />
                )}
              </button>
            </HoverTooltip>
          )}
        </div>
      </div>

      {/* Collapsed Quick Badges */}
      {collapsed && (
        <div className="mt-3 flex xl:flex-col items-center justify-end xl:justify-start gap-2">
          <HoverTooltip
            label={`${dueVocabCount} từ đến hạn ôn SRS`}
            description="Nhấn để mở Flashcards SRS"
            placement="left"
          >
            <button
              type="button"
              onClick={() => onNavigate('vocabulary')}
              className="flex xl:flex-col items-center gap-1 rounded-2xl bg-[#D7ECF9] px-2.5 py-2 text-[11px] font-extrabold text-[#1A4F73] hover:opacity-90 transition"
            >
              <Layers className="h-3.5 w-3.5 shrink-0" />
              <span>{dueVocabCount}</span>
            </button>
          </HoverTooltip>

          <HoverTooltip
            label={`Chuỗi ${state.streakDays} ngày`}
            description={`XP hôm nay: ${todayXP}/${state.settings.dailyXpGoal}`}
            placement="left"
          >
            <button
              type="button"
              onClick={onToggleCollapse}
              className="flex xl:flex-col items-center gap-1 rounded-2xl bg-[#F6E9B2] px-2.5 py-2 text-[11px] font-extrabold text-[#6B4F0A] hover:opacity-90 transition"
            >
              <Flame className="h-3.5 w-3.5 shrink-0" />
              <span>{state.streakDays}d</span>
            </button>
          </HoverTooltip>
        </div>
      )}

      {/* Expanded Cards Drawer: exact 0fr <-> 1fr height + overflow-hidden clip keeps cards locked at 302px with zero burst */}
      <div
        className={`grid transition-[grid-template-rows,margin] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          collapsed ? 'grid-rows-[0fr] mt-0 pointer-events-none' : 'grid-rows-[1fr] mt-4'
        }`}
      >
        <div className="min-h-0 overflow-hidden">
          <div
            className={`xl:w-[300px] space-y-4 transition-opacity ${
              collapsed ? 'opacity-0 duration-100' : 'opacity-100 duration-200 delay-75'
            }`}
          >

      {/* Daily Goal Summary */}
      <div className="rounded-[20px] bg-white p-4 border border-black/5 space-y-2.5">
        <div className="flex items-center justify-between text-xs font-bold text-[#08090D]">
          <span>Mục tiêu {isEn ? 'Tiếng Anh' : 'Tiếng Nhật'}</span>
          <span className="text-black/55">{totalGoalMin} phút / ngày</span>
        </div>
        <div className="grid grid-cols-2 gap-1.5 text-center text-[11px] font-semibold">
          <div
            className={`rounded-xl px-2 py-1.5 ${
              isEn ? 'bg-[#D7ECF9]/70 text-[#1A4F73]' : 'bg-[#E5D9F7]/70 text-[#4B2C7A]'
            }`}
          >
            {isEn ? `🇬🇧 Bài học ${langMinutes}p` : `🇯🇵 Bài học ${langMinutes}p`}
          </div>
          <div className="rounded-xl bg-[#F6E9B2]/80 px-2 py-1.5 text-[#6B4F0A]">
            Ôn từ SRS {state.settings.dailyVocabMinutes}p
          </div>
        </div>
        <div className="flex items-center justify-between text-xs text-black/60 pt-0.5">
          <span>Nhiệm vụ: {completedTasksCount}/{todayTasks.length} xong</span>
          <span className="font-bold text-[#08090D]">{todayXP}/{state.settings.dailyXpGoal} XP</span>
        </div>
      </div>

      {/* Vocabulary Review Reminder Card (Pastel Blue) */}
      <div className="rounded-[20px] bg-[#D7ECF9] border border-[#BBDDF2] p-4 space-y-2.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm font-bold text-[#1A4F73]">
            <Layers className="h-4 w-4" />
            <span>Ôn từ {isEn ? 'Tiếng Anh' : 'Tiếng Nhật'}</span>
          </div>
          <span className="text-xs font-semibold text-[#1A4F73]/75">{dueVocabCount} từ đến hạn</span>
        </div>
        <p className="text-xs leading-relaxed text-[#1A4F73]/85">
          {dueVocabCount > 0
            ? `Bạn có ${dueVocabCount} thẻ ${isEn ? 'Tiếng Anh B1→B2' : 'Tiếng Nhật N5'} sẵn sàng ôn tập theo lịch lặp lại ngắt quãng.`
            : `Tuyệt vời! Bạn đã ôn hết các thẻ ${isEn ? 'Tiếng Anh' : 'Tiếng Nhật'} đến hạn hôm nay.`}
        </p>
        <button
          type="button"
          onClick={() => onNavigate('vocabulary')}
          className="inline-flex w-full items-center justify-center gap-1.5 rounded-full bg-white/80 px-4 py-2 text-xs font-bold text-[#1A4F73] transition hover:bg-white"
        >
          Mở Flashcards SRS
          <ArrowRight className="h-3.5 w-3.5" />
        </button>
      </div>

      {/* Featured Active Lesson Card (Pastel Lavender) */}
      {featuredLesson && (
        <div className="rounded-[20px] bg-[#E5D9F7] border border-[#D2BEF2] p-4 space-y-2.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm font-bold text-[#4B2C7A]">
              <BookOpen className="h-4 w-4" />
              <span>Bài {isEn ? 'Tiếng Anh' : 'Tiếng Nhật'} gợi ý</span>
            </div>
            <span className="text-xs font-semibold text-[#4B2C7A]/75">{stepsDone}/5 bước</span>
          </div>
          <div>
            <p className={`${isEn ? '' : 'font-jp '}text-sm font-extrabold text-[#08090D]`}>
              {featuredLesson.title}
            </p>
            <p className="mt-0.5 text-xs leading-relaxed text-[#4B2C7A]/85 line-clamp-2">
              {featuredLesson.objectiveVi}
            </p>
          </div>
          <button
            type="button"
            onClick={() => onStartLesson(featuredLesson)}
            className="inline-flex w-full items-center justify-center gap-1.5 rounded-full bg-white/85 px-4 py-2 text-xs font-bold text-[#08090D] transition hover:bg-white"
          >
            {stepsDone > 0 ? 'Học tiếp' : 'Bắt đầu'}
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>
      )}

      {/* Language-Specific Quick Shortcut Card */}
      {isEn ? (
        <HoverTooltip
          label="Mở Trung tâm Tiếng Anh B1→B2"
          description="Luyện Nghe – Nói – Đọc – Viết & Đánh giá CEFR B2"
          placement="left"
          className="w-full"
        >
          <button
            type="button"
            onClick={() => onNavigate('english')}
            className="flex w-full items-center justify-between rounded-[20px] bg-white border border-black/10 px-4 py-3.5 text-left transition hover:bg-[#F6F6F4]"
          >
            <div className="flex items-center gap-2.5">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#D7ECF9] text-sm font-bold text-[#1A4F73]">
                B2
              </span>
              <div>
                <p className="text-xs font-bold text-[#08090D]">Trung tâm kỹ năng B2</p>
                <p className="text-[11px] text-black/50">Reading • Listening • Writing</p>
              </div>
            </div>
            <span className="text-xs font-extrabold text-black/65">
              {stats.completedLessons}/{stats.totalLessons} bài
            </span>
          </button>
        </HoverTooltip>
      ) : (
        <HoverTooltip
          label="Mở Bảng Kana & Kanji N5"
          description="Xem mặt chữ Hiragana, Katakana & 110 chữ Kanji N5"
          placement="left"
          className="w-full"
        >
          <button
            type="button"
            onClick={() => onNavigate('japanese')}
            className="flex w-full items-center justify-between rounded-[20px] bg-white border border-black/10 px-4 py-3.5 text-left transition hover:bg-[#F6F6F4]"
          >
            <div className="flex items-center gap-2.5">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#F7DCE1] font-jp text-sm font-bold text-[#7D233B]">
                あ
              </span>
              <div>
                <p className="text-xs font-bold text-[#08090D]">Bảng chữ cái Kana</p>
                <p className="text-[11px] text-black/50">Hiragana & Katakana</p>
              </div>
            </div>
            <span className="text-xs font-extrabold text-black/65">
              {masteredKanaCount}/{totalKanaCount}
            </span>
          </button>
        </HoverTooltip>
      )}

      {/* Streak & Badges Mini Card */}
      <div className="rounded-[20px] bg-white border border-black/10 p-4 space-y-2.5">
        <div className="flex items-center justify-between">
          <HoverTooltip
            label={`Chuỗi học ${state.streakDays} ngày liên tiếp`}
            description="Hoàn thành ít nhất 1 bài hoặc ôn từ mỗi ngày để giữ chuỗi"
            placement="top"
          >
            <div className="flex items-center gap-1.5 text-xs font-bold text-[#08090D] cursor-help">
              <Flame className="h-4 w-4 text-orange-500" />
              <span>Chuỗi {state.streakDays} ngày</span>
            </div>
          </HoverTooltip>
          <HoverTooltip
            label={`Huy hiệu (${unlockedBadgeObjs.length}/${BADGE_DEFINITIONS.length})`}
            description="Mở khóa thêm huy hiệu khi đạt mốc bài học & XP"
            placement="top"
          >
            <div className="flex items-center gap-1 text-xs font-semibold text-black/55 cursor-help">
              <Trophy className="h-3.5 w-3.5 text-amber-600" />
              <span>{unlockedBadgeObjs.length}/{BADGE_DEFINITIONS.length} huy hiệu</span>
            </div>
          </HoverTooltip>
        </div>
        {unlockedBadgeObjs.length > 0 ? (
          <div className="flex flex-wrap gap-1.5">
            {unlockedBadgeObjs.slice(0, 4).map((b) => (
              <HoverTooltip key={b.id} label={b.title} description={b.descriptionVi} placement="top">
                <span className="inline-flex items-center gap-1 rounded-full bg-[#F6E9B2]/75 px-2.5 py-1 text-[11px] font-bold text-[#6B4F0A] cursor-help">
                  {b.icon} {b.title}
                </span>
              </HoverTooltip>
            ))}
          </div>
        ) : (
          <p className="text-[11px] text-black/55 flex items-center gap-1">
            <Sparkles className="h-3 w-3 shrink-0" />
            Hoàn thành bài học đầu tiên để mở khóa huy hiệu!
          </p>
        )}
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};
