import { useEffect, useState } from "react";
import {
  registerUser,
  deleteUser,
  getAllUsers,
} from "../services/UserService";

const Users = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [deleteUsername, setDeleteUsername] = useState("");
  const [userList, setUserList] = useState<string[]>([]);

  const fetchUsers = async () => {
    try {
      const users = await getAllUsers();
      setUserList(users);
    } catch (err: any) {
      console.error("Error fetching users", err);
    }
  };

  const handleRegister = async () => {
    try {
      await registerUser(email, username, password);
      setMessage("User registered successfully.");
      setEmail("");
      setUsername("");
      setPassword("");
      fetchUsers();
    } catch (err: any) {
      setMessage(err.response?.data || "Failed to register user.");
    }
  };

  const handleDelete = async () => {
    try {
      await deleteUser(deleteUsername);
      setMessage("User deleted successfully.");
      setDeleteUsername("");
      fetchUsers();
    } catch (err: any) {
      setMessage(err.response?.data || "Failed to delete user.");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-6 px-4 sm:px-6 lg:px-8">
      <div className="space-y-8 max-w-xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-800 text-center">Manage Users</h2>

        {/* Register User */}
        <div className="space-y-4 bg-white p-4 shadow rounded">
          <h3 className="text-lg font-semibold">Register New User</h3>
          <input
            type="email"
            placeholder="Email"
            className="border p-2 w-full rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="text"
            placeholder="Username"
            className="border p-2 w-full rounded"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="border p-2 w-full rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            onClick={handleRegister}
            className="bg-green-600 text-white px-4 py-2 rounded w-full hover:bg-green-700"
          >
            Register User
          </button>
        </div>

        {/* Delete User */}
        <div className="space-y-4 bg-white p-4 shadow rounded">
          <h3 className="text-lg font-semibold">Delete User</h3>
          <input
            type="text"
            placeholder="Username to delete"
            className="border p-2 w-full rounded"
            value={deleteUsername}
            onChange={(e) => setDeleteUsername(e.target.value)}
          />
          <button
            onClick={handleDelete}
            className="bg-red-600 text-white px-4 py-2 rounded w-full hover:bg-red-700"
          >
            Delete User
          </button>
        </div>

        {/* All Users */}
        <div className="bg-white p-4 shadow rounded">
          <h3 className="text-lg font-semibold mb-2">All Users</h3>
          <ul className="list-disc pl-6 text-sm text-gray-700">
            {userList.map((user, idx) => (
              <li key={idx}>{user}</li>
            ))}
          </ul>
        </div>

        {message && <p className="text-blue-600 font-medium text-center">{message}</p>}
      </div>
    </div>
  );
};

export default Users;
