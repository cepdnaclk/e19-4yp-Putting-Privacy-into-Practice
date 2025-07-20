import { useLocation, useParams, useNavigate } from "react-router-dom";
import gameLevels from "../../constants/levels";
import GameLayout from "../../components/GameLayout";
import { Clock, Star, Target } from "lucide-react";

export default function LevelInfo() {
  const { levelValue } = useParams();
  const location = useLocation();
  const { levelId, levelStars } = location.state;
  const level = gameLevels.find((level) => level.id === Number(levelId));
  const navigate = useNavigate();

  const completed = levelStars >= 2;

  function handleStartChallenge() {
    navigate(`/levelBoard/${levelValue}/challenge`);
  }

  function handleBack() {
    navigate(`/levelBoard/${levelValue}/watchVideo`, {
      state: { levelId, levelStars },
    });
  }

  // Revisit the completed quiz.
  function displayPreviousAnswers() {
    navigate(`/levelBoard/${levelValue}/review`);
  }

  return (
    <GameLayout>
      <div
        className={`max-w-3xl mx-auto bg-gradient-to-br ${level.color} rounded-xl p-7`}
      >
        <div className="flex justify-between items-center">
          <div className="mt-3 mb-5">{level.icon}</div>
          <span className="flex items-center justify-between gap-2">
            {Array(3)
              .fill()
              .map((_, i) => (
                <Star
                  key={i}
                  size={32}
                  color="white"
                  fill={i < levelStars ? "white" : "none"}
                />
              ))}
          </span>
        </div>
        <div className="text-center mb-5">
          <p className="text-white text-4xl font-bold mb-3">{level.title}</p>
          <p className="text-white text-xl font-semibold mb-3">
            {level.principle}
          </p>
          <p className="text-gray-200 text-lg font-semibold mb-3">
            {level.description}
          </p>
        </div>

        <div className="flex items-center justify-center gap-5 mb-8 w-full">
          {/* Challenges */}
          <div
            className={`flex flex-1 flex-col items-center justify-center ${level.overlay} bg-opacity-30 rounded-xl p-3 gap-1`}
          >
            <Target size={30} color="white" />
            <span className="text-white font-bold">3</span>
            <p className="text-white">Challenges</p>
          </div>
          {/* Time per question */}
          <div
            className={`flex flex-1 flex-col items-center justify-center ${level.overlay} bg-opacity-30 rounded-xl p-3 gap-1`}
          >
            <Clock size={30} color="white" />
            <span className="text-white font-bold">90s</span>
            <p className="text-white">Total Time</p>
          </div>
        </div>

        <div className="flex items-center justify-center gap-5 w-full">
          <button
            className="bg-white rounded-lg py-2 px-6 font-bold hover:bg-gray-300 mb-1"
            onClick={handleBack}
          >
            Back to Video
          </button>

          <button
            className="bg-white rounded-lg py-2 px-6 font-bold hover:bg-gray-300 mb-1"
            onClick={completed ? displayPreviousAnswers : handleStartChallenge}
          >
            {completed ? "Review Challenge" : "Start Challenge"}
          </button>
        </div>
      </div>
    </GameLayout>
  );
}
