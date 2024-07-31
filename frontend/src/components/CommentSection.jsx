import React, { useState } from "react";

const UserPopover = ({ user }) => (
  <div className="absolute mt-2 bg-[#212121] px-3 py-2 w-60 shadow-lg rounded-lg z-10">
    <div className="flex flex-col space-y-2">
      <img
        src={user.avatar}
        alt=""
        className="h-12 w-12 object-cover rounded-full"
      />
      <div className="font-semibold text-sm">{user.name}</div>
      <div className="text-xs text-gray-400">{user.about}</div>
    </div>
  </div>
);

const Comment = ({ comment, onReply, isReply }) => (
  <div className={`flex items-start space-x-3 mb-4 ${isReply ? "ml-8" : ""}`}>
    <div className="relative group">
      <img
        src={comment.user.avatar}
        alt=""
        className="h-10 w-10 object-cover rounded-full cursor-pointer"
      />
      <div className="hidden group-hover:block absolute right-full top-0 mr-2">
        <UserPopover user={comment.user} />
      </div>
    </div>
    <div className="flex-grow">
      <div className="dark:bg-[#212121] rounded-xl p-3">
        <div className="font-semibold text-sm mb-1">{comment.user.name}</div>
        <div className="text-sm">{comment.content}</div>
      </div>
      <div className="flex items-center text-xs text-gray-500 mt-1">
        <button
          onClick={() => onReply(comment.id)}
          className="hover:underline mr-2"
        >
          Reply
        </button>
        <span>{comment.timestamp}</span>
      </div>
      {comment.replies.map((reply) => (
        <Comment
          key={reply.id}
          comment={reply}
          onReply={onReply}
          isReply={true}
        />
      ))}
    </div>
  </div>
);

const CommentSection = () => {
  const [comments, setComments] = useState([
    {
      id: 1,
      user: {
        id: "user1",
        name: "John Doe",
        avatar: "https://via.placeholder.com/60",
        about: "Passionate about technology",
      },
      content: "This is a great post!",
      timestamp: "2 hours ago",
      replies: [],
    },
    // Add more initial comments as needed
  ]);
  const [newComment, setNewComment] = useState("");
  const [replyingTo, setReplyingTo] = useState(null);

  const handleSubmit = (e, parentId = null) => {
    e.preventDefault();
    if (newComment.trim()) {
      const comment = {
        id: Date.now(),
        user: {
          id: "currentUser",
          name: "Current User",
          avatar: "https://via.placeholder.com/60",
          about: "New user",
        },
        content: newComment,
        timestamp: "Just now",
        replies: [],
      };
      setComments(
        parentId
          ? comments.map((c) =>
              c.id === parentId ? { ...c, replies: [...c.replies, comment] } : c
            )
          : [comment, ...comments]
      );
      setNewComment("");
      setReplyingTo(null);
    }
  };

  return (
    <div className="dark:bg-[#181818] w-full sm:max-w-3xl md:w-2/3 h-auto rounded-lg p-6">
      <h2 className="text-xl font-bold mb-4">Comments</h2>

      <form onSubmit={(e) => handleSubmit(e)} className="mb-6">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="w-full p-2 border rounded-lg text-sm dark:bg-[#212121]"
          placeholder="Write a comment..."
          rows="3"
        />
        <button
          type="submit"
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg text-sm font-semibold"
        >
          Post Comment
        </button>
      </form>

      {comments.map((comment) => (
        <Comment key={comment.id} comment={comment} onReply={setReplyingTo} />
      ))}

      {replyingTo && (
        <form
          onSubmit={(e) => handleSubmit(e, replyingTo)}
          className="mt-2 ml-8"
        >
          <input
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="w-full p-2 border rounded-lg text-sm dark:bg-[#212121]"
            placeholder="Write a reply..."
          />
          <button
            type="submit"
            className="mt-1 px-3 py-1 bg-blue-500 text-white rounded-lg text-xs font-semibold"
          >
            Post Reply
          </button>
        </form>
      )}
    </div>
  );
};

export default CommentSection;
