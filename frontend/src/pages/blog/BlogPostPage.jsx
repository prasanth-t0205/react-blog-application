import React, { useState } from "react";
import { MdDelete, MdEditDocument } from "react-icons/md";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Models from "./Models";
import Loading from "../../components/Loading";
import CommentSection from "./CommentSection";

const BlogPostPage = () => {
  const { id } = useParams();
  const { data: authUser } = useQuery({ queryKey: ["authUser"] });
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const { data: post, isLoading } = useQuery({
    queryKey: ["post", id],
    queryFn: async () => {
      const res = await fetch(`/api/posts/${id}`);
      if (!res.ok) throw new Error("Failed to fetch post");
      return res.json();
    },
  });

  const { mutate: deletePost } = useMutation({
    mutationFn: async () => {
      const res = await fetch(`/api/posts/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error(res.error || "Something went wrong!");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries("posts");
      navigate("/");
    },
  });

  const postCommentMutation = useMutation({
    mutationFn: async ({ text, parentId }) => {
      const res = await fetch(`/api/posts/comment/${id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, parentId }),
      });
      if (!res.ok) throw new Error("Failed to post comment");
      return res.json();
    },
    onSuccess: (newPost) => {
      queryClient.setQueryData(["post", id], newPost);
    },
  });
  const handlePostComment = (text, parentId = null) => {
    postCommentMutation.mutate({ text, parentId });
  };

  const deleteCommentMutation = useMutation({
    mutationFn: async ({ commentId }) => {
      const res = await fetch(`/api/posts/comment/${id}/${commentId}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete comment");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["post", id]);
    },
  });

  const handleDeleteComment = (commentId) => {
    deleteCommentMutation.mutate({ commentId });
  };

  const handleDelete = () => {
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    deletePost();
  };

  if (isLoading) return <Loading />;

  const isOwner = authUser && post && authUser._id === post.user._id;

  return (
    <>
      {post && (
        <>
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
                <div className=" flex flex-col items-center mt-3 ">
                  <img src={post.img} alt={post.title} width={400} />
                </div>
              </div>
            </div>
            <div className="max-w-[77%] mx-auto">
              <div className="mt-2 flex flex-col items-center text-gray-500">
                <div dangerouslySetInnerHTML={{ __html: post.content }} />
              </div>
            </div>
            <div className="mt-5 ml-0">
              <CommentSection
                comments={post.comments}
                onPostComment={handlePostComment}
                onDeleteComment={handleDeleteComment}
                currentUser={authUser}
                isPostOwner={authUser && post.user._id === authUser._id}
                isAuthenticated={!!authUser}
              />
            </div>
          </div>
        </>
      )}
      <Models
        show={showDeleteModal}
        setShow={setShowDeleteModal}
        onDelete={confirmDelete}
      />
    </>
  );
};

export default BlogPostPage;
