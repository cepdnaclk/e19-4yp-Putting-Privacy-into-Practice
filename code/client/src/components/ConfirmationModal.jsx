import { X } from "lucide-react";

export default function ConfirmationModal({
  setShowModal,
  handleConfirmation,
}) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="relative bg-white rounded-lg p-6 max-w-sm w-full text-center shadow-lg">
        <button
          onClick={() => setShowModal(false)}
          className="absolute top-2 right-2 text-gray-500 hover:text-black"
        >
          <X size={24} />
        </button>

        <h2 className="text-lg font-semibold mb-4">Are you sure?</h2>
        <p className="text-sm mb-6">
          This will reset your progress permanently.
        </p>
        <div className="flex justify-center gap-4">
          <button
            onClick={() => setShowModal(false)}
            className="px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirmation}
            className="px-4 py-2 rounded-md bg-red-500 text-white hover:bg-red-600"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}
