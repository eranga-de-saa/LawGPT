import PROMPT_SUGGESTIONS from "../assets/prompts";

interface Props {
  onSelect: (prompt: string) => void;
}

function PromptSuggestions({ onSelect }: Props) {
  return (
    <div className="flex-1 flex items-center justify-center">
      <div className="max-w-2xl w-full px-6">
        <h2 className="text-lg font-semibold mb-4 text-center">
          Try one of these
        </h2>

        <div className="grid gap-3">
          {PROMPT_SUGGESTIONS.map((prompt, idx) => (
            <button
              key={idx}
              onClick={() => onSelect(prompt)}
              className="text-left border rounded-lg px-4 py-3 hover:bg-gray-50 transition"
            >
              {prompt}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PromptSuggestions;
