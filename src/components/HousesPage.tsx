// src/components/HousesPage.tsx

import { useEffect, useState } from "react";
import { Plus } from "lucide-react";

import { HouseCard } from "./HouseCard";
import { AddHouseModal } from "./AddHouseModal";

import type { HouseSummary } from "../types";

const API = import.meta.env.VITE_API_URL;


export function HousesPage() {
  const [houses, setHouses] = useState<HouseSummary[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showAddHouse, setShowAddHouse] = useState(false);


  function loadHouses() {
    fetch(`${API}/api/houses`)
      .then((res) => res.json())
      .then(setHouses)
      .catch(() => setError("Could not load houses"));
  }


  useEffect(() => {
    loadHouses();
  }, []);



  return (
    <div className="max-w-md mx-auto px-5 py-7">


      <div className="flex items-center justify-between mb-4">

        <h1 className="text-[20px] font-semibold">
          Houses
        </h1>


        <button
          onClick={() => setShowAddHouse(true)}
          className="flex items-center gap-1 text-sm font-medium rounded-full px-3.5 py-2 text-white"
          style={{
            backgroundColor: "#2F5233"
          }}
        >
          <Plus size={15} />
          Add house
        </button>


      </div>



      {error && (
        <p className="text-sm text-red-600">
          {error}
        </p>
      )}



      {!houses && !error && (
        <p className="text-sm">
          Loading...
        </p>
      )}




      {houses && (

        <div className="grid grid-cols-2 gap-3">

          {houses.map((house) => (

            <HouseCard
              key={house.id}
              house={house}
            />

          ))}

        </div>

      )}




      {showAddHouse && (

        <AddHouseModal
          onClose={() => setShowAddHouse(false)}
          onCreated={() => {
            setShowAddHouse(false);
            loadHouses();
          }}
        />

      )}


    </div>
  );
}