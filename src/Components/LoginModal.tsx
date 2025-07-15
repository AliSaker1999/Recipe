import { useState } from "react";
import { loginUser } from "../services/authService";
import { useAuth } from "../context/AuthContext";
import { FaUserCircle } from "react-icons/fa";

interface LoginModalProps {
  onClose: () => void;
  onRegisterClick: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ onClose, onRegisterClick }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    try {
      const res = await loginUser(username, password);
      login(res.token, res.role);
      onClose();
    } catch {
      setError("Invalid credentials.");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-40">
      <div className="relative bg-white rounded-2xl p-8 shadow-xl w-full max-w-sm border border-blue-100">
        <button
          className="absolute top-3 right-3 text-2xl font-bold text-gray-300 hover:text-red-500 transition"
          onClick={onClose}
        >×</button>
        <div className="flex flex-col items-center mb-2">
          <FaUserCircle className="text-blue-500 text-5xl mb-1 drop-shadow" />
          <h2 className="text-2xl font-extrabold mb-2 text-blue-700">Login</h2>
        </div>
        {error && <p className="text-red-600 text-center mb-2">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            className="w-full border border-gray-200 p-3 rounded-xl text-base focus:outline-none focus:ring-2 focus:ring-blue-300 transition"
            placeholder="Username"
            value={username}
            onChange={e => setUsername(e.target.value)}
            autoFocus
            required
          />
          <input
            className="w-full border border-gray-200 p-3 rounded-xl text-base focus:outline-none focus:ring-2 focus:ring-blue-300 transition"
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-blue-400 text-white p-3 rounded-xl font-semibold hover:from-blue-700 hover:to-blue-500 shadow transition"
          >Sign In</button>
        </form>
        <div className="text-center mt-5">
          <span className="text-sm text-gray-600">Don’t have an account? </span>
          <button
            className="text-blue-600 underline text-sm font-medium hover:text-blue-800"
            onClick={() => {
              onClose();
              onRegisterClick();
            }}
          >Register</button>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
