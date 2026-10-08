import { api } from "@/lib/api/api-client";
import { queryKeys } from "@/lib/query/query-keys";
import { ApiResponse } from "@/types/api-response";
import { Specialty } from "@/types/specialties";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export type SpecialtyInput = Pick<Specialty, "title" | "icon">;

export function useSpecialties() {
  return useQuery({
    queryKey: queryKeys.specialties.list(),
    queryFn: () => api<ApiResponse<Specialty[]>>("/specialties"),
    staleTime: 1000 * 60 * 10,
  });
}

export function useCreateSpecialty() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: SpecialtyInput) => {
      return api<ApiResponse<Specialty>>("/specialties", {
        method: "POST",
        body: JSON.stringify(data),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.specialties.all,
      });
    },
  });
}

export function useUpdateSpecialty() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, ...data }: SpecialtyInput & { id: string }) => {
      return api<ApiResponse<Specialty>>(`/specialties/${id}`, {
        method: "PATCH",
        body: JSON.stringify(data),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.specialties.all,
      });
    },
  });
}

export function useDeleteSpecialty() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      return api<ApiResponse<Specialty>>(`/specialties/${id}`, {
        method: "DELETE",
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.specialties.all,
      });
    },
  });
}
