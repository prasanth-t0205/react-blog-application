import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export const useAuth = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const login = useMutation({
    mutationFn: async ({ username, password }) => {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      if (!res.ok) throw new Error("Login failed");
      return res.json();
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["authUser"], data);
      navigate("/");
    },
  });

  const logout = useMutation({
    mutationFn: async () => {
      const res = await fetch("/api/auth/logout", { method: "POST" });
      if (!res.ok) throw new Error("Logout failed");
    },
    onSuccess: () => {
      queryClient.setQueryData(["authUser"], null);
      navigate("/login");
    },
  });

  const signup = useMutation({
    mutationFn: async (userData) => {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });
      if (!res.ok) throw new Error("Signup failed");
      return res.json();
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["authUser"], data);
      navigate("/");
    },
  });

  return {
    login: {
      mutate: login.mutate,
      isPending: login.isPending,
      isError: login.isError,
      error: login.error,
    },
    logout,
    signup: {
      mutate: signup.mutate,
      isPending: signup.isPending,
      isError: signup.isError,
      error: signup.error,
    },
  };
};
