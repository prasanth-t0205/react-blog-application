import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useRef, useState, useEffect } from "react";
import { FaImage } from "react-icons/fa";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const EditPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [img, setImg] = useState(null);
  const imgRef = useRef(null);
  const queryClient = useQueryClient();
  const categories = [
    "Technology",
    "Movies",
    "Food",
    "Business",
    "Sports",
    "Travel",
  ];

  const { data: post, isLoading } = useQuery({
    queryKey: ["post", id],
    queryFn: async () => {
      const res = await fetch(`/api/posts/${id}`);
      if (!res.ok) throw new Error("Failed to fetch post");
      return res.json();
    },
  });

  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setContent(post.content);
      setCategory(post.category);
      setImg(post.img);
    }
  }, [post]);

  const { mutate: editPost, isPending } = useMutation({
    mutationFn: async (updatedPost) => {
      const res = await fetch(`/api/posts/edit/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedPost),
      });
      if (!res.ok) throw new Error(await res.text());
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["post", id]);
      toast.success("Post updated successfully");
      navigate(`/`);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim() || !category) {
      toast.error("Title, content, and category are required");
      return;
    }
    editPost({ title, img, content, category });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setImg(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="max-w-3xl mx-auto mt-8 p-6 bg-white dark:bg-[#181818] rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-6 text-center">Edit Post</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <input
            type="text"
            placeholder="Enter your title"
            className="w-full p-3 text-xl border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none dark:bg-[#212121] dark:border-gray-600"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full p-3 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none dark:bg-[#212121] dark:border-gray-600"
          >
            <option value="">Select Category</option>
            {categories.map((cat, index) => (
              <option key={index} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
        <div className="flex space-x-4">
          <button
            type="button"
            onClick={() => imgRef.current.click()}
            className="flex items-center px-4 py-2 bg-gray-200 dark:bg-[#212121] rounded-lg hover:bg-gray-300 transition"
          >
            <FaImage className="mr-2" />
            Add Image
          </button>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            ref={imgRef}
            style={{ display: "none" }}
          />
          {img && (
            <img
              src={img}
              alt="Selected"
              className="w-16 h-16 object-cover rounded-lg"
            />
          )}
        </div>
        <div className="relative">
          <ReactQuill
            theme="snow"
            value={content}
            onChange={setContent}
            placeholder="Write your post content here..."
            className="h-64 mb-12"
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 text-lg font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition"
          disabled={isPending}
        >
          {isPending ? "Updating..." : "Update Post"}
        </button>
      </form>
    </div>
  );
};

export default EditPost;
