import { LessonPastel } from '../../types';

export const PASTEL_STYLES: Record<
  LessonPastel,
  {
    bg: string;
    bgHover: string;
    border: string;
    pill: string;
    text: string;
    dot: string;
  }
> = {
  blue: {
    bg: 'bg-[#D7ECF9]',
    bgHover: 'hover:bg-[#CCE5F6]',
    border: 'border-[#BBDDF2]',
    pill: 'bg-[#C4E1F5] text-[#1A4F73]',
    text: 'text-[#1A4F73]',
    dot: 'bg-[#4BA0D8]',
  },
  lavender: {
    bg: 'bg-[#E5D9F7]',
    bgHover: 'hover:bg-[#DCCBF5]',
    border: 'border-[#D2BEF2]',
    pill: 'bg-[#D6C4F2] text-[#4B2C7A]',
    text: 'text-[#4B2C7A]',
    dot: 'bg-[#8E62D9]',
  },
  green: {
    bg: 'bg-[#D2EED9]',
    bgHover: 'hover:bg-[#C5E8CE]',
    border: 'border-[#B6E0C1]',
    pill: 'bg-[#BEE5C8] text-[#1B5C32]',
    text: 'text-[#1B5C32]',
    dot: 'bg-[#3BA962]',
  },
  yellow: {
    bg: 'bg-[#F6E9B2]',
    bgHover: 'hover:bg-[#F3E29B]',
    border: 'border-[#EAD88E]',
    pill: 'bg-[#EEDC94] text-[#6B4F0A]',
    text: 'text-[#6B4F0A]',
    dot: 'bg-[#D9A726]',
  },
  pink: {
    bg: 'bg-[#F7DCE1]',
    bgHover: 'hover:bg-[#F4CFD6]',
    border: 'border-[#ECC0C9]',
    pill: 'bg-[#F1C6CE] text-[#7D233B]',
    text: 'text-[#7D233B]',
    dot: 'bg-[#DC5F80]',
  },
  neutral: {
    bg: 'bg-[#EEEEEC]',
    bgHover: 'hover:bg-[#E5E5E2]',
    border: 'border-[#DFDFDA]',
    pill: 'bg-[#E2E2DE] text-[#2A2B30]',
    text: 'text-[#2A2B30]',
    dot: 'bg-[#7A7B80]',
  },
};
