// src/components/HousePage.tsx
import { useEffect, useState } from "react";
import { ArrowLeft, Plus } from "lucide-react";
import { RoomCard } from "./RoomCard";
import { AddRoomModal } from "./AddRoomModal";
import type { RoomSummary } from "../types";
import { TaskPage } from "./TaskPage";

interface HouseDetail {
  id: string;
  name: string;
  rooms: RoomSummary[];
}

export function HousePage({ houseId, onBack }: { houseId: string; onBack: () => void }) {
  const [house, setHouse] = useState<HouseDetail | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showAddRoom, setShowAddRoom] = useState(false);
  const [selectedRoomId, setSelectedRoomId] = useState<string | null>(null);

  function loadHouse() {
    fetch(`/api/houses/${houseId}/rooms`)
      .then((res) => res.json())
      .then(setHouse)
      .catch(() => setError("Could not load this house"));
  }

  useEffect(loadHouse, [houseId]);

  if (error) return <p className="text-sm text-red-600">{error}</p>;
  if (!house) return <p className="text-sm">Loading...</p>;

  // inside the return, wrap the existing body:
if (selectedRoomId) {
  return <TaskPage roomId={selectedRoomId} onBack={() => setSelectedRoomId(null)} />;
}


  return (
    
    <div>
      <button onClick={onBack} className="flex items-center gap-1.5 text-sm mb-5" style={{ color: "#5A6558" }}>
        <ArrowLeft size={16} /> All houses
      </button>

      <div className="flex items-center justify-between mb-4">
        <h2 className="text-[20px] font-semibold">{house.name}</h2>
        <button
          onClick={() => setShowAddRoom(true)}
          className="flex items-center gap-1 text-sm font-medium rounded-full px-3.5 py-2 text-white"
          style={{ backgroundColor: "#2F5233" }}
        >
          <Plus size={15} /> Add room
        </button>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {house.rooms.map((room) => (
          <RoomCard key={room.id} room={room} onClick={() => setSelectedRoomId(room.id)} />
        ))}
      </div>

      {showAddRoom && (
        <AddRoomModal houseId={houseId} onClose={() => setShowAddRoom(false)} onCreated={loadHouse} />
      )}

      
    </div>
  );
}