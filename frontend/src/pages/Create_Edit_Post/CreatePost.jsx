import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState, useRef } from "react";
import toast from "react-hot-toast";
import { FaPlus } from "react-icons/fa6";
import { RiImageAddFill } from "react-icons/ri";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.bubble.css";

const CreatePost = () => {
  const [open, setOpen] = useState(false);
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
  ]; // Add more categories as needed

  const { mutate: createPost, isPending } = useMutation({
    mutationFn: async ({ title, img, content, category }) => {
      try {
        const res = await fetch("/api/posts/create", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ title, content, img, category }),
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message || "Failed to create post");
        }

        return data;
      } catch (error) {
        console.error("Error creating post:", error);
        throw error;
      }
    },

    onSuccess: () => {
      setTitle("");
      setCategory("");
      setImg(null);
      setContent("");
      toast.success("Post created successfully");
      queryClient.invalidateQueries(["posts"]);
    },
    onError: (error) => {
      toast.error(error.message || "Failed to create post");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim() || !category) {
      toast.error("Title, content, and category are required");
      return;
    }
    createPost({ title, img, content, category });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setImg(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="w-[80%] mx-auto mt-0">
      <div className="relative flex flex-col gap-4">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-[20px]">
            <input
              type="text"
              placeholder="Title"
              className="p-12 border-none text-[64px] outline-none bg-transparent"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="pl-12 max-w-80 p-2 border-none text-[24px] outline-none dark:bg-[#181818] "
            >
              <option value="">Select Category</option>
              {categories.map((cat, index) => (
                <option key={index} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
          <div className="flex gap-[20px] h-[500px] relative scrollbar">
            <button
              type="button"
              className="w-[36px] h-[36px] rounded-full bg-transparent flex items-center justify-center"
              onClick={() => setOpen(!open)}
            >
              <FaPlus size={20} />
            </button>
            {open && (
              <div className="ml-1 absolute flex gap-[10px] z-[999] w-[100%] left-10">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  ref={imgRef}
                  style={{ display: "none" }}
                />
                <button
                  type="button"
                  className="w-[36px] h-[36px] rounded-full bg-transparent flex items-center justify-center"
                  onClick={() => imgRef.current.click()}
                >
                  <RiImageAddFill size={20} />
                </button>
              </div>
            )}
            {img && (
              <img
                src={img}
                alt="Selected"
                className="max-w-[200px] max-h-[200px] object-cover mb-4"
              />
            )}
            <ReactQuill
              theme="bubble"
              value={content}
              onChange={setContent}
              placeholder="Write something here..."
              className="quill-row-placeholder w-[100%]"
            />
          </div>
          <button
            type="submit"
            className="max-w-[150px] px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg "
          >
            {isPending ? "Posting..." : "Publish post"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
