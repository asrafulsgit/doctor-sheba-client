import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "../api/api-client";
import { ApiResponse } from "@/types/api-response";
import { queryKeys } from "../query/query-keys";
import { DoctorFormValues } from "@/components/admin/doctors/CreateDoctorForm";

export function useMe() {
  return useQuery({
    queryKey: queryKeys.auth.session(),
    queryFn: () => api<ApiResponse<Record<string, any>>>("/user/me"),
    staleTime: 1000 * 60 * 10,
    retry: false,
  });
}

export function useDoctorRegister() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: DoctorFormValues) =>
      api<ApiResponse<null>>("/user/create-doctor", {
        method: "POST",
        body: JSON.stringify(data),
      }),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.doctors.all,
      });
    },
  });
}
