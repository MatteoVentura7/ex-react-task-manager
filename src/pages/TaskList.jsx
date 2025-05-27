import { useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";

export default function TaskList() {
  const { tasks } = useContext(GlobalContext);
  console.log("Tasks from context:", tasks);
  return (
    <div className="text-center pt-4">
      <h1>Task List</h1>
      <p>This is the task list page.</p>
    </div>
  );
}
