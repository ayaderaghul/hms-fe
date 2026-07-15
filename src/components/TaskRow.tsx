// src/components/TaskRow.tsx
import type { Task } from "../types";

const BORDER = "#E0E3D6";

export function TaskRow({ task, onClick }: { task: Task; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="text-left rounded-xl p-3.5 w-full"
      style={{ backgroundColor: "#FFFFFF", border: `1px solid ${BORDER}`, opacity: task.completedAt ? 0.6 : 1 }}
    >
      <p className={`font-medium text-[14px] ${task.completedAt ? "line-through" : ""}`}>{task.title}</p>
      {task.desc && (
        <p className="text-[13px] mt-0.5" style={{ color: "#5A6558" }}>
          {task.desc}
        </p>
      )}
    </button>
  );
}