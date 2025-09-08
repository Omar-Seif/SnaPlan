import { useState, useContext } from "react";
import {
  Calendar,
  Building,
  BarChart3,
  Settings,
  Menu,
  X,
  LogOut,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import AdminAccount from "./SidebarAccountTab";
import { AuthContext } from "../../Auth/Authentication"; // adjust path

function SideBar() {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const navigate = useNavigate();
  const { logout, user } = useContext(AuthContext);

  function goToEventManager() {
    navigate("/admin/events");
  }

  function goToOverview() {
    navigate("/admin/home");
  }

  function goToOrganizers() {
    navigate("/admin/organizers");
  }

  function goToSettings() {
    navigate("/admin/settings");
  }

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const handleLogout = () => {
    logout();
    navigate("/admin/Login");
  };

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={toggleSidebar}
        className={`fixed z-50 p-2 rounded-full bg-gradient-to-br from-zinc-900 to-black text-white transition-all duration-300 shadow-lg hover:from-zinc-800 hover:to-zinc-900 ${
          isCollapsed ? "top-4 left-4" : "top-4 left-52"
        }`}
      >
        {isCollapsed ? <Menu className="w-4 h-4" /> : <X className="w-4 h-4" />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full bg-gradient-to-b from-zinc-950 via-black to-zinc-950 text-white flex-shrink-0 transition-all duration-300 z-40 shadow-2xl border-r border-zinc-800 ${
          isCollapsed ? "w-0 opacity-0 overflow-hidden" : "w-48 opacity-100"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-4 border-b border-zinc-800">
            <div className="flex items-center">
              <span className="text-lg font-light">Snap</span>
              <span className="text-lg font-light">Plan</span>
              <span className="text-red-600 font-bold text-sm ml-1">Admin</span>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-1">
            <div
              onClick={goToOverview}
              className="hover:bg-gradient-to-r hover:from-zinc-900 hover:to-zinc-800 cursor-pointer flex items-center space-x-3 rounded-lg px-3 py-2.5 transition-all duration-200 group"
            >
              <BarChart3 className="w-4 h-4 group-hover:text-red-400" />
              <span className="text-sm font-medium">Overview</span>
            </div>

            <div
              onClick={goToEventManager}
              className="flex items-center space-x-3 px-3 py-2.5 hover:bg-gradient-to-r hover:from-zinc-900 hover:to-zinc-800 rounded-lg cursor-pointer transition-all duration-200 group"
            >
              <Calendar className="w-4 h-4 group-hover:text-red-400" />
              <span className="text-sm font-medium">Events</span>
            </div>

            <div
              onClick={goToOrganizers}
              className="flex items-center space-x-3 px-3 py-2.5 hover:bg-gradient-to-r hover:from-zinc-900 hover:to-zinc-800 rounded-lg cursor-pointer transition-all duration-200 group"
            >
              <Building className="w-4 h-4 group-hover:text-red-400" />
              <span className="text-sm font-medium">Organizers</span>
            </div>

            <div
              onClick={goToSettings}
              className="flex items-center space-x-3 px-3 py-2.5 hover:bg-gradient-to-r hover:from-zinc-900 hover:to-zinc-800 rounded-lg cursor-pointer transition-all duration-200 group"
            >
              <Settings className="w-4 h-4 group-hover:text-red-400" />
              <span className="text-sm font-medium">Settings</span>
            </div>
          </nav>

          {/* Admin Account Section */}
          <div className="relative border-t border-gray-700 p-3 flex flex-col items-center justify-between">
            <div className="flex flex-col gap-1">
              <span className="text-sm font-medium">
                {user ? `${user.firstName} ${user.lastName}` : "Guest"}
              </span>
              <span className="text-xs text-gray-300">{user?.email}</span>
            </div>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1 px-3 py-1.5 bg-red-400 text-white rounded-lg text-sm font-medium hover:bg-red-500 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {!isCollapsed && (
        <div
          className="fixed inset-0 bg-opacity-50 z-30 md:hidden"
          onClick={toggleSidebar}
        />
      )}
    </>
  );
}

export default SideBar;
