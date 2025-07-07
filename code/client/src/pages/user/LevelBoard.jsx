import { RotateCcw, Shield, Star, Trophy, User } from "lucide-react";
import { useState } from "react";
import gameLevels from "../../constants/levels";
import LevelCard from "../../components/LevelCard";
import ConfirmationModal from "../../components/ConfirmationModal";
import { useNavigate } from "react-router-dom";
import GameLayout from "../../components/GameLayout";

export default function LevelBoard() {
  const [stars, setStars] = useState(0);
  const [completedLevels, setCompletedLevels] = useState(0);
  const [currentLevel, setCurrentLevel] = useState(1);
  const [player, setPlayer] = useState("Musthak Ahamed");
  const [showResetModal, setShowResetModal] = useState(false);
  const totalLevel = 7;

  const navigate = useNavigate();

  function handleReset() {
    // Function has to be implemented with back-end request so that related data is set in the db.
    // For now it sets in the page level.
    setStars(0);
    setCompletedLevels(0);
    setCurrentLevel(1);
    setShowResetModal(false);
  }

  function onSelectLevel(level) {
    const { id, ...rest } = level;
    console.log(id);
    navigate(`/levelBoard/${id}/info`);
  }

  return (
    <GameLayout>
      {/* Header */}
      <div className="flex items-center justify-center gap-4 mb-4">
        <Trophy size={50} color="#facc14" />
        <h1 className="text-5xl font-bold text-white">GDPR Guard</h1>
        <Trophy size={50} color="#facc14" />
      </div>
      <p className="text-xl text-gray-300 mb-4">
        Master the 7 principles of Data Protection
      </p>

      {/* player Stats */}
      <div className="flex items-center justify-center gap-5 mb-8">
        {/* stars */}
        <div className="flex items-center justify-center bg-[#2e3456] p-1 px-3 rounded-lg">
          <Star size={20} color="#facc14" />
          <p className="text-white text-sm font-semibold ml-2">{stars} Stars</p>
        </div>
        {/* completed levels */}
        <div className="flex items-center justify-center bg-[#2e3456] p-1 px-3 rounded-lg">
          <Shield size={20} color="#0ef506" />
          <p className="text-white text-sm font-semibold ml-2">
            {completedLevels}/{totalLevel} Completed
          </p>
        </div>
        {/* player name */}
        <div className="flex items-center justify-center bg-[#2e3456] p-1 px-3 rounded-lg">
          <User size={20} color="#040653" />
          <p className="text-white text-sm font-semibold ml-2">{player}</p>
        </div>
      </div>

      {/* levels */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-8 py-2 px-4 sm:px-6 md:px-8 max-w-full overflow-x-hidden">
        {gameLevels.map((level) => {
          return (
            <LevelCard
              levelProps={level}
              currentLevel={currentLevel}
              key={level.id}
              handleClick={onSelectLevel}
            />
          );
        })}
      </div>

      {/* Reset  */}
      <div
        className="inline-flex items-center justify-center gap-2 bg-[#2e3456] py-2 px-3 rounded-md border border-white 
                transition duration-300 hover:text-black hover:border-black group cursor-pointer"
        onClick={() => setShowResetModal(true)}
      >
        <RotateCcw
          size={20}
          className="text-white group-hover:text-black transition duration-300"
        />
        <span className="text-white text-sm group-hover:text-black group-hover:font-bold transition duration-300">
          Reset Progress
        </span>
      </div>

      {/* Reset confirmation modal */}
      {showResetModal && (
        <ConfirmationModal
          setShowModal={setShowResetModal}
          handleConfirmation={handleReset}
        />
      )}
    </GameLayout>
  );
}
