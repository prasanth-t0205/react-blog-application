import {
  useMutation as useReactQueryMutation,
  useQueryClient,
} from "@tanstack/react-query";

export const useMutation = (url, method, invalidateQueries) => {
  const queryClient = useQueryClient();

  return useReactQueryMutation({
    mutationFn: async (data) => {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Network response was not ok");
      return res.json();
    },
    onSuccess: () => {
      invalidateQueries.forEach((query) =>
        queryClient.invalidateQueries({ queryKey: [query] })
      );
    },
  });
};
