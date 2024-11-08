import React, { useState } from "react";
import {
  RiInstagramLine,
  RiTwitterLine,
  RiFacebookBoxLine,
  RiLinkedinBoxLine,
} from "react-icons/ri";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { MdDelete } from "react-icons/md";

const SocialLinkInput = ({ links, addLink, removeLink }) => {
  const [platform, setPlatform] = useState("");
  const [linkname, setLinkname] = useState("");
  const [showLinks, setShowLinks] = useState(false);

  const handleAddLink = () => {
    if (platform && linkname) {
      addLink({ platform, linkname });
      setPlatform("");
      setLinkname("");
    }
  };

  const getPlatformIcon = (platform) => {
    switch (platform) {
      case "instagram":
        return <RiInstagramLine />;
      case "x":
        return <RiTwitterLine />;
      case "facebook":
        return <RiFacebookBoxLine />;
      case "linkedin":
        return <RiLinkedinBoxLine />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-3">
        <select
          value={platform}
          onChange={(e) => setPlatform(e.target.value)}
          className="w-full sm:w-1/3 p-3 rounded-lg bg-gray-50 dark:bg-[#181818] focus:ring-2 focus:ring-indigo-500 transition"
        >
          <option value="">Select Platform</option>
          <option value="instagram">Instagram</option>
          <option value="x">X</option>
          <option value="facebook">Facebook</option>
          <option value="linkedin">LinkedIn</option>
        </select>

        <div className="flex-1 flex gap-2">
          <input
            type="text"
            value={linkname}
            onChange={(e) => setLinkname(e.target.value)}
            placeholder="Username/Handle"
            className="flex-1 p-3 rounded-lg bg-gray-50 dark:bg-[#181818] focus:ring-2 focus:ring-indigo-500 transition"
          />
          <button
            type="button"
            onClick={handleAddLink}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
          >
            Add
          </button>
          <button
            type="button"
            onClick={() => setShowLinks(!showLinks)}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition"
          >
            {showLinks ? (
              <IoIosArrowUp size={20} />
            ) : (
              <IoIosArrowDown size={20} />
            )}
          </button>
        </div>
      </div>

      {showLinks && (
        <div className="space-y-2">
          {links.map((link, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 bg-gray-50 dark:bg-[#181818] rounded-lg"
            >
              <span className="flex items-center gap-2">
                {getPlatformIcon(link.platform)}
                <span className="font-medium">{link.platform}:</span>
                <span>{link.linkname}</span>
              </span>
              <button
                type="button"
                onClick={() => removeLink(index)}
                className="text-red-500 hover:text-red-700 p-2 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-full transition"
              >
                <MdDelete size={20} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SocialLinkInput;
