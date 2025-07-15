import api from "./api";

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
  return await api.post(
    `/account/register`,
    { email, username, password },
    getAuthHeaders()
  );
};

export const deleteUser = async (username: string) => {
  return await api.delete(`/account/${username}`, getAuthHeaders());
};

export const getAllUsers = async () => {
  const response = await api.get(`/account/all`, getAuthHeaders());
  return response.data;
};
