import { useState } from "react";
import userImage from "../../assets/user.png";
import { Link, useParams } from "react-router-dom";
import EditProfile from "./EditProfile";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Posts from "../../components/Posts";
import Loading from "../../components/Loading";
import toast from "react-hot-toast";

const ProfilePage = () => {
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [activeTab, setActiveTab] = useState("myPosts");
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
  const iamFollowing = user?.followers.includes(authUser?._id);

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
                  className="lg:w-32 lg:h-32 rounded-full mb-4 shrink-0 w-20 h-20"
                  alt={user.fullname}
                />
                <h1 className="text-xl font-bold">{user.fullname}</h1>
                <p className="text-sm text-gray-500">@{user.username}</p>
                <div className="mt-6 flex flex-wrap gap-4 justify-center">
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
                      {isLoading
                        ? "Loading..."
                        : iamFollowing
                        ? "unfollow"
                        : "follow"}
                    </button>
                  )}
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

                  <div className="flex justify-center items-center gap-2 my-6">
                    {user.link && (
                      <Link
                        className="text-gray-400 dark:hover:text-white hover:text-black"
                        to={"https://www." + user.link}
                        target="_blank"
                      >
                        {user.link}
                      </Link>
                    )}
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
