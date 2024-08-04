import { useEffect, useRef, useState } from "react";
import userImage from "../../assets/user.png";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { FiEdit2 } from "react-icons/fi";
import { RiImageAddFill } from "react-icons/ri";
import { MdDelete } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import { BiHide, BiShowAlt } from "react-icons/bi";
import SocialLinkInput from "./SocialLinkInput";
import toast from "react-hot-toast";

const EditProfile = ({ show, setShow, authUser }) => {
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(null);
  const [deleteProfileImage, setDeleteProfileImage] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [selectedPlatform, setSelectedPlatform] = useState("");

  const queryClient = useQueryClient();
  const [formData, setFormData] = useState({
    fullname: "",
    username: "",
    email: "",
    bio: "",
    socialLinks: [],
    profileImg: "",
    currentPassword: "",
    newPassword: "",
  });
  const fileInputRef = useRef(null);
  const [open, setOpen] = useState(false);

  const { mutate: updateProfile, isPending: isPendingProfile } = useMutation({
    mutationFn: async () => {
      try {
        const dataToSend = {
          ...formData,
          deleteProfileImage,
          platform: selectedPlatform,
        };
        const res = await fetch(`/api/users/update`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dataToSend),
        });
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.error || "Something went wrong!");
        }
        return data;
      } catch (error) {
        throw new Error(error.message);
      }
    },
    onSuccess: (data) => {
      toast.success("Profile updated successfully!");
      Promise.all([
        queryClient.invalidateQueries({ queryKey: ["authUser"] }),
        queryClient.invalidateQueries({
          queryKey: ["userProfile", formData.username],
        }),
      ]);
      navigate(`/profile/${data.username}`);
      if (data.username && data.username !== formData.username) {
        navigate(`/profile/${data.username}`);
      }
    },
  });

  const handleProfileUpload = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target.result);
        setFormData({ ...formData, profileImg: e.target.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDeleteImage = () => {
    setSelectedImage(userImage);
    setFormData({ ...formData, profileImg: null });
    setDeleteProfileImage(true);
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      setShow(false);
    }
  };

  const addSocialLink = (link) => {
    setFormData((prev) => ({
      ...prev,
      socialLinks: [...prev.socialLinks, link],
    }));
  };

  const removeSocialLink = (index) => {
    setFormData((prev) => ({
      ...prev,
      socialLinks: prev.socialLinks.filter((_, i) => i !== index),
    }));
  };

  useEffect(() => {
    if (authUser) {
      setFormData({
        fullname: authUser.fullname,
        username: authUser.username,
        email: authUser.email,
        bio: authUser.bio,
        socialLinks: authUser.socialLinks || [],
        profileImg: authUser.profileImg,
        currentPassword: "",
        newPassword: "",
      });
      setSelectedPlatform(authUser.platform || "");
    }
  }, [authUser]);

  return (
    <>
      {show && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
          onClick={handleOverlayClick}
        >
          <div className="bg-white w-full max-w-[90%] sm:max-w-md md:max-w-lg lg:max-w-2xl rounded-lg shadow-lg dark:bg-[#212121]">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                updateProfile();
              }}
            >
              <div className="flex flex-col md:flex-row p-3 sm:p-4 md:p-6 gap-4">
                <main className="flex-1">
                  <div className="flex justify-between gap-2">
                    <h2 className="text-2xl font-bold mb-4">Profile</h2>
                    <button onClick={() => setShow(false)}>
                      <RxCross2 />
                    </button>
                  </div>
                  <div className="space-y-4">
                    <div className="flex justify-center mb-4">
                      <div className="relative w-24 h-24">
                        <img
                          className="w-full h-full rounded-full object-cover"
                          src={
                            selectedImage || authUser.profileImg || userImage
                          }
                          alt="Profile avatar"
                        />
                        <button
                          type="button"
                          className="absolute top-0 right-0 w-[27px] h-[27px] rounded-full bg-white flex items-center justify-center"
                          onClick={() => setOpen(!open)}
                        >
                          <FiEdit2 size={15} color="#000" />
                        </button>
                        {open && (
                          <div className="absolute flex gap-1 z-[999] w-[100%] left-24 -top-1 ">
                            <input
                              type="file"
                              accept="image/*"
                              onChange={handleFileChange}
                              ref={fileInputRef}
                              style={{ display: "none" }}
                            />
                            <button
                              type="button"
                              className="w-[36px] h-[36px] rounded-full bg-transparent flex items-center justify-center"
                              onClick={() => fileInputRef.current.click()}
                            >
                              <RiImageAddFill size={20} />
                            </button>
                            <button
                              type="button"
                              className="w-[36px] h-[36px] -ml-3 rounded-full bg-transparent flex items-center justify-center"
                              onClick={handleDeleteImage}
                            >
                              <MdDelete size={20} />
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <input
                        className="w-full p-2 border rounded dark:border-none dark:bg-[#181818]"
                        placeholder="Full Name"
                        type="text"
                        name="fullname"
                        value={formData.fullname}
                        onChange={handleProfileUpload}
                      />
                      <input
                        className="w-full p-2 border rounded dark:border-none dark:bg-[#181818] "
                        placeholder="Username"
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleProfileUpload}
                      />
                    </div>
                    <input
                      className="w-full p-2 border rounded dark:border-none dark:bg-[#181818]"
                      type="email"
                      placeholder="Email"
                      value={formData.email}
                      name="email"
                      onChange={handleProfileUpload}
                    />
                    <SocialLinkInput
                      links={formData.socialLinks}
                      addLink={addSocialLink}
                      removeLink={removeSocialLink}
                    />
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="relative">
                        <input
                          className="w-full p-2 border rounded dark:border-none dark:bg-[#181818]"
                          placeholder="Current Password"
                          type={showCurrentPassword ? "text" : "password"}
                          name="currentPassword"
                          value={formData.currentPassword}
                          onChange={handleProfileUpload}
                        />
                        <button
                          type="button"
                          className="absolute right-2 top-1/2 transform -translate-y-1/2"
                          onClick={() =>
                            setShowCurrentPassword(!showCurrentPassword)
                          }
                        >
                          {showCurrentPassword ? <BiShowAlt /> : <BiHide />}
                        </button>
                      </div>
                      <div className="relative">
                        <input
                          className="w-full p-2 border rounded dark:border-none dark:bg-[#181818]"
                          placeholder="New Password"
                          type={showNewPassword ? "text" : "password"}
                          name="newPassword"
                          value={formData.newPassword}
                          onChange={handleProfileUpload}
                        />
                        <button
                          type="button"
                          className="absolute right-2 top-1/2 transform -translate-y-1/2"
                          onClick={() => setShowNewPassword(!showNewPassword)}
                        >
                          {showNewPassword ? <BiShowAlt /> : <BiHide />}
                        </button>
                      </div>
                    </div>
                    <textarea
                      className="w-full p-2 border dark:border-none rounded dark:bg-[#181818]"
                      rows="3"
                      placeholder="Bio"
                      name="bio"
                      value={formData.bio}
                      onChange={handleProfileUpload}
                    ></textarea>

                    <div className="flex justify-end">
                      <button className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">
                        {isPendingProfile ? "updating..." : "Update"}
                      </button>
                    </div>
                  </div>
                </main>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default EditProfile;
