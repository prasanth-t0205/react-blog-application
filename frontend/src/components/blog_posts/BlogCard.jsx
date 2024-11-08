import { Link } from "react-router-dom";

const BlogCard = ({ post }) => {
  if (!post) return null;

  return (
    <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200">
      <Link to={`/blog/${post._id}`}>
        <img
          src={post.img}
          alt={post.title}
          className="w-full h-48 object-cover rounded-t-xl"
        />
      </Link>
      <div className="p-4">
        <span className="text-sm text-indigo-600 dark:text-indigo-400">
          {post.category}
        </span>
        <Link to={`/blog/${post._id}`}>
          <h2 className="text-xl font-semibold mt-2">{post.title}</h2>
        </Link>
        <div
          className="text-gray-600 dark:text-gray-300 mt-2 line-clamp-2 prose dark:prose-invert"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </div>
    </div>
  );
};

export default BlogCard;
