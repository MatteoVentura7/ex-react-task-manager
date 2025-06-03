import React from "react";
import { BrowserRouter, NavLink } from "react-router-dom";
import { Route } from "react-router-dom";
import { Routes } from "react-router-dom";
import TaskList from "./pages/TaskList";
import AddTask from "./pages/AddTask";
import { GlobalProvider } from "./context/GlobalContext";
import TaskDetail from "./pages/TaskDetail";

function App() {
  return (
    <GlobalProvider>
      <BrowserRouter>
        <nav className="navHeader">
          <NavLink to="/">
            {" "}
            <h1 className="linkHeader">Task List</h1>
          </NavLink>
          <NavLink to="/add">
            {" "}
            <h1 className="linkHeader">Add Task</h1>
          </NavLink>
        </nav>
        <Routes>
          <Route path="/" element={<TaskList />} />
          <Route path="/add" element={<AddTask />} />
          <Route path="/task/:id" element={<TaskDetail />} />
        </Routes>
      </BrowserRouter>
    </GlobalProvider>
  );
}

export default App;
