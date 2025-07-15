import axios from "axios";
const API_URL = process.env.REACT_APP_API_URL;

export const registerUser = async (user: { username: string, email: string, password: string }) => {
  const token = localStorage.getItem("token");
  await axios.post(`${API_URL}/account/register`, user, {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  });
};

export const loginUser = async (username: string, password: string) => {
  const response = await axios.post(`${API_URL}/account/login`, {
    username,
    password,
  });
  return response.data; // Should return at least { token, role }
};