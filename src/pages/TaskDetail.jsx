import { useParams, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { GlobalContext } from "../context/GlobalContext";
import Modal from "../components/Modal";
import EditTaskModal from "../components/EditTaskModal";

export default function TaskDetail() {
  const { id } = useParams();
  const { tasks, removeTask, updateTask } = useContext(GlobalContext);
  const task = tasks.find((task) => task.id === parseInt(id));

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  if (!task) {
    return <h2>Task non trovata</h2>;
  }

  const handleDelete = async () => {
    try {
      await removeTask(task.id);
      alert("Task eliminata con successo!");
      navigate("/");
    } catch (error) {
      console.error(error);
      alert(error.message);
    }

    const handleUpdate = async (updatedTask) => {
      try {
        await updateTask(updatedTask);
        setShowEditModal(false);
      } catch (error) {
        console.error(error);
        alert(error.message);
      }

      return (
        <div>
          <h1>Dettaglio Task</h1>
          <h2>{task.title}</h2>
          <p>
            <strong>Descrizione:</strong> {task.description}
          </p>
          <p>
            <strong>Stato:</strong> {task.status}
          </p>
          <p>
            <strong>Data Creazione:</strong>{" "}
            {new Date(task.createdAt).toLocaleDateString()}
          </p>
          <button onClick={() => setShowDeleteModal(true)}>Elimina task</button>
          <button onClick={() => setShowEditModal(true)}>Modifica task</button>
          <Modal
            title="Conferma Eliminazione"
            content={`Sei sicuro di voler eliminare la task "${task.title}"?`}
            show={showDeleteModal}
            onClose={() => setShowDeleteModal(false)}
            onConfirm={handleDelete}
            confirmText="Elimina"
          />

          <EditTaskModal
            task={task}
            show={showEditModal}
            onClose={() => setShowEditModal(false)}
            onSave={handleUpdate}
          />
        </div>
      );
    };
  };
}
