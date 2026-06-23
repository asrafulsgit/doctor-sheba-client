import { IHealthTip, IHealthTipFilter } from "@/types/health-tips";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../query/query-keys";
import { api } from "../api/api-client";
import { ApiResponse } from "@/types/api-response";

export function useHealthTips(filters: IHealthTipFilter = {}) {
  return useQuery({
    queryKey: queryKeys.healthTips.list(filters),
    queryFn: () =>
      api<ApiResponse<IHealthTip[]>>("/health-tip", { params: filters }),
    staleTime: 1000 * 60 * 10,
  });
}

export function useHealthTip(slug: string) {
  return useQuery({
    queryKey: queryKeys.healthTips.detail(slug),
    queryFn: () => api<ApiResponse<IHealthTip>>(`/health-tip/${slug}`),
    enabled: !!slug,
  });
}
