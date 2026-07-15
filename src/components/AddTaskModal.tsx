// // src/components/AddTaskModal.tsx
// import { Modal } from "./Modal";
// import { TaskForm } from "./TaskForm";

// export function AddTaskModal({ roomId, onClose, onCreated }: { roomId: string; onClose: () => void; onCreated: () => void }) {
//   const API = import.meta.env.VITE_API_URL;

//   return (
//     <Modal title="New task" onClose={onClose}>
//       <TaskForm
//         submitLabel="Create task"
//         submittingLabel="Creating..."
//         onSubmit={async (form) => {
//           const res = await fetch(`${API}/api/rooms/${roomId}/tasks`, { method: "POST", body: form });
//           if (!res.ok) throw new Error();
//           onCreated();
//           onClose();
//         }}
//       />
//     </Modal>
//   );
// }

// src/components/AddTaskModal.tsx
import { Modal } from "./Modal";
import { TaskForm } from "./TaskForm";

export function AddTaskModal({
  roomId,
  houseId,
  onClose,
  onCreated,
}: {
  roomId: string;
  houseId: string;
  onClose: () => void;
  onCreated: () => void;
}) {
  const API = import.meta.env.VITE_API_URL;

  return (
    <Modal title="New task" onClose={onClose}>
      <div className="overflow-y-auto max-h-[70vh] pr-1">

      
      <TaskForm
        houseId={houseId}
        submitLabel="Create task"
        submittingLabel="Creating..."
        onSubmit={async (form) => {
          const res = await fetch(`${API}/api/rooms/${roomId}/tasks`, {
            method: "POST",
            body: form,
          });
          if (!res.ok) throw new Error();
          onCreated();
          onClose();
        }}
      />
      </div>
    </Modal>
  );
}