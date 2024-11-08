import { Link } from "react-router-dom";
import userImage from "../../assets/user.png";

const BlogPosts = ({ post }) => {
  if (!post) return null;

  const postOwner = post.user;
  const formatedDate = new Date(post.createdAt);

  return (
    <div className="group relative h-[300px] overflow-hidden rounded-xl">
      <img
        src={post.img}
        alt={post.title}
        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
          <div className="flex items-center gap-2 mb-2">
            <Link
              to={`/profile/${postOwner.username}`}
              className="flex items-center gap-2"
            >
              <img
                src={postOwner.profileImg || userImage}
                alt={postOwner.username}
                className="w-8 h-8 rounded-full border border-white/20"
              />
              <span className="text-sm font-medium">@{postOwner.username}</span>
            </Link>
          </div>

          <Link to={`/blog/${post._id}`}>
            <h2 className="text-lg font-bold mb-2 line-clamp-2">
              {post.title}
            </h2>

            <div
              className="text-sm text-gray-200 mb-3 line-clamp-2 prose prose-sm prose-invert"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </Link>

          <div className="flex items-center justify-between">
            <span className="text-sm bg-white/20 px-2 py-1 rounded">
              {post.category}
            </span>
            <span className="text-sm">{formatedDate.toDateString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPosts;
