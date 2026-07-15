// import { useEffect, useState } from "react";

// const API = import.meta.env.VITE_API_URL;

// type Task = {
//   id: string;
//   title: string;
//   desc: string;
//   dueDate: string | null;
//   completedAt: string | null;
//   room: {
//     id: string;
//     name: string;
//     house: {
//       id: string;
//       name: string;
//     };
//   };
// };

// export function TasksPage() {
//   const [tasks, setTasks] = useState<Task[]>([]);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     fetch(`${API}/api/tasks`)
//       .then((res) => res.json())
//       .then(setTasks)
//       .catch(() => setError("Could not load tasks"));
//   }, []);

//   const waiting = tasks.filter((t) => !t.completedAt);
//   const done = tasks.filter((t) => t.completedAt);

//   if (error) {
//     return <p>{error}</p>;
//   }

//   return (
//     <div className="max-w-5xl mx-auto p-6 space-y-10">
//       <h1 className="text-3xl font-bold">Tasks</h1>

//       <section>
//         <h2 className="text-2xl font-semibold mb-4">
//           Waiting ({waiting.length})
//         </h2>

//         <div className="space-y-4">
//           {waiting.map((task) => (
//             <TaskCard key={task.id} task={task} />
//           ))}

//           {waiting.length === 0 && (
//             <p className="text-gray-500">No pending tasks.</p>
//           )}
//         </div>
//       </section>

//       <section>
//         <h2 className="text-2xl font-semibold mb-4">
//           Done ({done.length})
//         </h2>

//         <div className="space-y-4">
//           {done.map((task) => (
//             <TaskCard key={task.id} task={task} />
//           ))}

//           {done.length === 0 && (
//             <p className="text-gray-500">No completed tasks.</p>
//           )}
//         </div>
//       </section>
//     </div>
//   );
// }

// function TaskCard({ task }: { task: Task }) {
//   return (
//     <div className="border rounded-lg p-4 shadow-sm">
//       <div className="flex justify-between items-start">
//         <div>
//           <h3 className="font-semibold text-lg">{task.title}</h3>

//           <p className="text-gray-600">
//             {task.room.house.name} • {task.room.name}
//           </p>

//           {task.desc && (
//             <p className="mt-2 text-gray-700">{task.desc}</p>
//           )}
//         </div>

//         <div className="text-right">
//           {task.dueDate && (
//             <p className="text-sm text-gray-500">
//               Due {new Date(task.dueDate).toLocaleDateString()}
//             </p>
//           )}

//           <span
//             className={`inline-block mt-2 rounded px-2 py-1 text-sm ${
//               task.completedAt
//                 ? "bg-green-100 text-green-700"
//                 : "bg-yellow-100 text-yellow-700"
//             }`}
//           >
//             {task.completedAt ? "Done" : "Waiting"}
//           </span>
//         </div>
//       </div>
//     </div>
//   );
// }

// src/components/TasksPage.tsx

import { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const API = import.meta.env.VITE_API_URL;


type Task = {
  id: string;
  title: string;
  desc: string;
  dueDate: string | null;
  completedAt: string | null;

  room: {
    id: string;
    name: string;

    house: {
      id: string;
      name: string;
    };
  };
};


export function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [error, setError] = useState("");

  const navigate = useNavigate();


  useEffect(() => {
    fetch(`${API}/api/tasks`)
      .then((res) => res.json())
      .then(setTasks)
      .catch(() => setError("Could not load tasks"));
  }, []);


  const waiting = tasks.filter(
    (task) => !task.completedAt
  );

  const done = tasks.filter(
    (task) => task.completedAt
  );


  if (error) {
    return (
      <p className="text-sm text-red-600">
        {error}
      </p>
    );
  }


  return (
    <div className="max-w-md mx-auto px-5 py-7 space-y-8">


      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-1.5 text-sm"
        style={{ color: "#5A6558" }}
      >
        <ArrowLeft size={16} />
        Back
      </button>


      <h1 className="text-[20px] font-semibold">
        All Tasks
      </h1>



      <section>

        <h2 className="text-lg font-semibold mb-4">
          Waiting ({waiting.length})
        </h2>


        <div className="space-y-3">

          {waiting.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onClick={() =>
                navigate(`/tasks/${task.id}`)
              }
            />
          ))}


          {waiting.length === 0 && (
            <p className="text-gray-500 text-sm">
              No pending tasks.
            </p>
          )}

        </div>

      </section>





      <section>

        <h2 className="text-lg font-semibold mb-4">
          Done ({done.length})
        </h2>


        <div className="space-y-3">

          {done.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onClick={() =>
                navigate(`/tasks/${task.id}`)
              }
            />
          ))}


          {done.length === 0 && (
            <p className="text-gray-500 text-sm">
              No completed tasks.
            </p>
          )}

        </div>

      </section>


    </div>
  );
}





function TaskCard({
  task,
  onClick,
}: {
  task: Task;
  onClick: () => void;
}) {

  return (

    <button
      onClick={onClick}
      className="w-full text-left border rounded-lg p-4 shadow-sm hover:bg-gray-50"
    >

      <div className="flex justify-between items-start">


        <div>

          <h3 className="font-semibold text-lg">
            {task.title}
          </h3>


          <p className="text-gray-600 text-sm">
            {task.room.house.name} • {task.room.name}
          </p>


          {task.desc && (
            <p className="mt-2 text-gray-700 text-sm">
              {task.desc}
            </p>
          )}

        </div>




        <div className="text-right">


          {task.dueDate && (
            <p className="text-sm text-gray-500">
              Due{" "}
              {new Date(task.dueDate)
                .toLocaleDateString()}
            </p>
          )}



          <span
            className={`inline-block mt-2 rounded px-2 py-1 text-sm ${
              task.completedAt
                ? "bg-green-100 text-green-700"
                : "bg-yellow-100 text-yellow-700"
            }`}
          >
            {task.completedAt
              ? "Done"
              : "Waiting"}
          </span>


        </div>


      </div>

    </button>

  );
}