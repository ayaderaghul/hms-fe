import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, CheckCircle2, Clock3 } from "lucide-react";

const BORDER = "#E0E3D6";

type Task = {
  id: string;
  title: string;
  completedAt: string | null;
  room: {
    name: string;
  };
};

type Person = {
  id: string;
  username: string;
  email: string;
  phone?: string | null;
  avatarUrl?: string | null;
  waitingTasks: Task[];
  completedTasks: Task[];
};

export function PersonDetailPage() {
  const { personId } = useParams();
  const navigate = useNavigate();

  const API = import.meta.env.VITE_API_URL;

  const [person, setPerson] = useState<Person | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!personId) return;

    fetch(`${API}/api/people/${personId}`)
      .then(async (res) => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then(setPerson)
      .catch(() => setError("Could not load person"));
  }, [personId]);

  if (error) {
    return <p className="p-6 text-red-600">{error}</p>;
  }

  if (!person) {
    return <p className="p-6">Loading...</p>;
  }

  return (
    <div className="max-w-md mx-auto px-5 py-7">

      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 mb-6 text-sm"
      >
        <ArrowLeft size={16}/>
        Back
      </button>

      <div
        className="rounded-2xl p-6"
        style={{
          border: `1px solid ${BORDER}`,
          background: "white",
        }}
      >

        <div className="flex flex-col items-center">

          {person.avatarUrl ? (
            <img
              src={person.avatarUrl}
              className="w-24 h-24 rounded-full object-cover"
            />
          ) : (
            <div
              className="w-24 h-24 rounded-full flex items-center justify-center text-3xl font-bold"
              style={{
                background: "#EEF1E8",
                color: "#2F5233",
              }}
            >
              {person.username.charAt(0).toUpperCase()}
            </div>
          )}

          <h2 className="mt-4 text-2xl font-semibold">
            {person.username}
          </h2>

          <p className="text-gray-500">
            {person.email}
          </p>

          {person.phone && (
            <p className="text-gray-500">
              {person.phone}
            </p>
          )}

        </div>

      </div>

      <div
        className="mt-6 rounded-2xl p-5"
        style={{
          border: `1px solid ${BORDER}`,
          background: "white",
        }}
      >
        <div className="flex items-center gap-2 mb-4">
          <Clock3 size={18}/>
          <h3 className="font-semibold">
            Waiting Tasks ({person.waitingTasks.length})
          </h3>
        </div>

        {person.waitingTasks.length === 0 ? (
          <p className="text-sm text-gray-500">
            No waiting tasks.
          </p>
        ) : (
          <div className="flex flex-col gap-2">
            {person.waitingTasks.map(task => (
              <button
                key={task.id}
                onClick={() => navigate(`/tasks/${task.id}`)}
                className="text-left rounded-xl border p-3 hover:bg-gray-50"
                style={{ borderColor: BORDER }}
              >
                <div className="font-medium">
                  {task.title}
                </div>

                <div className="text-xs text-gray-500">
                  {task.room.name}
                </div>
              </button>
            ))}
          </div>
        )}

      </div>

      <div
        className="mt-6 rounded-2xl p-5"
        style={{
          border: `1px solid ${BORDER}`,
          background: "white",
        }}
      >

        <div className="flex items-center gap-2 mb-4">
          <CheckCircle2 size={18}/>
          <h3 className="font-semibold">
            Completed Tasks ({person.completedTasks.length})
          </h3>
        </div>

        {person.completedTasks.length === 0 ? (
          <p className="text-sm text-gray-500">
            No completed tasks.
          </p>
        ) : (
          <div className="flex flex-col gap-2">
            {person.completedTasks.map(task => (
              <button
                key={task.id}
                onClick={() => navigate(`/tasks/${task.id}`)}
                className="text-left rounded-xl border p-3 hover:bg-gray-50"
                style={{ borderColor: BORDER }}
              >
                <div className="font-medium">
                  {task.title}
                </div>

                <div className="text-xs text-gray-500">
                  {task.room.name}
                </div>
              </button>
            ))}
          </div>
        )}

      </div>

    </div>
  );
}