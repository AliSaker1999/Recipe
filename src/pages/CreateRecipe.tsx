import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CreateRecipeDto } from "../models/CreateRecipeDto";
import { createRecipe } from "../services/RecipeService";

const CreateRecipe = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<CreateRecipeDto>({
    name: "",
    ingredients: [],
    instructions: "",
    cuisineType: "",
    preparationTime: 0,
    status: "to try",
  });

  const [ingredientInput, setIngredientInput] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: name === "preparationTime" ? parseInt(value) : value });
  };

  const addIngredient = () => {
    if (ingredientInput.trim()) {
      setFormData({ ...formData, ingredients: [...formData.ingredients, ingredientInput.trim()] });
      setIngredientInput("");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createRecipe(formData);
    navigate("/dashboard/home");
  };

  return (
    <div className="min-h-screen bg-gray-50 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white p-6 sm:p-8 rounded-lg shadow">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 text-center">➕ Add New Recipe</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Recipe Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border rounded p-2"
            required
          />

          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="text"
              placeholder="Add Ingredient"
              value={ingredientInput}
              onChange={(e) => setIngredientInput(e.target.value)}
              className="flex-1 border rounded p-2"
            />
            <button
              type="button"
              onClick={addIngredient}
              className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
            >
              Add
            </button>
          </div>

          {formData.ingredients.length > 0 && (
            <ul className="list-disc list-inside text-sm text-gray-700">
              {formData.ingredients.map((ing, idx) => (
                <li key={idx}>{ing}</li>
              ))}
            </ul>
          )}

          <textarea
            name="instructions"
            placeholder="Instructions"
            value={formData.instructions}
            onChange={handleChange}
            className="w-full border rounded p-2"
            rows={4}
            required
          />

          <input
            type="text"
            name="cuisineType"
            placeholder="Cuisine Type"
            value={formData.cuisineType}
            onChange={handleChange}
            className="w-full border rounded p-2"
            required
          />

          <input
            type="number"
            name="preparationTime"
            placeholder="Preparation Time (min)"
            value={formData.preparationTime}
            onChange={handleChange}
            className="w-full border rounded p-2"
            required
          />

          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full border rounded p-2"
          >
            <option value="to try">To Try</option>
            <option value="favorite">Favorite</option>
            <option value="made before">Made Before</option>
          </select>

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded font-semibold hover:bg-green-700"
          >
            Save Recipe
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateRecipe;