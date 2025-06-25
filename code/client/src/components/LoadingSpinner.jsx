export default function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center py-10">
      <div
        className="w-12 h-12 border-4 border-blue-500 border-dashed rounded-full animate-spin"
        role="status"
        aria-label="Loading"
      >
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
}
