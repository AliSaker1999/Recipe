
import axios from "axios";
 const apiBase = "https://recipeapi-87od.onrender.com/api/recipes";
export const registerUser = async (user: { username: string, email: string, password: string }) => {
  const token = localStorage.getItem("token");
  await axios.post(`${apiBase}/account/register`, user, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};
