// src/components/TemplatePickerModal.tsx
import { useEffect, useState } from "react";
import { Modal } from "./Modal";
import type { TaskTemplate } from "../types";
import { TaskForm } from "./TaskForm";
import {AddTemplateModal} from "./AddTemplateModal"
const BORDER = "#E0E3D6";

export function TemplatePickerModal({
  roomId,
  houseId,
  onClose,
  onCreated,
}: {
  roomId: string;
  houseId: string;
  onClose: () => void;
  onCreated: () => void;
}) {
  const API = import.meta.env.VITE_API_URL;
  const [templates, setTemplates] = useState<TaskTemplate[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showNewTemplate, setShowNewTemplate] = useState(false);
const [showAddTemplate, setShowAddTemplate] = useState(false);
  function loadTemplates() {
    fetch(`${API}/api/rooms/${roomId}/templates`)
      .then((res) => res.json())
      .then(setTemplates)
      .catch(() => setError("Could not load templates"));
  }

  useEffect(loadTemplates, [roomId]);

  async function useTemplate(templateId: string) {
    try {
      const res = await fetch(`${API}/api/rooms/${roomId}/tasks/from-template/${templateId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({}),
      });
      if (!res.ok) throw new Error();
      onCreated();
      onClose();
    } catch {
      setError("Could not create task from template");
    }
  }

  return (
    <Modal title="Add templated task" onClose={onClose}>
      <button
  onClick={() => setShowAddTemplate(true)}
  className="rounded-full px-4 py-2 text-white"
  style={{ backgroundColor: "#2F5233" }}
>
  + New Template
</button>
      {error && <p className="text-xs text-red-600 mb-2">{error}</p>}

      {!templates ? (
        <p className="text-sm">Loading...</p>
      ) : templates.length === 0 && !showNewTemplate ? (
        <p className="text-[13px]" style={{ color: "#94A090" }}>No templates yet for this house.</p>
      ) : (
        <div className="flex flex-col gap-2 mb-3">
          {templates.map((t) => (
            <button
              key={t.id}
              onClick={() => useTemplate(t.id)}
              className="text-left rounded-lg px-3 py-2 text-sm"
              style={{ border: `1px solid ${BORDER}` }}
            >
              <p className="font-medium">{t.title}</p>
              {t.desc && (
                <p className="text-[12px] mt-0.5" style={{ color: "#5A6558" }}>
                  {t.desc}
                </p>
              )}
            </button>
          ))}
        </div>
      )}

      {showNewTemplate && (
  <div className="pt-3 border-t" style={{ borderColor: BORDER }}>
    <TaskForm
      submitLabel="Save template"
      submittingLabel="Saving..."
      onSubmit={async (form) => {
        const res = await fetch(`${API}/api/houses/${houseId}/templates`, { method: "POST", body: form });
        if (!res.ok) throw new Error();
        setShowNewTemplate(false);
        loadTemplates();
      }}
    />
  </div>
)}


{showAddTemplate && (
  <AddTemplateModal
    houseId={houseId}
    onClose={() => setShowAddTemplate(false)}
    onCreated={() => {
      loadTemplates();
    }}
  />
)}


    </Modal>
  );
}

