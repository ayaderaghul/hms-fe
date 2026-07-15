// src/components/ImageModal.tsx
import { X } from "lucide-react";

export function ImageModal({ src, onClose }: { src: string; onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-20 p-4"
      style={{ backgroundColor: "rgba(0,0,0,0.85)" }}
      onClick={onClose}
    >
      <button onClick={onClose} aria-label="Close" className="absolute top-4 right-4 text-white">
        <X size={24} />
      </button>
      <img
        src={src}
        alt=""
        className="max-w-full max-h-full rounded-lg"
        onClick={(e) => e.stopPropagation()}
      />
    </div>
  );
}