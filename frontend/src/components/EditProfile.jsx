import React from "react";
import { MdOutlineModeEditOutline } from "react-icons/md";

const EditProfile = ({ show, setShow }) => {
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      setShow(false);
    }
  };
  return (
    <>
      {show && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
          onClick={handleOverlayClick}
        >
          <div className="bg-white w-full max-w-[90%] sm:max-w-md md:max-w-lg lg:max-w-2xl rounded-lg shadow-lg dark:bg-[#212121]">
            <div className="flex flex-col md:flex-row p-3 sm:p-4 md:p-6 gap-4">
              <main className="flex-1">
                <h2 className="text-2xl font-bold mb-4">Public Profile</h2>
                <div className="space-y-4">
                  <div className="flex justify-center mb-4">
                    <div className="relative w-24 h-24">
                      <img
                        className="w-full h-full rounded-full object-cover"
                        src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGZhY2V8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60"
                        alt="Profile avatar"
                      />
                      <div className="absolute top-0 right-0 p-1 bg-white rounded-full cursor-pointer">
                        <MdOutlineModeEditOutline className="text-gray-500" />
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      className="w-full p-2 border rounded dark:border-none dark:bg-[#181818]"
                      placeholder="First Name"
                    />
                    <input
                      className="w-full p-2 border rounded dark:border-none dark:bg-[#181818] "
                      placeholder="Last Name"
                    />
                  </div>
                  <input
                    className="w-full p-2 border rounded dark:border-none dark:bg-[#181818]"
                    type="email"
                    placeholder="Email"
                  />
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <input
                      className="w-full col-span-2 p-2 dark:border-none border rounded dark:bg-[#181818]"
                      placeholder="Social Link"
                    />
                    <select className="w-full p-2 border dark:border-none rounded dark:bg-[#181818]">
                      <option value="">Select Platform</option>
                      <option value="twitter">Twitter</option>
                      <option value="facebook">Facebook</option>
                      <option value="instagram">Instagram</option>
                      <option value="linkedin">LinkedIn</option>
                    </select>
                  </div>
                  <textarea
                    className="w-full p-2 border dark:border-none rounded dark:bg-[#181818]"
                    rows="3"
                    placeholder="Bio"
                  ></textarea>
                  <div className="flex justify-end">
                    <button className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">
                      Save
                    </button>
                  </div>
                </div>
              </main>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EditProfile;
