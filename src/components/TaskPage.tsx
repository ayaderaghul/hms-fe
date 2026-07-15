// src/components/TaskPage.tsx
import { useEffect, useState } from "react";
import { ArrowLeft, Plus } from "lucide-react";
import { TaskRow } from "./TaskRow";
import { AddTaskModal } from "./AddTaskModal";
import type { Task } from "../types";
import { TaskDetailPage } from "./TaskDetailPage";

interface RoomDetail {
  id: string;
  name: string;
  tasks: Task[];
}

export function TaskPage({ roomId, onBack }: { roomId: string; onBack: () => void }) {
  const [room, setRoom] = useState<RoomDetail | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showAddTask, setShowAddTask] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
  const API = import.meta.env.VITE_API_URL;
  function loadRoom() {
    fetch(`${API}/api/rooms/${roomId}/tasks`)
      .then((res) => res.json())
      .then(setRoom)
      .catch(() => setError("Could not load this room"));
  }

  useEffect(loadRoom, [roomId]);

  if (error) return <p className="text-sm text-red-600">{error}</p>;
  if (!room) return <p className="text-sm">Loading...</p>;

  const waiting = room.tasks.filter((t) => !t.completedAt);
  const done = room.tasks.filter((t) => t.completedAt);
    if (selectedTaskId) {
      return <TaskDetailPage taskId={selectedTaskId} onBack={() => setSelectedTaskId(null)} />;
    }
  return (
    <div>
      <button onClick={onBack} className="flex items-center gap-1.5 text-sm mb-5" style={{ color: "#5A6558" }}>
        <ArrowLeft size={16} /> Back to rooms
      </button>

      <div className="flex items-center justify-between mb-4">
        <h2 className="text-[20px] font-semibold">{room.name}</h2>
        <button
          onClick={() => setShowAddTask(true)}
          className="flex items-center gap-1 text-sm font-medium rounded-full px-3.5 py-2 text-white"
          style={{ backgroundColor: "#2F5233" }}
        >
          <Plus size={15} /> Add task
        </button>
      </div>

      <p className="text-[11px] uppercase tracking-wide mb-2" style={{ color: "#94A090" }}>
        Waiting ({waiting.length})
      </p>
      <div className="flex flex-col gap-2 mb-5">
        {waiting.length === 0 && <p className="text-[13px]" style={{ color: "#94A090" }}>Nothing waiting</p>}
        {waiting.map((task) => (
          <TaskRow key={task.id} task={task} onClick={() => setSelectedTaskId(task.id)}/>
        ))}
      </div>

      <p className="text-[11px] uppercase tracking-wide mb-2" style={{ color: "#94A090" }}>
        Done ({done.length})
      </p>
      <div className="flex flex-col gap-2">
        {done.length === 0 && <p className="text-[13px]" style={{ color: "#94A090" }}>Nothing done yet</p>}
        {done.map((task) => (
          <TaskRow key={task.id} task={task} onClick={() => setSelectedTaskId(task.id)}/>
        ))}
      </div>

      {showAddTask && (
        <AddTaskModal roomId={roomId} onClose={() => setShowAddTask(false)} onCreated={loadRoom} />
      )}
    </div>
  );
}