import { useContext, useMemo, useState } from "react";
import { GlobalContext } from "../context/GlobalContext";

export default function TaskList() {
  const { tasks } = useContext(GlobalContext);
  console.log("Tasks from context:", tasks);

  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState(1);

  const sortIcon = sortOrder === 1 ? "↑" : "↓";

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder((prev) => prev * -1);
    } else {
      setSortBy(field);
      setSortOrder(1);
    }
  };

  const sortedTask = useMemo(() => {
    return [...tasks].sort((a, b) => {
      let comparison;

      if (sortBy === "title") {
        comparison = a.title.localeCompare(b.title);
      } else if (sortBy === "status") {
        const statusOptions = ["To Do", "Doing", "Done"];
        const indexA = statusOptions.indexOf(a.status);
        const indexB = statusOptions.indexOf(b.status);
        comparison = indexA - indexB;
      } else if (sortBy === "createdAt") {
        const dateA = new Date(a.createdAt).getTime();
        const dateB = new Date(b.createdAt).getTime();
        comparison = dateA - dateB;
      }
      return comparison * sortOrder;
    });
  }, [tasks, sortBy, sortOrder]);

  return (
    <div className="text-center pt-4">
      <h1>Task List</h1>
      <table>
        <thead>
          <tr>
            <th onClick={() => handleSort("title")}>
              Nome {sortBy === "title" && sortIcon}{" "}
            </th>
            <th onClick={() => handleSort("status")}>
              Status {sortBy === "status" && sortIcon}{" "}
            </th>
            <th onClick={() => handleSort("createdAt")}>
              Data di creazione {sortBy === "createdAt" && sortIcon}{" "}
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedTask.map((task) => (
            <TaskRow key={task.id} task={task} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
