import { useEffect, useRef, useState } from "react";
import userImage from "../../assets/user.png";
import { FiEdit2 } from "react-icons/fi";
import { RiImageAddFill } from "react-icons/ri";
import { MdDelete } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import { BiHide, BiShowAlt } from "react-icons/bi";
import SocialLinkInput from "./SocialLinkInput";
import { useEdit } from "../../hooks/useEdit";

const EditProfile = ({ show, setShow, authUser }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [deleteProfileImage, setDeleteProfileImage] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [selectedPlatform, setSelectedPlatform] = useState("");
  const [open, setOpen] = useState(false);
  const fileInputRef = useRef(null);

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

  const { mutate: updateProfile, isPending: isPendingProfile } = useEdit();

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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-0 sm:p-4">
          <div className="bg-white dark:bg-[#212121] w-full h-full sm:h-auto sm:max-h-[90vh] sm:w-[95%] sm:max-w-[500px] lg:max-w-[600px] rounded-none sm:rounded-2xl shadow-xl overflow-auto">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                updateProfile(formData);
              }}
            >
              <div className="sticky top-0 z-10 bg-white dark:bg-[#212121] px-4 py-3 border-b dark:border-gray-700 flex items-center justify-between">
                <h2 className="text-xl font-bold">Edit Profile</h2>
                <div className="flex gap-2">
                  <button
                    type="submit"
                    className="hidden sm:block px-4 py-2 bg-indigo-600 text-white text-sm rounded-lg hover:bg-indigo-700"
                  >
                    {isPendingProfile ? "Saving..." : "Save"}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShow(false)}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full"
                  >
                    <RxCross2 size={20} />
                  </button>
                </div>
              </div>

              <div className="p-4 sm:p-6 pb-20 sm:pb-6 space-y-6">
                <div className="flex justify-center">
                  <div className="relative">
                    <img
                      className="w-28 h-28 rounded-full object-cover border-4 border-gray-100 dark:border-gray-800"
                      src={selectedImage || authUser.profileImg || userImage}
                      alt="Profile"
                    />
                    <button
                      type="button"
                      className="absolute bottom-0 right-0 p-2 bg-white dark:bg-gray-800 rounded-full shadow-lg hover:scale-110 transition"
                      onClick={() => setOpen(!open)}
                    >
                      <FiEdit2 size={16} />
                    </button>
                    {open && (
                      <div className="absolute left-full ml-2 top-0 flex gap-2">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleFileChange}
                          ref={fileInputRef}
                          className="hidden"
                        />
                        <button
                          type="button"
                          className="p-2 bg-white dark:bg-gray-800 rounded-full shadow-lg hover:scale-110 transition"
                          onClick={() => fileInputRef.current.click()}
                        >
                          <RiImageAddFill size={20} />
                        </button>
                        <button
                          type="button"
                          className="p-2 bg-white dark:bg-gray-800 rounded-full shadow-lg hover:scale-110 transition"
                          onClick={handleDeleteImage}
                        >
                          <MdDelete size={20} />
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input
                      className="w-full p-3 rounded-lg bg-gray-50 dark:bg-[#181818] focus:ring-2 focus:ring-indigo-500 transition"
                      placeholder="Full Name"
                      type="text"
                      name="fullname"
                      value={formData.fullname}
                      onChange={handleProfileUpload}
                    />
                    <input
                      className="w-full p-3 rounded-lg bg-gray-50 dark:bg-[#181818] focus:ring-2 focus:ring-indigo-500 transition"
                      placeholder="Username"
                      type="text"
                      name="username"
                      value={formData.username}
                      onChange={handleProfileUpload}
                    />
                  </div>

                  <input
                    className="w-full p-3 rounded-lg bg-gray-50 dark:bg-[#181818] focus:ring-2 focus:ring-indigo-500 transition"
                    type="email"
                    placeholder="Email"
                    name="email"
                    value={formData.email}
                    onChange={handleProfileUpload}
                  />

                  <SocialLinkInput
                    links={formData.socialLinks}
                    addLink={addSocialLink}
                    removeLink={removeSocialLink}
                  />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="relative">
                      <input
                        className="w-full p-3 rounded-lg bg-gray-50 dark:bg-[#181818] focus:ring-2 focus:ring-indigo-500 transition pr-10"
                        placeholder="Current Password"
                        type={showCurrentPassword ? "text" : "password"}
                        name="currentPassword"
                        value={formData.currentPassword}
                        onChange={handleProfileUpload}
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 -translate-y-1/2"
                        onClick={() =>
                          setShowCurrentPassword(!showCurrentPassword)
                        }
                      >
                        {showCurrentPassword ? (
                          <BiShowAlt size={20} />
                        ) : (
                          <BiHide size={20} />
                        )}
                      </button>
                    </div>
                    <div className="relative">
                      <input
                        className="w-full p-3 rounded-lg bg-gray-50 dark:bg-[#181818] focus:ring-2 focus:ring-indigo-500 transition pr-10"
                        placeholder="New Password"
                        type={showNewPassword ? "text" : "password"}
                        name="newPassword"
                        value={formData.newPassword}
                        onChange={handleProfileUpload}
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 -translate-y-1/2"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                      >
                        {showNewPassword ? (
                          <BiShowAlt size={20} />
                        ) : (
                          <BiHide size={20} />
                        )}
                      </button>
                    </div>
                  </div>

                  <textarea
                    className="w-full p-3 rounded-lg bg-gray-50 dark:bg-[#181818] focus:ring-2 focus:ring-indigo-500 transition"
                    rows="3"
                    placeholder="Bio"
                    name="bio"
                    value={formData.bio}
                    onChange={handleProfileUpload}
                  />
                </div>
              </div>

              <div className="fixed bottom-0 left-0 right-0 p-4 bg-white dark:bg-[#212121] border-t dark:border-gray-700 sm:hidden">
                <button
                  type="submit"
                  className="w-full py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                >
                  {isPendingProfile ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default EditProfile;
