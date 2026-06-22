import {
  QueryClient,
  QueryCache,
  MutationCache,
} from "@tanstack/react-query";
import { ApiError } from "../api/api-error";

function shouldRetry(
  failureCount: number,
  error: unknown
) {
  if (
    error instanceof ApiError &&
    [400, 401, 403, 404, 422].includes(error.status)
  ) {
    return false;
  }

  return failureCount < 3;
}

export function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 5 * 60 * 1000,
        gcTime: 10 * 60 * 1000,

        retry: shouldRetry,

        retryDelay: (attempt) =>
          Math.min(1000 * 2 ** attempt, 30000),

        refetchOnWindowFocus: false,
        refetchOnReconnect: true,
        refetchOnMount: false,

        networkMode: "online",
      },

      mutations: {
        retry: false,
      },
    },

    queryCache: new QueryCache({
      onError(error) {
        reportError(error);
      },
    }),

    mutationCache: new MutationCache({
      onError(error) {
        reportError(error);
      },
    }),
  });
}