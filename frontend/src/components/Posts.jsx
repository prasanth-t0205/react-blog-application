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
      if (!res.ok) {
        throw new Error("Failed to fetch posts");
      }
      return res.json();
    },
  });

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="flex flex-col w-full">
      {posts && posts.length > 0 ? (
        <div className="flex flex-wrap -mx-2">
          {posts.map((post) => (
            <div
              key={post._id}
              className="w-full sm:w-1/2 md:w-1/2 lg:w-1/2 px-2 mb-4"
            >
              <BlogPosts post={post} />
            </div>
          ))}
        </div>
      ) : (
        <div>No posts found.</div>
      )}
    </div>
  );
};

export default Posts;
