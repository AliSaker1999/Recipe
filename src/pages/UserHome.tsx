import { useEffect, useState, useRef } from "react";
import { Recipe } from "../models/Recipe";
import { useAuth } from "../context/AuthContext";
import {
  getUserRecipes,
  updateUserRecipeStatus,
  removeUserRecipe,
} from "../services/UserRecipeService";
import { FaTrash, FaUtensils, FaClock } from "react-icons/fa";
import RecipeHoverCard from "../Components/RecipeHoverCard";

interface UserRecipeDisplayDto extends Recipe {
  status: string; // "favorite", "to try", "made before"
}

const statusOptions = [
  { value: "favorite", label: "Favorite", color: "bg-pink-100 text-pink-600" },
  { value: "to try", label: "To Try", color: "bg-blue-100 text-blue-600" },
  { value: "made before", label: "Made Before", color: "bg-green-100 text-green-600" },
];

const getStatusStyle = (status: string) => {
  return (
    statusOptions.find(opt => opt.value === status)?.color ||
    "bg-gray-100 text-gray-600"
  );
};

const UserRecipeCard = ({
  recipe,
  onChangeStatus,
  onRemove,
  onHover,
  onHoverOut,
}: {
  recipe: UserRecipeDisplayDto;
  onChangeStatus: (name: string, status: string) => void;
  onRemove: (name: string) => void;
  onHover: (recipe: UserRecipeDisplayDto, pos: { x: number; y: number }) => void;
  onHoverOut: () => void;
}) => {
  const cardRef = useRef<HTMLDivElement | null>(null);

  const handleMouseEnter = () => {
    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      onHover(recipe, {
        x: Math.min(rect.right + 12, window.innerWidth - 320),
        y: Math.max(rect.top, 60),
      });
    }
  };

  return (
    <div
      ref={cardRef}
      className="relative bg-white rounded-3xl shadow-lg border border-blue-50 flex flex-col gap-2 px-6 pt-7 pb-6 min-h-[180px] hover:shadow-2xl transition group cursor-pointer"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={onHoverOut}
    >
      {/* Status badge */}
      <span
        className={`absolute top-5 right-7 text-xs font-bold px-4 py-1 rounded-full shadow-sm transition ${getStatusStyle(recipe.status)}`}
      >
        {statusOptions.find(opt => opt.value === recipe.status)?.label || recipe.status}
      </span>

      <h3 className="font-extrabold text-lg md:text-xl mb-1 text-blue-800 flex items-center gap-2">
        <FaUtensils className="inline text-pink-400" />
        {recipe.name}
      </h3>

      <div className="flex items-center gap-3 text-gray-500 text-xs mb-1">
        <span className="font-semibold text-blue-500">{recipe.cuisineType}</span>
        <span className="mx-1">|</span>
        <span className="flex items-center gap-1">
          <FaClock /> {recipe.preparationTime} min
        </span>
      </div>

      <p className="text-gray-700 text-sm mb-2 line-clamp-2">
        {recipe.instructions}
      </p>
      <div className="mb-2 flex items-center gap-2">
        <span className="text-xs text-gray-500 font-semibold">Status:</span>
        <select
          className="border rounded-lg px-2 py-1 bg-blue-50 text-xs focus:ring-2 focus:ring-blue-200"
          value={recipe.status}
          onChange={e => onChangeStatus(recipe.name, e.target.value)}
        >
          {statusOptions.map(opt => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>
      <button
        className="w-full mt-2 bg-gradient-to-r from-red-400 to-pink-400 text-white text-xs py-2 rounded-xl font-bold shadow hover:from-red-500 hover:to-pink-500 transition flex items-center justify-center gap-2"
        onClick={() => onRemove(recipe.name)}
      >
        <FaTrash /> Remove
      </button>
    </div>
  );
};

const UserHome = () => {
  const [recipes, setRecipes] = useState<UserRecipeDisplayDto[]>([]);
  const [loading, setLoading] = useState(true);
  const { token } = useAuth();

  // Hover Card State
  const [hoveredRecipe, setHoveredRecipe] = useState<UserRecipeDisplayDto | null>(null);
  const [hoverPosition, setHoverPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const hoverTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!token) return;
    setLoading(true);
    getUserRecipes(token)
      .then(setRecipes)
      .finally(() => setLoading(false));
  }, [token]);

  const handleChangeStatus = async (recipeName: string, status: string) => {
    await updateUserRecipeStatus(recipeName, status, token!);
    setRecipes(prev =>
      prev.map(r => (r.name === recipeName ? { ...r, status } : r))
    );
  };

  const handleRemove = async (recipeName: string) => {
    await removeUserRecipe(recipeName, token!);
    setRecipes(prev => prev.filter(r => r.name !== recipeName));
  };

  const handleHover = (recipe: UserRecipeDisplayDto, pos: { x: number; y: number }) => {
    if (hoverTimeout.current) clearTimeout(hoverTimeout.current);
    hoverTimeout.current = setTimeout(() => {
      setHoveredRecipe(recipe);
      setHoverPosition(pos);
    }, 350);
  };

  const handleHoverOut = () => {
    if (hoverTimeout.current) clearTimeout(hoverTimeout.current);
    setHoveredRecipe(null);
  };

  if (loading) return <div className="text-center mt-10">Loading...</div>;

  return (
    <div>
      <h2 className="text-3xl sm:text-4xl font-black mb-7 tracking-tight text-blue-700">
        My Recipes
      </h2>
      {recipes.length === 0 && (
        <p className="text-gray-400 text-lg">You haven’t added any recipes yet.</p>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-10">
        {recipes.map(r => (
          <UserRecipeCard
            key={r.id}
            recipe={r}
            onChangeStatus={handleChangeStatus}
            onRemove={handleRemove}
            onHover={handleHover}
            onHoverOut={handleHoverOut}
          />
        ))}
      </div>
      {/* Hover card */}
      {hoveredRecipe && (
        <RecipeHoverCard
          recipe={hoveredRecipe}
          position={hoverPosition}
          onClose={handleHoverOut}
        />
      )}
    </div>
  );
};

export default UserHome;
