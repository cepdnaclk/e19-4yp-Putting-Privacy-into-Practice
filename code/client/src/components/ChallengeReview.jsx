import { CheckCircle, Info } from "lucide-react";

export default function ChallengeReview({ item, index }) {
  const queInfo = item.question;
  const options = queInfo.options;
  const chosenOption = item.selectedOption;
  const notAnswered = chosenOption === "unanswered";
  const correctOption = queInfo.correctAnswer;
  const isCorrect = chosenOption === correctOption;
  const reflection = queInfo.reflection;
  const complexity = queInfo.complexity;

  return (
    <div className="w-full justify-start bg-gray-100 rounded-md mb-2 p-4 text-left">
      {/* header  */}
      <div className="flex justify-between items-center">
        <p className="text-lg mb-1 text-gray-400 font-extrabold">
          Question {index + 1}:
        </p>
        {/* tags */}
        <div className="flex gap-2">
          <p className="text-sm font-semibold text-white bg-blue-600 px-1 rounded-sm">
            {complexity}
          </p>
          {notAnswered && (
            <p className="text-sm font-semibold text-white bg-red-600 px-1 rounded-sm">
              Unanswered
            </p>
          )}
        </div>
      </div>
      {/* scenario */}
      <p className="text-lg mb-2">{queInfo.scenario}</p>
      {/* challenge */}
      <p className="font-bold mb-2">{queInfo.challenge}</p>
      {/* options */}
      <div className="space-y-1">
        {Object.entries(options).map(([key, value]) => (
          <p
            key={key}
            className={`p-2 rounded ${
              key !== chosenOption
                ? ""
                : isCorrect
                ? "bg-green-100 font-semibold border border-green-300"
                : !notAnswered
                ? "bg-red-100 font-semibold border border-red-300"
                : ""
            } text-sm`}
          >
            {key}. {value}
          </p>
        ))}
      </div>
      {/* break line  */}
      <hr className="my-4 border-gray-300 mb-5" />
      {/* correct answer  */}
      <div className="flex flex-col bg-green-200 border border-green-500 rounded-lg p-2 mb-3 gap-1">
        <div className="flex justify-start items-center gap-2">
          <CheckCircle size={16} className="text-green-800" />
          <p className="text-green-800 font-bold">Correct Answer: </p>
        </div>
        <p className="text-green-600 text-sm font-semibold">
          {correctOption}: {options[correctOption]}
        </p>
      </div>
      {/* reflection  */}
      <div className="flex flex-col bg-blue-100 border border-blue-300 rounded-lg p-2 mb-3 gap-1">
        <div className="flex justify-start items-center gap-2">
          <Info size={16} className="text-blue-800" />
          <p className="text-blue-800 font-bold">Explanation: </p>
        </div>
        <p className="text-blue-600 text-sm font-semibold">{reflection}</p>
      </div>
    </div>
  );
}
