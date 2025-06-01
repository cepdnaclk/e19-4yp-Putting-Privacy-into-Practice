import Layout from "../../components/Layout";
import DashboardCard from "../../components/DashboardCard";
import QuestionsCard from "../../components/QuestionsCard";
import { ClipboardCheck, UserCheck, Book } from "lucide-react";
import useFetch from "../../hooks/useFetch";
import useAnimatedCount from "../../hooks/useAnimatedCount";

export default function Dashboard() {
  const { data: users } = useFetch("/api/auth/users/count");
  const { data: questionsCount } = useFetch("/api/questions/count");

  const GDPRprinciples = [
    "Lawfulness, fairness, transparency",
    "Purpose limitation",
    "Data minimization",
    "Accuracy",
    "Storage limitation",
    "Integrity & confidentiality",
    "Accountability",
  ];

  const totalUsers = users?.count || 0;
  const totalQuestions = questionsCount?.count || 0;
  const totalPrinciples = GDPRprinciples.length;

  const UserCount = useAnimatedCount(totalUsers);
  const QuestionCount = useAnimatedCount(totalQuestions);
  const GDPRCount = useAnimatedCount(totalPrinciples);

  return (
    <Layout>
      <div className="p-6">
        <h1 className="text-2xl font-bold text-[#252d5c] mb-6">Overview</h1>

        <div className="flex flex-wrap gap-6 items-start max-w-full">
          <DashboardCard
            title="Active Users"
            value={UserCount}
            Icon={UserCheck}
          />
          <QuestionsCard
            title="Questions"
            value={QuestionCount}
            Icon={ClipboardCheck}
            breakdown={{ easy: 5, medium: 4, hard: 3 }}
          />
          <DashboardCard title="GDPR Principles" value={GDPRCount} Icon={Book}>
            {(isHovered) => (
              <div
                className={`text-xs ${
                  isHovered ? "text-white" : "text-[#252d5c]"
                }`}
              >
                <div
                  className={`rounded-md p-2 space-y-1 border ${
                    isHovered
                      ? "bg-[#252d5c] border-blue-500"
                      : "white border-blue-500"
                  }`}
                >
                  {GDPRprinciples.map((principle, index) => (
                    <div key={index} className="flex items-start space-x-2">
                      <span
                        className={`inline-flex items-center justify-center w-5 h-5 rounded-full ${
                          isHovered
                            ? "bg-white text-[#252d5c]"
                            : "bg-blue-600 text-white"
                        }`}
                      >
                        {index + 1}
                      </span>
                      <span>{principle}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </DashboardCard>
        </div>
      </div>
    </Layout>
  );
}
