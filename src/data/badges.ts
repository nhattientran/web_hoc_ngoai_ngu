import { UserState } from '../types';

export interface BadgeDef {
  id: string;
  title: string;
  descriptionVi: string;
  icon: string;
  pastel: 'blue' | 'lavender' | 'green' | 'yellow' | 'pink';
  check: (state: UserState) => boolean;
}

export const BADGE_DEFINITIONS: BadgeDef[] = [
  {
    id: 'first-lesson',
    title: 'Bước khởi đầu',
    descriptionVi: 'Hoàn thành bài học đầu tiên ở bất kỳ ngôn ngữ nào.',
    icon: '🌱',
    pastel: 'green',
    check: (s) => Object.values(s.lessonProgress).some((p) => p.status === 'completed'),
  },
  {
    id: 'hiragana-master',
    title: 'Bậc thầy Hiragana',
    descriptionVi: 'Hoàn thành cả 3 chặng Hiragana (あ–ん) trong lộ trình Nhật.',
    icon: 'あ',
    pastel: 'lavender',
    check: (s) =>
      ['jp-1-1', 'jp-1-2', 'jp-1-3'].every((id) => s.lessonProgress[id]?.status === 'completed'),
  },
  {
    id: 'b1-grammar-solid',
    title: 'Vững nền tảng B1',
    descriptionVi: 'Hoàn thành trọn bộ Module 1 Tiếng Anh B1.',
    icon: '📘',
    pastel: 'blue',
    check: (s) =>
      ['en-1-1', 'en-1-2', 'en-1-3'].every((id) => s.lessonProgress[id]?.status === 'completed'),
  },
  {
    id: 'first-jp-conv',
    title: 'Hội thoại Nhật đầu tiên',
    descriptionVi: 'Hoàn thành bài Hội thoại thực tế tiếng Nhật N5.',
    icon: '💬',
    pastel: 'pink',
    check: (s) => s.lessonProgress['jp-6-1']?.status === 'completed',
  },
  {
    id: 'vocab-collector',
    title: 'Người gom từ vựng',
    descriptionVi: 'Có ít nhất 15 từ ở trạng thái Đang ôn hoặc Thành thạo.',
    icon: '🗂️',
    pastel: 'yellow',
    check: (s) =>
      s.vocabItems.filter((v) => v.srsState === 'reviewing' || v.srsState === 'mastered').length >= 15,
  },
  {
    id: 'streak-7',
    title: 'Chuỗi 7 ngày bền bỉ',
    descriptionVi: 'Duy trì streak học tập liên tục từ 7 ngày trở lên.',
    icon: '🔥',
    pastel: 'pink',
    check: (s) => s.streakDays >= 7,
  },
  {
    id: 'xp-300',
    title: 'Chinh phục 300 XP',
    descriptionVi: 'Tích lũy tổng cộng 300 XP từ các bài học và luyện tập thực tế.',
    icon: '⭐',
    pastel: 'yellow',
    check: (s) => s.xp >= 300,
  },
  {
    id: 'dual-assessment',
    title: 'Song ngữ toàn diện',
    descriptionVi: 'Hoàn thành ít nhất 1 bài đánh giá năng lực (B2 hoặc N5).',
    icon: '🏆',
    pastel: 'green',
    check: (s) =>
      s.assessments.length > 0 ||
      s.lessonProgress['en-8-1']?.status === 'completed' ||
      s.lessonProgress['jp-8-1']?.status === 'completed',
  },
];
