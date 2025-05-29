import Layout from "../../components/Layout";
import { CheckCircle, Pencil, Trash2 } from "lucide-react";
import useFetch from "../../hooks/usefetch";

export default function Show() {
  const Url = "/api/questions";
  const { data: questions, loading, error } = useFetch(Url);

  if (loading) return <p className="text-center text-gray-600">Loading...</p>;
  if (error)
    return (
      <p className="text-red-600 font-semibold text-center">Error: {error}</p>
    );

  return (
    <Layout>
      <div className="max-w-6xl px-6 py-10">
        <h2 className="text-4xl font-bold mb-10 text-center text-blue-900">
          Questions Overview
        </h2>

        {Array.isArray(questions) && questions.length > 0 ? (
          questions.map((question) => (
            <div
              key={question._id}
              className="bg-white border-l-4 border-blue-500 shadow-md rounded-2xl p-6 mb-8 transition-all hover:shadow-lg"
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-semibold text-gray-800">
                  {question.question}
                </h3>
                <div className="flex gap-2">
                  <button
                    title="Edit"
                    className="p-2 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-full transition"
                  >
                    <Pencil size={16} />
                  </button>
                  <button
                    title="Delete"
                    className="p-2 bg-red-100 hover:bg-red-200 text-red-700 rounded-full transition"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>

              {question.question_type === "mcq" &&
                question.options?.length > 0 && (
                  <div className="mb-4 mt-2">
                    <ul className="space-y-2">
                      {question.options.map((opt, i) => (
                        <li
                          key={i}
                          className={`flex items-center gap-2 px-4 py-2 rounded-lg border ${
                            opt.is_correct
                              ? "bg-green-50 border-green-600 text-green-800 font-semibold"
                              : "bg-gray-50 border-gray-300"
                          }`}
                        >
                          {opt.is_correct && (
                            <CheckCircle size={18} className="text-green-600" />
                          )}
                          {opt.text}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

              {question.rational_text && (
                <div className="mt-4 p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded-md text-yellow-900 text-sm shadow-sm">
                  <strong className="block mb-1 text-yellow-700">
                    Rationale:
                  </strong>
                  <p className="italic">{question.rational_text}</p>
                </div>
              )}

              <div className="flex flex-wrap gap-2 text-sm mt-4">
                {question.question_type && (
                  <span className="inline-block px-3 py-1 bg-purple-100 text-purple-800 rounded-full">
                    {question.question_type}
                  </span>
                )}
                {"q_value" in question && (
                  <span className="inline-block px-3 py-1 bg-orange-100 text-orange-800 rounded-full">
                    Points: {question.q_value}
                  </span>
                )}
                {question.difficulty && (
                  <span className="inline-block px-3 py-1 bg-green-100 text-green-800 rounded-full capitalize">
                    {question.difficulty}
                  </span>
                )}
                {question.blooms_taxonomy && (
                  <span className="inline-block px-3 py-1 bg-pink-100 text-pink-800 rounded-full capitalize">
                    {question.blooms_taxonomy}
                  </span>
                )}
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No questions found.</p>
        )}
      </div>
    </Layout>
  );
}
