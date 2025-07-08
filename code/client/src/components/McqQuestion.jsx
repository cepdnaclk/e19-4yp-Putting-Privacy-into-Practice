import McqOption from "./McqOption";

export default function McqQuestion({
  question,
  onSelectOption,
  currentOption,
}) {
  return (
    <div className="w-full text-left mb-6">
      <p className="mb-2">{question.scenario}</p>
      <p className="font-bold mb-2">{question.challenge}</p>
      {question.options.map((option) => (
        <McqOption
          option={option}
          key={option.id}
          onClick={onSelectOption}
          currentOption={currentOption}
        />
      ))}
    </div>
  );
}
