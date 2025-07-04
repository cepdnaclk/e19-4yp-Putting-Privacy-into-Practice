export default function ConfirmModal({
  message,
  onConfirm,
  onCancel,
  isLoading,
}) {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 transition-opacity duration-300">
      <div className="bg-white rounded-2xl p-8 shadow-2xl w-full max-w-md md:max-w-lg text-center transform transition-transform duration-300 scale-100">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Are you sure?</h2>
        <p className="text-gray-600 mb-6">{message}</p>
        <div className="flex justify-center gap-4">
          <button
            onClick={onCancel}
            className="px-5 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 transition"
            disabled={isLoading}
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={isLoading}
            className={`px-5 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition ${
              isLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isLoading ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}
