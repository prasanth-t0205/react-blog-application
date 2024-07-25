import { FaGoogle } from "react-icons/fa";
import { Link } from "react-router-dom";
import { RiInstagramFill } from "react-icons/ri";

const LoginPage = ({ setShowLogin, handleSignupClick }) => {
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      setShowLogin(false);
    }
  };
  return (
    <>
      {setShowLogin ? (
        <div
          className="flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full backdrop-blur-sm"
          onClick={handleOverlayClick}
        >
          <div className="relative p-4 w-full max-w-md max-h-full">
            <div class="w-full max-w-sm p-6 m-auto mx-auto bg-white rounded-lg shadow-md dark:bg-gray-800">
              <div class="flex justify-center mx-auto">
                <h1 className=" font-bold text-xl">Blog</h1>
              </div>
              <h3 class="mt-3 text-xl font-medium text-center text-gray-600 dark:text-gray-200">
                Welcome Back
              </h3>

              <p class="mt-1 text-center text-gray-500 dark:text-gray-400">
                Login or create account
              </p>

              <form class="mt-6">
                <div>
                  <label
                    for="username"
                    class="block text-sm text-gray-800 dark:text-gray-200"
                  >
                    Username
                  </label>
                  <input
                    type="text"
                    class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                  />
                </div>

                <div class="mt-4">
                  <div class="flex items-center justify-between">
                    <label
                      for="password"
                      class="block text-sm text-gray-800 dark:text-gray-200"
                    >
                      Password
                    </label>
                    <a
                      href="#"
                      class="text-xs text-gray-600 dark:text-gray-400 hover:underline"
                    >
                      Forget Password?
                    </a>
                  </div>

                  <input
                    type="password"
                    class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                  />
                </div>

                <div class="mt-6">
                  <button class="w-full px-6 py-2.5 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-gray-800 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50">
                    Sign In
                  </button>
                </div>
              </form>

              <div class="flex items-center justify-between mt-4">
                <span class="w-1/5 border-b dark:border-gray-600 lg:w-1/5"></span>

                <a
                  href="#"
                  class="text-xs text-center text-gray-500 uppercase dark:text-gray-400 hover:underline"
                >
                  or login with Social Media
                </a>

                <span class="w-1/5 border-b dark:border-gray-400 lg:w-1/5"></span>
              </div>

              <div class="flex items-center mt-6 -mx-2">
                <button
                  type="button"
                  class="flex items-center justify-center w-full px-6 py-2 mx-2 text-sm font-medium text-white transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:bg-blue-400 focus:outline-none"
                >
                  <FaGoogle size={25} />

                  <span class="hidden mx-2 sm:inline">Sign in with Google</span>
                </button>

                <Link
                  to={"/"}
                  class="p-2 mx-2 text-sm font-medium text-gray-500 transition-colors duration-300 transform bg-gray-300 rounded-lg hover:bg-gray-200"
                >
                  <RiInstagramFill size={25} />
                </Link>
              </div>

              <p class="mt-8 text-xs font-light text-center text-gray-400">
                {" "}
                Don't have an account?{" "}
                <button
                  class="font-medium text-gray-700 dark:text-gray-200 hover:underline"
                  onClick={() => {
                    setShowLogin(false);
                    handleSignupClick();
                  }}
                >
                  Create One
                </button>
              </p>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default LoginPage;
