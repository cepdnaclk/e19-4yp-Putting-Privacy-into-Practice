import { useLocation, useParams, useNavigate } from "react-router-dom";
import gameLevels from "../../constants/levels";
import GameLayout from "../../components/GameLayout";
import VideoGallery from "./videoGallery";

export default function LevelVideo() {
  const { levelValue } = useParams();
  const location = useLocation();
  const { levelId, levelStars } = location.state;
  const level = gameLevels.find((level) => level.id === Number(levelId));
  const navigate = useNavigate();

  function handleNext() {
    navigate(`/levelBoard/${levelValue}/info`, {
      state: { levelId, levelStars },
    });
  }

  return (
    <GameLayout>
      <div
        className={`max-w-3xl mx-auto bg-gradient-to-br ${level.color} rounded-xl p-6`}
      >
        <div className="text-center mb-5">
          <p className="text-white text-4xl font-bold mb-3">
            {level.principle}
          </p>
        </div>
        <div className="flex justify-center items-center mb-5">
          <div className="w-[900px] h-[500px]">
            <VideoGallery principle={level.levelValue} />
          </div>
        </div>

        <button
          className="bg-white rounded-lg py-2 px-6 font-bold hover:bg-gray-300 mb-1"
          onClick={handleNext}
        >
          Next
        </button>
      </div>
    </GameLayout>
  );
}
