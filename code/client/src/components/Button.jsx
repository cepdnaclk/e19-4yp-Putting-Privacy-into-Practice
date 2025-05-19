export default function Button({ children, onClick }) {
  return (
    <button
      type="submit"
      className="w-full bg-blue-600 text-white text-xs py-2 rounded font-semibold hover:bg-blue-700 transition mt-5 mb-5"
      onClick={onClick}
    >
      {children}
    </button>
  );
}
