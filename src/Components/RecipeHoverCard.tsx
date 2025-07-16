import React from "react";
import { Recipe } from "../models/Recipe";

interface RecipeHoverCardProps {
  recipe: Recipe;
  position: { x: number; y: number };
  onClose: () => void;
}

const RecipeHoverCard: React.FC<RecipeHoverCardProps> = ({
  recipe,
  position,
  onClose,
}) => (
  <div
    className={`
      fixed z-50 bg-white rounded-2xl shadow-2xl border border-pink-200
      p-3 min-w-[180px] max-w-[250px] text-xs
      sm:p-5 sm:min-w-[260px] sm:max-w-[350px] sm:text-sm
      md:p-6 md:min-w-[330px] md:max-w-[410px] md:text-base
      box-content transition
    `}
    style={{
      top: position.y,
      left: position.x,
      boxShadow:
        "0 8px 40px 0 rgba(232, 88, 191, 0.10), 0 1.5px 16px 0 rgba(80, 120, 255, 0.13)",
    }}
    onMouseLeave={onClose}
  >
    <div className="flex justify-between items-center mb-1 md:mb-2">
      <h2 className="font-extrabold text-base sm:text-lg md:text-xl text-pink-700">
        {recipe.name}
      </h2>
      <span className="italic text-[10px] sm:text-xs md:text-sm text-gray-400">
        {recipe.cuisineType} · {recipe.preparationTime} min
      </span>
    </div>
    <div className="mb-2 md:mb-3">
      <span className="font-bold text-xs sm:text-sm md:text-base block mb-1">
        Ingredients:
      </span>
      <ul className="ml-4 text-blue-700 list-disc space-y-0.5 text-xs sm:text-sm md:text-base">
        {recipe.ingredients.map((ingredient, idx) => (
          <li key={idx}>{ingredient}</li>
        ))}
      </ul>
    </div>
    <div>
      <span className="font-bold text-xs sm:text-sm md:text-base block mb-1">
        Instructions:
      </span>
      <p className="text-gray-700 text-xs sm:text-sm md:text-base">
        {recipe.instructions}
      </p>
    </div>
  </div>
);

export default RecipeHoverCard;
