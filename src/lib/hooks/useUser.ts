import { useQuery } from "@tanstack/react-query";
import { api } from "../api/api-client";
import { ApiResponse } from "@/types/api-response";

export function useMe() {
  return useQuery({
    queryKey: ["me"],
    queryFn: () => api<ApiResponse<Record<string, any>>>("/user/me"),
    staleTime: 1000 * 60 * 10,
    retry: false,
  });
}
