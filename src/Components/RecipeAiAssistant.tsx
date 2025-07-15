import { useState } from "react";
import { askAi } from "../services/RecipeService";
import { FaRobot, FaSpinner } from "react-icons/fa";
import { AnimatePresence, motion } from "framer-motion";

interface RecipeAiAssistantProps {
  externalQuestion?: string;
  setExternalQuestion?: (q: string) => void;
}

const formatAiAnswer = (answer: string) => {
  const lines = answer.split("\n").filter(l => l.trim().length > 0);
  const summaryLines = lines.filter(line =>
    /based on|summary|overall|in conclusion/i.test(line)
  );
  const otherLines = lines.filter(line => !summaryLines.includes(line));

  return (
    <div className="space-y-3">
      <ul className="list-disc pl-6 space-y-2 text-gray-900 text-base">
        {otherLines.map((line, idx) => {
          let cleanLine = line.replace(/^AI:\s?/i, "");
          if (cleanLine.startsWith("*")) cleanLine = cleanLine.slice(1);
          const [title, ...rest] = cleanLine.split(":");
          if (rest.length) {
            return (
              <li key={idx}>
                <span className="font-bold text-blue-600">{title.trim()}:</span>
                {rest.join(":")}
              </li>
            );
          }
          return <li key={idx}>{cleanLine}</li>;
        })}
      </ul>
      {summaryLines.length > 0 && (
        <div className="p-4 bg-gradient-to-r from-indigo-100 to-blue-50 border-l-4 border-indigo-400 rounded text-indigo-900 font-semibold text-base shadow">
          {summaryLines.map((s, idx) => (
            <div key={idx}>{s.replace(/^AI:\s?/i, "")}</div>
          ))}
        </div>
      )}
    </div>
  );
};

const RecipeAiAssistant: React.FC<RecipeAiAssistantProps> = ({
  externalQuestion,
  setExternalQuestion,
}) => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
   const [internalQuestion, setInternalQuestion] = useState("");


  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInternalQuestion(e.target.value);
    if (setExternalQuestion) setExternalQuestion(e.target.value);
  };

  const handleAsk = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim()) return;
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

  const handleReset = () => {
    setQuestion("");
    setAnswer(null);
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-3xl shadow-2xl p-8 my-14 border border-blue-50">
      <h1 className="text-3xl sm:text-4xl font-extrabold mb-8 text-center">
        <span className="inline-flex items-center gap-3">
          <FaRobot className="text-violet-500 text-3xl animate-bounce-slow" />
          <span>
            Ask the <span className="bg-gradient-to-r from-blue-700 to-pink-500 bg-clip-text text-transparent">AI Assistant</span>
          </span>
        </span>
      </h1>
      <form onSubmit={handleAsk} className="flex flex-col sm:flex-row gap-3 mb-3 items-center">
        <div className="relative w-full flex-1">
          <FaRobot className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-300 text-lg pointer-events-none" />
          <input
            type="text"
            className="pl-11 pr-4 py-3 rounded-xl border border-gray-200 shadow-sm focus:ring-2 focus:ring-blue-300 w-full text-lg transition"
            value={question}
            onChange={e => setQuestion(e.target.value)}
            placeholder="Ask about nutrition, best recipe, high protein..."
            disabled={loading}
            autoFocus
          />
        </div>
        <button
          type="submit"
          disabled={loading || !question.trim()}
          className="bg-violet-600 hover:bg-violet-700 text-white px-8 py-3 rounded-xl text-base font-bold transition flex items-center min-w-[100px] justify-center"
        >
          {loading ? (
            <>
              <FaSpinner className="animate-spin mr-2" />
              Thinking...
            </>
          ) : (
            "Ask AI"
          )}
        </button>
        {/* Reset Button */}
        <button
          type="button"
          onClick={handleReset}
          disabled={(!question && !answer) || loading}
          className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-7 py-3 rounded-xl text-base font-semibold transition border border-gray-200"
        >
          Reset
        </button>
      </form>
      <AnimatePresence>
        {loading && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="mt-8 flex items-center justify-center gap-2 text-indigo-600 font-semibold text-lg"
          >
            <FaRobot className="animate-bounce text-xl" /> AI is thinking...
          </motion.div>
        )}
        {answer && !loading && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="bg-gray-50 p-6 rounded-2xl mt-6 border border-indigo-100 transition-all"
          >
            <div className="mb-3 text-base text-indigo-600 font-semibold flex items-center gap-2">
              <FaRobot /> AI Answer:
            </div>
            {formatAiAnswer(answer)}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default RecipeAiAssistant;
