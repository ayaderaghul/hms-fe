// src/components/AddTaskModal.tsx
import { useState } from "react";
import { Modal } from "./Modal";

export function AddTaskModal({
  roomId,
  onClose,
  onCreated,
}: {
  roomId: string;
  onClose: () => void;
  onCreated: () => void;
}) {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [tools, setTools] = useState("");
  const [howto, setHowto] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const inputClass = "w-full rounded-lg px-3 py-2 text-sm border outline-none";
  const inputStyle = { backgroundColor: "#FFFFFF", borderColor: "#E0E3D6" };

  async function handleSubmit() {
    if (!title.trim()) {
      setError("Enter a title");
      return;
    }
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch(`/api/rooms/${roomId}/tasks`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          desc,
          tools: tools.split(",").map((t) => t.trim()).filter(Boolean),
          howto,
          dueDate: dueDate ? new Date(dueDate).toISOString() : null,
        }),
      });
      if (!res.ok) throw new Error();
      onCreated();
      onClose();
    } catch {
      setError("Could not create task — try again");
      setSubmitting(false);
    }
  }

  return (
    <Modal title="New task" onClose={onClose}>
      <div className="flex flex-col gap-3">
        <input className={inputClass} style={inputStyle} placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
        <input className={inputClass} style={inputStyle} placeholder="Description" value={desc} onChange={(e) => setDesc(e.target.value)} />
        <input className={inputClass} style={inputStyle} placeholder="Tools (comma separated)" value={tools} onChange={(e) => setTools(e.target.value)} />
        <textarea className={inputClass} style={inputStyle} rows={2} placeholder="How to" value={howto} onChange={(e) => setHowto(e.target.value)} />
        <input type="date" className={inputClass} style={inputStyle} value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
        {error && <p className="text-xs text-red-600">{error}</p>}
        <button
          onClick={handleSubmit}
          disabled={submitting}
          className="rounded-full py-2.5 text-sm font-medium text-white disabled:opacity-50"
          style={{ backgroundColor: "#2F5233" }}
        >
          {submitting ? "Creating..." : "Create task"}
        </button>
      </div>
    </Modal>
  );
}