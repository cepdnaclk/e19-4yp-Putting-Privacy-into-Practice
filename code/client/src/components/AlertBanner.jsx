import { X } from "lucide-react";

export default function AlertBanner({ label, type, onClose }) {
  const bgColor = type.toLowerCase() === "error" ? "bg-red-600" : "bg-blue-600";

  return (
    <div
      className={`absolute top-0 left-0 right-0 flex items-center justify-center ${bgColor} z-50 p-1`}
    >
      <p className="text-xs font-bold text-white">{label}</p>
      <X
        className="absolute right-2 w-5 h-5 cursor-pointer"
        onClick={onClose}
        color="white"
      />
    </div>
  );
}
