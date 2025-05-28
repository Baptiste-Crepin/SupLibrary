import { useQuery } from "@tanstack/react-query";
import { baseUrl } from "appConstants";
import { useState } from "react";
import { getCurrentDateParts } from "utils";

export type RecentChange = {
  id: string;
  kind: string;
  timestamp: string;
  comment: string;
  changes: Array<{
    key: string;
    revision: number;
  }>;
  author: {
    key: string;
  };
  ip: string | null;
  data: Record<string, unknown>;
};

export default function useRecentChanges(limit = 10) {
  const today = new Date();
  const { year, month, day } = getCurrentDateParts(today);
  const [urlToFetch] = useState(`${baseUrl}/recentchanges/${year}/${month}/${day}.json?limit=${limit}`);

  const { data, isLoading, isError } = useQuery<RecentChange[], Error>({
    queryKey: ["recentChanges", urlToFetch],
    queryFn: async () => {
      const res = await fetch(urlToFetch);
      if (!res.ok) throw new Error("Network response was not ok");
      return res.json();
    },
  });

  return {
    isLoading,
    isError,
    data: data,
  };
}
