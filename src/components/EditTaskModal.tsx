// src/components/EditTaskModal.tsx
import { useState } from "react";
import { Modal } from "./Modal";
import type { Task } from "../types";

export function EditTaskModal({
  task,
  onClose,
  onSaved,
}: {
  task: Task;
  onClose: () => void;
  onSaved: () => void;
}) {
  const [title, setTitle] = useState(task.title);
  const [desc, setDesc] = useState(task.desc);
  const [tools, setTools] = useState(task.tools.join(", "));
  const [howto, setHowto] = useState(task.howto);
  const [dueDate, setDueDate] = useState(task.dueDate ? task.dueDate.slice(0, 10) : "");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [descImages,setDescImages] = useState<File[]>([]);
  const [toolImages,setToolImages] = useState<File[]>([]);
  const [howtoImages,setHowtoImages] = useState<File[]>([]);
  const API = import.meta.env.VITE_API_URL;
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
      const form = new FormData();


form.append("title",title);
form.append("desc",desc);
form.append(
 "tools",
 JSON.stringify(
   tools.split(",")
 )
);
form.append("howto",howto);


descImages.forEach(file =>
 form.append("descImages",file)
);


toolImages.forEach(file =>
 form.append("toolImages",file)
);


howtoImages.forEach(file =>
 form.append("howtoImages",file)
);


      const res = await fetch(`${API}/api/tasks/${task.id}`, {
        method: "PATCH",
        body: form,
      });
      if (!res.ok) throw new Error();
      onSaved();
      onClose();
    } catch {
      setError("Could not save changes — try again");
      setSubmitting(false);
    }
  }

  return (
    <Modal title="Edit task" onClose={onClose}>
      <div className="flex flex-col gap-3">
        <input className={inputClass} style={inputStyle} placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
        
        <input
  value={desc}
  onChange={(e) => setDesc(e.target.value)}
/>

        <input
  type="file"
  multiple
  accept="image/*"
  onChange={(e) =>
    setDescImages(
      Array.from(e.target.files ?? [])
    )
  }
/>

          <input
  value={tools}
  onChange={(e) => setTools(e.target.value)}
/>


        <input
  type="file"
  multiple
  accept="image/*"
  onChange={(e) =>
    setToolImages(
      Array.from(e.target.files ?? [])
    )
  }
/>

          <textarea
  value={howto}
  onChange={(e) => setHowto(e.target.value)}
/>


        <input
  type="file"
  multiple
  accept="image/*"
  onChange={(e) =>
    setHowtoImages(
      Array.from(e.target.files ?? [])
    )
  }
/>
        <input type="date" className={inputClass} style={inputStyle} 
        value={dueDate} 
        onChange={(e) => setDueDate(e.target.value)} />
        {error && <p className="text-xs text-red-600">{error}</p>}
        <button
          onClick={handleSubmit}
          disabled={submitting}
          className="rounded-full py-2.5 text-sm font-medium text-white disabled:opacity-50"
          style={{ backgroundColor: "#2F5233" }}
        >
          {submitting ? "Saving..." : "Save changes"}
        </button>
      </div>
    </Modal>
  );
}