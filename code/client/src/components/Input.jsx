export default function Input({ label, value, onChange }) {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium mb-1">{label}</label>
      <input
        type="text"
        className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={value}
        onChange={onChange}
        required
      />
    </div>
  );
}
