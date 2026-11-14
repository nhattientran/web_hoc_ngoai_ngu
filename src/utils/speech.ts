export interface VoiceOption {
  name: string;
  lang: string;
  voiceURI: string;
  isNatural: boolean;
}

const PREFERRED_EN_VOICES = [
  'Google US English',
  'Google UK English Female',
  'Google UK English Male',
  'Samantha',
  'Daniel',
  'Karen',
  'Ava',
  'Allison',
  'Aria',
  'Jenny',
  'Guy',
  'Serena',
];

const PREFERRED_JP_VOICES = [
  'Google 日本語',
  'Kyoko',
  'O-Ren',
  'Hattori',
  'Nanami',
  'Keita',
];

let cachedVoices: SpeechSynthesisVoice[] = [];
let activeStopFlag = false;

export function isSpeechSynthesisSupported(): boolean {
  return typeof window !== 'undefined' && 'speechSynthesis' in window;
}

export function loadAvailableVoices(): Promise<SpeechSynthesisVoice[]> {
  if (!isSpeechSynthesisSupported()) return Promise.resolve([]);
  const current = window.speechSynthesis.getVoices();
  if (current.length > 0) {
    cachedVoices = current;
    return Promise.resolve(current);
  }
  return new Promise((resolve) => {
    let resolved = false;
    const finish = () => {
      if (resolved) return;
      resolved = true;
      cachedVoices = window.speechSynthesis.getVoices();
      resolve(cachedVoices);
    };
    window.speechSynthesis.onvoiceschanged = finish;
    setTimeout(finish, 450);
  });
}

export function pickBestVoice(
  voices: SpeechSynthesisVoice[],
  lang: 'en-US' | 'en-GB' | 'ja-JP',
  preferredVoiceName?: string
): SpeechSynthesisVoice | undefined {
  if (voices.length === 0) return undefined;

  if (preferredVoiceName) {
    const manual = voices.find((v) => v.name === preferredVoiceName);
    if (manual) return manual;
  }

  const langPrefix = lang.slice(0, 2).toLowerCase();
  const matchingLang = voices.filter((v) => v.lang.toLowerCase().startsWith(langPrefix));
  const pool = matchingLang.length > 0 ? matchingLang : voices;

  const preferredList = langPrefix === 'ja' ? PREFERRED_JP_VOICES : PREFERRED_EN_VOICES;

  // 1. Prefer Natural / Online / Enhanced / Google voices
  for (const pref of preferredList) {
    const found = pool.find((v) => v.name.toLowerCase().includes(pref.toLowerCase()));
    if (found) return found;
  }

  const natural = pool.find((v) =>
    /(natural|enhanced|premium|neural|google|siri)/i.test(v.name)
  );
  if (natural) return natural;

  const exactLocale = pool.find((v) => v.lang.toLowerCase() === lang.toLowerCase());
  return exactLocale || pool[0];
}

export function getVoicesForLanguage(langPrefix: 'en' | 'ja'): VoiceOption[] {
  if (!isSpeechSynthesisSupported()) return [];
  const voices = window.speechSynthesis.getVoices();
  return voices
    .filter((v) => v.lang.toLowerCase().startsWith(langPrefix))
    .map((v) => ({
      name: v.name,
      lang: v.lang,
      voiceURI: v.voiceURI,
      isNatural: /(natural|enhanced|premium|neural|google)/i.test(v.name),
    }))
    .sort((a, b) => Number(b.isNatural) - Number(a.isNatural));
}

export function stopSpeaking(): void {
  activeStopFlag = true;
  if (isSpeechSynthesisSupported()) {
    window.speechSynthesis.cancel();
  }
}

function splitIntoChunks(text: string): string[] {
  // Split long passages at sentence boundaries so Chrome/Safari TTS never cuts off mid-audio
  const parts = text
    .split(/(?<=[.!?。！？])\s+/)
    .map((s) => s.trim())
    .filter(Boolean);
  return parts.length > 0 ? parts : [text];
}

export async function speakText(
  text: string,
  lang: 'en-US' | 'en-GB' | 'ja-JP' = 'en-US',
  rate = 0.92,
  onEnd?: () => void,
  preferredVoiceName?: string
): Promise<boolean> {
  if (!isSpeechSynthesisSupported() || !text.trim()) {
    onEnd?.();
    return false;
  }

  try {
    activeStopFlag = false;
    window.speechSynthesis.cancel();

    const voices = cachedVoices.length > 0 ? cachedVoices : await loadAvailableVoices();
    const voice = pickBestVoice(voices, lang, preferredVoiceName);
    const chunks = splitIntoChunks(text);

    const speakChunk = (index: number) => {
      if (activeStopFlag || index >= chunks.length) {
        onEnd?.();
        return;
      }
      const utterance = new SpeechSynthesisUtterance(chunks[index]);
      utterance.lang = lang;
      utterance.rate = rate;
      utterance.pitch = 1.0;
      utterance.volume = 1.0;
      if (voice) utterance.voice = voice;

      utterance.onend = () => {
        if (!activeStopFlag) {
          setTimeout(() => speakChunk(index + 1), 160);
        } else {
          onEnd?.();
        }
      };
      utterance.onerror = () => {
        onEnd?.();
      };
      window.speechSynthesis.speak(utterance);
    };

    speakChunk(0);
    return true;
  } catch {
    onEnd?.();
    return false;
  }
}

export function isSpeechRecognitionSupported(): boolean {
  if (typeof window === 'undefined') return false;
  const w = window as unknown as Record<string, unknown>;
  return Boolean(w.SpeechRecognition || w.webkitSpeechRecognition);
}

export function startSpeechRecognition(
  lang: 'en-US' | 'ja-JP',
  onResult: (transcript: string) => void,
  onError: (msg: string) => void,
  onEnd: () => void
): (() => void) | null {
  if (typeof window === 'undefined') return null;
  const w = window as unknown as Record<string, any>;
  const SpeechRec = w.SpeechRecognition || w.webkitSpeechRecognition;
  if (!SpeechRec) {
    onError(
      'Trình duyệt hiện tại không hỗ trợ nhận diện giọng nói Web Speech API. Bạn vẫn có thể gõ câu trả lời để tự đánh giá.'
    );
    onEnd();
    return null;
  }

  try {
    const recognition = new SpeechRec();
    recognition.lang = lang;
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onresult = (event: any) => {
      const text = event?.results?.[0]?.[0]?.transcript || '';
      onResult(text);
    };
    recognition.onerror = (event: any) => {
      onError(
        event?.error === 'not-allowed'
          ? 'Bạn chưa cấp quyền Micro cho trình duyệt.'
          : 'Không nghe rõ giọng nói, hãy thử nói lại gần micro hơn.'
      );
    };
    recognition.onend = () => {
      onEnd();
    };

    recognition.start();
    return () => {
      try {
        recognition.stop();
      } catch {
        // ignore
      }
    };
  } catch {
    onError('Không thể khởi tạo micro trên trình duyệt này.');
    onEnd();
    return null;
  }
}
