import { useState } from "react";
import userImage from "../../assets/user.png";
import { Link, useParams } from "react-router-dom";
import EditProfile from "./EditProfile";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Posts from "../../components/Posts";
import Loading from "../../components/Loading";
import toast from "react-hot-toast";
import { FaUser } from "react-icons/fa";
import FollowList from "./FollowList";
import {
  RiFacebookBoxLine,
  RiInstagramLine,
  RiLinkedinBoxLine,
  RiTwitterXFill,
} from "react-icons/ri";

const ProfilePage = () => {
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [activeTab, setActiveTab] = useState("myPosts");
  const [showFollowList, setShowFollowList] = useState(false);
  const [activeFollowTab, setActiveFollowTab] = useState("followers");

  const queryClient = useQueryClient();

  const { data: authUser } = useQuery({ queryKey: ["authUser"] });
  const { username } = useParams();

  const { data: user, isLoading } = useQuery({
    queryKey: ["userProfile", username],
    queryFn: async () => {
      const res = await fetch(`/api/users/profile/${username}`);
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Something went wrong!");
      }
      return data.user;
    },
  });

  const followMutation = useMutation({
    mutationFn: async (userId) => {
      const res = await fetch(`/api/users/follow/${userId}`, {
        method: "POST",
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Something went wrong!");
      }
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["userProfile", username],
      });
      queryClient.invalidateQueries({
        queryKey: ["authUser"],
      });
      toast.success(data.message);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleFollow = () => {
    if (user) {
      followMutation.mutate(user._id);
    }
  };

  const myProfile = authUser?._id === user?._id;
  const iamFollowing = authUser?.following.includes(user?._id);

  if (isLoading) return <Loading />;

  return (
    <>
      <div className=" text-black dark:text-white">
        {user && (
          <div className="flex flex-col items-center">
            <div className="col-span-4 sm:col-span-3">
              <div className="flex flex-col items-center mt-4">
                <img
                  src={user.profileImg || userImage}
                  className="lg:w-32 lg:h-32 object-cover rounded-full mb-4 shrink-0 w-20 h-20"
                  alt={user.fullname}
                />
                <h1 className="text-xl font-bold">{user.fullname}</h1>
                <p className="text-sm text-gray-500">@{user.username}</p>
                <div className="mt-6 flex flex-wrap gap-4 justify-center">
                  <div className="flex gap-3">
                    {myProfile && (
                      <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded"
                        onClick={() => setShowEditProfile(!showEditProfile)}
                      >
                        Edit Profile
                      </button>
                    )}
                    {!myProfile && (
                      <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        onClick={handleFollow}
                      >
                        {iamFollowing ? "Unfollow" : "Follow"}
                      </button>
                    )}
                    <div className="relative mt-1.5 inline-block">
                      <button
                        onClick={() => setShowFollowList(!showFollowList)}
                      >
                        <FaUser />
                      </button>
                      {showFollowList && (
                        <div className="absolute left-1/2 transform -translate-x-1/2 mt-2">
                          <FollowList
                            user={user}
                            activeTab={activeFollowTab}
                            onTabChange={setActiveFollowTab}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <hr className="my-6 border-t border-gray-300" />
            </div>
            <div className="w-[75%]">
              <div className="col-span-4 sm:col-span-9">
                <div className="mt-4 flex flex-col items-center">
                  <h2 className="text-xl font-bold mb-4">About Me</h2>
                  <p className="text-black dark:text-white">
                    {user.bio || "No bio available"}
                  </p>

                  <h3 className="font-semibold text-center mt-3 -mb-2">
                    Find me on
                  </h3>

                  <div className="flex flex-row items-center gap-2 my-6">
                    {user.socialLinks &&
                      user.socialLinks.map((link, index) => (
                        <Link
                          key={index}
                          className="text-gray-400 dark:hover:text-white hover:text-black flex items-center gap-2"
                          to={`https://www.${link.platform}.com/${link.linkname}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {link.platform === "instagram" && (
                            <RiInstagramLine size={20} />
                          )}
                          {link.platform === "x" && (
                            <RiTwitterXFill size={20} />
                          )}
                          {link.platform === "facebook" && (
                            <RiFacebookBoxLine size={20} />
                          )}
                          {link.platform === "linkedin" && (
                            <RiLinkedinBoxLine />
                          )}
                        </Link>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        <hr className="my-6 border-t border-gray-300 h-1" />
        <div className="w-full px-10">
          <div className="flex justify-center mb-4">
            <button
              className={`mx-2 px-4 py-2 ${
                activeTab === "myPosts" ? "border-b-2 border-blue-500" : ""
              }`}
              onClick={() => setActiveTab("myPosts")}
            >
              My Posts
            </button>
            <button
              className={`mx-2 px-4 py-2 ${
                activeTab === "following" ? "border-b-2 border-blue-500" : ""
              }`}
              onClick={() => setActiveTab("following")}
            >
              Following
            </button>
          </div>
        </div>
        <div className="w-full px-10">
          <Posts feedType={activeTab} username={username} />
        </div>
      </div>
      <EditProfile
        show={showEditProfile}
        setShow={setShowEditProfile}
        authUser={authUser}
      />
    </>
  );
};

export default ProfilePage;
