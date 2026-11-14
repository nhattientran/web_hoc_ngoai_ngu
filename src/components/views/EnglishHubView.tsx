import React, { useState } from 'react';
import {
  AudioLines,
  Award,
  BookOpen,
  CheckCircle2,
  ClipboardCheck,
  ExternalLink,
  GraduationCap,
  Headphones,
  Mic,
  MicOff,
  PenLine,
  Play,
  Volume2,
} from 'lucide-react';
import { useLearning } from '../../context/LearningContext';
import { ENGLISH_LESSONS, ENGLISH_MODULES } from '../../data/englishCurriculum';
import { ExerciseItem, LessonData } from '../../types';
import { isSpeechRecognitionSupported, speakText, startSpeechRecognition } from '../../utils/speech';
import { InteractiveExerciseCard } from '../common/InteractiveExerciseCard';
import { PASTEL_STYLES } from '../common/PastelTokens';
import { EnglishIpaView } from './EnglishIpaView';

interface Props {
  onStartLesson: (lesson: LessonData) => void;
}

type EnSubTab = 'overview' | 'ipa' | 'reading' | 'listening_speaking' | 'writing' | 'assessment';

const B2_ASSESSMENT_QUESTIONS: ExerciseItem[] = [
  {
    id: 'b2-test-1',
    type: 'mcq',
    skill: 'grammar',
    prompt: '[B2 Grammar] "Seldom _____ such a thorough analysis from a junior analyst."',
    options: ['have I seen', 'I have seen', 'did I saw', 'I saw'],
    correctAnswer: 'have I seen',
    explanationVi: 'Trạng từ tần suất phủ định "Seldom" ở đầu câu kích hoạt đảo ngữ: Seldom + have + S + V3.',
    weaknessTag: 'inversion_b2',
  },
  {
    id: 'b2-test-2',
    type: 'mcq',
    skill: 'vocabulary',
    prompt: '[B2 Collocation] "Before signing the contract, both parties need to _____ a compromise."',
    options: ['reach', 'do', 'say', 'bring'],
    correctAnswer: 'reach',
    explanationVi: 'Collocation chuẩn B2: "reach a compromise" (đạt được sự thỏa hiệp).',
    weaknessTag: 'collocations_b2',
  },
  {
    id: 'b2-test-3',
    type: 'mcq',
    skill: 'reading',
    prompt:
      '[B2 Reading] "Although AI accelerates data processing, human judgment remains indispensable when ethical trade-offs arise." — Từ "indispensable" mang nghĩa:',
    options: ['không thể thiếu, cực kỳ cần thiết', 'có thể thay thế dễ dàng', 'lỗi thời', 'gây tranh cãi'],
    correctAnswer: 'không thể thiếu, cực kỳ cần thiết',
    explanationVi: 'Đối lập với việc AI tăng tốc xử lý, sự phán đoán của con người vẫn "không thể thiếu" (indispensable).',
    weaknessTag: 'reading_vocab_context',
  },
  {
    id: 'b2-test-4',
    type: 'listening',
    skill: 'listening',
    prompt: '[B2 Listening] Nghe câu nói và xác định thái độ của người nói:',
    audioText:
      'I appreciate the effort your team put into this draft, yet the pricing section still feels somewhat vague for executive review.',
    audioLang: 'en-US',
    options: [
      'Ghi nhận nỗ lực nhưng góp ý phần báo giá vẫn còn mơ hồ.',
      'Hoàn toàn hài lòng và duyệt ngay bản nháp.',
      'Từ chối xem bản nháp vì quá muộn.',
    ],
    correctAnswer: 'Ghi nhận nỗ lực nhưng góp ý phần báo giá vẫn còn mơ hồ.',
    explanationVi: 'Cấu trúc lịch sự "I appreciate..., yet... still feels somewhat vague".',
    weaknessTag: 'listening_attitude',
  },
  {
    id: 'b2-test-5',
    type: 'fill_blank',
    skill: 'grammar',
    prompt:
      '[Mixed Conditional] "If she _____ (not / miss) the morning train, she would be presenting in Hanoi right now."',
    acceptedAnswers: ['had not missed', "hadn't missed"],
    explanationVi: 'Quá khứ giả định (had not missed) ảnh hưởng hiện tại (would be presenting right now).',
    weaknessTag: 'mixed_conditionals',
  },
];

