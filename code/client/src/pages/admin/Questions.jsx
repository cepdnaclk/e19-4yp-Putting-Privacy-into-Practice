import Layout from "../../components/Layout";
import { useLocation } from "react-router-dom";
import Button from "../../components/Button";
import { useState } from "react";
import QuestionForm from "../../components/QuestionForm";
import QuestionsCard from "../admin/QuestionsCard";

export default function Questions() {
  const location = useLocation();

  const { title, principle: principleValue } = location.state || {};

  const principle = principleValue;

  const [showAddQuestionForm, setShowAddQuestionForm] = useState(false);

  return (
    <Layout>
      <div className="flex flex-col space-y-8 p-6 w-full">
        <div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h1 className="text-3xl font-bold text-[#252d5c] mt-2 text-left">
                {title}
              </h1>
            </div>
            <Button
              fullSpan={false}
              onClick={() => setShowAddQuestionForm((state) => !state)}
            >
              Add Question
            </Button>
          </div>

          {showAddQuestionForm && (
            <QuestionForm
              onCloseForm={() => setShowAddQuestionForm(false)}
              defaultPrinciple={principle}
            />
          )}
        </div>

        <div>
          <QuestionsCard title={title} principle={principle} />
        </div>
      </div>
    </Layout>
  );
}
