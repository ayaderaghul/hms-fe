// src/components/EditTaskModal.tsx
import { Modal } from "./Modal";
import { TaskForm } from "./TaskForm";
import type { Task } from "../types";

export function EditTaskModal({ task, onClose, onSaved }: { task: Task; onClose: () => void; onSaved: () => void }) {
  const API = import.meta.env.VITE_API_URL;

  return (
    <Modal title="Edit task" onClose={onClose}>
      <TaskForm
        initial={{
          title: task.title,
          desc: task.desc,
          tools: task.tools.join(", "),
          howto: task.howto,
          dueDate: task.dueDate ? task.dueDate.slice(0, 10) : "",
        }}
        submitLabel="Save changes"
        submittingLabel="Saving..."
        onSubmit={async (form) => {
          const res = await fetch(`${API}/api/tasks/${task.id}`, { method: "PATCH", body: form });
          if (!res.ok) throw new Error();
          onSaved();
          onClose();
        }}
      />
    </Modal>
  );
}