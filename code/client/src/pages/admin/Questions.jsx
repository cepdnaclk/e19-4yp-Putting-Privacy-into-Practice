import Layout from "../../components/Layout";
import { useLocation, useParams } from "react-router-dom";
import iconMap from "../../constants/iconMap";
import Button from "../../components/Button";
import { useState } from "react";
import QuestionForm from "../../components/QuestionForm";

export default function Questions() {
  const location = useLocation();
  const { group } = useParams();
  const { title, description } = location.state || {};
  const Icon = iconMap[group];

  const [showAddQuestionForm, setShowAddQuestionForm] = useState(false);

  return (
    <Layout>
      <div className="w-full p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-[#1e244c] mt-2">{title}</h1>
          <Button
            fullSpan={false}
            onClick={() => setShowAddQuestionForm((state) => !state)}
          >
            Add Question
          </Button>
        </div>

        {showAddQuestionForm && <QuestionForm />}
      </div>
    </Layout>
  );
}
