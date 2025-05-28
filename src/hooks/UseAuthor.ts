import { useQuery } from "@tanstack/react-query";
import { baseUrl } from "appConstants";
import type { key } from "Types";

export type Author = {
  key: string;
  name: string;
  bio: {
    type: string;
    value: string;
  } | string;
  type: key;
  photos: number[];
  source_records: string[];
  personal_name: string;
  remote_ids: {
    [key: string]: string;
  };
  birth_date: string;
  death_date: string;
  alternate_names: string[];
  latest_revision: number;
  revision: number;
  created: {
    type: string;
    value: string; // date
  };
  last_modified: {
    type: string;
    value: string; // date
  };

}

export function useAuthor(authorKey: string) {
  return useQuery<Author, Error>({
    queryKey: ["author", authorKey],
    queryFn: async () => {
      const res = await fetch(`${baseUrl}${authorKey}.json`);
      if (!res.ok) throw new Error("Network response was not ok");
      return res.json();
    },
    enabled: !!authorKey,
    gcTime: 1000 * 60 * 60 * 24 * 7,
    staleTime: 1000 * 60 * 60 * 24 * 7,
  });
}