import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  FaHome,
  FaUserCog,
  FaPlusCircle,
  FaRobot,
  FaSignOutAlt,
  FaBars,
  FaFilter,
  FaTimes,
} from "react-icons/fa";
import { useAuth } from "../context/AuthContext";

const Sidebar = () => {
  const { logout, token, role } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const toggleMenu = () => setOpen(!open);

  // Dynamic nav items based on role
  const adminLinks = [
    { to: "/dashboard/home", icon: <FaHome />, label: "All Recipes" },
    { to: "/dashboard/create", icon: <FaPlusCircle />, label: "Add Recipe" },
    { to: "/dashboard/ai", icon: <FaRobot />, label: "AI Assistant" },
    { to: "/dashboard/users", icon: <FaUserCog />, label: "Manage Users" },
  ];

  const userLinks = [
    { to: "/user-dashboard/home", icon: <FaHome />, label: "My Recipes" },
    { to: "/user-dashboard/filter", icon: <FaFilter />, label: "Filter Recipes" },
    { to: "/user-dashboard/ai", icon: <FaRobot />, label: "AI Assistant" },
  ];

  const navLinks = role === "Admin" ? adminLinks : userLinks;

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-3 px-5 py-3 rounded-2xl text-base transition font-medium tracking-wide ${
      isActive
        ? "bg-gradient-to-r from-blue-100 via-pink-100 to-blue-50 text-blue-700 shadow-sm"
        : "text-gray-600 hover:bg-blue-50/80 hover:text-blue-700"
    }`;

  return (
    <>
      {/* Mobile toggle */}
      <div className="sm:hidden bg-white shadow-md p-4 flex justify-between items-center">
        <h1 className="text-lg font-extrabold text-blue-700 tracking-tight">
          Recipe {role === "Admin" ? "Admin" : "User"}
        </h1>
        <button onClick={toggleMenu} className="text-blue-700 text-2xl">
          <FaBars />
        </button>
      </div>
      <aside
        className={`${
          open ? "block" : "hidden"
        } sm:flex flex-col bg-white/60 backdrop-blur border-r shadow-xl sm:w-64 w-full sm:h-auto sm:relative absolute z-50 top-0 left-0
          sm:py-6 sm:px-0 px-4 pt-4 pb-0 h-full transition-all`}
        style={{ maxWidth: 320 }}
      >
        {/* X close button - mobile only */}
        <div className="flex justify-between items-center mb-4 sm:hidden">
          <span className="text-2xl font-extrabold text-blue-700 tracking-wide">
            Recipe {role === "Admin" ? "Admin" : "User"}
          </span>
          <button onClick={() => setOpen(false)} className="text-gray-500 text-2xl p-1">
            <FaTimes />
          </button>
        </div>
        {/* Main nav & logout */}
        <div className="flex flex-col justify-between h-[calc(100dvh-16px)] sm:h-auto">
          <nav className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={linkClass}
                onClick={() => setOpen(false)}
                end
              >
                <span className="text-lg">{link.icon}</span>
                <span>{link.label}</span>
              </NavLink>
            ))}
          </nav>
          {token && (
            <button
              onClick={() => {
                logout();
                navigate("/login");
              }}
              className="mt-8 mb-2 flex items-center gap-3 px-5 py-3 rounded-2xl text-red-600 hover:bg-red-50 font-medium shadow-sm text-base transition"
            >
              <FaSignOutAlt /> Logout
            </button>
          )}
        </div>
      </aside>
      {/* Overlay when sidebar open */}
      {open && (
        <div
          className="fixed inset-0 bg-black bg-opacity-20 z-40 sm:hidden"
          onClick={() => setOpen(false)}
        />
      )}
    </>
  );
};

export default Sidebar;
