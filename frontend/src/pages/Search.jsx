import { useEffect, useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { IoReloadSharp } from "react-icons/io5";
import { RiDeleteBin5Line } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

const Search = ({ show, setShow, posts }) => {
  const [recentSearches, setRecentSearches] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearch = (e) => {
    if (e.key === "Enter" && searchTerm.trim()) {
      const matchingPost = posts.find((post) =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      if (matchingPost) {
        addToRecentSearches(matchingPost.title);
        navigateToPost(matchingPost._id);
      }
    }
  };

  const handleSuggestionClick = (post) => {
    addToRecentSearches(post.title);
    navigateToPost(post._id);
  };

  const addToRecentSearches = (search) => {
    setRecentSearches((prevSearches) => [
      search,
      ...prevSearches.filter((s) => s !== search),
    ]);
  };

  const navigateToPost = (postId) => {
    navigate(`/blog/${postId}`);
    setShow(false);
  };

  const handleDeleteSearch = (index) => {
    setRecentSearches((prevSearches) =>
      prevSearches.filter((_, i) => i !== index)
    );
  };

  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === "Escape") {
        setShow(false);
      }
    };
    document.addEventListener("keydown", handleEscKey);
    return () => {
      document.removeEventListener("keydown", handleEscKey);
    };
  }, [setShow]);

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      setShow(false);
    }
  };

  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      {show ? (
        <div
          className="flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center w-full md:inset-0 h-[100%] max-h-full backdrop-blur-sm"
          onClick={handleOverlayClick}
        >
          <div className="relative p-4 w-full max-w-md max-h-full">
            <div className="w-full max-w-md p-6 m-auto mx-auto rounded-lg ">
              <div className="bg-white dark:bg-[#181818] shadow-md rounded-lg px-3 py-2 mb-4">
                <div className="flex items-center sticky top-0 bg-white dark:bg-[#181818] z-10">
                  <div className="pl-2">
                    <IoIosSearch size={20} />
                  </div>
                  <input
                    className="w-full dark:bg-[#181818] dark:text-white leading-tight focus:outline-none py-2 px-2"
                    id="search"
                    type="text"
                    placeholder="Search Blogs..."
                    value={searchTerm}
                    onChange={handleInputChange}
                    onKeyPress={handleSearch}
                  />
                  <button
                    onClick={() => setShow(false)}
                    className=" text-[12px] dark:text-white text-gray-700 rounded-full w-[10%]"
                  >
                    ESC
                  </button>
                </div>
                <div className="mt-2 text-sm max-h-[300px] overflow-y-auto scrollbar scrollbar-thumb-white">
                  {searchTerm && filteredPosts.length > 0 ? (
                    filteredPosts.map((post) => (
                      <div
                        key={post._id}
                        className="cursor-pointer text-gray-700 hover:text-gray-200 hover:bg-gray-600 rounded-md px-2 py-2 my-2"
                        onClick={() => handleSuggestionClick(post)}
                      >
                        {post.title}
                      </div>
                    ))
                  ) : recentSearches.length > 0 ? (
                    recentSearches.map((search, index) => (
                      <div
                        key={index}
                        className="flex justify-between items-center cursor-pointer text-gray-700 hover:text-gray-200 hover:bg-gray-600 rounded-md px-2 py-2 my-2"
                      >
                        <div className="flex items-center flex-grow">
                          <span className="bg-gray-400 h-2 w-2 m-2 rounded-full"></span>
                          <div className="font-medium px-2">{search}</div>
                        </div>
                        <div className="flex items-center">
                          <div className="text-sm font-normal text-gray-500 tracking-wide mr-2">
                            <IoReloadSharp />
                          </div>
                          <button
                            onClick={() => handleDeleteSearch(index)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <RiDeleteBin5Line />
                          </button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-2">No recent searches</div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Search;
