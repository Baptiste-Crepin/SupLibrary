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

export function useWork(workKey: string) {
  return useQuery<Work, ApiError>({
    queryKey: ["work", workKey],
    queryFn: async (): Promise<Work> => {
      if (!workKey) {
        throw { message: 'Work key is required', code: 'MISSING_KEY' } as ApiError;
      }

      const response = await fetchWithStatus<Work>(`${baseUrl}/works/${workKey}.json`);
      return response.data;
    },
    retry: shouldRetryHttpError,
    enabled: !!workKey,
    gcTime: 1000 * 60 * 60 * 24 * 7,
    staleTime: 1000 * 60 * 60 * 24 * 7,
  });
}