import { useParams, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";

export default function TaskDetail() {
  const { id } = useParams();
  const { tasks } = useContext(GlobalContext);
  const task = tasks.find((task) => task.id === parseInt(id));

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
        <button onClick={handleDelete}>Elimina task</button>
      </div>
    );
  };
}
