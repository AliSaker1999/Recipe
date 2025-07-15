import { useEffect, useRef, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { filterUserRecipes } from "../services/UserRecipeService";
import { Recipe } from "../models/Recipe";
import { FaSearch, FaFilter, FaHeart, FaChevronDown } from "react-icons/fa";

const statusOptions = [
  { value: "", label: "All Statuses" },
  { value: "favorite", label: "Favorite" },
  { value: "to try", label: "To Try" },
  { value: "made before", label: "Made Before" },
];

const statusColors: Record<string, string> = {
  favorite: "bg-pink-100 text-pink-600",
  "to try": "bg-blue-100 text-blue-600",
  "made before": "bg-green-100 text-green-600",
};

interface UserRecipeWithStatus extends Recipe {
  status: string;
}

const FilterRecipes = () => {
  const { token } = useAuth();
  const [recipes, setRecipes] = useState<UserRecipeWithStatus[]>([]);
  const [status, setStatus] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

  const fetchRecipes = async (statusVal = status, queryVal = searchQuery) => {
    setLoading(true);
    const data = await filterUserRecipes(token!, statusVal, queryVal);
    
    setRecipes(data);
    setLoading(false);
  };

  // Debounced live search/filter
  useEffect(() => {
    if (!token) return;
    if (debounceTimeout.current) clearTimeout(debounceTimeout.current);
    debounceTimeout.current = setTimeout(() => {
      fetchRecipes(status, searchQuery);
    }, 300);
    return () => {
      if (debounceTimeout.current) clearTimeout(debounceTimeout.current);
    };
    // eslint-disable-next-line
  }, [status, searchQuery, token]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-pink-50 to-blue-100 py-12">
      {/* Section Title */}
      <div className="max-w-5xl mx-auto text-center mb-10">
        <h1 className="text-4xl font-extrabold mb-3 tracking-tight text-blue-800 drop-shadow">
          <span className="bg-gradient-to-r from-blue-600 to-pink-500 bg-clip-text text-transparent">
            Filter Your Recipes
          </span>
        </h1>
        <p className="text-lg text-gray-600 font-medium">
          Quickly find your recipes by status or search for your favorite ingredients, cuisines, or names.
        </p>
      </div>

      {/* Filter Controls */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-center max-w-4xl mx-auto mb-12">
        {/* Search */}
        <div className="relative flex-1 w-full max-w-md">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg">
            <FaSearch />
          </span>
          <input
            type="text"
            placeholder="Search your recipes..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="pl-12 pr-4 py-3 rounded-2xl border border-gray-200 shadow focus:outline-none focus:ring-2 focus:ring-blue-300 w-full text-lg"
          />
        </div>

        {/* Status Filter */}
        <div className="relative w-full max-w-xs">
          <FaFilter className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-400 text-base" />
          <select
            value={status}
            onChange={e => setStatus(e.target.value)}
            className="appearance-none pl-10 pr-8 py-3 rounded-2xl border border-gray-200 bg-white shadow focus:ring-2 focus:ring-blue-300 text-lg font-medium w-full"
          >
            {statusOptions.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
          <FaChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
        </div>

        {/* Reset */}
        <button
          className="px-6 py-3 rounded-2xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium transition w-full sm:w-auto text-lg"
          onClick={() => {
            setStatus("");
            setSearchQuery("");
            fetchRecipes("", "");
          }}
        >
          Reset
        </button>
      </div>

      {/* Recipes Grid */}
      <div className="max-w-6xl mx-auto">
        {loading ? (
          <div className="text-center text-blue-700 font-bold text-xl mt-20">Loading...</div>
        ) : recipes.length === 0 ? (
          <div className="text-center text-gray-400 text-xl mt-24">No recipes found.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {recipes.map((r) => (
              <div
                key={r.id}
                className="relative bg-white rounded-3xl shadow-xl flex flex-col justify-between p-8 border border-gray-100 hover:scale-[1.025] hover:shadow-2xl transition group min-h-[270px]"
              >
                {/* Status Badge */}
                {r.status && (
                  <span
                    className={`absolute -top-4 left-7 z-10 text-xs font-bold px-5 py-2 rounded-full shadow-md ${
                      statusColors[r.status] || "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {r.status.charAt(0).toUpperCase() + r.status.slice(1)}
                  </span>
                )}
                <h3 className="font-bold text-2xl mb-2 text-gray-900">{r.name}</h3>
                <p className="text-gray-500 mb-3 text-sm italic">
                  {r.cuisineType} &middot; {r.preparationTime} min
                </p>
                <ul className="text-base text-gray-700 mb-4 pl-3">
                  {r.ingredients.slice(0, 3).map((ingredient, idx) => (
                    <li key={idx} className="list-disc ml-3">{ingredient}</li>
                  ))}
                  {r.ingredients.length > 3 && (
                    <li className="ml-3 text-gray-400">...and more</li>
                  )}
                </ul>
                {/* If you want to show a heart on card */}
                <span className="absolute -top-4 right-7 z-10">
                  <FaHeart className="text-pink-200 opacity-60 text-2xl group-hover:opacity-80 transition" />
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FilterRecipes;
