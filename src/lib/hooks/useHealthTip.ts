import { IHealthTip, IHealthTipFilter } from "@/types/health-tips";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
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


export function useRecordHealthTipView() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) =>
      api<ApiResponse<{ counted: boolean }>>(
        `/health-tip/${id}/view`,
        {
          method: "POST",
        },
      ),

    onSuccess: (response) => {
      if (response?.data?.counted) {
        queryClient.invalidateQueries({
          queryKey: queryKeys.healthTips.all,
        });
      }
    },
  });
}