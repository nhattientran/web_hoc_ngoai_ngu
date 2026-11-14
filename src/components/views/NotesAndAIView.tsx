import React, { useEffect, useMemo, useState } from 'react';
import {
  Bot,
  Info,
  NotebookPen,
  Plus,
  Search,
  Send,
  Sparkles,
  Trash2,
} from 'lucide-react';
import { useLearning } from '../../context/LearningContext';
import { Language } from '../../types';
import { AIMessage, askLanguageAssistant } from '../../utils/aiTutor';

interface Props {
  activeLanguage: Language;
}

export const NotesAndAIView: React.FC<Props> = ({ activeLanguage }) => {
  const { state, saveNote, deleteNote, getLanguageStats } = useLearning();
  const isEn = activeLanguage === 'en';

  // Notes state (strictly scoped to activeLanguage + 'general')
  const [noteSearch, setNoteSearch] = useState('');
  const [noteLangFilter, setNoteLangFilter] = useState<'scoped' | Language | 'general'>('scoped');
  const [noteTitle, setNoteTitle] = useState('');
  const [noteContent, setNoteContent] = useState('');
  const [noteLang, setNoteLang] = useState<Language | 'general'>(activeLanguage);
  const [noteTags, setNoteTags] = useState('');
  const [editingNoteId, setEditingNoteId] = useState<string | undefined>(undefined);

  // AI Assistant state (separate per language, driven by activeLanguage)
  const aiLang = activeLanguage;
  const [aiInput, setAiInput] = useState('');
  const [aiLoading, setAiLoading] = useState(false);

  useEffect(() => {
    setNoteLang(activeLanguage);
    setNoteLangFilter('scoped');
    setEditingNoteId(undefined);
    setNoteTitle('');
    setNoteContent('');
    setNoteTags('');
    setAiInput('');
  }, [activeLanguage]);

  const [aiMessages, setAiMessages] = useState<Record<Language, AIMessage[]>>({
    en: [
      {
        id: 'init-en',
        role: 'assistant',
        content:
          'Xin chào! Tôi là Trợ lý Tiếng Anh (B1 → B2). Bạn có thể dán câu tiếng Anh cần sửa lỗi, hỏi cấu trúc ngữ pháp (Inversion, Mixed Conditionals) hoặc xin tình huống hội thoại công sở.',
        modeUsed: state.settings.aiConfig.provider === 'demo' ? 'local_demo' : 'live_api',
        timestamp: Date.now(),
      },
    ],
    jp: [
      {
        id: 'init-jp',
        role: 'assistant',
        content:
          'こんにちは！Tôi là Trợ lý Tiếng Nhật (0 → JLPT N5). Hãy hỏi tôi về trợ từ (は/が/を/に/で), mẹo nhớ Kanji N5, hoặc tập hội thoại đơn giản!',
        modeUsed: state.settings.aiConfig.provider === 'demo' ? 'local_demo' : 'live_api',
        timestamp: Date.now(),
      },
    ],
  });

  const enStats = getLanguageStats('en');
  const jpStats = getLanguageStats('jp');

  const filteredNotes = useMemo(() => {
    const q = noteSearch.trim().toLowerCase();
    return state.notes.filter((n) => {
      if (noteLangFilter === 'scoped') {
        if (n.language !== activeLanguage && n.language !== 'general') return false;
      } else if (n.language !== noteLangFilter) {
        return false;
      }
      if (q) {
        return (
          n.title.toLowerCase().includes(q) ||
          n.content.toLowerCase().includes(q) ||
          n.tags.some((t) => t.toLowerCase().includes(q))
        );
      }
      return true;
    });
  }, [state.notes, noteSearch, noteLangFilter, activeLanguage]);

  const handleSaveNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!noteTitle.trim() || !noteContent.trim()) return;
    saveNote({
      id: editingNoteId,
      language: noteLang,
      title: noteTitle.trim(),
      content: noteContent.trim(),
      tags: noteTags
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean),
    });
    setNoteTitle('');
    setNoteContent('');
    setNoteTags('');
    setEditingNoteId(undefined);
  };

  const handleSendAI = async (customPrompt?: string) => {
    const text = (customPrompt ?? aiInput).trim();
    if (!text || aiLoading) return;

    const userMsg: AIMessage = {
      id: `u-${Date.now()}`,
      role: 'user',
      content: text,
      modeUsed: 'local_demo',
      timestamp: Date.now(),
    };
    setAiMessages((prev) => ({ ...prev, [aiLang]: [...prev[aiLang], userMsg] }));
    if (!customPrompt) setAiInput('');
    setAiLoading(true);

    const levelLabel =
      aiLang === 'en'
        ? `B1 (${enStats.completedLessons}/${enStats.totalLessons} bài)`
        : `Beginner (${jpStats.completedLessons}/${jpStats.totalLessons} bài)`;

    const res = await askLanguageAssistant(aiLang, text, levelLabel, state.settings.aiConfig);
    const botMsg: AIMessage = {
      id: `a-${Date.now()}`,
      role: 'assistant',
      content: res.errorNote ? `${res.errorNote}\n\n${res.reply}` : res.reply,
      modeUsed: res.modeUsed,
      timestamp: Date.now(),
    };
    setAiMessages((prev) => ({ ...prev, [aiLang]: [...prev[aiLang], botMsg] }));
    setAiLoading(false);
  };

  const isLiveConfigured =
    state.settings.aiConfig.provider !== 'demo' && Boolean(state.settings.aiConfig.apiKey.trim());

  const quickPrompts =
    aiLang === 'en'
      ? [
          'Sửa lỗi câu: I suggest him to check the informations and depend of the team.',
          'Giải thích Đảo ngữ (Inversion) mức B2 dễ hiểu',
          'Tạo tình huống hội thoại công sở B2',
        ]
      : [
          'Phân biệt trợ từ は và が cho người mới học',
          'Khi nào dùng で và khi nào dùng に?',
          'Tạo hội thoại gọi món ở quán ăn N5 kèm Romaji',
        ];

  return (
    <div className="grid gap-5 lg:grid-cols-2">
      {/* LEFT: LEARNING NOTES */}
      <section className="rounded-[26px] border border-black/10 bg-white p-5 sm:p-6 shadow-soft space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <NotebookPen className="h-5 w-5 text-[#08090D]" />
            <h1 className="text-xl font-extrabold text-[#08090D]">
              Sổ tay {isEn ? 'Tiếng Anh' : 'Tiếng Nhật'}
            </h1>
          </div>
          <span className="text-xs font-bold text-black/50">{filteredNotes.length} ghi chú</span>
        </div>

        {/* Create / Edit Note Form */}
        <form onSubmit={handleSaveNote} className="rounded-2xl bg-[#F6F6F4] p-4 space-y-2.5 border border-black/5">
          <div className="flex flex-wrap gap-2">
            <input
              type="text"
              value={noteTitle}
              onChange={(e) => setNoteTitle(e.target.value)}
              placeholder={
                isEn
                  ? 'Tiêu đề ghi chú (VD: Công thức Mixed Conditional)...'
                  : 'Tiêu đề ghi chú (VD: Trợ từ は và が N5)...'
              }
              className="flex-1 min-w-[180px] rounded-xl border border-black/10 bg-white px-3 py-2 text-xs font-semibold outline-none"
            />
            <select
              value={noteLang}
              onChange={(e) => setNoteLang(e.target.value as Language | 'general')}
              className="rounded-xl border border-black/10 bg-white px-3 py-2 text-xs font-bold"
            >
              <option value={activeLanguage}>
                {isEn ? '🇬🇧 Tiếng Anh' : '🇯🇵 Tiếng Nhật'}
              </option>
              <option value="general">📌 Chung</option>
            </select>
          </div>
          <textarea
            rows={3}
            value={noteContent}
            onChange={(e) => setNoteContent(e.target.value)}
            placeholder="Nội dung ghi chú, ví dụ câu hoặc mẹo cần nhớ..."
            className="w-full rounded-xl border border-black/10 bg-white p-3 text-xs sm:text-sm outline-none"
          />
          <div className="flex flex-wrap items-center justify-between gap-2">
            <input
              type="text"
              value={noteTags}
              onChange={(e) => setNoteTags(e.target.value)}
              placeholder="Thẻ tag (cách nhau dấu phẩy)..."
              className="flex-1 min-w-[140px] rounded-xl border border-black/10 bg-white px-3 py-1.5 text-xs outline-none"
            />
            <button
              type="submit"
              className="inline-flex items-center gap-1 rounded-full bg-[#08090D] px-4 py-2 text-xs font-bold text-white"
            >
              <Plus className="h-3.5 w-3.5" />
              {editingNoteId ? 'Cập nhật ghi chú' : 'Lưu ghi chú'}
            </button>
          </div>
        </form>

        {/* Search & Filter */}
        <div className="flex flex-wrap gap-2">
          <div className="flex flex-1 items-center gap-2 rounded-full border border-black/10 bg-[#F6F6F4] px-3.5 py-1.5">
            <Search className="h-3.5 w-3.5 text-black/45" />
            <input
              type="text"
              value={noteSearch}
              onChange={(e) => setNoteSearch(e.target.value)}
              placeholder="Tìm trong ghi chú..."
              className="w-full bg-transparent text-xs outline-none"
            />
          </div>
          <select
            value={noteLangFilter}
            onChange={(e) => setNoteLangFilter(e.target.value as any)}
            className="rounded-full border border-black/10 bg-white px-3 py-1.5 text-xs font-bold"
          >
            <option value="scoped">{isEn ? '🇬🇧 Tiếng Anh & Chung' : '🇯🇵 Tiếng Nhật & Chung'}</option>
            <option value={activeLanguage}>{isEn ? 'Chỉ Tiếng Anh' : 'Chỉ Tiếng Nhật'}</option>
            <option value="general">📌 Ghi chú chung</option>
          </select>
        </div>

        {/* Notes List */}
        <div className="space-y-2.5 max-h-[420px] overflow-y-auto pr-1">
          {filteredNotes.map((n) => (
            <div key={n.id} className="rounded-2xl border border-black/10 bg-[#FBFBFA] p-4 space-y-1.5">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span
                    className={`inline-block rounded-full px-2 py-0.5 text-[10px] font-bold mr-2 ${
                      n.language === 'en'
                        ? 'bg-[#D7ECF9] text-[#1A4F73]'
                        : n.language === 'jp'
                        ? 'bg-[#E5D9F7] text-[#4B2C7A]'
                        : 'bg-[#F6E9B2] text-[#6B4F0A]'
                    }`}
                  >
                    {n.language === 'en' ? 'Tiếng Anh' : n.language === 'jp' ? 'Tiếng Nhật' : 'Chung'}
                  </span>
                  <span className="text-sm font-extrabold text-[#08090D]">{n.title}</span>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => {
                      setEditingNoteId(n.id);
                      setNoteTitle(n.title);
                      setNoteContent(n.content);
                      setNoteLang(n.language);
                      setNoteTags(n.tags.join(', '));
                    }}
                    className="rounded-full px-2 py-1 text-[11px] font-semibold text-black/60 hover:bg-black/5"
                  >
                    Sửa
                  </button>
                  <button
                    type="button"
                    onClick={() => deleteNote(n.id)}
                    className="rounded-full p-1 text-black/40 hover:text-red-600"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
              <p className="text-xs leading-relaxed text-black/75 whitespace-pre-line">{n.content}</p>
              {n.tags.length > 0 && (
                <div className="flex flex-wrap gap-1 pt-1">
                  {n.tags.map((t) => (
                    <span key={t} className="rounded-full bg-[#EEEEEB] px-2 py-0.5 text-[10px] font-semibold">
                      #{t}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* RIGHT: AI LEARNING ASSISTANT */}
      <section className="flex flex-col rounded-[26px] border border-black/10 bg-white p-5 sm:p-6 shadow-soft space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Bot className="h-5 w-5 text-[#08090D]" />
            <h2 className="text-xl font-extrabold text-[#08090D]">
              Trợ lý AI {isEn ? 'Tiếng Anh' : 'Tiếng Nhật'}
            </h2>
          </div>

          <span
            className={`rounded-full px-3.5 py-1.5 text-xs font-extrabold ${
              isEn ? 'bg-[#D7ECF9] text-[#1A4F73]' : 'bg-[#E5D9F7] text-[#4B2C7A]'
            }`}
          >
            {isEn ? '🇬🇧 English B1→B2' : '🇯🇵 Tiếng Nhật N5'}
          </span>
        </div>

        {/* Honest Transparency Banner (Requirement 11) */}
        <div
          className={`flex items-start gap-2.5 rounded-2xl px-3.5 py-2.5 text-xs ${
            isLiveConfigured
              ? 'bg-[#D2EED9]/65 text-[#1B5C32]'
              : 'bg-[#F6E9B2]/75 text-[#6B4F0A]'
          }`}
        >
          <Info className="h-4 w-4 shrink-0 mt-0.5" />
          <div>
            {isLiveConfigured ? (
              <span>
                <strong>Đang kết nối API thật ({state.settings.aiConfig.provider}):</strong> Trợ lý sẵn sàng giải
                đáp tự do theo trình độ hiện tại của bạn.
              </span>
            ) : (
              <span>
                <strong>Chế độ Demo cục bộ (Chưa cấu hình API Key):</strong> Trợ lý đang dùng bộ phân tích quy tắc
                mẫu cho các lỗi phổ biến B1→B2 & N5. Bạn có thể gắn API Key (OpenAI/Gemini) trong mục{' '}
                <strong>Cài đặt</strong> để dùng AI trực tiếp.
              </span>
            )}
          </div>
        </div>

        {/* Quick prompt chips */}
        <div className="flex flex-wrap gap-1.5">
          {quickPrompts.map((qp) => (
            <button
              key={qp}
              type="button"
              onClick={() => handleSendAI(qp)}
              className="rounded-full border border-black/10 bg-[#F6F6F4] px-3 py-1.5 text-left text-[11px] font-semibold text-[#08090D] hover:bg-[#EEEEEB]"
            >
              <Sparkles className="inline h-3 w-3 mr-1" />
              {qp}
            </button>
          ))}
        </div>

        {/* Chat Messages */}
        <div className="flex-1 min-h-[280px] max-h-[380px] overflow-y-auto space-y-3 rounded-2xl bg-[#F6F6F4] p-4">
          {aiMessages[aiLang].map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[88%] rounded-2xl px-4 py-3 text-xs sm:text-sm leading-relaxed whitespace-pre-line ${
                  msg.role === 'user'
                    ? 'bg-[#08090D] text-white'
                    : 'bg-white border border-black/10 text-[#08090D]'
                }`}
              >
                {msg.content}
              </div>
            </div>
          ))}
          {aiLoading && (
            <div className="text-xs font-semibold text-black/50 animate-pulse">Đang phân tích câu hỏi...</div>
          )}
        </div>

        {/* Input */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendAI();
          }}
          className="flex items-center gap-2"
        >
          <input
            type="text"
            value={aiInput}
            onChange={(e) => setAiInput(e.target.value)}
            placeholder={
              aiLang === 'en'
                ? 'Hỏi ngữ pháp B2, sửa câu hoặc xin ví dụ...'
                : 'Hỏi trợ từ は/が, Kanji N5 hoặc hội thoại...'
            }
            className="flex-1 rounded-full border border-black/15 bg-[#F6F6F4] px-4 py-2.5 text-xs sm:text-sm outline-none focus:border-[#08090D] focus:bg-white"
          />
          <button
            type="submit"
            disabled={aiLoading || !aiInput.trim()}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#08090D] text-white disabled:opacity-40"
          >
            <Send className="h-4 w-4" />
          </button>
        </form>
      </section>
    </div>
  );
};
