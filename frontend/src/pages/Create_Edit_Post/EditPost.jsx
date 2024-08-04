import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useRef, useState, useEffect } from "react";
import { FaPlus } from "react-icons/fa6";
import { RiImageAddFill } from "react-icons/ri";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.bubble.css";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const EditPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
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
    <>
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
              {isPending ? "Updating..." : "Update post"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditPost;
