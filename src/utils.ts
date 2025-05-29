import axios, { AxiosError, type AxiosResponse } from "axios";

export const getCurrentDateParts = (date: Date) => {

  return {
    year: date.getFullYear(),
    month: (date.getMonth() + 1).toString().padStart(2, '0'),
    day: date.getDate().toString().padStart(2, '0'),
  };
};

export const formatDate = (dateString?: string) => {
  if (!dateString) return '';

  const date = new Date(dateString);
  if (isNaN(date.getTime())) {
    return dateString;
  }

  return date.toLocaleDateString();
};

export const getLifeSpan = (birth_date?: string, death_date?: string) => {
  const birth = formatDate(birth_date);
  const death = formatDate(death_date);

  if (birth && death) {
    return `${birth} - ${death}`;
  } else if (birth) {
    return `Born ${birth}`;
  } else if (death) {
    return `Died ${death}`;
  }
  return null;
};

export const extractIdFromKeyUrl = (url: string) => {
  // type, key, ...rest
  const [_, key] = url.split('/');
  return key;
};









export interface ApiError {
  status?: number;
}

export interface ApiResponse<T> {
  data: T;
  status: number;
  statusText: string;
}

export async function fetchWithStatus<T>(url: string): Promise<ApiResponse<T>> {
  try {
    const res: AxiosResponse<T> = await axios.get<T>(url);
    return {
      data: res.data,
      status: res.status,
      statusText: res.statusText,
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      const status = axiosError.response?.status;

      const apiError: ApiError = {
        status,
      };

      throw apiError;
    }

    throw error;
  }
}

export function shouldRetryHttpError(failureCount: number, error: unknown): boolean {
  const apiError = error as ApiError;

  if (apiError?.status) {
    //retry 4XX only on 408 request timeout or 429 too many requests 
    const timeoutCode = 408;
    const tooManyRequestsCode = 429;
    const retryableClientErrors = [timeoutCode, tooManyRequestsCode];

    if (apiError.status >= 400 && apiError.status < 500) {
      return retryableClientErrors.includes(apiError.status) && failureCount < 3;
    }
  }

  // Retry on network errors and 5xx server errors (max 3 times)
  return failureCount < 3;
}