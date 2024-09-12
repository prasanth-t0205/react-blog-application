import React from "react";
import { Link } from "react-router-dom";

const PopularBlog = ({ post, onView }) => {
  const handleClick = () => {
    onView(post._id);
  };

  const truncateContent = (content, maxLength) => {
    return content.length > maxLength
      ? content.slice(0, maxLength) + "..."
      : content;
  };

  return (
    <div>
      <Link to={`/blog/${post._id}`} onClick={handleClick}>
        <h4 className="font-bold text-[25px]">{post.title}</h4>
        <p
          className="text-[17px] text-gray-400"
          dangerouslySetInnerHTML={{
            __html: truncateContent(post.content, 86),
          }}
        />
      </Link>

      <p className="text-sm text-gray-500">
        <Link
          to={`/profile/${post.user.username}`}
          className="text-blue-500 font-bold"
        >
          {post.user.username}
        </Link>{" "}
        • {new Date(post.createdAt).toLocaleDateString()}
      </p>
    </div>
  );
};

export default PopularBlog;
