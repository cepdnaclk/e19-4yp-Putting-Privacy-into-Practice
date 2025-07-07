import { CheckCircle, Lock, Play } from "lucide-react";

export default function LevelCard({ levelProps, currentLevel, handleClick }) {
  const current = currentLevel === levelProps.id;
  const isUnlocked = levelProps.id <= currentLevel;

  function clickHandler() {
    // This function should be improvded.. Have an eye on it.
    if (isUnlocked) handleClick(levelProps);
    else return;
  }

  return (
    <div
      className={`px-3 rounded-xl transform transition duration-300 hover:scale-105 hover:shadow-lg ${
        isUnlocked ? "cursor-pointer" : "opacity-65"
      }`}
      onClick={() => clickHandler()}
    >
      <div className={`bg-gradient-to-br ${levelProps.color} rounded-t-xl p-4`}>
        <div className="flex justify-between items-center mb-2">
          <p
            className={`inline-block text-white text-base font-semibold text-center rounded-full ${levelProps.overlay} px-3 py-1`}
          >
            {levelProps.id}
          </p>
          {current && isUnlocked && <Play size={25} color="white" />}
          {!isUnlocked && <Lock size={25} color="gray" />}
          {isUnlocked && !current && (
            <CheckCircle size={25} className="text-green-300" />
          )}
        </div>
        {/* Icon  */}
        <div className="flex items-center justify-center mb-2">
          {levelProps.icon}
        </div>
        <p className="text-white font-bold text-lg">{levelProps.title}</p>
        <p className="text-white text-sm text-center">
          {levelProps.description}
        </p>
      </div>

      {/* principle name */}
      <div className="bg-white py-4 rounded-b-xl text-center">
        <p>{levelProps.principle}</p>
      </div>
    </div>
  );
}
