import { useSearchParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import TracingCanvas from '../components/TracingCanvas';
import SpeakButton from '../components/SpeakButton';
import FontSizeControl from '../components/FontSizeControl';

export default function PracticePage() {
  const [params] = useSearchParams();
  const text = params.get('text') || 'అ';
  const lang = params.get('lang') || 'telugu';
  const type = params.get('type') || 'letter';
  const sub = params.get('sub') || '';
  const meaning = params.get('meaning') || '';

  const [fontSize, setFontSize] = useState(140);
  const isEnglish = lang === 'english';
  const voiceLang = isEnglish ? 'en-US' : 'te-IN';

  const fontFamily = isEnglish
    ? "'Segoe UI', system-ui, sans-serif"
    : "'Noto Sans Telugu', 'Mandali', serif";

  useEffect(() => {
    if (!window.speechSynthesis) return;
    const utt = new SpeechSynthesisUtterance(text);
    utt.lang = voiceLang;
    utt.rate = 0.5;
    utt.pitch = 1;
    utt.volume = 1;
    const t = setTimeout(() => window.speechSynthesis.speak(utt), 400);
    return () => {
      clearTimeout(t);
      window.speechSynthesis.cancel();
    };
  }, [text, voiceLang]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white flex flex-col">
      {/* Header */}
      <div className="sticky top-0 bg-white/90 backdrop-blur border-b border-stone-100 px-4 py-3 flex items-center gap-3 z-10">
        <Link to={-1} className="text-indigo-600 text-xl leading-none">←</Link>
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <span
            className="text-3xl font-bold leading-none select-none shrink-0"
            style={{ fontFamily, color: '#3730a3' }}
          >
            {text}
          </span>
          <div className="flex flex-col min-w-0">
            {sub && <span className="text-xs text-stone-400 font-medium tracking-wide">{sub}</span>}
            {meaning && <span className="text-xs text-indigo-500 font-medium">{meaning}</span>}
          </div>
        </div>
        <SpeakButton text={text} lang={voiceLang} size="md" />
      </div>

      {/* Canvas — dominant */}
      <div className="flex flex-col items-center px-3 pt-4 pb-2 flex-1">
        <div className="text-xs text-stone-400 font-medium mb-2">Trace with your finger ↓</div>
        <div className="w-full max-w-2xl flex-1 flex flex-col">
          <TracingCanvas letter={text} fontSize={fontSize} lang={lang} />
        </div>
      </div>

      {/* Font size control — pinned bottom */}
      <div className="flex justify-center pb-6 pt-2">
        <FontSizeControl value={fontSize} onChange={setFontSize} />
      </div>
    </div>
  );
}
