import GameLayout from "../../components/GameLayout";
import { useEffect, useRef, useState } from "react";
import McqQuestion from "../../components/McqQuestion";
import { Clock } from "lucide-react";
import EssayQuestion from "../../components/EssayQuestion";

const questions = [
  {
    id: 1,
    scenario:
      "🏪 A marketing company wants to send promotional emails to customers who purchased products 2 years ago.",
    challenge: "What should they do first?",
    type: "mcq",
    options: [
      {
        id: "A",
        text: "Send emails immediately - they have the data",
      },
      {
        id: "B",
        text: "Get fresh consent for marketing emails",
      },
      {
        id: "C",
        text: "Only email customers who spent $100+",
      },
      {
        id: "D",
        text: "Just add an unsubscribe link",
      },
    ],
    answer: "B",
    explanation:
      "Under GDPR, you need a valid legal basis. For marketing, fresh consent is required!",
  },
  {
    id: 2,
    scenario: "🏥 A hospital wants to share patient data for research...",
    challenge: "What's the correct approach?",
    type: "mcq",
    options: [
      { id: "A", text: "Share all data immediately" },
      { id: "B", text: "Anonymize data before sharing" },
      { id: "C", text: "Share only with government approval" },
      { id: "D", text: "Encrypt and share with no consent" },
    ],
    answer: "B",
    explanation: "Anonymization ensures GDPR compliance.",
  },
  {
    id: 3,
    scenario:
      "📱 You're building a mobile fitness app that asks users to enter their full name, email, phone number, gender, weight, height, and optionally allow access to location and contacts.",
    challenge:
      "As the developer, how would you apply the Data Minimization principle when designing the user registration and data collection process?",
    type: "essay",
    answer:
      "To follow the data minimization principle, I would evaluate which data fields are strictly necessary for the app’s functionality. For registration, name and email might be sufficient. Phone number, gender, and location should be optional unless justified by a feature (e.g., social challenges by location). Access to contacts is not necessary at signup and should be requested only if users opt into social features. Weight and height should be collected only when the user starts using health tracking features, and the user should be informed why this data is needed.",
    reflection:
      "This challenge encourages developers to critically analyze each data point they collect, reducing unnecessary processing of personal data. Minimizing data at collection points not only supports GDPR compliance but also builds user trust and reduces potential privacy risks.",
  },
];

export default function QuestionDisplay() {
  const questionIndex = useRef(0);
  const [currentQuestion, setCurrentQuestion] = useState(
    questions[questionIndex.current]
  );
  const [userAnswer, setUserAnswer] = useState(null); // user's answer
  const [showExplanation, setShowExplanation] = useState(false);
  const [levelEnd, setLevelEnd] = useState(false);
  const [timeLeft, setTimeLeft] = useState(20);
  const timerRef = useRef(null);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, [currentQuestion]);

  function handleSubmit() {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    setShowExplanation(true);
    if (questionIndex.current + 1 === questions.length) setLevelEnd(true);
  }

  function showNextQuestion() {
    setUserAnswer(null);
    setShowExplanation(false);
    setCurrentQuestion(questions[++questionIndex.current]);
    setTimeLeft((prev) =>
      questions[questionIndex.current].type === "essay" ? prev + 30 : prev + 20
    );
  }

  function handleLevelCompletion() {}

  return (
    <GameLayout>
      <div className="max-w-3xl max-h-3xl my-auto mx-auto ">
        <div className="flex justify-end mb-6">
          <div
            className={`w-[60px] flex items-center justify-center gap-1 px-2 py-1 rounded-md ${
              timeLeft <= 10 ? "bg-red-500 animate-pulse" : "bg-[#393f65]"
            }`}
          >
            <Clock color="white" size={15} />
            <p className="text-white text-sm">{timeLeft}</p>
          </div>
        </div>
        <div className="w-full h-full bg-gray-100 rounded-lg p-7">
          {/* mcq type questions */}
          {currentQuestion.type === "mcq" && (
            <McqQuestion
              question={currentQuestion}
              onSelectOption={setUserAnswer}
              currentOption={userAnswer}
            />
          )}

          {/* essay type questions */}
          {currentQuestion.type === "essay" && (
            <EssayQuestion
              question={currentQuestion}
              answer={userAnswer}
              onChange={setUserAnswer}
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
            <button
              className="py-1 px-3 rounded-md bg-green-600 hover:bg-green-800 cursor-pointer"
              onClick={showNextQuestion}
            >
              <span className="text-xs text-white font-semibold">
                Next Challenge
              </span>
            </button>
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
        </div>
      </div>
    </GameLayout>
  );
}
