import { useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { RiImageAddFill } from "react-icons/ri";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.bubble.css";

const CreatePost = () => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  return (
    <>
      <div className="w-[80%] mx-auto mt-0">
        <div className="relative flex flex-col gap-4">
          <input
            type="text"
            placeholder="Title"
            className=" p-12 border-none text-[64px] outline-none bg-transparent "
          />
          <div className=" flex gap-[20px] h-[500px] relative scrollbar">
            <button
              className="w-[36px] h-[36px] rounded-full bg-transparent  flex items-center justify-center"
              onClick={() => {
                setOpen(!open);
              }}
            >
              <FaPlus size={20} />
            </button>
            {open && (
              <div className=" ml-1 absolute flex gap-[10px] z-[999] w-[100%] left-10">
                <button className="w-[36px] h-[36px] rounded-full bg-transparent   flex items-center justify-center">
                  <RiImageAddFill size={20} />
                </button>
              </div>
            )}
            <ReactQuill
              theme="bubble"
              value={value}
              onChange={setValue}
              placeholder="Write something here..."
              className="quill-row-placeholder w-[100%]"
            />
          </div>
          <button
            type="submit"
            className=" max-w-[150px] px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800"
          >
            Publish post
          </button>
        </div>
      </div>
    </>
  );
};

export default CreatePost;
