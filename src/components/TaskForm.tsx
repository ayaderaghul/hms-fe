// src/components/TaskForm.tsx
import { useState } from "react";

const inputClass = "w-full rounded-lg px-3 py-2 text-sm border outline-none";
const inputStyle = { backgroundColor: "#FFFFFF", borderColor: "#E0E3D6" };

export interface TaskFormInitial {
  title?: string;
  desc?: string;
  tools?: string; // comma-joined
  howto?: string;
  dueDate?: string; // yyyy-mm-dd
}

export function TaskForm({
  initial = {},
  submitLabel,
  submittingLabel,
  onSubmit,
}: {
  initial?: TaskFormInitial;
  submitLabel: string;
  submittingLabel: string;
  onSubmit: (form: FormData) => Promise<void>;
}) {
  const [title, setTitle] = useState(initial.title ?? "");
  const [desc, setDesc] = useState(initial.desc ?? "");
  const [tools, setTools] = useState(initial.tools ?? "");
  const [howto, setHowto] = useState(initial.howto ?? "");
  const [dueDate, setDueDate] = useState(initial.dueDate ?? "");
  const [descImages, setDescImages] = useState<File[]>([]);
  const [toolImages, setToolImages] = useState<File[]>([]);
  const [howtoImages, setHowtoImages] = useState<File[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit() {
    if (!title.trim()) {
      setError("Enter a title");
      return;
    }
    setSubmitting(true);
    setError(null);

    const form = new FormData();
    form.append("title", title);
    form.append("desc", desc);
    form.append("tools", JSON.stringify(tools.split(",").map((t) => t.trim()).filter(Boolean)));
    form.append("howto", howto);
    form.append("dueDate", dueDate ? new Date(dueDate).toISOString() : "");
    descImages.forEach((file) => form.append("descImages", file));
    toolImages.forEach((file) => form.append("toolImages", file));
    howtoImages.forEach((file) => form.append("howtoImages", file));

    try {
      await onSubmit(form);
    } catch {
      setError("Something went wrong — try again");
      setSubmitting(false);
    }
  }

  return (
    <div className="flex flex-col gap-3">
      <input className={inputClass} style={inputStyle} placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />

      <input className={inputClass} style={inputStyle} placeholder="Description" value={desc} onChange={(e) => setDesc(e.target.value)} />
      <input type="file" multiple accept="image/*" onChange={(e) => setDescImages(Array.from(e.target.files ?? []))} />

      <input className={inputClass} style={inputStyle} placeholder="Tools (comma separated)" value={tools} onChange={(e) => setTools(e.target.value)} />
      <input type="file" multiple accept="image/*" onChange={(e) => setToolImages(Array.from(e.target.files ?? []))} />

      <textarea className={inputClass} style={inputStyle} rows={2} placeholder="How to" value={howto} onChange={(e) => setHowto(e.target.value)} />
      <input type="file" multiple accept="image/*" onChange={(e) => setHowtoImages(Array.from(e.target.files ?? []))} />

      <input type="date" className={inputClass} style={inputStyle} value={dueDate} onChange={(e) => setDueDate(e.target.value)} />

      {error && <p className="text-xs text-red-600">{error}</p>}

      <button
        onClick={handleSubmit}
        disabled={submitting}
        className="rounded-full py-2.5 text-sm font-medium text-white disabled:opacity-50"
        style={{ backgroundColor: "#2F5233" }}
      >
        {submitting ? submittingLabel : submitLabel}
      </button>
    </div>
  );
}