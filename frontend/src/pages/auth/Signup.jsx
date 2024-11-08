import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const Signup = () => {
  const [formData, setFormData] = useState({
    fullname: "",
    username: "",
    email: "",
    password: "",
  });
  const { signup } = useAuth();

  const navigate = useNavigate();

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      navigate("/");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    signup.mutate(formData);
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <>
      <div
        className="flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[100%] max-h-full backdrop-blur-sm"
        onClick={handleOverlayClick}
      >
        <div className="relative p-4 w-full max-w-md max-h-full">
          <div className="w-full max-w-sm p-6 m-auto mx-auto bg-white rounded-lg shadow-md dark:bg-neutral-800">
            <h1 className="mt-1 text-xl text-center text-gray-500 dark:text-gray-400">
              create your account
            </h1>
            <p className=" text-sm text-center text-gray-500 dark:text-gray-400">
              Explore the world of blogs
            </p>

            <form className="mt-6" onSubmit={handleSubmit}>
              <div className="flex flex-row gap-1">
                <div>
                  <label
                    htmlFor="username"
                    className="block text-sm text-gray-800 dark:text-gray-200"
                  >
                    Username
                  </label>
                  <input
                    type="text"
                    className="block w-full px-4 py-2 mt-2 text-gray-700 bg-transparent border rounded-lg dark:bg-neutral-700 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                    name="username"
                    placeholder="Username"
                    onChange={handleInputChange}
                    value={formData.username}
                  />
                </div>
                <div>
                  <label
                    htmlFor="username"
                    className="block text-sm text-gray-800 dark:text-gray-200"
                  >
                    Fullname
                  </label>
                  <input
                    type="text"
                    className="block w-full px-4 py-2 mt-2 text-gray-700 bg-transparent border rounded-lg dark:bg-neutral-700 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                    name="fullname"
                    placeholder="Fullname"
                    onChange={handleInputChange}
                    value={formData.fullname}
                  />
                </div>
              </div>

              <div className="mt-4">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm text-gray-800 dark:text-gray-200"
                  >
                    Email
                  </label>
                </div>

                <input
                  type="email"
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-transparent border rounded-lg dark:bg-neutral-700 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                  name="email"
                  placeholder="Email"
                  onChange={handleInputChange}
                  value={formData.email}
                />
              </div>
              <div className="mt-4">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm text-gray-800 dark:text-gray-200"
                  >
                    Password
                  </label>
                </div>

                <input
                  type="password"
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg dark:bg-neutral-700 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                  name="password"
                  placeholder="Password"
                  onChange={handleInputChange}
                  value={formData.password}
                />
              </div>

              <div className="mt-6">
                <button
                  className="w-full px-6 py-2.5 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-800 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50"
                  type="submit"
                >
                  {signup.isPending ? "Loading..." : "Signup"}
                </button>
              </div>
              {signup.isError && (
                <p className="text-red-500 font-bold text-[12px] text-center mt-2">
                  {signup.error.message}
                </p>
              )}
            </form>

            <p className="mt-8 text-xs font-light text-center text-gray-400">
              {" "}
              have an account?{" "}
              <button
                className="font-medium text-gray-700 dark:text-gray-200 hover:underline"
                onClick={() => {
                  navigate("/login");
                }}
              >
                Sign In
              </button>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
