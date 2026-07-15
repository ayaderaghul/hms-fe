// src/components/PersonCard.tsx
import type { Person } from "../types";

const BORDER = "#E0E3D6";

export function PersonCard({ person }: { person: Person }) {
  const doneCount = person.tasks.filter((t) => t.completedAt).length;

  return (
    <div className="rounded-2xl p-4" style={{ backgroundColor: "#FFFFFF", border: `1px solid ${BORDER}` }}>
      <p className="font-medium text-[15px]">{person.username}</p>
      {person.email && (
        <p className="text-[13px] mt-0.5" style={{ color: "#5A6558" }}>
          {person.email}
        </p>
      )}

      <p className="text-[11px] uppercase tracking-wide mt-3 mb-1.5" style={{ color: "#94A090" }}>
        Assigned tasks ({person.tasks.length})
      </p>
      {person.tasks.length === 0 ? (
        <p className="text-[13px]" style={{ color: "#94A090" }}>No tasks assigned</p>
      ) : (
        <div className="flex flex-col gap-1">
          {person.tasks.map((t) => (
            <p key={t.id} className={`text-[13px] ${t.completedAt ? "line-through opacity-60" : ""}`}>
              {t.title}
            </p>
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