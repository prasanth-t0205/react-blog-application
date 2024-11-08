import { useState } from "react";
import { useFetch } from "../hooks/useFetch";
import { Link } from "react-router-dom";

const ExplorePage = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const { data: posts, isLoading, error } = useFetch("posts", "/api/posts");

  const categories = [
    "All",
    "Technology",
    "Movies",
    "Food",
    "Business",
    "Sports",
    "Travel",
  ];

  const filteredPosts =
    activeCategory === "All"
      ? posts
      : posts?.filter((post) => post.category === activeCategory);

  return (
    <div className="pt-20 px-4 md:px-8 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Explore Posts</h1>

      <div className="flex gap-3 overflow-x-auto pb-4 mb-8">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-4 py-2 rounded-full whitespace-nowrap ${
              activeCategory === category
                ? "bg-indigo-600 text-white"
                : "bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {isLoading ? (
        <div className="text-center">Loading...</div>
      ) : error ? (
        <div className="text-red-500 text-center">{error.message}</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts?.map((post) => (
            <div
              key={post._id}
              className="bg-white dark:bg-neutral-800 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200"
            >
              <Link to={`/blog/${post._id}`}>
                <img
                  src={post.img}
                  alt={post.title}
                  className="w-full h-48 object-cover rounded-t-xl"
                />
                <div className="p-4">
                  <span className="text-sm text-indigo-600 dark:text-indigo-400">
                    {post.category}
                  </span>
                  <h2 className="text-xl font-semibold mt-2">{post.title}</h2>
                  <div
                    className="text-gray-600 dark:text-gray-300 mt-2 line-clamp-2 prose dark:prose-invert"
                    dangerouslySetInnerHTML={{ __html: post.content }}
                  />
                </div>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ExplorePage;
