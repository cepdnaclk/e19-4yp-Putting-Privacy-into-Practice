export default function EssayQuestion({
  question,
  answer,
  onChange,
  showExplanation,
}) {
  return (
    <div className="w-full text-left mb-6">
      <p className="mb-2">{question.scenario}</p>
      <p className="font-bold mb-2">{question.challenge}</p>
      {!showExplanation && (
        <textarea
          value={answer || ""}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Write your response here..."
          rows={6}
          className="w-full p-4 border border-gray-300 rounded-xl text-sm text-gray-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
        />
      )}
    </div>
  );
}
