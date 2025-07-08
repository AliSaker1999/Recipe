import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/Login";
import DashboardLayout from "../pages/DashboardLayout";
import Home from "../pages/Home";
import CreateRecipe from "../pages/CreateRecipe";
import Users from "../pages/Users";
import AiAssistantPage from "../pages/AiAssistantPage";
import ProtectedRoute from "./ProtectedRoute";

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Navigate to="/login" />} />
    <Route path="/login" element={<Login />} />
    <Route
      path="/dashboard"
      element={
        <ProtectedRoute>
          <DashboardLayout />
        </ProtectedRoute>
      }
    >
      <Route path="home" element={<Home />} />
      <Route path="create" element={<CreateRecipe />} />
      <Route path="users" element={<Users />} />
      <Route path="ai" element={<AiAssistantPage />} />
      <Route index element={<Navigate to="home" />} />
    </Route>
    {/* fallback */}
    <Route path="*" element={<Navigate to="/login" />} />
  </Routes>
);

export default AppRoutes;
