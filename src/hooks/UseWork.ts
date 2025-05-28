import { useQuery } from "@tanstack/react-query";
import { baseUrl } from "appConstants";
import type { key } from "Types";

export type Work = {
  key: string;
  title: string;
  description?: {
    type: string;
    value: string
  } | string;
  first_publish_date?: number;
  authors?: Array<{ author: key, type: key }>;
  type: key;
  covers?: number[];
  subject_places?: string[];
  subjects?: string[];
  subject_people?: string[];
  subject_times?: string[];
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

export function useWork(workKey: string) {
  return useQuery<Work, Error>({
    queryKey: ["work", workKey],
    queryFn: async () => {
      const res = await fetch(`${baseUrl}/works/${workKey}.json`);
      if (!res.ok) throw new Error("Network response was not ok");
      return res.json();
    },
    enabled: !!workKey,
    gcTime: 1000 * 60 * 60 * 24 * 7,
    staleTime: 1000 * 60 * 60 * 24 * 7,
  });
}