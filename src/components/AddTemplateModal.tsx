import { Modal } from "./Modal";
import { TaskForm } from "./TaskForm";

export function AddTemplateModal({
  houseId,
  onClose,
  onCreated,
}: {
  houseId: string;
  onClose: () => void;
  onCreated: () => void;
}) {
  const API = import.meta.env.VITE_API_URL;

  return (
    <Modal title="New template" onClose={onClose}>
      <TaskForm
        submitLabel="Create template"
        submittingLabel="Creating..."
        onSubmit={async (form) => {
          const res = await fetch(
            `${API}/api/houses/${houseId}/templates`,
            {
              method: "POST",
              body: form,
            }
          );

          if (!res.ok) throw new Error();

          onCreated();
          onClose();
        }}
      />
    </Modal>
  );
}