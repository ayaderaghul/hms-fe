// src/components/HouseCard.tsx
import type { HouseSummary } from "../types";
import { Dial } from "./Dial";
const BORDER = "#E0E3D6";
import { useNavigate } from "react-router-dom";
export function HouseCard({ house }: { house: HouseSummary }) {
const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate(`/houses/${house.id}`)}
      className="text-left rounded-2xl p-4"
      style={{ backgroundColor: "#FFFFFF", border: `1px solid ${BORDER}` }}
    >
      <div className="flex items-center justify-between mb-3">
        <span className="font-medium text-[15px]">{house.name}</span>
        <Dial done={house.doneTasks} total={house.totalTasks} />
      </div>
      <p className="text-[11px]" style={{ color: "#94A090" }}>
        {house.totalTasks === 0
          ? "No tasks yet"
          : house.doneTasks === house.totalTasks
          ? "All clear"
          : `${house.totalTasks - house.doneTasks} left`}
      </p>
    </button>
  );
}