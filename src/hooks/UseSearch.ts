import { useQuery } from "@tanstack/react-query";
import { baseUrl } from "appConstants";

export type Search = {
  numFound: number;
  start: number;
  numFoundExact: boolean;
  num_found: number;
  documentation_url: string;
  q: string;
  offset?: number;
  docs: Document[];
};

type Document = {
  key: string;
  title: string;
  author_key: string[];
  author_name: string[];
  cover_edition_key: string;
  cover_i: number;
  ebook_access: string;
  edition_count: number;
  first_publish_year: number;
  has_fulltext: boolean;
  ia: string[];
  ia_collection_s: string;
  language: string[];
  lending_edition_s: string;
  lending_identifier_s: string;
  public_scan_b: boolean;
  id_standard_ebooks: string[];
  id_project_gutenberg: string[];
}

export function useSearch(query: string) {
  return useQuery<Search, Error>({
    queryKey: ["Search", query],
    queryFn: async () => {
      if (!query) return { isLoading: false, data: [] };
      if (query.length < 3) return { isLoading: false, data: [] };
      const formattedQuery = query.replace(" ", "+");

      const res = await fetch(`${baseUrl}/search.json?q=${formattedQuery}`);
      if (!res.ok) throw new Error("Network response was not ok");
      return res.json();
    },
  });
}