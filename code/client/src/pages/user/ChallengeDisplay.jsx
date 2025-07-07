import GameLayout from "../../components/GameLayout";
import { useEffect, useState } from "react";
import McqQuestion from "../../components/McqQuestion";
import { Clock } from "lucide-react";

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
];

export default function QuestionDisplay() {
  const [currentQuestion, setCurrentQuestion] = useState(questions[0]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

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
              onSelectOption={setSelectedOption}
              currentOption={selectedOption}
            />
          )}
          {/* submit button */}
          <button
            className={`py-1 px-3 rounded-md bg-blue-600 ${
              !selectedOption
                ? "bg-opacity-50"
                : "hover:bg-blue-700 cursor-pointer"
            }`}
            disabled={!selectedOption}
          >
            <span className="text-xs text-white font-semibold">
              Submit Answer
            </span>
          </button>
        </div>
      </div>
    </GameLayout>
  );
}
