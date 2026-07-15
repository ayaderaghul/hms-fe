// src/components/Modal.tsx
import { X } from "lucide-react";
import type { ReactNode } from "react";

export function Modal({ title, onClose, children }: { title: string; onClose: () => void; children: ReactNode }) {
  return (
    <div className="fixed inset-0 flex items-end sm:items-center justify-center z-10" style={{ backgroundColor: "rgba(32,41,31,0.45)" }}>
      <div className="w-full sm:w-[380px] rounded-t-2xl sm:rounded-2xl p-5" style={{ backgroundColor: "#F1F1E8" }}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-[16px] font-semibold">{title}</h3>
          <button onClick={onClose} aria-label="Close">
            <X size={18} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}