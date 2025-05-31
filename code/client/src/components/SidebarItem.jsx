import { NavLink } from "react-router-dom";

export default function SidebarItem({ icon: Icon, label, to }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `w-full flex items-center space-x-2 px-3 py-3 mb-4 rounded-3xl transition cursor-pointer ${
          isActive ? "bg-blue-900 text-white" : "text-white hover:bg-blue-900"
        }`
      }
    >
      <Icon size={16} />
      <span>{label}</span>
    </NavLink>
  );
}
