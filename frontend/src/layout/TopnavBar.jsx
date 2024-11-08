import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import {
  Search,
  Sun,
  Moon,
  Bell,
  LogIn,
  Menu,
  Home,
  Compass,
  Users,
  MessageCircle,
  PenSquare,
  X,
  UserCircle,
  LogOut,
} from "lucide-react";
import SearchModal from "../pages/Search";
import userImage from "../assets/user.png";
import { useAuth } from "../hooks/useAuth";
import { useTheme } from "../context/ThemeContext";

const TopnavBar = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { isDarkMode, toggleDarkMode } = useTheme();
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isDropdownOpen && !event.target.closest(".dropdown-container")) {
        setIsDropdownOpen(false);
      }
      if (isMobileMenuOpen && !event.target.closest(".mobile-menu")) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isDropdownOpen, isMobileMenuOpen]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleKeyPress = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setShowSearch((prev) => !prev);
      }
    };
    document.addEventListener("keydown", handleKeyPress);
    return () => document.removeEventListener("keydown", handleKeyPress);
  }, []);

  const { data: authUser } = useQuery({ queryKey: ["authUser"] });
  const { data: posts } = useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const res = await fetch("/api/posts");
      if (!res.ok) throw new Error("Failed to fetch posts");
      return res.json();
    },
  });

  const { data: notifications } = useQuery({
    queryKey: ["notifications"],
    queryFn: async () => {
      const res = await fetch("/api/notifications");
      const data = await res.json();
      if (!res.ok) throw new Error("Failed to fetch notifications");
      return data;
    },
  });

  return (
    <nav
      className={`fixed w-full top-0 z-50 transition-all duration-300 
      ${scrolled ? "bg-white/80 backdrop-blur-xl shadow-lg" : "bg-white"} 
      dark:bg-neutral-900/95 border-b dark:border-gray-800`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200"
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>

            <Link to="/" className="flex items-center space-x-3 ml-2 md:ml-0">
              <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-violet-500 bg-clip-text text-transparent">
                Blog
              </span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <NavLink to="/explore" icon={<Compass className="w-4 h-4" />}>
              Explore
            </NavLink>

            <NavLink to="/about" icon={<Users className="w-4 h-4" />}>
              About
            </NavLink>
            <NavLink to="/contact" icon={<MessageCircle className="w-4 h-4" />}>
              Contact
            </NavLink>
          </div>

          <div className="flex items-center space-x-4">
            <ActionButton
              icon={<Search className="w-5 h-5" />}
              onClick={() => setShowSearch(true)}
              tooltip="Search (⌘K)"
            />

            {authUser && (
              <Link to="/notifications">
                <ActionButton
                  icon={<Bell className="w-5 h-5" />}
                  tooltip="Notifications"
                  badge={notifications?.length || "0"}
                />
              </Link>
            )}

            <ActionButton
              icon={
                isDarkMode ? (
                  <Sun className="w-5 h-5" />
                ) : (
                  <Moon className="w-5 h-5" />
                )
              }
              onClick={toggleDarkMode}
              tooltip="Toggle theme"
            />

            {authUser ? (
              <div className="relative group dropdown-container">
                <div
                  className="flex items-center space-x-1 cursor-pointer"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                  <img
                    src={authUser?.profileImg || userImage}
                    alt="Profile"
                    className="w-8 h-8 rounded-full object-cover ring-2 ring-indigo-500/20"
                  />
                </div>

                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-neutral-900 rounded-xl shadow-lg py-2 ring-1 ring-black/5 dark:ring-white/10">
                    <DropdownLink
                      to={`/profile/${authUser?.username}`}
                      icon={<UserCircle />}
                    >
                      Profile
                    </DropdownLink>
                    <DropdownLink to="/create" icon={<PenSquare />}>
                      Create Post
                    </DropdownLink>
                    <hr className="my-2 border-gray-100 dark:border-gray-700" />
                    <button
                      onClick={() => logout.mutate()}
                      className="w-full flex items-center space-x-2 px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Sign out</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <ActionButton
                icon={<LogIn className="w-5 h-5" />}
                onClick={() => navigate("/login")}
                tooltip="Login"
              />
            )}
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-50 md:hidden mobile-menu"
          aria-modal="true"
        >
          <div
            className="fixed inset-0 bg-neutral-800/50 backdrop-blur-sm"
            onClick={() => setIsMobileMenuOpen(false)}
          />

          <div
            className={`fixed inset-y-0 left-0 w-64 bg-white dark:bg-neutral-900 transform transition-transform duration-300 ease-in-out
      ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}`}
          >
            <div className="flex items-center justify-between p-4 border-b dark:border-gray-800">
              <Link
                to="/"
                className="flex items-center space-x-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-violet-500 bg-clip-text text-transparent">
                  Blog
                </span>
              </Link>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="px-2 py-4 space-y-1">
              <MobileNavLink
                to="/explore"
                icon={<Compass className="w-5 h-5" />}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Explore
              </MobileNavLink>
              <MobileNavLink
                to="/about"
                icon={<Users className="w-5 h-5" />}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About
              </MobileNavLink>
              <MobileNavLink
                to="/contact"
                icon={<MessageCircle className="w-5 h-5" />}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contact
              </MobileNavLink>
            </div>
          </div>
        </div>
      )}

      {showSearch && (
        <SearchModal
          show={showSearch}
          setShow={setShowSearch}
          posts={posts || []}
        />
      )}
    </nav>
  );
};

const NavLink = ({ to, children, icon }) => (
  <Link
    to={to}
    className="flex items-center space-x-2 text-gray-700 hover:text-indigo-600 dark:text-gray-300 
    dark:hover:text-indigo-400 transition-colors duration-200 text-sm font-medium"
  >
    {icon}
    <span>{children}</span>
  </Link>
);

const MobileNavLink = ({ to, children, icon, onClick }) => (
  <Link
    to={to}
    onClick={onClick}
    className="flex items-center space-x-3 w-full px-4 py-3 text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50 rounded-lg dark:text-gray-300 dark:hover:text-indigo-400 dark:hover:bg-gray-800/50 transition-colors duration-200"
  >
    {icon}
    <span>{children}</span>
  </Link>
);

const ActionButton = ({ icon, onClick, tooltip, badge }) => (
  <button
    className="relative p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 
    transition-all duration-200 group"
    onClick={onClick}
  >
    {icon}
    {badge && (
      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
        {badge}
      </span>
    )}
    <span
      className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 
    bg-gray-800 text-white px-3 py-1.5 rounded-lg text-sm opacity-0 group-hover:opacity-100 
    transition-opacity duration-200 whitespace-nowrap pointer-events-none"
    >
      {tooltip}
    </span>
  </button>
);

const DropdownLink = ({ to, children, icon }) => (
  <Link
    to={to}
    className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-200 
    hover:bg-gray-100 dark:hover:bg-gray-700/50"
  >
    {icon}
    <span>{children}</span>
  </Link>
);

export default TopnavBar;
