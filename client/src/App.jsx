import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.jsx";

import HomePage from "./pages/HomePage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import TasksPage from "./pages/TasksPage.jsx";
import TaskFormPage from "./pages/TaskFormPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";

import ProtectedRoute from "./ProtectedRoute.jsx";
import { TaskProvider } from "./context/TasksContext.jsx";

function App() {
  return (
    <AuthProvider>
      <TaskProvider>
        <BrowserRouter>
          <Routes>
            {/* Públicas */}
            <Route path="/" element={<HomePage />}></Route>
            <Route path="/login" element={<LoginPage />}></Route>
            <Route path="/register" element={<RegisterPage />}></Route>
            {/* Privadas */}
            <Route element={<ProtectedRoute />}>
              <Route path="/tasks" element={<TasksPage />}></Route>
              <Route path="/add-task" element={<TaskFormPage />}></Route>
              <Route path="/tasks/:id" element={<TaskFormPage />}></Route>
              <Route path="/profile" element={<ProfilePage />}></Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </TaskProvider>
    </AuthProvider>
  );
}

export default App;
