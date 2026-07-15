// src/components/PersonCard.tsx
import { Trash2, Check } from "lucide-react";
import type { Person } from "../types";

const BORDER = "#E0E3D6";

export function PersonCard({
  person,
  onDelete,
  onCompleteTask,
}: {
  person: Person;
  onDelete: () => void;
  onCompleteTask: (taskId: string) => void;
}) {
  const doneCount = person.tasks.filter((t) => t.completedAt).length;

  return (
    <div className="rounded-2xl p-4" style={{ backgroundColor: "#FFFFFF", border: `1px solid ${BORDER}` }}>
      <div className="flex items-start justify-between">
        <div>
          <p className="font-medium text-[15px]">{person.username}</p>
          {person.email && (
            <p className="text-[13px] mt-0.5" style={{ color: "#5A6558" }}>
              {person.email}
            </p>
          )}
        </div>
        <button onClick={onDelete} aria-label={`Remove ${person.username}`} style={{ color: "#94A090" }}>
          <Trash2 size={16} />
        </button>
      </div>

      <p className="text-[11px] uppercase tracking-wide mt-3 mb-1.5" style={{ color: "#94A090" }}>
        Assigned tasks ({person.tasks.length})
      </p>
      {person.tasks.length === 0 ? (
        <p className="text-[13px]" style={{ color: "#94A090" }}>No tasks assigned</p>
      ) : (
        <div className="flex flex-col gap-1.5">
          {person.tasks.map((t) => (
            <div key={t.id} className="flex items-center justify-between">
              <p className={`text-[13px] ${t.completedAt ? "line-through opacity-60" : ""}`}>
                {t.title} {t.completedAt?.substring(0, 10)}
              </p>
              {!t.completedAt && (
                <button
                  onClick={() => onCompleteTask(t.id)}
                  aria-label={`Mark ${t.title} as done`}
                  className="shrink-0 w-6 h-6 rounded-full flex items-center justify-center border"
                  style={{ borderColor: "#94A090", color: "#94A090" }}
                >
                  <Check size={12} />
                </button>
              )}
            </div>
          ))}
        </div>
      )}
      {doneCount > 0 && (
        <p className="text-[11px] mt-2" style={{ color: "#2F5233" }}>
          {doneCount} completed
        </p>
      )}
    </div>
  );
}