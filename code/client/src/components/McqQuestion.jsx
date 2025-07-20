import McqOption from "./McqOption";
import ResponseCard from "./ResponseCard";

export default function McqQuestion({
  question,
  onSelectOption,
  currentOption,
  showExplanation,
  isTimeOut,
  onNewFeedback,
}) {
  const correctAnswerKey = question.correctAnswer;
  return (
    <div className="w-full text-left mb-6">
      <p className="mb-2">{question.scenario}</p>
      <p className="font-bold mb-2">{question.challenge}</p>
      {!showExplanation &&
        Object.entries(question.options).map(([id, text]) => (
          <McqOption
            key={id}
            option={{ id, text }}
            onClick={onSelectOption}
            currentOption={currentOption}
          />
        ))}

      {showExplanation && (
        <ResponseCard
          answerStatus={currentOption === correctAnswerKey}
          correctAnswer={`${correctAnswerKey}: ${question.options[correctAnswerKey]}`}
          reflection={question.reflection}
          isTimeOut={isTimeOut}
          question={question}
          currentOption={currentOption}
          onNewFeedback={onNewFeedback}
        />
      )}
    </div>
  );
}
