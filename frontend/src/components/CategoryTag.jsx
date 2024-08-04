import React from "react";

const CategoryTag = ({ name, onClick }) => {
  return (
    <button
      onClick={() => onClick(name)}
      className="px-3 py-1 bg-gray-200 dark:bg-[#212121] rounded-full text-sm hover:bg-gray-300 dark:hover:bg-gray-700 transition duration-300"
    >
      {name}
    </button>
  );
};

export default CategoryTag;
