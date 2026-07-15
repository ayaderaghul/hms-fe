import { Routes, Route } from "react-router-dom";

import { HousesPage } from "./components/HousesPage";
import { HousePage } from "./components/HousePage";
import { TasksPage } from "./components/TasksPage";

import { TaskPage } from "./components/TaskPage";
import { TaskDetailPage } from "./components/TaskDetailPage";
import { Layout } from "./components/Layout";

function App() {
  return (
    <Routes>
     <Route element={<Layout />}>

      <Route 
        path="/" 
        element={<HousesPage />} 
      />

      <Route
        path="/houses/:houseId"
        element={<HousePage />}
      />

      <Route
        path="/tasks"
        element={<TasksPage />}
      />

      <Route
        path="/rooms/:roomId/tasks"
        element={<TaskPage />}
      />

      <Route
  path="/tasks/:taskId"
  element={<TaskDetailPage />}
/>
  </Route>

    </Routes>
  );
}

export default App;