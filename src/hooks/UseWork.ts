import { useQuery } from "@tanstack/react-query";
import { baseUrl } from "appConstants";
import type { key } from "Types";
import { fetchWithStatus, shouldRetryHttpError, type ApiError } from "utils";

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
  links?: Array<{
    title: string,
    url: string,
    key: key
  }>;
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

export type Rating = {
  summary: {
    average: number;
    count: number;
    sortable: number;
  };
  counts: {
    [key: number]: number;
    1: number;
    2: number;
    3: number;
    4: number;
    5: number;
  }
}

export type Bookshelf = {
  counts: {
    want_to_read: number
    currently_reading: number,
    already_read: number
  }
}

export function useWork(workKey: string) {
  return useQuery<Work, ApiError>({
    queryKey: ["work", workKey],
    queryFn: async (): Promise<Work> => {
      if (!workKey) {
        throw { message: 'Work key is required', code: 'MISSING_KEY' } as ApiError;
      }

      const response = await fetchWithStatus<Work>(`${baseUrl}${workKey}.json`);
      return response.data;
    },
    retry: shouldRetryHttpError,
    enabled: !!workKey,
    gcTime: 1000 * 60 * 60 * 24 * 7,
    staleTime: 1000 * 60 * 60 * 24 * 7,
  });
}

export function useRatings(workKey: string) {
  return useQuery<Rating, ApiError>({
    queryKey: ["work", workKey, "rating"],
    queryFn: async (): Promise<Rating> => {
      if (!workKey) {
        throw { message: 'Work key is required', code: 'MISSING_KEY' } as ApiError;
      }

      const response = await fetchWithStatus<Rating>(`${baseUrl}${workKey}/ratings.json`);
      return response.data;
    },
    retry: shouldRetryHttpError,
    enabled: !!workKey,
    gcTime: 1000 * 60 * 60 * 24 * 7,
    staleTime: 1000 * 60 * 60 * 24 * 7,
  });
}

export function useBookshelf(workKey: string) {
  return useQuery<Bookshelf, ApiError>({
    queryKey: ["work", workKey, "bookshelves"],
    queryFn: async (): Promise<Bookshelf> => {
      if (!workKey) {
        throw { message: 'Work key is required', code: 'MISSING_KEY' } as ApiError;
      }

      const response = await fetchWithStatus<Bookshelf>(`${baseUrl}${workKey}/bookshelves.json`);
      return response.data;
    },
    retry: shouldRetryHttpError,
    enabled: !!workKey,
    gcTime: 1000 * 60 * 60 * 24 * 7,
    staleTime: 1000 * 60 * 60 * 24 * 7,
  });
}