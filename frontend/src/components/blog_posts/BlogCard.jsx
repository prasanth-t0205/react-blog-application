import React from "react";
import { Link } from "react-router-dom";

const BlogCard = ({ post, onView }) => {
  if (!post) return null;
  const truncateContent = (content, maxLength) => {
    if (content.length <= maxLength) return content;
    return content.substr(0, maxLength) + "...";
  };
  const handleClick = () => {
    onView(post._id);
  };
  return (
    <div
      className="max-w-sm  rounded overflow-hidden shadow-lg dark:bg-[#212121]"
      onClick={handleClick}
    >
      <div className="m-0 h-64">
        <Link to={`/blog/${post._id}`}>
          <img
            className="object-cover w-full h-full"
            src={post.img}
            alt="Sunset in the mountains"
          />
        </Link>
      </div>
      <div className="px-6 py-4">
        <Link to={`/blog/${post._id}`}>
          {" "}
          <div className="font-bold text-xl mb-2">
            {post.title.length > 30
              ? post.title.substring(0, 30) + "..."
              : post.title}
          </div>
        </Link>
        <p
          className="text-gray-700 dark:text-gray-400 text-base"
          dangerouslySetInnerHTML={{
            __html: truncateContent(post.content, 150),
          }}
        />
      </div>
    </div>
  );
};

export default BlogCard;
