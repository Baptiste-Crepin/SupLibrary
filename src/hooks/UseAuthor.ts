import { useQuery } from "@tanstack/react-query";
import { baseUrl } from "appConstants";

export type Author = {
  key: string;
  displayname: string;
  description?: {
    type: string;
    value: string;
  };
  permission: {
    key: string;
  };
  type: {
    key: string;
  };
  m: string;
  latest_revision: number;
  revision: number;
  created: {
    type: string;
    value: string; // date
  };
  updated: {
    type: string;
    value: string; // date
  };
};

export function useAuthor(authorKey: string) {
  return useQuery<Author, Error>({
    queryKey: ["author", authorKey],
    queryFn: async () => {
      const res = await fetch(`${baseUrl}${authorKey}.json`);
      if (!res.ok) throw new Error("Network response was not ok");
      return res.json();
    },
    enabled: !!authorKey,
  });
}