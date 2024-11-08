import { useQuery } from "@tanstack/react-query";
import BlogPosts from "./blog_posts/BlogPosts";
import LoadingSpinner from "./LoadingSpinner";

const Posts = ({ feedType, username }) => {
  const { data: posts, isLoading } = useQuery({
    queryKey: ["posts", feedType, username],
    queryFn: async () => {
      let url;
      if (feedType === "myPosts") {
        url = `/api/posts/user/${username}`;
      } else if (feedType === "following") {
        url = `/api/posts/following/${username}`;
      } else {
        url = "/api/posts/";
      }
      const res = await fetch(url);
      if (!res.ok) throw new Error("Failed to fetch posts");
      return res.json();
    },
  });

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="max-w-7xl mx-auto px-4">
      {posts?.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <BlogPosts key={post._id} post={post} />
          ))}
        </div>
      ) : (
        <div className="text-center py-10 text-gray-500">No posts found</div>
      )}
    </div>
  );
};

export default Posts;
