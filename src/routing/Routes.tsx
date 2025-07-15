import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "../pages/HomePage";           // new public homepage!
import DashboardLayout from "../pages/DashboardLayout";
import Home from "../pages/Home";                   // your dashboard "all recipes"
// import MyRecipes from "../pages/MyRecipes";         // user's own recipes page (new)
import Users from "../pages/Users";
import AiAssistantPage from "../pages/AiAssistantPage";
import ProtectedRoute from "./ProtectedRoute";

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<HomePage />} />       {/* new home page! */}
    <Route
      path="/dashboard"
      element={
        <ProtectedRoute>
          <DashboardLayout />
        </ProtectedRoute>
      }
    >
      <Route path="home" element={<Home />} />      {/* all recipes for user */}
      {/* <Route path="my" element={<MyRecipes />} />   my recipes page */}
      <Route path="users" element={<Users />} />
      <Route path="ai" element={<AiAssistantPage />} />
      <Route index element={<Navigate to="home" />} />
    </Route>
    {/* fallback */}
    <Route path="*" element={<Navigate to="/" />} />
  </Routes>
);

export default AppRoutes;
