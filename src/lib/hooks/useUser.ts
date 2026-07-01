import { useQuery } from "@tanstack/react-query";
import { api } from "../api/api-client";
import { ApiResponse } from "@/types/api-response";
import { queryKeys } from "../query/query-keys";

export function useMe() {
  return useQuery({
    queryKey: queryKeys.auth.session(),
    queryFn: () => api<ApiResponse<Record<string, any>>>("/user/me"),
    staleTime: 1000 * 60 * 10,
    retry: false,
  });
}


