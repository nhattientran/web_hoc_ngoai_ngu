import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  AudioLines,
  BarChart3,
  Bell,
  BookOpen,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Flame,
  GitBranch,
  GraduationCap,
  Home,
  Languages,
  Layers,
  LogOut,
  Menu,
  Newspaper,
  NotebookPen,
  Play,
  Search,
  Settings,
  Sparkles,
  Volume2,
  X,
} from 'lucide-react';
import { ALL_LESSONS, useLearning } from '../../context/LearningContext';
import { ENGLISH_LONG_READINGS } from '../../data/englishLongReadings';
import { JAPANESE_LONG_READINGS } from '../../data/japaneseLongReadings';
import { KANJI_N5_ITEMS } from '../../data/kanjiData';
import { Language, LessonData, NavSection } from '../../types';
import { AuthUserSession } from '../../utils/auth';
import { speakText } from '../../utils/speech';
import { HoverTooltip } from '../common/HoverTooltip';
import { MascotAvatar } from '../common/MascotAvatar';

interface Props {
  activeLanguage: Language;
  onSwitchLanguage: (lang: Language) => void;
  activeNav: NavSection;
  onNavigate: (nav: NavSection, subTab?: string) => void;
  onStartLesson: (lesson: LessonData) => void;
  authUser?: AuthUserSession | null;
  onLogout?: () => void;
  children: React.ReactNode;
}

