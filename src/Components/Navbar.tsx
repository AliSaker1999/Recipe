import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

interface NavbarProps {
  onLogin?: () => void;
  onRegister?: () => void;
}


const Navbar : React.FC<NavbarProps>= ({ onLogin, onRegister }) => {
  const { token, logout } = useAuth();
  const isLoggedIn = !!token;
  const navigate = useNavigate();

  return (
    <header className="bg-white shadow flex justify-between items-center px-8 py-4 border-b">
      <span
        className="text-lg font-bold text-blue-700 cursor-pointer"
        onClick={() => navigate("/")}
      >
        RecipeLand
      </span>
      <div>
        {!isLoggedIn ? (
          <>
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 mr-2"
              onClick={onLogin}
            >
              Login
            </button>
            <button
              className="bg-gray-100 text-blue-700 px-4 py-2 rounded hover:bg-gray-200"
              onClick={onRegister}
            >
              Register
            </button>
          </>
        ) : (
          <>
            <button
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 mr-2"
              onClick={() => navigate("/dashboard/home")}
            >
              Dashboard
            </button>
            <button
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
              onClick={logout}
            >
              Logout
            </button>
          </>
        )}
      </div>
    </header>
  );
};
export default Navbar;
