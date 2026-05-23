import { useNavigate } from 'react-router-dom';
import { speak } from './SpeakButton';

export default function LetterCard({ item, lang = 'telugu', type = 'letter' }) {
  const navigate = useNavigate();
  const isEnglish = lang === 'english';
  const voiceLang = isEnglish ? 'en-US' : 'te-IN';
  const displayText = type === 'word' ? item.word : item.letter;
  const subText = type === 'word'
    ? (isEnglish ? item.hint : item.roman)
    : item.roman;
  const meaning = type === 'word' && item.meaning ? item.meaning : null;

  const fontFamily = isEnglish
    ? 'system-ui, sans-serif'
    : "'Noto Sans Telugu', 'Mandali', serif";


  const handleSpeak = () => speak(displayText, voiceLang);

  const handlePractice = (e) => {
    e.stopPropagation();
    const params = new URLSearchParams({
      text: displayText,
      lang,
      type,
      sub: subText || '',
      meaning: meaning || '',
    });
    navigate(`/practice?${params.toString()}`);
  };

  return (
    <div
      onClick={handleSpeak}
      className="bg-white rounded-2xl shadow-sm border border-stone-100 p-5 flex flex-col items-center gap-3 active:scale-95 transition-transform cursor-pointer relative"
    >
      <div
        className="text-5xl font-bold leading-none py-2 select-none"
        style={{ fontFamily }}
      >
        {displayText}
      </div>
      {subText && (
        <div className="text-xs text-stone-400 font-medium tracking-wide">{subText}</div>
      )}
      {meaning && (
        <div className="text-xs text-indigo-600 font-medium">{meaning}</div>
      )}
      <button
        onClick={handlePractice}
        className="mt-1 w-11 h-11 rounded-full bg-amber-100 text-amber-700 hover:bg-amber-200 active:scale-95 transition-all flex items-center justify-center text-2xl"
        title="Practice writing"
      >
        ✏️
      </button>
    </div>
  );
}
