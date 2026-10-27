import { IHealthTip, IHealthTipFilter } from "@/types/health-tips";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "../query/query-keys";
import { api } from "../api/api-client";
import { ApiResponse } from "@/types/api-response";

export type HealthTipInput = {
  title: string;
  category: string;
  excerpt: string;
  content: string;
  icon?: string;
  isPublished: boolean;
};

export function useCreateHealthTip() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: HealthTipInput) =>
      api<ApiResponse<IHealthTip>>("/health-tip", {
        method: "POST",
        body: JSON.stringify(data),
      }),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.healthTips.all,
      });
    },
  });
}

export function useUpdateHealthTip() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      slug,
      data,
    }: {
      slug: string;
      data: Partial<HealthTipInput>;
    }) =>
      api<ApiResponse<IHealthTip>>(`/health-tip/${slug}`, {
        method: "PATCH",
        body: JSON.stringify(data),
      }),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.healthTips.all,
      });
    },
  });
}

export function useDeleteHealthTip() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ slug }: { slug: string }) => {
      return api(`/health-tip/${slug}`, {
        method: "DELETE",
      });
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.healthTips.all,
      });
    },
  });
}

export function useHealthTips(filters: IHealthTipFilter = {}) {
  return useQuery({
    queryKey: queryKeys.healthTips.list(filters),
    queryFn: () =>
      api<ApiResponse<IHealthTip[]>>("/health-tip", { params: filters }),
    staleTime: 1000 * 60 * 10,
  });
}

export type IMyHealthTip = {
  stats: {
    tipsCount: number;
    publishedTips: number;
    totalViews: number;
  };
  tips: IHealthTip[];
};

export function useMyHealthTips(filters: IHealthTipFilter = {}) {
  return useQuery({
    queryKey: queryKeys.healthTips.list(filters),
    queryFn: () =>
      api<ApiResponse<IMyHealthTip>>("/health-tip/my", { params: filters }),
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
      api<ApiResponse<{ counted: boolean }>>(`/health-tip/${id}/view`, {
        method: "POST",
      }),

    onSuccess: (response) => {
      if (response?.data?.counted) {
        queryClient.invalidateQueries({
          queryKey: queryKeys.healthTips.all,
        });
      }
    },
  });
}
