import {
  Home,
  Settings,
  Book,
  BookOpenCheck,
  LogOut,
  Users,
  ShieldCheck,
} from "lucide-react";
import { useState } from "react";
import SidebarItem from "./SidebarItem";
import Button from "./Button";
import { config } from "../utils/config";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Sidebar() {
  const [user, setUser] = useState({
    // TODO: Fetch user data from API
    name: "Mohamed Fahman",
    role: "Administrator",
  });

  const navigate = useNavigate();

  const isAdmin = user.role === "Administrator";

  function handleLogout() {
    axios
      .post(
        `${config.serverBaseUrl}/api/auth/logout`,
        {},
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        console.log(response.data);
        navigate("/");
      })
      .catch((error) => {
        console.error("Logout failed: ", error.response);
        navigate("/");
      });
  }

  return (
    <aside className="w-60 bg-[#1e244c] h-screen p-5 flex flex-col justify-between items-center font-inter overflow-auto">
      <div>
        <h2 className="text-2xl font-semibold mt-3 mb-6 tracking-wide text-white text-center">
          GDPR Guard
        </h2>

        <nav className="space-y-1">
          <SidebarItem icon={Home} label="Dashboard" to="/admin/dashboard" />
          <SidebarItem
            icon={BookOpenCheck}
            label="Questions"
            to="/admin/questions"
          />
          <SidebarItem icon={Book} label="Resources" to="/admin/resources" />

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
        <Button onClick={handleLogout}>Logout</Button>
      </div>
    </aside>
  );
}
