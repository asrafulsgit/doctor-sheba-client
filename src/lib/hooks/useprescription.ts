import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { PrescriptionFilters, queryKeys } from "../query/query-keys";
import { api } from "../api/api-client";
import { ApiResponse } from "@/types/api-response";
import { IPrescription } from "@/types/prescription";

export function useMyPrescriptions(filters: PrescriptionFilters) {
  return useQuery({
    queryKey: queryKeys.prescriptions.myPrescriptions(filters),
    queryFn: () =>
      api<ApiResponse<IPrescription[]>>("/prescription/my-prescriptions", {
        params: filters,
      }),
    staleTime: 1000 * 60 * 5,
  });
}

export function usePrescription(id: string) {
  return useQuery({
    queryKey: queryKeys.prescriptions.detail(id),
    queryFn: () => api<ApiResponse<IPrescription>>(`/prescription/${id}`),
    staleTime: 1000 * 60 * 5,
    enabled: !!id,
  });
}

type CreatePrescription = {
  appointmentId: string;
  diagnosis: string;
  medications: {
    name: string;
    dosage: string;
    frequency: string;
    duration: string;
  }[];
  instructions: string;
  followUpDate?: string;
};

export function useCreatePrescription() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreatePrescription) => {
      return api("/prescription", {
        method: "POST",
        body: JSON.stringify(data),
      });
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.prescriptions.all,
      });
    },
  });
}

type UpdatePrescription = {
  diagnosis?: string;
  medications?: {
    name: string;
    dosage: string;
    frequency: string;
    duration: string;
  }[];
  instructions?: string;
  followUpDate?: string;
};

export function useUpdatePrescription(id: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: UpdatePrescription) => {
      return api(`/prescription/${id}`, {
        method: "PATCH",
        body: JSON.stringify(data),
      });
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.prescriptions.all,
      });
    },
  });
}
