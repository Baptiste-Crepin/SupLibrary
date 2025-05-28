import { useQuery } from "@tanstack/react-query";
import { baseUrl } from "appConstants";
import type { key } from "Types";

export type People = {
  key: string;
  displayname: string;
  description?: {
    type: string;
    value: string;
  };
  permission: key;
  type: key;
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

export function usePeople(peopleKey: string) {
  return useQuery<People, Error>({
    queryKey: ["people", peopleKey],
    queryFn: async () => {
      const res = await fetch(`${baseUrl}${peopleKey}.json`);
      if (!res.ok) throw new Error("Network response was not ok");
      return res.json();
    },
    enabled: !!peopleKey,
    gcTime: 1000 * 60 * 60 * 24 * 7,
    staleTime: 1000 * 60 * 60 * 24 * 7,
  });
}