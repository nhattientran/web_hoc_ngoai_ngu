import React, { useMemo, useState } from 'react';
import {
  Award,
  BookOpen,
  CheckCircle2,
  ClipboardCheck,
  ExternalLink,
  PenLine,
  Play,
  Volume2,
} from 'lucide-react';
import { useLearning } from '../../context/LearningContext';
import { JAPANESE_LESSONS, JAPANESE_MODULES } from '../../data/japaneseCurriculum';
import {
  HIRAGANA_BASIC,
  KANA_DAKUTEN_SAMPLE,
  KANA_YOON_SAMPLE,
  KATAKANA_BASIC,
} from '../../data/kanaData';
import { KANJI_GROUPS, KANJI_N5_ITEMS } from '../../data/kanjiData';
import { ExerciseItem, KanaChar, KanjiItem, LessonData } from '../../types';
import { speakText } from '../../utils/speech';
import { InteractiveExerciseCard } from '../common/InteractiveExerciseCard';
import { KanaDrawingCanvas } from '../common/KanaDrawingCanvas';
import { MascotAvatar } from '../common/MascotAvatar';
import { PASTEL_STYLES } from '../common/PastelTokens';
import { JapanesePronunciationView } from './JapanesePronunciationView';
import { JapaneseReadingView } from './JapaneseReadingView';

interface Props {
  initialSubTab?: string;
  onStartLesson: (lesson: LessonData) => void;
}

type JpSubTab = 'kana' | 'kanji' | 'pronunciation' | 'reading' | 'grammar' | 'assessment';

const N5_ASSESSMENT_QUESTIONS: ExerciseItem[] = [
  {
    id: 'n5-test-1',
    type: 'mcq',
    skill: 'vocabulary',
    prompt: '[Từ vựng] "毎朝、七時に おきます。" — Từ "おきます" có nghĩa là gì?',
    options: ['Thức dậy', 'Đi ngủ', 'Ăn sáng', 'Đi làm'],
    correctAnswer: 'Thức dậy',
    explanationVi: 'おきます (okimasu) = thức dậy; ねます = đi ngủ.',
    weaknessTag: 'jp_vocab_n5',
  },
  {
    id: 'n5-test-2',
    type: 'mcq',
    skill: 'kanji',
    prompt: '[Kanji] Cách đọc đúng của "電車" là:',
    options: ['でんしゃ (densha)', 'くるま (kuruma)', 'じてんしゃ (jitensha)', 'えき (eki)'],
    correctAnswer: 'でんしゃ (densha)',
    explanationVi: '電 (Điện) + 車 (Xa) = でんしゃ (tàu điện).',
    weaknessTag: 'jp_kanji_n5',
  },
  {
    id: 'n5-test-3',
    type: 'mcq',
    skill: 'grammar',
    prompt: '[Ngữ pháp] "わたしは まいにち としょかん _____ べんきょうします。"',
    options: ['に', 'で', 'を', 'へ'],
    correctAnswer: 'で',
    explanationVi: 'Hành động học diễn ra tại thư viện → trợ từ で.',
    weaknessTag: 'jp_particles_ni_de',
  },
  {
    id: 'n5-test-4',
    type: 'listening',
    skill: 'listening',
    prompt: '[Nghe hiểu N5] Nghe câu nói và chọn đáp án đúng: Người nói muốn mua gì?',
    audioText: 'すみません、あかい りんごを みっつ ください。',
    audioLang: 'ja-JP',
    options: ['3 quả táo đỏ', '2 quả cam', '3 chai nước lọc', '1 chiếc bánh ngọt'],
    correctAnswer: '3 quả táo đỏ',
    explanationVi: 'あかい りんご (táo đỏ) + を みっつ (3 quả) + ください (cho tôi).',
    weaknessTag: 'jp_listening_n5',
  },
  {
    id: 'n5-test-5',
    type: 'mcq',
    skill: 'reading',
    prompt: '[Đọc hiểu N5] "きのうは にちようびでした。わたしは かぞくと すしを たべました。とても おいしかったです。" — Câu nào ĐÚNG?',
    options: [
      'Hôm qua người viết đã ăn sushi cùng gia đình và thấy rất ngon.',
      'Hôm nay là Chủ Nhật và người viết ăn một mình.',
      'Món sushi hôm qua không ngon lắm.',
    ],
    correctAnswer: 'Hôm qua người viết đã ăn sushi cùng gia đình và thấy rất ngon.',
    explanationVi: 'きのう (hôm qua), かぞくと (cùng gia đình), おいしかったです (đã rất ngon).',
    weaknessTag: 'jp_reading_n5',
  },
];

