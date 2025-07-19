import { CheckCircle } from "lucide-react";

export default function ResponseCard({
  answerStatus,
  correctAnswer,
  reflection,
  isTimeOut,
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
          {/* incorrect answer without Timeout header  */}
          {!answerStatus && !isTimeOut && (
            <>
              <span className="text-lg">🤖</span>
              <p className="font-bold text-red-800">Incorrect choice: </p>
            </>
          )}
          {/* incorrect answer with timeout */}
          {!answerStatus && isTimeOut && (
            <>
              <span className="text-lg">⌚</span>
              <p className="font-bold text-red-800">Timeout</p>
            </>
          )}
        </div>
        {/* correct answer if user's answer is correct. */}
        {answerStatus && (
          <h3 className="text-xs text-green-600">{correctAnswer}</h3>
        )}
        {/* correct answer if user's answer is wrong and timeout */}
        {!answerStatus && isTimeOut && (
          <h3 className="text-xs text-red-600">{correctAnswer}</h3>
        )}
        {/* feedback if user's answer is wrong */}
        {!answerStatus && !isTimeOut && (
          <h3 className="text-xs text-red-600">Feedback</h3>
        )}
      </div>
      {/* reflection / explanation  */}
      <div className="w-full bg-blue-100 border-blue-300 border rounded-lg px-6 py-5">
        <div className="flex items-center justify-start gap-2 mb-2">
          {/* explanation header  */}
          <span>💡</span>
          <p className="font-bold text-blue-800">
            Reflection of the Challenge:
          </p>
        </div>
        {/* Explanation  */}
        <h3 className="text-xs text-blue-600">{reflection}</h3>
      </div>
    </div>
  );
}
