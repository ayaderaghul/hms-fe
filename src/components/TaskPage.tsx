// src/components/TaskPage.tsx
import { useEffect, useState } from "react";
import { ArrowLeft, Plus } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

import { TaskRow } from "./TaskRow";
import { AddTaskModal } from "./AddTaskModal";
import {TemplatePickerModal} from "./TemplatePickerModal"
import type { Task } from "../types";
const BORDER = "#E0E3D6";

interface RoomDetail {
  id: string;
  name: string;
  houseId: string;

  tasks: Task[];
}

export function TaskPage() {
  const { roomId } = useParams();
  const navigate = useNavigate();

  const [room, setRoom] = useState<RoomDetail | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showAddTask, setShowAddTask] = useState(false);
  const [showTemplatePicker, setShowTemplatePicker] = useState(false);

  const API = import.meta.env.VITE_API_URL;

  function loadRoom() {
    if (!roomId) return;

    fetch(`${API}/api/rooms/${roomId}/tasks`)
      .then((res) => res.json())
      .then(setRoom)
      .catch(() => setError("Could not load this room"));
  }

  useEffect(() => {
    loadRoom();
  }, [roomId]);

  async function handleDeleteTask(taskId: string) {
    if (!confirm("Delete this task?")) return;
    try {
      const res = await fetch(`${API}/api/tasks/${taskId}`, { method: "DELETE" });
      if (!res.ok) throw new Error();
      loadRoom();
    } catch {
      setError("Could not delete task — try again");
    }
  }

  if (!roomId) {
    return <p className="text-sm text-red-600">Missing room id</p>;
  }

  if (error) {
    return <p className="text-sm text-red-600">{error}</p>;
  }

  if (!room) {
    return <p className="text-sm">Loading...</p>;
  }

  const waiting = room.tasks.filter((task) => !task.completedAt);
  const done = room.tasks.filter((task) => task.completedAt);

  return (
    <div className="max-w-md mx-auto px-5 py-7">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-1.5 text-sm mb-5"
        style={{ color: "#5A6558" }}
      >
        <ArrowLeft size={16} />
        Back to rooms
      </button>

      <div className="flex items-center justify-between mb-4">
        <h2 className="text-[20px] font-semibold">{room.name}</h2>

        <button
          onClick={() => setShowAddTask(true)}
          className="flex items-center gap-1 text-sm font-medium rounded-full px-3.5 py-2 text-white"
          style={{ backgroundColor: "#2F5233" }}
        >
          <Plus size={15} />
          Add task
        </button>

        <button
  onClick={() => setShowTemplatePicker(true)}
  className="flex items-center gap-1 text-sm font-medium rounded-full px-3.5 py-2"
  style={{ border: `1px solid ${BORDER}`, color: "#2F5233" }}
>
  <Plus size={15} />
  Add templated task
</button>
      </div>

      <p className="text-[11px] uppercase tracking-wide mb-2" style={{ color: "#94A090" }}>
        Waiting ({waiting.length})
      </p>

      <div className="flex flex-col gap-2 mb-5">
        {waiting.length === 0 && (
          <p className="text-[13px]" style={{ color: "#94A090" }}>
            Nothing waiting
          </p>
        )}

        {waiting.map((task) => (
          <TaskRow
            key={task.id}
            task={task}
            onClick={() => navigate(`/tasks/${task.id}`)}
            onDelete={() => handleDeleteTask(task.id)}
          />
        ))}
      </div>

      <p className="text-[11px] uppercase tracking-wide mb-2" style={{ color: "#94A090" }}>
        Done ({done.length})
      </p>

      <div className="flex flex-col gap-2">
        {done.length === 0 && (
          <p className="text-[13px]" style={{ color: "#94A090" }}>
            Nothing done yet
          </p>
        )}

        {done.map((task) => (
          <TaskRow
            key={task.id}
            task={task}
            onClick={() => navigate(`/tasks/${task.id}`)}
            onDelete={() => handleDeleteTask(task.id)}
          />
        ))}
      </div>

      

       {showAddTask && (
        <AddTaskModal
          roomId={roomId}
          houseId={room.houseId}
          onClose={() => setShowAddTask(false)}
          onCreated={loadRoom}
        />
      )}

      {showTemplatePicker && roomId && (
  <TemplatePickerModal
    roomId={roomId}
    houseId={room.houseId}
    onClose={() => setShowTemplatePicker(false)}
    onCreated={loadRoom}
  />
)}



    </div>
  );
}