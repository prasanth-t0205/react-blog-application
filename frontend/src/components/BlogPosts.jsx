import React from "react";
import { Link } from "react-router-dom";

const BlogPosts = ({ post }) => {
  if (!post) return null;

  const postOwner = post.user;
  const formatedDate = new Date(post.createdAt);

  return (
    <div className="container max-w-[50rem]  mx-auto">
      <div className="relative flex-col bg-clip-border rounded bg-transparent text-gray-700 shadow-none grid gap-2 item sm:grid-cols-2">
        <div className="relative bg-clip-border rounded overflow-hidden bg-white text-gray-700 shadow-lg m-0">
          <Link to={`/blog/${post._id}/${post.slug}`}>
            <img
              src="https://bucket.material-tailwind.com/magic-ai/06b38f84f9669f766048c469ce861b81880378273a11ae9badaedfc32868ef44.jpg"
              alt="Revolutionizing Our Production Process"
              className="object-cover w-full h-full"
            />
          </Link>
        </div>
        <div className="p-6 px-2 sm:pr-6 sm:pl-4">
          <p className="block antialiased font-sans text-sm font-light leading-normal text-inherit mb-4 ">
            Technology
          </p>
          <Link
            to={`/blog/${post._id}`}
            className="block antialiased tracking-normal font-sans text-xl font-semibold leading-snug text-blue-gray-900 mb-2 normal-case transition-colors hover:text-gray-700"
          >
            {post.title.length > 38
              ? post.title.substring(0, 38) + "..."
              : post.title}
          </Link>
          <p className="block antialiased font-sans text-base leading-relaxed text-inherit mb-5 font-normal !text-gray-500">
            {post.content.length > 170
              ? post.content.substring(0, 170) + "..."
              : post.content}
          </p>
          <div className="flex items-center gap-2">
            <p className="block antialiased font-sans text-base font-light leading-relaxed text-blue-gray-900 mb-0.5 ">
              <Link to={`/profile/${postOwner.username}`}>
                @{postOwner.username}
              </Link>
            </p>
            <p className="block antialiased font-sans text-sm leading-normal text-gray-700 font-normal">
              {formatedDate.toDateString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPosts;
