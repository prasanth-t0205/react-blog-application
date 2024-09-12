import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import userImage from "../assets/user.png";
import { MdDelete } from "react-icons/md";
import toast from "react-hot-toast";

const Notification = () => {
  const queryClient = useQueryClient();
  const { data: notifications } = useQuery({
    queryKey: ["notifications"],
    queryFn: async () => {
      try {
        const res = await fetch("/api/notifications");
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.error || "Something went wrong");
        }
        return data;
      } catch (error) {
        throw new Error(error);
      }
    },
  });

  const { mutate: deleteNotification } = useMutation({
    mutationFn: async (id) => {
      const res = await fetch(`/api/notifications/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete notification");
      return res.json();
    },
    onSuccess: () => {
      toast.success("Notification deleted successfully");
      queryClient.invalidateQueries(["notifications"]);
    },
    onError: (error) => toast.error(error.message),
  });

  const { mutate: deleteAllNotifications } = useMutation({
    mutationFn: async () => {
      const res = await fetch("/api/notifications", { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete all notifications");
      return res.json();
    },
    onSuccess: () => {
      toast.success("All notifications deleted");
      queryClient.invalidateQueries(["notifications"]);
    },
    onError: (error) => toast.error(error.message),
  });

  if (!notifications) return null;
  return (
    <div className="absolute right-0 top-full z-10 mt-1 w-80 origin-top-right rounded-md bg-white dark:bg-[#181818] py-0 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
      <div className="max-h-96 overflow-y-auto">
        <div className="flex items-center justify-between p-2">
          <h2 className="font-bold text-sm ml-1 mt-1">Notification</h2>
          <MdDelete
            className="text-2xl cursor-pointer"
            onClick={deleteAllNotifications}
            size={20}
          />
        </div>
        <div className="flex flex-col space-y-2 p-2">
          {notifications.map((notification) => (
            <div
              key={notification._id}
              className="flex flex-col p-3 bg-white dark:bg-[#212121] shadow-sm hover:shadow-md rounded-lg"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <img
                    src={notification.from.profileImg || userImage}
                    alt=""
                    className="w-6 h-6 rounded-full"
                  />
                  <div className="flex flex-col ml-3">
                    <div className="text-xs leading-none">
                      {notification.from.username}
                    </div>
                    <p className="text-[10px] text-gray-600 leading-none mt-1">
                      {notification.type === "follow" &&
                        "started following you"}
                      {notification.type === "comment" &&
                        "commented on your post"}
                      {notification.type === "post" && "made a new post"}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => deleteNotification(notification._id)}
                  className="flex-shrink-0 px-3 py-1 text-xs shadow-sm hover:shadow-md font-medium tracking-wider text-red-600 rounded-full"
                >
                  <MdDelete size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      {notifications.length === 0 && (
        <div className="flex items-center justify-center p-2">
          <p className="text-sm text-gray-500">No notifications !!!</p>
        </div>
      )}
    </div>
  );
};

export default Notification;
