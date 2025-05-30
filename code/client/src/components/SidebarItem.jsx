import { Link } from "react-router-dom";

export default function SidebarItem({ icon: Icon, label, to }) {
  return (
    <Link to={to}>
      <div className="w-full flex items-center space-x-2 text-white px-3 py-3 mb-4 rounded-3xl hover:bg-blue-900 hover:text-white cursor-pointer transition">
        <Icon size={16} />
        <span>{label}</span>
      </div>
    </Link>
  );
}
