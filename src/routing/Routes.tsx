import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "../pages/HomePage";
import DashboardLayout from "../pages/DashboardLayout";       // Admin dashboard
import Home from "../pages/Home";                             // Admin's home
import Users from "../pages/Users";
import AiAssistantPage from "../pages/AiAssistantPage";

// USER DASHBOARD PAGES
import UserDashboardLayout from "../pages/UserDashboardLayout";
import UserHome from "../pages/UserHome";


import ProtectedRoute from "./ProtectedRoute";
import CreateRecipe from "../pages/CreateRecipe";
import FilterRecipes from "../pages/FilterRecipes";

const AppRoutes = () => (
  <Routes>
    {/* Public homepage */}
    <Route path="/" element={<HomePage />} />

    {/* Admin dashboard, protected */}
    <Route
      path="/dashboard"
      element={
        <ProtectedRoute requireRole="Admin">
          <DashboardLayout />
        </ProtectedRoute>
      }
    >
      
      <Route
      path="/dashboard/create"
      element={
        <ProtectedRoute requireRole="Admin">
          <CreateRecipe />
        </ProtectedRoute>
      }
    ></Route>
      <Route path="home" element={<Home />} />
      <Route path="users" element={<Users />} />
      <Route path="ai" element={<AiAssistantPage />} />
      <Route index element={<Navigate to="home" />} />
    </Route>

    {/* User dashboard, protected */}
    <Route
      path="/user-dashboard"
      element={
        <ProtectedRoute requireRole="User">
          <UserDashboardLayout />
        </ProtectedRoute>
      }
    >
      <Route path="/user-dashboard/filter" element={<ProtectedRoute><FilterRecipes /></ProtectedRoute>} />
      <Route path="home" element={<UserHome />} />
      
      <Route path="ai" element={<AiAssistantPage />} />
      <Route index element={<Navigate to="home" />} />
    </Route>

    {/* Fallback */}
    <Route path="*" element={<Navigate to="/" />} />
  </Routes>
);

export default AppRoutes;
