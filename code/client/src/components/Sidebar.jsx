import {
  Home,
  Settings,
  Book,
  BookOpenCheck,
  LogOut,
  Users,
  ShieldCheck,
} from "lucide-react";
import SidebarItem from "./SidebarItem";
import { useState } from "react";

export default function Sidebar() {
  const [user, setUser] = useState({
    // TODO: Fetch user data from API
    name: "Alex Morgan",
    role: "Administrator",
  });

  const isAdmin = user.role === "Administrator";

  return (
    <aside className="w-60 bg-[#1e244c] h-screen p-4 flex flex-col justify-between font-inter text-white">
      <div>
        <h2 className="text-xl font-semibold mb-6 tracking-wide text-blue-300">
          GDPR Guard
        </h2>

        <nav className="space-y-1">
          <SidebarItem icon={Home} label="Dashboard" to="/dashboard" />
          <SidebarItem icon={BookOpenCheck} label="Questions" to="/questions" />
          <SidebarItem icon={Book} label="Resources" to="/resources" />

          {isAdmin && (
            <>
              <SidebarItem
                icon={Users}
                label="Manage Users"
                to="/admin/users"
              />
            </>
          )}

          {!isAdmin && (
            <>
              <SidebarItem
                icon={ShieldCheck}
                label="My Reports"
                to="/user/reports"
              />
            </>
          )}

          <SidebarItem icon={Settings} label="Settings" to="/settings" />
        </nav>
      </div>

      <div className="text-sm text-white">
        <div className="mb-2">
          <p>{user.name}</p>
          <p className="text-xs text-blue-200">{user.role}</p>
        </div>
        <SidebarItem icon={LogOut} label="Logout" to="/logout" />
      </div>
    </aside>
  );
}
