import { useState, useEffect, useContext } from "react";
import {
  Menu,
  X,
  User,
  LogOut,
  Home,
  Plus,
  FileText,
  CheckCircle,
  MapPin,
  UserCheck,
} from "lucide-react";
import Logo from "./logo";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../Auth/Authentication"; // adjust path

function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  // Check screen size on mount and resize
  useEffect(() => {
    const checkScreenSize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      setIsCollapsed(mobile);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const handleLogout = () => {
    logout();
    navigate("/organizer/login");
  };

  return (
    <>
      {/* Toggle Button - Only show on mobile */}
      {isMobile && (
        <button
          onClick={toggleSidebar}
          className={`fixed z-50 p-2 rounded-full bg-gradient-to-br bg-slate-900 text-white transition-all duration-300 shadow-lg hover:from-zinc-800 hover:to-zinc-900 ${
            isCollapsed ? "top-4 left-4" : "top-4 left-52"
          }`}
        >
          {isCollapsed ? <Menu className="w-4 h-4" /> : <X className="w-4 h-4" />}
        </button>
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full bg-gradient-to-b bg-gray-200 text-slate-900 flex-shrink-0 transition-all duration-300 z-40 shadow-2xl border-r border-zinc-800 ${
          isCollapsed
            ? "w-0 opacity-0 overflow-hidden md:opacity-100 md:w-48"
            : "w-48 opacity-100"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <Link to="/organizer/Home">
            <div className="p-4 border-b border-zinc-800">
              <div className="flex items-center">
                <Logo />
              </div>
            </div>
          </Link>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-1">
            {/* Home */}
            <Link to="/organizer/Home">
              <div className="hover:text-orange-400 cursor-pointer flex items-center space-x-3 rounded-lg px-3 py-2.5 transition-all duration-200 group">
                <Home className="w-4 h-4 hover:text-orange-400" />
                <span className="text-sm font-medium">Home</span>
              </div>
            </Link>

            {/* Events */}
            <div>
              <span>Events</span>
              <Link to="/organizer/CreateEvent">
                <div className="flex items-center space-x-3 px-3 py-2.5 hover:text-orange-400 rounded-lg cursor-pointer transition-all duration-200 group">
                  <Plus className="w-4 h-4 hover:text-orange-400" />
                  <span className="text-sm font-medium">Create Event</span>
                </div>
              </Link>

              <Link to="/organizer/DraftEvents">
                <div className="flex items-center space-x-3 px-3 py-2.5 hover:text-orange-400 rounded-lg cursor-pointer transition-all duration-200 group">
                  <FileText className="w-4 h-4 hover:text-orange-400" />
                  <span className="text-sm font-medium">Draft Events</span>
                </div>
              </Link>

              <Link to="/organizer/SubmittedEvents">
                <div className="flex items-center space-x-3 px-3 py-2.5 hover:text-orange-400 rounded-lg cursor-pointer transition-all duration-200 group">
                  <CheckCircle className="w-4 h-4 hover:text-orange-400" />
                  <span className="text-sm font-medium">Submitted Events</span>
                </div>
              </Link>
            </div>

            {/* Venues */}
            <div>
              <span>Venues</span>
              <Link to="/organizer/CreateVenue">
                <div className="flex items-center space-x-3 px-3 py-2.5 hover:text-orange-400 rounded-lg cursor-pointer transition-all duration-200 group">
                  <Plus className="w-4 h-4 hover:text-orange-400" />
                  <span className="text-sm font-medium">Add Venue</span>
                </div>
              </Link>

              <Link to="/organizer/Venues">
                <div className="flex items-center space-x-3 px-3 py-2.5 hover:text-orange-400 rounded-lg cursor-pointer transition-all duration-200 group">
                  <MapPin className="w-4 h-4 hover:text-orange-400" />
                  <span className="text-sm font-medium">Venues</span>
                </div>
              </Link>
            </div>

            {/* Speakers */}
            <div>
              <span>Speakers</span>
              <Link to="/organizer/CreateSpeaker">
                <div className="flex items-center space-x-3 px-3 py-2.5 hover:text-orange-400 rounded-lg cursor-pointer transition-all duration-200 group">
                  <Plus className="w-4 h-4 hover:text-orange-400" />
                  <span className="text-sm font-medium">Add Speaker</span>
                </div>
              </Link>

              <Link to="/organizer/Speakers">
                <div className="flex items-center space-x-3 px-3 py-2.5 hover:text-orange-400 rounded-lg cursor-pointer transition-all duration-200 group">
                  <UserCheck className="w-4 h-4 hover:text-orange-400" />
                  <span className="text-sm font-medium">Speakers</span>
                </div>
              </Link>
            </div>
          </nav>

          {/* Admin Account Section */}
          <div className="relative border-t border-gray-700 p-3 flex flex-col items-center justify-between">
            <div className="flex items-center gap-2">
              <User className="w-6 h-6 text-orange-600" />
              <span className="text-sm font-medium">
                {user ? `${user.firstName} ${user.lastName}` : "Guest"}
              </span>
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
      {!isCollapsed && isMobile && (
        <div
          className="fixed inset-0 bg-opacity-50 z-30 md:hidden"
          onClick={toggleSidebar}
        />
      )}
    </>
  );
}

export default Sidebar;
