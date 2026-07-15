// src/components/Dial.tsx
const PINE = "#2F5233";
const BORDER = "#E0E3D6";

export function Dial({ done, total }: { done: number; total: number }) {
  const pct = total === 0 ? 0 : (done / total) * 100;
  return (
    <div
      className="relative w-11 h-11 rounded-full shrink-0"
      style={{ background: `conic-gradient(${PINE} ${pct}%, ${BORDER} 0)` }}
    >
      <div className="absolute inset-[3px] rounded-full flex items-center justify-center bg-white">
        <span className="text-[10px] font-semibold">
          {done}/{total}
        </span>
      </div>
    </div>
  );
}