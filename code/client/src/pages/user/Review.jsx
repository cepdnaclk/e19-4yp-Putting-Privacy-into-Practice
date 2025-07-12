import axios from "axios";
import { useEffect, useState } from "react";
import GameLayout from "../../components/GameLayout";
import gameLevels from "../../constants/levels";
import { useParams } from "react-router-dom";
import { Star } from "lucide-react";
import ChallengeReview from "../../components/ChallengeReview";
import LoadingSpinner from "../../components/LoadingSpinner";

export default function Review() {
  const { levelValue } = useParams();
  const levelId = gameLevels.find((lvl) => lvl.levelValue === levelValue).id;
  const levelName = gameLevels.find(
    (lvl) => lvl.levelValue === levelValue
  ).principle;
  const [facedQuestions, setFacedQuestions] = useState([]);
  const [stars, setStars] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`/api/progress`, {
        withCredentials: true,
      })
      .then((res) => {
        const progress = res.data.progress;
        setFacedQuestions(progress.questions);
        setStars(progress.levelStars[levelId - 1]);
      })
      .catch((err) => {
        const message = err.response?.data?.message || "Something went wrong";
        const errorDetail = err.response?.data?.error || null;

        console.error("Error message:", message);
        console.error("Full error:", errorDetail);
      })
      .finally(() => setLoading(false));
  }, [levelId]);

  if (loading) {
    return (
      <div role="status" aria-live="polite">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <GameLayout>
      <div className="max-w-3xl max-h-3xl my-auto mx-auto">
        <span className="flex items-center justify-center gap-2 mb-3">
          {Array(3)
            .fill()
            .map((_, i) => (
              <Star
                key={i}
                size={32}
                color="gold"
                fill={i < stars ? "gold" : "none"}
              />
            ))}
        </span>
        <p className="text-4xl text-white font-bold mb-6">{levelName}</p>
        {facedQuestions.map((item, index) => {
          return <ChallengeReview item={item} index={index} key={index} />;
        })}
      </div>
    </GameLayout>
  );
}
