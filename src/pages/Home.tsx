import { useEffect, useRef, useState } from "react";
import { Recipe } from "../models/Recipe";
import {
  getAllRecipes,
  deleteRecipe,
  updateRecipeStatus,
  searchRecipes,
} from "../services/RecipeService";

const Home = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);
  
  const fetchRecipes = async () => {
    const data = await getAllRecipes();
    setRecipes(data);
  };

  const doLiveSearch = async (query: string) => {
    if (!query.trim()) {
      fetchRecipes();
      return;
    }
    const results = await searchRecipes(query.trim());
    setRecipes(results);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this recipe?")) {
      await deleteRecipe(id);
      fetchRecipes();
    }
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return fetchRecipes();

    const results = await searchRecipes(searchQuery.trim());
    setRecipes(results);
  };
  useEffect(() => {
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }
    debounceTimeout.current = setTimeout(() => {
      doLiveSearch(searchQuery);
    }, 350); // adjust the delay as needed

    return () => {
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }
    };
  }, [searchQuery]);

  useEffect(() => {
    fetchRecipes();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <h1 className="text-3xl font-bold text-gray-800">🍽️ All Recipes</h1>
        </div>

        {/* Search */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            doLiveSearch(searchQuery); // still works on submit if needed
          }}
          className="flex flex-col sm:flex-row gap-3 mb-6"
        >
          <input
            type="text"
            placeholder="Search by name, ingredient, cuisine..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 border px-4 py-2 rounded shadow-sm"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Search
          </button>
          <button
            type="button"
            onClick={() => {
              setSearchQuery("");
              fetchRecipes();
            }}
            className="text-sm text-gray-600 hover:underline"
          >
            Reset
          </button>
        </form>

        {/* Recipe Grid */}
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2">
          {recipes.map((r) => (
            <div
              key={r.id}
              className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition relative"
            >
              <button
                onClick={() => handleDelete(r.id)}
                className="absolute top-2 right-2 bg-red-100 text-red-600 px-2 py-1 rounded hover:bg-red-200 text-sm"
              >
                Delete
              </button>

              <h2 className="text-2xl font-semibold text-indigo-600 mb-2 break-words">
                {r.name}
              </h2>

              <div className="text-gray-700 space-y-1 text-sm">
                <p>
                  <span className="font-medium">Cuisine:</span> {r.cuisineType}
                </p>
                <p>
                  <span className="font-medium">Prep Time:</span> {r.preparationTime} min
                </p>
                <div>
                  <label className="font-medium mr-2">Status:</label>
                  <select
                    value={r.status}
                    onChange={async (e) => {
                      const newStatus = e.target.value;
                      await updateRecipeStatus(r.id, newStatus);
                      fetchRecipes();
                    }}
                    className="border px-2 py-1 rounded text-sm bg-white"
                  >
                    <option value="to try">To Try</option>
                    <option value="favorite">Favorite</option>
                    <option value="made before">Made Before</option>
                  </select>
                </div>
                <p>
                  <span className="font-medium">Ingredients:</span> {r.ingredients.join(", ")}
                </p>
                <p>
                  <span className="font-medium">Instructions:</span> {r.instructions}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;