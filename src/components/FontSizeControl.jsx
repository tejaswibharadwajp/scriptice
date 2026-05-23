export default function FontSizeControl({ value, onChange }) {
  return (
    <div className="flex items-center gap-3 bg-white rounded-xl px-4 py-2 shadow-sm border border-stone-200">
      <span className="text-stone-500 text-sm font-medium select-none">A</span>
      <input
        type="range"
        min={40}
        max={160}
        step={10}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-28 accent-indigo-600 cursor-pointer"
      />
      <span className="text-stone-800 text-xl font-bold select-none">A</span>
    </div>
  );
}
