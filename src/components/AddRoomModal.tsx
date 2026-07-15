// src/components/AddRoomModal.tsx
import { useState } from "react";
import { Modal } from "./Modal";

export function AddRoomModal({
  houseId,
  onClose,
  onCreated,
}: {
  houseId: string;
  onClose: () => void;
  onCreated: () => void;
}) {
  const [name, setName] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit() {
    if (!name.trim()) {
      setError("Enter a name");
      return;
    }
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch(`/api/houses/${houseId}/rooms`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      });
      if (!res.ok) throw new Error();
      onCreated();
      onClose();
    } catch {
      setError("Could not create room — try again");
      setSubmitting(false);
    }
  }

  return (
    <Modal title="Add room" onClose={onClose}>
      <input
        autoFocus
        className="w-full rounded-lg px-3 py-2 text-sm border outline-none"
        style={{ backgroundColor: "#FFFFFF", borderColor: "#E0E3D6" }}
        placeholder="Room name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      {error && <p className="text-xs text-red-600 mt-2">{error}</p>}
      <button
        onClick={handleSubmit}
        disabled={submitting}
        className="mt-3 w-full rounded-full py-2.5 text-sm font-medium text-white disabled:opacity-50"
        style={{ backgroundColor: "#2F5233" }}
      >
        {submitting ? "Adding..." : "Add room"}
      </button>
    </Modal>
  );
}