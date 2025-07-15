
import { useState } from "react";
import { registerUser } from "../services/authService";

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
      <div className="relative bg-white rounded-lg p-8 shadow-md w-full max-w-sm">
        <button
          className="absolute top-2 right-2 text-xl font-bold text-gray-400 hover:text-red-500"
          onClick={onClose}
        >×</button>
        <h2 className="text-2xl font-bold mb-4 text-center text-blue-700">Register</h2>
        {error && <p className="text-red-600 text-center">{error}</p>}
        {success && <p className="text-green-600 text-center">{success}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            className="w-full border p-2 rounded"
            placeholder="Username"
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
          />
          <input
            className="w-full border p-2 rounded"
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
          <input
            className="w-full border p-2 rounded"
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
          >Register</button>
        </form>
        <div className="text-center mt-4">
          <span className="text-sm text-gray-600">Already have an account? </span>
          <button
            className="text-blue-600 underline text-sm"
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
