import GameLayout from "../../components/GameLayout";
import { useEffect, useRef, useState, useCallback } from "react";
import McqQuestion from "../../components/McqQuestion";
import { Clock, Star } from "lucide-react";
import EssayQuestion from "../../components/EssayQuestion";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { config } from "../../utils/config";
import LoadingSpinner from "../../components/LoadingSpinner";
import ConfirmationModal from "../../components/ConfirmationModal";
import gameLevels from "../../constants/levels";
import { getNextDifficulty } from "../../rl/rlEngine";

const TOTAL_CHALLENGES = 3;

export default function QuestionDisplay() {
  const { levelValue } = useParams();
  const levelId = gameLevels.find((lvl) => lvl.levelValue === levelValue).id;
  const questionIndex = useRef(1);
  const [questions, setQuestions] = useState({
    easy: [],
    medium: [],
    hard: [],
  });
  const [currentQuestion, setCurrentQuestion] = useState({});
  const [userAnswer, setUserAnswer] = useState(null); // user's answer
  const [starCount, setStarCount] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const [levelEnd, setLevelEnd] = useState(false);
  const [timeLeft, setTimeLeft] = useState(90);
  const [loading, setLoading] = useState(false);
  const [showQuizRetakeModal, setShowQuizRetakeModal] = useState(false);
  const [facedQuestions, setFacedQuestions] = useState([]);
  const timerRef = useRef(null);
  const timerStartValue = useRef(timeLeft);
  const [retry, setRetry] = useState(true);

  const navigate = useNavigate();

  // check whether the level is completed if yes, redirect to the levelBoard.
  useEffect(() => {
    const checkLevelCompletion = async () => {
      try {
        const res = await axios.get(`${config.serverBaseUrl}/api/progress`, {
          withCredentials: true,
        });

        const progress = res.data.progress;

        // Redirect if level already completed
        if (progress.completedLevels >= levelId) {
          window.location.replace("/levelBoard");
        }
      } catch (err) {
        const message = err.response?.data?.message || "Something went wrong";
        const errorDetail = err.response?.data?.error || null;

        console.error("Error message:", message);
        console.error("Full error:", errorDetail);
      }
    };

    checkLevelCompletion();
  }, [levelId]);

  // fetching questions from the api
  useEffect(() => {
    setLoading(true);
    axios
      .get(`${config.serverBaseUrl}/api/questions/${levelValue}`, {
        withCredentials: true,
      })
      .then((res) => {
        const grouped = {
          easy: [],
          medium: [],
          hard: [],
        };

        res.data.forEach((q) => {
          if (grouped[q.complexity]) {
            grouped[q.complexity].push(q);
          }
        });

        // initially give an easy question.
        const randomEasyQuestion =
          grouped.easy[Math.floor(Math.random() * grouped.easy.length)];

        // Remove that question from the easy pool
        grouped.easy = grouped.easy.filter(
          (q) => q._id !== randomEasyQuestion._id
        );

        setQuestions(grouped);
        setCurrentQuestion(randomEasyQuestion || res.data[0] || {});
      })
      .catch((err) => {
        console.log(err.response?.data?.message || "Failed to load questions");
      })
      .finally(() => setLoading(false));
  }, [levelValue]);

  // set the timer for each of the questions.
  useEffect(() => {
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, [currentQuestion, retry]);

  // set the levelEnd based on the timer and number of Questions..
  useEffect(() => {
    const uniqueQuestions = Array.from(
      new Set(facedQuestions.map((q) => q.question))
    );

    if (timeLeft === 0 || uniqueQuestions.length === TOTAL_CHALLENGES) {
      setLevelEnd(true);
    }
  }, [timeLeft, facedQuestions]);

  // function to handle question submission
  const handleSubmit = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    if (userAnswer === currentQuestion.correctAnswer) {
      setStarCount((star) => star + 1);
    }

    setFacedQuestions((ques) => [
      ...ques,
      { question: currentQuestion, selectedOption: userAnswer || "unanswered" },
    ]);

    setShowExplanation(true);
  }, [userAnswer, currentQuestion]);

  // watch the timer.. if it exceeds, set show Explanation. Selecting the answer without submission can also be considered for evaluation at the timer exceed
  useEffect(() => {
    if (timeLeft === 0) {
      handleSubmit();
    }
  }, [timeLeft, handleSubmit]);

  // handles next question button click
  // provides the next question from the Questions array using RL.
  function showNextQuestion() {
    const timeTakenForPreviousChallenge = timerStartValue.current - timeLeft;
    console.log(timeTakenForPreviousChallenge);
    setUserAnswer(null);
    setShowExplanation(false);
    //get the next question using RLEngine complexity
    const rlOutput = getNextDifficulty({
      prevDifficulty: currentQuestion.complexity,
      wasCorrect: currentQuestion.correctAnswer === userAnswer,
      timeTaken: timeTakenForPreviousChallenge,
    });

    const nextComplexity = rlOutput.nextDifficulty;

    const questionPool = { ...questions };
    const availableQuestionsforRlComplexity = questionPool[nextComplexity];
    console.log(availableQuestionsforRlComplexity);

    if (
      !availableQuestionsforRlComplexity ||
      availableQuestionsforRlComplexity.length === 0
    ) {
      console.warn(
        `No more questions available for difficulty: ${nextComplexity}`
      );
      return;
    }

    const randomIndex = Math.floor(
      Math.random() * availableQuestionsforRlComplexity.length
    );
    const nextQuestion = availableQuestionsforRlComplexity[randomIndex];

    // Remove the selected question from the pool
    questionPool[nextComplexity] = availableQuestionsforRlComplexity.filter(
      (q) => q._id !== nextQuestion._id
    );

    setQuestions(questionPool);
    questionIndex.current += 1;
    setCurrentQuestion(nextQuestion);
    setRetry(true);
    timerStartValue.current = timeLeft;
  }

  // retry the same question
  function retryQuestion() {
    setUserAnswer(null);
    setShowExplanation(false);
    setRetry(false);
    setCurrentQuestion(currentQuestion);
  }

  // level complete action
  function handleLevelCompletion() {
    if (starCount < 2) {
      setShowQuizRetakeModal(true);
      return;
    }

    axios
      .post(
        `${config.serverBaseUrl}/api/progress/update`,
        {
          stars: starCount,
          questions: facedQuestions,
          levelId,
        },
        { withCredentials: true }
      )
      .then((res) => {
        console.log(res.data.message);
        navigate("/levelBoard", { replace: true });
      })
      .catch((err) => {
        console.log(err.response?.data?.message || "Progress update failed");
      });
  }

  // challenge retake
  function retakeChallenge() {
    setShowQuizRetakeModal(false);
    window.location.reload(); // Refreshes the current page
  }

  if (loading) {
    return (
      <div role="status" aria-live="polite">
        <LoadingSpinner />
      </div>
    );
  }

  if (!Object.keys(currentQuestion).length > 0) {
    return (
      <GameLayout>
        <div className="max-w-5xl max-h-3xl my-auto mx-auto rounded-lg p-7">
          <p className="text-5xl font-bold text-red-600 mb-2">
            🏗️ UNDER CONSTRUCTION
          </p>
          <p className="text-xl font-bold text-gray-200 mb-2">
            **Oops! New Challenges Coming Soon**
          </p>
          <p className="text-xl font-bold text-gray-200 mb-2">
            We’re crafting fresh GDPR challenges for this level.
          </p>
        </div>
      </GameLayout>
    );
  }

  return (
    <GameLayout>
      <div className="max-w-3xl max-h-3xl my-auto mx-auto">
        <div className="flex items-center justify-between mb-6 gap-3">
          <h2 className="text-white font-bold text-xl">
            Challenge {questionIndex.current}/3
          </h2>
          <div className="flex gap-3">
            {/* complexity */}
            <div className="text-center px-2 py-2 rounded-md bg-[#393f65]">
              <p className="text-white font-semibold">
                {currentQuestion.complexity}
              </p>
            </div>
            {/* Star count */}
            <div className="w-[60px] flex items-center justify-center gap-1 px-2 py-2 rounded-md bg-[#393f65]">
              <Star color="gold" size={15} fill="gold" />
              <p className="text-yellow-200 text-sm">{starCount}</p>
            </div>
            {/* Timer  */}
            <div
              className={`w-[60px] flex items-center justify-center gap-1 px-2 py-2 rounded-md ${
                timeLeft <= 10 ? "bg-red-500 animate-pulse" : "bg-[#393f65]"
              }`}
            >
              <Clock color="white" size={15} />
              <p className="text-white text-sm">{timeLeft}</p>
            </div>
          </div>
        </div>

        <div className="w-full h-full bg-gray-100 rounded-lg p-7">
          {/* mcq type questions */}
          {currentQuestion.type === "mcq" && (
            <McqQuestion
              question={currentQuestion}
              onSelectOption={setUserAnswer}
              currentOption={userAnswer}
              showExplanation={showExplanation}
              isTimeOut={timeLeft === 0}
            />
          )}

          {/* essay type questions */}
          {currentQuestion.type === "essay" && (
            <EssayQuestion
              question={currentQuestion}
              answer={userAnswer}
              onChange={setUserAnswer}
              showExplanation={showExplanation}
            />
          )}

          {/* submit button */}
          {!showExplanation && (
            <button
              className={`py-1 px-3 rounded-md bg-blue-600 ${
                !userAnswer
                  ? "bg-opacity-50"
                  : "hover:bg-blue-700 cursor-pointer"
              }`}
              disabled={!userAnswer}
              onClick={handleSubmit}
            >
              <span className="text-xs text-white font-semibold">
                Submit Answer
              </span>
            </button>
          )}
          {/* next question button */}
          {showExplanation && !levelEnd && (
            <div className="flex items-center justify-center gap-2">
              {/* Retry button */}
              {userAnswer !== currentQuestion.correctAnswer && retry && (
                <button
                  className="py-1 px-3 rounded-md bg-blue-600 hover:bg-blue-800 cursor-pointer"
                  onClick={retryQuestion}
                >
                  <span className="text-xs text-white font-semibold">
                    Retry
                  </span>
                </button>
              )}
              {/* Next challenge button  */}
              <button
                className="py-1 px-3 rounded-md bg-green-600 hover:bg-green-800 cursor-pointer"
                onClick={showNextQuestion}
              >
                <span className="text-xs text-white font-semibold">
                  Next Challenge
                </span>
              </button>
            </div>
          )}
          {/* complete level button */}
          {levelEnd && (
            <button
              className="py-1 px-3 rounded-md bg-green-600 hover:bg-green-800 cursor-pointer"
              onClick={handleLevelCompletion}
            >
              <span className="text-xs text-white font-semibold">
                Complete Level
              </span>
            </button>
          )}
          {/* confirmation modal for challenge retake */}
          {showQuizRetakeModal && (
            <ConfirmationModal
              setShowModal={setShowQuizRetakeModal}
              handleConfirmation={retakeChallenge}
              mainPrompt="Minimum 2 stars required"
              subPrompt="Please retake the challenge"
            />
          )}
        </div>
      </div>
    </GameLayout>
  );
}
