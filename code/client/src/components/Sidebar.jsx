import { Home, Settings, Book, BookOpenCheck, Users } from "lucide-react";
import SidebarItem from "./SidebarItem";
import Button from "./Button";
import { config } from "../utils/config";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

export default function Sidebar() {
  const { user, logout } = useContext(AuthContext);
  const name = user?.username;
  const role = user?.role;
  const isAdmin = role === "admin";

  const navigate = useNavigate();

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
        logout();
        navigate("/");
      })
      .catch((error) => {
        console.error("Logout failed: ", error.response);
        logout();
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
          {isAdmin && (
            <>
              <SidebarItem
                icon={Home}
                label="Dashboard"
                to="/admin/dashboard"
              />
              <SidebarItem
                icon={BookOpenCheck}
                label="Questions"
                to="/admin/questions"
              />
              <SidebarItem
                icon={Book}
                label="Resources"
                to="/admin/resources"
              />
              <SidebarItem
                icon={Users}
                label="Manage Users"
                to="/admin/users"
              />
              {/* <SidebarItem icon={Settings} label="Settings" to="/settings" /> */}
            </>
          )}

          {!isAdmin && (
            <>
              <SidebarItem icon={Home} label="Dashboard" to="/dashboard" />
              <SidebarItem icon={BookOpenCheck} label="Report" to="/report" />
            </>
          )}
        </nav>
      </div>

      <div className="text-sm text-white w-full">
        <div className="flex flex-col items-center">
          <p>{name}</p>
          <p className="text-xs text-blue-200">{role}</p>
        </div>
        <Button onClick={handleLogout} color="white">
          Logout
        </Button>
      </div>
    </aside>
  );
}
