// src/components/AddPersonModal.tsx
import { useState } from "react";
import { Modal } from "./Modal";

export function AddPersonModal({
  houseId,
  onClose,
  onCreated,
}: {
  houseId: string;
  onClose: () => void;
  onCreated: () => void;
}) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const inputClass = "w-full rounded-lg px-3 py-2 text-sm border outline-none";
  const inputStyle = { backgroundColor: "#FFFFFF", borderColor: "#E0E3D6" };

  async function handleSubmit() {
    if (!username.trim()) {
      setError("Enter a username");
      return;
    }
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch(`/api/houses/${houseId}/people`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email }),
      });
      if (!res.ok) throw new Error();
      onCreated();
      onClose();
    } catch {
      setError("Could not add person — try again");
      setSubmitting(false);
    }
  }

  return (
    <Modal title="Add person" onClose={onClose}>
      <div className="flex flex-col gap-3">
        <input className={inputClass} style={inputStyle} placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
        <input className={inputClass} style={inputStyle} placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        {error && <p className="text-xs text-red-600">{error}</p>}
        <button
          onClick={handleSubmit}
          disabled={submitting}
          className="rounded-full py-2.5 text-sm font-medium text-white disabled:opacity-50"
          style={{ backgroundColor: "#2F5233" }}
        >
          {submitting ? "Adding..." : "Add person"}
        </button>
      </div>
    </Modal>
  );
}