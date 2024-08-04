import React, { useState } from "react";
import {
  RiInstagramLine,
  RiTwitterLine,
  RiFacebookBoxLine,
  RiLinkedinBoxLine,
} from "react-icons/ri";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

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
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-2">
        <select
          value={platform}
          onChange={(e) => setPlatform(e.target.value)}
          className="w-full p-2 border dark:border-none rounded dark:bg-[#181818]"
        >
          <option value="">Select Platform</option>
          <option value="instagram">Instagram</option>
          <option value="x">X</option>
          <option value="facebook">Facebook</option>
          <option value="linkedin">LinkedIn</option>
        </select>
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={linkname}
            onChange={(e) => setLinkname(e.target.value)}
            placeholder="linkname"
            className="col-span-2 p-2 border-none bg-transparent"
          />
          <button
            type="button"
            onClick={handleAddLink}
            className="mb-4 py-0 text-white rounded mt-1"
          >
            Add
          </button>
          <button
            type="button"
            onClick={() => setShowLinks(!showLinks)}
            className="mb-4 py-0 text-white rounded mt-1"
          >
            {showLinks ? <IoIosArrowUp /> : <IoIosArrowDown />}
          </button>
        </div>
      </div>

      {showLinks && (
        <div>
          {links.map((link, index) => (
            <div
              key={index}
              className="flex items-center justify-between mb-2 p-2 bg-gray-100 dark:bg-[#2a2a2a] rounded"
            >
              <span className="flex items-center gap-2">
                {getPlatformIcon(link.platform)}
                {link.platform}: {link.linkname}
              </span>
              <button
                type="button"
                onClick={() => removeLink(index)}
                className="text-red-500 hover:text-red-700"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SocialLinkInput;
