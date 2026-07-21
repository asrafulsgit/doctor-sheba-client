import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "../query/query-keys";
import { api } from "../api/api-client";
import { ApiResponse } from "@/types/api-response";
import {
  IHealthProfile,
  IPatient,
  PatientMetadataResponse,
} from "@/types/patient";

export function usePatientMetaData() {
  return useQuery({
    queryKey: queryKeys.prescriptions.byPatient(),
    queryFn: () => api<ApiResponse<PatientMetadataResponse>>("/meta/patient"),
    staleTime: 1000 * 60 * 5,
  });
}

export function usePatientHealthProfile() {
  return useQuery({
    queryKey: queryKeys.patients.healthProfile(),
    queryFn: () => api<ApiResponse<IHealthProfile>>("/patient/health-profile"),
    staleTime: 1000 * 60 * 5,
  });
}

export function useUpdatePatient() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: Partial<IPatient>) => {
      return api("/patient", {
        method: "PATCH",
        body: JSON.stringify(data),
      });
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.patients.all,
      });
    },
  });
}
