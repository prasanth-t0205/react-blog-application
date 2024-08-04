import { useState, useRef, useEffect } from "react";
import { FiMessageCircle } from "react-icons/fi";
import { MdOutlineDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const Comment = ({ comment, onReply, onDelete, currentUser, isPostOwner }) => {
  const [showReplies, setShowReplies] = useState(false);

  const canDelete =
    currentUser && (currentUser._id === comment.user._id || isPostOwner);

  return (
    <div className="mb-3">
      <div className="flex items-start">
        <img
          src={comment.user.profileImg}
          alt=""
          className="h-8 w-8 rounded-full mr-3"
        />
        <div className="flex-grow">
          <span className="font-semibold mr-2">{comment.user.username}</span>
          <span>{comment.text}</span>
          <div className="text-xs text-gray-500 mt-1 flex items-center">
            <span>{new Date(comment.createdAt).toLocaleDateString()}</span>
            <button
              onClick={() => onReply(comment._id, comment.user.username)}
              className="ml-3 text-gray-500 hover:text-gray-700"
            >
              Reply
            </button>
            {canDelete && (
              <button
                onClick={() => onDelete(comment._id)}
                className="ml-2 text-red-500 hover:text-red-700"
              >
                <MdOutlineDelete size={17} />
              </button>
            )}
          </div>
        </div>
      </div>
      {comment.replies && comment.replies.length > 0 && (
        <div className="ml-11 mt-2">
          <button
            className="text-sm text-gray-500 hover:text-gray-700"
            onClick={() => setShowReplies(!showReplies)}
          >
            {showReplies
              ? "Hide replies"
              : `View ${comment.replies.length} replies`}
          </button>
          {showReplies && (
            <div className="mt-2">
              {comment.replies.map((reply) => (
                <Comment
                  key={reply._id}
                  comment={reply}
                  onReply={onReply}
                  onDelete={onDelete}
                  currentUser={currentUser}
                  isPostOwner={isPostOwner}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const CommentSection = ({
  comments: initialComments,
  onPostComment,
  onDeleteComment,
  currentUser,
  isPostOwner,
  isAuthenticated,
}) => {
  const [comments, setComments] = useState(initialComments || []);
  const [newComment, setNewComment] = useState("");
  const [replyingTo, setReplyingTo] = useState(null);
  const navigate = useNavigate();
  const commentInputRef = useRef(null);

  useEffect(() => {
    if (replyingTo) {
      commentInputRef.current.focus();
    }
  }, [replyingTo]);

  useEffect(() => {
    setComments(initialComments || []);
  }, [initialComments]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newComment.trim()) {
      onPostComment(newComment, replyingTo);
      setNewComment("");
      setReplyingTo(null);
    }
  };

  const handleReply = (commentId, username) => {
    setReplyingTo(commentId);
    setNewComment(`@${username} `);
  };

  const handleInputFocus = () => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  };

  return (
    <div className=" max-w-2xl mx-auto mt-8 dark:bg-[#181818] p-6">
      <form onSubmit={handleSubmit} className="flex items-center pt-4 mb-4">
        <input
          ref={commentInputRef}
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          onFocus={handleInputFocus}
          className="flex-grow bg-transparent focus:outline-none"
          placeholder={replyingTo ? "Add a reply..." : "Add a comment..."}
        />
        <button
          type="submit"
          className="ml-2 text-blue-500 font-semibold disabled:opacity-50"
          disabled={!newComment.trim() || !isAuthenticated}
        >
          Post
        </button>
      </form>
      <div className="border-t border-gray-300 dark:border-gray-600 pt-4"></div>
      <div className=" max-h-96 overflow-y-auto">
        {comments.map((comment) => (
          <Comment
            key={comment._id}
            comment={comment}
            onReply={handleReply}
            onDelete={onDeleteComment}
            currentUser={currentUser}
            isPostOwner={isPostOwner}
          />
        ))}
      </div>
    </div>
  );
};

export default CommentSection;
