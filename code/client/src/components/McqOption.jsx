export default function McqOption({ option, onClick, currentOption }) {
  const selected = currentOption === option.id;

  return (
    <div
      className={`mb-3 py-3 px-2 rounded-md border ${
        selected
          ? "border-2 border-blue-500 bg-blue-200"
          : "border-gray-300 hover:bg-white hover:border-gray-400"
      } cursor-pointer`}
      onClick={() => onClick(option.id)}
    >
      <p className="text-xs">
        <span className="text-blue-600 font-semibold mr-2">
          {option.id}
          {"."}
        </span>
        {option.text}
      </p>
    </div>
  );
}
