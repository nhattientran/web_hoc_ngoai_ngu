import React, { useMemo } from 'react';
import { Award, BarChart3, Flame, Lock, Sparkles, TrendingUp } from 'lucide-react';
import { ALL_LESSONS, useLearning } from '../../context/LearningContext';
import { BADGE_DEFINITIONS } from '../../data/badges';
import { Language, LessonData } from '../../types';
import { formatShortViDate, getPastNDaysISO } from '../../utils/date';
import { PASTEL_STYLES } from '../common/PastelTokens';

interface Props {
  activeLanguage: Language;
  onStartLesson: (lesson: LessonData) => void;
}

export const AnalyticsView: React.FC<Props> = ({ activeLanguage, onStartLesson }) => {
  const { state, userLevel, getLanguageStats } = useLearning();
  const selectedLang = activeLanguage;
  const isEn = selectedLang === 'en';

  const activeStats = getLanguageStats(selectedLang);
  const skillData = state.skillStats[selectedLang];

  const last7Days = useMemo(() => getPastNDaysISO(7), []);
  const weeklyData = useMemo(
    () =>
      last7Days.map((d) => {
        const log = state.studyLogs[d];
        return {
          date: d,
          label: formatShortViDate(d).split(',')[0],
          langMin: isEn ? log?.englishMinutes || 0 : log?.japaneseMinutes || 0,
          vocabMin: log?.vocabMinutes || 0,
          quizAcc:
            log && log.quizTotal > 0 ? Math.round((log.quizCorrect / log.quizTotal) * 100) : null,
        };
      }),
    [last7Days, state.studyLogs, isEn]
  );

  const maxMinutes = Math.max(
    45,
    ...weeklyData.map((d) => d.langMin + d.vocabMin)
  );

  const skillComparison = [
    {
      label: 'Đọc hiểu (Reading)',
      pct:
        skillData.reading.total > 0
          ? Math.round((skillData.reading.correct / skillData.reading.total) * 100)
          : 0,
      count: `${skillData.reading.correct}/${skillData.reading.total}`,
      color: '#D2EED9',
      bar: '#3BA962',
    },
    {
      label: 'Nghe hiểu (Listening)',
      pct:
        skillData.listening.total > 0
          ? Math.round((skillData.listening.correct / skillData.listening.total) * 100)
          : 0,
      count: `${skillData.listening.correct}/${skillData.listening.total}`,
      color: '#F7DCE1',
      bar: '#DC5F80',
    },
    {
      label: 'Ngữ pháp (Grammar)',
      pct:
        skillData.grammar.total > 0
          ? Math.round((skillData.grammar.correct / skillData.grammar.total) * 100)
          : 0,
      count: `${skillData.grammar.correct}/${skillData.grammar.total}`,
      color: '#E5D9F7',
      bar: '#8E62D9',
    },
    {
      label: 'Từ vựng (Vocabulary)',
      pct:
        skillData.vocabulary.total > 0
          ? Math.round((skillData.vocabulary.correct / skillData.vocabulary.total) * 100)
          : 0,
      count: `${skillData.vocabulary.correct}/${skillData.vocabulary.total}`,
      color: '#F6E9B2',
      bar: '#D9A726',
    },
    {
      label: 'Viết (Writing)',
      pct: skillData.writing.completed > 0 ? skillData.writing.avgScore : 0,
      count: `${skillData.writing.completed} bài`,
      color: '#D7ECF9',
      bar: '#4BA0D8',
    },
    {
      label: 'Nói (Speaking)',
      pct: skillData.speaking.completed > 0 ? skillData.speaking.avgScore : 0,
      count: `${skillData.speaking.completed} bài`,
      color: '#F7DCE1',
      bar: '#DC5F80',
    },
  ];

  // Vocabulary SRS Growth Distribution
  const langVocab = state.vocabItems.filter((v) => v.language === selectedLang);
  const vocabDist = {
    new: langVocab.filter((v) => v.srsState === 'new').length,
    learning: langVocab.filter((v) => v.srsState === 'learning').length,
    reviewing: langVocab.filter((v) => v.srsState === 'reviewing').length,
    mastered: langVocab.filter((v) => v.srsState === 'mastered').length,
  };

  // Personalized revision recommendations based on weak tags
  const recommendedReviewLessons = useMemo(() => {
    const weakSet = new Set(activeStats.weakTags);
    return ALL_LESSONS.filter(
      (l) =>
        l.language === selectedLang &&
        (state.lessonProgress[l.id]?.weakTags?.length || 0) > 0 &&
        state.lessonProgress[l.id]?.weakTags.some((w) => weakSet.has(w))
    );
  }, [activeStats.weakTags, selectedLang, state.lessonProgress]);

  return (
    <div className="space-y-5">
      {/* Header + Language Switch */}
      <div className="rounded-[26px] border border-black/10 bg-white p-5 sm:p-7 shadow-soft space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-extrabold text-[#08090D]">
              Tiến độ & Phân tích {isEn ? 'Tiếng Anh (B1→B2)' : 'Tiếng Nhật (0→N5)'}
            </h1>
            <p className="text-sm text-black/60">
              Số liệu phản ánh trực tiếp từ bài học, bài tập, thẻ SRS và bài đánh giá {isEn ? 'Tiếng Anh' : 'Tiếng Nhật'}.
            </p>
          </div>
          <span
            className={`rounded-full px-4 py-2 text-xs font-extrabold ${
              isEn ? 'bg-[#D7ECF9] text-[#1A4F73]' : 'bg-[#E5D9F7] text-[#4B2C7A]'
            }`}
          >
            {isEn ? '🇬🇧 Tiếng Anh (B1→B2)' : '🇯🇵 Tiếng Nhật (0→N5)'}
          </span>
        </div>

        {/* Top KPI Cards */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <div className="rounded-2xl bg-[#F6F6F4] p-4">
            <div className="text-xs font-semibold text-black/55">Năng lực ước tính</div>
            <div className="mt-1 text-2xl font-extrabold text-[#08090D]">
              {activeStats.estimatedProficiencyPct}%
            </div>
            <div className="text-[11px] text-black/50">Kết hợp lộ trình + điểm kiểm tra</div>
          </div>
          <div className="rounded-2xl bg-[#D2EED9]/65 p-4">
            <div className="text-xs font-semibold text-[#1B5C32]">Bài học hoàn thành</div>
            <div className="mt-1 text-2xl font-extrabold text-[#08090D]">
              {activeStats.completedLessons}/{activeStats.totalLessons}
            </div>
            <div className="text-[11px] text-[#1B5C32]/80">Hoàn thành {activeStats.completionPct}%</div>
          </div>
          <div className="rounded-2xl bg-[#D7ECF9]/65 p-4">
            <div className="text-xs font-semibold text-[#1A4F73]">Điểm trung bình quiz</div>
            <div className="mt-1 text-2xl font-extrabold text-[#08090D]">
              {activeStats.avgQuizScore > 0 ? `${activeStats.avgQuizScore}%` : '—'}
            </div>
            <div className="text-[11px] text-[#1A4F73]/80">Dựa trên bài đã chấm</div>
          </div>
          <div className="rounded-2xl bg-[#F6E9B2]/75 p-4">
            <div className="text-xs font-semibold text-[#6B4F0A]">Tổng XP & Cấp độ</div>
            <div className="mt-1 text-2xl font-extrabold text-[#08090D]">
              Cấp {userLevel} ({state.xp} XP)
            </div>
            <div className="text-[11px] text-[#6B4F0A]/80">Chuỗi hiện tại: {state.streakDays} ngày</div>
          </div>
        </div>

        {/* Charts Row: Weekly Study Time + Skill Breakdown */}
        <div className="grid gap-5 lg:grid-cols-2">
          {/* Weekly Study Time Stacked Bar Chart (SVG/Flex) */}
          <div className="rounded-[22px] border border-black/10 bg-[#FBFBFA] p-5 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <BarChart3 className="h-4 w-4 text-[#08090D]" />
                <h2 className="text-base font-extrabold text-[#08090D]">Thời gian học 7 ngày gần đây</h2>
              </div>
              <div className="flex items-center gap-2 text-[11px] font-semibold">
                <span className="inline-flex items-center gap-1">
                  <span className={`h-2.5 w-2.5 rounded-full ${isEn ? 'bg-[#4BA0D8]' : 'bg-[#8E62D9]'}`} />{' '}
                  {isEn ? 'Tiếng Anh' : 'Tiếng Nhật'}
                </span>
                <span className="inline-flex items-center gap-1">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#D9A726]" /> Từ vựng
                </span>
              </div>
            </div>

            <div className="grid grid-cols-7 items-end gap-2 h-44 pt-4">
              {weeklyData.map((d) => {
                const total = d.langMin + d.vocabMin;
                const hPct = Math.round((total / maxMinutes) * 100);
                return (
                  <div key={d.date} className="flex flex-col items-center gap-1.5 h-full justify-end">
                    <span className="text-[10px] font-bold text-black/55">{total > 0 ? `${total}p` : ''}</span>
                    <div
                      className="w-full max-w-[34px] rounded-xl bg-[#EEEEEB] overflow-hidden flex flex-col justify-end"
                      style={{ height: `${Math.max(10, hPct)}%` }}
                      title={`${d.date}: ${isEn ? 'Anh' : 'Nhật'} ${d.langMin}p, Từ ${d.vocabMin}p`}
                    >
                      {total > 0 && (
                        <>
                          <div
                            className="bg-[#D9A726]"
                            style={{ height: `${(d.vocabMin / total) * 100}%` }}
                          />
                          <div
                            className={isEn ? 'bg-[#4BA0D8]' : 'bg-[#8E62D9]'}
                            style={{ height: `${(d.langMin / total) * 100}%` }}
                          />
                        </>
                      )}
                    </div>
                    <span className="text-[11px] font-bold text-black/60">{d.label}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Skill Performance Comparison */}
          <div className="rounded-[22px] border border-black/10 bg-[#FBFBFA] p-5 space-y-3.5">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-[#08090D]" />
              <h2 className="text-base font-extrabold text-[#08090D]">
                Hiệu suất từng kỹ năng ({selectedLang === 'en' ? 'Tiếng Anh' : 'Tiếng Nhật'})
              </h2>
            </div>

            <div className="space-y-3">
              {skillComparison.map((s) => (
                <div key={s.label} className="space-y-1">
                  <div className="flex items-center justify-between text-xs font-bold">
                    <span className="text-[#08090D]">{s.label}</span>
                    <span className="text-black/60">
                      {s.pct}% ({s.count})
                    </span>
                  </div>
                  <div className="h-2.5 w-full overflow-hidden rounded-full bg-[#EEEEEB]">
                    <div
                      className="h-full rounded-full transition-all duration-300"
                      style={{ width: `${s.pct}%`, backgroundColor: s.bar }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Vocabulary Growth + Personalized Recommendations */}
        <div className="grid gap-5 lg:grid-cols-2">
          <div className="rounded-[22px] border border-black/10 bg-[#FBFBFA] p-5 space-y-3">
            <h2 className="text-base font-extrabold text-[#08090D]">Phân bổ vốn từ vựng SRS</h2>
            <div className="grid grid-cols-4 gap-2 text-center">
              <div className="rounded-2xl bg-[#F6E9B2]/75 p-3">
                <div className="text-xl font-extrabold text-[#08090D]">{vocabDist.new}</div>
                <div className="text-[11px] font-semibold text-[#6B4F0A]">Từ mới</div>
              </div>
              <div className="rounded-2xl bg-[#F7DCE1]/75 p-3">
                <div className="text-xl font-extrabold text-[#08090D]">{vocabDist.learning}</div>
                <div className="text-[11px] font-semibold text-[#7D233B]">Đang học</div>
              </div>
              <div className="rounded-2xl bg-[#D7ECF9]/75 p-3">
                <div className="text-xl font-extrabold text-[#08090D]">{vocabDist.reviewing}</div>
                <div className="text-[11px] font-semibold text-[#1A4F73]">Đang ôn</div>
              </div>
              <div className="rounded-2xl bg-[#D2EED9]/75 p-3">
                <div className="text-xl font-extrabold text-[#08090D]">{vocabDist.mastered}</div>
                <div className="text-[11px] font-semibold text-[#1B5C32]">Thành thạo</div>
              </div>
            </div>
          </div>

          <div className="rounded-[22px] border border-black/10 bg-[#FBFBFA] p-5 space-y-3">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-[#08090D]" />
              <h2 className="text-base font-extrabold text-[#08090D]">Đề xuất ôn tập cá nhân hóa</h2>
            </div>
            {recommendedReviewLessons.length > 0 ? (
              <div className="space-y-2">
                <p className="text-xs text-black/65">
                  Phát hiện điểm cần củng cố: <strong>{activeStats.weakTags.join(', ')}</strong>. Bạn nên ôn lại:
                </p>
                {recommendedReviewLessons.map((l) => (
                  <button
                    key={l.id}
                    type="button"
                    onClick={() => onStartLesson(l)}
                    className="flex w-full items-center justify-between rounded-2xl bg-white border border-black/10 px-4 py-2.5 text-xs font-bold hover:bg-[#EEEEEB]"
                  >
                    <span>{l.title}</span>
                    <span className="text-[#1A4F73]">Ôn lại →</span>
                  </button>
                ))}
              </div>
            ) : (
              <p className="text-xs text-black/60 leading-relaxed">
                {activeStats.completedLessons === 0
                  ? 'Hãy hoàn thành ít nhất 1 bài học hoặc 1 bài đánh giá để hệ thống phân tích điểm mạnh & lỗ hổng kỹ năng của bạn.'
                  : 'Tuyệt vời! Hiện tại bạn chưa có lỗ hổng nào nổi bật ở ngôn ngữ này. Hãy tiếp tục chặng kế tiếp!'}
              </p>
            )}
          </div>
        </div>

        {/* Assessment History (Scoped to Active Language) */}
        {state.assessments.filter((a) => a.language === selectedLang).length > 0 && (
          <div className="space-y-3">
            <h2 className="text-base font-extrabold text-[#08090D]">
              Lịch sử đánh giá năng lực {isEn ? 'Tiếng Anh' : 'Tiếng Nhật'}
            </h2>
            <div className="grid gap-3 md:grid-cols-2">
              {state.assessments
                .filter((a) => a.language === selectedLang)
                .slice(0, 4)
                .map((a) => (
                <div key={a.id} className="rounded-2xl border border-black/10 bg-[#F6F6F4] p-4 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-extrabold text-[#08090D]">{a.title}</span>
                    <span className="rounded-full bg-[#08090D] px-3 py-0.5 text-xs font-bold text-white">
                      {a.score}/{a.maxScore}
                    </span>
                  </div>
                  <p className="text-xs text-black/65">
                    Điểm mạnh: {a.strengths.length > 0 ? a.strengths.join(', ') : 'Đang phát triển'} • Cần cải thiện:{' '}
                    {a.weaknesses.length > 0 ? a.weaknesses.join(', ') : 'Không có'}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Gamification Badges Cabinet */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Award className="h-5 w-5 text-[#08090D]" />
              <h2 className="text-lg font-extrabold text-[#08090D]">
                Bộ sưu tập Huy hiệu ({state.unlockedBadges.length}/{BADGE_DEFINITIONS.length})
              </h2>
            </div>
            <span className="inline-flex items-center gap-1 text-xs font-bold text-black/60">
              <Flame className="h-4 w-4 text-orange-500" /> Streak {state.streakDays} ngày
            </span>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {BADGE_DEFINITIONS.map((b) => {
              const unlocked = state.unlockedBadges.includes(b.id);
              const style = PASTEL_STYLES[b.pastel];
              return (
                <div
                  key={b.id}
                  className={`rounded-[20px] border p-4 transition ${
                    unlocked
                      ? `${style.bg} ${style.border}`
                      : 'border-black/10 bg-[#F6F6F4] opacity-65'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-2xl">{b.icon}</span>
                    {unlocked ? (
                      <span className="rounded-full bg-white px-2.5 py-0.5 text-[10px] font-extrabold text-[#1B5C32]">
                        Đã mở khóa
                      </span>
                    ) : (
                      <Lock className="h-3.5 w-3.5 text-black/40" />
                    )}
                  </div>
                  <h3 className="mt-2 text-sm font-extrabold text-[#08090D]">{b.title}</h3>
                  <p className="mt-0.5 text-xs text-black/65 leading-snug">{b.descriptionVi}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
