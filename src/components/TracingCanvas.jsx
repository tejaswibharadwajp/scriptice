import { useRef, useEffect, useCallback, useState } from 'react';
import SpeakButton from './SpeakButton';

export default function TracingCanvas({ letter, fontSize = 120, lang = 'telugu' }) {
  const canvasRef = useRef(null);
  const drawing = useRef(false);
  const lastPos = useRef(null);
  const activeTouchId = useRef(null);
  const cssSize = useRef({ w: 0, h: 0 });
  const [cleared, setCleared] = useState(false);

  const fontFamily = lang === 'telugu'
    ? "'Noto Sans Telugu', 'Mandali', serif"
    : "'Segoe UI', system-ui, sans-serif";

  const drawGuide = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const { w, h } = cssSize.current;
    if (!w || !h) return;

    ctx.clearRect(0, 0, w, h);

    // dotted guide lines in CSS coordinates
    ctx.setLineDash([6, 8]);
    ctx.strokeStyle = '#d1d5db';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, h / 2);
    ctx.lineTo(w, h / 2);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(w / 2, 0);
    ctx.lineTo(w / 2, h);
    ctx.stroke();
    ctx.setLineDash([]);

    // ghost letter centered in CSS space
    ctx.font = `${fontSize}px ${fontFamily}`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = 'rgba(99, 102, 241, 0.15)';
    ctx.fillText(letter, w / 2, h / 2);
  }, [letter, fontSize, fontFamily]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const setup = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      cssSize.current = { w: rect.width, h: rect.height };
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      const ctx = canvas.getContext('2d');
      ctx.scale(dpr, dpr);
      drawGuide();
    };

    setup();
    const ro = new ResizeObserver(setup);
    ro.observe(canvas);
    return () => ro.disconnect();
  }, [drawGuide]);

  const getPos = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    let src = e;
    if (e.touches) {
      src = activeTouchId.current !== null
        ? Array.from(e.touches).find((t) => t.identifier === activeTouchId.current)
        : e.touches[0];
      if (!src) return null;
    }
    return {
      x: src.clientX - rect.left,
      y: src.clientY - rect.top,
    };
  };

  const startDraw = (e) => {
    e.preventDefault();
    // 2nd finger down (palm/accidental touch): ignore, don't start a new stroke
    if (e.touches && e.touches.length > 1) return;
    drawing.current = true;
    activeTouchId.current = e.touches ? e.touches[0].identifier : null;
    lastPos.current = getPos(e);
    setCleared(false);
  };

  const draw = (e) => {
    e.preventDefault();
    if (!drawing.current) return;
    // 2nd finger landed mid-stroke: stop, don't jump the line to it
    if (e.touches && e.touches.length > 1) {
      drawing.current = false;
      lastPos.current = null;
      activeTouchId.current = null;
      return;
    }
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const pos = getPos(e);
    if (!pos || !lastPos.current) return;

    ctx.beginPath();
    ctx.moveTo(lastPos.current.x, lastPos.current.y);
    ctx.lineTo(pos.x, pos.y);
    ctx.strokeStyle = '#4338ca';
    ctx.lineWidth = 5;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.stroke();

    lastPos.current = pos;
  };

  const stopDraw = (e) => {
    e.preventDefault();
    drawing.current = false;
    lastPos.current = null;
    activeTouchId.current = null;
  };

  const clearCanvas = () => {
    drawGuide();
    setCleared(true);
    setTimeout(() => setCleared(false), 600);
  };

  return (
    <div className="flex flex-col items-center gap-4 w-full">
      <canvas
        ref={canvasRef}
        className="w-full rounded-3xl border-2 border-indigo-200 bg-white cursor-crosshair touch-none select-none shadow-inner"
        style={{ aspectRatio: '1 / 1', WebkitTouchCallout: 'none', WebkitUserSelect: 'none' }}
        onMouseDown={startDraw}
        onMouseMove={draw}
        onMouseUp={stopDraw}
        onMouseLeave={stopDraw}
        onTouchStart={startDraw}
        onTouchMove={draw}
        onTouchEnd={stopDraw}
        onTouchCancel={stopDraw}
        onContextMenu={(e) => e.preventDefault()}
      />
      <button
        onClick={clearCanvas}
        className={`px-8 py-3.5 min-h-[48px] rounded-xl text-base font-semibold transition-all active:scale-95
          ${cleared
            ? 'bg-green-100 text-green-700'
            : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
          }`}
      >
        {cleared ? '✓ Cleared' : 'Clear'}
      </button>
      <SpeakButton text={letter} lang={lang === 'telugu' ? 'te-IN' : 'en-US'} size="lg" />
    </div>
  );
}
