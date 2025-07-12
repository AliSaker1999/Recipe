import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaHome, FaUserCog, FaPlusCircle, FaRobot, FaSignOutAlt, FaBars } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";

const Sidebar = () => {
  const { logout, token } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const toggleMenu = () => setOpen(!open);

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-2 px-4 py-2 rounded transition font-medium ${
      isActive ? "bg-blue-100 text-blue-700" : "text-gray-700 hover:bg-blue-50"
    }`;

  return (
    <>
      {/* Mobile top nav toggle */}
      <div className="sm:hidden bg-white shadow-md p-4 flex justify-between items-center">
        <h1 className="text-lg font-bold text-blue-700">Recipe Admin</h1>
        <button onClick={toggleMenu} className="text-blue-700 text-2xl">
          <FaBars />
        </button>
      </div>

      <aside
        className={`${
          open ? "block" : "hidden"
        } sm:flex flex-col bg-white border-r shadow-lg sm:w-64 w-full sm:h-auto sm:relative absolute z-50 top-0 left-0 h-screen p-4`}
      >
        <h2 className="text-2xl font-bold text-blue-700 mb-6 hidden sm:block">Recipe Admin</h2>
        <nav className="flex flex-col gap-3">
          <NavLink to="/dashboard/home" className={linkClass} onClick={() => setOpen(false)}>
            <FaHome /> All Recipes
          </NavLink>
          <NavLink to="/dashboard/create" className={linkClass} onClick={() => setOpen(false)}>
            <FaPlusCircle /> Add Recipe
          </NavLink>
          <NavLink to="/dashboard/ai" className={linkClass} onClick={() => setOpen(false)}>
            <FaRobot /> AI Assistant
          </NavLink>
          <NavLink to="/dashboard/users" className={linkClass} onClick={() => setOpen(false)}>
            <FaUserCog /> Manage Users
          </NavLink>
        </nav>

        {token && (
          <button
            onClick={() => {
              logout();
              navigate("/login");
            }}
            className="mt-8 flex items-center gap-2 px-4 py-2 rounded text-red-600 hover:bg-red-50 font-medium"
          >
            <FaSignOutAlt /> Logout
          </button>
        )}
      </aside>
    </>
  );
};

export default Sidebar;
