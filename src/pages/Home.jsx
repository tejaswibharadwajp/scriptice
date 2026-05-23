import { Link } from 'react-router-dom';

const floatingLetters = [
  { char: 'అ', x: '8%',  y: '12%', size: 52, opacity: 0.07, rotate: -12 },
  { char: 'క',  x: '82%', y: '8%',  size: 44, opacity: 0.06, rotate: 15 },
  { char: 'A',  x: '88%', y: '30%', size: 60, opacity: 0.06, rotate: 20 },
  { char: 'ప',  x: '5%',  y: '45%', size: 48, opacity: 0.06, rotate: -8 },
  { char: 'B',  x: '78%', y: '58%', size: 50, opacity: 0.07, rotate: -15 },
  { char: 'మ',  x: '15%', y: '72%', size: 56, opacity: 0.06, rotate: 10 },
  { char: 'Z',  x: '90%', y: '78%', size: 44, opacity: 0.05, rotate: -5 },
  { char: 'ఇ',  x: '60%', y: '88%', size: 48, opacity: 0.06, rotate: 18 },
  { char: 'M',  x: '35%', y: '5%',  size: 42, opacity: 0.05, rotate: -20 },
  { char: 'హ',  x: '50%', y: '78%', size: 40, opacity: 0.05, rotate: 8 },
];

function FloatingBg() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none" aria-hidden="true">
      {floatingLetters.map((l, i) => (
        <div
          key={i}
          className="absolute font-bold"
          style={{
            left: l.x,
            top: l.y,
            fontSize: l.size,
            opacity: l.opacity,
            transform: `rotate(${l.rotate}deg)`,
            color: i % 2 === 0 ? '#6366f1' : '#f59e0b',
            fontFamily: ['అ','క','ప','మ','ఇ','హ'].includes(l.char)
              ? "'Noto Sans Telugu', serif"
              : 'system-ui, sans-serif',
          }}
        >
          {l.char}
        </div>
      ))}
    </div>
  );
}

