import React from "react";
import { MdDelete, MdEditDocument } from "react-icons/md";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const BlogPostPage = () => {
  const { id } = useParams();
  const { data: authUser } = useQuery({ queryKey: ["authUser"] });
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: post } = useQuery({
    queryKey: ["post", id],
    queryFn: async () => {
      const res = await fetch(`/api/posts/${id}`);
      if (!res.ok) throw new Error("Failed to fetch post");
      return res.json();
    },
  });

  const { mutate: deletePost } = useMutation({
    mutationFn: async () => {
      try {
        const res = await fetch(`/api/posts/${id}`, {
          method: "DELETE",
        });
        const data = await res.json();
        if (!res.ok) throw new Error(res.error || "Something went wrong!");
        return data;
      } catch (error) {
        throw new Error(error);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries("posts");
      navigate("/");
    },
  });

  const handleDelete = () => {
    deletePost();
  };

  const isOwner = authUser && post && authUser._id === post.user._id;

  return (
    <>
      {post && (
        <div className="mt-0 mb-5">
          <div className="min-h-[140px] mx-auto">
            <div className="max-w-[80%] mx-auto">
              <div className="mt-7 items-center">
                <h2 className="font-bold text-sm">BLOG ARTICLE</h2>
                <h1 className="lg:text-5xl text-3xl font-bold mt-2">
                  {post.title}
                </h1>
              </div>
              <div className="mt-3 flex flex-row gap-3">
                <p className="font-bold">
                  By: {post.user.username} |{" "}
                  {new Date(post.createdAt).toLocaleDateString()}
                </p>
                {isOwner && (
                  <>
                    <Link
                      to={`/editpost/${id}`}
                      className="cursor-pointer hover:text-green-400"
                    >
                      <MdEditDocument size={20} />
                    </Link>
                    <button
                      onClick={handleDelete}
                      className="hover:text-red-400"
                    >
                      <MdDelete size={20} />
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="max-w-[77%] mx-auto">
            <div className="mt-2 flex flex-col items-center text-gray-500">
              {post.content.split("\n\n").map((paragraph, index) => (
                <React.Fragment key={index}>
                  {paragraph.startsWith("# ") ? (
                    <h2 className="lg:text-4xl text-2xl font-bold mt-2 dark:text-gray-200 text-gray-950">
                      {paragraph.slice(2)}
                    </h2>
                  ) : (
                    <p className="mt-2">{paragraph}</p>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BlogPostPage;
