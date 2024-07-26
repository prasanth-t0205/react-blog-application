import { Route, Routes } from "react-router-dom";
import Layout from "./layout/Layout";
import HomePage from "./pages/HomePage";
import CreatePost from "./pages/CreatePost/CreatePost";
import PageNotFound from "./pages/PageNotFound";
import BlogPage from "./pages/BlogPage";
import EditPost from "./pages/EditPost";
import ProfilePage from "./pages/ProfilePage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="/createpost" element={<CreatePost />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/editpost/" element={<EditPost />} />
          <Route path="/blog/" element={<BlogPage />} />
          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
