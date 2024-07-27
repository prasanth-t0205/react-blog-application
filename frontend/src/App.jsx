import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./layout/Layout";
import HomePage from "./pages/HomePage";
import CreatePost from "./pages/CreatePost/CreatePost";
import PageNotFound from "./pages/PageNotFound";
import BlogPage from "./pages/BlogPage";
import EditPost from "./pages/EditPost";
import ProfilePage from "./pages/ProfilePage";
import { useQuery } from "@tanstack/react-query";
import LoginPage from "./pages/auth/LoginPage";
import Signup from "./pages/auth/Signup";
import { AiOutlineLoading } from "react-icons/ai";

function App() {
  const { data: authUser, isLoading } = useQuery({
    queryKey: ["authUser"], // this key will be used in the query cache and dont need to writ the below code every single time we want to access the auth user
    queryFn: async () => {
      try {
        const res = await fetch("/api/auth/me");
        const data = await res.json();
        if (data.error) return null;
        if (!res.ok) throw new Error(data.error || "Something went wrong!");
        return data;
      } catch (error) {
        throw new Error(error);
      }
    },
    retry: false,
  });

  if (isLoading)
    return (
      <div className="fixed inset-0 flex items-center justify-center dark:bg-[#212121] bg-opacity-75">
        <div role="status">
          <AiOutlineLoading className="animate-spin h-16 w-16 text-white" />
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route
            path="/createpost"
            element={authUser ? <CreatePost /> : <Navigate to="/login" />}
          />
          <Route
            path="/profile/:username"
            element={authUser ? <ProfilePage /> : <Navigate to="/login" />}
          />
          <Route
            path="/login"
            element={!authUser ? <LoginPage /> : <Navigate to="/" />}
          />
          <Route
            path="/signup"
            element={!authUser ? <Signup /> : <Navigate to="/" />}
          />
          <Route
            path="/editpost"
            element={authUser ? <EditPost /> : <Navigate to="/login" />}
          />
          <Route path="/blog/" element={<BlogPage />} />
          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