export const AppShell: React.FC<Props> = ({
  activeLanguage,
  onSwitchLanguage,
  activeNav,
  onNavigate,
  onStartLesson,
  authUser,
  onLogout,
  children,
}) => {
  const { state, todayXP, userLevel, getLanguageStats } = useLearning();
  const [sidebarExpanded, setSidebarExpanded] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const notifRef = useRef<HTMLDivElement | null>(null);

  const langStats = getLanguageStats(activeLanguage);
  const resumeLesson =
    langStats.currentLesson ||
    ALL_LESSONS.find((l) => l.language === activeLanguage) ||
    ALL_LESSONS[0];

  const isEn = activeLanguage === 'en';

  // Top & Sidebar nav dynamically scoped to the active language workspace!
  const topNavItems: {
    id: NavSection;
    label: string;
    description: string;
    icon: React.ComponentType<{ className?: string }>;
  }[] = useMemo(
    () => [
      {
        id: 'home',
        label: 'Hôm nay',
        description: 'Tổng quan mục tiêu & việc cần làm hôm nay',
        icon: Home,
      },
      {
        id: 'roadmap',
        label: 'Lộ trình',
        description: isEn ? 'Chuỗi bài học B1→B2 theo từng Module' : 'Chuỗi bài học 0→N5 theo từng Module',
        icon: GitBranch,
      },
      isEn
        ? {
            id: 'english',
            label: 'Kỹ năng B1→B2',
            description: 'Luyện Reading, Listening, Writing, IPA & Test B2',
            icon: GraduationCap,
          }
        : {
            id: 'japanese',
            label: 'Kana & Kanji',
            description: 'Bảng chữ cái Kana 92 ký tự & 110 chữ Hán N5',
            icon: Languages,
          },
      {
        id: 'vocabulary',
        label: 'Từ vựng',
        description: isEn ? '520 từ vựng B1→B2, họ từ & Flashcards SRS' : '300 từ vựng N5 & Flashcards SRS',
        icon: Layers,
      },
      {
        id: 'practice',
        label: 'Luyện tập',
        description: 'Phòng quiz nhanh: Nghe, Đọc, Ngữ pháp & Từ vựng',
        icon: Sparkles,
      },
      {
        id: 'notes',
        label: 'Ghi chú & AI',
        description: 'Sổ tay ghi chú & Trợ lý AI giải đáp bài học',
        icon: NotebookPen,
      },
    ],
    [isEn]
  );

  const sidebarItems: {
    id: NavSection;
    label: string;
    description: string;
    icon: React.ComponentType<{ className?: string }>;
  }[] = useMemo(
    () => [
      {
        id: 'home',
        label: 'Trang chủ',
        description: 'Bảng điều khiển tiến độ & mục tiêu hôm nay',
        icon: Home,
      },
      {
        id: 'roadmap',
        label: isEn ? 'Lộ trình Tiếng Anh' : 'Lộ trình Tiếng Nhật',
        description: isEn ? '13 bài học Tiếng Anh phân chia theo Module' : 'Lộ trình từ 0 lên JLPT N5',
        icon: GitBranch,
      },
      isEn
        ? {
            id: 'english',
            label: 'Trung tâm Tiếng Anh B2',
            description: 'Tổng quan 8 Module & kỹ năng Nghe – Nói – Đọc – Viết',
            icon: GraduationCap,
          }
        : {
            id: 'japanese',
            label: 'Bảng Kana & Kanji N5',
            description: 'Học mặt chữ Hiragana, Katakana & 110 Kanji N5',
            icon: Languages,
          },
      ...(isEn
        ? [
            {
              id: 'english_ipa' as NavSection,
              label: 'Phiên âm IPA (44 âm)',
              description: 'Bảng 44 âm chuẩn, khẩu hình & luyện nghe cặp âm',
              icon: AudioLines,
            },
            {
              id: 'english_reading' as NavSection,
              label: 'Đọc hiểu dài (Reading)',
              description: '9 bài đọc dài về Email, Sự kiện & Chủ đề B2',
              icon: Newspaper,
            },
          ]
        : [
            {
              id: 'japanese_pronunciation' as NavSection,
              label: 'Phát âm & Nhịp phách',
              description: 'Âm đặc biệt, Biến âm (゛゜), Yōon, Trường âm & Âm ngắt っ',
              icon: AudioLines,
            },
            {
              id: 'japanese_reading' as NavSection,
              label: 'Đọc hiểu dài (Reading N5)',
              description: '8 bài đọc dài LINE, Email, Thông báo & Văn hóa Nhật',
              icon: Newspaper,
            },
          ]),
      {
        id: 'vocabulary',
        label: isEn ? 'Từ vựng Anh B1→B2' : 'Từ vựng Nhật N5',
        description: 'Phân loại theo chủ đề, họ từ (N/V/Adj/Adv) & SRS',
        icon: Layers,
      },
      {
        id: 'practice',
        label: 'Phòng luyện tập',
        description: 'Luyện nghe, đọc hiểu, ngữ pháp theo phiên ngắn',
        icon: BookOpen,
      },
      {
        id: 'analytics',
        label: 'Tiến độ & Phân tích',
        description: 'Biểu đồ XP, thời gian học & điểm mạnh/yếu',
        icon: BarChart3,
      },
      {
        id: 'notes',
        label: 'Ghi chú & Trợ lý AI',
        description: 'Lưu ghi chú học tập & hỏi đáp ngữ pháp với AI',
        icon: NotebookPen,
      },
      {
        id: 'settings',
        label: 'Cài đặt',
        description: 'Mục tiêu phút/ngày, tốc độ đọc & chế độ mở khóa',
        icon: Settings,
      },
    ],
    [isEn]
  );

  const xpGoal = state.settings.dailyXpGoal || 50;
  const xpPct = Math.min(100, Math.round((todayXP / xpGoal) * 100));
  const ringRadius = 13;
  const ringCircumference = 2 * Math.PI * ringRadius;
  const ringOffset = ringCircumference - (xpPct / 100) * ringCircumference;

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setSearchOpen((v) => !v);
      }
      if (e.key === 'Escape') {
        setSearchOpen(false);
        setNotifOpen(false);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  useEffect(() => {
    if (!notifOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setNotifOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [notifOpen]);

  // Scoped search strictly to activeLanguage!
  const searchResults = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    const langLessons = ALL_LESSONS.filter((l) => l.language === activeLanguage);
    const langVocab = state.vocabItems.filter((v) => v.language === activeLanguage);

    if (!q) {
      return {
        lessons: langLessons.slice(0, 4),
        vocab: langVocab.slice(0, 4),
        kanji: activeLanguage === 'jp' ? KANJI_N5_ITEMS.slice(0, 4) : [],
        readings:
          activeLanguage === 'en'
            ? ENGLISH_LONG_READINGS.slice(0, 3)
            : JAPANESE_LONG_READINGS.slice(0, 3),
      };
    }
    return {
      lessons: langLessons
        .filter(
          (l) =>
            l.title.toLowerCase().includes(q) ||
            l.objectiveVi.toLowerCase().includes(q) ||
            (l.subtitle || '').toLowerCase().includes(q)
        )
        .slice(0, 6),
      vocab: langVocab
        .filter(
          (v) =>
            v.word.toLowerCase().includes(q) ||
            v.meaningVi.toLowerCase().includes(q) ||
            (v.romaji || '').toLowerCase().includes(q)
        )
        .slice(0, 6),
      kanji:
        activeLanguage === 'jp'
          ? KANJI_N5_ITEMS.filter(
              (k) =>
                k.char.includes(q) ||
                k.sinoVi.toLowerCase().includes(q) ||
                k.meaningVi.toLowerCase().includes(q)
            ).slice(0, 6)
          : [],
      readings:
        activeLanguage === 'en'
          ? ENGLISH_LONG_READINGS.filter(
              (r) =>
                r.title.toLowerCase().includes(q) ||
                r.subtitleVi.toLowerCase().includes(q) ||
                r.tags.some((t) => t.toLowerCase().includes(q))
            ).slice(0, 4)
          : JAPANESE_LONG_READINGS.filter(
              (r) =>
                r.title.toLowerCase().includes(q) ||
                r.titleVi.toLowerCase().includes(q) ||
                r.subtitleVi.toLowerCase().includes(q)
            ).slice(0, 4),
    };
  }, [searchQuery, state.vocabItems, activeLanguage]);

  const notifications = [
    {
      id: 'n1',
      title: isEn ? 'Không gian Tiếng Anh (B1→B2)' : 'Không gian Tiếng Nhật (0→N5)',
      body: isEn
        ? `Mục tiêu: ${state.settings.dailyEnglishMinutes} phút/ngày • Tiến độ: ${langStats.completedLessons}/${langStats.totalLessons} bài.`
        : `Mục tiêu: ${state.settings.dailyJapaneseMinutes} phút/ngày • Tiến độ: ${langStats.completedLessons}/${langStats.totalLessons} bài.`,
    },
    {
      id: 'n2',
      title: 'Tách biệt hai luồng học',
      body: 'Bạn đang bật chế độ tách riêng Tiếng Anh và Tiếng Nhật. Dùng nút chuyển đổi trên thanh đen để đổi ngôn ngữ.',
    },
  ];

  return (
    <div className="min-h-screen bg-[#08090D] p-0 sm:p-2.5 lg:p-3.5">
      <div className="mx-auto max-w-[1440px]">
        {/* Top Black Navigation Bar */}
        <header className="relative z-40 flex flex-wrap items-center justify-between gap-2 px-4 py-3 text-white sm:px-6">
          {/* Left: Mascot + Brand + DEDICATED LANGUAGE WORKSPACE SWITCHER */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => onNavigate('home')}
              className="flex items-center gap-2 text-left group"
            >
              <MascotAvatar size={34} className="transition group-hover:scale-105" />
              <span className="text-lg font-extrabold tracking-tight text-white">MeowLanguage</span>
            </button>

            {/* Isolated Workspace Language Switcher */}
            <div
              className="inline-flex items-center rounded-full bg-white/10 p-1 border border-white/10"
              role="group"
              aria-label="Chọn không gian ngôn ngữ"
            >
              <button
                type="button"
                onClick={() => onSwitchLanguage('en')}
                className={`rounded-full px-3 py-1 text-xs font-extrabold transition ${
                  isEn
                    ? 'bg-[#D7ECF9] text-[#1A4F73] shadow-sm'
                    : 'text-white/65 hover:text-white'
                }`}
              >
                🇬🇧 Tiếng Anh
              </button>
              <button
                type="button"
                onClick={() => onSwitchLanguage('jp')}
                className={`rounded-full px-3 py-1 text-xs font-extrabold transition ${
                  !isEn
                    ? 'bg-[#E5D9F7] text-[#4B2C7A] shadow-sm'
                    : 'text-white/65 hover:text-white'
                }`}
              >
                🇯🇵 Tiếng Nhật
              </button>
            </div>
          </div>

          {/* Center Nav Icons + Active Label */}
          <nav className="hidden lg:flex items-center gap-1">
            {topNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeNav === item.id;
              return (
                <HoverTooltip
                  key={item.id}
                  label={item.label}
                  description={item.description}
                  placement="bottom"
                >
                  <button
                    type="button"
                    onClick={() => onNavigate(item.id)}
                    className={`relative flex items-center gap-2 rounded-full px-3.5 py-2 text-xs xl:text-sm font-semibold transition ${
                      isActive
                        ? 'bg-white/15 text-white'
                        : 'text-white/60 hover:bg-white/8 hover:text-white'
                    }`}
                    aria-label={item.label}
                  >
                    <Icon className="h-4 w-4" />
                    {isActive && <span>{item.label}</span>}
                  </button>
                </HoverTooltip>
              );
            })}
          </nav>

          {/* Right: Search + Streak + XP Ring + User + Mobile Menu */}
          <div className="flex items-center gap-2.5">
            <HoverTooltip
              label="Tìm kiếm nhanh (⌘K)"
              description={isEn ? 'Tìm bài học, bài đọc dài & từ vựng Tiếng Anh' : 'Tìm bài học, Kana, Kanji & từ vựng Tiếng Nhật'}
              placement="bottom"
            >
              <button
                type="button"
                onClick={() => setSearchOpen(true)}
                className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 text-xs font-medium text-white/80 hover:bg-white/15"
              >
                <Search className="h-3.5 w-3.5" />
                <span className="hidden xl:inline">{isEn ? 'Tìm bài Anh' : 'Tìm bài Nhật'}</span>
                <kbd className="rounded bg-white/15 px-1.5 py-0.5 text-[10px]">⌘K</kbd>
              </button>
            </HoverTooltip>

            <HoverTooltip
              label={`Chuỗi học ${state.streakDays} ngày`}
              description="Số ngày học liên tục • Bấm để xem Thống kê"
              placement="bottom"
            >
              <button
                type="button"
                onClick={() => onNavigate('analytics')}
                className="inline-flex items-center gap-1.5 rounded-full bg-white/8 px-3 py-1.5 text-xs font-bold text-white hover:bg-white/14"
              >
                <Flame className={`h-4 w-4 ${state.streakDays > 0 ? 'text-amber-400' : 'text-white/50'}`} />
                <span>{state.streakDays}</span>
              </button>
            </HoverTooltip>

            <HoverTooltip
              label={`Tiến độ XP hôm nay (${todayXP}/${xpGoal} XP)`}
              description={`Đang ở Cấp ${userLevel} • Bấm để xem chi tiết phân tích`}
              placement="bottom"
            >
              <button
                type="button"
                onClick={() => onNavigate('analytics')}
                className="flex items-center gap-2 rounded-full bg-white/8 pr-3 pl-1.5 py-1 hover:bg-white/14 transition"
              >
                <svg width="30" height="30" className="-rotate-90">
                  <circle
                    cx="15"
                    cy="15"
                    r={ringRadius}
                    stroke="rgba(255,255,255,0.16)"
                    strokeWidth="3"
                    fill="none"
                  />
                  <circle
                    cx="15"
                    cy="15"
                    r={ringRadius}
                    stroke={isEn ? '#D7ECF9' : '#E5D9F7'}
                    strokeWidth="3"
                    fill="none"
                    strokeDasharray={ringCircumference}
                    strokeDashoffset={ringOffset}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="text-left leading-tight">
                  <div className="text-xs font-extrabold text-white">Cấp {userLevel}</div>
                  <div className="text-[10px] text-white/60">
                    {todayXP}/{xpGoal} XP
                  </div>
                </div>
              </button>
            </HoverTooltip>

            {authUser && onLogout && (
              <HoverTooltip
                label={`Tài khoản: ${authUser.name}`}
                description={authUser.isGuest ? 'Đang học chế độ Khách • Bấm Đăng xuất để đăng nhập' : `${authUser.email} • Bấm để đăng xuất`}
                placement="bottom"
              >
                <div className="hidden sm:flex items-center gap-1.5 rounded-full bg-white/8 pl-2.5 pr-1 py-1 border border-white/10">
                  <span className="max-w-[100px] truncate text-xs font-bold text-white/90">
                    {authUser.name}
                  </span>
                  <button
                    type="button"
                    onClick={onLogout}
                    className="inline-flex items-center gap-1 rounded-full bg-white/12 px-2.5 py-1 text-[11px] font-bold text-white/85 hover:bg-[#F7DCE1] hover:text-[#7D233B] transition"
                  >
                    <LogOut className="h-3 w-3" />
                    <span className="hidden xl:inline">Đăng xuất</span>
                  </button>
                </div>
              </HoverTooltip>
            )}

            <button
              type="button"
              onClick={() => setMobileMenuOpen((v) => !v)}
              className="inline-flex lg:hidden rounded-full bg-white/10 p-2 text-white"
              aria-label="Menu"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </header>

        {/* Mobile Drawer Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#12141C] text-white px-4 py-3 space-y-1 border-t border-white/10">
            {sidebarItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    onNavigate(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold ${
                    activeNav === item.id ? 'bg-white text-[#08090D]' : 'text-white/80 hover:bg-white/10'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </button>
              );
            })}
            {authUser && onLogout && (
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onLogout();
                }}
                className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-[#F7DCE1] hover:bg-white/10"
              >
                <LogOut className="h-4 w-4" />
                <span>Đăng xuất ({authUser.name})</span>
              </button>
            )}
          </div>
        )}

        {/* Warm Off-White Main Workspace Shell */}
        <div className="relative min-h-[calc(100vh-84px)] rounded-t-[24px] sm:rounded-[30px] bg-[#F6F6F4] px-3 py-4 sm:px-6 sm:py-6 pb-24">
          {/* Subtle Active Workspace Indicator Strip */}
          <div className="mb-4 flex flex-wrap items-center justify-between gap-2 rounded-2xl border border-black/5 bg-white/75 px-4 py-2 text-xs">
            <div className="flex items-center gap-2">
              <span
                className={`h-2.5 w-2.5 rounded-full ${isEn ? 'bg-[#4BA0D8]' : 'bg-[#8E62D9]'}`}
              />
              <span className="font-bold text-[#08090D]">
                {isEn
                  ? 'Đang ở không gian học: 🇬🇧 Tiếng Anh (CEFR B1 → B2)'
                  : 'Đang ở không gian học: 🇯🇵 Tiếng Nhật (Mới bắt đầu → JLPT N5)'}
              </span>
              <span className="hidden sm:inline text-black/50">
                • Toàn bộ bài học, từ vựng & thống kê được tách riêng để tránh nhầm lẫn.
              </span>
            </div>
            <button
              type="button"
              onClick={() => onSwitchLanguage(isEn ? 'jp' : 'en')}
              className="rounded-full bg-[#EEEEEB] px-3 py-1 text-[11px] font-bold text-[#08090D] hover:bg-[#E2E2DE]"
            >
              Chuyển sang {isEn ? '🇯🇵 Tiếng Nhật' : '🇬🇧 Tiếng Anh'} →
            </button>
          </div>

          <div className="flex items-start gap-4 lg:gap-5">
            {/* Compact Expandable Left Icon Sidebar */}
            <aside
              className={`relative z-40 hidden md:flex flex-col justify-between shrink-0 transition-[width] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                sidebarExpanded ? 'w-56' : 'w-[50px]'
              }`}
            >
              <div className="sticky top-5 z-40 space-y-2">
                <HoverTooltip
                  label={sidebarExpanded ? 'Thu gọn thanh bên (<<)' : 'Mở rộng menu (>>)'}
                  description="Hiện hoặc ẩn tên chữ đầy đủ của tất cả các mục bên trái"
                  placement="right"
                  disabled={sidebarExpanded}
                  className="w-full"
                >
                  <button
                    type="button"
                    onClick={() => setSidebarExpanded((v) => !v)}
                    className="flex h-10 w-full items-center justify-start rounded-full border border-black/10 bg-white px-[16px] text-[#08090D] shadow-sm transition-colors hover:bg-[#EEEEEB]"
                    aria-label={sidebarExpanded ? 'Thu gọn thanh bên' : 'Mở rộng menu'}
                  >
                    {sidebarExpanded ? (
                      <ChevronsLeft className="h-4 w-4 shrink-0" />
                    ) : (
                      <ChevronsRight className="h-4 w-4 shrink-0" />
                    )}
                    <span
                      className={`overflow-hidden whitespace-nowrap text-left text-xs font-bold transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                        sidebarExpanded ? 'ml-2.5 max-w-[155px] opacity-100' : 'ml-0 max-w-0 opacity-0'
                      }`}
                    >
                      {isEn ? 'Thu gọn menu' : 'Thu gọn menu'}
                    </span>
                  </button>
                </HoverTooltip>

                <div className="rounded-[24px] border border-black/10 bg-white p-1.5 shadow-sm space-y-1">
                  {sidebarItems.map((item) => {
                    const Icon = item.icon;
                    const active = activeNav === item.id;
                    return (
                      <HoverTooltip
                        key={item.id}
                        label={item.label}
                        description={item.description}
                        placement="right"
                        disabled={sidebarExpanded}
                        className="w-full"
                      >
                        <button
                          type="button"
                          onClick={() => onNavigate(item.id)}
                          aria-label={item.label}
                          className={`flex h-9 w-full items-center justify-start rounded-full px-[10px] text-xs font-bold transition-colors ${
                            active
                              ? 'bg-[#08090D] text-white'
                              : 'text-black/65 hover:bg-[#F6F6F4] hover:text-[#08090D]'
                          }`}
                        >
                          <Icon className="h-4 w-4 shrink-0" />
                          <span
                            className={`overflow-hidden whitespace-nowrap truncate transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                              sidebarExpanded
                                ? 'ml-2.5 max-w-[160px] opacity-100'
                                : 'ml-0 max-w-0 opacity-0'
                            }`}
                          >
                            {item.label}
                          </span>
                        </button>
                      </HoverTooltip>
                    );
                  })}
                </div>

                <div className="relative" ref={notifRef}>
                  <HoverTooltip
                    label="Thông báo & Nhắc học"
                    description="Xem tiến độ không gian học & trạng thái tách luồng"
                    placement="right"
                    disabled={sidebarExpanded || notifOpen}
                    className="w-full"
                  >
                    <button
                      type="button"
                      onClick={() => setNotifOpen((v) => !v)}
                      aria-expanded={notifOpen}
                      className={`flex h-10 w-full items-center justify-start rounded-full border px-[16px] shadow-sm transition-colors ${
                        notifOpen
                          ? 'border-[#08090D] bg-[#08090D] text-white'
                          : 'border-black/10 bg-white text-black/70 hover:bg-[#EEEEEB]'
                      }`}
                      aria-label="Thông báo"
                    >
                      <Bell className="h-4 w-4 shrink-0" />
                      <span
                        className={`overflow-hidden whitespace-nowrap text-xs font-bold transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                          sidebarExpanded ? 'ml-2.5 max-w-[140px] opacity-100' : 'ml-0 max-w-0 opacity-0'
                        }`}
                      >
                        Thông báo
                      </span>
                    </button>
                  </HoverTooltip>

                  {notifOpen && (
                    <div className="absolute bottom-0 left-full ml-3 z-50 w-72 sm:w-80 rounded-2xl border border-black/15 bg-white p-4 shadow-2xl space-y-2.5">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-extrabold uppercase tracking-wider text-black/50">
                          Thông báo
                        </span>
                        <button
                          type="button"
                          onClick={() => setNotifOpen(false)}
                          className="rounded-full p-1 text-black/50 hover:bg-black/5 hover:text-[#08090D]"
                          aria-label="Đóng thông báo"
                        >
                          <X className="h-3.5 w-3.5" />
                        </button>
                      </div>
                      {notifications.map((n) => (
                        <div key={n.id} className="rounded-xl bg-[#F6F6F4] p-3 text-xs">
                          <p className="font-bold text-[#08090D]">{n.title}</p>
                          <p className="mt-0.5 text-black/65">{n.body}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </aside>

            <main className="min-w-0 flex-1">{children}</main>
          </div>

          {/* Floating Bottom Quick-Dock strictly tailored to the Active Language! */}
          <div className="fixed bottom-4 left-1/2 z-30 -translate-x-1/2">
            <div className="flex items-center gap-1.5 rounded-full bg-[#111319]/95 px-2.5 py-2 shadow-dock backdrop-blur-md border border-white/10">
              <HoverTooltip
                label={isEn ? 'Tìm nhanh Tiếng Anh (⌘K)' : 'Tìm nhanh Tiếng Nhật (⌘K)'}
                description="Tra bài học, từ vựng & bài đọc ngay"
                placement="top"
              >
                <button
                  type="button"
                  onClick={() => setSearchOpen(true)}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-[#E5D9F7] text-[#4B2C7A] transition hover:scale-110"
                >
                  <Search className="h-4 w-4" />
                </button>
              </HoverTooltip>

              <HoverTooltip
                label={isEn ? 'Từ vựng Tiếng Anh B1→B2' : 'Từ vựng Tiếng Nhật N5'}
                description="Mở Flashcards SRS & tra cứu họ từ"
                placement="top"
              >
                <button
                  type="button"
                  onClick={() => onNavigate('vocabulary')}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-[#D7ECF9] text-[#1A4F73] transition hover:scale-110"
                >
                  <Layers className="h-4 w-4" />
                </button>
              </HoverTooltip>

              {isEn ? (
                <HoverTooltip
                  label="Trung tâm Kỹ năng B1→B2"
                  description="Luyện IPA, Reading, Listening & Writing"
                  placement="top"
                >
                  <button
                    type="button"
                    onClick={() => onNavigate('english')}
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-[#F7DCE1] text-xs font-extrabold text-[#7D233B] transition hover:scale-110"
                  >
                    B2
                  </button>
                </HoverTooltip>
              ) : (
                <>
                  <HoverTooltip
                    label="Bảng chữ cái Kana"
                    description="Học 92 chữ Hiragana & Katakana"
                    placement="top"
                  >
                    <button
                      type="button"
                      onClick={() => onNavigate('japanese', 'kana')}
                      className="flex h-9 w-9 items-center justify-center rounded-full bg-[#F7DCE1] font-jp text-sm font-extrabold text-[#7D233B] transition hover:scale-110"
                    >
                      あ
                    </button>
                  </HoverTooltip>
                  <HoverTooltip
                    label="Bảng 110 chữ Hán Kanji N5"
                    description="Âm On/Kun, Hán Việt & từ ghép"
                    placement="top"
                  >
                    <button
                      type="button"
                      onClick={() => onNavigate('japanese', 'kanji')}
                      className="flex h-9 w-9 items-center justify-center rounded-full bg-[#F6E9B2] font-jp text-sm font-extrabold text-[#6B4F0A] transition hover:scale-110"
                    >
                      漢
                    </button>
                  </HoverTooltip>
                </>
              )}

              <HoverTooltip
                label="Ghi chú & Trợ lý AI"
                description="Sổ tay ghi chú và hỏi đáp nhanh"
                placement="top"
              >
                <button
                  type="button"
                  onClick={() => onNavigate('notes')}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-[#D2EED9] text-[#1B5C32] transition hover:scale-110"
                >
                  <NotebookPen className="h-4 w-4" />
                </button>
              </HoverTooltip>

              <HoverTooltip
                label="Phòng luyện tập nhanh"
                description="Luyện nghe, đọc hiểu và ngữ pháp"
                placement="top"
              >
                <button
                  type="button"
                  onClick={() => onNavigate('practice')}
                  className="hidden sm:flex h-9 w-9 items-center justify-center rounded-full bg-[#F6E9B2] text-[#6B4F0A] transition hover:scale-110"
                >
                  <Volume2 className="h-4 w-4" />
                </button>
              </HoverTooltip>

              <HoverTooltip
                label={`Học tiếp: ${resumeLesson.title}`}
                description="Mở ngay bài học đang dở hoặc kế tiếp"
                placement="top"
              >
                <button
                  type="button"
                  onClick={() => onStartLesson(resumeLesson)}
                  className="ml-1 inline-flex items-center gap-1.5 rounded-full bg-white px-3.5 py-2 text-xs font-extrabold text-[#08090D] transition hover:bg-[#D2EED9]"
                >
                  <Play className="h-3.5 w-3.5 fill-current" />
                  <span className="hidden sm:inline">
                    {isEn ? 'Học tiếp EN' : 'Học tiếp JP'}
                  </span>
                </button>
              </HoverTooltip>
            </div>
          </div>
        </div>
      </div>

      {/* Scoped Search Modal (⌘K) */}
      {searchOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/50 px-4 pt-16 backdrop-blur-sm">
          <div className="w-full max-w-xl rounded-[24px] border border-black/10 bg-white p-5 shadow-2xl space-y-4">
            <div className="flex items-center justify-between text-xs font-bold text-black/55">
              <span>
                Đang tìm trong: {isEn ? '🇬🇧 Tiếng Anh B1→B2' : '🇯🇵 Tiếng Nhật 0→N5'}
              </span>
              <button
                type="button"
                onClick={() => onSwitchLanguage(isEn ? 'jp' : 'en')}
                className="underline hover:text-[#08090D]"
              >
                Đổi sang tìm {isEn ? 'Tiếng Nhật' : 'Tiếng Anh'}
              </button>
            </div>

            <div className="flex items-center gap-2.5 rounded-2xl bg-[#F6F6F4] px-4 py-3">
              <Search className="h-4 w-4 text-black/50" />
              <input
                type="text"
                autoFocus
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={
                  isEn
                    ? 'Tìm bài học B1→B2, collocation, từ vựng tiếng Anh...'
                    : 'Tìm bài học N5, chữ Hán Kanji, từ vựng tiếng Nhật...'
                }
                className="w-full bg-transparent text-sm font-medium text-[#08090D] outline-none"
              />
              <button
                type="button"
                onClick={() => setSearchOpen(false)}
                className="rounded-full p-1 hover:bg-black/10"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="max-h-[60vh] overflow-y-auto space-y-4">
              <div>
                <p className="mb-1.5 text-[11px] font-bold uppercase tracking-wider text-black/45">
                  Bài học ({searchResults.lessons.length})
                </p>
                <div className="space-y-1.5">
                  {searchResults.lessons.map((l) => (
                    <button
                      key={l.id}
                      type="button"
                      onClick={() => {
                        setSearchOpen(false);
                        onStartLesson(l);
                      }}
                      className="flex w-full items-center justify-between rounded-xl bg-[#F6F6F4] px-3.5 py-2.5 text-left hover:bg-[#EEEEEB]"
                    >
                      <div>
                        <span className="text-sm font-bold text-[#08090D]">{l.title}</span>
                        <p className="text-xs text-black/55 line-clamp-1">{l.objectiveVi}</p>
                      </div>
                      <ChevronRight className="h-4 w-4 text-black/40 shrink-0" />
                    </button>
                  ))}
                </div>
              </div>

              {searchResults.readings.length > 0 && (
                <div>
                  <p className="mb-1.5 text-[11px] font-bold uppercase tracking-wider text-black/45">
                    {isEn ? 'Bài đọc dài B1+ → B2' : 'Bài đọc dài Tiếng Nhật N5'} ({searchResults.readings.length})
                  </p>
                  <div className="space-y-1.5">
                    {searchResults.readings.map((r) => (
                      <button
                        key={r.id}
                        type="button"
                        onClick={() => {
                          setSearchOpen(false);
                          onNavigate(isEn ? 'english_reading' : 'japanese_reading');
                        }}
                        className={`flex w-full items-center justify-between rounded-xl px-3.5 py-2.5 text-left ${
                          isEn
                            ? 'bg-[#D7ECF9]/45 hover:bg-[#D7ECF9]'
                            : 'bg-[#E5D9F7]/45 hover:bg-[#E5D9F7]'
                        }`}
                      >
                        <div>
                          <span className="text-sm font-bold text-[#08090D]">{r.title}</span>
                          <p className="text-xs text-black/55 line-clamp-1">
                            {r.categoryLabelVi} • {r.level} • ~{r.readMinutes} phút
                          </p>
                        </div>
                        <ChevronRight className="h-4 w-4 text-black/40 shrink-0" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {searchResults.kanji.length > 0 && (
                <div>
                  <p className="mb-1.5 text-[11px] font-bold uppercase tracking-wider text-black/45">
                    Chữ Hán N5 ({searchResults.kanji.length})
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    {searchResults.kanji.map((k) => (
                      <button
                        key={k.char}
                        type="button"
                        onClick={() => {
                          speakText(k.example, 'ja-JP', state.settings.speechRate);
                          setSearchOpen(false);
                          onNavigate('japanese', 'kanji');
                        }}
                        className="flex items-center gap-2.5 rounded-xl border border-black/10 p-2.5 text-left hover:bg-[#F6E9B2]/45"
                      >
                        <span className="font-jp text-2xl font-bold text-[#08090D]">{k.char}</span>
                        <div>
                          <div className="text-xs font-bold text-[#08090D]">{k.sinoVi}</div>
                          <div className="text-[11px] text-black/60">{k.meaningVi}</div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {searchResults.vocab.length > 0 && (
                <div>
                  <p className="mb-1.5 text-[11px] font-bold uppercase tracking-wider text-black/45">
                    Từ vựng ({searchResults.vocab.length})
                  </p>
                  <div className="space-y-1.5">
                    {searchResults.vocab.map((v) => (
                      <div
                        key={v.id}
                        className="flex items-center justify-between rounded-xl border border-black/10 px-3.5 py-2"
                      >
                        <div>
                          <span className="font-jp text-sm font-bold text-[#08090D]">{v.word}</span>
                          <span className="ml-2 text-xs text-black/50">{v.reading}</span>
                          <p className="text-xs text-black/70">{v.meaningVi}</p>
                        </div>
                        <button
                          type="button"
                          onClick={() =>
                            speakText(v.word, v.language === 'jp' ? 'ja-JP' : 'en-US', state.settings.speechRate)
                          }
                          className="rounded-full bg-[#EEEEEB] p-2 hover:bg-[#E2E2DE]"
                        >
                          <Volume2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