export const JapaneseHubView: React.FC<Props> = ({ initialSubTab, onStartLesson }) => {
  const {
    state,
    toggleMasteredKana,
    toggleMasteredKanji,
    saveAssessment,
    getLessonStatus,
  } = useLearning();

  const [subTab, setSubTab] = useState<JpSubTab>(
    initialSubTab === 'kanji' || initialSubTab === 'grammar' || initialSubTab === 'assessment'
      ? initialSubTab
      : 'kana'
  );
  const [kanaScript, setKanaScript] = useState<'hiragana' | 'katakana' | 'rules'>('hiragana');
  const [selectedKana, setSelectedKana] = useState<KanaChar>(HIRAGANA_BASIC[0]);
  const [selectedKanjiGroup, setSelectedKanjiGroup] = useState<string>('numbers');
  const [selectedKanji, setSelectedKanji] = useState<KanjiItem>(KANJI_N5_ITEMS[0]);
  const [n5Answers, setN5Answers] = useState<Record<string, boolean>>({});
  const [n5Submitted, setN5Submitted] = useState(false);

  const speechRate = state.settings.speechRate;
  const currentKanaList = kanaScript === 'hiragana' ? HIRAGANA_BASIC : KATAKANA_BASIC;

  const activeGroupKanji = useMemo(
    () => KANJI_N5_ITEMS.filter((k) => k.topic === selectedKanjiGroup),
    [selectedKanjiGroup]
  );

  const handleSubmitN5Test = () => {
    const breakdown: Record<string, { correct: number; total: number }> = {};
    const strengths: string[] = [];
    const weaknesses: string[] = [];
    let score = 0;

    for (const q of N5_ASSESSMENT_QUESTIONS) {
      const ok = n5Answers[q.id] === true;
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
      language: 'jp',
      title: 'Kiểm tra năng lực JLPT N5',
      score,
      maxScore: N5_ASSESSMENT_QUESTIONS.length,
      breakdown,
      strengths,
      weaknesses,
    });
    setN5Submitted(true);
  };

  return (
    <div className="space-y-5">
      {/* Coach Tip Banner like Screenshot 2 */}
      <div className="inline-flex items-center gap-2.5 rounded-full border border-black/10 bg-white py-1.5 pl-2 pr-4 shadow-sm">
        <MascotAvatar size={28} />
        <span className="text-xs sm:text-sm font-medium text-[#08090D]">
          {subTab === 'kanji'
            ? 'Nên học chữ Hán song song với các bài N5. Bắt đầu với nhóm Số đếm: dễ và dùng ngay!'
            : subTab === 'kana'
            ? 'Học chắc 46 Hiragana & 46 Katakana giúp bạn đọc tiếng Nhật mà không cần phụ thuộc Romaji.'
            : 'Nắm vững trợ từ は・が・を・に・で là chìa khóa vượt qua JLPT N5!'}
        </span>
      </div>

      {/* Main White Container like Screenshot 2 */}
      <div className="rounded-[24px] sm:rounded-[26px] border border-black/10 bg-white p-4 sm:p-7 shadow-soft space-y-5 sm:space-y-6 min-w-0">
        {/* Top segmented tabs */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="grid grid-cols-2 sm:inline-flex sm:flex-wrap gap-1.5 rounded-[20px] sm:rounded-full bg-[#F6F6F4] p-1.5 border border-black/5 w-full sm:w-auto">
            <button
              type="button"
              onClick={() => setSubTab('kana')}
              className={`rounded-xl sm:rounded-full px-3 sm:px-4 py-2 text-xs sm:text-sm font-bold transition text-center truncate ${
                subTab === 'kana' ? 'bg-[#08090D] text-white shadow-sm' : 'text-black/65 hover:text-[#08090D]'
              }`}
            >
              かな Kana ({state.masteredKana.length}/92)
            </button>
            <button
              type="button"
              onClick={() => setSubTab('kanji')}
              className={`rounded-xl sm:rounded-full px-3 sm:px-4 py-2 text-xs sm:text-sm font-bold transition text-center truncate ${
                subTab === 'kanji' ? 'bg-[#08090D] text-white shadow-sm' : 'text-black/65 hover:text-[#08090D]'
              }`}
            >
              漢字 Kanji ({state.masteredKanji.length}/{KANJI_N5_ITEMS.length})
            </button>
            <button
              type="button"
              onClick={() => setSubTab('pronunciation')}
              className={`rounded-xl sm:rounded-full px-3 sm:px-4 py-2 text-xs sm:text-sm font-bold transition text-center truncate ${
                subTab === 'pronunciation' ? 'bg-[#08090D] text-white shadow-sm' : 'text-black/65 hover:text-[#08090D]'
              }`}
            >
              Phát âm & Nhịp
            </button>
            <button
              type="button"
              onClick={() => setSubTab('reading')}
              className={`rounded-xl sm:rounded-full px-3 sm:px-4 py-2 text-xs sm:text-sm font-bold transition text-center truncate ${
                subTab === 'reading' ? 'bg-[#08090D] text-white shadow-sm' : 'text-black/65 hover:text-[#08090D]'
              }`}
            >
              Đọc hiểu dài N5
            </button>
            <button
              type="button"
              onClick={() => setSubTab('grammar')}
              className={`rounded-xl sm:rounded-full px-3 sm:px-4 py-2 text-xs sm:text-sm font-bold transition text-center truncate ${
                subTab === 'grammar' ? 'bg-[#08090D] text-white shadow-sm' : 'text-black/65 hover:text-[#08090D]'
              }`}
            >
              Ngữ pháp & Bài học
            </button>
            <button
              type="button"
              onClick={() => setSubTab('assessment')}
              className={`rounded-xl sm:rounded-full px-3 sm:px-4 py-2 text-xs sm:text-sm font-bold transition text-center truncate ${
                subTab === 'assessment' ? 'bg-[#08090D] text-white shadow-sm' : 'text-black/65 hover:text-[#08090D]'
              }`}
            >
              Đánh giá JLPT N5
            </button>
          </div>
        </div>

        {/* SUBTAB 1: KANA (HIRAGANA + KATAKANA + RULES + WRITING CANVAS) */}
        {subTab === 'kana' && (
          <div className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h1 className="text-2xl font-extrabold text-[#08090D]">Bảng chữ cái tiếng Nhật (Kana)</h1>
                <p className="text-sm text-black/60">
                  Bấm vào từng chữ để nghe phát âm chuẩn Nhật, xem mẹo nhớ và luyện viết nét bên phải.
                </p>
              </div>
              <div className="inline-flex rounded-full bg-[#EEEEEB] p-1">
                <button
                  type="button"
                  onClick={() => {
                    setKanaScript('hiragana');
                    setSelectedKana(HIRAGANA_BASIC[0]);
                  }}
                  className={`rounded-full px-4 py-1.5 text-xs font-bold ${
                    kanaScript === 'hiragana' ? 'bg-white text-[#08090D] shadow-sm' : 'text-black/60'
                  }`}
                >
                  Hiragana (46)
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setKanaScript('katakana');
                    setSelectedKana(KATAKANA_BASIC[0]);
                  }}
                  className={`rounded-full px-4 py-1.5 text-xs font-bold ${
                    kanaScript === 'katakana' ? 'bg-white text-[#08090D] shadow-sm' : 'text-black/60'
                  }`}
                >
                  Katakana (46)
                </button>
                <button
                  type="button"
                  onClick={() => setKanaScript('rules')}
                  className={`rounded-full px-4 py-1.5 text-xs font-bold ${
                    kanaScript === 'rules' ? 'bg-white text-[#08090D] shadow-sm' : 'text-black/60'
                  }`}
                >
                  Biến âm ゛゜ & Âm ghép
                </button>
              </div>
            </div>

            {kanaScript === 'rules' ? (
              <div className="space-y-6">
                <div>
                  <h3 className="mb-3 text-base font-bold text-[#08090D]">
                    1. Bảng Biến âm (Dakuten ゛ & Handakuten ゜)
                  </h3>
                  <div className="grid grid-cols-3 sm:grid-cols-5 gap-2.5">
                    {KANA_DAKUTEN_SAMPLE.map((item) => (
                      <button
                        key={item.char}
                        type="button"
                        onClick={() => speakText(item.char, 'ja-JP', speechRate)}
                        className="rounded-2xl border border-black/10 bg-[#F6F6F4] p-3 text-center hover:bg-[#E5D9F7]/50 transition"
                      >
                        <div className="font-jp text-2xl font-bold text-[#08090D]">{item.char}</div>
                        <div className="text-xs font-bold text-[#4B2C7A]">{item.romaji}</div>
                        <div className="text-[10px] text-black/50 mt-0.5">{item.note}</div>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="mb-3 text-base font-bold text-[#08090D]">
                    2. Âm ghép nhỏ (や・ゆ・よ / Yōon)
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                    {KANA_YOON_SAMPLE.map((item) => (
                      <button
                        key={item.char}
                        type="button"
                        onClick={() => speakText(item.char, 'ja-JP', speechRate)}
                        className="rounded-2xl border border-black/10 bg-[#D7ECF9]/45 p-3 text-left hover:bg-[#D7ECF9] transition"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-jp text-2xl font-bold text-[#08090D]">{item.char}</span>
                          <span className="rounded-full bg-white px-2 py-0.5 text-xs font-bold text-[#1A4F73]">
                            {item.romaji}
                          </span>
                        </div>
                        <p className="mt-1 font-jp text-xs font-semibold text-black/75">{item.example}</p>
                        <p className="text-[11px] text-black/55">{item.meaningVi}</p>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="grid gap-6 lg:grid-cols-[1fr_300px]">
                {/* Character Grid */}
                <div className="grid grid-cols-5 gap-2 sm:gap-2.5">
                  {currentKanaList.map((item) => {
                    const isSelected = selectedKana.char === item.char;
                    const isMastered = state.masteredKana.includes(item.char);
                    return (
                      <button
                        key={item.char}
                        type="button"
                        onClick={() => {
                          setSelectedKana(item);
                          speakText(item.char, 'ja-JP', speechRate);
                        }}
                        className={`relative rounded-2xl border p-2.5 sm:p-3 text-center transition ${
                          isSelected
                            ? 'border-[#08090D] bg-[#E5D9F7] shadow-sm'
                            : isMastered
                            ? 'border-[#B6E0C1] bg-[#D2EED9]/55'
                            : 'border-black/10 bg-[#FBFBFA] hover:bg-[#F6F6F4]'
                        }`}
                      >
                        {isMastered && (
                          <CheckCircle2 className="absolute right-1.5 top-1.5 h-3.5 w-3.5 text-[#1B5C32]" />
                        )}
                        <div className="font-jp text-2xl sm:text-3xl font-bold text-[#08090D]">
                          {item.char}
                        </div>
                        <div className="mt-0.5 text-xs font-bold text-black/55">{item.romaji}</div>
                      </button>
                    );
                  })}
                </div>

                {/* Selected Kana Detail + Drawing Canvas */}
                <div className="space-y-4">
                  <div className="rounded-[22px] border border-black/10 bg-[#F6F6F4] p-4 space-y-2.5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <span className="font-jp text-4xl font-extrabold text-[#08090D]">
                          {selectedKana.char}
                        </span>
                        <div>
                          <span className="rounded-full bg-[#08090D] px-2.5 py-0.5 text-xs font-bold text-white">
                            {selectedKana.romaji}
                          </span>
                          <p className="mt-1 text-xs font-semibold text-black/60">
                            Ví dụ: <span className="font-jp">{selectedKana.sampleWord}</span> —{' '}
                            {selectedKana.sampleMeaningVi}
                          </p>
                        </div>
                      </div>
                    </div>

                    <p className="text-xs leading-relaxed text-black/75">
                      💡 <strong>Mẹo nhớ:</strong> {selectedKana.mnemonicVi}
                    </p>

                    <div className="flex gap-2 pt-1">
                      <button
                        type="button"
                        onClick={() => speakText(selectedKana.char, 'ja-JP', speechRate)}
                        className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-full bg-white border border-black/10 px-3 py-2 text-xs font-bold hover:bg-[#EEEEEB]"
                      >
                        <Volume2 className="h-3.5 w-3.5" />
                        Nghe âm
                      </button>
                      <button
                        type="button"
                        onClick={() => toggleMasteredKana(selectedKana.char)}
                        className={`flex-1 inline-flex items-center justify-center gap-1.5 rounded-full px-3 py-2 text-xs font-bold transition ${
                          state.masteredKana.includes(selectedKana.char)
                            ? 'bg-[#D2EED9] text-[#1B5C32]'
                            : 'bg-[#08090D] text-white'
                        }`}
                      >
                        <CheckCircle2 className="h-3.5 w-3.5" />
                        {state.masteredKana.includes(selectedKana.char) ? 'Đã thuộc' : 'Đánh dấu thuộc'}
                      </button>
                    </div>
                  </div>

                  <KanaDrawingCanvas
                    character={selectedKana.char}
                    reading={selectedKana.romaji}
                    strokeHint={selectedKana.strokeHintVi}
                  />
                </div>
              </div>
            )}
          </div>
        )}

        {/* SUBTAB 2: KANJI N5 (Screenshot 2 Grid!) */}
        {subTab === 'kanji' && (
          <div className="space-y-6">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <h1 className="text-2xl font-extrabold text-[#08090D]">Chữ Hán N5</h1>
                <p className="mt-1 text-sm text-black/65 max-w-2xl">
                  Các chữ Hán thiết yếu cho kỳ thi JLPT N5, chia theo nhóm chủ đề. Mỗi chữ đều có{' '}
                  <strong>âm Hán Việt</strong> (VD: <span className="font-jp">学校</span> = HỌC HIỆU = trường học),
                  giúp người Việt đoán nghĩa cực nhanh!
                </p>
              </div>
              <div className="text-right">
                <div className="text-xs font-bold text-black/55">
                  Đã thuộc <span className="text-[#08090D]">{state.masteredKanji.length}/{KANJI_N5_ITEMS.length}</span> chữ cốt lõi
                </div>
                <div className="mt-1.5 h-2 w-40 overflow-hidden rounded-full bg-[#EEEEEB]">
                  <div
                    className="h-full rounded-full bg-[#08090D]"
                    style={{
                      width: `${Math.round((state.masteredKanji.length / KANJI_N5_ITEMS.length) * 100)}%`,
                    }}
                  />
                </div>
              </div>
            </div>

            {/* 9 Topic Cards Grid inspired directly by Screenshot 2 */}
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {KANJI_GROUPS.map((grp) => {
                const items = KANJI_N5_ITEMS.filter((k) => k.topic === grp.id);
                const masteredInGrp = items.filter((k) => state.masteredKanji.includes(k.char)).length;
                const isActive = selectedKanjiGroup === grp.id;
                const pStyle = PASTEL_STYLES[grp.pastel];
                return (
                  <button
                    key={grp.id}
                    type="button"
                    onClick={() => {
                      setSelectedKanjiGroup(grp.id);
                      if (items[0]) setSelectedKanji(items[0]);
                    }}
                    className={`rounded-[20px] border p-4 text-left transition ${pStyle.bg} ${
                      isActive ? 'border-2 border-[#08090D] shadow-sm' : `${pStyle.border} hover:opacity-95`
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-sm font-extrabold text-[#08090D]">{grp.title}</span>
                      {isActive ? (
                        <span className="rounded-full bg-[#08090D] px-2.5 py-0.5 text-[10px] font-bold text-white">
                          Đang chọn
                        </span>
                      ) : (
                        <span className="text-xs font-bold text-black/55">
                          {masteredInGrp}/{items.length}
                        </span>
                      )}
                    </div>
                    <p className="mt-2 font-jp text-lg font-medium tracking-wider text-[#08090D]/85 leading-snug">
                      {items.map((i) => i.char).join('')}
                    </p>
                  </button>
                );
              })}
            </div>

            {/* Active Group Kanji Detail + Drawing Canvas */}
            <div className="grid gap-5 lg:grid-cols-[1fr_320px]">
              <div className="space-y-3">
                <div className="flex flex-wrap gap-2">
                  {activeGroupKanji.map((k) => {
                    const isSel = selectedKanji.char === k.char;
                    const isMastered = state.masteredKanji.includes(k.char);
                    return (
                      <button
                        key={k.char}
                        type="button"
                        onClick={() => {
                          setSelectedKanji(k);
                          speakText(k.example, 'ja-JP', speechRate);
                        }}
                        className={`rounded-2xl border px-4 py-3 text-center transition ${
                          isSel
                            ? 'border-[#08090D] bg-[#08090D] text-white'
                            : isMastered
                            ? 'border-[#B6E0C1] bg-[#D2EED9]/70 text-[#08090D]'
                            : 'border-black/10 bg-[#F6F6F4] text-[#08090D] hover:bg-[#EEEEEB]'
                        }`}
                      >
                        <div className="font-jp text-2xl font-bold">{k.char}</div>
                        <div className="text-[11px] font-bold opacity-80">{k.sinoVi}</div>
                      </button>
                    );
                  })}
                </div>

                {/* Selected Kanji Card */}
                {selectedKanji && (
                  <div className="rounded-[22px] border border-black/10 bg-[#FBFBFA] p-5 space-y-4">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div className="flex items-center gap-4">
                        <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-[#F6E9B2] font-jp text-5xl font-bold text-[#08090D]">
                          {selectedKanji.char}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="rounded-full bg-[#08090D] px-3 py-0.5 text-xs font-extrabold text-white">
                              {selectedKanji.sinoVi}
                            </span>
                            <span className="text-xs font-semibold text-black/55">
                              {selectedKanji.strokes} nét
                            </span>
                          </div>
                          <h3 className="mt-1 text-xl font-extrabold text-[#08090D]">
                            {selectedKanji.meaningVi}
                          </h3>
                          <p className="mt-1 text-xs text-black/70">
                            <strong>On’yomi:</strong> {selectedKanji.onyomi} •{' '}
                            <strong>Kun’yomi:</strong> {selectedKanji.kunyomi}
                          </p>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => toggleMasteredKanji(selectedKanji.char)}
                        className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-bold ${
                          state.masteredKanji.includes(selectedKanji.char)
                            ? 'bg-[#D2EED9] text-[#1B5C32]'
                            : 'bg-[#08090D] text-white'
                        }`}
                      >
                        <CheckCircle2 className="h-3.5 w-3.5" />
                        {state.masteredKanji.includes(selectedKanji.char) ? 'Đã thuộc Kanji' : 'Đánh dấu đã thuộc'}
                      </button>
                    </div>

                    <div className="grid gap-2 sm:grid-cols-2">
                      {selectedKanji.vocab.map((v, i) => (
                        <button
                          key={i}
                          type="button"
                          onClick={() => speakText(v.reading, 'ja-JP', speechRate)}
                          className="flex items-center justify-between rounded-2xl border border-black/10 bg-white px-3.5 py-2.5 text-left hover:bg-[#F6F6F4]"
                        >
                          <div>
                            <span className="font-jp text-sm font-bold text-[#08090D]">{v.word}</span>
                            <span className="ml-2 text-xs text-[#5A3A8C]">({v.reading})</span>
                            <p className="text-xs text-black/65">{v.meaningVi}</p>
                          </div>
                          <Volume2 className="h-4 w-4 text-black/45" />
                        </button>
                      ))}
                    </div>

                    <div className="flex items-center justify-between gap-3 rounded-2xl bg-[#D7ECF9]/50 px-4 py-3">
                      <div>
                        <p className="font-jp text-sm font-bold text-[#08090D]">{selectedKanji.example}</p>
                        <p className="text-xs text-[#1A4F73]">{selectedKanji.exampleVi}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => speakText(selectedKanji.example, 'ja-JP', speechRate)}
                        className="rounded-full bg-white p-2 shadow-sm hover:bg-[#EEEEEB]"
                      >
                        <Volume2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {selectedKanji && (
                <KanaDrawingCanvas
                  character={selectedKanji.char}
                  reading={`${selectedKanji.sinoVi} (${selectedKanji.strokes} nét)`}
                  strokeHint={`Luyện viết chữ ${selectedKanji.char} (${selectedKanji.meaningVi})`}
                />
              )}
            </div>
          </div>
        )}

        {/* SUBTAB 3: GRAMMAR & LESSONS */}
        {subTab === 'grammar' && (
          <div className="space-y-5">
            <div>
              <h1 className="text-2xl font-extrabold text-[#08090D]">
                Chương trình Tiếng Nhật (0 → JLPT N5)
              </h1>
              <p className="text-sm text-black/60">
                8 chặng bài bản giải thích hoàn toàn bằng tiếng Việt, kèm ví dụ Romaji & Hiragana.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {JAPANESE_MODULES.map((mod) => {
                const modLessons = JAPANESE_LESSONS.filter((l) => l.moduleId === mod.id);
                const style = PASTEL_STYLES[mod.pastel];
                return (
                  <div
                    key={mod.id}
                    className={`min-w-0 rounded-[22px] border p-4 sm:p-5 space-y-3 ${style.bg} ${style.border}`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className={`rounded-full px-3 py-0.5 text-xs font-extrabold ${style.pill}`}>
                        {mod.cefrOrJlpt}
                      </span>
                      <span className="text-xs font-bold text-black/60">{modLessons.length} bài</span>
                    </div>
                    <h3 className="text-base font-extrabold text-[#08090D]">{mod.title}</h3>
                    <p className="text-xs text-black/70 leading-relaxed">{mod.objectiveVi}</p>
                    <div className="space-y-2 pt-1 min-w-0">
                      {modLessons.map((les) => {
                        const status = getLessonStatus(les);
                        return (
                          <button
                            key={les.id}
                            type="button"
                            disabled={status === 'locked'}
                            onClick={() => onStartLesson(les)}
                            className={`flex w-full min-w-0 items-center justify-between gap-2 rounded-2xl bg-white/85 px-3.5 py-2.5 text-left text-xs font-bold transition ${
                              status === 'locked'
                                ? 'opacity-60 cursor-not-allowed'
                                : 'hover:bg-white shadow-sm'
                            }`}
                          >
                            <span className="font-jp min-w-0 flex-1 truncate pr-2">{les.title}</span>
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
            <div className="rounded-[22px] border border-black/10 bg-[#F6F6F4] p-5 space-y-3">
              <div>
                <h3 className="text-base font-extrabold text-[#08090D]">
                  🎙️ Nguồn luyện Nghe giọng người Nhật bản xứ (0 → N5)
                </h3>
                <p className="text-xs text-black/65">
                  Kết hợp thêm các nguồn audio miễn phí chính thống từ Nhật Bản để quen tốc độ và ngữ điệu tự nhiên:
                </p>
              </div>
              <div className="grid gap-3 sm:grid-cols-3">
                {[
                  {
                    name: 'NHK World — Easy Japanese',
                    level: 'Mới bắt đầu → N5',
                    desc: '48 bài hội thoại audio giọng diễn viên Nhật kèm giải thích tiếng Việt miễn phí.',
                    url: 'https://www.nhk.or.jp/lesson/vi/',
                  },
                  {
                    name: 'Erin’s Challenge (Japan Foundation)',
                    level: 'Sơ cấp N5',
                    desc: 'Video & audio tình huống đời sống Nhật Bản của Quỹ Giao lưu Quốc tế Nhật Bản.',
                    url: 'https://www.erin.jpf.go.jp/',
                  },
                  {
                    name: 'Tadoku Graded Readers (Audio)',
                    level: 'Level 0 → N5',
                    desc: 'Truyện tranh ngắn có giọng đọc chậm rõ ràng dành cho người mới bắt đầu.',
                    url: 'https://tadoku.org/japanese/en/free-books-en/',
                  },
                ].map((src) => (
                  <a
                    key={src.name}
                    href={src.url}
                    target="_blank"
                    rel="noreferrer"
                    className="flex flex-col justify-between rounded-2xl border border-black/10 bg-white p-4 transition hover:border-[#08090D]"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-sm font-extrabold text-[#08090D]">{src.name}</span>
                        <ExternalLink className="h-3.5 w-3.5 text-black/45 shrink-0" />
                      </div>
                      <span className="mt-1 inline-block rounded-full bg-[#E5D9F7] px-2.5 py-0.5 text-[10px] font-bold text-[#4B2C7A]">
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

        {/* SUBTAB 4: JLPT N5 ASSESSMENT */}
        {subTab === 'assessment' && (
          <div className="space-y-5">
            <div className="rounded-2xl bg-[#D2EED9]/65 border border-[#B6E0C1] p-5 flex flex-wrap items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <ClipboardCheck className="h-5 w-5 text-[#1B5C32]" />
                  <h1 className="text-xl font-extrabold text-[#08090D]">
                    Bài kiểm tra sẵn sàng JLPT N5
                  </h1>
                </div>
                <p className="mt-1 text-xs sm:text-sm text-[#1B5C32]">
                  Đánh giá thực tế qua 5 mảng: Từ vựng, Kanji, Ngữ pháp, Nghe hiểu và Đọc hiểu N5.
                </p>
              </div>
              {n5Submitted && (
                <button
                  type="button"
                  onClick={() => {
                    setN5Answers({});
                    setN5Submitted(false);
                  }}
                  className="rounded-full bg-[#08090D] px-4 py-2 text-xs font-bold text-white"
                >
                  Làm lại bài test
                </button>
              )}
            </div>

            <div className="space-y-4">
              {N5_ASSESSMENT_QUESTIONS.map((q) => (
                <InteractiveExerciseCard
                  key={q.id}
                  exercise={q}
                  speechRate={speechRate}
                  onAnswered={(id, ok) => setN5Answers((prev) => ({ ...prev, [id]: ok }))}
                />
              ))}
            </div>

            {!n5Submitted ? (
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={handleSubmitN5Test}
                  disabled={Object.keys(n5Answers).length < N5_ASSESSMENT_QUESTIONS.length}
                  className="inline-flex items-center gap-2 rounded-full bg-[#08090D] px-6 py-3 text-sm font-bold text-white disabled:opacity-40"
                >
                  <Award className="h-4 w-4" />
                  Lưu kết quả đánh giá N5
                </button>
              </div>
            ) : (
              <div className="rounded-2xl border border-black/10 bg-[#F6F6F4] p-5 space-y-2">
                <h3 className="text-base font-extrabold text-[#08090D]">
                  Kết quả JLPT N5: {Object.values(n5Answers).filter(Boolean).length}/
                  {N5_ASSESSMENT_QUESTIONS.length} câu đúng
                </h3>
                <p className="text-sm text-black/75">
                  Kết quả đã được lưu vào mục <strong>Tiến độ & Phân tích</strong> để cập nhật mức năng lực N5 ước tính của bạn.
                </p>
              </div>
            )}
          </div>
        )}

        {subTab === 'pronunciation' && (
          <div className="pt-2">
            <JapanesePronunciationView />
          </div>
        )}

        {subTab === 'reading' && (
          <div className="pt-2">
            <JapaneseReadingView />
          </div>
        )}
      </div>
    </div>
  );
};
