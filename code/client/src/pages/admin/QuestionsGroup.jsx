import Layout from "../../components/Layout";
import { useNavigate } from "react-router-dom";
import PrincipleCard from "../../components/PrincipleCard";
import slugify from "../../utils/slugify";
import {
  Scale,
  FileLock,
  ArrowDownNarrowWide,
  Target,
  Database,
  ShieldCheck,
  ClipboardList,
} from "lucide-react";

export default function QuestionsGroup() {
  const navigate = useNavigate();

  function showQuestions(title, description) {
    navigate(`/admin/questions/${slugify(title)}`, {
      state: { title, description },
    });
  }

  return (
    <Layout>
      <div className="w-full p-6">
        <h1 className="text-3xl font-bold text-[#1e244c] mb-6 mt-2 text-left">
          GDPR Questions
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-20 gap-y-10">
          <PrincipleCard
            title="Lawfulness, Fairness and Transparency"
            description="Personal data must be processed lawfully, fairly and in a transparent manner."
            onClick={showQuestions}
            Icon={Scale}
          />

          <PrincipleCard
            title="Purpose Limitation"
            description="Personal data must be collected for specified, explicit and legitimate purposes."
            onClick={showQuestions}
            Icon={FileLock}
          />

          <PrincipleCard
            title="Data Minimization"
            description="Personal data must be adequate, relevant and limited to what is necessary."
            onClick={showQuestions}
            Icon={ArrowDownNarrowWide}
          />

          <PrincipleCard
            title="Accuracy"
            description="Personal data must be accurate and, where necessary, kept up to date."
            onClick={showQuestions}
            Icon={Target}
          />

          <PrincipleCard
            title="Storage Limitation"
            description="Personal data must be kept in a form which permits identification for no longer than necessary."
            onClick={showQuestions}
            Icon={Database}
          />

          <PrincipleCard
            title="Integrity and Confidentiality"
            description="Personal data must be processed in a manner that ensures appropriate security."
            onClick={showQuestions}
            Icon={ShieldCheck}
          />

          <PrincipleCard
            title="Accountability"
            description="Organizations must take responsibility for data processing and demonstrate GDPR compliance."
            onClick={showQuestions}
            Icon={ClipboardList}
          />
        </div>
      </div>
    </Layout>
  );
}
