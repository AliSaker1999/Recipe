import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { token, logout } = useAuth();
  const isLoggedIn = !!token;

  return (
    <header className="bg-white shadow flex justify-between items-center px-8 py-4 border-b">
      <span className="text-lg font-bold text-blue-700">Recipe Admin Panel</span>
      <div>
        {isLoggedIn ? (
          <button
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            onClick={logout}
          >Logout</button>
        ) : (
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            onClick={() => window.location.href = "/login"}
          >Login</button>
        )}
      </div>
    </header>
  );
};
export default Navbar;