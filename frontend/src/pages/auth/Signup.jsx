import { useState } from "react";
import { FaGoogle } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

const Signup = () => {
  const [formData, setFormData] = useState({
    fullname: "",
    username: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      navigate("/");
    }
  };

  const { mutate, isError, isPending, error } = useMutation({
    mutationFn: async ({ fullname, username, email, password }) => {
      try {
        const res = await fetch("/api/auth/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, fullname, email, password }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Something went wrong!");
        console.log(data);
        return data;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    onSuccess: () => {
      toast.success("Signup Successful");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate(formData);
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
          <div className="w-full max-w-sm p-6 m-auto mx-auto bg-white rounded-lg shadow-md dark:bg-gray-800">
            <div className="flex justify-center mx-auto">
              <h1 className=" font-bold text-xl">Blog</h1>
            </div>

            <p className="mt-1 text-center text-gray-500 dark:text-gray-400">
              create your account
            </p>

            <form className="mt-6" onSubmit={handleSubmit}>
              <div className="flex flex-row gap-1">
                <div>
                  <label
                    for="username"
                    className="block text-sm text-gray-800 dark:text-gray-200"
                  >
                    Username
                  </label>
                  <input
                    type="text"
                    className="block w-full px-4 py-2 mt-2 text-gray-700 bg-transparent border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                    name="username"
                    placeholder="Username"
                    onChange={handleInputChange}
                    value={formData.username}
                  />
                </div>
                <div>
                  <label
                    for="username"
                    className="block text-sm text-gray-800 dark:text-gray-200"
                  >
                    Fullname
                  </label>
                  <input
                    type="text"
                    className="block w-full px-4 py-2 mt-2 text-gray-700 bg-transparent border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
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
                    for="password"
                    className="block text-sm text-gray-800 dark:text-gray-200"
                  >
                    Email
                  </label>
                </div>

                <input
                  type="email"
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-transparent border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                  name="email"
                  placeholder="Email"
                  onChange={handleInputChange}
                  value={formData.email}
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
                </div>

                <input
                  type="password"
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                  name="password"
                  placeholder="Password"
                  onChange={handleInputChange}
                  value={formData.password}
                />
              </div>

              <div className="mt-6">
                <button
                  className="w-full px-6 py-2.5 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-gray-800 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50"
                  type="submit"
                >
                  {isPending ? "Loading..." : "Signup"}
                </button>
              </div>
              {isError && (
                <p className="text-red-500 font-bold text-[12px] text-center mt-2">
                  {error.message}
                </p>
              )}
            </form>

            <div className="flex items-center justify-between mt-4">
              <span className="w-1/5 border-b dark:border-gray-600 lg:w-1/5"></span>

              <Link
                to={"/"}
                className="text-xs text-center text-gray-500 uppercase dark:text-gray-400 hover:underline"
              >
                or Signup with Social Media
              </Link>

              <span className="w-1/5 border-b dark:border-gray-400 lg:w-1/5"></span>
            </div>

            <div className="flex items-center mt-6 -mx-2">
              <button
                type="button"
                className="flex items-center justify-center w-full px-6 py-2 mx-2 text-sm font-medium text-white transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:bg-blue-400 focus:outline-none"
              >
                <FaGoogle size={25} />

                <span className="hidden mx-2 sm:inline">
                  Sign up with Google
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
