import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { teluguWords } from '../data/telugu';
import { englishWords } from '../data/english';
import LetterCard from '../components/LetterCard';

const teluguCategories = [
  { label: 'క్రియలు · Verbs', start: 0, end: 18 },
  { label: 'కుటుంబం · Family', start: 18, end: 26 },
  { label: 'శరీరం · Body', start: 26, end: 33 },
  { label: 'జంతువులు · Animals', start: 33, end: 45 },
  { label: 'తిండి · Food', start: 45, end: 69 },
  { label: 'ప్రకృతి · Nature', start: 69, end: 81 },
  { label: 'స్థలాలు · Places & Things', start: 81, end: 91 },
  { label: 'నగరాలు · Cities', start: 91, end: 103 },
  { label: 'రంగులు · Colors', start: 103, end: 109 },
  { label: 'సంఖ్యలు · Numbers', start: 109, end: 138 },
];

export default function WordsPage() {
  const { lang } = useParams();
  const isEnglish = lang === 'english';
  const [selectedCat, setSelectedCat] = useState(null);

  const visibleCats = selectedCat === null
    ? teluguCategories
    : teluguCategories.filter((c) => c.label === selectedCat);

  return (
    <div className="min-h-screen bg-stone-50 pb-10">
      <div className="sticky top-0 bg-white/90 backdrop-blur border-b border-stone-100 px-4 py-3 flex items-center gap-3 z-10">
        <Link to="/" className="text-indigo-600 text-xl leading-none">←</Link>
        <h2 className="text-lg font-semibold text-stone-800">
          {isEnglish ? 'English Words' : 'Telugu Words'}
        </h2>
      </div>

      {!isEnglish && (
        <div className="px-4 pt-4 flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedCat(null)}
            className={`px-3 py-1 rounded-full text-sm font-semibold border transition-colors ${
              selectedCat === null
                ? 'bg-indigo-500 text-white border-indigo-500'
                : 'bg-white text-stone-800 border-stone-300 hover:border-indigo-300'
            }`}
          >
            All
          </button>
          {teluguCategories.map((cat) => (
            <button
              key={cat.label}
              onClick={() => setSelectedCat(selectedCat === cat.label ? null : cat.label)}
              className={`px-3 py-1 rounded-full text-sm font-semibold border transition-colors ${
                selectedCat === cat.label
                  ? 'bg-indigo-500 text-white border-indigo-500'
                  : 'bg-white text-stone-800 border-stone-300 hover:border-indigo-300'
              }`}
              style={{ fontFamily: "'Noto Sans Telugu', serif" }}
            >
              {cat.label}
            </button>
          ))}
        </div>
      )}

      <div className="px-4 pt-4 space-y-6">
        {isEnglish ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {englishWords.map((item) => (
              <LetterCard key={item.word} item={item} lang={lang} type="word" />
            ))}
          </div>
        ) : (
          visibleCats.map((cat) => (
            <section key={cat.label}>
              <h3 className="text-sm font-semibold text-indigo-400 mb-3" style={{ fontFamily: "'Noto Sans Telugu', serif" }}>
                {cat.label}
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {teluguWords.slice(cat.start, cat.end).map((item) => (
                  <LetterCard key={item.word} item={item} lang={lang} type="word" />
                ))}
              </div>
            </section>
          ))
        )}
      </div>
    </div>
  );
}
