import { useState, useRef, useMemo, useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";
const symbols = "!@#$%^&*()-_=+[]{}|;:'\\,.<>?/`~";

export default function AddTask() {
  const { addTask } = useContext(GlobalContext);
  const [taskTitle, setTaskTitle] = useState("");
  const descriptionRef = useRef();
  const statusRef = useRef();

  const taskTitleError = useMemo(() => {
    if (!taskTitle.trim()) return "il nome della task non può essere vuoto";
    if ([...taskTitle].some((char) => symbols.includes(char)))
      return "il nome della task non può contenere simboli speciali";
    return "";
  }, [taskTitle]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (taskTitleError) return;

    const newTask = {
      title: taskTitle.trim(),
      description: descriptionRef.current.value,
      status: statusRef.current.value,
    };

    try {
      await addTask(newTask);
      alert("Task aggiunta con successo!");
      setTaskTitle("");
      descriptionRef.current.value = "";
      statusRef.current.value = ""; // Reset to default status
    } catch (error) {
      alert(`Errore durante l'aggiunta della task: ${error.message}`);
    }
  };

  return (
    <div className="text-center pt-4">
      <h1>AddTask</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Nome Task:
          <input
            type="text"
            value={taskTitle}
            onChange={(e) => setTaskTitle(e.target.value)}
            placeholder="Enter task title"
          />
        </label>
        {taskTitleError && <p style={{ color: "red" }}>{taskTitleError}</p>}
        <label>
          Descrizione:
          <textarea ref={descriptionRef} placeholder="Enter task description" />
        </label>
        <label>
          Stato:
          <select ref={statusRef}>
            {["To Do", "In Progress", "Done"].map((value, index) => (
              <option key={index} value={value}>
                {value}
              </option>
            ))}
          </select>
        </label>
        <button type="submit" disabled={taskTitleError}>
          Aggiungi Task
        </button>
      </form>
    </div>
  );
}
