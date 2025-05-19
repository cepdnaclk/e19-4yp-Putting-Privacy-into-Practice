export default function Button({ label, onClick }) {
  return (
    <button
      type="submit"
      className="w-full bg-blue-600 text-white py-2 rounded font-semibold hover:bg-blue-700 transition"
      onClick={onClick}
    >
      {label}
    </button>
  );
}
