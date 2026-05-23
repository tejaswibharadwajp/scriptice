import { useState } from 'react';

const getBestVoice = (lang) => {
  const voices = window.speechSynthesis.getVoices();
  return (
    voices.find((v) => v.lang === lang) ||
    voices.find((v) => v.lang.startsWith(lang.split('-')[0])) ||
    null
  );
};

const buildUtterance = (text, lang) => {
  const utt = new SpeechSynthesisUtterance(text);
  utt.lang = lang;
  utt.rate = 0.5;
  utt.pitch = 1;
  utt.volume = 1;
  const voice = getBestVoice(lang);
  if (voice) utt.voice = voice;
  return utt;
};

export const speak = (text, lang = 'te-IN') => {
  if (!window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(buildUtterance(text, lang));
};

export default function SpeakButton({ text, lang = 'te-IN', size = 'md', className = '' }) {
  const [speaking, setSpeaking] = useState(false);

  const handleSpeak = () => {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const utt = buildUtterance(text, lang);
    utt.onstart = () => setSpeaking(true);
    utt.onend = () => setSpeaking(false);
    utt.onerror = () => setSpeaking(false);
    window.speechSynthesis.speak(utt);
  };

  const sizes = {
    sm: 'w-8 h-8 text-base',
    md: 'w-11 h-11 text-xl',
    lg: 'w-14 h-14 text-2xl',
  };

  return (
    <button
      onClick={handleSpeak}
      className={`${sizes[size]} rounded-full flex items-center justify-center
        ${speaking
          ? 'bg-indigo-600 text-white scale-110'
          : 'bg-indigo-100 text-indigo-700 hover:bg-indigo-200 active:scale-95'
        }
        transition-all duration-150 shadow-sm select-none ${className}`}
      title="Pronounce"
    >
      {speaking ? '🔊' : '🔈'}
    </button>
  );
}
