import { useParams, Link } from 'react-router-dom';
import { teluguVowels, teluguConsonantGroups } from '../data/telugu';
import { englishLetters } from '../data/english';
import LetterCard from '../components/LetterCard';

export default function LettersPage() {
  const { lang } = useParams();
  const isEnglish = lang === 'english';

  const vowels = !isEnglish ? teluguVowels : null;
  const letters = isEnglish ? englishLetters : null;

  return (
    <div className="min-h-screen bg-stone-50 pb-10">
      <div className="sticky top-0 bg-white/90 backdrop-blur border-b border-stone-100 px-4 py-3 flex items-center gap-3 z-10">
        <Link to="/" className="text-indigo-600 text-xl leading-none">←</Link>
        <h2 className="text-lg font-semibold text-stone-800">
          {isEnglish ? 'English Letters' : 'Telugu Letters'}
        </h2>
      </div>

      <div className="px-4 pt-4 space-y-6">
        {isEnglish && (
          <div>
            <div className="grid grid-cols-4 sm:grid-cols-6 gap-3">
              {letters.map((item) => (
                <LetterCard key={item.letter} item={item} lang="english" type="letter" />
              ))}
            </div>
          </div>
        )}

        {!isEnglish && (
          <>
            <section>
              <h3 className="text-sm font-semibold text-stone-500 uppercase tracking-wider mb-3">
                Vowels (అచ్చులు)
              </h3>
              <div className="grid grid-cols-4 sm:grid-cols-6 gap-3">
                {vowels.map((item) => (
                  <LetterCard key={item.letter} item={item} lang="telugu" type="letter" />
                ))}
              </div>
            </section>

            <section className="space-y-4">
              <h3 className="text-sm font-semibold text-stone-500 uppercase tracking-wider">
                Consonants (హల్లులు)
              </h3>
              {teluguConsonantGroups.map((group) => (
                <div key={group.label}>
                  <div className="text-xs text-indigo-400 font-semibold mb-2 pl-1" style={{ fontFamily: "'Noto Sans Telugu', serif" }}>
                    {group.label}
                  </div>
                  <div
                    className="flex flex-row gap-3 overflow-x-auto pb-1"
                    style={{ scrollSnapType: 'x mandatory' }}
                  >
                    {group.letters.map((item) => (
                      <div key={item.letter} className="shrink-0" style={{ scrollSnapAlign: 'start', width: 88 }}>
                        <LetterCard item={{ ...item, pronunciation: item.letter }} lang="telugu" type="letter" />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </section>
          </>
        )}
      </div>
    </div>
  );
}
