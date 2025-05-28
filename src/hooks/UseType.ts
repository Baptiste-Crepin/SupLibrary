import { useQuery } from "@tanstack/react-query";
import { baseUrl } from "appConstants";
import type { key } from "Types";

export type Type = {
  key: string;
  kind: string;
  created: {
    type: string;
    value: string; // date
  };
  properties: Property[];
  last_modified: {
    type: string;
    value: string; // date
  };
  latest_revision: number;
  revision: number;
  type: key;
  id: number;
};

type Property = {
  expected_type: key;
  unique: boolean;
  type: key;
  name: string;
}

export function useType(typeKey: string) {
  return useQuery<Type, Error>({
    queryKey: ["type", typeKey],
    queryFn: async () => {
      const res = await fetch(`${baseUrl}${typeKey}.json`);
      if (!res.ok) throw new Error("Network response was not ok");
      return res.json();
    },
    enabled: !!typeKey,
    gcTime: 1000 * 60 * 60 * 24 * 7,
    staleTime: 1000 * 60 * 60 * 24 * 7,
  });
}