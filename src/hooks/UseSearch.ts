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

export function useSearch(query: string, limit = 10, offset = 0) {
  return useQuery<Search, Error>({
    queryKey: ["Search", query, limit, offset],
    queryFn: async () => {
      if (!query) return { isLoading: false, data: [] };
      if (query.length < 3) return { isLoading: false, data: [] };
      const formattedQuery = query.replace(" ", "+");

      const res = await fetch(`${baseUrl}/search.json?q=${formattedQuery}&limit=${limit}&offset=${offset}`);
      if (!res.ok) throw new Error("Network response was not ok");
      return res.json();
    },
    gcTime: 1000 * 60 * 60 * 24 * 7,
    staleTime: 1000 * 60 * 60 * 24 * 7,
  });
}

export type AdvancedSearchFilters = {
  title?: string;
  author?: string;
  subject?: string;
  place?: string;
  person?: string;
  language?: string;
  publisher?: string;
  publishYear?: [number, number];
  firstPublishYear?: [number, number];
  readinglogCount?: [number, number];
  ratingsCount?: [number, number];
  deweyDecimal?: string;
  libraryOfCongress?: string;
  birthDate?: string;
  ebookAccess?: string;
  selectedSubjects?: string[];
};

export function useAdvancedSearch(query: string, filters: AdvancedSearchFilters, limit = 10, offset = 0) {
  return useQuery<Search, Error>({
    queryKey: ["Search", query, filters, limit, offset],
    queryFn: async () => {
      if (query.length < 3 && Object.values(filters).every(v => v === '')) return { isLoading: false, data: [] };
      const formattedQuery = getFormatedQuery(query, filters);
      const res = await fetch(`${baseUrl}/search.json?q=${formattedQuery}&limit=${limit}&offset=${offset}`);
      if (!res.ok) throw new Error("Network response was not ok");
      return res.json();
    },
    gcTime: 1000 * 60 * 60 * 24 * 7,
    staleTime: 1000 * 60 * 60 * 24 * 7,
  });
}

const getFormatedQuery = (query: string, filters: AdvancedSearchFilters) => {
  let formattedQuery = query.replace(" ", "+");
  formattedQuery += Object.entries(filters).map(([key, value]) => {
    if (value === null || value === '') return '';
    if (Array.isArray(value)) {
      return `&${key}=${value.join('+')}`;
    } else {
      return `&${key}=${value}`;
    }
  }).join('');
  return formattedQuery;
};
