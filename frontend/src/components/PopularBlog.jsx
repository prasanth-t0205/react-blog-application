import React from "react";

const PopularBlog = () => {
  return (
    <div className="mb-4">
      <h4 className="font-bold">Popular Blog Title</h4>
      <p className="text-sm text-gray-600 line-clamp-2">
        This is a brief description of the popular blog post. It will be limited
        to two lines.
      </p>
      <div className="text-xs text-gray-500 mt-1">
        <span>Username</span> • <span>2 hours ago</span>
      </div>
    </div>
  );
};

export default PopularBlog;
