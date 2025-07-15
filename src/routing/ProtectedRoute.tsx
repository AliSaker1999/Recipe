import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { JSX } from "react";

interface ProtectedRouteProps {
  children: JSX.Element;
  requireRole?: string; // "Admin" | "User"
}

const ProtectedRoute = ({ children, requireRole }: ProtectedRouteProps) => {
  const { token, role } = useAuth();

  if (!token) {
    return <Navigate to="/" />; // Not logged in: go home
  }
  if (requireRole && role !== requireRole) {
    // Logged in, but not the right role: send home or show 403 page
    return <Navigate to="/" />;
  }
  return children;
};

export default ProtectedRoute;
