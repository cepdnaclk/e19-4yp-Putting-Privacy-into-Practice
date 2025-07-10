import { RotateCcw, Shield, Star, Trophy, User } from "lucide-react";
import { useContext, useEffect, useState, useRef } from "react";
import gameLevels from "../../constants/levels";
import LevelCard from "../../components/LevelCard";
import ConfirmationModal from "../../components/ConfirmationModal";
import { useNavigate } from "react-router-dom";
import GameLayout from "../../components/GameLayout";
import axios from "axios";
import { config } from "../../utils/config";
import { AuthContext } from "../../context/AuthContext";
import LoadingSpinner from "../../components/LoadingSpinner";

export default function LevelBoard() {
  const { user, logout } = useContext(AuthContext);

  const [progress, setProgress] = useState(null);
  const [stars, setStars] = useState(0);
  const [completedLevels, setCompletedLevels] = useState(0);
  const [currentLevel, setCurrentLevel] = useState(1);
  const player = useRef(user?.username || "Robot");
  const [showResetModal, setShowResetModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const totalLevel = 7;

  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${config.serverBaseUrl}/api/progress`, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data);
        const progress = res.data.progress;
        setProgress(progress);
        setStars(progress.stars); // set the total stars
        setCompletedLevels(progress.completedLevels);
        setCurrentLevel(progress.completedLevels + 1);
      })
      .catch((err) => {
        const message = err.response?.data?.message || "Something went wrong";
        const errorDetail = err.response?.data?.error || null;

        console.error("Error message:", message);
        console.error("Full error:", errorDetail);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  function handleReset() {
    setStars(0);
    setCompletedLevels(0);
    setCurrentLevel(1);
    setShowResetModal(false);

    axios
      .post(
        `${config.serverBaseUrl}/api/progress/reset`,
        {},
        { withCredentials: true }
      )
      .then((res) => {
        console.log(res.data.message);
        window.location.reload();
      })
      .catch((err) => {
        console.error(err.response?.data?.error || "Progress reset failed");
      });
  }

  function onSelectLevel(level) {
    const { id, levelValue, ...rest } = level;
    const levelStars = progress.levelStars[id - 1];
    navigate(`/levelBoard/${levelValue}/info`, {
      state: { levelId: id, levelStars },
    });
  }

  async function handleLogout() {
    try {
      const response = await axios.post(
        `${config.serverBaseUrl}/api/auth/logout`,
        {},
        { withCredentials: true }
      );
      console.log(response.data);
      logout();
      navigate("/");
    } catch (error) {
      console.error("Logout failed: ", error.response);
      logout();
      navigate("/");
    }
  }

  if (loading) {
    return (
      <div role="status" aria-live="polite">
        <LoadingSpinner />
      </div>
    );
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
          <p className="text-white text-sm font-semibold ml-2">
            {player.current}
          </p>
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

      <div className="flex justify-center items-center gap-4">
        {/* Reset  */}
        <div
          className="inline-flex items-center justify-center gap-2 bg-[#2e3456] py-1 px-3 rounded-md
                  transition duration-300 hover:text-black group cursor-pointer"
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

        {/* logout button */}
        <button
          className="bg-red-600 text-sm font-semibold text-white rounded-lg px-5 py-1 cursor-pointer hover:bg-red-800"
          onClick={handleLogout}
        >
          <span>Logout</span>
        </button>
      </div>

      {/* Reset confirmation modal */}
      {showResetModal && (
        <ConfirmationModal
          setShowModal={setShowResetModal}
          handleConfirmation={handleReset}
          mainPrompt="Are you sure?"
          subPrompt="This will reset your progress permanently."
        />
      )}
    </GameLayout>
  );
}
