import axios from "axios";
import { Recipe } from "../models/Recipe";

// Get all recipes for the logged-in user
export const getUserRecipes = async (token: string) => {
  const res = await axios.get(`${process.env.REACT_APP_API_URL}/userrecipe/my`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data; // Should be UserRecipeDisplayDto[]
};

// Update status for a user recipe
export const updateUserRecipeStatus = async (recipeName: string, status: string, token: string) => {
  await axios.put(`${process.env.REACT_APP_API_URL}/userrecipe`, {
    recipeName, status,
  }, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

// Remove a user recipe
export const removeUserRecipe = async (recipeName: string, token: string) => {
  await axios.delete(`${process.env.REACT_APP_API_URL}/userrecipe`, {
    data: { recipeName  },
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const addUserRecipe = async (
  recipeName: string,
  status: string = "favorite" // or "to try" if you want
) => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("Not authenticated");
  const res = await axios.post(
    `${process.env.REACT_APP_API_URL}/userrecipe`,
    { recipeName, status },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return res.data;
};

export const filterUserRecipes = async (
  token: string,
  status?: string,
  query?: string
): Promise<Recipe[]> => {
  let url = `${process.env.REACT_APP_API_URL}/UserRecipe/my`;
  const params: any = {};
  if (status) params.status = status;
  if (query) params.query = query;
  return (
    await axios.get(url, {
      headers: { Authorization: `Bearer ${token}` },
      params,
    })
  ).data;
};