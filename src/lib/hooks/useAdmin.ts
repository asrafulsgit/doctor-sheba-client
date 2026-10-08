import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "../query/query-keys";
import { api } from "../api/api-client";
import { ApiResponse } from "@/types/api-response";
import { AdminMeta } from "@/types/admin";
import { User } from "@/types/user";
import { UpateAdminFormValues } from "@/components/admin/admins/UpdateAdminFormDialog";

export function useAdminMetaData() {
  return useQuery({
    queryKey: queryKeys.meta.adminMeta,
    queryFn: () => api<ApiResponse<AdminMeta>>("/meta/admin"),
    staleTime: 1000 * 60 * 5,
  });
}

export function useAdmins() {
  return useQuery({
    queryKey: queryKeys.users.adminList,
    queryFn: () => api<ApiResponse<User[]>>(`/admin`),
    staleTime: 1000 * 60 * 5,
  });
}

export const useUpdateAdmin = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      ...input
    }: UpateAdminFormValues & { id: string }) => {
      return api<ApiResponse<null>>(`/admin/${id}`, {
        method: "PATCH",
        body: JSON.stringify(input),
      });
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.users.adminList,
      });
    },
  });
};

// Mirrors useSuspendOrActivatePatient: isDelete=true suspends, false activates
export const useSuspendOrActivateAdmin = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, isDelete }: { id: string; isDelete: boolean }) =>
      api<ApiResponse<null>>(`/admin/${id}`, {
        method: "DELETE",
        body: JSON.stringify({ isDelete }),
      }),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.users.adminList,
      });
    },
  });
};
