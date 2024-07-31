import React from "react";
import { Link } from "react-router-dom";

const BlogCard = () => {
  return (
    <div className="max-w-sm  rounded overflow-hidden shadow-lg dark:bg-[#212121]">
      <Link to="/blog">
        <img
          class="w-full"
          src="https://v1.tailwindcss.com/img/card-top.jpg"
          alt="Sunset in the mountains"
        />
      </Link>
      <div className="px-6 py-4">
        <Link to="/blog">
          {" "}
          <div className="font-bold text-xl mb-2">The Coldest Sunset</div>
        </Link>
        <p className="text-gray-700 dark:text-gray-400 text-base">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus
          quia, nulla! Maiores et perferendis eaque, exercitationem praesentium
          nihil.
        </p>
      </div>
    </div>
  );
};

export default BlogCard;
