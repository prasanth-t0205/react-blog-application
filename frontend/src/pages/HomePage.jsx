import React, { useState } from "react";
import BlogCard from "../components/BlogCard";
import BlogPosts from "../components/BlogPosts";
import CategoryTag from "../components/CategoryTag";
import PopularBlog from "../components/PopularBlog";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useQuery } from "@tanstack/react-query";

const HomePage = () => {
  const categories = ["Technology", "Travel", "Food", "Lifestyle", "Fashion"];
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;

  const {
    data: posts,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      try {
        const res = await fetch("/api/posts/all");
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || "Something went wrong");
        }
        return data;
      } catch (error) {
        throw new Error(error);
      }
    },
  });

  const totalPosts = posts?.length || 0;
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

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="container mx-auto px-4">
      <div className="w-full lg:w-[80%] mx-auto my-5">
        <div className="flex items-center justify-center mb-5">
          <h1 className="font-bold text-2xl">Explore technology</h1>
          <hr className="w-[80%] h-1 mx-auto mt-1 bg-gray-100 border-0 rounded dark:bg-gray-700" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts?.slice(0, 6).map((post) => (
            <BlogCard key={post._id} post={post} />
          ))}
        </div>
      </div>

      <hr className="my-2 border-gray-300 dark:border-gray-700" />

      <div className="mb-2">
        <h2 className="text-2xl font-bold mb-2 text-center">Categories</h2>
        <div className="flex flex-wrap gap-2 justify-center">
          {categories.map((category, index) => (
            <CategoryTag key={index} name={category} />
          ))}
        </div>
      </div>

      <h2 className="text-2xl font-bold mb-2 text-center">Recent Blogs</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2">
          <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
            {!isLoading &&
              posts?.length ===
              <p className=" text-center my-4">No posts in this tab.... </p>}
            {!isLoading && posts && (
              <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
                {posts?.slice(indexOfFirstPost, indexOfLastPost).map((post) => (
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
          <h3 className="text-xl font-bold mb-2 text-center">Most Popular</h3>
          <div className="space-y-4">
            {posts?.slice(0, 6).map((post) => (
              <PopularBlog key={post._id} post={post} />
            ))}
          </div>
          <div className="mt-6 hidden lg:block">
            <h3 className="text-xl font-bold mb-2 text-center">Categories</h3>
            <div className="flex flex-wrap gap-2">
              {categories.map((category, index) => (
                <CategoryTag key={index} name={category} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
