import React, { useState } from "react";
import BlogCard from "../components/BlogCard";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const HomePage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 6;
  const totalCards = 8;
  const totalPages = Math.ceil(totalCards / cardsPerPage);

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

  const renderCards = () => {
    const startIndex = (currentPage - 1) * cardsPerPage;
    const endIndex = Math.min(startIndex + cardsPerPage, totalCards);
    return Array.from({ length: endIndex - startIndex }, (_, index) => (
      <BlogCard key={startIndex + index} />
    ));
  };

  return (
    <div className="w-[80%] mx-auto my-5">
      <div className="container mx-auto flex flex-wrap justify-evenly gap-3">
        {renderCards()}
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
  );
};

export default HomePage;
