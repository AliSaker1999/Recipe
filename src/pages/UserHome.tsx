import { useEffect, useState } from "react";
import { Recipe } from "../models/Recipe";
import { useAuth } from "../context/AuthContext";
import {
  getUserRecipes,       // <-- must return Promise<UserRecipeDisplayDto[]>
  updateUserRecipeStatus,
  removeUserRecipe,
} from "../services/UserRecipeService";

// This type represents a user’s recipe joined with recipe info and status
interface UserRecipeDisplayDto extends Recipe {
  status: string; // "favorite", "to try", "made before"
}

const statusOptions = [
  { value: "favorite", label: "Favorite" },
  { value: "to try", label: "To Try" },
  { value: "made before", label: "Made Before" },
];

const UserHome = () => {
  const [recipes, setRecipes] = useState<UserRecipeDisplayDto[]>([]);
  const [loading, setLoading] = useState(true);
  const { token } = useAuth();

  // Fetch user’s recipes on load
  useEffect(() => {
    if (!token) return;
    setLoading(true);
    getUserRecipes(token)
      .then(setRecipes)
      .finally(() => setLoading(false));
  }, [token]);

  // Handle status change
  const handleChangeStatus = async (recipeName: string, status: string) => {
  await updateUserRecipeStatus(recipeName, status, token!);
  setRecipes((prev) =>
    prev.map((r) => (r.name === recipeName ? { ...r, status } : r))
  );
};


  // Handle remove recipe
  const handleRemove = async (recipeName: string) => {
  await removeUserRecipe(recipeName, token!);
  setRecipes((prev) => prev.filter((r) => r.name !== recipeName));
};


  if (loading) return <div className="text-center mt-10">Loading...</div>;

  return (
    <div>
      <h2 className="text-3xl font-black mb-7 tracking-tight text-blue-700">My Recipes</h2>
      {recipes.length === 0 && (
        <p className="text-gray-400 text-lg">You haven’t added any recipes yet.</p>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {recipes.map((r) => (
          <div
            key={r.id}
            className="bg-white rounded-3xl shadow-xl border border-blue-50 flex flex-col p-7 min-h-[230px] relative hover:shadow-2xl transition"
          >
            <h3 className="font-bold text-2xl mb-1 text-gray-800">{r.name}</h3>
            <p className="text-blue-500 font-medium mb-1">
              {r.cuisineType} <span className="text-gray-400">|</span> {r.preparationTime} min
            </p>
            <p className="text-gray-700 mb-3">{r.instructions}</p>
            <div className="mb-3 flex items-center gap-2">
              <span className="text-sm text-gray-500 font-semibold">Status:</span>
              <select
                className="border rounded-lg px-3 py-1 bg-blue-50 text-sm focus:ring-2 focus:ring-blue-200"
                value={r.status}
                onChange={(e) => handleChangeStatus(r.name, e.target.value)}
              >
                {statusOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
            <button
              className="w-full mt-auto bg-gradient-to-r from-red-500 to-pink-500 text-white text-base py-3 rounded-xl font-bold shadow hover:from-red-600 hover:to-pink-600 transition"
              onClick={() => handleRemove(r.name)}
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserHome;
