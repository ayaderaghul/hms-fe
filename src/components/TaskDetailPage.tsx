// src/components/TaskDetailPage.tsx

import { useEffect, useState } from "react";
import { ArrowLeft, Pencil } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

import { EditTaskModal } from "./EditTaskModal";
import type { Task } from "../types";


const BORDER = "#E0E3D6";


function fmtDate(iso: string | null) {
  if (!iso) return null;

  return new Date(iso).toLocaleDateString(
    undefined,
    {
      month: "short",
      day: "numeric",
    }
  );
}



export function TaskDetailPage() {

  const { taskId } = useParams();
  const navigate = useNavigate();


  const [task, setTask] = useState<Task | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showEdit, setShowEdit] = useState(false);


  const API = import.meta.env.VITE_API_URL;



  function loadTask() {

    if (!taskId) return;

    fetch(`${API}/api/tasks/${taskId}`)
      .then((res) => res.json())
      .then(setTask)
      .catch(() =>
        setError("Could not load this task")
      );
  }



  useEffect(() => {
    loadTask();
  }, [taskId]);




  if (!taskId) {
    return (
      <p className="text-sm text-red-600">
        Missing task id
      </p>
    );
  }



  if (error) {
    return (
      <p className="text-sm text-red-600">
        {error}
      </p>
    );
  }



  if (!task) {
    return (
      <p className="text-sm">
        Loading...
      </p>
    );
  }




  return (

    <div className="max-w-md mx-auto px-5 py-7">


      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-1.5 text-sm mb-5"
        style={{
          color: "#5A6558"
        }}
      >
        <ArrowLeft size={16} />
        Back to tasks
      </button>




      <div className="flex items-start justify-between mb-4">


        <h2
          className={`text-[20px] font-semibold ${
            task.completedAt
              ? "line-through"
              : ""
          }`}
        >
          {task.title}
        </h2>



        <button
          onClick={() => setShowEdit(true)}
          className="flex items-center gap-1 text-sm font-medium rounded-full px-3.5 py-2"
          style={{
            border: `1px solid ${BORDER}`
          }}
        >
          <Pencil size={14} />
          Edit
        </button>


      </div>





      <div
        className="rounded-2xl p-4 flex flex-col gap-3"
        style={{
          backgroundColor: "#FFFFFF",
          border: `1px solid ${BORDER}`
        }}
      >


        {task.desc && (

          <div>

            <p
              className="text-[11px] uppercase tracking-wide"
              style={{
                color: "#94A090"
              }}
            >
              Description
            </p>


            <p className="text-[14px] mt-0.5">
              {task.desc}
            </p>

          </div>

        )}

{task.descImages && task.descImages.length > 0 && (
  <div>
    <p
      className="text-[11px] uppercase tracking-wide"
      style={{ color: "#94A090" }}
    >
      Description images
    </p>

    <div className="flex flex-wrap gap-3 mt-2">
      {task.descImages.map((url) => (
        <img
          key={url}
          src={url}
          alt="Description"
          className="w-32 h-32 object-cover rounded-xl border"
          style={{ borderColor: BORDER }}
        />
      ))}
    </div>
  </div>
)}



        {task.tools.length > 0 && (

          <div>

            <p
              className="text-[11px] uppercase tracking-wide"
              style={{
                color: "#94A090"
              }}
            >
              Tools
            </p>


            <p className="text-[14px] mt-0.5">
              {task.tools.join(", ")}
            </p>


          </div>

        )}


{task.toolImages && task.toolImages.length > 0 && (
  <div>
    <p
      className="text-[11px] uppercase tracking-wide"
      style={{ color: "#94A090" }}
    >
      Tool images
    </p>

    <div className="flex flex-wrap gap-3 mt-2">
      {task.toolImages.map((url) => (
        <img
          key={url}
          src={url}
          alt="Tools"
          className="w-32 h-32 object-cover rounded-xl border"
          style={{ borderColor: BORDER }}
        />
      ))}
    </div>
  </div>
)}




        {task.howto && (

          <div>

            <p
              className="text-[11px] uppercase tracking-wide"
              style={{
                color: "#94A090"
              }}
            >
              How to
            </p>


            <p className="text-[14px] mt-0.5">
              {task.howto}
            </p>


          </div>

        )}



{task.howtoImages && task.howtoImages.length > 0 && (
  <div>
    <p
      className="text-[11px] uppercase tracking-wide"
      style={{ color: "#94A090" }}
    >
      Howto images
    </p>

    <div className="flex flex-wrap gap-3 mt-2">
      {task.howtoImages.map((url) => (
        <img
          key={url}
          src={url}
          alt="Howto"
          className="w-32 h-32 object-cover rounded-xl border"
          style={{ borderColor: BORDER }}
        />
      ))}
    </div>
  </div>
)}



        {task.dueDate && (

          <div>

            <p
              className="text-[11px] uppercase tracking-wide"
              style={{
                color: "#94A090"
              }}
            >
              Due
            </p>


            <p className="text-[14px] mt-0.5">
              {fmtDate(task.dueDate)}
            </p>


          </div>

        )}


      </div>





      {showEdit && (

        <EditTaskModal
          task={task}
          onClose={() => setShowEdit(false)}
          onSaved={loadTask}
        />

      )}


    </div>

  );
}