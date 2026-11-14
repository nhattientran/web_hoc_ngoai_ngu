import React, { useEffect, useState } from 'react';
import { Eye, EyeOff, Square, Volume2 } from 'lucide-react';
import {
  getVoicesForLanguage,
  loadAvailableVoices,
  pickBestVoice,
  speakText,
  stopSpeaking,
  VoiceOption,
} from '../../utils/speech';

interface Props {
  text: string;
  lang: 'en-US' | 'en-GB' | 'ja-JP';
  defaultRate?: number;
  allowTranscriptToggle?: boolean;
}

export const AudioPlayerBar: React.FC<Props> = ({
  text,
  lang,
  defaultRate = 0.92,
  allowTranscriptToggle = true,
}) => {
  const [rate, setRate] = useState<number>(defaultRate);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showTranscript, setShowTranscript] = useState(false);
  const [voices, setVoices] = useState<VoiceOption[]>([]);
  const [selectedVoice, setSelectedVoice] = useState<string>('');

  const langPrefix: 'en' | 'ja' = lang.startsWith('ja') ? 'ja' : 'en';

  useEffect(() => {
    let mounted = true;
    loadAvailableVoices().then((all) => {
      if (!mounted) return;
      const list = getVoicesForLanguage(langPrefix);
      setVoices(list);
      const best = pickBestVoice(all, lang);
      if (best) setSelectedVoice(best.name);
    });
    return () => {
      mounted = false;
    };
  }, [lang, langPrefix]);

  const handlePlay = async () => {
    setIsPlaying(true);
    await speakText(
      text,
      lang,
      rate,
      () => setIsPlaying(false),
      selectedVoice || undefined
    );
  };

  const handleStop = () => {
    stopSpeaking();
    setIsPlaying(false);
  };

  return (
    <div className="rounded-2xl bg-[#F7DCE1]/60 border border-[#ECC0C9] p-3.5 space-y-2.5">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap items-center gap-2">
          {!isPlaying ? (
            <button
              type="button"
              onClick={handlePlay}
              className="inline-flex items-center gap-2 rounded-full bg-[#08090D] px-4 py-2 text-xs font-bold text-white transition hover:opacity-90"
            >
              <Volume2 className="h-4 w-4" />
              Nghe phát âm
            </button>
          ) : (
            <button
              type="button"
              onClick={handleStop}
              className="inline-flex items-center gap-2 rounded-full bg-[#DC5F80] px-4 py-2 text-xs font-bold text-white transition hover:opacity-90"
            >
              <Square className="h-3.5 w-3.5 fill-current" />
              Đang phát... Dừng
            </button>
          )}

          {/* Speed pills */}
          <div className="inline-flex rounded-full bg-white/85 p-0.5 border border-black/10">
            {[
              { val: 0.75, label: '0.75x Chậm' },
              { val: 0.92, label: '0.9x Vừa' },
              { val: 1.05, label: '1.0x Chuẩn' },
            ].map((sp) => (
              <button
                key={sp.val}
                type="button"
                onClick={() => setRate(sp.val)}
                className={`rounded-full px-2.5 py-1 text-[11px] font-bold transition ${
                  Math.abs(rate - sp.val) < 0.05
                    ? 'bg-[#08090D] text-white'
                    : 'text-black/65 hover:text-[#08090D]'
                }`}
              >
                {sp.label}
              </button>
            ))}
          </div>
        </div>

        {allowTranscriptToggle && (
          <button
            type="button"
            onClick={() => setShowTranscript((v) => !v)}
            className="inline-flex items-center gap-1 rounded-full bg-white px-3 py-1.5 text-[11px] font-bold text-[#7D233B] border border-black/10 hover:bg-[#F6F6F4]"
          >
            {showTranscript ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
            {showTranscript ? 'Ẩn lời thoại' : 'Xem lời thoại (Transcript)'}
          </button>
        )}
      </div>

      {/* Voice selector so user can switch away from robotic OS voices */}
      {voices.length > 0 && (
        <div className="flex flex-wrap items-center gap-2 text-[11px] text-[#7D233B]">
          <span className="font-bold">Giọng đọc trình duyệt:</span>
          <select
            value={selectedVoice}
            onChange={(e) => setSelectedVoice(e.target.value)}
            className="max-w-[260px] rounded-full border border-black/10 bg-white px-2.5 py-1 text-[11px] font-semibold text-[#08090D] outline-none"
          >
            {voices.map((v) => (
              <option key={v.voiceURI} value={v.name}>
                {v.isNatural ? '★ ' : ''}
                {v.name} ({v.lang})
              </option>
            ))}
          </select>
          <span className="opacity-75">
            (Mẹo: Chrome có giọng <strong>Google</strong> nghe tự nhiên nhất; macOS có giọng Enhanced)
          </span>
        </div>
      )}

      {showTranscript && (
        <div className="rounded-xl bg-white/90 px-3.5 py-2.5 text-xs sm:text-sm font-medium text-[#08090D] border border-black/10">
          <span className="font-bold text-[#7D233B] mr-1.5">Transcript:</span>
          <span className="font-jp">{text}</span>
        </div>
      )}
    </div>
  );
};
