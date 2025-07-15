import { useState, useEffect } from "react";
import { Recipe } from "../models/Recipe";
import { getAllRecipes } from "../services/RecipeService";
import LoginModal from "../Components/LoginModal";
import RegisterModal from "../Components/RegisterModal";
import Navbar from "../Components/Navbar";

const HomePage = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  useEffect(() => {
    getAllRecipes().then(setRecipes);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-blue-50">
      <Navbar
        onLogin={() => setShowLogin(true)}
        onRegister={() => setShowRegister(true)}
      />
      <section className="max-w-3xl mx-auto py-8 px-4 text-center">
        <h1 className="text-4xl font-extrabold mb-2 text-pink-700">
          Welcome to RecipeLand!
        </h1>
        <p className="text-gray-700 mb-6">
          Discover and save your favorite recipes. Sign up to build your personal recipe list!
        </p>
      </section>
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 px-4 pb-12">
        {recipes.map((r) => (
          <div
            key={r.id}
            className="bg-white rounded-xl shadow p-6 flex flex-col justify-between"
          >
            <h2 className="font-bold text-xl mb-2">{r.name}</h2>
            <p className="text-gray-600 mb-4">
              {r.cuisineType} | {r.preparationTime} min
            </p>
            <ul className="text-sm text-gray-500 mb-4">
              {r.ingredients.slice(0, 3).map((ingredient, idx) => (
                <li key={idx}>• {ingredient}</li>
              ))}
              {r.ingredients.length > 3 && (
                <li>...and more</li>
              )}
            </ul>
            <button
              className="mt-auto bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              onClick={() => {
                if (!localStorage.getItem("token")) setShowLogin(true);
                else {
                  // Call API to add to user recipes (favorites)
                  // TODO: handle add logic (show toast/message)
                  alert("Added to your recipes! (Implement logic)");
                }
              }}
            >
              Add to My Recipes
            </button>
          </div>
        ))}
      </div>
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
