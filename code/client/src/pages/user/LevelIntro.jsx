import { useLocation, useParams, useNavigate } from "react-router-dom";
import gameLevels from "../../constants/levels";
import GameLayout from "../../components/GameLayout";

export default function LevelIntro() {
  const { levelValue } = useParams();
  const location = useLocation();
  const { levelId, levelStars } = location.state;
  const level = gameLevels.find((level) => level.id === Number(levelId));
  const navigate = useNavigate();

  function handleWatchVideo() {
    navigate(`/levelBoard/${levelValue}/watchVideo`, {
      state: { levelId, levelStars },
    });
  }

  return (
    <GameLayout>
      <div
        className={`max-w-3xl mx-auto bg-gradient-to-br ${level.color} rounded-xl p-7`}
      >
        <div className="flex justify-between items-center">
          <div className="mt-3 mb-5">{level.icon}</div>
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

        <p className="text-white text-lg font-semibold mb-3 margin-center">
          Before starting the challenges, watch the video to understand the
          principle better. This will help you in the challenges ahead. Watching
          the video is essential to grasp the concept fully and perform better
          in the challenges.
        </p>
        <button
          className="bg-white rounded-lg py-2 px-6 font-bold hover:bg-gray-300 mb-1"
          onClick={handleWatchVideo}
        >
          Watch Video
        </button>
      </div>
    </GameLayout>
  );
}
