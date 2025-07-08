import { NavLink, useNavigate } from "react-router-dom";
import { FaHome, FaUserCog, FaPlusCircle, FaRobot, FaSignOutAlt } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";

const Sidebar = () => {
  const { logout, token } = useAuth();
  const navigate = useNavigate();

  // Tailwind classes for active/inactive NavLink
  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-2 px-3 py-2 rounded font-medium transition
    ${isActive ? "bg-blue-100 text-blue-700" : "text-gray-700 hover:bg-blue-50"}`;

  return (
    <aside className="w-64 bg-white border-r shadow-lg h-full flex flex-col px-4 py-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-blue-700">Recipe Admin</h2>
      </div>
      <nav className="flex flex-col gap-3 flex-1">
        <NavLink to="/dashboard/home" className={linkClass}>
          <FaHome /> All Recipes
        </NavLink>
        <NavLink to="/dashboard/create" className={linkClass}>
          <FaPlusCircle /> Add Recipe
        </NavLink>
                <NavLink to="/dashboard/ai" className={linkClass}>
          <FaRobot /> AI Assistant
        </NavLink>
        <NavLink to="/dashboard/users" className={linkClass}>
          <FaUserCog /> Manage Users
        </NavLink>

      </nav>
      {/* Logout button at the bottom if logged in */}
      {token && (
        <button
          onClick={() => {
            logout();
            navigate("/login");
          }}
          className="mt-8 flex items-center gap-2 px-3 py-2 rounded text-red-600 hover:bg-red-50 font-medium transition"
        >
          <FaSignOutAlt /> Logout
        </button>
      )}
    </aside>
  );
};

export default Sidebar;
