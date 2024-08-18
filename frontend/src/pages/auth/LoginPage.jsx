import { FaGoogle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { RiInstagramFill } from "react-icons/ri";
import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const { login } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    login.mutate({ username: formData.username, password: formData.password });
  };
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const navigate = useNavigate();

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      navigate("/");
    }
  };
  return (
    <>
      <div
        className="flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[100%] max-h-full backdrop-blur-sm"
        onClick={handleOverlayClick}
      >
        <div className="relative p-4 w-full max-w-md max-h-full">
          <div className="w-full max-w-sm p-6 m-auto mx-auto bg-white rounded-lg shadow-md dark:bg-gray-800">
            <div className="flex justify-center mx-auto">
              <h1 className=" font-bold text-xl">Blog</h1>
            </div>
            <h3 className="mt-3 text-xl font-medium text-center text-gray-600 dark:text-gray-200">
              Welcome Back
            </h3>

            <p className="mt-1 text-center text-gray-500 dark:text-gray-400">
              Login or create account
            </p>

            <form className="mt-6" onSubmit={handleSubmit}>
              <div>
                <label
                  for="username"
                  className="block text-sm text-gray-800 dark:text-gray-200"
                >
                  Username
                </label>
                <input
                  type="text"
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                  name="username"
                  placeholder="Username"
                  onChange={handleInputChange}
                  value={formData.username}
                />
              </div>

              <div className="mt-4">
                <div className="flex items-center justify-between">
                  <label
                    for="password"
                    className="block text-sm text-gray-800 dark:text-gray-200"
                  >
                    Password
                  </label>
                  <a
                    href="#"
                    className="text-xs text-gray-600 dark:text-gray-400 hover:underline"
                  >
                    Forget Password?
                  </a>
                </div>

                <input
                  type="password"
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                  name="password"
                  placeholder="password"
                  onChange={handleInputChange}
                  value={formData.password}
                />
              </div>

              <div className="mt-6">
                <button className="w-full px-6 py-2.5 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-gray-800 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50">
                  {login.isPending ? "Loading..." : "Sign In"}
                </button>
                {login.isError && (
                  <div className="text-red-500 text-[12px] text-center mt-2 font-bold">
                    {login.error.message}
                  </div>
                )}
              </div>
            </form>

            <div className="flex items-center justify-between mt-4">
              <span className="w-1/5 border-b dark:border-gray-600 lg:w-1/5"></span>

              <a
                href="#"
                className="text-xs text-center text-gray-500 uppercase dark:text-gray-400 hover:underline"
              >
                or login with Social Media
              </a>

              <span className="w-1/5 border-b dark:border-gray-400 lg:w-1/5"></span>
            </div>

            <div className="flex items-center mt-6 -mx-2">
              <button
                type="button"
                className="flex items-center justify-center w-full px-6 py-2 mx-2 text-sm font-medium text-white transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:bg-blue-400 focus:outline-none"
              >
                <FaGoogle size={25} />

                <span className="hidden mx-2 sm:inline">
                  Sign in with Google
                </span>
              </button>

              <Link
                to={"/"}
                className="p-2 mx-2 text-sm font-medium text-gray-500 transition-colors duration-300 transform bg-gray-300 rounded-lg hover:bg-gray-200"
              >
                <RiInstagramFill size={25} />
              </Link>
            </div>

            <p className="mt-8 text-xs font-light text-center text-gray-400">
              {" "}
              Don't have an account?{" "}
              <button
                className="font-medium text-gray-700 dark:text-gray-200 hover:underline"
                onClick={() => {
                  navigate("/signup");
                }}
              >
                Create One
              </button>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
