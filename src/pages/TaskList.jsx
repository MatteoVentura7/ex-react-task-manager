import { useCallback, useContext, useMemo, useState } from "react";
import { GlobalContext } from "../context/GlobalContext";
import TaskRow from "../components/TaskRow";

function debounce(callback, delay) {
  let timer;
  return (value) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      callback(value);
    }, delay);
  };
}

export default function TaskList() {
  const { tasks } = useContext(GlobalContext);
  console.log("Tasks from context:", tasks);

  const [searchQuery, setSearchQuery] = useState("");
  const debounceSetSearchQuery = useCallback(debouce(setSearchQuery, 500), []);

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

  const FilteredAndSortedTask = useMemo(() => {
    return [...tasks]
      .filter((t) => t.title.toLowerCase().includes(searchQuery.toLowerCase()))
      .sort((a, b) => {
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
  }, [tasks, sortBy, sortOrder, searchQuery]);

  return (
    <div className="text-center pt-4">
      <h1>Task List</h1>
      <input
        type="text"
        placeholder="Cerca task..."
        onChange={(e) => debounceSetSearchQuery(e.target.value)}
      />
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
          {FilteredAndSortedTask.map((task) => (
            <TaskRow key={task.id} task={task} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
