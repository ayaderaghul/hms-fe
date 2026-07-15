// src/components/PeoplePage.tsx
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Plus } from "lucide-react";
import { PersonCard } from "./PersonCard";
import { AddPersonModal } from "./AddPersonModal";
import type { Person } from "../types";

export function PeoplePage() {
  const { houseId } = useParams<{ houseId: string }>();
  const [people, setPeople] = useState<Person[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showAddPerson, setShowAddPerson] = useState(false);

  function loadPeople() {
    fetch(`/api/houses/${houseId}/people`)
      .then((res) => res.json())
      .then(setPeople)
      .catch(() => setError("Could not load people"));
  }

  useEffect(loadPeople, [houseId]);

  if (error) return <p className="text-sm text-red-600">{error}</p>;
  if (!people) return <p className="text-sm">Loading...</p>;

  async function handleDelete(personId: string) {
  if (!confirm("Remove this person from the house?")) return;
  try {
    const res = await fetch(`/api/people/${personId}`, { method: "DELETE" });
    if (!res.ok) throw new Error();
    loadPeople();
  } catch {
    setError("Could not remove person — try again");
  }
}

async function handleCompleteTask(taskId: string) {
  try {
    const res = await fetch(`/api/tasks/${taskId}/complete`, { method: "PATCH" });
    if (!res.ok) throw new Error();
    loadPeople();
  } catch {
    setError("Could not mark task as done — try again");
  }
}

  return (
    <div>
      <Link to={`/houses/${houseId}`} className="flex items-center gap-1.5 text-sm mb-5" style={{ color: "#5A6558" }}>
        <ArrowLeft size={16} /> Back to house
      </Link>

      <div className="flex items-center justify-between mb-4">
        <h2 className="text-[20px] font-semibold">People</h2>
        <button
          onClick={() => setShowAddPerson(true)}
          className="flex items-center gap-1 text-sm font-medium rounded-full px-3.5 py-2 text-white"
          style={{ backgroundColor: "#2F5233" }}
        >
          <Plus size={15} /> Add person
        </button>
      </div>

      {people.length === 0 ? (
        <p className="text-sm" style={{ color: "#94A090" }}>No people added yet.</p>
      ) : (
        <div className="flex flex-col gap-3">
          
          {people.map((person) => (
  <PersonCard
    key={person.id}
    person={person}
    onDelete={() => handleDelete(person.id)}
    onCompleteTask={handleCompleteTask}
  />
))}
          


        </div>
      )}

      {houseId && showAddPerson && (
        <AddPersonModal houseId={houseId} onClose={() => setShowAddPerson(false)} onCreated={loadPeople} />
      )}
    </div>
  );
}