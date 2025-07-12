import { Pencil, Trash2, ChevronDown, ChevronUp } from "lucide-react";
import useFetch from "../../hooks/useFetch";
import LoadingSpinner from "../../components/LoadingSpinner";
import { useState } from "react";
import AlertBanner from "../../components/AlertBanner";
import ConfirmModal from "../../components/ConfirmModal";
import axios from "axios";

export default function Show({ title, principle }) {
  const url = `/api/questions/${principle}`;
  const { data: questions, loading, error, refetch } = useFetch(url);
  const [expandedCards, setExpandedCards] = useState({});
  const [deleteError, setDeleteError] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const confirmDelete = (id) => {
    setDeleteTarget(id);
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await axios.delete(`/api/questions/${deleteTarget}`);
      refetch();
    } catch (err) {
      setDeleteError(
        err.response?.data?.message || "Failed to delete question"
      );
      console.error("Delete error:", err);
    } finally {
      setIsDeleting(false);
      setDeleteTarget(null);
    }
  };

  const toggleCard = (id) => {
    setExpandedCards((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-[60vh] w-full">
        <LoadingSpinner size="lg" />
      </div>
    );

  if (error) return <AlertBanner label={error} type="error" />;

  return (
    <div className="w-full px-4 sm:px-6 py-6">
      {deleteError && (
        <div className="mb-4">
          <AlertBanner
            label={deleteError}
            type="error"
            onClose={() => setDeleteError(null)}
          />
        </div>
      )}

      {Array.isArray(questions) && questions.length > 0 ? (
        <div className="space-y-6 w-full">
          <div className="mb-8 w-full">
            <p className="text-[#252d5c]">Review and manage the questions.</p>
          </div>
          {questions.map((question) => (
            <div
              key={question._id}
              className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden transition-all hover:shadow-md w-full"
            >
              <div
                className="p-6 cursor-pointer w-full"
                onClick={() => toggleCard(question._id)}
              >
                <div className="flex justify-between items-start w-full">
                  <div className="flex-1">
                    <h3 className="text-lg text-gray-800 mb-3">
                      {question.scenario}
                    </h3>
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">
                      {question.challenge}
                    </h3>
                    <div className="flex flex-wrap gap-2 mt-3">
                      {question.type && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {question.type.toUpperCase()}
                        </span>
                      )}
                      {question.complexity && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          {question.complexity}
                        </span>
                      )}
                      {question.principle && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                          {question.principle.replace(/_/g, " ")}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 ml-4">
                    <button
                      title="Edit"
                      className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-full transition"
                      onClick={(e) => {
                        e.stopPropagation();
                        // implement edit later
                      }}
                    >
                      <Pencil size={18} />
                    </button>
                    <button
                      title="Delete"
                      className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-full transition"
                      onClick={(e) => {
                        e.stopPropagation();
                        confirmDelete(question._id);
                      }}
                    >
                      <Trash2 size={18} />
                    </button>
                    <button
                      className="p-2 text-gray-500 hover:bg-gray-100 rounded-full transition"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleCard(question._id);
                      }}
                    >
                      {expandedCards[question._id] ? (
                        <ChevronUp size={20} />
                      ) : (
                        <ChevronDown size={20} />
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {expandedCards[question._id] && (
                <div className="px-6 pb-6 border-t border-gray-100 w-full">
                  {question.type === "mcq" && question.options ? (
                    <div className="mt-4">
                      <h4 className="text-sm font-medium text-gray-500 mb-3">
                        OPTIONS
                      </h4>
                      <ul className="space-y-3">
                        {Object.entries(question.options).map(
                          ([key, value]) => (
                            <li key={key} className="flex items-start">
                              <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-gray-100 text-gray-800 font-medium mr-3 mt-0.5">
                                {key}
                              </span>
                              <span className="text-gray-700">{value}</span>
                            </li>
                          )
                        )}
                      </ul>
                    </div>
                  ) : (
                    <p className="text-gray-500 text-sm italic">
                      No options provided.
                    </p>
                  )}

                  {question.correctAnswer && (
                    <div className="mt-6">
                      <h4 className="text-sm font-medium text-gray-500 mb-2">
                        CORRECT ANSWER
                      </h4>
                      <div className="bg-green-50 border border-green-100 rounded-lg p-4">
                        <p className="text-green-800 font-medium">
                          {question.correctAnswer}
                        </p>
                      </div>
                    </div>
                  )}

                  <div className="mt-6">
                    <h4 className="text-sm font-medium text-gray-500 mb-2">
                      REFLECTION
                    </h4>
                    <div className="bg-green-50 border border-green-100 rounded-lg p-4">
                      <p className="text-green-800 font-medium">
                        {question.reflection}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No questions available</p>
      )}

      {deleteTarget && (
        <ConfirmModal
          message={
            isDeleting
              ? "Deleting question, please wait..."
              : "Are you sure you want to delete this question?"
          }
          onConfirm={handleDelete}
          onCancel={() => setDeleteTarget(null)}
          isLoading={isDeleting}
        />
      )}
    </div>
  );
}
