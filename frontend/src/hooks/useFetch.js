import { useQuery } from "@tanstack/react-query";

export const useFetch = (key, urlFn) => {
  return useQuery({
    queryKey: [key],
    queryFn: async () => {
      const url = typeof urlFn === "function" ? urlFn() : urlFn;
      const res = await fetch(url);
      if (!res.ok) throw new Error("Network response was not ok");
      return res.json();
    },
  });
};
