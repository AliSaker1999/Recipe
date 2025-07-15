import { useState } from "react";
import RecipeAiAssistant from "../Components/RecipeAiAssistant";
import { FaRobot } from "react-icons/fa";

const exampleQuestions = [
  "Suggest a high-protein dinner",
  "What can I cook with chicken and spinach?",
  "Give me a quick vegan lunch",
  "Low calorie breakfast ideas"
];

const AiAssistantPage = () => {
  const [question, setQuestion] = useState("");
  
  return (
    <div className="min-h-[90vh] flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 via-pink-50 to-blue-100">
      <div className="w-full max-w-2xl mx-auto bg-white rounded-3xl shadow-2xl p-10 border border-blue-50">
        <div className="flex flex-col items-center">
          <div className="text-6xl text-violet-500 mb-2">
            <FaRobot className="animate-bounce-slow" />
          </div>
          <h2 className="text-3xl font-extrabold mb-2 text-center">
            <span className="bg-gradient-to-r from-blue-700 to-pink-500 bg-clip-text text-transparent">
              Ask the AI Assistant
            </span>
          </h2>
          <p className="text-gray-500 text-center mb-6">
            💡 Ask about <span className="font-semibold text-indigo-600">nutrition</span>, <span className="font-semibold">recipe suggestions</span>, <span className="font-semibold">healthy meals</span>, or <span className="font-semibold">anything you’re curious about!</span>
          </p>
          <div className="flex flex-wrap gap-3 justify-center mb-5">
            {exampleQuestions.map((ex, idx) => (
              <button
                key={idx}
                className="px-4 py-1 rounded-full bg-indigo-50 text-indigo-700 hover:bg-indigo-100 border"
                onClick={() => setQuestion(ex)}
              >
                {ex}
              </button>
            ))}
          </div>
        </div>
        {/* Pass setQuestion to assistant as prop */}
        <RecipeAiAssistant externalQuestion={question} setExternalQuestion={setQuestion} />
        <p className="italic text-gray-400 text-center mt-6">
          "Cooking is all about people. Food is maybe the only universal thing that really has the power to bring everyone together." 🍽️
        </p>
      </div>
    </div>
  );
};

export default AiAssistantPage;
