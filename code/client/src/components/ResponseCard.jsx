import { CheckCircle, CircleXIcon, Star } from "lucide-react";

export default function ResponseCard({
  answerStatus,
  correctAnswer,
  reflection,
}) {
  return (
    <div className="w-full flex flex-col gap-4">
      {/* answer Status  */}
      <div
        className={`w-full ${
          answerStatus
            ? "bg-green-100 border-green-300 border"
            : "bg-red-100 border-red-300 border"
        } rounded-lg px-6 py-5`}
      >
        <div className="flex items-center justify-start gap-2 mb-2">
          {/* correct answer header  */}
          {answerStatus && (
            <>
              <CheckCircle size={18} color="green" />
              <span>🎉</span>
              <p className="font-bold text-green-800">Correct!</p>
            </>
          )}
          {/* incorrect answer header  */}
          {!answerStatus && (
            <>
              <CircleXIcon size={18} color="red" />
              <span>❌</span>
              <p className="font-bold text-red-800">Incorrect</p>
            </>
          )}
        </div>
        {/* correct answer  */}
        {answerStatus && (
          <h3 className="text-xs text-green-600">{correctAnswer}</h3>
        )}
        {/* correct answer  */}
        {!answerStatus && (
          <h3 className="text-xs text-red-600">{correctAnswer}</h3>
        )}
      </div>
      {/* reflection / explanation  */}
      <div className="w-full bg-blue-100 border-blue-300 border rounded-lg px-6 py-5">
        <div className="flex items-center justify-start gap-2 mb-2">
          {/* explanation header  */}
          <span>💡</span>
          <p className="font-bold text-blue-800">Explanation</p>
        </div>
        {/* Explanation  */}
        <h3 className="text-xs text-blue-600">{reflection}</h3>
      </div>
    </div>
  );
}
