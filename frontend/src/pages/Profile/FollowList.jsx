import { Link } from "react-router-dom";
import userImage from "../../assets/user.png";

const FollowList = ({ user, activeTab, onTabChange }) => {
  return (
    <div className="bg-white dark:bg-[#212121] rounded-md shadow-lg overflow-hidden z-20 w-full max-w-sm">
      <div className="flex">
        <button
          className={`flex-1 px-4 py-2 ${
            activeTab === "followers" ? "border-b-2 border-blue-500" : ""
          }`}
          onClick={() => onTabChange("followers")}
        >
          Followers
        </button>
        <button
          className={`flex-1 px-4 py-2 ${
            activeTab === "following" ? "border-b-2 border-blue-500" : ""
          }`}
          onClick={() => onTabChange("following")}
        >
          Following
        </button>
      </div>
      <div className="max-h-80 sm:max-h-80 overflow-y-auto">
        {activeTab === "followers"
          ? user.followers.map((follower) => (
              <div key={follower._id} className="flex items-center p-2">
                <Link to={`/profile/${follower.username}`}>
                  <img
                    src={follower.profileImg || userImage}
                    alt={follower.username}
                    className="w-10 h-10 rounded-full mr-3"
                  />
                </Link>
                <Link to={`/profile/${follower.username}`}>
                  <p className="dark:text-white">{follower.username}</p>
                </Link>
              </div>
            ))
          : user.following.map((following) => (
              <div key={following._id} className="flex items-center p-3">
                <Link to={`/profile/${following.username}`}>
                  <img
                    src={following.profileImg || userImage}
                    alt={following.username}
                    className="w-10 h-10 rounded-full mr-3"
                  />
                </Link>
                <Link to={`/profile/${following.username}`}>
                  <p className="dark:text-white">{following.username}</p>
                </Link>
              </div>
            ))}
      </div>
    </div>
  );
};

export default FollowList;
