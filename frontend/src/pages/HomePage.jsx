import BlogCard from "../components/blog_posts/BlogCard";
import { Clock } from "lucide-react";
import Loading from "../components/Loading";
import { useFetch } from "../hooks/useFetch";
import { Link } from "react-router-dom";

const HomePage = () => {
  const { data: randomPosts, isLoading: randomLoading } = useFetch(
    ["randomPosts"],
    "/api/posts/random?count=3"
  );

  const { data: posts, isLoading } = useFetch(["posts"], "/api/posts/");

  if (isLoading || randomLoading) return <Loading />;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-neutral-900">
      <section className="relative bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100 dark:from-neutral-900 dark:via-blue-900/20 dark:to-violet-900/20">
        <div className="absolute inset-0 bg-white/10 dark:bg-black/40" />

        <div className="lg:hidden relative px-4 pt-[60px] pb-[40px] mx-auto">
          <div className="space-y-6 text-center">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight bg-gradient-to-r from-blue-600 to-violet-600 dark:from-blue-400 dark:to-violet-400 bg-clip-text text-transparent">
              Discover the Latest Blog Posts
            </h1>
            <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
              Join our community of writers and readers shaping the future of
              digital storytelling
            </p>
            <button
              className="bg-blue-600 text-white dark:bg-blue-500 px-8 py-3 rounded-full font-semibold 
          hover:bg-blue-700 dark:hover:bg-blue-600 transform hover:scale-105 transition-all duration-200"
            >
              Start Reading
            </button>
          </div>
          <div className="mt-8 grid grid-cols-2 gap-4">
            {randomPosts?.slice(0, 2).map((post) => (
              <div
                key={post._id}
                className="rounded-xl overflow-hidden shadow-lg relative aspect-[4/3]"
              >
                <Link to={`/blog/${post._id}`}>
                  <img
                    src={post.img}
                    alt={post.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent">
                    <h3 className="text-white font-bold text-sm md:text-base line-clamp-2">
                      {post.title}
                    </h3>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>

        <div className="hidden lg:block relative max-w-7xl mx-auto px-4 h-[80vh]">
          <div className="grid grid-cols-2 gap-12 items-center h-full">
            <div className="space-y-6">
              <h1 className="text-5xl xl:text-6xl font-bold leading-tight bg-gradient-to-r from-blue-600 to-violet-600 dark:from-blue-400 dark:to-violet-400 bg-clip-text text-transparent">
                Discover the Latest Blog Posts
              </h1>
              <p className="text-xl text-gray-700 dark:text-gray-300">
                Join our community of writers and readers shaping the future of
                digital storytelling
              </p>
              <button
                className="bg-blue-600 text-white dark:bg-blue-500 px-8 py-3 rounded-full font-semibold 
            hover:bg-blue-700 dark:hover:bg-blue-600 transform hover:scale-105 transition-all duration-200"
              >
                Start Reading
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4 h-[400px]">
              {randomPosts?.map((post, idx) => (
                <div
                  key={post._id}
                  className={`rounded-xl overflow-hidden shadow-lg transform hover:scale-105 transition-all duration-300
                ${idx === 0 ? "col-span-2 row-span-2" : ""}`}
                >
                  <Link to={`/blog/${post._id}`}>
                    <img
                      src={post.img}
                      alt={post.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                      <h3 className="text-white font-bold text-lg">
                        {post.title}
                      </h3>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="flex items-center gap-2 mb-8">
          <Clock className="w-6 h-6 text-blue-500" />
          <h2 className="text-2xl font-bold">Recent Blogs</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts?.slice(0, 6).map((post) => (
            <div
              key={post._id}
              className="transform hover:-translate-y-2 transition-all duration-300"
            >
              <BlogCard post={post} />
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white dark:bg-neutral-800/50 py-16 mt-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-2 mb-8">
            <Clock className="w-6 h-6 text-blue-500" />
            <h2 className="text-2xl font-bold">Popular This Week</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {posts?.slice(0, 4).map((post) => (
              <div
                key={post._id}
                className="bg-white dark:bg-neutral-800 rounded-xl overflow-hidden shadow-lg
                transform hover:-translate-y-2 transition-all duration-300"
              >
                <img
                  src={post.img}
                  alt={post.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <span className="text-sm text-blue-600 dark:text-blue-400 font-medium">
                    {post.category}
                  </span>
                  <h3 className="font-bold mt-2 line-clamp-2">{post.title}</h3>
                  <div className="flex items-center mt-4 space-x-2">
                    <img
                      src={post.user?.profileImg}
                      alt={post.user?.username}
                      className="w-8 h-8 rounded-full"
                    />
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {post.user?.username}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
