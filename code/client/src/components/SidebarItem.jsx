import { Link } from "react-router-dom";

export default function SidebarItem({ icon: Icon, label, to }) {
  return (
    <Link to={to}>
      <div className="flex items-center space-x-2 text-blue-200 px-2 py-2 rounded hover:bg-blue-600 hover:text-white cursor-pointer transition">
        <Icon size={16} />
        <span>{label}</span>
      </div>
    </Link>
  );
}
