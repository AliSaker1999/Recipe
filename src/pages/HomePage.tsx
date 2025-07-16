import { useState, useEffect, useRef } from "react";
import { Recipe } from "../models/Recipe";
import { getAllRecipes, searchRecipes } from "../services/RecipeService";
import LoginModal from "../Components/LoginModal";
import { addUserRecipe } from "../services/UserRecipeService";
import RegisterModal from "../Components/RegisterModal";
import Navbar from "../Components/Navbar";
import { FaSearch, FaHeart } from "react-icons/fa";
import RecipeAiAssistant from "../Components/RecipeAiAssistant";
import RecipeHoverCard from "../Components/RecipeHoverCard";

const HomePage = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);
  const [addMessage, setAddMessage] = useState(""); // add this state for feedback
  const [hoveredRecipe, setHoveredRecipe] = useState<Recipe | null>(null);
  const [hoverPosition, setHoverPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const hoverTimeout = useRef<NodeJS.Timeout | null>(null);
  const cardRef = useRef<HTMLElement | null>(null);


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

  useEffect(() => {
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }
    debounceTimeout.current = setTimeout(() => {
      doLiveSearch(searchQuery);
    }, 350);
    return () => {
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }
    };
  }, [searchQuery]);

  useEffect(() => {
    getAllRecipes().then(setRecipes);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-blue-100">
      <Navbar
        onLogin={() => setShowLogin(true)}
        onRegister={() => setShowRegister(true)}
      />
      <section className="max-w-3xl mx-auto py-8 px-4 text-center">
        <h1 className="text-4xl font-extrabold mb-2 text-pink-700 drop-shadow">
          Welcome to <span className="bg-gradient-to-r from-blue-600 to-pink-400 bg-clip-text text-transparent">RecipeLand!</span>
        </h1>
        <p className="text-gray-700 mb-8 text-lg">
          Discover and save your favorite recipes. Sign up to build your personal recipe list!
        </p>
      </section>
      {/* Enhanced Search Bar */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          doLiveSearch(searchQuery);
        }}
        className="flex flex-col sm:flex-row items-center gap-3 mb-10 max-w-2xl mx-auto"
      >
        <div className="relative w-full">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            <FaSearch />
          </span>
          <input
            type="text"
            placeholder="Search by name, ingredient, cuisine..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-4 py-3 rounded-2xl border border-gray-200 shadow focus:outline-none focus:ring-2 focus:ring-blue-300 w-full transition"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white font-semibold px-5 py-3 rounded-2xl shadow hover:bg-blue-700 transition"
        >
          Search
        </button>
        <button
          type="button"
          onClick={() => {
            setSearchQuery("");
            fetchRecipes();
          }}
          className="text-sm text-gray-600 hover:underline whitespace-nowrap"
        >
          Reset
        </button>
      </form>
      <RecipeAiAssistant />

      {/* Recipe Cards Grid */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4 pb-16">
        {recipes.map((r) => (
          <div
            key={r.id}
            className="relative bg-white rounded-3xl shadow-lg flex flex-col justify-between p-7 border border-gray-100 hover:scale-[1.025] hover:shadow-2xl transition group"
            onMouseEnter={(e) => {
            cardRef.current = e.currentTarget as HTMLElement;
            hoverTimeout.current = setTimeout(() => {
              if (cardRef.current) {
                const rect = cardRef.current.getBoundingClientRect();
                setHoverPosition({
                  x: Math.min(rect.right + 12, window.innerWidth - 340),
                  y: Math.max(rect.top, 70),
                });
                setHoveredRecipe(r);
              }
            }, 1000);
          }}
            onMouseLeave={() => {
              if (hoverTimeout.current) clearTimeout(hoverTimeout.current);
              setHoveredRecipe(null);
              cardRef.current = null;
            }}
          >
            <span className="absolute -top-4 right-5 z-10">
              <FaHeart className="text-pink-300 opacity-40 group-hover:opacity-60 text-2xl transition" />
            </span>
            <h2 className="font-bold text-2xl mb-2 text-gray-800">{r.name}</h2>
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
            <button
              className="mt-auto bg-gradient-to-r from-blue-500 to-pink-500 text-white font-semibold py-3 rounded-2xl hover:from-blue-600 hover:to-pink-600 transition shadow-lg"
              onClick={async () => {
                if (!localStorage.getItem("token")) {
                  setShowLogin(true);
                } else {
                  try {
                    await addUserRecipe(r.name, "favorite"); // default status
                    setAddMessage(`Added "${r.name}" to your recipes!`);
                    setTimeout(() => setAddMessage(""), 1800);
                  } catch (err: any) {
                    setAddMessage(
                      err?.response?.data?.message || "Error adding recipe (maybe already added)"
                    );
                    setTimeout(() => setAddMessage(""), 2000);
                  }
                }
              }}
            >
              Add to My Recipes
            </button>
            
          </div>
        ))}
        {hoveredRecipe && (
  <RecipeHoverCard
    recipe={hoveredRecipe}
    position={hoverPosition}
    onClose={() => setHoveredRecipe(null)}
  />
)}
        
      </div>
      {addMessage && (
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-blue-600 text-white rounded-xl px-6 py-3 shadow-lg font-semibold z-50">
        {addMessage}
      </div>
    )}
      {/* Modals */}
      {showLogin && (
        <LoginModal
          onClose={() => setShowLogin(false)}
          onRegisterClick={() => {
            setShowLogin(false);
            setShowRegister(true);
          }}
        />
      )}
      {showRegister && (
        <RegisterModal
          onClose={() => setShowRegister(false)}
          onLoginClick={() => {
            setShowRegister(false);
            setShowLogin(true);
          }}
        />
      )}
    </div>
  );
};

export default HomePage;
