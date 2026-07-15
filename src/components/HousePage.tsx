
// src/components/HousePage.tsx

import { useEffect, useState } from "react";
import { ArrowLeft, Plus } from "lucide-react";
import { Link,useNavigate, useParams } from "react-router-dom";

import { RoomCard } from "./RoomCard";
import { AddRoomModal } from "./AddRoomModal";
import type { RoomSummary, HouseSummary } from "../types";

const BORDER = "#E0E3D6";

interface HouseDetail {
  id: string;
  name: string;
  rooms: RoomSummary[];
}

export function HousePage() {
  const { houseId } = useParams();
  const navigate = useNavigate();

  const [house, setHouse] = useState<HouseDetail | null>(null);
  const [houseSummary, setHouseSummary] = useState<HouseSummary | null>(null);

  const [error, setError] = useState<string | null>(null);
  const [showAddRoom, setShowAddRoom] = useState(false);

  const API = import.meta.env.VITE_API_URL;


  function loadHouse() {
    if (!houseId) return;

    fetch(`${API}/api/houses/${houseId}/rooms`)
      .then((res) => res.json())
      .then(setHouse)
      .catch(() => setError("Could not load this house"));
  }


  function loadHouseSummary() {
    if (!houseId) return;

    fetch(`${API}/api/houses/${houseId}`)
      .then((res) => res.json())
      .then(setHouseSummary)
      .catch(() => setError("Could not load house summary"));
  }


  useEffect(() => {
    loadHouse();
    loadHouseSummary();
  }, [houseId]);


  if (!houseId) {
    return <p className="text-sm text-red-600">
      Missing house id
    </p>;
  }


  if (error) {
    return (
      <p className="text-sm text-red-600">
        {error}
      </p>
    );
  }


  if (!house || !houseSummary) {
    return (
      <p className="text-sm">
        Loading house...
      </p>
    );
  }


  return (
    <div className="max-w-md mx-auto px-5 py-7">

      <button
        onClick={() => navigate("/")}
        className="flex items-center gap-1.5 text-sm mb-5"
        style={{ color: "#5A6558" }}
      >
        <ArrowLeft size={16} />
        All houses
      </button>


      <div className="flex items-center justify-between mb-4">

        <h2 className="text-[20px] font-semibold">
          {house.name}: {houseSummary.doneTasks}/{houseSummary.totalTasks}
        </h2>
{/* <Link to={`/houses/${houseId}/people`} className="text-sm font-medium" style={{ color: "#2F5233" }}>
  See people
</Link> */}

<button
          onClick={() => navigate(`/houses/${houseId}/people`)}
          className="flex items-center gap-1 text-sm font-medium rounded-full px-3.5 py-2"
          style={{
            border: `1px solid ${BORDER}`
          }}
        >
          See people
        </button>


        <button
          onClick={() => navigate("/tasks")}
          className="flex items-center gap-1 text-sm font-medium rounded-full px-3.5 py-2"
          style={{
            border: `1px solid ${BORDER}`
          }}
        >
          See tasks
        </button>


        <button
          onClick={() => setShowAddRoom(true)}
          className="flex items-center gap-1 text-sm font-medium rounded-full px-3.5 py-2 text-white"
          style={{
            backgroundColor: "#2F5233"
          }}
        >
          <Plus size={15} />
          Add room
        </button>

      </div>


      <div className="grid grid-cols-2 gap-3">

        {house.rooms.map((room) => (
          <RoomCard
            key={room.id}
            room={room}
            onClick={() =>
              navigate(`/rooms/${room.id}/tasks`)
            }
          />
        ))}

      </div>


      {showAddRoom && (
        <AddRoomModal
          houseId={houseId}
          onClose={() => setShowAddRoom(false)}
          onCreated={loadHouse}
        />
      )}

    </div>
  );
}