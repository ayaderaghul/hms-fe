// src/components/TaskRow.tsx
import { Trash2 } from "lucide-react";
import type { Task } from "../types";

const BORDER = "#E0E3D6";

export function TaskRow({
  task,
  onClick,
  onDelete,
}: {
  task: Task;
  onClick: () => void;
  onDelete: () => void;
}) {
  return (
    <div
      className="flex items-center gap-2 rounded-xl p-3.5 w-full"
      style={{ backgroundColor: "#FFFFFF", border: `1px solid ${BORDER}`, opacity: task.completedAt ? 0.6 : 1 }}
    >
      <button onClick={onClick} className="text-left flex-1 min-w-0">
        <p className={`font-medium text-[14px] ${task.completedAt ? "line-through" : ""}`}>{task.title}</p>
        {task.desc && (
          <p className="text-[13px] mt-0.5 truncate" style={{ color: "#5A6558" }}>
            {task.desc}
          </p>
        )}
      </button>

      <div
        className="w-2.5 h-2.5 rounded-full shrink-0"
        style={{ backgroundColor: task.completedAt ? "#2F5233" : "#C98A2B" }}
        aria-label={task.completedAt ? "Done" : "Waiting"}
      />

      <button
        onClick={onDelete}
        aria-label={`Delete ${task.title}`}
        className="shrink-0"
        style={{ color: "#94A090" }}
      >
        <Trash2 size={16} />
      </button>
    </div>
  );
}