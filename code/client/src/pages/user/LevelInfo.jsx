import { useLocation, useParams, useNavigate } from "react-router-dom";
import gameLevels from "../../constants/levels";
import GameLayout from "../../components/GameLayout";
import { Clock, Target } from "lucide-react";
import slugify from "../../utils/slugify";

export default function LevelInfo() {
  const { principle } = useParams();
  const location = useLocation();
  const { levelId } = location.state;
  const level = gameLevels.find((level) => level.id === Number(levelId));
  const navigate = useNavigate();

  function handleStartChallenge() {
    navigate(`/levelBoard/${slugify(principle)}/challenge`, {
      state: { levelId },
    });
  }

  return (
    <GameLayout>
      <div
        className={`max-w-3xl mx-auto bg-gradient-to-br ${level.color} rounded-xl p-7`}
      >
        <div className="mt-3 mb-5">{level.icon}</div>
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
            <span className="text-white font-bold">2</span>
            <p className="text-white">Challenges</p>
          </div>
          {/* Time per question */}
          <div
            className={`flex flex-1 flex-col items-center justify-center ${level.overlay} bg-opacity-30 rounded-xl p-3 gap-1`}
          >
            <Clock size={30} color="white" />
            <span className="text-white font-bold">20s</span>
            <p className="text-white">Per Question</p>
          </div>
        </div>

        <button
          className="bg-white rounded-lg py-2 px-6 font-bold hover:bg-gray-300 mb-1"
          onClick={handleStartChallenge}
        >
          Start Challenge
        </button>
      </div>
    </GameLayout>
  );
}
