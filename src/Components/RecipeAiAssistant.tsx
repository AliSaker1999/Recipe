import { useState } from "react";
import { askAi } from "../services/RecipeService";

const formatAiAnswer = (answer: string) => {
  // Split answer into lines and filter out empty lines
  const lines = answer.split("\n").filter(l => l.trim().length > 0);

  // Extract summary lines (e.g., "Based on this analysis...")
  const summaryLines = lines.filter(line =>
    /based on|summary|overall|in conclusion/i.test(line)
  );
  const otherLines = lines.filter(line => !summaryLines.includes(line));

  // Build formatted JSX
  return (
    <div className="space-y-3">
      {/* Render list for bullet points */}
      <ul className="list-disc pl-6 space-y-1 text-gray-900">
        {otherLines.map((line, idx) => {
          // Remove "AI: " if present
          let cleanLine = line.replace(/^AI:\s?/i, "");
          // Highlight recipe names before the colon
          if (cleanLine.startsWith("*")) cleanLine = cleanLine.slice(1);
          const [title, ...rest] = cleanLine.split(":");
          if (rest.length) {
            return (
              <li key={idx}>
                <span className="font-bold">{title.trim()}:</span>
                {rest.join(":")}
              </li>
            );
          }
          return <li key={idx}>{cleanLine}</li>;
        })}
      </ul>
      {/* Render summary in a highlighted box */}
      {summaryLines.length > 0 && (
        <div className="p-3 bg-indigo-100 border border-indigo-300 rounded text-indigo-900 font-medium">
          {summaryLines.map((s, idx) => (
            <div key={idx}>{s.replace(/^AI:\s?/i, "")}</div>
          ))}
        </div>
      )}
    </div>
  );
};

const RecipeAiAssistant = () => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleAsk = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setAnswer(null);
    try {
      const aiAnswer = await askAi(question);
      setAnswer(aiAnswer);
    } catch (err: any) {
      if (err.response && err.response.data) {
        setAnswer("Error: " + JSON.stringify(err.response.data));
      } else {
        setAnswer("Sorry, something went wrong.");
      }
    }
    setLoading(false);
  };

  return (
    <div className="bg-white rounded-2xl shadow p-6 mb-8">
      <h2 className="text-xl font-bold mb-3">🤖 Recipe AI Assistant</h2>
      <form onSubmit={handleAsk} className="flex gap-2 mb-3">
        <input
          type="text"
          className="flex-1 border px-3 py-2 rounded"
          value={question}
          onChange={e => setQuestion(e.target.value)}
          placeholder="Ask about nutrition, best recipe, high protein..."
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
        >
          {loading ? "Asking..." : "Ask AI"}
        </button>
      </form>
      {answer && (
        <div className="bg-gray-50 p-4 rounded-lg mt-2">
          <div className="mb-2 text-sm text-gray-500 font-semibold flex items-center gap-2">
            <span role="img" aria-label="robot">🤖</span>
            AI Answer:
          </div>
          {formatAiAnswer(answer)}
        </div>
      )}
    </div>
  );
};

export default RecipeAiAssistant;
