import axios from "axios";

// CHANGE THIS TO YOUR DEPLOYED URL!
const api = "https://recipeapi-87od.onrender.com/api/account";

const getAuthHeaders = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

export const registerUser = async (
  email: string,
  username: string,
  password: string
) => {
  return await axios.post(
    `${api}/register`,
    { email, username, password },
    getAuthHeaders()
  );
};

export const deleteUser = async (username: string) => {
  return await axios.delete(`${api}/${username}`, getAuthHeaders());
};

export const getAllUsers = async () => {
  const response = await axios.get(`${api}/all`, getAuthHeaders());
  return response.data;
};
