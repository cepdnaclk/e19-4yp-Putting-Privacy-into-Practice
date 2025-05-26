import { useEffect, useState } from "react";
import { getAllQuestions } from "../../services/questionService";
import Layout from "../../components/Layout";

export default function Show() {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getAllQuestions()
      .then(setQuestions)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error)
    return <p className="text-red-600 font-semibold">Error: {error}</p>;

  return (
    <Layout>
      <div className="max-w-4xl mx-auto p-6">
        <h2 className="text-3xl font-bold mb-6 text-blue-800">All Questions</h2>
        {questions.map((q) => (
          <div
            key={q._id || q.question_id}
            className="bg-blue-100 border-2 border-blue-500 rounded-lg p-6 mb-6 shadow-md"
          >
            <h3 className="text-xl font-semibold text-blue-700 mb-2">
              Question:
            </h3>
            <p className="text-lg mb-4">{q.question}</p>

            <div className="flex flex-wrap gap-6 text-blue-900 font-medium mb-4">
              <div>
                <span className="font-semibold">Type:</span>{" "}
                {q.question_type || "N/A"}
              </div>
              <div>
                <span className="font-semibold">Value:</span>{" "}
                {q.q_value ?? "N/A"}
              </div>
              <div>
                <span className="font-semibold">Difficulty:</span>{" "}
                {q.difficulty || "N/A"}
              </div>
              <div>
                <span className="font-semibold">Bloom&apos;s Taxonomy:</span>{" "}
                {q.blooms_taxonomy || "N/A"}
              </div>
            </div>

            <div>
              <span className="font-semibold">Rationale:</span>
              <p className="italic mt-2 text-blue-800">
                {q.rational_text || "No rationale provided."}
              </p>
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
}
