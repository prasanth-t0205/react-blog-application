import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export const useEdit = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (formData) => {
      const res = await fetch(`/api/users/update`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Something went wrong!");
      }
      return data;
    },
    onSuccess: (data) => {
      toast.success("Profile updated successfully!");
      Promise.all([
        queryClient.invalidateQueries({ queryKey: ["authUser"] }),
        queryClient.invalidateQueries({
          queryKey: ["userProfile", data.username],
        }),
      ]);
      navigate(`/profile/${data.username}`);
    },
  });
};