const B2_CONNECTORS = ['however', 'nevertheless', 'furthermore', 'consequently', 'moreover', 'although', 'therefore', 'in addition'];

export const EnglishHubView: React.FC<Props> = ({ onStartLesson }) => {
  const { state, getLessonStatus, saveAssessment, recordPracticeResult } = useLearning();
  const speechRate = state.settings.speechRate;

  const [subTab, setSubTab] = useState<EnSubTab>('overview');
  const [writingDraft, setWritingDraft] = useState('');
  const [writingFeedback, setWritingFeedback] = useState<{
    words: number;
    connectorsFound: string[];
    contractionsFound: string[];
    score: number;
  } | null>(null);

  const [speakingTranscript, setSpeakingTranscript] = useState('');
  const [micActive, setMicActive] = useState(false);
  const [micMsg, setMicMsg] = useState('');
  const [stopMic, setStopMic] = useState<(() => void) | null>(null);

  const [b2Answers, setB2Answers] = useState<Record<string, boolean>>({});
  const [b2Submitted, setB2Submitted] = useState(false);

  const handleEvaluateWriting = () => {
    const clean = writingDraft.trim();
    if (!clean) return;
    const words = clean.split(/\s+/).filter(Boolean).length;
    const lower = clean.toLowerCase();
    const connectorsFound = B2_CONNECTORS.filter((c) => lower.includes(c));
    const contractionsFound = ["don't", "can't", "won't", "i'm", "it's"].filter((c) =>
      lower.includes(c)
    );

    let score = 50;
    if (words >= 50) score += 20;
    else if (words >= 30) score += 10;
    score += Math.min(20, connectorsFound.length * 10);
    if (contractionsFound.length === 0) score += 10;
    score = Math.min(100, score);

    setWritingFeedback({ words, connectorsFound, contractionsFound, score });
    recordPracticeResult({
      language: 'en',
      skill: 'writing',
      correct: score,
      total: 100,
      minutes: 10,
      xp: 20,
    });
  };

  const handleMicSpeak = () => {
    if (micActive) {
      stopMic?.();
      setMicActive(false);
      return;
    }
    setMicMsg('');
    setMicActive(true);
    const s = startSpeechRecognition(
      'en-US',
      (t) => setSpeakingTranscript((p) => (p ? `${p} ${t}` : t)),
      (e) => setMicMsg(e),
      () => setMicActive(false)
    );
    if (s) setStopMic(() => s);
  };

  const handleSaveB2Assessment = () => {
    const breakdown: Record<string, { correct: number; total: number }> = {};
    const strengths: string[] = [];
    const weaknesses: string[] = [];
    let score = 0;

    for (const q of B2_ASSESSMENT_QUESTIONS) {
      const ok = b2Answers[q.id] === true;
      if (ok) score += 1;
      if (!breakdown[q.skill]) breakdown[q.skill] = { correct: 0, total: 0 };
      breakdown[q.skill].total += 1;
      if (ok) breakdown[q.skill].correct += 1;
    }

    Object.entries(breakdown).forEach(([skill, val]) => {
      if (val.correct === val.total) strengths.push(skill);
      else weaknesses.push(skill);
    });

    saveAssessment({
      language: 'en',
      title: 'Đánh giá năng lực CEFR B2',
      score,
      maxScore: B2_ASSESSMENT_QUESTIONS.length,
      breakdown,
      strengths,
      weaknesses,
    });
    setB2Submitted(true);
  };

  return (
    <div className="space-y-5">
      <div className="rounded-[26px] border border-black/10 bg-white p-5 sm:p-7 shadow-soft space-y-6">
        {/* Sub-navigation */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="inline-flex flex-wrap gap-1.5 rounded-full bg-[#F6F6F4] p-1.5 border border-black/5">
            {[
              { id: 'overview', label: 'Tổng quan 8 Module', icon: GraduationCap },
              { id: 'ipa', label: 'Phiên âm IPA (44 âm)', icon: AudioLines },
              { id: 'reading', label: 'Đọc hiểu B2', icon: BookOpen },
              { id: 'listening_speaking', label: 'Nghe & Nói', icon: Headphones },
              { id: 'writing', label: 'Phòng luyện Viết', icon: PenLine },
              { id: 'assessment', label: 'Đánh giá CEFR B2', icon: ClipboardCheck },
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setSubTab(tab.id as EnSubTab)}
                  className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-xs sm:text-sm font-bold transition ${
                    subTab === tab.id ? 'bg-[#08090D] text-white' : 'text-black/65 hover:text-[#08090D]'
                  }`}
                >
                  <Icon className="h-3.5 w-3.5" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* IPA */}
        {subTab === 'ipa' && <EnglishIpaView />}

        {/* OVERVIEW */}
        {subTab === 'overview' && (
          <div className="space-y-5">
            <div>
              <h1 className="text-2xl font-extrabold text-[#08090D]">
                Chương trình Tiếng Anh chuẩn CEFR (B1 → B2)
              </h1>
              <p className="text-sm text-black/60">
                8 chặng chuyên sâu phát triển đồng đều 4 kỹ năng Nghe – Nói – Đọc – Viết và Ngữ pháp nâng cao.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {ENGLISH_MODULES.map((mod) => {
                const modLessons = ENGLISH_LESSONS.filter((l) => l.moduleId === mod.id);
                const style = PASTEL_STYLES[mod.pastel];
                return (
                  <div
                    key={mod.id}
                    className={`rounded-[22px] border p-5 space-y-3 ${style.bg} ${style.border}`}
                  >
                    <div className="flex items-center justify-between">
                      <span className={`rounded-full px-3 py-0.5 text-xs font-extrabold ${style.pill}`}>
                        {mod.cefrOrJlpt}
                      </span>
                      <span className="text-xs font-bold text-black/60">{modLessons.length} bài</span>
                    </div>
                    <h3 className="text-base font-extrabold text-[#08090D]">{mod.title}</h3>
                    <p className="text-xs text-black/70 leading-relaxed">{mod.objectiveVi}</p>
                    <div className="space-y-2 pt-1">
                      {modLessons.map((les) => {
                        const status = getLessonStatus(les);
                        return (
                          <button
                            key={les.id}
                            type="button"
                            disabled={status === 'locked'}
                            onClick={() => onStartLesson(les)}
                            className={`flex w-full items-center justify-between rounded-2xl bg-white/85 px-3.5 py-2.5 text-left text-xs font-bold transition ${
                              status === 'locked'
                                ? 'opacity-60 cursor-not-allowed'
                                : 'hover:bg-white shadow-sm'
                            }`}
                          >
                            <span className="truncate pr-2">{les.title}</span>
                            <span className="shrink-0 inline-flex items-center gap-1 text-[11px]">
                              {status === 'completed' ? (
                                <span className="text-[#1B5C32]">✓ Xong</span>
                              ) : status === 'locked' ? (
                                '🔒 Khóa'
                              ) : (
                                <>
                                  <Play className="h-3 w-3 fill-current" /> Học
                                </>
                              )}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* READING LAB */}
        {subTab === 'reading' && (
          <div className="space-y-5">
            <div className="rounded-2xl bg-[#D2EED9]/55 border border-[#B6E0C1] p-5">
              <h2 className="text-xl font-extrabold text-[#08090D]">
                Bài đọc chuyên sâu B2: Urban Micro-Forests
              </h2>
              <p className="mt-1 text-xs text-[#1B5C32]">
                Đọc đoạn báo học thuật ngắn và trả lời câu hỏi Main Idea & Inference bên dưới.
              </p>
            </div>
            <div className="rounded-2xl border border-black/10 bg-[#FBFBFA] p-5 space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold uppercase tracking-wider text-black/45">
                  Academic / News Article (~140 words)
                </span>
                <button
                  type="button"
                  onClick={() =>
                    speakText(
                      'As cities grow denser, municipal planners are turning tiny neglected plots into densely packed micro-forests. Using the Miyawaki method, native saplings are planted close together, competing for sunlight and maturing up to ten times faster than conventional parks. Beyond cooling concrete neighborhoods by several degrees, these pocket ecosystems restore soil biodiversity and absorb sudden stormwater runoff.',
                      'en-GB',
                      speechRate
                    )
                  }
                  className="inline-flex items-center gap-1.5 rounded-full bg-[#08090D] px-3 py-1.5 text-xs font-bold text-white"
                >
                  <Volume2 className="h-3.5 w-3.5" /> Nghe bài đọc (UK)
                </button>
              </div>
              <p className="text-sm sm:text-[15px] leading-relaxed text-[#08090D]">
                As cities grow denser, municipal planners are turning tiny neglected plots into densely packed
                &ldquo;micro-forests.&rdquo; Using the Miyawaki method, native saplings are planted close together,
                competing for sunlight and maturing up to ten times faster than conventional parks. Beyond cooling
                concrete neighborhoods by several degrees, these pocket ecosystems restore soil biodiversity and
                absorb sudden stormwater runoff. Consequently, even narrow strips beside highways can become vital
                climate buffers.
              </p>
            </div>
            <InteractiveExerciseCard
              exercise={{
                id: 'en-read-lab-1',
                type: 'mcq',
                skill: 'reading',
                prompt: 'Tại sao cây trong "micro-forests" lại phát triển nhanh hơn công viên thông thường?',
                options: [
                  'Vì cây bản địa được trồng sát nhau nên cạnh tranh ánh sáng và lớn nhanh hơn.',
                  'Vì chính quyền sử dụng phân bón hóa học đặc biệt.',
                  'Vì chúng chỉ được trồng ở vùng ngoại ô nhiều mưa.',
                ],
                correctAnswer: 'Vì cây bản địa được trồng sát nhau nên cạnh tranh ánh sáng và lớn nhanh hơn.',
                explanationVi: 'Đoạn văn nêu rõ: "planted close together, competing for sunlight and maturing up to ten times faster".',
                weaknessTag: 'reading_detail',
              }}
              speechRate={speechRate}
            />
          </div>
        )}

        {/* LISTENING & SPEAKING */}
        {subTab === 'listening_speaking' && (
          <div className="space-y-5">
            <div className="grid gap-5 lg:grid-cols-2">
              <div className="rounded-[22px] border border-black/10 bg-[#F7DCE1]/40 p-5 space-y-4">
                <div>
                  <h2 className="text-lg font-extrabold text-[#08090D]">🎧 Luyện Nghe & Chép chính tả B2</h2>
                  <p className="text-xs text-black/65 mt-0.5">
                    Chọn tốc độ 0.75x / 0.9x / 1.0x và đổi giọng đọc tự nhiên (ưu tiên giọng ★ Google hoặc Enhanced) ngay trong trình phát bên dưới.
                  </p>
                </div>
                <InteractiveExerciseCard
                  exercise={{
                    id: 'en-ls-lab-1',
                    type: 'fill_blank',
                    skill: 'listening',
                    prompt: 'Nghe audio và điền 2 từ còn thiếu: "We need to _____ _____ a clear timeline before Friday."',
                    audioText: 'We need to map out a clear timeline before Friday.',
                    audioLang: 'en-US',
                    acceptedAnswers: ['map out'],
                    hint: 'Phrasal verb nghĩa là "vạch ra kế hoạch chi tiết".',
                    explanationVi: 'Phrasal verb công sở rất hay dùng: "map out" (vạch ra, phác thảo chi tiết).',
                    weaknessTag: 'listening_phrasal',
                  }}
                  speechRate={speechRate}
                />
                <InteractiveExerciseCard
                  exercise={{
                    id: 'en-ls-lab-2',
                    type: 'listening',
                    skill: 'listening',
                    prompt: 'Nghe đoạn podcast ngắn B2 và chọn ý đúng:',
                    audioText:
                      'Many professionals assume multitasking saves time. However, cognitive studies show that switching rapidly between tasks reduces focus and increases errors.',
                    audioLang: 'en-GB',
                    options: [
                      'Chuyển đổi liên tục giữa nhiều việc làm giảm tập trung và tăng sai sót.',
                      'Làm nhiều việc cùng lúc luôn tiết kiệm một nửa thời gian.',
                      'Nghiên cứu khuyên nên kiểm tra email mỗi 5 phút.',
                    ],
                    correctAnswer: 'Chuyển đổi liên tục giữa nhiều việc làm giảm tập trung và tăng sai sót.',
                    explanationVi: '"switching rapidly between tasks reduces focus and increases errors".',
                    weaknessTag: 'listening_b2',
                  }}
                  speechRate={speechRate}
                />
              </div>

              <div className="rounded-[22px] border border-black/10 bg-[#D7ECF9]/45 p-5 space-y-4">
                <h2 className="text-lg font-extrabold text-[#08090D]">🎙️ Studio Luyện Nói B2</h2>
                <p className="text-xs text-black/70">
                  Chủ đề: <strong>&ldquo;Describe a skill you are currently developing and why it matters for your future.&rdquo;</strong>
                </p>
                <div className="rounded-2xl bg-white p-4 space-y-2 text-xs">
                  <p className="font-bold text-[#1A4F73]">Gợi ý mẫu câu B2:</p>
                  <p>• &ldquo;Currently, I am dedicating 45 minutes a day to...&rdquo;</p>
                  <p>• &ldquo;Not only does it broaden my perspective, but it also...&rdquo;</p>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  {isSpeechRecognitionSupported() && (
                    <button
                      type="button"
                      onClick={handleMicSpeak}
                      className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-bold ${
                        micActive ? 'bg-[#DC5F80] text-white animate-pulse' : 'bg-[#08090D] text-white'
                      }`}
                    >
                      {micActive ? <MicOff className="h-3.5 w-3.5" /> : <Mic className="h-3.5 w-3.5" />}
                      {micActive ? 'Đang thu âm... Dừng' : 'Nói bằng Micro'}
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() =>
                      speakText(
                        'Currently, I am dedicating time daily to improving my English and Japanese. Not only does it sharpen my focus, but it also opens international career paths.',
                        'en-US',
                        speechRate
                      )
                    }
                    className="inline-flex items-center gap-1.5 rounded-full bg-white border border-black/10 px-4 py-2 text-xs font-bold"
                  >
                    <Volume2 className="h-3.5 w-3.5" /> Nghe bài mẫu B2
                  </button>
                </div>
                {micMsg && <p className="text-xs text-[#7D233B]">{micMsg}</p>}
                <textarea
                  rows={4}
                  value={speakingTranscript}
                  onChange={(e) => setSpeakingTranscript(e.target.value)}
                  placeholder="Nội dung bạn nói (hoặc gõ nháp bài nói của bạn)..."
                  className="w-full rounded-2xl border border-black/10 bg-white p-3.5 text-sm outline-none"
                />
              </div>
            </div>

            {/* Curated Native English Listening Sources (B1 -> B2) */}
            <div className="rounded-[22px] border border-black/10 bg-[#F6F6F4] p-5 space-y-3">
              <div>
                <h3 className="text-base font-extrabold text-[#08090D]">
                  🎙️ Nguồn luyện Nghe giọng người thật chuẩn B1 → B2 (Miễn phí)
                </h3>
                <p className="text-xs text-black/65">
                  Để nghe giọng thu âm thật của người bản xứ (thay vì giọng đọc trình duyệt), bạn có thể luyện thêm mỗi ngày 10–15 phút từ các nguồn uy tín sau:
                </p>
              </div>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {[
                  {
                    name: 'BBC 6 Minute English',
                    level: 'B1 → B2',
                    desc: 'Podcast 6 phút kèm transcript & từ vựng cực chuẩn giọng Anh-Anh.',
                    url: 'https://www.bbc.co.uk/learningenglish/english/features/6-minute-english',
                  },
                  {
                    name: 'British Council B1–B2',
                    level: 'B1 / B2',
                    desc: 'Bài nghe hội thoại công sở & đời sống có bài tập trắc nghiệm đi kèm.',
                    url: 'https://learnenglish.britishcouncil.org/skills/listening',
                  },
                  {
                    name: 'ELLLO Listening Library',
                    level: 'B1 → B2',
                    desc: 'Hơn 1.500 đoạn hội thoại tự nhiên đa giọng (Mỹ, Anh, Úc, Nhật nói tiếng Anh).',
                    url: 'https://www.elllo.org/',
                  },
                  {
                    name: 'VOA Learning English',
                    level: 'B1 → B2',
                    desc: 'Bản tin giọng Mỹ đọc rõ ràng vừa phải, cực tốt để luyện Dictation.',
                    url: 'https://learningenglish.voanews.com/',
                  },
                ].map((src) => (
                  <a
                    key={src.name}
                    href={src.url}
                    target="_blank"
                    rel="noreferrer"
                    className="flex flex-col justify-between rounded-2xl border border-black/10 bg-white p-4 transition hover:border-[#08090D] hover:shadow-sm"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-sm font-extrabold text-[#08090D]">{src.name}</span>
                        <ExternalLink className="h-3.5 w-3.5 text-black/45 shrink-0" />
                      </div>
                      <span className="mt-1 inline-block rounded-full bg-[#D7ECF9] px-2.5 py-0.5 text-[10px] font-bold text-[#1A4F73]">
                        {src.level}
                      </span>
                      <p className="mt-2 text-xs text-black/65 leading-relaxed">{src.desc}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* WRITING LAB */}
        {subTab === 'writing' && (
          <div className="space-y-4">
            <div className="rounded-2xl bg-[#D7ECF9]/55 border border-[#BBDDF2] p-5">
              <h2 className="text-xl font-extrabold text-[#08090D]">Phòng luyện Viết & Kiểm tra văn phong B2</h2>
              <p className="mt-1 text-xs sm:text-sm text-[#1A4F73]">
                Đề bài gợi ý: <strong>&ldquo;Do the advantages of remote work outweigh the disadvantages? Write 50–120 words.&rdquo;</strong>
              </p>
            </div>
            <textarea
              rows={6}
              value={writingDraft}
              onChange={(e) => setWritingDraft(e.target.value)}
              placeholder="Viết đoạn văn tiếng Anh của bạn tại đây..."
              className="w-full rounded-2xl border border-black/15 bg-[#F6F6F4] p-4 text-sm text-[#08090D] outline-none focus:border-[#08090D] focus:bg-white"
            />
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-black/55">
                Số từ hiện tại: {writingDraft.trim() ? writingDraft.trim().split(/\s+/).length : 0} từ
              </span>
              <button
                type="button"
                onClick={handleEvaluateWriting}
                disabled={writingDraft.trim().length < 15}
                className="rounded-full bg-[#08090D] px-6 py-2.5 text-sm font-bold text-white disabled:opacity-40"
              >
                Phân tích bài viết (+20 XP)
              </button>
            </div>
            {writingFeedback && (
              <div className="rounded-2xl border border-[#B6E0C1] bg-[#D2EED9]/55 p-5 space-y-2 text-sm">
                <div className="flex items-center gap-2 font-extrabold text-[#1B5C32]">
                  <CheckCircle2 className="h-5 w-5" />
                  Đánh giá cấu trúc B2: {writingFeedback.score}/100 điểm
                </div>
                <p>• Độ dài: <strong>{writingFeedback.words} từ</strong> {writingFeedback.words >= 50 ? '(Đạt chuẩn đoạn văn B2)' : '(Nên mở rộng thêm ví dụ để đạt ≥ 50 từ)'}.</p>
                <p>
                  • Từ nối học thuật phát hiện:{' '}
                  <strong>
                    {writingFeedback.connectorsFound.length > 0
                      ? writingFeedback.connectorsFound.join(', ')
                      : 'Chưa thấy (hãy thử thêm However, Nevertheless, Consequently)'}
                  </strong>
                </p>
                <p>
                  • Văn phong trang trọng:{' '}
                  {writingFeedback.contractionsFound.length === 0
                    ? 'Tốt! Không dùng từ viết tắt.'
                    : `Phát hiện từ viết tắt (${writingFeedback.contractionsFound.join(', ')}) — trong bài luận/email trang trọng nên viết đầy đủ.`}
                </p>
              </div>
            )}
          </div>
        )}

        {/* B2 ASSESSMENT */}
        {subTab === 'assessment' && (
          <div className="space-y-5">
            <div className="rounded-2xl bg-[#D2EED9]/65 border border-[#B6E0C1] p-5 flex flex-wrap items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-extrabold text-[#08090D]">Kiểm tra năng lực CEFR B2</h2>
                <p className="mt-1 text-xs sm:text-sm text-[#1B5C32]">
                  Đánh giá tổng hợp Ngữ pháp B2, Collocations, Đọc hiểu và Nghe hiểu.
                </p>
              </div>
              {b2Submitted && (
                <button
                  type="button"
                  onClick={() => {
                    setB2Answers({});
                    setB2Submitted(false);
                  }}
                  className="rounded-full bg-[#08090D] px-4 py-2 text-xs font-bold text-white"
                >
                  Làm lại bài test
                </button>
              )}
            </div>

            <div className="space-y-4">
              {B2_ASSESSMENT_QUESTIONS.map((q) => (
                <InteractiveExerciseCard
                  key={q.id}
                  exercise={q}
                  speechRate={speechRate}
                  onAnswered={(id, ok) => setB2Answers((prev) => ({ ...prev, [id]: ok }))}
                />
              ))}
            </div>

            {!b2Submitted ? (
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={handleSaveB2Assessment}
                  disabled={Object.keys(b2Answers).length < B2_ASSESSMENT_QUESTIONS.length}
                  className="inline-flex items-center gap-2 rounded-full bg-[#08090D] px-6 py-3 text-sm font-bold text-white disabled:opacity-40"
                >
                  <Award className="h-4 w-4" />
                  Lưu kết quả đánh giá B2
                </button>
              </div>
            ) : (
              <div className="rounded-2xl border border-black/10 bg-[#F6F6F4] p-5 space-y-2">
                <h3 className="text-base font-extrabold text-[#08090D]">
                  Kết quả CEFR B2: {Object.values(b2Answers).filter(Boolean).length}/
                  {B2_ASSESSMENT_QUESTIONS.length} câu đúng
                </h3>
                <p className="text-sm text-black/75">
                  Kết quả đã được lưu vào mục <strong>Tiến độ & Phân tích</strong>.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
