// src/App.tsx
import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { HouseCard } from "./components/HouseCard";
import { HousePage } from "./components/HousePage";
import { AddHouseModal } from "./components/AddHouseModal";
import type { HouseSummary } from "./types";

function App() {
  const [houses, setHouses] = useState<HouseSummary[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [selectedHouseId, setSelectedHouseId] = useState<string | null>(null);
  const [showAddHouse, setShowAddHouse] = useState(false);

  function loadHouses() {
    fetch("/api/houses")
      .then((res) => res.json())
      .then(setHouses)
      .catch(() => setError("Could not load houses"));
  }

  useEffect(loadHouses, []);

  return (
    <div className="max-w-md mx-auto px-5 py-7">
      {selectedHouseId ? (
        <HousePage houseId={selectedHouseId} onBack={() => setSelectedHouseId(null)} />
      ) : (
        <>
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-[20px] font-semibold">Houses</h1>
            <button
              onClick={() => setShowAddHouse(true)}
              className="flex items-center gap-1 text-sm font-medium rounded-full px-3.5 py-2 text-white"
              style={{ backgroundColor: "#2F5233" }}
            >
              <Plus size={15} /> Add house
            </button>
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}
          {!houses && !error && <p className="text-sm">Loading...</p>}

          {houses && (
            <div className="grid grid-cols-2 gap-3">
              {houses.map((house) => (
                <HouseCard key={house.id} house={house} onClick={() => setSelectedHouseId(house.id)} />
              ))}
            </div>
          )}
        </>
      )}

      {showAddHouse && (
        <AddHouseModal onClose={() => setShowAddHouse(false)} onCreated={loadHouses} />
      )}
    </div>
  );
}

export default App;