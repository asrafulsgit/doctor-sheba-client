import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../query/query-keys";
import { api } from "../api/api-client";
import { ApiResponse } from "@/types/api-response";
import { AdminMeta } from "@/types/admin";

export function useAdminMetaData() {
  return useQuery({
    queryKey: queryKeys.meta.adminMeta,
    queryFn: () => api<ApiResponse<AdminMeta>>("/meta/admin"),
    staleTime: 1000 * 60 * 5,
  });
}
