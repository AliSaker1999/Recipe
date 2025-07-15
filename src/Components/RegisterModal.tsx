import { useState } from "react";
import { registerUser } from "../services/authService";
import { FaUserPlus } from "react-icons/fa";

interface RegisterModalProps {
  onClose: () => void;
  onLoginClick: () => void;
}

const RegisterModal: React.FC<RegisterModalProps> = ({ onClose, onLoginClick }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    try {
      await registerUser({ username, email, password });
      setSuccess("Registration successful! Please log in.");
      setTimeout(() => {
        onClose();
        onLoginClick();
      }, 1200);
    } catch {
      setError("Registration failed. Try a different username/email.");
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
          <FaUserPlus className="text-pink-400 text-5xl mb-1 drop-shadow" />
          <h2 className="text-2xl font-extrabold mb-2 text-pink-600">Register</h2>
        </div>
        {error && <p className="text-red-600 text-center mb-2">{error}</p>}
        {success && <p className="text-green-600 text-center mb-2">{success}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            className="w-full border border-gray-200 p-3 rounded-xl text-base focus:outline-none focus:ring-2 focus:ring-pink-300 transition"
            placeholder="Username"
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
          />
          <input
            className="w-full border border-gray-200 p-3 rounded-xl text-base focus:outline-none focus:ring-2 focus:ring-pink-300 transition"
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
          <input
            className="w-full border border-gray-200 p-3 rounded-xl text-base focus:outline-none focus:ring-2 focus:ring-pink-300 transition"
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-pink-500 to-pink-400 text-white p-3 rounded-xl font-semibold hover:from-pink-600 hover:to-pink-500 shadow transition"
          >Register</button>
        </form>
        <div className="text-center mt-5">
          <span className="text-sm text-gray-600">Already have an account? </span>
          <button
            className="text-pink-600 underline text-sm font-medium hover:text-pink-800"
            onClick={() => {
              onClose();
              onLoginClick();
            }}
          >Login</button>
        </div>
      </div>
    </div>
  );
};

export default RegisterModal;
