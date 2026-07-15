// src/components/RoomCard.tsx
import { Dial } from "./Dial";
import type { RoomSummary } from "../types";

const BORDER = "#E0E3D6";

export function RoomCard({ room, onClick }: { room: RoomSummary; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="text-left rounded-2xl p-4"
      style={{ backgroundColor: "#FFFFFF", border: `1px solid ${BORDER}` }}
    >
      <div className="flex items-center justify-between mb-3">
        <span className="font-medium text-[15px]">{room.name}</span>
        <Dial done={room.doneTasks} total={room.totalTasks} />
      </div>
      <p className="text-[11px]" style={{ color: "#94A090" }}>
        {room.totalTasks === 0
          ? "No tasks yet"
          : room.doneTasks === room.totalTasks
          ? "All clear"
          : `${room.totalTasks - room.doneTasks} left`}
      </p>
    </button>
  );
}