// Native Web Speech API (zh-CN) TTS Helper + Pinyin normalization

let cachedVoice: SpeechSynthesisVoice | null = null;

function pickChineseVoice(): SpeechSynthesisVoice | null {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return null;
  const voices = window.speechSynthesis.getVoices();
  if (!voices.length) return cachedVoice;

  const preferred =
    voices.find((v) => v.lang.toLowerCase() === 'zh-cn' && /xiaoxiao|yaoyao|huihui|tingting|google|natural|online/i.test(v.name)) ||
    voices.find((v) => v.lang.toLowerCase() === 'zh-cn') ||
    voices.find((v) => v.lang.toLowerCase().startsWith('zh-hans')) ||
    voices.find((v) => v.lang.toLowerCase().startsWith('zh'));

  cachedVoice = preferred ?? null;
  return cachedVoice;
}

if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
  window.speechSynthesis.onvoiceschanged = () => {
    pickChineseVoice();
  };
}

export function isSpeechSupported(): boolean {
  return typeof window !== 'undefined' && 'speechSynthesis' in window;
}

export function speakChinese(text: string, rate: number = 1.0, onEnd?: () => void): void {
  if (!isSpeechSupported()) {
    onEnd?.();
    return;
  }
  const clean = text.trim();
  if (!clean) {
    onEnd?.();
    return;
  }
  window.speechSynthesis.cancel();
  const utter = new SpeechSynthesisUtterance(clean);
  utter.lang = 'zh-CN';
  utter.rate = rate;
  utter.pitch = 1.0;

  const voice = pickChineseVoice();
  if (voice) {
    utter.voice = voice;
  }
  if (onEnd) {
    utter.onend = onEnd;
    utter.onerror = onEnd;
  }
  window.speechSynthesis.speak(utter);
}

export function stopSpeaking(): void {
  if (isSpeechSupported()) {
    window.speechSynthesis.cancel();
  }
}

/** Strip tone marks from Pinyin so users can search "nihao" and find "nǐ hǎo" */
export function normalizePinyin(input: string): string {
  return input
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/ü/g, 'u')
    .replace(/v/g, 'u')
    .replace(/['’\s-]+/g, '');
}

/** Extract single Chinese Hanzi characters from any string */
export function extractHanziChars(input: string): string[] {
  const matches = input.match(/[\u4e00-\u9fff]/g);
  return matches ? Array.from(new Set(matches)) : [];
}
