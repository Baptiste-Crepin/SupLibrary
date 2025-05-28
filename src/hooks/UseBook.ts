import { useQuery } from "@tanstack/react-query";
import { baseUrl } from "appConstants";
import type { key } from "Types";

export type Book = {
  key: string;
  title: string;
  subtitle?: string;
  publishers?: string[];
  authors?: key[];
  publish_places?: string[];
  pagination?: string;
  source_records?: string[];
  notes?: {
    type: string;
    value: string;
  };
  number_of_pages?: number;
  subjects?: string[];
  publish_date?: string;
  publish_country?: string;
  by_statement?: string;
  works?: key[];
  type: key;
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
};

export function useBook(bookKey: string) {
  return useQuery<Book, Error>({
    queryKey: ["book", bookKey],
    queryFn: async () => {
      const res = await fetch(`${baseUrl}/books/${bookKey}.json`);
      if (!res.ok) throw new Error("Network response was not ok");
      return res.json();
    },
  });
}