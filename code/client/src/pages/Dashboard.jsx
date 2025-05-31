import Layout from "../components/Layout";
import DashboardCard from "../components/DashboardCard";
import { ClipboardCheck, UserCheck, Book } from "lucide-react";
import useFetch from "../hooks/useFetch";
import useAnimatedCount from "../hooks/useAnimatedCount";

export default function Dashboard() {
  const { data: users } = useFetch("/api/auth/users/count");
  const { data: questionsCount } = useFetch("/api/questions/count");

  const totalUsers = users?.count || 0;
  const totalQuestions = questionsCount?.count || 0;

  const UserCount = useAnimatedCount(totalUsers);
  const QuestionCount = useAnimatedCount(totalQuestions);

  return (
    <Layout>
      <div className="p-6">
        <h1 className="text-2xl font-bold text-[#252d5c] mb-6">Overview</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-20">
          <DashboardCard
            title="Active Users"
            value={UserCount}
            Icon={UserCheck}
          />
          <DashboardCard title="GDPR Principles" value="7" Icon={Book} />
          <DashboardCard
            title="Questions"
            value={QuestionCount}
            Icon={ClipboardCheck}
          />
        </div>
      </div>
    </Layout>
  );
}