const teluguFont = { fontFamily: "'Noto Sans Telugu', serif" };

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden" style={{ background: 'linear-gradient(135deg, #eef2ff 0%, #fff7ed 50%, #fefce8 100%)' }}>
      <FloatingBg />

      <div className="relative z-10 flex flex-col items-center px-5 pt-14 pb-16 gap-12 max-w-lg mx-auto">

        {/* Hero */}
        <div className="text-center flex flex-col items-center gap-4">
          <div className="relative">
            <div
              className="w-24 h-24 rounded-3xl flex items-center justify-center text-5xl shadow-xl"
              style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}
            >
              ✏️
            </div>
            <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-amber-400 border-2 border-white flex items-center justify-center text-xs font-bold text-white">
              2
            </div>
          </div>
          <div>
            <h1 className="text-5xl font-black tracking-tight text-stone-900">Scriptice</h1>
            <p className="text-stone-500 mt-2 text-base leading-relaxed">
              Trace, speak &amp; learn<br />
              <span style={teluguFont} className="text-indigo-500 font-semibold text-lg">తెలుగు</span>
              <span className="text-stone-300 mx-2">·</span>
              <span className="text-amber-500 font-semibold text-lg">English</span>
            </p>
          </div>

          {/* Feature pills */}
          <div className="flex flex-wrap justify-center gap-2 mt-1">
            {['🔊 Voice', '✍️ Trace', '📏 Font size', '📱 Touch'].map(f => (
              <span key={f} className="text-xs bg-white/80 border border-stone-200 text-stone-600 px-3 py-1 rounded-full font-medium shadow-sm">
                {f}
              </span>
            ))}
          </div>
        </div>

        {/* Telugu section */}
        <div className="w-full flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent to-indigo-200" />
            <span className="text-xs font-bold text-indigo-400 tracking-widest uppercase">Telugu</span>
            <div className="h-px flex-1 bg-gradient-to-l from-transparent to-indigo-200" />
          </div>

          <div className="grid grid-cols-2 gap-3">
            {/* Telugu Letters */}
            <Link
              to="/telugu/letters"
              className="group relative overflow-hidden rounded-2xl p-4 flex flex-col gap-2 shadow-md active:scale-95 transition-transform"
              style={{ background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)' }}
            >
              <div className="absolute -right-3 -top-3 text-7xl font-bold opacity-10 select-none" style={teluguFont}>అ</div>
              <div className="text-white/70 text-xs font-semibold uppercase tracking-wider">Letters</div>
              <div className="text-white text-3xl font-bold leading-tight" style={teluguFont}>
                అ ఆ ఇ
              </div>
              <div className="text-white/80 text-xs mt-auto">51 letters · Vowels &amp; Consonants</div>
              <div className="absolute bottom-3 right-3 text-white/50 text-lg">→</div>
            </Link>

            {/* Telugu Words */}
            <Link
              to="/telugu/words"
              className="group relative overflow-hidden rounded-2xl p-4 flex flex-col gap-2 shadow-md active:scale-95 transition-transform"
              style={{ background: 'linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)' }}
            >
              <div className="absolute -right-2 -top-2 text-6xl font-bold opacity-10 select-none" style={teluguFont}>అమ్మ</div>
              <div className="text-white/70 text-xs font-semibold uppercase tracking-wider">Words</div>
              <div className="text-white text-2xl font-bold leading-snug" style={teluguFont}>
                అమ్మ<br />నాన్న
              </div>
              <div className="text-white/80 text-xs mt-auto">20 words · with meaning</div>
              <div className="absolute bottom-3 right-3 text-white/50 text-lg">→</div>
            </Link>
          </div>
        </div>

        {/* English section */}
        <div className="w-full flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent to-amber-200" />
            <span className="text-xs font-bold text-amber-500 tracking-widest uppercase">English</span>
            <div className="h-px flex-1 bg-gradient-to-l from-transparent to-amber-200" />
          </div>

          <div className="grid grid-cols-2 gap-3">
            {/* English Letters */}
            <Link
              to="/english/letters"
              className="group relative overflow-hidden rounded-2xl p-4 flex flex-col gap-2 shadow-md active:scale-95 transition-transform"
              style={{ background: 'linear-gradient(135deg, #f59e0b 0%, #f97316 100%)' }}
            >
              <div className="absolute -right-2 -top-4 text-7xl font-black opacity-10 select-none">A</div>
              <div className="text-white/70 text-xs font-semibold uppercase tracking-wider">Letters</div>
              <div className="text-white text-3xl font-black tracking-tight">
                A B C
              </div>
              <div className="text-white/80 text-xs mt-auto">26 letters · A to Z</div>
              <div className="absolute bottom-3 right-3 text-white/50 text-lg">→</div>
            </Link>

            {/* English Words */}
            <Link
              to="/english/words"
              className="group relative overflow-hidden rounded-2xl p-4 flex flex-col gap-2 shadow-md active:scale-95 transition-transform"
              style={{ background: 'linear-gradient(135deg, #ea580c 0%, #dc2626 100%)' }}
            >
              <div className="absolute -right-2 -top-3 text-5xl font-black opacity-10 select-none">Z</div>
              <div className="text-white/70 text-xs font-semibold uppercase tracking-wider">Words</div>
              <div className="text-white text-xl font-bold leading-snug">
                Apple<br />Zebra
              </div>
              <div className="text-white/80 text-xs mt-auto">26 words · one per letter</div>
              <div className="absolute bottom-3 right-3 text-white/50 text-lg">→</div>
            </Link>
          </div>
        </div>

        {/* Bottom tip */}
        <p className="text-center text-xs text-stone-400 leading-relaxed">
          Tap any letter to hear it · Press ✏️ to trace it
        </p>

      </div>
    </div>
  );
}
