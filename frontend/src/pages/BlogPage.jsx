import React, { useEffect, useState } from "react";
import { MdDelete, MdEditDocument } from "react-icons/md";
import { Link, useNavigate, useParams } from "react-router-dom";
import CommentSection from "../components/CommentSection";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

const BlogPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { data: authUser } = useQuery({ queryKey: ["authUser"] });

  const {
    data: post,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["post", id],
    queryFn: async () => {
      if (!id) return null;
      const res = await fetch(`/api/posts/${id}`);
      if (!res.ok) throw new Error("Failed to fetch post");
      return res.json();
    },
    enabled: !!id,
  });

  const { mutate: deletePost } = useMutation({
    mutationFn: async () => {
      const res = await fetch(`/api/posts/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete post");
      return res.json();
    },
    onSuccess: () => {
      toast.success("Post deleted successfully");
      queryClient.invalidateQueries(["post", id]);
      navigate("/");
    },
    onError: (error) => {
      toast.error(`Delete failed: ${error.message}`);
    },
  });

  const handleDelete = () => {
    deletePost();
  };

  if (isLoading) return <div>Loading...</div>;
  useEffect(() => {
    if (!isLoading && !post) {
      console.log("Post not found, redirecting");
      navigate("/");
    }
  }, [isLoading, post, navigate]);

  const isMyBlog = authUser && post.user._id === authUser._id;

  return (
    <>
      <div className="mt-0 mb-5">
        <div className=" min-h-[140px] mx-auto">
          <div className="max-w-[80%] mx-auto">
            <div className="mt-7 items-center">
              <h2 className=" font-bold text-sm ">BLOG ARTICLES</h2>
              <h1 className="lg:text-5xl text-3xl font-bold mt-2">
                {post.title}
              </h1>
            </div>

            <div className="mt-3 flex flex-row gap-3">
              <p className=" font-bold ">
                {post.user.fullname} |{" "}
                {new Date(post.createdAt).toLocaleDateString()}
              </p>
              {isMyBlog && (
                <>
                  <Link
                    to={`/editpost/${post._id}`}
                    className=" cursor-pointer hover:text-green-400"
                  >
                    <MdEditDocument size={20} />
                  </Link>
                  <button
                    className=" hover:text-red-400"
                    onClick={() => handleDelete()}
                  >
                    <MdDelete size={20} />
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
        <div className="max-w-[77%] mx-auto">
          <div className="mt-2 flex flex-col items-center text-gray-500 ">
            <p>{post.content}</p>
          </div>
          <CommentSection postId={id} />
        </div>
      </div>
    </>
  );
};

export default BlogPage;
