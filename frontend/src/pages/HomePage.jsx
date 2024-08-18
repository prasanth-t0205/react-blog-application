import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import BlogCard from "../components/blog_posts/BlogCard";
import BlogPosts from "../components/blog_posts/BlogPosts";
import CategoryTag from "../components/CategoryTag";
import PopularBlog from "../components/PopularBlog";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import Loading from "../components/Loading";
import { useFetch } from "../hooks/useFetch";

const HomePage = () => {
  const [searchParams] = useSearchParams();
  const showExplore = searchParams.get("explore") === "true";

  const categories = [
    "Technology",
    "Movies",
    "Food",
    "Business",
    "Sports",
    "Travel",
  ];
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [randomCategoryPosts, setRandomCategoryPosts] = useState({});
  const [randomPopularPosts, setRandomPopularPosts] = useState([]);

  const {
    data: posts,
    isLoading,
    error,
  } = useFetch(["posts", selectedCategory], () =>
    selectedCategory ? `/api/posts?category=${selectedCategory}` : "/api/posts/"
  );

  useEffect(() => {
    if (posts) {
      const randomPosts = getRandomPostsForCategories(posts, categories);
      setRandomCategoryPosts(randomPosts);
      setRandomPopularPosts(getRandomPosts(posts, 7));
    }
  }, [posts]);

  useEffect(() => {
    if (showExplore) {
      setSelectedCategory(null);
      setCurrentPage(1);
    }
  }, [showExplore]);

  const getRandomPostsForCategories = (posts, categories) => {
    const randomPosts = {};
    categories.forEach((category) => {
      const categoryPosts = posts.filter((post) => post.category === category);
      if (categoryPosts.length > 0) {
        const randomIndex = Math.floor(Math.random() * categoryPosts.length);
        randomPosts[category] = categoryPosts[randomIndex];
      }
    });
    return randomPosts;
  };

  const getRandomPosts = (posts, count) => {
    const shuffled = [...posts].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  const filteredPosts = selectedCategory
    ? posts?.filter((post) => post.category === selectedCategory)
    : posts;

  const totalPosts = filteredPosts?.length || 0;
  const totalPages = Math.ceil(totalPosts / postsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      if (
        i <= 3 ||
        i >= totalPages - 2 ||
        (i >= currentPage - 1 && i <= currentPage + 1)
      ) {
        pageNumbers.push(
          <button
            key={i}
            onClick={() => handlePageChange(i)}
            className={`mx-1 px-3 py-1 rounded-full ${
              currentPage === i
                ? "bg-blue-500 text-white"
                : "bg-gray-200 dark:bg-[#212121]"
            }`}
          >
            {i}
          </button>
        );
      } else if (i === 4 || i === totalPages - 3) {
        pageNumbers.push(
          <span key={i} className="mx-1">
            ...
          </span>
        );
      }
    }
    return pageNumbers;
  };

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;

  if (isLoading) return <Loading />;

  return (
    <div className="container mx-auto px-4">
      <div className="w-full lg:w-[90%] mx-auto my-5">
        <div className="flex items-center justify-center mb-5">
          <h1 className="font-bold text-2xl">Explore the blog</h1>
          <hr className="w-[80%] h-1 mx-auto mt-1 bg-gray-100 border-0 rounded dark:bg-gray-700" />
        </div>
        {!showExplore && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map(
              (category) =>
                randomCategoryPosts[category] && (
                  <BlogCard
                    key={category}
                    post={randomCategoryPosts[category]}
                  />
                )
            )}
          </div>
        )}
      </div>

      <hr className="my-2 border-gray-300 dark:border-gray-700" />

      <div className="mb-2">
        <h2 className="text-2xl font-bold mb-2 text-center">Categories</h2>
        <div className="flex flex-wrap gap-2 justify-center">
          {categories.map((category, index) => (
            <CategoryTag
              key={index}
              name={category}
              onClick={() => setSelectedCategory(category)}
            />
          ))}
        </div>
      </div>

      <h2 className="text-2xl font-bold mb-2 text-center">
        {showExplore
          ? "Recent Blogs"
          : selectedCategory
          ? `${selectedCategory} Blogs`
          : "Recent Blogs"}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2">
          <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
            {!isLoading && filteredPosts?.length === 0 && (
              <p className="text-center my-4">No posts in this category...</p>
            )}
            {!isLoading && filteredPosts && (
              <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
                {filteredPosts
                  ?.slice(indexOfFirstPost, indexOfLastPost)
                  .map((post) => (
                    <BlogPosts key={post._id} post={post} />
                  ))}
              </div>
            )}
          </div>
          <div className="flex justify-center items-center mt-5">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="mx-2 px-1 py-1 bg-gray-200 dark:bg-[#212121] rounded-full disabled:opacity-50"
            >
              <IoIosArrowBack size={20} />
            </button>
            {renderPageNumbers()}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="mx-2 px-1 py-1 bg-gray-200 dark:bg-[#212121] rounded-full disabled:opacity-50"
            >
              <IoIosArrowForward size={20} />
            </button>
          </div>
        </div>
        <div>
          <h3 className="text-xl font-bold mb-2 text-center">Random Posts</h3>
          <div className="space-y-4">
            {randomPopularPosts.length > 0 ? (
              randomPopularPosts.map((post) => (
                <PopularBlog key={post._id} post={post} />
              ))
            ) : (
              <p className="text-center">No posts available.</p>
            )}
          </div>

          <div className="mt-6 hidden lg:block">
            <h3 className="text-xl font-bold mb-2 text-center">Categories</h3>
            <div className="flex flex-wrap gap-2">
              {categories.map((category, index) => (
                <CategoryTag
                  key={index}
                  name={category}
                  onClick={() => setSelectedCategory(category)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
