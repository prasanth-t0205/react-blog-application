import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { TiWeatherSunny } from "react-icons/ti";
import { MdOutlineDarkMode } from "react-icons/md";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoIosLogIn, IoIosSearch } from "react-icons/io";
import Search from "../pages/Search";
import Signup from "../pages/auth/Signup";
import LoginPage from "../pages/auth/LoginPage";

const TopnavBar = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedMode = localStorage.getItem("darkMode");
    return savedMode ? JSON.parse(savedMode) : false;
  });

  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    localStorage.setItem("darkMode", JSON.stringify(newMode));
    document.documentElement.classList.toggle("dark", newMode);
  };

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDarkMode);
  }, []);

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.ctrlKey && event.key === "k" && !showSearch) {
        setShowSearch(true);
      }
    };

    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [showSearch, setShowSearch]);

  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  const handleLoginClick = () => {
    setShowLogin(true);
    setShowSignup(false);
  };

  const handleSignupClick = () => {
    setShowSignup(true);
    setShowLogin(false);
  };

  const authuser = true;

  return (
    <>
      <nav className="dark:bg-[#212121] bg-white sticky top-0 z-50 border-y border-gray-900">
        <div className="mx-auto max-w-8xl px-2 sm:px-6 lg:px-8">
          <div className="relative flex h-16 items-center justify-between">
            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
              <button
                type="button"
                className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                aria-controls="mobile-menu"
                aria-expanded={isMobileMenuOpen}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                <span className="absolute -inset-0.5"></span>
                <span className="sr-only">Open main menu</span>

                <GiHamburgerMenu size={25} />
              </button>
            </div>
            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
              <div className="flex flex-shrink-0 items-center">
                <Link to={"/"}>
                  <h1 className="h-8 w-auto text-2xl dark:text-white text-black font-bold">
                    Blog
                  </h1>
                </Link>
              </div>
            </div>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              <button
                className="relative rounded-full hover:text-gray-500 dark:text-gray-400 text-black dark:hover:text-white "
                onClick={() => setShowSearch(!showSearch)}
              >
                <span className="sr-only">Search</span>
                <IoIosSearch size={24} />
              </button>
              <button
                onClick={toggleDarkMode}
                className="relative rounded-full hover:text-gray-500 dark:text-gray-400 text-black dark:hover:text-white  "
              >
                <span className="sr-only">Toggle dark mode</span>
                {isDarkMode ? (
                  <TiWeatherSunny size={25} />
                ) : (
                  <MdOutlineDarkMode size={25} />
                )}
              </button>

              {authuser ? (
                <div className="relative ml-3">
                  <div>
                    <button
                      type="button"
                      className="relative flex rounded-full hover:text-gray-500 dark:text-gray-400 text-black dark:hover:text-white  text-sm "
                      aria-expanded={isDropdownOpen}
                      aria-haspopup="true"
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    >
                      <span className="absolute -inset-1.5"></span>
                      <span className="sr-only">Open user menu</span>
                      <img
                        className="h-8 w-8 rounded-full"
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                        alt="profile"
                      />
                    </button>
                  </div>

                  {isDropdownOpen && (
                    <div className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <Link
                        to={"/profile"}
                        className="block px-4 py-2 text-sm text-gray-700"
                      >
                        Your Profile
                      </Link>
                      <Link
                        to={"/createpost"}
                        className="block px-4 py-2 text-sm text-gray-700"
                      >
                        Create Post
                      </Link>
                      <button className="block px-4 py-2 text-sm text-gray-700">
                        Sign out
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  className="relative rounded-full hover:text-gray-500 dark:text-gray-400 text-black dark:hover:text-white "
                  onClick={handleLoginClick}
                >
                  <span className="sr-only">Login</span>
                  <IoIosLogIn size={25} />
                </button>
              )}
            </div>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="sm:hidden" id="mobile-menu">
            <div className="space-y-1 px-2 pb-3 pt-2">
              <Link
                className="block rounded-md  px-3 py-2 text-base font-medium hover:text-gray-500 dark:text-gray-400 text-black dark:hover:text-white "
                aria-current="page"
              >
                Explore
              </Link>
              <Link className="block rounded-md px-3 py-2 text-base font-medium hover:text-gray-500 dark:text-gray-400 text-black dark:hover:text-white ">
                Software dev
              </Link>
              <Link className="block rounded-md px-3 py-2 text-base font-medium hover:text-gray-500 dark:text-gray-400 text-black dark:hover:text-white ">
                Cloud
              </Link>
              <Link className="block rounded-md px-3 py-2 text-base font-medium hover:text-gray-500 dark:text-gray-400 text-black dark:hover:text-white ">
                IT Ops
              </Link>
              <Link className="block rounded-md px-3 py-2 text-base font-medium hover:text-gray-500 dark:text-gray-400 text-black dark:hover:text-white ">
                Data
              </Link>
            </div>
          </div>
        )}

        <hr className="h-px my-2 dark:bg-gray-200 border-0 bg-gray-400 max-w-[95%] mx-auto hidden md:block" />

        <div className="hidden sm:ml-6 sm:block">
          <div className="flex flex-row gap-7">
            <Link
              className="rounded-md px-3 mb-2 text-[13px] font-bold hover:text-gray-500 dark:text-gray-400 text-black dark:hover:text-white "
              aria-current="page"
            >
              Explore
            </Link>
            <Link className="rounded-md px-3 mb-2 text-[13px] font-bold hover:text-gray-500 dark:text-gray-400 text-black dark:hover:text-white ">
              Software dev
            </Link>
            <Link className="rounded-md px-3 mb-2 text-[13px] font-bold hover:text-gray-500 dark:text-gray-400 text-black dark:hover:text-white ">
              Cloud
            </Link>
            <Link className="rounded-md px-3 mb-2 text-[13px] font-bold hover:text-gray-500 dark:text-gray-400 text-black dark:hover:text-white ">
              IT Ops
            </Link>
            <Link className="rounded-md px-3 mb-2 text-[13px] font-bold hover:text-gray-500 dark:text-gray-400 text-black dark:hover:text-white ">
              Data
            </Link>
          </div>
        </div>
      </nav>
      <Search show={showSearch} setShow={setShowSearch} />
      {showLogin && (
        <LoginPage
          setShowLogin={setShowLogin}
          handleSignupClick={handleSignupClick}
        />
      )}
      {showSignup && (
        <Signup
          setShowSignup={setShowSignup}
          handleLoginClick={handleLoginClick}
        />
      )}
    </>
  );
};

export default TopnavBar;
